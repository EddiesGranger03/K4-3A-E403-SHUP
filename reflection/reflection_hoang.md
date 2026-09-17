# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Ngô Xuân Hoàng  
**Mã học viên:** 2A202602597  
**Vai trò:** Kỹ sư Giao diện & Frontend Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò và Trách nhiệm của tôi trong Dự án
Tôi là Kỹ sư Giao diện (Frontend Lead), chịu trách nhiệm "thổi hồn" vào hệ thống Hub & Spoke thông qua framework Next.js và Tailwind CSS. Trách nhiệm của tôi là biến những chuỗi JSON khô khan từ Backend của anh Sơn thành trải nghiệm mượt mà, trực quan nhất cho người học.
- **Xây dựng UI/UX đồng bộ:** Cấu trúc layout Split-screen, thanh Sidebar và các tương tác Chat UI.
- **Tích hợp Real PDF Viewer & Markdown Transcript:** Đưa nội dung học thật vào hệ thống thay vì dùng dữ liệu giả.
- **Tối ưu hóa tiếng Việt & Cải thiện vi tương tác:** Đảm bảo toàn bộ chữ hiển thị chuẩn xác tiếng Việt có dấu, xử lý các hiệu ứng cuộn trang.

---

### 2. Trải nghiệm Kỹ thuật và Những Tính năng Tự hào nhất
1. **Thay máu giao diện Slide bằng Real PDF (Iframe):**
   Phản hồi từ vòng User Testing (R6) cho thấy học viên cực kỳ thất vọng với giao diện slide giả (chỉ có màu nền xanh). Tôi đã lập tức tích hợp thẻ `<iframe>` tải trực tiếp file PDF của buổi học. Tuyệt vời hơn, tôi đã ứng dụng Query Parameters (`#page=X`) để khi Hub Bot gửi link, Slide sẽ nhảy bùm đến đúng trang X ngay lập tức.
2. **Tuyệt chiêu Khóa Scroll PDF (Enforce Tool Navigation):**
   Học viên phản ánh việc dùng chuột cuộn PDF khiến họ mất phương hướng. Để giải quyết, tôi đã phủ một lớp `div` tàng hình (`pointer-events-none`) đè lên iframe PDF. Người dùng bị "khóa cuộn" và BẮT BUỘC phải dùng 2 nút Next/Prev trên thanh công cụ. Trải nghiệm lúc này giống y hệt như đang bấm Powerpoint, đúng chuẩn một Slide Viewer giáo dục!
3. **Tích hợp react-markdown cho Transcript:**
   Không chỉ có PDF, tôi bổ sung một chế độ xem "Toàn văn bài giảng" (Transcript) sử dụng `react-markdown`. Chữ nghĩa được format tự động cực kỳ đẹp mắt, giúp học viên dễ dàng copy text để làm bài tập Lab.

---

### 3. Bài học Rút Ra Cho Bản Thân
- **Frontend không chỉ là làm cho đẹp:** UI là cầu nối giữa trí tuệ của AI và cảm xúc của người dùng. Một con Bot trả lời hay đến mấy nhưng không có cơ chế bôi màu (highlight) hay tự chuyển trang slide thì học viên vẫn phải chịu "ma sát" (friction) rất lớn. 
- **Tốc độ thực thi:** Khả năng phối hợp cùng đội trưởng Sơn để fix các lỗi TypeScript (`Suspense` import, `useSearchParams`) ngay trong đêm để Build Next.js xanh mượt là minh chứng cho tinh thần không ngại khó của nhóm.

---

### 4. Kế hoạch Phát triển Tiếp theo
- Tối ưu Responsive để giao diện Split-screen hiển thị tốt trên cả màn hình iPad.
- Hỗ trợ nhóm hoàn thiện bản trình diễn Live Demo trên sân khấu LAB 6.
