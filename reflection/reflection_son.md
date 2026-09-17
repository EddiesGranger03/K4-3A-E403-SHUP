# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Nguyễn Khánh Sơn  
**Mã học viên:** 2A202602388  
**Vai trò:** Đội trưởng / Product Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm
Trong 47.5 giờ diễn ra Hackathon, tôi đảm nhận vai trò quản lý tiến độ chung của nhóm (Product Lead) và trực tiếp phát triển phần Backend proxy. Công việc cụ thể của tôi bao gồm thiết lập máy chủ Node.js (`server.js`), cấu hình kết nối API với mô hình ngôn ngữ lớn (NVIDIA NIM), quản lý luồng dữ liệu giữa các prompt đa tầng, và hoàn thiện phần đặc tả hệ thống (Spec §1, §2, §4) dựa trên ý tưởng của cả nhóm.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Lựa chọn mô hình Hub & Spoke:** Ban đầu, nhóm định xây dựng một hệ thống RAG nguyên khối nạp toàn bộ giáo trình. Tuy nhiên, sau khi tính toán chi phí token dựa trên chatlog, việc này có thể tiêu tốn khoảng 15.000 tokens/lượt và làm giảm độ chính xác. Tôi quyết định chuyển sang kiến trúc phân quyền (Hub & Spoke) để tiết kiệm token và đảm bảo bot tập trung vào đúng bài học hiện tại.
- **Loại bỏ tính năng tự động chấm điểm:** Nhóm từng có ý tưởng làm bot chấm điểm mức độ hiểu bài. Nhưng khi xem xét cột `understanding_level` trong tập 13.494 dòng dữ liệu, chỉ có khoảng 20 dòng chứa thông tin hợp lệ. Tôi quyết định loại bỏ ý tưởng này để tập trung vào vấn đề cấp thiết hơn: 28% câu trả lời của trợ lý AI cũ thiếu nguồn tham chiếu.

### 3. Vấp ngã & Bài học xương máu
Một trong những vấn đề nghiêm trọng nhất nhóm gặp phải là **lỗi độ trễ token**. Trong quá trình kiểm thử trước Checkpoint 3, hệ thống mất hơn 20 giây để phản hồi một câu hỏi đơn giản. Sau khi kiểm tra file log, tôi phát hiện lịch sử hội thoại đã vô tình lưu trữ toàn bộ các thẻ HTML định dạng slide, làm prompt phình to lên mức 1.578 tokens. Tôi phải xử lý bằng cách viết lại hàm loại bỏ các thẻ HTML dư thừa trước khi gửi lên API, giúp giảm dung lượng xuống dưới 200 tokens và kéo thời gian phản hồi về mức 1.5 - 3.5 giây.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Quá trình làm dự án giúp tôi nhận ra sự khác biệt giữa lập trình logic truyền thống và phát triển ứng dụng AI. Trí tuệ nhân tạo có tính xác suất và dễ sinh ảo giác (hallucination). Một kỹ sư phát triển sản phẩm AI không chỉ gọi API, mà còn phải xây dựng các hệ thống rào cản (guardrails) và quản lý ngữ cảnh chặt chẽ để đảm bảo thông tin đầu ra an toàn, chính xác và có tính trách nhiệm cao đối với người học.

### 5. Kế hoạch phát triển tiếp theo
Mục tiêu trước mắt của tôi là cùng các thành viên trong nhóm rà soát lại kịch bản thuyết trình và kiểm tra kỹ hệ thống để đảm bảo buổi bảo vệ dự án diễn ra suôn sẻ. Sau Hackathon, tôi muốn đóng gói mã nguồn gọn gàng hơn để có thể dễ dàng tham khảo cho các đồ án môn học sau này.
