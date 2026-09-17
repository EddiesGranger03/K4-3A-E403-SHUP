# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Bùi Thị Thu Uyên  
**Mã học viên:** 2A202602613  
**Vai trò:** User Research & Data Mining Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm
Nhiệm vụ chính của tôi là đảm bảo sản phẩm giải quyết đúng vấn đề thực tế của học viên. Công việc của tôi bao gồm phân tích tập dữ liệu lịch sử hội thoại (chatlog), ghi nhận phản hồi từ các bạn sinh viên (Willing Users) trong các buổi kiểm thử, và đánh giá tính khả dụng của bản cập nhật giao diện ngày 18/9.


**Công cụ AI hỗ trợ:** Tôi đã dùng tính năng Advanced Data Analysis của ChatGPT để viết nhanh các đoạn script Python (Pandas) nhằm bóc tách 13.494 dòng chatlog, tự động lọc ra cột `has_citation`, giúp tôi tìm ra con số 28% lỗi trích dẫn chỉ trong chưa đầy 30 phút thay vì phải ngồi đếm tay.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Định lượng phân loại rủi ro bằng NLP:** Thông qua báo cáo Data Mining (`CP3_JUSTIFICATION_REPORT.md`), tôi dùng thuật toán NLP để phân loại tự động 13.494 dòng log. Tôi bóc tách được chính xác **1.151 lượt hỏi ngoài luồng (D4)** và **97 lượt hỏi vượt cấp (D2)**. Căn cứ từ những con số biết nói này, tôi kiên quyết yêu cầu nhóm phải xây dựng kiến trúc Hub & Spoke để điều hướng và chặn lỗi ảo giác, thay vì nhồi tất cả vào một con bot duy nhất.
- **Thay đổi giao diện dựa trên người dùng:** Dựa trên số liệu chatlog cho thấy học viên tốn 20-40 phút tự tìm tài liệu, tôi đã đề xuất nhóm ưu tiên cao nhất cho tính năng Deep-linking. Khi tiến hành kiểm thử bản mẫu, người dùng phản ánh việc chỉ có khối màu giả lập là chưa đủ. Từ đó, tôi thuyết phục nhóm kỹ thuật phải tích hợp hiển thị trực tiếp file PDF thật và bổ sung định dạng văn bản (Transcript View).
- **Yêu cầu khóa chức năng cuộn trang:** Qua quan sát, việc học viên tự do cuộn chuột trong file PDF 29 trang làm mất tác dụng của Deep-linking. Tôi đã đưa ra quyết định yêu cầu đội giao diện (UI) vô hiệu hóa thao tác cuộn tự do, ép người dùng thao tác qua nút bấm để giữ sự tập trung.

### 3. Vấp ngã & Bài học xương máu
Bài học lớn nhất tôi nhận được là nhận ra **Bẫy suy diễn hộ người dùng**. Ban đầu, tôi từng nghĩ học viên rất cần AI tự động diễn giải và tóm tắt kiến thức dài dòng. Tuy nhiên, kết quả kiểm thử thực tế cho thấy họ lại hoài nghi các văn bản do AI sinh ra. Cái họ thực sự cần là tính minh bạch: họ muốn thấy ngay lập tức dòng chữ đó nằm ở trang slide số mấy. Từ đó, nhóm chuyển hướng sang việc làm nổi bật (highlight) thông tin gốc thay vì cố gắng để bot giải thích thay giảng viên.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Qua dự án, tôi hiểu rằng một trợ lý học tập AI tốt không phải là một công cụ giải bài tập hộ, mà là một phương tiện giảm thiểu "ma sát" (friction) trong quá trình tự học. Tính căn cứ (Grounding) của dữ liệu quan trọng hơn sự hào nhoáng của câu chữ. Trách nhiệm của người làm sản phẩm là thiết kế luồng tương tác sao cho AI phục vụ đúng mục tiêu giáo dục.

### 5. Kế hoạch phát triển tiếp theo
Tôi sẽ tiếp tục áp dụng phương pháp nghiên cứu định tính và định lượng để đánh giá hiệu quả của hệ thống trong môi trường thực tế. Đồng thời, tôi muốn nghiên cứu sâu hơn về cách cá nhân hóa trải nghiệm học tập dựa trên dữ liệu tương tác của từng sinh viên.
