# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Bùi Thị Thu Uyên  
**Mã học viên:** 2A202602613  
**Vai trò:** User Research & Data Mining Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm
Với vai trò phụ trách nghiên cứu người dùng và dữ liệu, công việc chính của tôi là đảm bảo sản phẩm bám sát nhu cầu thực tế của học viên. Tôi đã sử dụng Python để làm sạch và phân tích hơn 13.000 dòng dữ liệu chatlog từ tệp `tutor_turns.csv`, đồng thời tổ chức phỏng vấn và kiểm thử (validation) trực tiếp với 5 bạn sinh viên để đánh giá nguyên mẫu (prototype) của nhóm, từ đó xây dựng ma trận phân loại chỗ khó trong tài liệu Spec (Mục 5).

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Định lượng vấn đề của người dùng:** Qua phân tích dữ liệu, tôi tìm ra con số cốt lõi: 28% phản hồi của trợ lý AI cũ không có trích dẫn. Thông qua phỏng vấn thực tế, các bạn học viên phản ánh việc phải tự lật tìm trong file PDF hàng chục trang mất rất nhiều thời gian. Điều này giúp nhóm củng cố quyết định phát triển tính năng tự động hiển thị tài liệu và trích dẫn chính xác số trang slide.
- **Phát hiện các lỗ hổng bảo mật từ log:** Trong quá trình đọc dữ liệu, tôi tìm thấy các truy vấn cố tình can thiệp hệ thống (prompt injection, ví dụ `T00274`). Từ đó, tôi đề xuất nhóm phải chú trọng việc xây dựng các bộ lọc bảo mật để đảm bảo bot không bị "bẫy" bởi người dùng.

### 3. Vấp ngã & Bài học xương máu
Bài học lớn nhất của tôi là nhận ra **bẫy suy diễn hộ người dùng**. Ban đầu, tôi cho rằng học viên cần bot tự động tóm tắt và diễn giải lại toàn bộ khái niệm thật chi tiết. Tuy nhiên, dữ liệu thực tế và kết quả phỏng vấn lại cho thấy người học đôi khi cảm thấy bối rối hoặc mất lòng tin khi bot trả lời dài nhưng không rõ nguồn gốc (như trường hợp `T00034`). Tôi học được cách áp dụng nguyên tắc HAX G10: thay vì để AI tự đoán ý, hệ thống cần được thiết kế để đặt câu hỏi ngược lại nhằm làm rõ nhu cầu thực sự của người dùng.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Tôi từng nghĩ AI là một công cụ có thể tự động hóa mọi thứ một cách hoàn hảo. Giờ đây, tôi hiểu rằng giá trị lớn nhất của sản phẩm AI nằm ở khả năng giải quyết đúng "việc cần làm" (Job-to-be-done) của con người một cách minh bạch. Một thiết kế AI tốt (Responsible AI) phải tôn trọng tính tự chủ của người học, cung cấp thông tin có nguồn gốc rõ ràng (Grounding) thay vì chỉ ưu tiên tạo ra những văn bản dài và mượt mà.

### 5. Kế hoạch phát triển tiếp theo
Tôi dự định sẽ áp dụng các phương pháp kết hợp giữa phân tích log định lượng và phỏng vấn định tính mà mình học được trong Hackathon vào các bài tập lớn và dự án nghiên cứu nghiên cứu hành vi tại trường trong các kỳ học tới.
