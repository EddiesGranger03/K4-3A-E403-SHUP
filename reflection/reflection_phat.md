# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Lê Châu Trần Phát  
**Mã học viên:** 2A2026025245  
**Vai trò:** AI & Evaluation Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm
Nhiệm vụ của tôi trong dự án tập trung vào kỹ thuật Prompt Engineering và đánh giá độ chính xác của mô hình. Tôi phụ trách viết các chỉ thị hệ thống (System Prompt) cho Bot Hỗ trợ và Bot con, thiết lập giới hạn ngữ cảnh cho từng buổi học, và xây dựng Bộ kiểm thử tiêu chuẩn (Golden Set) gồm 20 tình huống thực tế để đánh giá hiệu năng của hệ thống.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Giới hạn phạm vi câu trả lời:** Để hạn chế tình trạng AI trả lời lan man, tôi đã thiết lập quy định nghiêm ngặt trong prompt: Bot con chỉ được trả lời tối đa 3 câu và bắt buộc phải đính kèm định dạng `[Trang X - Slide Day Y]`. Nếu thông tin không có trong tài liệu, bot phải phản hồi là không biết thay vì tự tìm kiếm thông tin bên ngoài.
- **Xây dựng bộ định tuyến (Semantic Router):** Thay vì gửi tất cả tài liệu vào cùng một prompt, tôi thiết lập một bộ định tuyến tại Bot Hỗ trợ để phân tích ý định của người dùng, sau đó mới gọi dữ liệu tương ứng. Việc này giúp hạn chế tình trạng mô hình bỏ sót thông tin (Lost in the middle) khi ngữ cảnh quá dài.

### 3. Vấp ngã & Bài học xương máu
Quá trình kiểm thử là giai đoạn tôi gặp nhiều khó khăn nhất. Trong **lượt chạy kiểm thử đầu tiên (Run 1)**, hệ thống chỉ vượt qua 17/20 tình huống (đạt 85%). Vấn đề phát sinh ở các truy vấn quá ngắn gọn (ví dụ: *"Prompting là gì?"*), khiến bộ định tuyến phân loại sai ngày học thay vì đặt câu hỏi làm rõ. Thay vì chỉnh sửa file dữ liệu kiểm thử để có kết quả tốt hơn, tôi đã xem xét lại thuật toán, thay đổi trọng số phân loại và siết chặt các từ khóa trong prompt. Kết quả ở lượt kiểm thử thứ 2 đã đạt mức 100%.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Bài học quan trọng nhất tôi rút ra là hiểu rõ tính hai mặt của sai số trong AI, cụ thể là **sự đánh đổi giữa False Positive và False Negative**. Trong lĩnh vực giáo dục, việc cung cấp sai kiến thức (False Positive) để lại hậu quả nghiêm trọng hơn rất nhiều so với việc hệ thống từ chối trả lời (False Negative). Tư duy làm AI của tôi chuyển từ việc cố gắng làm cho mô hình "thông minh nhất có thể" sang việc làm cho nó "đáng tin cậy nhất có thể" thông qua việc đo lường bằng các số liệu cụ thể trên Golden Set.

### 5. Kế hoạch phát triển tiếp theo
Nếu có thêm thời gian, tôi muốn mở rộng bộ Golden Set từ 20 câu lên 100 câu để kiểm tra các tình huống hiếm gặp (edge-cases) kỹ hơn. Tôi cũng muốn tìm hiểu thêm về kỹ thuật dùng mô hình lớn để chấm điểm tự động (LLM-as-a-judge) nhằm cải thiện quy trình đánh giá.
