# VLearn Hub & Spoke Tutor — Mã Nguồn Prototype

> Nhóm SHUP · Lớp 3A - Phòng E403 · AI Thực Chiến Batch 04 (VinUni 2026)

Tài liệu này hướng dẫn Giám khảo/TA cách khởi chạy toàn bộ mã nguồn của dự án (Working Prototype). Prototype bao gồm 2 phần chính: Giao diện Web (Next.js) và Công cụ Pipeline (Python).

---

## 1. Cấu trúc Mã nguồn

- `web-demo/`: Ứng dụng Fullstack Next.js chứa Giao diện người dùng (Split-screen), Backend định tuyến API (Hub), Backend truy xuất (Spoke) và cơ chế Deep-linking.
- `pipeline/`: Công cụ xử lý tự động `auto_index.py` dùng thuật toán NLP và LLM để cào nội dung từ file PDF, xây dựng bộ chỉ mục (Knowledge Index) JSON.

---

## 2. Hướng dẫn Khởi chạy Web Prototype (Next.js)

**Yêu cầu hệ thống:** Node.js (v18 trở lên).

### Bước 1: Cấu hình biến môi trường
Mở Terminal và di chuyển vào thư mục web:
```bash
cd codebase/web-demo
cp .env.example .env.local
```
*(Mở file `.env.local` vừa tạo và điền khóa API của bạn vào: `GEMINI_API_KEY=AIzaSy...`)*

### Bước 2: Cài đặt thư viện
```bash
npm install
```

### Bước 3: Chạy môi trường Local
```bash
npm run dev
```
- Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)
- Trải nghiệm thử luồng định tuyến (Hub) và phân quyền (Spoke) bằng cách vào bài học Day 1 hoặc Day 2.

---

## 3. Hướng dẫn Khởi chạy Auto-Index Pipeline (Python)

*(Lưu ý: Tính năng này mô phỏng luồng công việc của Admin khi đưa bài giảng mới lên hệ thống)*

**Yêu cầu hệ thống:** Python 3.9+

### Bước 1: Cài đặt thư viện
```bash
pip install google-genai pdfplumber
export GEMINI_API_KEY="your-api-key-here"
```

### Bước 2: Chạy công cụ cào dữ liệu
Chạy lệnh sau từ thư mục gốc của dự án (K4-3A-E403-SHUP):
```bash
python codebase/pipeline/auto_index.py \
  --slide hackathon_docs/data/vlearn-pack/day5_slide.pdf \
  --transcript hackathon_docs/data/vlearn-pack/day5_transcript.txt \
  --day 5
```
Công cụ sẽ xuất ra file JSON index hoàn chỉnh sẵn sàng nạp cho Bot.

---

## 4. Đặc tả Mức độ Hoàn thiện (Rubric R5)

Để phục vụ công tác chấm thi, nhóm xin minh bạch hóa những thành phần chạy thật và mô phỏng:

✅ **PHẦN CHẠY THẬT (Working):**
- **Luồng xử lý AI lõi:** Định tuyến Hub Router và luồng RAG Bot Con gọi API trực tiếp tới Gemini 3.5 Flash Lite qua SDK `google-genai` (có log token đầy đủ).
- **Trải nghiệm Học tập:** Hiển thị trực tiếp file PDF thật (Iframe CSS locked scroll), render nội dung Markdown Transcript tốc độ cao.
- **Deep-linking:** Phản hồi từ mô hình tự động điều khiển React State, buộc Iframe PDF nhảy đúng số trang `#page=X`.
- **Pipeline:** Phân tách trang PDF thật bằng `pdfplumber` và trích xuất tham chiếu.

⚠️ **PHẦN MÔ PHỎNG (Mock):**
- Cơ sở dữ liệu tiến độ học viên (Mock qua 3 file JSON lưu cục bộ).
- Lịch học Cohort K4 (Mock lịch tĩnh theo tuần).
- Các buổi học Day 3, 5, 6 hiển thị trạng thái khóa (Do giới hạn thời gian Hackathon, nhóm chỉ cấp index thực tế cho Day 1, Day 2 và Day 4).
