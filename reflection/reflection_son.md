# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Nguyễn Khánh Sơn  
**Mã học viên:** 2A202602388  
**Vai trò:** Đội trưởng / Product Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm
Trong Hackathon, tôi đảm nhận vai trò quản lý dự án (Product Lead) và phát triển kiến trúc Backend trên nền tảng Next.js. Trách nhiệm cụ thể của tôi là xây dựng cấu trúc API định tuyến (`api/chat-hub` và `api/chat-spoke`), tích hợp mô hình Gemini 3.5 Flash Lite, và đảm bảo sự liên kết mượt mà giữa các thành phần hệ thống theo đặc tả Spec đã thống nhất.


**Công cụ AI hỗ trợ:** Trong quá trình code, tôi đã sử dụng GitHub Copilot để tự động hoàn thiện các đoạn mã boilerplate của Next.js và dùng Gemini 3.5 Flash để hỗ trợ viết nhanh các bộ lọc Regex phức tạp dùng trong cơ chế Deep-linking, giúp tiết kiệm ít nhất 4 tiếng mò mẫm tài liệu.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Áp dụng kiến trúc Hub & Spoke:** Thay vì nhồi toàn bộ kiến thức vào một mô hình duy nhất, tôi quyết định phân tách luồng xử lý: Hub Bot làm nhiệm vụ phân tích ý định và định hướng, trong khi Spoke Bot phụ trách trả lời chi tiết theo từng ngày học (Day 1, Day 2). Điều này giúp hệ thống hoạt động chính xác và có tính mở rộng cao hơn.
- **Xử lý cơ chế Deep-linking:** Tôi đã phát triển thuật toán trích xuất tham số từ phản hồi của mô hình để truyền xuống giao diện, bắt buộc trình duyệt phải mở đúng số trang hoặc đoạn văn bản (transcript) tương ứng với nội dung học viên đang hỏi.

### 3. Vấp ngã & Bài học xương máu
Một khó khăn lớn là giải quyết **Khủng hoảng độ trễ token và lỗi Out of Context**. Trong các bản thử nghiệm đầu tiên, việc truyền quá nhiều nội dung nền (background context) khiến API của Gemini thi thoảng phản hồi rất chậm hoặc báo lỗi vượt quá giới hạn ngữ cảnh. Thay vì tiếp tục tăng giới hạn, tôi đã viết lại luồng Fallback Handling: khi người dùng hỏi các kiến thức ngoài phạm vi (ví dụ hỏi kiến thức Day 4 khi đang ở Day 1), hệ thống sẽ chủ động từ chối và hướng dẫn lại, giúp giảm tải dung lượng prompt và đưa tốc độ phản hồi về mức ổn định.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Làm việc với mô hình ngôn ngữ lớn giúp tôi nhận ra rằng AI không tự động xử lý mọi thứ một cách hoàn hảo. Tư duy phát triển phần mềm của tôi chuyển từ việc chỉ viết mã logic sang việc thiết kế các hệ thống rào cản (Guardrails). Quản lý những trường hợp AI không biết câu trả lời quan trọng không kém việc hướng dẫn AI trả lời đúng.

### 5. Kế hoạch phát triển tiếp theo
Mục tiêu ngắn hạn của tôi là rà soát lại mã nguồn Next.js và hoàn thiện kịch bản thuyết trình để chuẩn bị tốt nhất cho buổi bảo vệ dự án. Trong tương lai, tôi mong muốn phát triển cơ chế Admin hoàn chỉnh để giảng viên có thể tự tải lên các bài giảng mới một cách thuận tiện.
