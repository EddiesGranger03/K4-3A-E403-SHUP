import pandas as pd
import matplotlib.pyplot as plt
import re
import random
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
CSV_PATH = REPO_ROOT / "hackathon_docs" / "data" / "vlearn-pack" / "chatlog" / "tutor_turns.csv"
OUT_DIR = REPO_ROOT / "eval" / "data_mining"

def clean_student_query(q):
    """Xóa bỏ các đoạn tiền tố do UI VLearn tự động chèn vào để lấy đúng text học viên gõ"""
    # Xóa (Đang học phần "...")
    q = re.sub(r'\(đang học phần.*?\)\s*', '', q, flags=re.IGNORECASE)
    # Xóa (Trang X, đoạn được chọn: "...")
    q = re.sub(r'\(trang.*?\)\s*', '', q, flags=re.IGNORECASE)
    return q.strip()

def categorize_risk(row):
    raw_q = str(row['student_question']).lower()
    q = clean_student_query(raw_q) # Câu hỏi đã được làm sạch
    reply = str(row['tutor_reply']).lower()
    lec = str(row['lecture_code']).upper()
    
    # 1. ƯU TIÊN D4: Out of scope (Dựa vào cả câu hỏi sạch VÀ câu trả lời của Bot cũ)
    # Nếu bot cũ đã phải xin lỗi/từ chối, chắc chắn là D4
    match_reply_reject = re.search(r'xin lỗi|không thuộc phạm vi|không hỗ trợ|chỉ giải đáp|nằm ngoài|không thể cung cấp', reply)
    if match_reply_reject:
        return pd.Series(["D4: Cần Rejection (Hỏi ngoài luồng/Code)", f"Phát hiện Bot cũ đã từ chối trả lời (Nằm ngoài phạm vi/Lỗi)"])
        
    # Từ khóa kỹ thuật đặc thù (Bỏ chữ 'react' vì dễ nhầm với ReAct Agent)
    match_d4_q = re.search(r'\b(python|flutter|nodejs|bug|error|c\+\+)\b|lỗi\b|cài đặt phần mềm|nộp bài|không chạy|tải phần mềm', q)
    if match_d4_q:
        return pd.Series(["D4: Cần Rejection (Hỏi ngoài luồng/Code)", f"Câu hỏi sạch chứa từ khóa kỹ thuật/nền tảng: '{match_d4_q.group(0)}'"])
        
    # 2. ƯU TIÊN D1: Navigation (Lạc lối)
    match_d1 = re.search(r'ở đâu\b|bài nào|tìm tài liệu|link|chủ đề nào', q)
    if match_d1:
        return pd.Series(["D1: Cần Hub Phân luồng (Lạc lối)", f"Câu hỏi chứa từ khóa lạc lối/tìm đường: '{match_d1.group(0)}'"])
        
    # 3. ƯU TIÊN D2: Prerequisite (Vượt cấp) - Context Aware
    day_num = 99
    lec_match = re.search(r'D(\d+)', lec)
    if lec_match:
        day_num = int(lec_match.group(1))
    else:
        q_match = re.search(r'day\s*0?(\d+)', raw_q) # Vẫn dùng raw_q để lấy hint bài học
        if q_match:
            day_num = int(q_match.group(1))
            
    match_agent = re.search(r'\b(agent|langgraph|crewai)\b|agentic', q)
    match_rag = re.search(r'\b(rag|vector|embedding|qdrant|pinecone)\b', q)
    
    if match_agent and day_num < 3:
        return pd.Series(["D2: Rủi ro Vượt cấp (Cần Prerequisite)", f"Hỏi về '{match_agent.group(0)}' khi đang ở Day {day_num} (Chưa học tới Day 3)"])
        
    if match_rag and day_num < 7:
        return pd.Series(["D2: Rủi ro Vượt cấp (Cần Prerequisite)", f"Hỏi về '{match_rag.group(0)}' khi đang ở Day {day_num} (Chưa học tới Day 7)"])
        
    # 4. ƯU TIÊN D3/D5: Hallucination risk
    match_d35 = re.search(r'thống kê|bao nhiêu\b|tham số|chính xác|công thức|toán học|so sánh|khác biệt', q)
    if match_d35:
        return pd.Series(["D3 & D5: Rủi ro Bịa đặt (Cần Citation Check)", f"Yêu cầu đối soát ngặt nghèo qua từ khóa: '{match_d35.group(0)}'"])
        
    return pd.Series(["SAFE", ""])

