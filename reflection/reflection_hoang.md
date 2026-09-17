# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Ngô Xuân Hoàng  
**Mã học viên:** 2A202602597  
**Vai trò:** Kỹ sư Giao diện & Hỗ trợ Kiểm thử (Frontend UI/UX & Testing Engineer) — Nhóm SHUP (Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm
Trong dự án này, tôi chịu trách nhiệm phát triển giao diện người dùng (Frontend) và hỗ trợ kiểm thử trải nghiệm. Công việc của tôi bao gồm cấu trúc file HTML/CSS, lập trình giao diện chia đôi màn hình (Split-screen) để kết hợp khu vực hiển thị bài giảng và khung chat, xây dựng các trạng thái loading, và hỗ trợ tiến hành khảo sát giao diện với người dùng tại phòng thi.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Tích hợp trình xem tài liệu trực tiếp:** Để tránh việc học viên phải tải file PDF nặng hoặc chuyển tab liên tục, tôi đã sử dụng thư viện `pdf.min.js` của Mozilla để hiển thị tài liệu trực tiếp trên trình duyệt. Việc cấu hình Canvas để hiển thị rõ nét tài liệu trong không gian bị giới hạn của màn hình chia đôi là một thách thức khá lớn nhưng đã giải quyết được vấn đề gián đoạn luồng học tập của người dùng.
- **Minh bạch hóa thời gian xử lý:** Do các mô hình AI cần thời gian để phản hồi, tôi đã thêm các yếu tố UI như đồng hồ đếm giây hoặc nhãn trạng thái hệ thống. Quyết định này giúp người dùng biết hệ thống vẫn đang hoạt động bình thường, giảm thiểu cảm giác chờ đợi và ấn nhầm.

### 3. Vấp ngã & Bài học xương máu
Sự cố đáng nhớ nhất của tôi liên quan đến việc tối ưu dữ liệu truyền tải giữa Frontend và Backend. Trong lúc hoàn thiện giao diện, chúng tôi phát hiện hệ thống xử lý rất chậm. Nguyên nhân là do tôi đã để giao diện gửi nguyên cả các đoạn mã HTML dư thừa lên API trong phần lịch sử hội thoại. Từ vấp ngã này, tôi học được nguyên tắc cốt lõi trong thiết kế ứng dụng AI: Cần phải phân tách nghiêm ngặt giữa dữ liệu phục vụ hiển thị (UI) và dữ liệu lõi cần xử lý (Payload) để tránh gây nghẽn hệ thống.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Trước khi tham gia Hackathon, tôi thường nghĩ vai trò của giao diện chỉ là làm cho ứng dụng trông đẹp mắt. Tuy nhiên, khi làm việc với AI, tôi nhận ra UI/UX chính là công cụ điều hướng tâm lý người dùng. Một ứng dụng AI có thể mất vài giây để suy luận, và việc của Frontend là thiết kế các vi tương tác (micro-interactions) để che lấp đi khoảng thời gian đó, đồng thời làm nổi bật các phần trích dẫn để tăng tính minh bạch cho câu trả lời.

### 5. Kế hoạch phát triển tiếp theo
Sau Hackathon, tôi dự định sẽ dành thời gian học thêm về các framework Frontend hiện đại để xây dựng giao diện hiệu quả hơn. Đồng thời, tôi sẽ cùng nhóm chuẩn bị các phương án xử lý rủi ro (như quay sẵn video demo) để đảm bảo bài thuyết trình không bị ảnh hưởng nếu gặp sự cố mạng lưới.
