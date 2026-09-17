# Thư Mục Đánh Giá & Kiểm Thử (Evaluation) — VLearn Hub & Spoke Tutor

> **Mục tiêu:** Lưu trữ bộ Golden Set kiểm thử chuẩn và báo cáo đo lường thực nghiệm phục vụ nghiệm thu các mốc **CP3 (16:00 · 17/9)** và **CP4 (21:00 · 17/9)**.

---

## 📂 Danh mục tệp trong thư mục `eval/`

| Tệp tin | Định dạng | Nội dung chi tiết |
|---|:---:|---|
| [`golden_set.json`](golden_set.json) | JSON | **20 ca kiểm thử chuẩn** phân loại theo taxonomy 4 lớp chỗ khó (① Nguồn sự thật, ② Mơ hồ/thiếu thông tin, ③ Ngoài phạm vi/thẩm quyền, ④ Đặc thù nghiệp vụ). 100% ca kiểm thử được trích xuất từ 13.494 lượt chatlog thật của BTC (`tutor_turns.csv`) có gắn mã `turn_id`. |
| [`run_results.md`](run_results.md) | Markdown | **Báo cáo kết quả kiểm thử thực thi Lượt 1 (Run 1):** Bảng số liệu đo đếm 17/20 ca đạt (85.0%), phân tích chuyên sâu nguyên nhân 3 ca lỗi và kết quả sau khi tinh chỉnh đạt 20/20 ca (100.0%). |
| [`results.md`](results.md) | Markdown | **Bảng đối chứng định lượng tổng thể:** So sánh chi tiết giữa Baseline cũ (28.0% thiếu nguồn, 0.2% hỏi ngược) và kiến trúc Hub & Spoke (100% trích dẫn đúng trang, -62.5% token). |
| [`course_knowledge.json`](course_knowledge.json) | JSON | Bản đồ tri thức 6 ngày học được trích xuất trực tiếp từ 2 bộ slide 29 trang (`d1-slide-hackathon.pdf`, `d2-slide-hackathon.pdf`) và 6 transcript sạch (`[Txx-NNN]`). |
| [`golden_set_vlearn.json`](golden_set_vlearn.json) | JSON | Bản đối chiếu mở rộng phân loại theo 3 nhóm tác tử (Cross-day navigation, In-lecture sub-bot, Security/OOS). |
