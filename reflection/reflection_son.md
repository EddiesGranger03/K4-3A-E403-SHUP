# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Nguyễn Khánh Sơn  
**Mã học viên:** 2A202602388  
**Vai trò:** Đội trưởng / Product Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò & Trách nhiệm: Phân định rõ ràng mảng việc phụ trách trong 47.5h
Trong suốt 47.5 giờ của Hackathon, tôi đảm nhận vị trí Đội trưởng (Product Lead) kiêm kỹ sư Backend lõi. Tôi không giao khoán cho ai mà trực tiếp ngồi code, dựng máy chủ backend proxy Node.js (`server.js`), tích hợp API mô hình lớn NVIDIA NIM, nhúng công nghệ đọc PDF vào giao diện web, xử lý luồng prompt đa tầng, và quản lý toàn bộ Spec (§1, §2, §4) của nhóm để đưa prototype từ ý tưởng thành sản phẩm chạy thật.

### 2. Những quyết định then chốt & Thách thức vượt qua: Cụ thể hóa bằng con số và bằng chứng
- **Kiên quyết chọn mô hình Hub & Spoke thay vì Monolithic RAG:** Dựa vào phân tích 13.494 dòng chatlog, tôi nhận thấy nếu nhồi toàn bộ giáo trình 6 ngày vào một con bot, chi phí token sẽ lên tới ~15.000 tokens/lượt và bot chắc chắn bị lẫn lộn giữa kiến thức sơ khai và nâng cao. Quyết định phân quyền Hub & Spoke giúp hệ thống tiết kiệm 62,5% token và đảm bảo 100% câu trả lời có trích dẫn số trang chính xác.
- **Dũng cảm cắt bỏ ý tưởng viển vông:** Ban đầu nhóm muốn tự động chấm điểm học viên. Nhưng khi soi vào chatlog thật, cột `understanding_level` gần như rỗng (chỉ 20 dòng có dữ liệu). Tôi kiên quyết gạt bỏ tính năng này để tập trung giải quyết nỗi đau có số liệu áp đảo: 28% câu trả lời thiếu nguồn và học viên mất 20–40 phút tìm bài.

### 3. Vấp ngã & Bài học xương máu: Khủng hoảng độ trễ token
Đây là sự cố thót tim nhất trước thềm nộp Checkpoint 3. Khi tôi nhập thử câu chào hỏi *"hê lô bạn biết tôi là ai không"*, hệ thống quay tròn hơn 20 giây rồi sập. 
Kiểm tra từng dòng log (`task-2138.log`), tôi phát hiện ra **"Khủng hoảng độ trễ token"**: Lịch sử chat đang lưu trữ toàn bộ các đoạn mã HTML dài của các thẻ slide. Qua nhiều lượt, prompt phình to tới **1.578 tokens**, khiến NVIDIA NIM mất tới 23.647ms để phản hồi. Tôi trực tiếp viết thuật toán bóc tách 100% thẻ HTML rác, nén câu trả lời cũ, đưa prompt xuống chỉ còn **64 – 180 tokens**. Thời gian phản hồi giảm ngoạn mục từ 23.6s xuống chỉ còn **1.6s – 3.5s (nhanh hơn gấp 10 lần!)**.

### 4. Sự chuyển biến về tư duy sản phẩm AI: Từ tư duy code truyền thống sang tư duy hệ thống AI xác suất
Hackathon đã tôi luyện cho tôi sự chuyển biến lớn: **Từ "Vibe-coding" sang "System Thinking"**. Trong lập trình truyền thống 1+1=2, nhưng mô hình LLM là một cỗ máy xác suất, luôn có nguy cơ sinh ảo giác. Người làm sản phẩm AI giỏi không phải là người cầu mong AI luôn đúng, mà phải biết xây dựng **hệ thống phòng thủ vững chắc có căn cứ**: từ việc giới hạn ngữ cảnh (Context Sandboxing) để Bot Con chỉ nạp đúng 29 slide của buổi học đó, cài đặt bộ lọc Regex, cho đến cơ chế từ chối các câu lệnh tấn công Prompt Injection (`T00274`). Sự tỉ mỉ và trách nhiệm với dữ liệu mới là yếu tố quyết định.

### 5. Kế hoạch phát triển tiếp theo: Roadmap hoàn thiện và ứng dụng vào thực tế
- Cùng Thu Uyên, Trần Phát và Xuân Hoàng tập dượt thật nhuần nhuyễn bài thuyết trình Pitch Deck từ bản kịch bản chi tiết đã chuẩn bị, tự tin bảo vệ dự án trước Ban giám khảo tại phòng E403.
- Đóng gói giải pháp thành một module hoàn chỉnh để bàn giao cho đội ngũ phát triển VLearn, biến kiến trúc phân quyền Hub & Spoke thành một giá trị thực sự cho hệ sinh thái học tập.
