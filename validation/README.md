# Nhật Ký Kiểm Thử Người Dùng (Willing Users)

Tài liệu này ghi nhận quá trình kiểm thử thực tế với 5 người dùng (trong danh sách Willing Users lớp 3A - Phòng E403). Đây là bằng chứng quan trọng cho tiêu chí **Rubric R6 (Validation & Feedback)**, giải thích cách nhóm thu thập phản hồi và thực hiện những thay đổi cốt lõi trên sản phẩm.

---

## 1. Dữ liệu Kiểm thử 5 Người Dùng (Feedback Log)

### Ca 1: Lê Hà Uyên (`2A202602613`) — "Nhìn giao diện giả lập khối màu không có cảm giác tin tưởng"
- **Thời gian:** 15:30 – 15:50, 17/09/2026.
- **Tình huống:** Uyên thử nghiệm tính năng Deep-linking của Bot Hub. Uyên hỏi *"Xác định bài toán AI thế nào?"* và được điều hướng sang Day 2.
- **Phản hồi:** Ở phiên bản mẫu ban đầu, khu vực xem tài liệu chỉ là một khối màu xanh ghi chữ "Đây là vùng xem Slide". Uyên nhận xét: *"Trợ lý ảo dẫn chứng rất hay, nhưng nhìn màn hình trắng bóc và một cái khối màu giả lập khiến tui thấy không tin tưởng. Phải nhúng thẳng file PDF thật vào màn hình để tui đối chiếu ngay lập tức."*
- **Quyết định của nhóm:** Đập bỏ UI giả lập, triển khai nhúng trực tiếp `<iframe>` render file PDF thật, kết hợp URL Hash `#page=X` để trình duyệt tự động lật đúng trang.

### Ca 2: Nguyễn Phi Nhật (`2A202602658`) — "Cuộn PDF tự do làm mất phương hướng"
- **Thời gian:** 16:00 – 16:20, 17/09/2026.
- **Tình huống:** Sau khi nhóm cập nhật bản nhúng PDF thật, Nhật thử hỏi kiến thức Day 1. Trợ lý nhảy đúng đến trang 18.
- **Phản hồi:** Nhật có thói quen lăn chuột. Khi đang đọc trang 18, Nhật vô lỡ tay cuộn lăn qua trang 19, 20... Sau 2 phút, Nhật không nhớ trang ban đầu bot trỏ đến là trang nào. *"Trời ơi, tui cuộn một hồi lạc luôn trong file PDF 29 trang rồi. Tính năng nhảy trang vô dụng mất nếu người dùng tự cuộn đi chỗ khác."*
- **Quyết định của nhóm:** Thay đổi cơ chế hiển thị PDF. Khóa hoàn toàn chức năng cuộn trang tự do của file PDF (Scroll Lock). Người dùng bắt buộc phải dùng nút chuyển trang của hệ thống hoặc hỏi lại AI để duy trì đúng ngữ cảnh bài học.

### Ca 3: Đặng Quốc Hiệp (`2A202602755`) — "Có ảnh slide là tốt, nhưng tui cần đọc text chữ cho nhanh"
- **Thời gian:** 16:25 – 16:45, 17/09/2026.
- **Tình huống:** Hiệp dùng bot để ôn lại khái niệm "Agentic Workflow".
- **Phản hồi:** *"Slide thì đẹp đó, nhưng khi tui cần quét nhanh chữ (skimming) hoặc muốn copy nội dung bài giảng để làm báo cáo thì file PDF dạng ảnh không thể copy được. Rất bất tiện."*
- **Quyết định của nhóm:** Bổ sung ngay một tab mới có tên **"Transcript" (Bản dịch văn bản)** bên cạnh tab Slide. Sử dụng thư viện `react-markdown` để render nguyên văn nội dung của trang slide dưới dạng text thuần, giúp sinh viên dễ dàng bôi đen và sao chép.

