import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
CSV_PATH = REPO_ROOT / "hackathon_docs" / "data" / "vlearn-pack" / "chatlog" / "tutor_turns.csv"
OUT_DIR = REPO_ROOT / "eval" / "data_mining"

def generate_eda_dashboard():
    print("[1] Đang tải dữ liệu gốc...")
    df = pd.read_csv(CSV_PATH)
    
    # Tiền xử lý
    df['asked_at_vn'] = pd.to_datetime(df['asked_at_vn'], errors='coerce')
    df['hour'] = df['asked_at_vn'].dt.hour
    
    plt.style.use('ggplot')
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('VLEARN CHATLOG - EXPLORATORY DATA ANALYSIS (EDA)', fontsize=20, fontweight='bold')
    
    # 1. Preset vs Manual (Pie Chart)
    preset_mask = df['is_preset'].astype(str).str.lower() == 'true'
    preset_val = preset_mask.sum()
    manual_val = len(df) - preset_val
    axes[0, 0].pie([manual_val, preset_val], labels=['Tự gõ (Manual)', 'Câu hỏi mẫu (Preset)'], 
                   autopct='%1.1f%%', startangle=90, colors=['#3498db', '#e74c3c'], shadow=True)
    axes[0, 0].set_title('Hành vi Đặt câu hỏi', fontsize=14, fontweight='bold')

    # 2. Phân bổ Cohort (Bar Chart)
    cohort_counts = df['cohort_hint'].value_counts().head(5)
    cohort_counts.plot(kind='bar', ax=axes[0, 1], color='#2ecc71', edgecolor='black')
    axes[0, 1].set_title('Phân bổ Lượt hỏi theo Cohort', fontsize=14, fontweight='bold')
    axes[0, 1].set_ylabel('Số lượng')
    axes[0, 1].tick_params(axis='x', rotation=0)

    # 3. Top 10 Lectures (Horizontal Bar)
    lec_counts = df[~preset_mask]['lecture_code'].value_counts().head(10)
    lec_counts.sort_values().plot(kind='barh', ax=axes[1, 0], color='#9b59b6', edgecolor='black')
    axes[1, 0].set_title('Top 10 Bài giảng (Chỉ tính câu hỏi Tự gõ)', fontsize=14, fontweight='bold')

    # 4. Hourly Activity (Line Chart)
    hour_counts = df['hour'].value_counts().sort_index()
    hour_counts.plot(kind='line', marker='o', ax=axes[1, 1], color='#f39c12', linewidth=2)
    axes[1, 1].set_title('Khung giờ Tương tác (Activity by Hour)', fontsize=14, fontweight='bold')
    axes[1, 1].set_xlabel('Giờ trong ngày (0 - 23h)')
    axes[1, 1].set_xticks(range(0, 24, 2))
    axes[1, 1].grid(True, linestyle='--', alpha=0.7)

    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    img_path = OUT_DIR / "eda_dashboard.png"
    plt.savefig(img_path, dpi=300)
    print(f"[2] Đã lưu Dashboard ảnh tại: {img_path}")

if __name__ == "__main__":
    generate_eda_dashboard()
