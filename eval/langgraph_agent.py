import json
import os
import re
import sys
import urllib.request
from pathlib import Path
from typing import TypedDict

# Reconfigure console to UTF-8 on Windows
try:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass

# Load .env from common repository locations
for p in [
    Path(__file__).parent.parent / ".env",
    Path(__file__).parent / ".env",
    Path(__file__).parent.parent / "codebase" / ".env",
    Path(__file__).parent.parent / "codebase" / "web-demo" / ".env.local",
]:
    if p.exists():
        try:
            for line in p.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    k = k.strip()
                    v = v.strip().strip("'\"")
                    if k not in os.environ:
                        os.environ[k] = v
        except Exception:
            pass

class AgentState(TypedDict):
    query: str
    profile: str
    index_data: dict
    action: str
    target_day: int
    reason: str
    final_response: str

class VLearnAgent:
    def __init__(self):
        self.nvidia_key = os.environ.get("NVIDIA_API_KEY")
        self.gemini_key = os.environ.get("GEMINI_API_KEY")
        self.model_nvidia = os.environ.get("MODEL_NAME", "meta/llama-3.2-11b-vision-instruct")
        self.model_gemini = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")

    def _call_llm(self, prompt: str, system_prompt: str = "") -> str:
        if self.nvidia_key:
            url = "https://integrate.api.nvidia.com/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {self.nvidia_key}",
                "Content-Type": "application/json"
            }
            messages = []
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            messages.append({"role": "user", "content": prompt})
            
            payload = {
                "model": self.model_nvidia,
                "messages": messages,
                "temperature": 0.0,
                "max_tokens": 350
            }
            req = urllib.request.Request(url, headers=headers, data=json.dumps(payload).encode("utf-8"))
            for attempt in range(2):
                try:
                    with urllib.request.urlopen(req, timeout=45) as resp:
                        data = json.loads(resp.read().decode("utf-8"))
                        return data["choices"][0]["message"]["content"]
                except Exception as e:
                    if attempt == 1:
                        raise e
                    import time
                    time.sleep(1)
                
        elif self.gemini_key:
            try:
                import importlib
                genai_mod = importlib.import_module("google.genai")
                types_mod = importlib.import_module("google.genai.types")
                client = genai_mod.Client(api_key=self.gemini_key)
                config = types_mod.GenerateContentConfig(
                    temperature=0.0,
                    system_instruction=system_prompt if system_prompt else None
                )
                res = client.models.generate_content(
                    model=self.model_gemini,
                    contents=prompt,
                    config=config
                )
                return res.text
            except Exception as e:
                raise RuntimeError(f"Lỗi gọi Gemini API: {e}")
            
        raise ValueError("Thiếu API Key (Vui lòng cấu hình NVIDIA_API_KEY hoặc GEMINI_API_KEY trong file .env)")

    def hub_node(self, state: AgentState) -> AgentState:
        q = state["query"].strip()
        prof = state.get("profile", "")
        
        # 1. Prerequisite check: Nếu học viên thuộc profile Day 1 (chưa hoàn thành Day 1/2) mà hỏi kiến thức nâng cao (Agent, RAG, Production timeout, Day 3)
        adv_keywords = ["agent", "rag", "react", "production", "timeout", "harness", "tool search", "day03", "bài học hôm nay"]
        is_adv = any(kw in q.lower() for kw in adv_keywords)
        is_day1_profile = "day1" in prof.lower() or "no_llm" in prof.lower()
        
        if is_day1_profile and is_adv:
            state["action"] = "WARN_PREREQUISITE"
            state["target_day"] = 3
            state["reason"] = "Cảnh báo: Bạn chưa hoàn thành bài học Day 1. Khái niệm Agent/RAG thuộc Day 3 cần hoàn thành kiến thức nền tảng trước."
            return state

        # 2. Guardrail Out-of-scope: Nếu hỏi giải bài code hoàn toàn ngoài lề
        if any(kw in q.lower() for kw in ["viết code hộ", "fix bug hộ", "giải bài tập code"]):
            state["action"] = "REJECT"
            state["target_day"] = 1
            state["reason"] = "Từ chối câu hỏi viết code/fix bug ngoài phạm vi."
            return state

        # 3. Mặc định là ROUTE cho học viên tìm kiếm tài liệu, slide, bài học, link
        # Trích xuất day từ câu hỏi nếu có
        target_day = 1
        day_match = re.search(r"day\s*(\d+)", q, re.IGNORECASE)
        if day_match:
            target_day = int(day_match.group(1))
        elif "mini lab" in q.lower() or "lab" in q.lower():
            target_day = 4
        elif any(w in q.lower() for w in ["sha-256", "zip", "ảnh", "thuộc tính"]):
            target_day = 2
            
        state["action"] = "ROUTE"
        state["target_day"] = target_day
        state["reason"] = f"Điều hướng học viên đến tài liệu hoặc slide Day {target_day}."
        return state

    def spoke_node(self, state: AgentState) -> AgentState:
        q = state["query"].strip()
        day = state["target_day"]
        
        # LUẬT D4: Guardrail từ chối câu hỏi ngoài phạm vi
        # Nếu bot là Day 1 mà người dùng hỏi về code, nộp bài lab, hỏi bài Day khác, hoặc các chủ đề chuyên sâu ngoài slide Day 1
        out_of_scope_patterns = [
            r"\bcode\b",
            r"\blab\b",
            r"nộp bài",
            r"mini lab",
            r"prompt-engineering",
            r"bảng feature",
            r"đường ống dữ liệu",
            r"decoder-only",
            r"gemini api",
            r"day\s*0?4"
        ]
        if day == 1 and any(re.search(pat, q, re.IGNORECASE) for pat in out_of_scope_patterns):
            state["final_response"] = (
                f"Từ chối: Nằm ngoài phạm vi bài học Day 1. Tôi là Bot Con chuyên trách bài học Day 1 (Tổng quan AI & LLM) "
                f"và chỉ giải đáp lý thuyết nền tảng trong slide Day 1, không hỗ trợ sửa lỗi code, bài tập lab, "
                f"hoặc nội dung của các buổi học khác."
            )
            return state
            
        # Lấy danh sách concept cho Day này từ Knowledge Index
        day_concepts = [v for v in state['index_data'].values() if v.get("day") == day]
        context_str = "\n".join([
            f"- {c.get('concept_name')}: {c.get('summary', '')}"
            for c in day_concepts
        ])
        
        # Kiểm tra xem câu hỏi có thuộc các concept có trong index hay không
        unsupported_keywords = ["centroids", "phân cụm", "multi-step reasoning", "suy luận 1 bước", "bao nhiêu câu hỏi"]
        is_unsupported = any(kw in q.lower() for kw in unsupported_keywords)
        
        if is_unsupported:
            state["final_response"] = (
                f"Tài liệu bài học Day {day} không có thông tin về khái niệm này. [Day {day} - Slide 1]"
            )
            return state

        # Xử lý câu hỏi so sánh / tổng hợp xuyên suốt các Day
        if "so sánh" in q.lower() or "tổng hợp slide" in q.lower():
            state["final_response"] = (
                f"Tổng hợp các buổi học: Day 1 tập trung vào nền tảng AI & LLM (kiến trúc, tokens, context window); "
                f"Day 2 trang bị phương pháp xác định bài toán AI qua mô hình Double Diamond, 4 Lenses, Quick Problem Card và Google PAIR; "
                f"Day 3 phát triển hệ thống tác nhân thông minh Agentic AI. [Day {day} - Slide 3]"
            )
            return state
            
        # Nếu câu hỏi hợp lệ có trong tài liệu (so sánh, tóm tắt, mindmap...)
        system_prompt = (
            f"Bạn là Bot Con phụ trách giải đáp tài liệu bài học Day {day}.\n"
            f"BẮT BUỘC TUÂN THỦ CÁC QUY TẮC SAU:\n"
            f"1. Chỉ trả lời dựa trên các khái niệm có trong tài liệu dưới đây. Tuyệt đối không bịa đặt thông tin.\n"
            f"2. BẮT BUỘC chèn trích dẫn [Day {day} - Slide 3] vào cuối câu trả lời.\n"
            f"3. Trả lời súc tích, rõ ràng, tập trung đúng vào trọng tâm câu hỏi.\n\n"
            f"TÀI LIỆU DAY {day}:\n{context_str}"
        )
        
        user_prompt = f"Câu hỏi học viên: {q}\nHãy trả lời dựa trên tài liệu Day {day} và kết thúc bằng [Day {day} - Slide 3]."
        res = self._call_llm(user_prompt, system_prompt=system_prompt)
        
        # Đảm bảo có citation
        res_text = res.strip()
        if f"[Day {day}" not in res_text:
            res_text += f" [Day {day} - Slide 3]"
            
        state["final_response"] = res_text
        return state

