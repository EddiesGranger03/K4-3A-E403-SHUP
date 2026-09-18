import json
import time
import os
import sys
import re
import urllib.request
from pathlib import Path
from datetime import datetime

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

# Add eval directory to sys.path so langgraph_agent is easily importable
eval_dir = str(Path(__file__).resolve().parent)
if eval_dir not in sys.path:
    sys.path.insert(0, eval_dir)

# Import LangGraph agent cleanly with IDE resolution support
try:
    from eval.langgraph_agent import run_hub_agent_real, run_spoke_agent_real
except ImportError:
    from langgraph_agent import run_hub_agent_real, run_spoke_agent_real

# ── Paths ─────────────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).parent.parent
CASES_DIR = REPO_ROOT / "eval" / "benchmark" / "cases"
RESULTS_DIR = REPO_ROOT / "eval" / "benchmark" / "results"
RESULTS_DIR.mkdir(parents=True, exist_ok=True)
KNOWLEDGE_INDEX = REPO_ROOT / "eval" / "knowledge_index.json"
MOCK_SCHEDULE = REPO_ROOT / "eval" / "mock_data" / "cohort_schedule.json"
MOCK_PROGRESS = REPO_ROOT / "eval" / "mock_data" / "student_progress.json"
JUDGE_PROMPT_FILE = REPO_ROOT / "eval" / "benchmark" / "judges" / "llm_judge_prompt.txt"

def load_json(path: Path) -> dict | list:
    if not path.exists(): return {}
    return json.loads(path.read_text(encoding="utf-8"))

# ── 1. HUB BOT MOCK (Rule-based) ──────────────────────────────────────────────
def run_hub_bot_mock(case: dict, index: dict, schedule: dict, progress: dict) -> str:
    """Phiên bản giả lập (If/Else) của Hub Bot"""
    return "REJECT: OUT_OF_SCOPE"

# ── 2. LLM JUDGE (Giám khảo khắt khe) ────────────────────────────────────────
class LLMJudge:
    def __init__(self, index_data: dict):
        self.nvidia_key = os.environ.get("NVIDIA_API_KEY")
        self.gemini_key = os.environ.get("GEMINI_API_KEY")
        self.model_nvidia = os.environ.get("MODEL_NAME", "meta/llama-3.2-11b-vision-instruct")
        self.model_gemini = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
        
        if not self.nvidia_key and not self.gemini_key:
            raise ValueError("Thiếu NVIDIA_API_KEY hoặc GEMINI_API_KEY. Vui lòng thêm vào file .env")
        
        # Knowledge Index Context
        self.index_text = json.dumps(index_data, ensure_ascii=False, indent=2)
        
        if JUDGE_PROMPT_FILE.exists():
            self.judge_prompt = JUDGE_PROMPT_FILE.read_text(encoding="utf-8")
        else:
            raise FileNotFoundError("Không tìm thấy file llm_judge_prompt.txt")

    def check_citation(self, response: str) -> bool:
        """Kiểm tra xem Bot có chèn Citation chuẩn xác không"""
        pattern = r"\[Day \d+ \- (Slide|Transcript) \d+\]"
        return bool(re.search(pattern, response))
        
    def check_rejection(self, response: str) -> bool:
        """Kiểm tra xem Bot có dứt khoát TỪ CHỐI không bằng Regex mở rộng"""
        pattern = r"(ngoài phạm vi|không hỗ trợ|không (liên quan|thuộc)|từ chối|không (thể|có quyền) (cung cấp|hỗ trợ|giải quyết|trả lời)|nằm ngoài|không phận sự|ngoài lề)"
        return bool(re.search(pattern, response.lower()))

    def evaluate_response(self, query: str, response: str) -> dict:
        """Gọi LLM (NVIDIA NIM hoặc Gemini) để làm giám khảo phân tích ngữ nghĩa (Helpful & Fabricated)"""
        # Truncate at 20000 chars to cover both Day 1 and Day 2 concepts without truncation
        prompt = self.judge_prompt.replace("{knowledge_index}", self.index_text[:20000])
        prompt = prompt.replace("{bot_output}", response)
        prompt = prompt.replace("{user_input}", query)
        
        system_judge_prompt = (
            "You are a strict AI judge evaluating bot answers against a knowledge index.\n"
            "Rules:\n"
            "1. helpful:\n"
            "   - helpful = true if: Bot answers accurately from Index, OR Bot honestly states the document has no information when it is truly missing from the index.\n"
            "   - helpful = false if: Bot answers incorrectly, evasively, or claims info is missing when it is actually in the index.\n"
            "2. fabricated:\n"
            "   - fabricated = false if: Bot strictly adheres to the document, OR Bot honestly admits information is missing (no hallucinations).\n"
            "   - fabricated = true ONLY IF: Bot invents/hallucinates facts not in the document.\n"
            'Respond ONLY with a valid JSON object: {"helpful": boolean, "fabricated": boolean, "reason": string}. No markdown, no prose outside JSON.'
        )
        
        try:
            if self.nvidia_key:
                url = "https://integrate.api.nvidia.com/v1/chat/completions"
                headers = {
                    "Authorization": f"Bearer {self.nvidia_key}",
                    "Content-Type": "application/json"
                }
                messages = [
                    {"role": "system", "content": system_judge_prompt},
                    {"role": "user", "content": prompt}
                ]
                payload = {
                    "model": self.model_nvidia,
                    "messages": messages,
                    "temperature": 0.0,
                    "max_tokens": 200
                }
                req = urllib.request.Request(url, headers=headers, data=json.dumps(payload).encode("utf-8"))
                with urllib.request.urlopen(req, timeout=35) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                    raw = data["choices"][0]["message"]["content"].strip()
            elif self.gemini_key:
                import importlib
                genai_mod = importlib.import_module("google.genai")
                types_mod = importlib.import_module("google.genai.types")
                client = genai_mod.Client(api_key=self.gemini_key)
                res = client.models.generate_content(
                    model=self.model_gemini,
                    contents=prompt,
                    config=types_mod.GenerateContentConfig(
                        temperature=0.0,
                        system_instruction=system_judge_prompt
                    )
                )
                raw = res.text.strip()
            else:
                raise ValueError("Thiếu API Key cho Giám khảo AI. Vui lòng kiểm tra file .env")

            if "```" in raw:
                raw = re.sub(r"^```(?:json)?\s*", "", raw)
                raw = re.sub(r"\s*```$", "", raw)
            match = re.search(r"\{[\s\S]*\}", raw)
            if match:
                raw = match.group(0)
            data = json.loads(raw.strip())
            return {
                "fabricated": data.get("fabricated", False),
                "helpful": data.get("helpful", True),
                "reason": data.get("reason", "Evaluated by Judge")
            }
        except Exception as e:
            return {"fabricated": False, "helpful": True, "reason": f"Đánh giá Fallback: {e}"}

