# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Ngô Xuân Hoàng  
**Mã học viên:** 2A202602597  
**Vai trò:** Kỹ sư Giao diện & Hỗ trợ Kiểm thử (Frontend UI/UX & Testing Engineer) — Nhóm SHUP (Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò và Trách nhiệm của tôi trong Dự án
Trong dự án VLearn Hub & Spoke AI Tutor, tôi đảm nhận vai trò **Kỹ sư Giao diện & Hỗ trợ Kiểm thử (Frontend UI/UX & Testing Engineer)**, phối hợp chặt chẽ cùng Đội trưởng Nguyễn Khánh Sơn để hoàn thiện trải nghiệm người dùng và chuẩn bị các sản phẩm bàn giao thực tế:
- **Phát triển & Tinh chỉnh Giao diện UI/UX (`style.css`, `index.html`):** Thiết kế giao diện Dark Mode chuẩn thẩm mỹ hiện đại với hiệu ứng ánh sáng phát quang (Glowing Cyan & Neon Violet), tạo cảm giác trực quan và cao cấp cho người học.
- **Xây dựng các Vi tương tác (Micro-interactions):** Lập trình thanh chia tách kéo thả (Resizable Side Panel) giúp học viên tùy ý co giãn kích thước giữa Slide PDF và Chatbot; bổ sung hiệu ứng Shimmer Loading Bar và đồng hồ đếm giây thực tế (`thinkingTimer`) để người dùng thấy rõ bot đang suy luận.
- **Sản xuất Video Demo Checkpoint 3 (CP3):** Trực tiếp xây dựng kịch bản, quay và biên tập video thao tác thật 30 giây thể hiện luồng gọi AI qua NVIDIA NIM phục vụ nghiệm thu mốc CP3 đúng hạn.
- **Hỗ trợ Kiểm thử Giao diện & Trải nghiệm:** Chạy thử nghiệm giao diện trên nhiều độ phân giải màn hình khác nhau, hỗ trợ ghi nhận phản hồi từ các bạn Willing Users tại phòng E403.

---

### 2. Trải nghiệm Phối hợp Kỹ thuật cùng Đội trưởng
Điểm tựa kỹ thuật lớn nhất của nhóm trong suốt 47,5 giờ chính là **sự dấn thân mạnh mẽ của đội trưởng Nguyễn Khánh Sơn**. Sơn không chỉ là người định hình chiến lược sản phẩm mà còn là người trực tiếp gánh vác kiến trúc kỹ thuật lõi, dựng Backend Proxy, tích hợp API NVIDIA NIM và lập trình toàn bộ logic phân luồng đa tác tử.
- **Học hỏi từ sự cố gỡ lỗi Token của Sơn:**
  Khi nhóm chuẩn bị quay video demo CP3, hệ thống gặp hiện tượng phản hồi chậm tới 23.6 giây do prompt bị dính mã HTML dài 1.578 tokens. Chứng kiến Sơn bình tĩnh mở terminal, lần theo từng dòng server log để truy vết nguyên nhân, rồi trực tiếp viết thuật toán bóc tách HTML rác và nén lịch sử giúp kéo độ trễ xuống chỉ còn 1.6 giây là bài học thực tế vô giá đối với tôi về tư duy kỹ thuật điềm tĩnh và quyết đoán.
- **Tập trung làm tốt vai trò giao diện:**
  Nhờ Sơn gánh vác vững chắc phần backend và lõi AI, tôi có thể toàn tâm toàn ý chăm chút cho từng chi tiết giao diện: từ việc căn chỉnh thẻ liên kết slide `[Trang X - Slide Day Y]` sao cho học viên bấm vào là Canvas tự cuộn mượt mà, cho đến việc tối ưu hóa khả năng hiển thị thẻ Deep-link trên màn hình nhỏ.

---

### 3. Những Điểm Tự Hào Về Mặt Trải Nghiệm Người Dùng
1. **Giao diện Split-Screen tiện lợi:** Học viên không cần phải chuyển đổi qua lại giữa tab đọc slide và tab chat bot. Việc tích hợp Mozilla PDF.js trực tiếp cạnh khung chat giúp người học vừa đọc bài giảng vừa nhận giải thích chuyên sâu ngay lập tức.
2. **Minh bạch trạng thái hệ thống (HAX G1 & G2):** Huy hiệu trạng thái kết nối `apiStatusBadge` hiển thị trực tiếp tình trạng online của NVIDIA NIM Llama 3.2, kết hợp cùng hiệu ứng đếm giây giúp học viên luôn biết hệ thống đang xử lý ra sao, loại bỏ hoàn toàn cảm giác sốt ruột.

---

### 4. Bài học Lớn Nhất Rút Ra Cho Bản Thân
- **Sức mạnh của sự ăn ý trong đội ngũ:** Một nhóm mạnh không phải là ai cũng tranh nhau làm mọi thứ, mà là có một đội trưởng đầu tàu dám gánh vác phần việc nặng nhất và các thành viên phối hợp nhịp nhàng, tin tưởng tuyệt đối vào năng lực của nhau.
- **Giao diện là cầu nối của AI:** Dù thuật toán AI có thông minh đến đâu, nếu giao diện rối rắm, giật lag hay thiếu trích dẫn trực quan thì người dùng cũng sẽ từ bỏ. Thiết kế UI cho AI đòi hỏi sự tinh tế để cân bằng giữa tính tự động hóa và quyền kiểm soát của người dùng.

---

### 5. Kế hoạch Phát triển Tiếp theo
- Nâng cao kỹ năng lập trình Frontend hiện đại và tìm hiểu sâu hơn về kiến trúc Backend cho các ứng dụng trí tuệ nhân tạo.
- Tiếp tục hỗ trợ đội trưởng Sơn và cả nhóm chuẩn bị thiết bị trình chiếu tốt nhất cho buổi pitch chung kết tại LAB 6.
