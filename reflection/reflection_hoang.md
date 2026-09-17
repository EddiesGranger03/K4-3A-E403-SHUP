# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Ngô Xuân Hoàng  
**Mã học viên:** 2A202602597  
**Vai trò:** Kỹ sư Giao diện & Hỗ trợ Kiểm thử (Frontend UI/UX & Testing Engineer) — Nhóm SHUP (Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm: Phân định rõ ràng mảng việc phụ trách trong 47.5h
Tôi đảm nhận vai trò Kỹ sư Giao diện & Hỗ trợ Kiểm thử, phối hợp chặt chẽ cùng đội trưởng Sơn để hoàn thiện trải nghiệm học tập. Trách nhiệm của tôi bao gồm: Phát triển giao diện `index.html`, `style.css`, xây dựng cấu trúc Split-screen hiện đại, lập trình các vi tương tác (hiệu ứng Shimmer Loading, thanh Resizable kéo thả), sản xuất Video Demo Checkpoint 3, và hỗ trợ chạy thử nghiệm đa màn hình cùng các Willing Users tại phòng E403.

### 2. Những quyết định then chốt & Thách thức vượt qua: Cụ thể hóa bằng con số và bằng chứng
- **Đưa PDF.js vào kiến trúc Split-screen:** Quyết định không sử dụng iframe thông thường dễ bị lỗi đen màn hình, tôi đã tích hợp trực tiếp thư viện `pdf.min.js` của Mozilla vào `app.js`. Việc render Canvas vector độ nét cao giúp học viên vừa đọc tài liệu vừa chat mượt mà, triệt tiêu việc phải mất hàng chục giây chuyển tab tải file 4MB.
- **Minh bạch hóa độ trễ qua UI (HAX G1 & G2):** Xây dựng huy hiệu trạng thái `apiStatusBadge` và đồng hồ đếm giây `thinkingTimer`. Việc cho học viên thấy AI đang online và đang phân tích giúp họ loại bỏ cảm giác sốt ruột và tăng lòng tin.

### 3. Vấp ngã & Bài học xương máu: Sự cố giao tiếp giữa UI và lõi AI
Khi nhóm chuẩn bị quay video demo CP3, tôi đã chứng kiến **Khủng hoảng độ trễ token** do lỗi lịch sử chat đẩy dung lượng prompt lên 1.578 tokens khiến hệ thống nghẽn hơn 20s. Mặc dù anh Sơn trực tiếp viết thuật toán bóc tách HTML rác và nén lịch sử kéo độ trễ xuống 1.6 giây, sự cố này để lại cho tôi bài học xương máu về thiết kế UI: Không bao giờ được gửi toàn bộ cây DOM dư thừa từ giao diện lên API. Giao diện (UI) và Dữ liệu lõi (Payload) phải được phân tách nghiêm ngặt để bảo vệ hiệu năng hệ thống.

### 4. Sự chuyển biến về tư duy sản phẩm AI: Từ tư duy code truyền thống sang tư duy hệ thống AI xác suất
Trước đây, tôi nghĩ làm Frontend cho ứng dụng chỉ là vẽ nút bấm và làm màu mè. Nhưng khi làm sản phẩm AI, tôi nhận ra: **Giao diện chính là cầu nối của hệ thống xác suất**. Dù thuật toán AI có thông minh đến đâu, nếu giao diện rối rắm, giật lag hay thiếu trích dẫn trực quan thì người dùng cũng sẽ từ bỏ. Thiết kế UI cho AI đòi hỏi sự tinh tế để cân bằng giữa tính tự động hóa và quyền kiểm soát của người dùng, đặc biệt là phải có căn cứ (highlight đúng slide, hiển thị đúng trang).

### 5. Kế hoạch phát triển tiếp theo: Roadmap hoàn thiện và ứng dụng vào thực tế
- Nâng cao kỹ năng lập trình Frontend hiện đại, tối ưu hóa các vi tương tác báo lỗi mượt mà hơn để tích hợp vào bản web-demo Next.js.
- Tiếp tục hỗ trợ đội trưởng và cả nhóm chuẩn bị thiết bị trình chiếu tốt nhất cho buổi pitch chung kết tại LAB 6.