### Ca 4: Lê Văn Tài (`2A202602464`) — "Bot hỏi ngược thì hay, nhưng tui lười gõ phím"
- **Thời gian:** 16:50 – 17:10, 17/09/2026.
- **Tình huống:** Tài hỏi một khái niệm chung chung: *"Prompting là gì?"*. Bot Hub kích hoạt kịch bản "Mơ hồ" và hỏi ngược: *"Bạn muốn xem Prompt cơ bản (Day 1) hay nâng cao (Day 2)?"*.
- **Phản hồi:** *"Nó hỏi ngược lại đúng ý tui nè, chứng tỏ bot rất hiểu bài. Nhưng tui đang dùng điện thoại, lười gõ lại chữ 'Cơ bản' quá. Nên làm mấy cái nút bấm luôn cho lẹ."*
- **Quyết định của nhóm:** Ghi nhận cải tiến UI. Thay vì bắt người dùng gõ chữ, các câu hỏi ngược (Probing question) của Hub sẽ đi kèm với các **Quick Action Chips (Nút bấm nhanh)** trên giao diện chat.

### Ca 5: Nguyễn Nam Khánh (`2A202602568`) — "Tại sao lại cấm tui học trước kiến thức Day 4?"
- **Thời gian:** 17:15 – 17:30, 17/09/2026.
- **Tình huống:** Khánh đang học Day 1 nhưng cố tình hỏi *"RAG là gì?"* (kiến thức Day 4).
- **Phản hồi:** Bot Hub kích hoạt luật Prerequisite (Tiên quyết), chặn lại và nói Day 4 chưa tới, yêu cầu học xong Agent ở Day 3. Khánh phản ứng: *"Gắt quá vậy, lỡ tui tò mò muốn biết trước thì sao? Ít nhất cũng phải giải thích vì sao cấm chứ."*
- **Quyết định của nhóm:** Giữ nguyên quy tắc chặn vượt cấp để bảo vệ lộ trình sư phạm, nhưng **viết lại thông báo từ chối (Graceful Guidance)**. Bot sẽ giải thích rõ ràng: *"Do RAG đòi hỏi hiểu biết về Vector DB, nên bạn cần học nền tảng trước. Nếu vẫn muốn xem, đây là link đọc thêm..."* thay vì chỉ nói "Không được phép".

---

## 📌 Bốn Dòng Kết Luận Theo Chuẩn Rubric R6

1. **Chủ đề lặp nhiều nhất:**  
   Người dùng rất thích khả năng điều hướng siêu tốc của Hub & Spoke, nhưng họ luôn gặp rào cản với các tương tác phần nhìn (Micro-interactions) trên UI. Thay vì đòi hỏi bot phải thông minh hơn, 100% người dùng yêu cầu giao diện phải dễ nhìn hơn, không bị lạc khi cuộn chuột và phải dễ sao chép văn bản.

2. **Sẽ sửa gì trước demo (≥ 1 Thay đổi đã hoàn thiện):**  
   Nhóm **đã hoàn thành** 3 thay đổi cực lớn ngay trong ngày 18/9 dựa trên các feedback trên:
   - Đã nhúng PDF thật bằng thẻ `<iframe>` (Đáp ứng feedback Ca 1).
   - Đã khóa chức năng cuộn tự do của PDF để bắt buộc Focus (Đáp ứng feedback Ca 2).
   - Đã bổ sung tab "Transcript" render bằng Markdown để dễ đọc chữ (Đáp ứng feedback Ca 3).

3. **Giữ nguyên gì và vì sao:**  
   Giữ nguyên **hàng rào chặn kiến thức vượt cấp (Prerequisite Guardrail)** dù người dùng cảm thấy khó chịu ban đầu (Ca 5). Vì bản chất sản phẩm là một trợ lý Sư phạm, việc thả lỏng cho học viên đọc những khái niệm quá sức khi chưa đủ nền tảng sẽ đi ngược lại nguyên tắc Context-Aware Learning.

4. **Gì để dành sau (Deferred for Post-Hackathon):**  
   - Tính năng đồng bộ vị trí slide theo thời gian thực với tài khoản VLearn gốc.
   - Thêm nút Quick Action Chips (Đáp ứng Ca 4) sẽ được đưa vào roadmap v2 vì cần sửa lại luồng API trả về.
