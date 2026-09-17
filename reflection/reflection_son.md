# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Nguyễn Khánh Sơn  
**Mã học viên:** 2A202602388  
**Vai trò:** Đội trưởng / Product Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm trong 47.5 giờ
Trong 47.5 giờ của Hackathon, tôi đảm nhận vai trò Đội trưởng và Product Lead, đồng thời trực tiếp xây dựng kiến trúc API lõi trên nền tảng Next.js. Trách nhiệm của tôi là chèo lái định hướng sản phẩm và đảm bảo luồng dữ liệu Hub & Spoke chạy mượt mà:
- **Thiết kế Backend API:** Xây dựng endpoint `api/chat-hub` và `api/chat-spoke`, kết nối an toàn với Gemini 3.5 Flash Lite.
- **Quản trị Tiến độ & Tính năng:** Lên cấu trúc `spec.md`, quyết định cắt bỏ các tính năng dư thừa và tập trung vào luồng Deep-linking (định tuyến thẳng tới trang PDF).

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Từ bỏ Monolithic RAG:** Dựa trên phân tích 13.494 chatlog, tôi quyết định không nhồi toàn bộ giáo trình vào một prompt khổng lồ mà tách thành Hub (định vị) và Spoke (trả lời chuyên sâu). Kết quả giúp tiết kiệm hơn 60% lượng token và tăng độ chính xác của trích dẫn lên tuyệt đối.
- **Tích hợp Deep-linking Regex:** Xây dựng bộ parse Regex để tự động trích xuất cấu trúc `[text](#deep-link-day-X-slide-Y-highlight-Z)` từ phản hồi của Hub Bot, ép giao diện Frontend phải nhảy ngay tới số trang slide thực tế mà không bắt người học phải tự dò tìm.

### 3. Vấp ngã & Bài học xương máu
Khủng hoảng thót tim nhất của tôi là **Khủng hoảng độ trễ token** ngay trước thềm Checkpoint. Khi người dùng chat nhiều lượt, lịch sử hội thoại vô tình lưu trữ lẫn lộn các thẻ HTML và metadata dài dòng, đẩy dung lượng prompt lên tới hơn 1.500 tokens, khiến độ trễ (latency) của API kéo dài lên tới hơn 20 giây và làm sập Frontend. Tôi đã phải trực tiếp rà soát server log, viết thuật toán nén lịch sử và bóc tách rác HTML, giúp đưa độ trễ quay về mốc 1.5s - 2s ổn định.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Hackathon đã phá vỡ hoàn toàn tư duy "code truyền thống" của tôi. Với phần mềm thông thường, 1 + 1 = 2. Nhưng với AI, đó là một cỗ máy xác suất. Tôi nhận ra người làm sản phẩm AI giỏi không phải là phó mặc cho mô hình tự do sáng tạo, mà phải xây dựng các **hàng rào bảo vệ (Guardrails)**. Khi Hub Bot đối mặt với câu hỏi nằm ngoài phạm vi, tôi đã thiết kế kịch bản fallback để nó từ chối khéo léo thay vì cố gắng "ảo giác" (hallucinate) ra một câu trả lời rỗng, đảm bảo tính trách nhiệm cao nhất cho dữ liệu giáo dục.

### 5. Kế hoạch phát triển tiếp theo
Mục tiêu gần nhất là cùng nhóm trình bày thật bùng nổ tại vòng Live Demo. Xa hơn, tôi muốn tối ưu luồng xử lý Context Window để hệ thống có thể tóm tắt đối chiếu kiến thức chéo giữa nhiều môn học khác nhau, sẵn sàng bàn giao cho đội ngũ phát triển VLearn.
