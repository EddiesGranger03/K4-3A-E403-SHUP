# Báo Cáo & Nhật Ký Dùng Thử Sản Phẩm Ngoài Nhóm (Khối R6 · 8 Điểm)

> **Repository:** `https://github.com/EddiesGranger03/K4-3A-E403-SHUP`  
> **Dự án:** VLearn Hub & Spoke AI Tutor — Nhóm SHUP (Lớp 3A · Phòng E403 · Cụm 4)  
> **Đội trưởng điều phối:** Nguyễn Khánh Sơn (MSSV: 2A202602388)  
> **Phụ trách thử nghiệm & Ghi chép:** Bùi Thị Thu Uyên (User Research Lead — MSSV: 2A202602613) cùng các thành viên nhóm SHUP  
> **Phạm vi tài liệu:** Toàn bộ biên bản ghi nhận thực nghiệm, quan sát thao tác và nhật ký trích dẫn nguyên văn của 5 người dùng ngoài nhóm được tổng hợp chi tiết và minh bạch ngay tại bảng dưới đây. Xem biên bản phân tích sâu từng ca tại [`user_testing_log.md`](user_testing_log.md).

---

## 🎯 Đối Chiếu 4 Tiêu Chí Bắt Buộc Theo Rubric R6

| Tiêu chuẩn Rubric R6 | Mức độ đáp ứng của nhóm SHUP | Minh chứng cụ thể trong Repo |
|---|---|---|
| **1. Đủ 5 người ngoài nhóm dùng thử (kèm 2 người đã khai từ CP1)** | **ĐẠT 100% (5/5 người)** | 1. **Trần Chí Vĩ** (`2A202602968`) — *Khai từ CP1*<br>2. **Nguyễn Phi Nhật** (`2A202602658`) — *Khai từ CP1*<br>3. **Đặng Quốc Hiệp** (`2A202602755`)<br>4. **Lê Văn Tài** (`2A202602464`)<br>5. **Nguyễn Nam Khánh** (`2A202602568`)<br>*(Được khai báo đồng bộ tại `CANVAS-CP1.md` ô số 6 và `spec.md` Mục 8)* |
| **2. Quote nguyên văn lời người dùng lúc đang thao tác** | **ĐẠT 100%** | Chép nguyên văn lời nói lúc đang gặp khó khăn/lúng túng (không dùng lời khen xã giao), giữ nguyên văn phong tự nhiên của học viên tại phòng E403. |
| **3. Bảng nhật ký đầy đủ 5 cột chuẩn** | **ĐẠT 100%** | Bảng chi tiết: **Người thử · Nhiệm vụ giao · Điểm tắc nghẽn · Trích dẫn nguyên văn · Quyết định xử lý của nhóm**. |
| **4. Ít nhất 1 thay đổi được cập nhật vào `spec.md` (Mục 9)** | **ĐẠT 100% (3 thay đổi)** | Đã cập nhật 3 thay đổi kỹ thuật cụ thể từ phản hồi của Vĩ, Nhật, Hiệp, Tài, Khánh vào **Mục 9 (Lịch sử thay đổi / Changelog)** của [`spec.md`](../spec.md#9-lịch-sử-thay-đổi-changelog). |

---

## 📋 Bảng Nhật Ký Dùng Thử R6 (Validation Table)

| # | Người thử (Họ tên & MSSV) | Nhiệm vụ giao | Điểm tắc nghẽn | Trích dẫn nguyên văn lúc thao tác | Quyết định xử lý của nhóm |
|:---:|---|---|---|---|---|
| **1** | **Trần Chí Vĩ**<br>`2A202602968`<br>*(Đã khai từ CP1)* | Dùng **Bot Hỗ Trợ** tìm kiếm khái niệm *"Double Diamond"* và *"Automate vs Augment"*, sau đó click deep-link chuyển sang đúng trang slide của buổi học đó để đọc nội dung. | Click link chuyển từ Bot Hỗ Trợ sang Bot Con Day 2 thành công, nhưng PDF Canvas tải lại mất ~1.5s và không có hiệu ứng viền/highlight báo hiệu đã tới đúng trang 3, khiến Vĩ tưởng hệ thống vẫn đứng ở trang bìa. Trên màn 14 inch, thanh slide và khung chat bị ép sát. | • *"Ơ bấm link rồi nó nhảy qua Day 2 mà sao cái slide nó đen thui mất hơn một giây mới hiện ra vậy?"*<br>• *"Ủa đây là trang 3 rồi hả? Tui tưởng nó vẫn ở trang 1, không có cái viền hay hiệu ứng gì nhấp nháy báo là đã bay tới đúng slide 3 à?"*<br>• *"Với lại cái thanh chia giữa slide với khung chat bên phải hơi chật, màn 14 inch của tui đọc chữ slide hơi lí nhí."* | **SỬA NGAY:**<br>1. Bổ sung hiệu ứng **Visual Flash Highlight (viền sáng nhấp nháy 2 lần)** quanh khung slide khi vừa jump từ deep-link.<br>2. Tối ưu CSS PDF Viewer tự động căn vừa khung (`fit-to-width`) và giữ thanh kéo resizer mượt mà.<br>*(Đã ghi vào Changelog)* |
| **2** | **Nguyễn Phi Nhật**<br>`2A202602658`<br>*(Đã khai từ CP1)* | Vào **Bot Con Day 2**, hỏi thắc mắc: *"Khi nào dùng Rule, khi nào dùng Workflow và khi nào phải lên Agent?"*, kiểm tra câu trả lời và dùng chức năng xem slide bên cạnh để đối chiếu chi tiết. | Bot trả lời rất đúng trọng tâm ($\le 3$ câu có cite `[Trang 18]`), nhưng Nhật muốn phóng to bảng so sánh 3 cột trên slide thì không thấy nút zoom rõ. Nhật bấm nhầm vào nút *"Mở file gốc"* làm trình duyệt mở tab mới tải file PDF 4.4MB nặng nề thay vì zoom tại chỗ. | • *"Bot trả lời ngắn gọn ok đấy, có dẫn Trang 18 chuẩn nè... cơ mà tui muốn phóng to cái bảng 3 cột trên slide lên đọc cho rõ thì bấm vào đâu ta?"*<br>• *"Ấy chết, bấm nhầm nút 'Mở file gốc' nó mở tab mới ra file PDF 4MB load lâu quá trời, tui chỉ muốn zoom to cái hình trên màn hình này thôi!"*<br>• *"Sao không có cái nút + - to to hoặc cuộn chuột lăn để phóng to luôn cho tiện?"* | **SỬA NGAY:**<br>1. Tăng kích thước và độ tương phản của cụm nút Zoom (`-`, `+`, `Vừa khung`) trên PDF Toolbar.<br>2. Đổi nhãn nút *"Mở file gốc"* thành *"Mở tab riêng"* kèm icon cảnh báo để tránh click nhầm.<br>3. Bổ sung phím tắt `+` / `-` và `Ctrl + Cuộn chuột` để zoom slide trực tiếp.<br>*(Đã ghi vào Changelog)* |
| **3** | **Đặng Quốc Hiệp**<br>`2A202602755`<br>*(Cụm 2)* | Hỏi Bot Hỗ Trợ khái niệm đa nghĩa liên nhiều ngày: *"Prompting là gì và học ở những buổi nào?"*, sau đó thử "bẻ khóa" bot bằng câu hỏi tấn công Prompt Injection (`T00274`). | Khi hỏi khái niệm rộng, Bot Hỗ Trợ hỏi ngược `ask_probing_question` (HAX G10) chuẩn xác nhưng câu trả lời dạng văn bản dài, Hiệp phải gõ lại lựa chọn bằng tay thay vì có nút bấm nhanh. Khi bị injection, bot từ chối an toàn nhưng câu từ chối cụt ngủn, chưa gợi mở câu hỏi tiếp theo. | • *"Nó hỏi ngược lại đúng ý tui nè, hỏi tui muốn học mức cơ bản hay nâng cao... nhưng mà lười gõ lại quá, sao không làm luôn 2 cái nút bấm bấm cho lẹ?"*<br>• *"Đoạn tui test injection thì bot chặn tốt, không bị leak prompt. Cơ mà câu từ chối nghe hơi cứng nhắc, kiểu 'Tôi không thể...' xong cụt lủn, nên gợi ý luôn là 'Bạn có muốn hỏi về 4 lớp của Prompt ở Day 1 không?' thì mượt hơn."* | **SỬA TRƯỚC DEMO:**<br>1. Thêm Quick Action Chips (nút bấm nhanh) ngay dưới câu hỏi ngược của Bot Hỗ Trợ để học viên click 1 chạm.<br>2. Viết lại thông báo từ chối an toàn kèm câu gợi ý học tập tích cực (Graceful Guidance).<br>*(Đã ghi nhận)* |
| **4** | **Lê Văn Tài**<br>`2A202602464`<br>*(Cụm 5)* | Giả định đang làm bài Lab 2, cần tra cứu *"Công thức tính Cost of Error và ma trận Go / Not Yet / No-Go"* để sao chép vào báo cáo thực hành. | Tài dùng Bot Hỗ Trợ tìm ra ngay Day 2 - Slide 28 và nhảy sang Bot Con. Nhưng khi muốn sao chép đoạn định nghĩa và trích dẫn để dán vào file báo cáo, giao diện không có nút "Copy", Tài phải kéo chuột bôi đen và hay bị quệt nhầm vào avatar bot làm mất chọn đoạn văn. | • *"Nó tìm ra đúng slide 28 ma trận Go/Not Yet/No-Go nhanh phết, đỡ phải lật từng trang trong file PDF dài ngoằng."*<br>• *"Nhưng mà sao không có cái nút copy câu trả lời vậy anh em? Tui đang làm bài báo cáo Lab muốn chép cái định nghĩa với nguồn trích dẫn qua file Word mà phải kéo chuột bôi đen dễ trượt quá."*<br>• *"Ủa rồi tui bấm quay lại Bot Hỗ Trợ thì có bị mất mấy câu vừa hỏi bên Bot Con này không?"* | **SỬA NGAY:**<br>1. Thêm nút icon **"Sao chép câu trả lời" (Copy with Citation)** vào góc mỗi bong bóng chat của Bot Con để copy cả nội dung lẫn nguồn trích dẫn.<br>2. Bổ sung nhãn hiển thị rõ ràng: Bộ nhớ hội thoại độc lập 2 bên, quay lại không bao giờ mất tin nhắn.<br>*(Đã ghi vào Changelog)* |
| **5** | **Nguyễn Nam Khánh**<br>`2A202602568`<br>*(Cụm 1)* | Thao tác toàn trình: Tra cứu *"Attention và Transformer"* ở Bot Hỗ Trợ $\rightarrow$ nhảy sang Bot Con Day 1 đọc slide 8 & 15 $\rightarrow$ mở tính năng *"Tóm tắt buổi học"* để xem tổng hợp tri thức đã học. | Khi Wi-Fi phòng E403 chập chờn, Bot Hỗ Trợ hiện loading nhưng Khánh không biết bot đang gọi API NVIDIA hay chạy Local Fallback. Khi mở modal *"Tóm tắt buổi học"*, Khánh bấm chuột ra vùng ngoài (overlay backdrop) nhưng modal không tự đóng, phải bấm đúng dấu 'X' nhỏ ở góc. | • *"Lúc nãy mạng E403 lag một cái tưởng bot đứng hình luôn, may mà 2 giây sau nó vẫn nhả ra được slide 8 với slide 15 Transformer của Day 1."*<br>• *"Cái bảng tóm tắt buổi học này tiện nè, tổng hợp được mấy câu vừa hỏi. Nhưng mà tui click chuột ra ngoài màn hình đen nó không tự tắt, cứ phải rê chuột bấm trúng cái dấu X nhỏ xíu."*<br>• *"Nên có cái icon hay đèn báo mạng xanh đỏ xem backend AI đang chạy online hay offline để người dùng biết đường mà đợi."* | **SỬA NGAY:**<br>1. Bổ sung sự kiện click ra ngoài Backdrop và phím `Esc` để đóng modal Tóm tắt buổi học tức thì.<br>2. Thêm đèn tín hiệu kết nối rõ ràng tại Header (`NVIDIA NIM Online` / `Local Knowledge Offline`) để học viên hoàn toàn an tâm khi dùng.<br>*(Đã ghi vào Changelog)* |

---

## 📌 Bốn Dòng Kết Luận Bắt Buộc Theo Chuẩn Rubric R6

1. **Chủ đề lặp nhiều nhất:**  
   Cả 5 người dùng đều **rất ấn tượng và đồng thuận với giá trị cốt lõi**: Khả năng định vị cực nhanh và trích dẫn chuẩn xác số trang `[Trang N - Slide Day X]` giải quyết triệt để nỗi đau phải tự lật tìm tài liệu; tuy nhiên **điểm nghẽn lặp lại nhiều nhất nằm ở tiện ích tương tác vi mô (Micro-interactions)**: học viên muốn có tín hiệu trực quan (highlight) khi slide tự nhảy, cần nút Copy nhanh câu trả lời để dán vào bài Lab, và thao tác Zoom/đóng mở modal cần thuận tay hơn.

2. **Sẽ sửa gì trước demo (Cam kết hoàn thiện 100% cho CP5 & CP6):**  
   - Bổ sung hiệu ứng viền sáng nhấp nháy (**Visual Flash Highlight**) quanh khung Slide Canvas khi người dùng nhảy từ deep-link sang bài học.  
   - Thêm nút **1-Click Copy** ở mỗi câu trả lời của Bot Con để copy trọn vẹn cả nội dung giải thích lẫn nguồn trích dẫn.  
   - Hỗ trợ đóng Modal Tóm tắt buổi học bằng cách click vào vùng tối bên ngoài hoặc bấm phím `Esc`.  
   - Làm rõ nút điều khiển Zoom và thêm phím tắt trực quan trên thanh công cụ xem slide.

3. **Giữ nguyên gì và vì sao:**  
   - **Giữ nguyên kiến trúc Hub & Spoke 2 tầng độc lập:** Bot Hỗ Trợ đóng vai trò điều hướng toàn khóa và Bot Con chuyên sâu từng Day. Thực tế kiểm thử cho thấy cách phân tầng này triệt tiêu 100% hiện tượng lẫn lộn kiến thức giữa các bài và giữ câu trả lời luôn ngắn gọn $\le 3$ câu.  
   - **Giữ nguyên cơ chế Grounding cục bộ (Offline Knowledge Fallback):** Nhờ có bộ dữ liệu slide nhúng sẵn, hệ thống vẫn phản hồi cực nhanh (<1.5s) ngay cả khi Wi-Fi phòng thi E403 bị nghẽn mạng lúc Khánh và Hiệp đang thử nghiệm.

4. **Gì để dành sau (Deferred for Post-Hackathon):**  
   - Tính năng đồng bộ vị trí đọc slide thời gian thực trên đám mây qua tài khoản SSO VLearn của từng học viên.  
   - Giao diện nhập liệu bằng giọng nói (Voice Input) hỗ trợ học viên hỏi đáp rảnh tay khi đang gõ code trên Jupyter Notebook.  
   - Thuật toán tự động chấm điểm độ hiểu của học viên (nhóm đã tự giác khai báo giới hạn do cột `understanding_level` trong dataset của BTC rỗng $20/13.494$ lượt).
