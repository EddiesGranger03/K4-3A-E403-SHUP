# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Bùi Thị Thu Uyên  
**Mã học viên:** 2A202602613  
**Vai trò:** User Research & Data Mining Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm: Phân định rõ ràng mảng việc phụ trách trong 47.5h
Trong dự án này, tôi đảm nhận vai trò Trưởng nhóm Nghiên cứu Người dùng & Khai phá Dữ liệu. Nhiệm vụ cốt lõi của tôi là làm "chiếc mỏ neo thực chứng", đảm bảo mọi nhận định của nhóm đều bắt nguồn từ dữ liệu thật. Tôi dùng Python phân tích 13.494 lượt chatlog trong `tutor_turns.csv`, trực tiếp phỏng vấn 10 bạn học viên Willing Users tại phòng E403, và xây dựng ma trận 4 lớp chỗ khó (Mục 5) trong Spec.

### 2. Những quyết định then chốt & Thách thức vượt qua: Cụ thể hóa bằng con số và bằng chứng
- **Đào sâu nỗi đau học viên bằng con số:** Thông qua script lọc cột `has_citation`, tôi tìm ra bằng chứng đắt giá: **3.781 lượt phản hồi (28,0%) bị thiếu nguồn hoàn toàn**. Học viên tha thiết yêu cầu trích dẫn (`T00009`) nhưng AI liên tục đáp *"Rất tiếc..."* (`T00018`, `T00020`). 
- **Quyết định ép đội kỹ thuật làm Real PDF:** Khi phỏng vấn (Nguyên tắc Mom Test), 10/10 bạn học viên phàn nàn phải mất nửa tiếng để Ctrl+F trong file 80 trang. Tôi quyết định yêu cầu nhóm tập trung làm tính năng định tuyến trích dẫn chính xác và yêu cầu UI phải nhúng tài liệu thật để sinh viên đỡ cực.

### 3. Vấp ngã & Bài học xương máu: Bẫy suy diễn hộ người dùng
Bài học sâu sắc nhất của tôi chính là việc rơi vào **Cái bẫy "suy diễn hộ người dùng"**. Trong ngày đầu tiên, khi thấy học viên hỏi mơ hồ (*"giải thích đi"*), tôi từng nghĩ bot nên tự đoán ý và tóm tắt trả lời luôn cho tiện. Nhưng khi phân tích log, tôi thấy bot cũ đoán sai và làm học viên bực bội (`T00034`). Tôi nhận ra bài học từ nguyên tắc **HAX G10**: Tuyệt đối không được tự suy diễn bừa bãi! Tôi đã yêu cầu nhóm thiết kế lại luồng để Bot Hỗ Trợ kích hoạt câu hỏi gợi mở (`ask_probing_question`), ép người học tự định hình nhu cầu trước khi trả lời.

### 4. Sự chuyển biến về tư duy sản phẩm AI: Từ tư duy code truyền thống sang tư duy hệ thống AI xác suất
Trước đây, tôi nhìn nhận AI như một chiếc hộp đen thần kỳ. Giờ đây tôi hiểu: **Dữ liệu thô là tấm gương phản chiếu hành vi thật**. Mọi thuật toán AI dù tinh vi đến đâu cũng sẽ thất bại nếu ta không chịu đọc log hiểu user vấp ở đâu.
Hơn nữa, một sản phẩm AI phải là **AI có trách nhiệm (Responsible AI)**. Thiết kế AI không chỉ là giúp người dùng có câu trả lời, mà còn là bảo vệ tính tự học của họ (từ chối giải hộ quiz) và minh bạch về giới hạn (cảnh báo rõ ràng khi kiến thức nằm ngoài phạm vi).

### 5. Kế hoạch phát triển tiếp theo: Roadmap hoàn thiện và ứng dụng vào thực tế
- Tiếp tục đồng hành cùng nhóm hoàn thiện video demo và chuẩn bị báo cáo R6 Validation xuất sắc nhất cho ngày thi LAB 6.
- Áp dụng phương pháp nghiên cứu định tính kết hợp phân tích log định lượng vào các bài tập nghiên cứu hành vi người dùng trong tương lai tại VinUni.
