# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Ngô Xuân Hoàng  
**Mã học viên:** 2A202602597  
**Vai trò:** Kỹ sư Giao diện & Frontend Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm
Tôi đảm nhận việc phát triển toàn bộ phần giao diện người dùng (Frontend) trên nền tảng Next.js, chuyển đổi các yêu cầu từ bản thiết kế thành sản phẩm hoạt động thực tế. Nhiệm vụ của tôi bao gồm lập trình giao diện trò chuyện, tích hợp khung hiển thị bài giảng, và xử lý các thao tác tương tác đồng bộ giữa Frontend và Backend.


**Công cụ AI hỗ trợ:** Khi gặp khó khăn với lỗi trùng lặp component của TypeScript (như `Suspense` và `useSearchParams`), tôi đã copy mã lỗi nhờ Claude 3.5 Sonnet gỡ rối, giúp fix lỗi build chỉ trong vài phút. Tôi cũng dùng Copilot để sinh nhanh cấu trúc CSS Tailwind cho giao diện Split-screen.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Tích hợp tài liệu thực tế vào ứng dụng:** Để mang lại trải nghiệm học tập tốt hơn bản demo cũ, tôi đã quyết định sử dụng thẻ `iframe` để hiển thị trực tiếp tệp PDF bài giảng và thư viện `react-markdown` để hiển thị tệp văn bản (Transcript). Điều này giúp học viên có thể học và tham khảo mã nguồn trực tiếp trên cùng một màn hình mà không cần chuyển đổi ứng dụng.
- **Xử lý cơ chế đồng bộ giao diện:** Thách thức lớn nhất về kỹ thuật là đảm bảo giao diện tự động cập nhật đúng trang slide và bôi màu (highlight) đoạn văn bản khi nhận được mã định tuyến từ bot. Tôi đã thiết lập các trạng thái React đồng bộ với tham số URL để xử lý mượt mà yêu cầu này.

### 3. Vấp ngã & Bài học xương máu
Một vấn đề kỹ thuật đáng chú ý là giải quyết xung đột trải nghiệm cuộn trang. Ban đầu, tính năng Deep-linking hoạt động tốt về mặt logic, nhưng trình duyệt lại cho phép người dùng cuộn chuột tự do trong `iframe` của file PDF, khiến họ mất phương hướng và làm sai lệch vị trí slide mà bot vừa trích dẫn. Dựa trên góp ý từ khâu nghiên cứu người dùng, tôi đã rút ra bài học về việc quản lý luồng thao tác. Tôi áp dụng thủ thuật CSS (`pointer-events-none`) để khóa tính năng cuộn mặc định, buộc người dùng sử dụng các nút điều hướng Next/Prev do hệ thống cung cấp.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Tham gia dự án giúp tôi hiểu rằng giao diện của một ứng dụng AI không chỉ cần đẹp mà còn phải giải quyết bài toán niềm tin. Những chi tiết nhỏ như việc văn bản tự động chuyển trang hay đoạn trích dẫn được bôi màu vàng đóng vai trò quan trọng trong việc chứng minh cho người dùng thấy câu trả lời của AI là có căn cứ. Giao diện (UI) hiệu quả là giao diện làm giảm đi sự hoài nghi và tối ưu hóa thời gian thao tác.

### 5. Kế hoạch phát triển tiếp theo
Trước mắt, tôi sẽ tiến hành kiểm tra kỹ lưỡng các lỗi đánh máy, lỗi hiển thị tiếng Việt, và rà soát lỗi TypeScript để đảm bảo bản build ổn định cho buổi demo. Về lâu dài, tôi muốn tối ưu hóa giao diện chia đôi màn hình (Split-screen) để tương thích tốt hơn với các thiết bị di động và máy tính bảng.
