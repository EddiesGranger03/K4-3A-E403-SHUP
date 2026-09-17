# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Bùi Thị Thu Uyên  
**Mã học viên:** 2A202602613  
**Vai trò:** User Research & Data Mining Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm trong 47.5 giờ
Tôi đảm nhận vai trò là "Cầu nối giữa máy móc và con người". Công việc của tôi tập trung vào khai phá dữ liệu (Data Mining) và nghiên cứu hành vi người dùng, đảm bảo nhóm không đi chệch hướng khỏi nhu cầu thực tế:
- **Phân tích Insight:** Đào sâu vào 13.494 dòng chatlog thực tế của khóa học để tìm ra "nỗi đau" lớn nhất của học viên.
- **Trưởng nhóm Kiểm thử Người dùng (R6 - Validation):** Lên kịch bản và thực hiện phỏng vấn dùng thử với 5 bạn học viên tại phòng E403, ghi nhận feedback và lập Changelog cải tiến.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Xác định Core Pain-point bằng Con số:** Thông qua data mining, tôi tìm ra bằng chứng đắt giá: 28% câu trả lời của trợ lý AI cũ thiếu nguồn, khiến sinh viên mất trung bình 20-40 phút tự lật mở hàng chục slide để đối chiếu. Quyết định then chốt của tôi là thuyết phục cả nhóm dồn 100% nguồn lực làm tính năng **Deep-linking (Trích dẫn chuyển trang tự động)** thay vì sa đà vào các tính năng màu mè khác.
- **Phản biện thiết kế của đội kỹ thuật:** Khi mang bản Prototype đi test, người dùng bất mãn vì Slide chỉ là một cục màu xanh giả lập. Tôi đã ép Sơn và Hoàng phải thay bằng Real PDF Iframe và bổ sung chế độ xem Markdown Transcript để người dùng có thể thực sự đọc và sao chép kiến thức làm Lab.

### 3. Vấp ngã & Bài học xương máu
Bài học lớn nhất của tôi là **Bẫy suy diễn hộ người dùng**. Lúc đầu, nhóm mặc định rằng học viên rất thích tính năng AI tự động tóm tắt mọi thứ. Tuy nhiên, khi đưa bản test thực tế, các bạn học viên phản hồi: *"Bot tóm tắt dài mấy tui cũng không tin, tui chỉ cần nó hiện đúng cái dòng chữ đó ở trang slide số mấy để tui tự đối chiếu"*. Tôi nhận ra việc "nhét chữ vào miệng user" là sai lầm chết người của người làm Product. Chúng tôi lập tức điều chỉnh: Bỏ bớt sự lan man của AI, chuyển sang ưu tiên UI khóa cuộn trang (ép dùng nút bấm) để highlight đúng vị trí slide, lấy lại niềm tin tuyệt đối của học viên.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Tôi đã thay đổi hoàn toàn cách nhìn về công nghệ. Một mô hình ngôn ngữ lớn (LLM) dù có thông số khủng đến mấy cũng vô nghĩa nếu nó không giải quyết được Job-to-be-done (JTBD) của con người. Trọng tâm của một sản phẩm AI không nằm ở việc con Bot nói hay như thế nào, mà nằm ở tính trách nhiệm, khả năng trích dẫn có căn cứ (Grounding), và tạo ra một luồng tương tác không ma sát (Frictionless) giúp giải phóng sức lao động.

### 5. Kế hoạch phát triển tiếp theo
Tôi đã chuẩn bị sẵn sàng bản báo cáo Validation tỉ mỉ nhất để bảo vệ điểm số tuyệt đối ở hạng mục R6. Sắp tới, tôi dự định sẽ khai phá thêm các phân nhóm dữ liệu (Cohort analysis) để cá nhân hóa lộ trình học tập, mở ra tính năng gợi ý tài liệu tùy biến theo từng phong cách tiếp thu của sinh viên.
