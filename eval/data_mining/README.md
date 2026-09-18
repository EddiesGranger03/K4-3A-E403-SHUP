# ⛏️ VLearn Chatlog Data Mining Pipeline

Thư mục này chứa các kịch bản (scripts) Phân tích Dữ liệu (Data Mining) được thiết kế riêng để **chứng minh tính cấp thiết của Kiến trúc Hub & Spoke và Hệ thống Benchmark D1-D5**, dựa trên dữ liệu thực tế từ hệ thống VLearn.

Thay vì tự phỏng đoán vấn đề, chúng tôi sử dụng Python để khai phá hơn **13,000+ lượt chat thực tế** của học viên, từ đó trích xuất ra các trường hợp (cases) rủi ro và các căn cứ dữ liệu (data-backed justification) cho dự án.

---

## 📂 Danh sách Scripts & Chức năng

### 1. `01_generate_benchmark_cases.py`
- **Mục đích:** Trích xuất tự động các câu hỏi gõ tay (manual queries) có chất lượng cao nhất từ file CSV chatlog để làm dữ liệu kiểm thử (Golden Set) cho LLM Judge.
- **Thuật toán:** Lọc các câu hỏi không phải "Preset", tìm kiếm theo từ khóa liên quan đến rủi ro (lỗi code, hỏi vượt cấp, hỏi thông số ảo giác) và chọn ngẫu nhiên.
- **Output:** 
  - `eval/benchmark/cases/hub_routing_real.json`
  - `eval/benchmark/cases/bot_con_real.json`

### 2. `02_analyze_d1_d5_risks.py`
- **Mục đích:** Quét 10,427 câu hỏi tự gõ và nhóm chúng vào 4 nhóm rủi ro tương ứng với Framework đánh giá (D1-D5). Script này chứng minh cho Giám khảo thấy học viên VLearn thực sự đang đối mặt với những vấn đề này mỗi ngày.
- **Thuật toán cốt lõi (Context-Aware Keyword Matching):**
  - Sử dụng **Regex Pipeline ưu tiên** để không đếm trùng lặp rủi ro.
  - **Nhận diện Ngữ cảnh (Context-Aware):** Cross-check giữa từ khóa câu hỏi và `lecture_code`. Ví dụ: Rủi ro D2 (Vượt cấp) chỉ được đếm khi học viên hỏi về "Agent/RAG" nhưng tiến độ hiện tại của họ đang ở "Day 1" hoặc "Day 2".
- **Output:**
  - `d1_d5_risk_analysis.png`: Biểu đồ Bar chart trực quan hóa phân bổ rủi ro.
  - `CP3_JUSTIFICATION_REPORT.md`: Báo cáo Markdown chi tiết chứa biểu đồ và trích dẫn (verbatims) thực tế của học viên để đưa vào Slide Thuyết trình.

---

## 🎯 Ý nghĩa chiến lược (Pitching Value)
Dữ liệu được khai phá từ thư mục này là "Vũ khí" để team bảo vệ dự án trước Ban Giám Khảo:
- Nó chứng minh **D1 (Hub Routing)** là cần thiết vì hàng trăm học viên "Lạc lối".
- Nó chứng minh **D2 (Prerequisite Check)** là cần thiết vì học viên thường xuyên nhảy cóc bài giảng (Hỏi RAG khi đang học LLM Foundation).
- Nó chứng minh **D4 (Out of scope Rejection)** là cần thiết vì có hơn 1000+ câu hỏi bắt Bot đi debug lỗi code Python/React.

### 0. `00_eda_dashboard.py` (Mới bổ sung)
- **Mục đích:** Khai phá dữ liệu tổng quan (Exploratory Data Analysis). Cung cấp cái nhìn bao quát về hành vi của 13,000+ lượt hỏi (Bao nhiêu % dùng câu hỏi mẫu, khóa nào hỏi nhiều nhất, học viên hay học giờ nào, bài nào khó nhất).
- **Output:** `eda_dashboard.png` (Biểu đồ 4 góc chuyên nghiệp ghép vào Pitch Deck).
