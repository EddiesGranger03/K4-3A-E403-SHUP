# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Lê Châu Trần Phát  
**Mã học viên:** 2A2026025245  
**Vai trò:** AI & Evaluation Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm: Phân định rõ ràng mảng việc phụ trách trong 47.5h
Trong nhóm, tôi chịu trách nhiệm chính về Kiến trúc Trí tuệ Nhân tạo & Đo lường Đánh giá. Trách nhiệm của tôi là: Thiết kế Prompt Engineering đa tầng cho Bot Hỗ Trợ và Bot Con, tạo cơ chế cô lập ngữ cảnh (Context Sandboxing) để cắt giảm token, xây dựng Bộ Kiểm thử Mẫu (Golden Set 20 cases) phân bổ đều 4 lớp chỗ khó, và vận hành kiểm thử thực nghiệm (Traceability).

### 2. Những quyết định then chốt & Thách thức vượt qua: Cụ thể hóa bằng con số và bằng chứng
- **Thiết kế Semantic Router:** Thách thức lớn nhất là làm sao bot không nhầm lẫn giữa Day 1 và Day 2 (Lost in the Middle). Tôi đã thiết kế cơ chế định tuyến (Router) tại Hub Bot phân loại intent trước, sau đó mới gọi Spoke Bot. Kết quả vừa triệt tiêu nhầm lẫn, vừa cắt giảm được 62,5% dung lượng context.
- **Kỷ luật độ dài và bắt buộc mã trích dẫn:** Đưa vào prompt Bot Con chỉ thị ngặt nghèo: giải thích bản chất ngắn gọn, bắt buộc kết thúc bằng `[Trang X - Slide Day Y]`. Nếu không có thông tin trên slide, bot bắt buộc từ chối.

### 3. Vấp ngã & Bài học xương máu: Lỗi kiểm thử Run 1
Khoảnh khắc thót tim nhất là **Lỗi kiểm thử Run 1** trên Golden Set. Hệ thống chỉ đạt 17/20 ca (85%), rớt 3 ca kiểm thử:
- Ca `TC_L2_03` (Hỏi cụt lủn *"Prompting là gì?"*): Router bị thiên kiến (bias) nhảy vào Day 1 thay vì kích hoạt câu hỏi làm rõ.
- Ca `TC_L4_06`: Câu hỏi *"Phân biệt PM trong kỷ nguyên AI"* bị chuyển nhầm sang Day 1 (vì có chữ "AI"), trong khi nằm ở Day 2 Slide 14.
Tôi không sửa dữ liệu test để gian lận, mà kiên nhẫn tinh chỉnh bảng ánh xạ trọng số ngữ nghĩa (tăng từ khóa `Cost of Error` lên mức 2.0 cho Day 2) và siết chặt Regex. Kết quả Lượt 2 đạt tuyệt đối 20/20 (100%).

### 4. Sự chuyển biến về tư duy sản phẩm AI: Từ tư duy code truyền thống sang tư duy hệ thống AI xác suất
Bài học lớn nhất của tôi là **Sự đánh đổi False Positive vs False Negative**. Trong ứng dụng giáo dục, chi phí sai sót (Cost of Error) của việc đưa ra thông tin sai lệch là cực đắt. Tôi chủ động thiết kế hệ thống thà chấp nhận False Negative (từ chối lịch sự và nói không có dữ liệu) còn hơn để xảy ra False Positive (tự tin bịa ra trang slide). 
Đồng thời, tư duy của tôi chuyển dịch hoàn toàn sang hướng **định lượng có căn cứ**: AI đáng tin cậy phải có Golden Set đo lường được, tỷ lệ Grounding và Defense bằng con số thực chứng, không phải "thấy nói mượt là được".

### 5. Kế hoạch phát triển tiếp theo: Roadmap hoàn thiện và ứng dụng vào thực tế
- Tích hợp các bộ đánh giá tự động (LLM-as-a-Judge) để tự động chấm điểm độ sâu sư phạm của câu trả lời.
- Mở rộng tập kiểm thử Golden Set từ 20 ca lên 100 ca để bao phủ toàn bộ các edge-case, ứng dụng làm chuẩn kiểm thử cho VLearn.