def analyze_risks():
    print("[1] Làm sạch (Clean) dữ liệu và đối chiếu chéo (Cross-check Reply)...")
    df = pd.read_csv(CSV_PATH)
    preset_mask = df['is_preset'].astype(str).str.lower() == 'true'
    df_manual = df[~preset_mask].copy()
    
    df_manual[['Risk_Category', 'Risk_Reason']] = df_manual.apply(categorize_risk, axis=1)
    df_risks = df_manual[df_manual['Risk_Category'] != 'SAFE']
    counts = df_risks['Risk_Category'].value_counts().to_dict()
    
    verbatims = {}
    random.seed(333) # Thay đổi seed để kiểm chứng độ mượt
    for cat in counts.keys():
        cat_df = df_risks[df_risks['Risk_Category'] == cat]
        samples = cat_df.sample(n=min(5, len(cat_df)))[['student_question', 'Risk_Reason']].to_dict('records')
        verbatims[cat] = samples

    print(f"[2] Vẽ biểu đồ Justification Chart mới...")
    plt.style.use('ggplot')
    fig, ax = plt.subplots(figsize=(12, 6))
    sorted_cats = sorted(counts.items(), key=lambda x: x[1])
    bars = ax.barh([x[0] for x in sorted_cats], [x[1] for x in sorted_cats], color=['#f39c12', '#2ecc71', '#3498db', '#e74c3c'])
    ax.set_title('Phân tích Rủi ro Hệ thống (NLP Cleaned + Reply Analyzed)', fontsize=15, fontweight='bold')
    ax.set_xlabel('Số lượng câu hỏi')
    for bar in bars:
        ax.text(bar.get_width() + 5, bar.get_y() + bar.get_height()/2, f"{bar.get_width():,}", va='center', fontweight='bold', color='black')
    plt.tight_layout()
    plt.savefig(OUT_DIR / "d1_d5_risk_nlp_cleaned.png", dpi=300)
    
    print("[3] Tạo báo cáo Markdown...")
    report_lines = [
        "# 📊 Báo cáo Dữ liệu: Căn cứ thiết kế Kiến trúc Hub & Spoke và Benchmark",
        "*(Sử dụng Thuật toán NLP Cleaning + Đối chiếu chéo Câu trả lời `tutor_reply` + Ràng buộc Ngữ cảnh Tiến độ)*",
        "",
        "![Risk Analysis Chart](/home/geminicancode/Desktop/Projects/AI_THUC_CHIEN/K4-3A-E403-SHUP/eval/data_mining/d1_d5_risk_nlp_cleaned.png)",
        ""
    ]
    
    for cat, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):
        report_lines.append(f"### 🚨 {cat}: {count:,} Lượt hỏi rủi ro")
        report_lines.append("*Bằng chứng thực tế (Đã clean tiền tố UI) và Giải thích của Thuật toán:*")
        for i, item in enumerate(verbatims[cat], 1):
            raw_q = str(item['student_question'])
            # In ra câu đã clean để dễ nhìn
            clean_q = clean_student_query(raw_q).replace(chr(10), ' ').strip()
            if len(clean_q) > 200: clean_q = clean_q[:200] + "..."
            reason = item['Risk_Reason']
            report_lines.append(f"> **VD {i}:** \"{clean_q}\"")
            report_lines.append(f"> 💡 **Giải thích:** {reason}\n>\n")
        report_lines.append("")
        
    (OUT_DIR / "CP3_JUSTIFICATION_REPORT.md").write_text("\n".join(report_lines), encoding="utf-8")
    print("✅ Hoàn tất!")

if __name__ == "__main__":
    analyze_risks()
