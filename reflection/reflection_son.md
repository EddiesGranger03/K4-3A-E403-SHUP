# BÀI VIẾT THU HOẠCH PHẢN TƯ CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Nguyễn Khánh Sơn  
**Mã học viên:** 2A202602388  
**Vai trò:** Đội trưởng kiêm Kỹ sư Nòng cốt (Product Lead & Lead Builder)  
**Nhóm:** SHUP · Lớp 3A · Phòng E403 · Cụm 4  
**Ngày hoàn thành:** 17/09/2026  

---

### 1. Góc nhìn chân thực về Vai trò của tôi trong Dự án
Khi bước vào cuộc thi Mini Hackathon kéo dài 47,5 giờ này với vai trò Đội trưởng, tôi sớm nhận ra một thực tế: trong một nhóm công nghệ làm việc dưới áp lực thời gian khắc nghiệt, người đội trưởng không thể chỉ là một "người quản lý" ngồi phân chia đầu việc hay viết kế hoạch trên giấy. 

Nếu muốn sản phẩm thành hình và chạy được trong thực tế, **tôi bắt buộc phải là người trực tiếp dấn thân nhiều nhất, cày cuốc sâu nhất vào cả hai mặt trận: Tư duy sản phẩm (Product) và Kỹ thuật thực thi (Engineering)**:
- Về mặt sản phẩm: Tôi là người lựa chọn Track A1, định hình kiến trúc Hub & Spoke, trực tiếp chấp bút và hoàn thiện toàn bộ bản AI Spec (`spec.md`), định nghĩa các ranh giới tự động hóa, khóa chuẩn chất lượng CP4 và dẫn dắt tiến độ của cả 4 thành viên.
- Về mặt kỹ thuật: Tôi không giao khoán cho ai mà trực tiếp ngồi code, dựng máy chủ backend proxy Node.js (`server.js`), tích hợp API mô hình lớn NVIDIA NIM, nhúng công nghệ đọc PDF vào giao diện web, xử lý luồng prompt đa tầng, và trực tiếp gỡ những lỗi nghẽn hệ thống nghiêm trọng nhất để đưa prototype từ ý tưởng trở thành một sản phẩm chạy mượt mà trên môi trường thật.

---

### 2. Những "Trận Đánh Kỹ Thuật" tôi đã trực tiếp đối mặt và giải quyết
Nếu không trực tiếp nhảy vào code, tôi sẽ không bao giờ hiểu được sự phức tạp giữa lý thuyết và thực tiễn khi xây dựng một hệ sinh thái AI:

1. **Xây dựng Backend Proxy an toàn và độc lập từ con số 0:**
   Tôi tự tay viết toàn bộ tệp `server.js` bằng Node.js thuần với triết lý tối giản (Zero external dependencies). Tôi không dùng các framework cồng kềnh vì muốn hệ thống nhẹ nhất có thể, các bạn trong nhóm khi kéo code về chỉ cần gõ `node codebase/server.js` là chạy được ngay. Tôi thiết kế cơ chế đọc cấu hình môi trường bảo mật đa tầng, bảo vệ tuyệt đối API Key của NVIDIA NIM trong `.env` và chặn cứng trên `.gitignore` để không bao giờ vi phạm quy chế của ban tổ chức.

2. **Khủng hoảng độ trễ 23.6 giây và bài toán nén Token lịch sử:**
   Đây là sự cố thót tim nhất của tôi trước thềm nộp Checkpoint 3. Khi tôi nhập thử câu chào hỏi *"hê lô bạn biết tôi là ai không"*, hệ thống quay tròn hơn 20 giây rồi rơi vào kịch bản lỗi offline khô cứng. Tôi không đổ lỗi cho mô hình hay mạng chập chờn, mà lập tức mở terminal kiểm tra từng dòng log của máy chủ (`task-2138.log`). 
   - Lúc này tôi mới phát hiện ra một "sát thủ thầm lặng": Lịch sử chat đang vô tình lưu trữ toàn bộ các đoạn mã HTML dài của các thẻ slide bài học. Qua nhiều lượt hội thoại, prompt gửi lên mô hình phình to tới **1.578 tokens**, khiến NVIDIA NIM mất tới 23.647ms để phản hồi và kích hoạt cơ chế ngắt timeout 10 giây của frontend.
   - Tôi trực tiếp ngồi viết thuật toán làm sạch: dùng biểu thức chính quy (regex) bóc tách 100% các thẻ HTML rác, nén câu trả lời cũ của trợ lý xuống dưới 220 ký tự, đưa tổng prompt gửi lên API từ 1.578 tokens xuống chỉ còn **64 – 180 tokens**.
   - **Kết quả:** Thời gian phản hồi của AI giảm ngoạn mục từ 23.6s xuống chỉ còn **1.6s – 3.5s (nhanh hơn gấp 10 lần!)**. Đây là một cảm giác thỏa mãn tột cùng của người làm kỹ thuật khi tự tay mình tìm ra lỗi và sửa triệt để.

