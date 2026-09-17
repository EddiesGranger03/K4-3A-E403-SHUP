# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Nguyễn Khánh Sơn  
**Mã học viên:** 2A202602388  
**Vai trò:** Đội trưởng / Product Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò và Trách nhiệm của tôi trong Dự án
Tôi đảm nhận vai trò Đội trưởng và Quản lý Sản phẩm (Product Lead), đồng thời trực tiếp thiết kế kiến trúc Backend API trên nền tảng Next.js. Trách nhiệm của tôi là đảm bảo hệ thống chuyển mình từ những bản mock thô sơ sang một Prototype hoàn chỉnh, chạy thật 100% với AI:
- **Thiết kế Kiến trúc Hub & Spoke API:** Xây dựng `api/chat-hub` và `api/chat-spoke` trong Next.js, tạo luồng định tuyến thông tin khép kín và an toàn.
- **Quản lý Vòng đời Sản phẩm:** Định hướng ưu tiên tính năng (Deep-linking) và quyết định cắt bỏ những tính năng rườm rà không giải quyết đúng "nỗi đau" cốt lõi.
- **Giải quyết Khủng hoảng Kỹ thuật:** Trực tiếp fix các lỗi nghiêm trọng về Out-of-Context của Hub Bot khi xử lý truy vấn ngoài luồng.

---

### 2. Những "Trận Đánh Kỹ Thuật" tôi đã trực tiếp đối mặt
1. **Lựa chọn Gemini 3.5 Flash Lite thay vì các model nặng nề:**
   Để đảm bảo hệ thống phản hồi mượt mà dưới áp lực thời gian thực, tôi quyết định cấu hình toàn bộ hệ thống sử dụng `gemini-3.5-flash-lite`. Mô hình này không chỉ siêu nhẹ, ổn định (tránh lỗi 503/404) mà còn có cửa sổ ngữ cảnh cực lớn, cho phép chúng tôi nhúng toàn bộ kiến thức một ngày học mà không sợ crash.
2. **Xây dựng cơ chế Deep-linking:**
   Khi Bot Hỗ trợ điều hướng, tôi viết bộ parser bằng Regex để bắt các thẻ markdown `[text](#deep-link-day-X-slide-Y-highlight-Z)` và chuyển đổi thành trạng thái (state) trên frontend, ép trình duyệt nhảy chính xác đến trang PDF hoặc dòng Transcript tương ứng.
3. **Luồng Fallback Guardrail cho Hub Bot:**
   Trong lúc test, tôi phát hiện khi người dùng hỏi các khái niệm ngoài Index (như hỏi RAG ở Day 1), Hub Bot bị "ảo giác" và trả về chuỗi rỗng gây sập UI. Tôi đã trực tiếp tinh chỉnh prompt (`hub_bot_prompt.txt`) và thêm kịch bản [OUT OF SCOPE] để bot từ chối khéo léo thay vì cố gắng gọi Tool sai lệch.

---

### 3. Những Quyết định Sản phẩm Sống còn
- **Kiên quyết đập bỏ giao diện Mock:** Sau vòng kiểm thử với user (do Uyên phụ trách), tôi nhận ra việc hiển thị một khối màu xanh giả lập Slide là không thể chấp nhận được. Tôi yêu cầu Hoàng (Frontend Lead) phải nhúng ngay iframe PDF thật và làm thêm màn hình Transcript Markdown để học viên có tài liệu học thực tế.
- **Tư duy False Positive vs False Negative:** Thà hệ thống từ chối trả lời (False Negative) còn hơn là đưa ra trang slide sai lệch (False Positive) làm hỏng kiến thức của học viên. Cơ chế Spoke Bot được thiết kế để tuân thủ tuyệt đối triết lý này.

---

### 4. Sự Chuyển biến Sâu sắc về Tư duy
Hackathon đã dạy tôi rằng: Một hệ thống AI giỏi không phải là gọi những model đắt tiền nhất, mà là **hệ thống biết kết nối luồng dữ liệu (Data Flow) và luồng trải nghiệm (UX Flow)**. Giao tiếp giữa Hub Bot và giao diện người dùng thông qua Deep-linking chính là vũ khí mạnh nhất của chúng tôi, giúp người dùng tiết kiệm hàng chục phút tìm kiếm bài giảng.

---

### 5. Kế hoạch Tiếp theo
Cùng Uyên, Phát và Hoàng diễn tập Pitch Deck. Dự án VLearn Hub & Spoke đã vượt xa một bài tập tĩnh, nó đã trở thành một nền tảng điều hướng tri thức thực thụ!
