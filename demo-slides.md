---
marp: true
theme: default
paginate: true
header: 'Hackathon K4-3A - Nhóm E403'
footer: 'Sản phẩm: VLearn Hub & Spoke Tutor'
---

# 🚀 Trang 1: Bối cảnh & Bằng chứng (Chuẩn A)
**Vấn đề:** 13.494 dòng chatlog cho thấy Trợ lý ảo Monolithic RAG cũ của VLearn hoạt động cực kỳ kém hiệu quả khi sinh viên hỏi bài.
**Nỗi đau thực tế:** 
- Sinh viên bị bối rối vì Bot trả lời lan man 1000 chữ nhưng không biết nằm ở slide nào.
- Bot thường xuyên "ảo giác" (nhận vơ kiến thức ngoài lề).
- Bot cho phép sinh viên Day 1 học nhảy cóc kiến thức Day 4 (RAG).

**Bằng chứng dữ liệu (Data Mining):**
- **1.151 ca** hỏi ngoài lề không được hệ thống chặn.
- **271 ca** Bot sinh ảo giác (hallucination) thay vì báo "Không có dữ liệu".
- **97 ca** học viên hỏi vượt cấp (Prerequisite Violation).

---

# 💡 Trang 2: Lát Cắt Giải Pháp & Kiến Trúc
**Lát cắt 1 câu:**
> *[Học viên AI Thực Chiến]* cần *[Tra cứu nhanh kiến thức từng buổi]* được *[Kiến trúc Hub & Spoke phân luồng tự động]* giúp *[Định vị chính xác trang Slide <1.5s và không bao giờ học vượt cấp]*

**Kiến trúc Tổng Quan (Hub & Spoke):**
1. **Hub Bot (Nhân viên Điều phối):** Nắm `knowledge_index.json`. Kiểm tra xem học viên có đang hỏi vượt cấp không. Nếu hợp lệ $\rightarrow$ Trỏ deep-link sang Bot Con.
2. **Spoke Bots (Chuyên gia Từng Ngày):** Bot Day 1, Bot Day 2. Chỉ có context của đúng ngày đó. Nhiệm vụ: Đọc Slide/Transcript $\rightarrow$ Trả lời $\le 3$ câu $\rightarrow$ Trích dẫn `[Day X - Trang Y]`.

---

# 🛡️ Trang 3: Taxonomy 4 Lớp Rủi Ro & UX
**1. D1 - Định tuyến sai ngã rẽ:**
*Giải pháp UX:* Cấu trúc lại Index Key cứng (Concept ID). Bôi vàng dòng text khi nhảy sang Slide để báo hiệu thị giác.
**2. D2 - Học viên vượt cấp (Prerequisite):**
*Giải pháp UX:* Cảnh báo "Graceful Guidance". Giải thích vì sao chưa nên học (VD: Cần học Day 3 trước khi học Day 4).
**3. D3/D5 - Ảo giác (Hallucination) & Trích dẫn lỏng lẻo:**
*Giải pháp UX:* Ép Prompt chỉ trả lời khi có căn cứ. Chia Layout 50/50: Trái xem PDF Iframe thật (khóa cuộn) - Phải là Chatbot.
**4. D4 - Từ chối câu hỏi ngoài luồng:**
*Giải pháp UX:* Cơ chế HAX G10 - Thu hẹp phạm vi. Hub Bot sẽ hỏi ngược lại: *"Ý bạn là Prompt cơ bản Day 1 hay nâng cao Day 2?"*.

---

# 📊 Trang 4: Đo Lường Thực Tế (Quality Bar)
Chạy tự động **20 Golden Set Cases** thông qua LLM-as-a-Judge (`benchmark_runner.py`).

| Tiêu chí | Cam kết (CP4) | Thực tế (Run 1) | Đánh giá |
|:---|:---:|:---:|:---:|
| **Routing Precision** (D1) | 90% | **100%** (5/5) | 🟢 Xuất sắc |
| **Prerequisite Accuracy** (D2) | 100% | **100%** (5/5) | 🟢 Xuất sắc |
| **Zero-Hallucination Rate** (D3) | 95% | **100%** (5/5) | 🟢 Xuất sắc |
| **Out-of-scope Rejection** (D4) | 80% | **60%** (3/5) | 🟡 Cần tinh chỉnh |
**Tổng kết (Overall Pass Rate): 90.0%** (18/20 test cases Pass)

---

# 🔄 Trang 5: R6 - Validation & Bài Học
Phỏng vấn **5 Willing Users** tại phòng E403. Ghi nhận 3 bài học đắt giá về UI/UX:
1. **Slide giả lập làm mất lòng tin:** Người dùng không tin một khối màu xanh.
$\rightarrow$ *Action:* Đập bỏ, thay bằng **PDF Iframe thật** (Ca 1).
2. **Cuộn PDF tự do gây lạc đường:** Nhảy đến trang 18 xong lỡ tay cuộn qua trang 20.
$\rightarrow$ *Action:* Thiết lập **Scroll Lock** cho file PDF, ép duy trì ngữ cảnh (Ca 2).
3. **Slide dạng ảnh không copy được text:** Gây khó khăn khi làm bài Lab.
$\rightarrow$ *Action:* Bổ sung tab **Transcript (React-Markdown)** để bôi đen sao chép dễ dàng (Ca 3).

---

# 🌟 Trang 6: Kế Hoạch Mở Rộng & Đội Ngũ
**Kế Hoạch Tương Lai (Post-Hackathon):**
1. **Đồng bộ vị trí Cloud:** Lưu vị trí đọc slide của từng User ID lên hệ thống VLearn (SSO).
2. **Voice Input:** Cho phép ra lệnh bằng giọng nói khi tay đang bận gõ code trên Jupyter.
3. **Auto-Index Pipeline (Gen 2):** Admin chỉ cần thả file PDF, AI sẽ tự cắt trang, trích xuất hình ảnh làm Vector DB.

**Đóng góp Thành Viên:**
- **Sơn (Product Lead):** Chốt lát cắt 1 câu, thiết kế luồng Hub & Spoke, quản lý Checklist.
- **Uyên (Data Lead):** Cào 13.494 log, thống kê 1.151 lỗi D4, phỏng vấn 5 Users (R6).
- **Phát (AI Lead):** Thiết kế Prompt cho Hub/Spoke, chạy Benchmark 20 Golden Set.
- **Hoàng (Tech Lead):** Code Next.js UI, tích hợp PDF/Transcript, xử lý Deep-linking UI.
