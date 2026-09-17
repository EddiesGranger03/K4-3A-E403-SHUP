# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Lê Châu Trần Phát  
**Mã học viên:** 2A2026025245  
**Vai trò:** AI & Evaluation Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò và Trách nhiệm của tôi trong Dự án
Tôi chịu trách nhiệm chính về **Kiến trúc AI, Thiết kế Prompt và Đánh giá Tự động hóa**. Đây là "bộ não" quyết định trực tiếp khả năng hiểu câu hỏi và định tuyến thông minh của hệ thống.
- **Thiết kế Prompt Engineering:** Chuẩn hóa `hub_bot_prompt.txt` để Bot Hỗ Trợ trả lời rõ ràng số trang/Slide trước khi cấp Deep-link.
- **Kỹ sư Tự động hóa Dữ liệu (Auto-Index Pipeline):** Viết script Python tự động parse hàng chục ngàn từ từ Transcript và Slide PDF thành Knowledge Index (Vector mô phỏng).
- **Vận hành Kiểm thử & RAG Logic:** Tối ưu hóa việc tìm kiếm ngữ nghĩa (Semantic matching) trong Index JSON.

---

### 2. Hành trình Thiết kế Thuật toán & Thách thức Kỹ thuật
1. **Giải phóng "Nút thắt cổ chai" Context Window:**
   Khi viết script `auto_index.py`, ban đầu tôi lo sợ mô hình sẽ sập nếu đọc transcript quá dài nên đã hardcode cắt bớt 6000 ký tự (`[:6000]`). Tuy nhiên, sau khi nghiên cứu sức mạnh của mô hình `gemini-3.5-flash-lite`, tôi nhận ra context window của nó dư sức chứa khối lượng khổng lồ. Tôi đã mạnh dạn xóa bỏ giới hạn độ dài, cho phép pipeline nuốt trọn toàn bộ transcript! Kết quả là file `knowledge_index.json` giờ đây có đầy đủ các trích dẫn (transcript_refs) chính xác đến từng mili-giây.
2. **Kỷ luật Output cho Hub Bot:**
   Lúc đầu, Hub Bot trả về thẻ markdown Deep-link nhưng lại giấu đi số trang cụ thể, khiến user bấm vào giống như "click mù". Tôi đã điều chỉnh lại System Prompt, ép Bot phải thốt ra câu: *"Chi tiết tại Day X, trang Slide số Y..."* để tạo sự minh bạch tối đa.

---

### 3. Trải nghiệm Thực nghiệm: Bài học đắt giá
Khoảnh khắc tự hào nhất của tôi là fix thành công lỗi **Empty Output (Crash)** của Hub Bot. Trong các ca kiểm thử, khi user hỏi những câu nằm ngoài Knowledge Index (VD: "Tìm bài học về RAG" khi hệ thống chỉ mới có index Day 1 chưa dạy RAG), Bot bị luống cuống, gọi Tool sai và trả về JSON rỗng `""`, làm sập API.
Tôi đã lập tức cấu trúc lại JSON logic trong `route.ts` và Prompt, tạo ra kịch bản **[OUT OF SCOPE]**, ép mô hình trả về thông báo lỗi thân thiện thay vì im lặng chết chóc. Từ một lỗi sập web chí mạng, hệ thống đã vững vàng xử lý mọi câu hỏi đánh đố!

---

### 4. Sự Trưởng thành về Tư duy AI
- **Automation is King:** Không thể duy trì một hệ thống AI bằng sức người. Việc tôi viết script `auto_index.py` đã chứng minh rằng: Tri thức phải được pipeline hóa! Chỉ cần 1 file PDF và Markdown mới thả vào, hệ thống tự động sinh ra index để Bot đọc. Đó mới là tư duy làm sản phẩm AI Scale-able.

---

### 5. Định hướng Tiếp theo
Sẵn sàng trình diễn sức mạnh của Auto-Index Pipeline cho Ban giám khảo xem việc "cập nhật tri thức cho Bot trong 5 giây" là như thế nào!
