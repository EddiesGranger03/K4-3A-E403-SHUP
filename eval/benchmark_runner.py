import json
import time
import os
import sys
import re
from pathlib import Path
from datetime import datetime

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("[ERROR] Thiếu google-genai. Chạy: pip install google-genai")
    sys.exit(1)

# Load .env
try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent / ".env")
except:
    pass

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
    """Phiên bản giả lập (If/Else) của Hub Bot - Chắc chắn sẽ thất bại trước Golden Set"""
    return "REJECT: OUT_OF_SCOPE" # Mock bot ngu ngơ mặc định từ chối tất cả

# ── 2. LLM JUDGE (Giám khảo khắt khe) ────────────────────────────────────────
class LLMJudge:
    def __init__(self, index_data: dict):
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("Thiếu GEMINI_API_KEY. Vui lòng thêm vào file .env")
        self.client = genai.Client(api_key=api_key)
        self.model = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash-lite")
        
        # Knowledge Index Context
        self.index_text = json.dumps(index_data, ensure_ascii=False, indent=2)
        
        if JUDGE_PROMPT_FILE.exists():
            self.judge_prompt = JUDGE_PROMPT_FILE.read_text(encoding="utf-8")
        else:
            raise FileNotFoundError("Không tìm thấy file llm_judge_prompt.txt")

    def mock_bot_con_response(self, query: str, target_day: str) -> str:
        """Phiên bản giả lập của Bot Con"""
        return "Không có dữ liệu [Day 1 - Slide 1]."

    def check_citation(self, response: str) -> bool:
        """Kiểm tra xem Bot có chèn Citation chuẩn xác không"""
        pattern = r"\[Day \d+ \- (Slide|Transcript) \d+\]"
        return bool(re.search(pattern, response))
        
    def check_rejection(self, response: str) -> bool:
        """Kiểm tra xem Bot có dứt khoát TỪ CHỐI không bằng Regex mở rộng"""
        pattern = r"(ngoài phạm vi|không hỗ trợ|không (liên quan|thuộc)|từ chối|không (thể|có quyền) (cung cấp|hỗ trợ|giải quyết|trả lời)|nằm ngoài|không phận sự|ngoài lề)"
        return bool(re.search(pattern, response.lower()))

    def evaluate_response(self, query: str, response: str) -> dict:
        """Gọi Gemini LLM để làm giám khảo phân tích ngữ nghĩa (Helpful & Fabricated)"""
        prompt = self.judge_prompt.replace("{knowledge_index}", self.index_text[:3000])
        prompt = prompt.replace("{bot_output}", response)
        prompt = prompt.replace("{user_input}", query)
        
        try:
            res = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(temperature=0.0)
            )
            raw = res.text.strip()
            if raw.startswith("```"):
                parts = raw.split("```")
                raw = parts[1] if len(parts) > 1 else raw
                if raw.startswith("json"): raw = raw[4:]
            
            data = json.loads(raw.strip())
            return {
                "fabricated": data.get("fabricated", True),
                "helpful": data.get("helpful", False),
                "reason": data.get("reason", "No reason provided")
            }
        except Exception as e:
            return {"fabricated": True, "helpful": False, "reason": f"Lỗi gọi API Giám khảo: {e}"}

# ── MAIN RUNNER ───────────────────────────────────────────────────────────────
def main():
    print("=" * 70)
    print("🚀 RUNNING BENCHMARK: VLearn Hub & Spoke (STRICT MODE)")
    print("=" * 70)
    
    index = load_json(KNOWLEDGE_INDEX)
    schedule = load_json(MOCK_SCHEDULE)
    progress = load_json(MOCK_PROGRESS)
    
    try:
        llm_judge = LLMJudge(index)
    except Exception as e:
        print(f"[ERROR] {e}")
        sys.exit(1)
    
    all_cases = []
    for file in CASES_DIR.glob("*.json"):
        all_cases.extend(load_json(file))
        
    results = []
    passed = 0
    
    for i, case in enumerate(all_cases, 1):
        case_id = case["case_id"]
        query = case["input"]["user_query"]
        expected_action = case["expected_action"]
        
        is_pass = False
        action_detail = ""
        
        print(f"[{i}/{len(all_cases)}] Đang chấm {case_id}...", end="\r")
        
        # ─── ĐÁNH GIÁ HUB BOT (D1, D2) ───
        if "HUB" in case_id:
            from langgraph_agent import run_hub_agent_real
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
            from langgraph_agent import run_spoke_agent_real
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
        status = "✅ PASS" if is_pass else "❌ FAIL"
        # Xóa dòng "Đang chấm..." và in kết quả chính thức
        print(f"\033[K[{status}] {case_id}: {action_detail:<60}")
        
        time.sleep(4)
        results.append({
            "case_id": case_id,
            "query": query,
            "pass": is_pass,
            "detail": action_detail
        })

    print("-" * 70)
    print(f"🏆 FINAL SUMMARY: {passed}/{len(all_cases)} passed ({(passed/len(all_cases))*100:.1f}%)")
    
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_file = RESULTS_DIR / f"run_strict_{ts}.json"
    out_file.write_text(json.dumps(results, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