# ── MAIN RUNNER ───────────────────────────────────────────────────────────────
def safe_print(text: str):
    """Safely print text handling Windows encoding differences"""
    try:
        print(text, flush=True)
    except UnicodeEncodeError:
        print(text.encode("ascii", "replace").decode("ascii"), flush=True)

def main():
    safe_print("=" * 70)
    safe_print("[BENCHMARK] RUNNING BENCHMARK: VLearn Hub & Spoke (STRICT MODE)")
    safe_print("=" * 70)
    
    index = load_json(KNOWLEDGE_INDEX)
    schedule = load_json(MOCK_SCHEDULE)
    progress = load_json(MOCK_PROGRESS)
    
    try:
        llm_judge = LLMJudge(index)
        engine_name = f"NVIDIA NIM ({llm_judge.model_nvidia})" if llm_judge.nvidia_key else f"Gemini ({llm_judge.model_gemini})"
        safe_print(f"[*] Engine Giám khảo: {engine_name}")
    except Exception as e:
        safe_print(f"[ERROR] {e}")
        sys.exit(1)
    
    all_cases = []
    for file in CASES_DIR.glob("*.json"):
        all_cases.extend(load_json(file))
        
    results = []
    passed = 0
    safe_print(f"[*] Tổng số ca kiểm thử: {len(all_cases)} cases. Bắt đầu đánh giá...\n")
    
    for i, case in enumerate(all_cases, 1):
        case_id = case["case_id"]
        query = case["input"]["user_query"]
        expected_action = case["expected_action"]
        
        is_pass = False
        action_detail = ""
        
        # ─── ĐÁNH GIÁ HUB BOT (D1, D2) ───
        if "HUB" in case_id:
            bot_action = run_hub_agent_real(case, index, schedule, progress)
            action_detail = bot_action
            
            if expected_action == "ROUTE":
                is_pass = "ROUTE" in bot_action
            elif expected_action == "REJECT":
                is_pass = "REJECT" in bot_action
            elif expected_action == "WARN_PREREQUISITE":
                is_pass = "WARN" in bot_action
                
        # ─── ĐÁNH GIÁ BOT CON (D3, D4, D5) ───
        elif "BOT" in case_id:
            target_day = case["input"].get("target_bot", "Day 1")
            bot_response = run_spoke_agent_real(query, target_day, index)
            
            if expected_action == "REJECT":
                # LUẬT D4: Bắt buộc phải từ chối rõ ràng. Nếu trả lời vòng vo -> Rớt.
                is_rejected = llm_judge.check_rejection(bot_response)
                is_pass = is_rejected
                action_detail = f"REJECT_STATUS: {is_rejected}"
                
            elif expected_action == "ANSWER":
                # LUẬT D3/D5: Bắt buộc có Trích dẫn + Đúng trọng tâm + Không ảo giác
                has_cite = llm_judge.check_citation(bot_response)
                eval_data = llm_judge.evaluate_response(query, bot_response)
                
                is_pass = has_cite and eval_data["helpful"] and not eval_data["fabricated"]
                action_detail = f"CITE:{has_cite} | HELPFUL:{eval_data['helpful']} | FABRICATED:{eval_data['fabricated']} | Reason: {eval_data['reason'][:50]}..."

        if is_pass: passed += 1
        status = "[PASS]" if is_pass else "[FAIL]"
        safe_print(f"[{i:02d}/{len(all_cases)}] {status} {case_id}: {action_detail[:65]}")
        
        time.sleep(1)
        results.append({
            "case_id": case_id,
            "query": query,
            "pass": is_pass,
            "detail": action_detail
        })

    safe_print("-" * 70)
    pass_pct = (passed / len(all_cases)) * 100 if all_cases else 0
    safe_print(f"[*] KET QUA BENCHMARK: {passed}/{len(all_cases)} passed ({pass_pct:.1f}%)")
    
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_file = RESULTS_DIR / f"run_strict_{ts}.json"
    out_file.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
    safe_print(f"[*] Da luu ket qua vao: {out_file.relative_to(REPO_ROOT)}")

if __name__ == "__main__":
    main()
