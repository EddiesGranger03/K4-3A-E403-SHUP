# BÀI VIẾT THU HOẠCH CÁ NHÂN
## Khóa học: AI Thực Chiến — Batch 04 (VinUni 2026)
**Dự án:** VLearn Hub & Spoke AI Tutor  
**Họ và tên:** Lê Châu Trần Phát  
**Mã học viên:** 2A2026025245  
**Vai trò:** AI & Evaluation Lead (Nhóm SHUP — Lớp 3A — Phòng E403)  
**Thời gian hoàn thành:** 18/09/2026  

---

### 1. Vai trò & Trách nhiệm
Trong nhóm, tôi chịu trách nhiệm chính về kiến trúc AI và quy trình đánh giá chất lượng. Cụ thể, tôi phát triển mã script `auto_index.py` để tự động lập chỉ mục kiến thức (Knowledge Index), thiết kế câu lệnh hệ thống (System Prompt) cho các luồng xử lý, và xây dựng Bộ kiểm thử tiêu chuẩn (Golden Set) với 20 tình huống giả định.


**Công cụ AI hỗ trợ:** Tôi sử dụng Gemini Advanced để hỗ trợ lên ý tưởng cho 20 ca kiểm thử (Golden Set), đảm bảo bao phủ đủ 4 lớp chỗ khó. Ngoài ra, Gemini cũng giúp tôi tối ưu hóa vòng lặp Python trong script `auto_index.py` để xử lý mượt mà khối lượng văn bản khổng lồ từ PDF.

### 2. Những quyết định then chốt & Thách thức vượt qua
- **Tự động hóa luồng trích xuất dữ liệu:** Nhận thấy việc cập nhật chỉ mục kiến thức thủ công không khả thi khi dữ liệu lớn, tôi quyết định sử dụng khả năng xử lý của Gemini 3.5 Flash Lite để tự động quét các tệp văn bản bài giảng, từ đó sinh ra cấu trúc dữ liệu JSON chi tiết đến từng tham chiếu (`transcript_refs`). Điều này giúp hệ thống luôn đồng bộ và phản hồi chính xác vị trí tài liệu.
- **Tiêu chuẩn hóa dữ liệu đầu ra:** Đặt quy định nghiêm ngặt cho mô hình, yêu cầu mọi câu trả lời đều phải kết thúc bằng định dạng trích dẫn cụ thể (ví dụ: Day X, Slide Y).

### 3. Vấp ngã & Bài học xương máu
Quá trình đánh giá hiệu năng hệ thống mang lại cho tôi nhiều kinh nghiệm quý giá, đặc biệt là **Lỗi kiểm thử Run 1**. Khi chạy bộ Golden Set lần đầu, hệ thống chỉ đạt mức 17/20 (85%). Nguyên nhân là do Hub Bot xử lý chưa tốt các câu hỏi ngữ nghĩa ngắn gọn, dẫn đến việc chuyển hướng sai ngày học. Thay vì tìm cách thay đổi các câu hỏi kiểm thử cho dễ hơn, tôi đã tập trung phân tích log, tinh chỉnh lại chỉ thị phân loại ngữ cảnh trong System Prompt của Hub. Lượt chạy thứ 2 sau đó đã khắc phục hoàn toàn lỗi định tuyến.

### 4. Sự chuyển biến về tư duy sản phẩm AI
Làm việc với AI tạo sinh giúp tôi nhận ra sự quan trọng của việc đo lường định lượng. Tôi hiểu rõ hơn về sự đánh đổi giữa việc hệ thống cung cấp thông tin sai lệch (False Positive) và việc từ chối trả lời (False Negative). Trong môi trường học thuật, sự chính xác là ưu tiên hàng đầu, do đó tôi ưu tiên cấu hình mô hình thà phản hồi "Không có thông tin" còn hơn tự bịa ra một trang slide không tồn tại.

### 5. Kế hoạch phát triển tiếp theo
Tôi dự định mở rộng tập kiểm thử Golden Set để bao quát thêm nhiều trường hợp khó (edge-cases). Ngoài ra, tôi muốn nghiên cứu phương pháp sử dụng một mô hình ngôn ngữ lớn khác đóng vai trò làm giám khảo độc lập (LLM-as-a-judge) để đánh giá chất lượng câu trả lời một cách khách quan hơn.