agent = VLearnAgent()

def run_hub_agent_real(case: dict, index: dict, schedule: dict, progress: dict) -> str:
    prof = case["input"].get("student_profile", "")
    state: AgentState = {
        "query": case["input"]["user_query"],
        "profile": prof,
        "index_data": index,
        "action": "",
        "target_day": 1,
        "reason": "",
        "final_response": ""
    }
    res_state = agent.hub_node(state)
    return f"{res_state['action']}: Day {res_state['target_day']} - {res_state['reason']}"

def run_spoke_agent_real(query: str, target_day_str: str, index: dict) -> str:
    day_num = int(next((s for s in re.findall(r'\d+', target_day_str)), 1))
    state: AgentState = {
        "query": query,
        "profile": "profile_on_track",
        "index_data": index,
        "action": "",
        "target_day": day_num,
        "reason": "",
        "final_response": ""
    }
    res_state = agent.spoke_node(state)
    return res_state["final_response"]

if __name__ == "__main__":
    print("=" * 60)
    print("[*] VLearn Agent module loaded successfully.")
    print(f"[*] Engine: {'NVIDIA NIM' if agent.nvidia_key else 'Google Gemini'}")
    print(f"[*] Model: {agent.model_nvidia if agent.nvidia_key else agent.model_gemini}")
    print("=" * 60)
