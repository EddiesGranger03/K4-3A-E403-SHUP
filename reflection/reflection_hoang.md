# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Ngô Xuân Hoàng  
**Mã học viên:** 2A202602597  
**Vai trò:** Kỹ sư Giao diện & Frontend Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm trong 47.5 giờ
Với vai trò Kỹ sư Giao diện, nhiệm vụ của tôi là biến những dòng logic AI khô khan thành trải nghiệm người dùng (UX) mượt mà và trực quan nhất bằng Next.js và Tailwind CSS.
- **Lập trình UI/UX:** Xây dựng giao diện Split-screen (chia đôi màn hình) cho phép học viên vừa đọc tài liệu vừa chat với Bot.
- **Tích hợp Real PDF Viewer & Markdown:** Xóa bỏ giao diện giả lập, đưa slide PDF thật 100% vào hệ thống và bổ sung chế độ xem Transcript.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Đưa PDF thật vào ứng dụng:** Thay vì dùng khối màu xanh (Mock UI), tôi đã sử dụng thẻ `<iframe>` kết hợp query parameters (`#page=X`). Thách thức ở đây là trình duyệt mặc định cho phép cuộn PDF loạn xạ. Dựa trên feedback của user, tôi đã dùng thủ thuật CSS `pointer-events-none` tạo một lớp màng tàng hình khóa thanh cuộn, ép học viên BẮT BUỘC phải dùng 2 nút bấm Next/Prev của hệ thống. Điều này đem lại trải nghiệm học tập tập trung như xem trình chiếu thực sự.
- **Việt hóa chuẩn chỉ:** Đảm bảo toàn bộ chữ hiển thị trên Sidebar và Chat UI đều chuẩn xác tiếng Việt có dấu, mang lại sự chuyên nghiệp cho bản Prototype.

### 3. Vấp ngã & Bài học xương máu
Sự cố đáng nhớ nhất là khi tôi đẩy nhanh tiến độ làm tính năng Transcript Markdown, việc dùng script tự động chèn code đã gây ra lỗi trùng lặp import (`Suspense`, `useSearchParams`). Hậu quả là màn hình báo đỏ chót lỗi TypeScript ngay lúc đang chạy build sản phẩm cuối. Rất may, tôi đã bình tĩnh phối hợp cùng Sơn dò tìm lại từng dòng khai báo, gỡ rối và vượt qua vòng kiểm tra `npm run build` thành công rực rỡ. Bài học rút ra là: Trong dự án tích hợp hệ thống lớn, sự cẩn trọng với Type-checking là sống còn.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Trước đây, tôi nghĩ làm Frontend cho AI chỉ là dựng một cái khung chat đơn giản. Nhưng thực tế chứng minh, **Giao diện chính là nơi che giấu "độ trễ" và xây dựng lòng tin**. Khi hệ thống chờ phản hồi, những vi tương tác (như shimmer loading) là thứ giữ chân người dùng. Hơn nữa, việc AI trả lời hay chưa đủ, mà UI phải biết tự động "nháy" đến đúng trang Slide được trích dẫn (Deep-linking) mới là thứ tạo nên một trải nghiệm Wow.

### 5. Kế hoạch phát triển tiếp theo
Tôi sẽ tinh chỉnh Responsive để giao diện Split-screen hiển thị hoàn hảo trên cả kích thước màn hình máy tính bảng (iPad), đồng thời chuẩn bị kịch bản thao tác rành mạch nhất cho phần trình diễn Live Demo của nhóm trước Ban Giám khảo.
