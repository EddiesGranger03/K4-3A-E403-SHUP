import pandas as pd
import json
import re
import random
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
CSV_PATH = REPO_ROOT / "hackathon_docs" / "data" / "vlearn-pack" / "chatlog" / "tutor_turns.csv"
BENCHMARK_DIR = REPO_ROOT / "eval" / "benchmark" / "cases"

def clean_student_query(q):
    q = re.sub(r'\(đang học phần.*?\)\s*', '', q, flags=re.IGNORECASE)
    q = re.sub(r'\(trang.*?\)\s*', '', q, flags=re.IGNORECASE)
    return q.replace('\n', ' ').replace('\r', '').strip()

def generate_benchmark():
    print("[1] Đang tải dữ liệu chatlog thực tế...")
    df = pd.read_csv(CSV_PATH)
    preset_mask = df['is_preset'].astype(str).str.lower() == 'true'
    df_manual = df[~preset_mask].copy()
    df_manual['clean_q'] = df_manual['student_question'].astype(str).apply(clean_student_query)
    df_valid = df_manual[(df_manual['clean_q'].str.len() > 10) & (df_manual['clean_q'].str.len() < 300)]
    
    random.seed(999) 
    
    # Pools
    d1_pool = df_valid[df_valid['clean_q'].str.contains(r'ở đâu|bài nào|tìm tài liệu|link|chủ đề nào', flags=re.IGNORECASE)]['clean_q'].tolist()
    d2_pool = df_valid[df_valid['clean_q'].str.contains(r'\b(rag|vector|agent|langgraph)\b', flags=re.IGNORECASE)]['clean_q'].tolist()
    d4_pool = df_valid[df_valid['clean_q'].str.contains(r'code|python|lỗi|error|cài đặt|nộp bài', flags=re.IGNORECASE)]['clean_q'].tolist()
    d35_pool = df_valid[df_valid['clean_q'].str.contains(r'bao nhiêu|tham số|chính xác|công thức|so sánh|khác biệt', flags=re.IGNORECASE)]['clean_q'].tolist()

    # === HUB CASES (10 CASES) ===
    hub_cases = []
    
    # D1: Lạc lối -> ROUTE
    for i, q in enumerate(random.sample(d1_pool, 5), 1):
        hub_cases.append({
            "case_id": f"D1_HUB_{i:02d}",
            "dimension": "D1",
            "description": "Học viên bị lạc lối, cần điều hướng",
            "input": {
                "user_query": q,
                "student_profile": "profile_on_track",
                "cohort_schedule": "K4"
            },
            "expected_action": "ROUTE"
        })
        
    # D2: Vượt cấp -> WARN_PREREQUISITE (Cảnh báo nhưng vẫn cho link)
    for i, q in enumerate(random.sample(d2_pool, 5), 1):
        hub_cases.append({
            "case_id": f"D2_HUB_{i:02d}",
            "dimension": "D2",
            "description": "Học viên hỏi vượt cấp (Hỏi Agent/RAG khi mới học Day 1)",
            "input": {
                "user_query": q,
                "student_profile": "profile_day1_only_no_llm", 
                "cohort_schedule": "K4"
            },
            "expected_action": "WARN_PREREQUISITE",
            "expected_warning": "PREREQUISITE_MISSING"
        })

    # === BOT CON CASES (10 CASES) ===
    bot_cases = []
    
    # D4: Ngoài luồng/Code -> REJECT
    for i, q in enumerate(random.sample(d4_pool, 5), 1):
        bot_cases.append({
            "case_id": f"D4_BOT_{i:02d}",
            "dimension": "D4",
            "description": "Yêu cầu support code/lỗi nằm ngoài phạm vi Slide",
            "input": {
                "user_query": q,
                "target_bot": "Day 1"
            },
            "expected_action": "REJECT",
            "expected_citation": False
        })
        
    # D3/D5: Trích dẫn & Chống ảo giác -> ANSWER
    for i, q in enumerate(random.sample(d35_pool, 5), 1):
        bot_cases.append({
            "case_id": f"D35_BOT_{i:02d}",
            "dimension": "D3_D5",
            "description": "Hỏi thông số, so sánh. Bắt buộc có Citation.",
            "input": {
                "user_query": q,
                "target_bot": "Day 2"
            },
            "expected_action": "ANSWER",
            "expected_citation": True
        })

    BENCHMARK_DIR.mkdir(parents=True, exist_ok=True)
    
    with open(BENCHMARK_DIR / "hub_routing_real.json", "w", encoding="utf-8") as f:
        json.dump(hub_cases, f, ensure_ascii=False, indent=2)
        
    with open(BENCHMARK_DIR / "bot_con_real.json", "w", encoding="utf-8") as f:
        json.dump(bot_cases, f, ensure_ascii=False, indent=2)
        
    print(f"✅ Đã tạo thành công bộ Benchmark với phân tách REJECT(D4) và WARN(D2)!")

if __name__ == "__main__":
    generate_benchmark()
