# Thư mục Kiểm thử, Đánh giá & Khai phá Dữ liệu (Evaluation & Mining)

> **Mục tiêu:** Cung cấp Bằng chứng (Evidence) cho Rubric R1, minh họa Taxonomy Chỗ Khó (R3) và chứng minh quá trình Kiểm thử/Quality Bar (R4).

Thư mục `eval/` đóng vai trò là "trái tim" về mặt số liệu và kiểm định chất lượng của dự án VLearn Hub & Spoke. Mọi quyết định thiết kế kiến trúc đều bắt nguồn từ dữ liệu trong thư mục này.

---

## 1. Cấu trúc Thư mục

### 📊 Nhóm Data Mining & Bằng chứng (Rubric R1, R3)
- **`data_mining/`**: Chứa báo cáo `CP3_JUSTIFICATION_REPORT.md` — Phân tích NLP cào từ 13.494 dòng chatlog thực tế. Bóc tách chính xác số lượng lỗi ảo giác (D3, D5), lỗi vượt cấp (D2 - 97 cases), và lỗi ngoài luồng (D4 - 1.151 cases). Đây là căn cứ tuyệt đối để thiết kế 4 lớp rủi ro trong `spec.md`.

### 🧪 Nhóm Kiểm thử & Quality Bar (Rubric R4)
- **`benchmark_runner.py`**: Công cụ chạy tự động (Automated Test Runner) sử dụng LLM-as-a-Judge để chấm điểm hệ thống dựa trên Golden Set (20 cases).
- **`benchmark/`**: Chứa các file định nghĩa kịch bản Golden Set theo đúng 4 nhóm lỗi (D1_HUB, D2_HUB, D35_BOT, D4_BOT).
- **`results.md`**: Bảng báo cáo kết quả kiểm thử chính thức (Run 1) chốt lúc nộp Checkpoint 4. Hệ thống đạt tổng điểm **90.0% Pass Rate** (18/20 cases), đáp ứng và vượt mốc Quality Bar đã cam kết.
- **`langgraph_agent.py`**: Bản mô phỏng (Mock agent) chạy dưới dạng CLI dùng để feed vào Benchmark Runner.

### 🗂️ Nhóm Dữ liệu Môi trường (Environment Data)
- **`knowledge_index.json`**: Trái tim của Hub Bot. Chứa danh sách các khái niệm (concept), bài học, metadata slide/transcript và quan hệ prerequisite để Hub đưa ra quyết định định tuyến.
- **`index_runs/`**: Nhật ký (Log) của Pipeline `auto_index.py` mỗi khi nạp file PDF mới.
- **`mock_data/`**: Chứa các file mô phỏng DB (tiến độ học viên, lịch cohort) để phục vụ cho Hub Bot mà không cần cắm vào DB thật của VinUni.

---

## 2. Cách đọc Báo cáo Kết thử (R4)

Giám khảo có thể xem chi tiết từng chiều chất lượng (Routing Precision, Prerequisite Accuracy, Zero-Hallucination Rate...) được trình bày rõ ràng tại file **[`results.md`](./results.md)**. Báo cáo này đã đối chiếu trực tiếp với Quality Bar được chốt trong `spec.md`.

## 3. Cách chạy lại Benchmark (Tuỳ chọn)

Nếu muốn tự tay kiểm chứng lại con số 90% Pass Rate, bạn có thể khởi chạy script Benchmark tự động:

```bash
export GEMINI_API_KEY="your-api-key"
python eval/benchmark_runner.py
```
Hệ thống sẽ chạy qua 20 cases, đánh giá tính "Grounded" và "Helpful", sau đó in ra thống kê cuối cùng.
