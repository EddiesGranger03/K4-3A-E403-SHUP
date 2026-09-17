# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Lê Châu Trần Phát  
**Mã học viên:** 2A2026025245  
**Vai trò:** AI & Evaluation Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 17/09/2026  

---

### 1. Vai trò và Trách nhiệm của tôi trong Dự án
Trong nhóm SHUP, tôi chịu trách nhiệm chính về **Kiến trúc Trí tuệ Nhân tạo & Đo lường Đánh giá (AI & Evaluation Lead)**. Đây là mắt xích kỹ thuật quyết định trực tiếp đến chất lượng câu trả lời và tính xác thực của sản phẩm:
- **Thiết kế Prompt Engineering Đa Tầng:** Xây dựng System Prompt cho Bot Hỗ Trợ (định vị toàn khóa, giao thức cảnh báo ngoài phạm vi) và Bot Con (In-lecture Grounding, giới hạn nghiêm ngặt trong slide).
- **Thiết kế Cơ chế Cô lập Ngữ cảnh (Context Sandboxing):** Ngăn chặn hiện tượng rò rỉ tri thức giữa các buổi học, khống chế số lượng token đầu vào.
- **Xây dựng Bộ Kiểm thử Mẫu (Golden Set 20 cases):** Phân bổ đều trên 4 lớp chỗ khó, gắn mã `turn_id` thực tế từ tập dữ liệu của ban tổ chức.
- **Vận hành Kiểm thử Thực nghiệm & Ghi vết (Traceability):** Đo lường tỷ lệ đạt qua các lượt chạy, phân tích ma trận nhầm lẫn và thiết lập các chỉ số định lượng tại `eval/results.md` và `eval/run_results.md`.

---

### 2. Hành trình Thiết kế Thuật toán & Thách thức Kỹ thuật
1. **Chiến lược "Chia để trị" thay vì Monolithic RAG:**
   Thách thức lớn nhất ban đầu là làm sao để bot không bị nhầm lẫn giữa Day 1 và Day 2. Nếu nhồi toàn bộ nội dung giáo trình vào một prompt duy nhất, LLM sẽ gặp hiện tượng **"Lost in the Middle"** (được dạy tại Day 1 - Slide 21) — thông tin ở giữa tài liệu sẽ bị mô hình lờ đi. Tôi đã thiết kế cơ chế **Semantic Router** tại Bot Hỗ Trợ để phân loại intent trước, sau đó mới gọi Bot Con tương ứng với đúng 29 slide của Day đó. Kết quả là vừa triệt tiêu nhầm lẫn, vừa cắt giảm được 62,5% dung lượng context window.
2. **Kỷ luật khống chế độ dài ≤ 3 câu và bắt buộc mã trích dẫn:**
   Dữ liệu chatlog cho thấy học viên rất ghét việc bot "nói dài nói dai". Tôi đã đưa vào prompt của Bot Con chỉ thị cấu trúc ngặt nghèo: câu 1 giải thích bản chất ngắn gọn, câu 2 liên hệ ví dụ slide, và bắt buộc kết thúc bằng `[Trang X - Slide Day Y]`. Nếu không có thông tin trên slide, bot bắt buộc phải từ chối thay vì bịa đặt nguồn.

---

### 3. Trải nghiệm Thực nghiệm: Bài học đắt giá từ Run 1 đến Run 2
Khoảnh khắc hồi hộp nhất của tôi trong dự án là khi chạy kiểm thử tự động 20 ca trong Golden Set:
- **Kết quả Lượt 1 (Run 1): Đạt 17/20 ca (85.0%) — Rớt 3 ca kiểm thử:**
  - *Ca `TC_L2_03` (Lớp 2 Mơ hồ):* Khi học viên chỉ hỏi cụt lủn *"Prompting là gì?"*, router bị thiên kiến (bias) tự động nhảy vào Day 1 thay vì kích hoạt câu hỏi làm rõ.
  - *Ca `TC_L1_03` (Lớp 1 Nguồn sự thật):* Bot giải thích đúng Next-token prediction nhưng format trích dẫn bị thiếu dấu ngoặc vuông chuẩn.
  - *Ca `TC_L4_06` (Lớp 4 Nghiệp vụ):* Câu hỏi *"Phân biệt Product Manager và Project Manager trong kỷ nguyên AI?"* bị router chuyển nhầm sang Day 1 (vì có chữ "AI"), trong khi khái niệm PM thực chất nằm ở Day 2 - Slide 14.
- **Quá trình Debug và Tinh chỉnh (Post-Fix):**
  Tôi không sửa dữ liệu test để gian lận điểm số. Thay vào đó, tôi tinh chỉnh bảng ánh xạ trọng số ngữ nghĩa: tăng trọng số ưu tiên cho các từ khóa quản trị sản phẩm (`PM`, `Cost of Error`, `Go/No-Go`) lên mức 2.0 cho Day 2; đồng thời siết chặt regex format trích dẫn.
- **Kết quả Lượt 2: Đạt 20/20 ca (100.0%) tuyệt đối!**
  Khoảnh khắc cả 20 ca test chuyển sang màu xanh lá là một phần thưởng vô cùng xứng đáng cho tinh thần làm việc dựa trên số liệu thực chứng.

---

### 4. Đánh đổi (Trade-off) & Sự Trưởng thành về Tư duy AI
- **Bài học về Đánh đổi False Positive vs. False Negative (Học từ Day 2 - Slide 26):**
  Trong ứng dụng giáo dục, **chi phí sai sót (Cost of Error)** của việc đưa ra thông tin sai lệch là rất đắt. Học viên học sai khái niệm sẽ làm sai bài Lab và rớt môn. Do đó, tôi chủ động thiết kế hệ thống thà chấp nhận **False Negative** (từ chối lịch sự và nói *"Tôi chưa có dữ liệu phần này, mời bạn hỏi Bot Hỗ Trợ"*) còn hơn để xảy ra **False Positive** (tự tin bịa ra một trang slide không có thật).
- **Định lượng thay vì cảm tính:** Trước đây tôi đánh giá AI bằng cách "thấy nó nói mượt là được". Giờ đây tôi hiểu rằng một hệ thống AI đáng tin cậy phải có Golden Set đo lường được, có tỷ lệ Grounding và tỷ lệ Defense được kiểm chứng bằng số liệu.

---

### 5. Định hướng Tiếp theo
- Tích hợp thêm các bộ đánh giá tự động (LLM-as-a-Judge) để tự động chấm điểm độ sâu sư phạm của câu trả lời.
- Mở rộng tập kiểm thử Golden Set từ 20 ca lên 100 ca để bao phủ toàn bộ các tình huống edge-case của cả khóa học.