3. **Hiện thực hóa kiến trúc giao diện Split-screen với Mozilla PDF.js:**
   Thay vì dùng các thẻ `<iframe>` thông thường dễ bị lỗi màn hình đen hoặc bắt người dùng tải file về máy, tôi đã tích hợp trực tiếp thư viện `pdf.min.js` của Mozilla vào `index.html` và `app.js`. Tôi lập trình Canvas render vector độ nét cao, chia đôi màn hình giữa trang đọc bài giảng và chatbot, giúp học viên vừa đọc slide vừa hỏi đáp tại chỗ mà không cần chuyển tab.

4. **Lập trình luồng đa tác tử và các rào chắn Guardrail:**
   Tôi trực tiếp viết logic Semantic Router để Bot Hỗ Trợ định vị đúng bài học, thiết lập ranh giới cách ly (Context Sandboxing) để Bot Con chỉ nạp 29 slide của buổi học đó, và cài đặt các bộ lọc Regex để từ chối các câu hỏi gian lận đáp án quiz trắc nghiệm hoặc các câu lệnh tấn công Prompt Injection (`T00274`).

---

### 3. Những Quyết định Sản phẩm Sống còn
Bên cạnh việc gõ code, trách nhiệm của một người đội trưởng là phải đưa ra các quyết định khó khăn:
- **Dũng cảm cắt bỏ ý tưởng viển vông để tập trung vào nỗi đau thật:** Ban đầu cả nhóm từng nghĩ đến tính năng tự động chấm điểm mức độ hiểu bài của học viên. Nhưng khi tôi cùng Uyên soi vào dữ liệu 13.494 dòng chatlog thật của BTC, cột `understanding_level` gần như rỗng hoàn toàn (chỉ có 20 dòng có dữ liệu). Tôi kiên quyết gạt bỏ tính năng này sang phần Non-goal, không để nhóm sa đà vào việc "bịa" dữ liệu giả định, mà dồn toàn lực giải quyết nỗi đau có số liệu áp đảo: 28% câu trả lời thiếu nguồn và học viên mất 20–40 phút tìm bài.
- **Kiên quyết chọn mô hình Hub & Spoke thay vì Monolithic RAG:** Nếu nhồi toàn bộ giáo trình 6 ngày vào một con bot, chi phí token sẽ lên tới ~15.000 tokens/lượt và bot chắc chắn bị lẫn lộn giữa kiến thức sơ khai và nâng cao. Quyết định phân quyền Hub & Spoke đã giúp hệ thống tiết kiệm được 62,5% token và đảm bảo 100% câu trả lời của Bot Con có trích dẫn số trang chính xác.
- **Văn hóa trung thực khoa học:** Khi chạy Golden Set lượt 1 đạt 17/20 (85%), tôi quán triệt với cả nhóm phải giữ nguyên số liệu thật, tự khai báo 3 ca lỗi vào báo cáo và cùng Phát tìm ra nguyên nhân gốc rễ để tinh chỉnh lại Router cho đến khi đạt 20/20 (100%) thực chất.

---

### 4. Sự Chuyển biến Sâu sắc về Tư duy (Mindset Shift)
47,5 giờ tại Hackathon đã tôi luyện cho tôi những bài học mà không giảng đường lý thuyết nào dạy được:
- **Từ "Vibe-coding" sang "System Thinking":** Sử dụng AI để sinh code rất nhanh, nhưng nếu người kỹ sư không thực sự hiểu luồng dữ liệu, không biết cách debug server log, không hiểu cơ chế tính token thì sản phẩm sẽ sập ngay khi gặp dữ liệu phức tạp. AI chỉ là công cụ khuếch đại, sự tỉ mỉ và tư duy logic của con người mới là yếu tố quyết định.
- **Tư duy xác suất trong thiết kế phần mềm:** Tôi hiểu rằng mô hình ngôn ngữ lớn (LLM) là một cỗ máy xác suất, luôn có nguy cơ sinh ảo giác. Người làm sản phẩm AI giỏi không phải là người cầu mong AI luôn trả lời đúng, mà là người biết xây dựng một hệ thống phòng thủ vững chắc xung quanh nó: từ việc tiền xử lý dữ liệu, giới hạn ngữ cảnh, cho đến cơ chế Fallback dự phòng khi mất kết nối.
- **Ý nghĩa của việc Lãnh đạo bằng Hành động (Lead by Example):** Đội trưởng không phải là một chức danh để ra oai. Đội trưởng là người sẵn sàng gánh phần việc nặng nhất, thức muộn nhất để kiểm tra từng dòng code, đọc từng câu trong spec, để đồng đội có được điểm tựa vững chắc và cùng nhau đi đến đích.

---

### 5. Kế hoạch Phát triển Tiếp theo
- Cùng Thu Uyên, Trần Phát và Xuân Hoàng tập dượt thật nhuần nhuyễn bài thuyết trình Pitch Deck từ bản kịch bản chi tiết đã chuẩn bị, tự tin bảo vệ dự án trước Ban giám khảo tại phòng E403.
- Sau khi kết thúc hackathon, tôi sẽ tiếp tục mở rộng dữ liệu bài giảng sang các ngày tiếp theo, đóng gói giải pháp thành một module hoàn chỉnh để bàn giao cho đội ngũ phát triển VLearn, biến dự án từ một bài thi thành một giá trị thực sự cho cộng đồng học viên.
