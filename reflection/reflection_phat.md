# BÀI VIẾT THU HOẠCH CÁ NHÂN (PERSONAL REFLECTION)
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Lê Châu Trần Phát  
**Mã học viên:** 2A2026025245  
**Vai trò:** AI & Evaluation Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm trong 47.5 giờ
Tôi là người chịu trách nhiệm về "Bộ não" của dự án: Kiến trúc luồng suy luận của AI, Kỹ thuật Prompt Engineering và Đo lường Đánh giá.
- **Kỹ sư Tự động hóa Dữ liệu (Auto-Index Pipeline):** Viết script Python tự động trích xuất nội dung từ Transcript và Slide PDF thành Knowledge Index cho Hub Bot.
- **Xây dựng Bộ Kiểm thử Mẫu (Golden Set):** Thiết kế 20 ca kiểm thử thực tế phân bổ đủ 4 mức độ (từ cơ bản đến đánh đố nghiệp vụ) dựa trên dữ liệu chatlog do BTC cung cấp.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Gỡ bỏ giới hạn Context Window:** Khi xây dựng `auto_index.py`, ban đầu tôi hard-code giới hạn đọc 6000 ký tự vì sợ mô hình quá tải. Nhưng khi nghiên cứu cấu trúc của Gemini 3.5 Flash Lite, tôi mạnh dạn gỡ bỏ hoàn toàn giới hạn này. Kết quả, mô hình dễ dàng "nuốt trọn" hàng chục ngàn từ của toàn khóa học, tạo ra bản index chính xác đến từng dòng trích dẫn (transcript_refs) mà không bị sập.
- **Ép buộc Grounding tuyệt đối:** Yêu cầu Bot Con tuân thủ kỷ luật: giải thích ≤ 3 câu và bắt buộc có mã trích dẫn `[Trang X - Slide Day Y]`.

### 3. Vấp ngã & Bài học xương máu
Bài học đắt giá nhất của tôi đến từ **Lỗi kiểm thử Run 1**. Trong lần chạy đo lường đầu tiên trên Golden Set, hệ thống chỉ đạt 17/20 ca (85%). Ba ca thất bại tập trung ở các truy vấn mơ hồ (Ví dụ: user hỏi cộc lốc *"Prompting là gì?"*). Thuật toán Semantic Router của tôi bị thiên kiến (bias) tự động đẩy về Day 1 thay vì kích hoạt luồng đặt câu hỏi ngược (Probing Question). 
Tôi đã không sửa dữ liệu test để gian lận, mà quay lại tinh chỉnh trọng số ưu tiên của Index, siết chặt Prompt. Kết quả ở lượt **Run 2**, hệ thống đã giải quyết hoàn hảo 20/20 ca (100%), đem lại sự thỏa mãn tuyệt đối về mặt kỹ thuật.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Hành trình này dạy tôi rằng AI không thể đánh giá bằng cảm tính kiểu *"thấy nó nói hay là được"*. Nó phải được đo lường bằng các chỉ số định lượng. Tôi thấu hiểu sự đắt giá của việc đánh đổi giữa **False Positive (Sinh ảo giác)** và **False Negative (Từ chối khéo)**. Trong môi trường sư phạm, để học viên hiểu sai kiến thức (False Positive) là một tội ác. Việc cấu hình AI có trách nhiệm và có căn cứ trích dẫn rõ ràng quan trọng hơn sự hào nhoáng của bề nổi.

### 5. Kế hoạch phát triển tiếp theo
Tôi sẽ tiếp tục mở rộng quy mô Golden Set từ 20 ca lên 100 ca để bao phủ toàn bộ edge-case, đồng thời nghiên cứu tích hợp phương pháp đánh giá LLM-as-a-Judge tự động để chấm điểm chất lượng sư phạm của các câu trả lời do Spoke Bot sinh ra.
