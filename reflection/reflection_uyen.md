# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Bùi Thị Thu Uyên  
**Mã học viên:** 2A202602613  
**Vai trò:** User Research & Data Mining Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò và Trách nhiệm của tôi trong Dự án
Trong dự án này, tôi là "tiếng nói của người dùng". Không gõ những dòng code Backend phức tạp, nhiệm vụ của tôi là đảm bảo mọi tính năng nhóm tạo ra đều giải quyết đúng "nỗi đau" thực tế của học viên:
- **Khai phá Dữ liệu (Data Mining):** Trực tiếp đọc và phân tích tập dữ liệu 13.494 dòng chatlog để tìm ra vấn đề cốt lõi (28% câu trả lời thiếu trích dẫn nguồn, sinh viên tốn 20-40 phút tìm tài liệu).
- **Trưởng nhóm Kiểm thử Người dùng (R6 - Validation):** Chịu trách nhiệm mang Prototype đi thử nghiệm thực tế với 5 bạn học viên tại phòng E403, ghi nhận Feedback và ép đội kỹ thuật phải nâng cấp sản phẩm.

---

### 2. Hành trình Đào sâu Nỗi đau và Cải tiến Sản phẩm (R6)
Phần tự hào nhất của tôi trong Hackathon là đã biến Feedback của người dùng thành những thay đổi ngoạn mục trong phiên bản mới nhất (Version 18/09):
1. **Lắng nghe phàn nàn về Giao diện Giả lập:**
   Khi mang bản Mockup đi test, người dùng ngay lập tức "bất mãn" vì màn hình hiển thị slide chỉ là một cục màu xanh lá vô tri. Họ nói: *"Ủa thế này thì học cái gì, slide thật đâu?"*. Tôi đã mang câu nói này đập bàn đội kỹ thuật (Sơn & Hoàng) và kết quả là chúng tôi có một **Real PDF Iframe** và **Transcript Markdown View** vô cùng chuyên nghiệp.
2. **Chiến thắng của Deep-linking & Highlight:**
   Người dùng (Nhật & Tài) than phiền rằng ngay cả khi có slide PDF, họ cũng lười tự cuộn chuột đi tìm trang 15 hay trang 20. Tôi đã đề xuất nhóm phải làm cơ chế **Tự động chuyển trang**. Giờ đây, khi Hub Bot đưa link, chỉ cần 1 click là Slide nháy đến đúng trang 18, đáp ứng hoàn hảo tính "lười" nhưng hiệu quả của sinh viên.
3. **Quyết định Khóa Scroll (Cuộn trang):**
   Một feedback cực hay khác là khi xem PDF, việc cuộn chuột tự do làm phá vỡ cảm giác "xem slide trình chiếu". Tôi đã yêu cầu Hoàng khóa hẳn cuộn chuột trên khung PDF, ép người dùng xài nút mũi tên `❮` `❯`. Một thay đổi nhỏ về UI nhưng mang lại cảm giác sư phạm (pedagogy) cực lớn!

---

### 3. Sự Chuyển biến Sâu sắc về Tư duy
47.5 tiếng làm Hackathon chứng minh cho tôi một chân lý: **Không có người dùng sai, chỉ có sản phẩm thiết kế chưa chạm đúng Insignt**.
Việc ép đội code phải đập đi làm lại cơ chế Slide PDF dù đã rất muộn cho thấy vai trò sống còn của vị trí User Research. Sản phẩm hoàn hảo về thuật toán (của Sơn và Phát) sẽ trở nên vô dụng nếu người dùng chê giao diện khó xài (UX kém).

---

### 4. Định hướng Tiếp theo
Tôi đã chuẩn bị sẵn sàng bản báo cáo `validation/user_testing_log.md` chỉn chu để bảo vệ số điểm R6 tuyệt đối cho nhóm. Tôi sẽ là người mở đầu bài thuyết trình, đưa Ban giám khảo đi từ Nỗi đau của 13.494 dòng chatlog đến Giải pháp Hub & Spoke tự động chuyển trang tuyệt vời của chúng tôi!
