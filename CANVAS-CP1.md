# Canvas 7 Dòng (CP1) — Nhóm SHUP (Lớp 3A · Phòng E403 · Cụm 4)

> **Mốc Checkpoint 1:** Theo chuẩn scaffold `02-guide.md` §1.5  
> **Repository:** `https://github.com/EddiesGranger03/K4-3A-E403-SHUP`  
> **Đội trưởng:** Nguyễn Khánh Sơn — **Mã học viên:** 2A202602388  
> **Track dự thi:** Track A · VLearn Tutor (A1 · Tối ưu AI Tutor có sẵn)

---

## 📋 Bảng Canvas 

| # | Dòng | Nội dung chi tiết |
|:---:|---|---|
| **1** | **Track + đề** | **A · VLearn Tutor — A1: Tối ưu AI tutor hiện có** (Kiến trúc Hub & Spoke: Bot Hỗ Trợ định vị toàn khóa & Bot Con chuyên sâu từng Day). |
| **2** | **Job executor** | **Học viên đang học trên VLearn** (1.617 học viên, gồm 448 học viên K4 chính khóa này), đang cần tìm lại một khái niệm liên ngày để làm bài Lab, hoặc vừa bôi đen một đoạn slide trong bài học cần giải thích. |
| **3** | **Pain một câu** | Khi hỏi để làm rõ kiến thức, học viên nhận câu trả lời dài dòng nhưng **28% không có trích dẫn nguồn** hoặc cite nhầm bài; học viên không biết kiến thức nằm ở slide/buổi nào nên phải tự lật tìm 6 ngày học rất mất thời gian. |
| **4** | **1–2 bằng chứng đầu** | • **3.781 / 13.494 lượt** phản hồi của tutor có `has_citation = False` (**28,0%**), dù học viên chủ động yêu cầu dẫn nguồn (như `T00009`). Tutor gần như không bao giờ hỏi ngược lại khi câu hỏi mơ hồ (chỉ **28 / 13.494 lượt** chọn `ask_probing_question`, tỷ lệ **0,2%** như `T01525`, `T01874`). Câu mẫu bấm sẵn chiếm **22,7%** (3.067 lượt) do học viên lúng túng khi đặt câu hỏi. *Cách đếm:* Khai phá cột `has_citation`, `move_used`, `is_preset` trong `vlearn-pack/chatlog/tutor_turns.csv` của BTC (gồm 3.097 lượt K4 từ 09/09). *Mã lượt minh họa trong data:* `T00009`, `T00018`, `T00020`, `T10288`.<br>• **Khảo sát thực tế 10 học viên** trong phòng thi E403 (Trần Chí Vĩ, Nguyễn Phi Nhật, Đặng Quốc Hiệp, Lê Văn Tài, Nguyễn Nam Khánh, Trần Đức Quân, Đại, Nguyễn Thế Khang, Đỗ Quang Vinh, Cao Văn Cường): **10/10 bạn (100%)** nói "khi hỏi một khái niệm đã học ở buổi trước, tutor trả lời lan man ngoài luồng và không dẫn link về đúng slide cần tìm". |
| **5** | **Lát cắt MỘT CÂU** | Học viên đặt câu hỏi trên VLearn · AI **quyết định câu hỏi thuộc Day nào để điều hướng kèm deep-link (Bot Hỗ Trợ)** hoặc **giải thích chuyên sâu có trích dẫn `[Trang N]` súc tích ≤ 3 câu (Bot Con)** · kết quả là học viên nắm ngay kiến thức đúng bài mà không phải lật tìm hàng trăm trang slide. |
| **6** | **AI tự làm đến đâu** | • *Tự làm:* Bot Hỗ Trợ tự nhận diện intent và sinh deep-link tới bài học liên quan; Bot Con tự trích xuất slide và trả lời kèm `[Trang N - Slide Day X]`.<br>• *Không tự làm:* Không suy đoán khi kiến thức ngoài 6 ngày học (phải từ chối); không tự biên tự diễn khi câu hỏi mơ hồ (phải hỏi ngược lại để xác định mức độ hiểu); không giải hộ bài quiz.<br>• *Lý do:* 28% phản hồi hiện không có trích dẫn làm học viên hoang mang; kiến thức sai lệch làm hỏng bài thực hành Lab.<br>• **Willing users (ngoài nhóm, đã hỏi và đồng ý):**<br>1. *Trần Chí Vĩ* · 2. *Nguyễn Phi Nhật* · 3. *Đặng Quốc Hiệp* · 4. *Lê Văn Tài* · 5. *Nguyễn Nam Khánh* · 6. *Trần Đức Quân* · 7. *Đại* · 8. *Nguyễn Thế Khang* · 9. *Đỗ Quang Vinh* · 10. *Cao Văn Cường* (Học viên phòng E403 - Cụm 4) |
| **7** | **Phân công có tên** | • **Nguyễn Khánh Sơn:** Product Lead · Kiến trúc luồng Hub & Spoke, hoàn thiện Spec, điều phối nộp các mốc.<br>• **Bùi Thị Thu Uyên:** User Research & Data Mining · Phân tích 13.494 chatlog `tutor_turns.csv`, khảo sát thực tế, thiết kế kịch bản §6.<br>• **Lê Châu Trần Phát:** AI & Evaluation Lead · Thiết kế Prompt Routing (Bot Hỗ Trợ) & Grounding (Bot Con), xây dựng Golden Set 20 cases.<br>• **Ngô Xuân Hoàng:** Technical Lead · Phát triển Web Prototype 2 tầng, AI call thật, dựng video demo 30s. |

---

## 🔍 Ghi chú đối chiếu tiêu chuẩn đạt (Dành cho Giám khảo & TA soát):
- **Dòng 4 có số thật 100%:** Trích xuất từ tệp dữ liệu `tutor_turns.csv` của Ban tổ chức với 3.781 lỗi thiếu citation (28,0%), 28 lượt hỏi ngược (0,2%), 3.067 câu mẫu (22,7%), kèm mã minh họa `T00009`, `T00018`, `T00020`, `T10288` để TA kiểm chứng trong 30 giây.
- **Dòng 5 Lát cắt sắc nét:** Một quyết định AI phân định rõ ràng giữa điều hướng liên ngày và giải thích chuyên sâu có căn cứ.
- **Dòng 6 phân định giới hạn AI:** Nêu rõ AI *không được làm gì* và danh sách 10 willing users thật tham gia khảo sát.
- **Dòng 7 phân công cụ thể:** 4 thành viên, mỗi người chịu trách nhiệm một mảng rõ ràng.
