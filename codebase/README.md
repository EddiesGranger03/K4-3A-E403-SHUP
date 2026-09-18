# Thư mục Mã Nguồn Prototype (Codebase) — VLearn Hub & Spoke Tutor

> **Track dự thi:** Track A · VLearn Tutor (A1 · Tối ưu AI Tutor có sẵn)  
> **Nhóm thực hiện:** SHUP · Lớp 3A · Phòng E403 · Cụm 4  
> **Mức hoàn thiện prototype:** Working Prototype hoàn chỉnh với 2 phương án khởi chạy (Next.js Fullstack hiện đại & Node.js Standalone siêu nhẹ), tích hợp luồng đa tác tử Hub & Spoke, kết nối Live AI an toàn qua backend proxy (NVIDIA NIM Llama 3.2 & Google Gemini), bảo mật API Key tuyệt đối qua `.env`, có Auto-Index Pipeline và bộ Benchmark LLM-as-a-Judge.

---

## 📂 1. Cấu trúc Tổng thể Thư mục `codebase/`

```
codebase/
├── web-demo/                  # [Khuyến nghị] Ứng dụng Fullstack Next.js 15 App Router
│   ├── src/app/page.tsx       # Giao diện Hub (Điều hướng liên Day, Cohort K4, Gemini Tool Calling)
│   ├── src/app/lesson/[day]/  # Giao diện Spoke Lesson (PDF Iframe, Scroll Lock, Markdown Transcript)
│   ├── src/app/api/           # API routes (/api/chat-hub, /api/chat-spoke)
│   ├── public/slides/         # File PDF bài giảng thật (day1.pdf, day2.pdf)
│   └── public/transcripts/    # File transcript bài giảng Markdown (day1.md, day2.md)
├── pipeline/                  # Công cụ tự động hóa Auto-Index Pipeline
│   └── auto_index.py          # Script Python bóc tách PDF/Transcript và sinh Knowledge Index
├── bots/                      # System prompts chính thức cho Hub Bot và Bot Con
│   ├── hub_bot_prompt.txt
│   └── bot_con_prompt.txt
├── server.js                  # [Phương án Standalone] Node.js Proxy Server thuần (zero npm dependency)
├── app.js                     # Script điều phối giao diện Standalone + Offline RAG fallback
├── index.html                 # Giao diện Standalone 2 tầng (Canvas PDF.js, Dark Mode, Slide Upload)
├── style.css                  # Thiết kế Dark Mode theo nguyên tắc HAX/PAIR
├── slides/                    # Slide PDF bài giảng Day 1 & Day 2 cho bản Standalone
└── workflow.png               # Sơ đồ luồng đa tác tử Hub & Spoke (Nghiệm thu CP2)
```

---

## ⚡ 2. Hướng dẫn Khởi chạy và Trải nghiệm Prototype

Giám khảo và TA có thể lựa chọn 1 trong 2 phương án tùy thuộc vào môi trường máy tính:

### 🌟 Phương án 1 (Khuyến nghị): Fullstack Next.js App (`codebase/web-demo/`)
*Trải nghiệm trọn vẹn kiến trúc Hub & Spoke hiện đại, PDF Iframe thật có khóa cuộn và tab Transcript Markdown.*

1. **Di chuyển vào thư mục web-demo:**
   ```bash
   cd codebase/web-demo
   ```
2. **Cấu hình API Key:**
   Tạo file `.env.local` (hoặc copy từ `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
   *(Điền `GEMINI_API_KEY=AIzaSy...` của bạn vào file `.env.local`)*
3. **Cài đặt thư viện & Khởi chạy:**
   ```bash
   npm install
   npm run dev
   ```
4. **Truy cập:** Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)
   - Trải nghiệm Hub Bot điều hướng thông minh bằng Tool Calling tại trang chủ.
   - Bấm vào một buổi học (Day 1 hoặc Day 2) để kiểm chứng PDF Iframe cuộn khóa (Scroll Lock), Tab Transcript Markdown và hỏi đáp Bot Con.

---

### 🚀 Phương án 2: Standalone Node.js Proxy Server (`codebase/`)
*Khởi chạy siêu tốc trong 2 giây, không cần `npm install` các gói thư viện nặng, tích hợp NVIDIA NIM và Offline Fallback 100%.*

1. **Khởi chạy server tại thư mục gốc:**
   ```bash
   node codebase/server.js
   ```
2. **Truy cập:** Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)
   - Nếu có cấu hình `NVIDIA_API_KEY` trong file `.env` gốc, server tự động kết nối mô hình Llama 3.2.
   - Nếu không có mạng hoặc chưa set key, hệ thống tự động kích hoạt **Offline Grounding Engine** dựa trên dữ liệu đã khai phá từ `vlearn-pack/`, bảo đảm 100% không bao giờ gặp lỗi gián đoạn demo.
   - Hỗ trợ nút **"Tải PDF slide"** để tải lên file PDF tùy ý và đọc nội dung trực tiếp tại chỗ.

---

## 🛠️ 3. Auto-Index Pipeline & Benchmark Suite

### 1. Khởi chạy Auto-Index Pipeline (Python)
Mô phỏng luồng làm việc của Giảng viên / Admin khi nạp bài giảng mới vào hệ thống:
```bash
python codebase/pipeline/auto_index.py \
  --slide codebase/web-demo/public/slides/day1.pdf \
  --transcript codebase/web-demo/public/transcripts/day1.md \
  --day 1 --auto
```

### 2. Khởi chạy LLM Benchmark Runner (Quality Bar CP4)
Kiểm thử tự động 20 ca Golden Set với LLM-as-a-Judge:
```bash
python eval/benchmark_runner.py
```
*(Kết quả chi tiết được đối chiếu trực tiếp tại [`eval/results.md`](../eval/results.md) với tổng tỷ lệ đạt 90.0%)*

---

## 🛡️ 4. Đặc tả Mức độ Hoàn thiện (Rubric R5)

Minh bạch hóa các thành phần chạy thật và mô phỏng phục vụ công tác chấm thi:

| Hạng mục | Trạng thái | Chi tiết kỹ thuật |
|---|:---:|---|
| **Luồng AI Hub & Spoke** | ✅ **Chạy thật (Working)** | Hub Router dùng Function Calling phân tích ý định; Bot Con nạp đúng context theo Day trích dẫn số trang chính xác. |
| **Giao diện Học tập** | ✅ **Chạy thật (Working)** | Next.js Split-screen: PDF Iframe thật khóa cuộn (`#page=X`), Transcript Markdown bôi đen copy được, Standalone PDF.js Canvas. |
| **Deep-linking** | ✅ **Chạy thật (Working)** | Phản hồi của Hub Bot tự động điều hướng sang URL Spoke tương ứng kèm tham số trang và nhảy trang chính xác. |
| **Pipeline tự động hóa** | ✅ **Chạy thật (Working)** | `auto_index.py` dùng `pdfplumber` bóc tách slide, gọi AI sinh JSON index và lưu log token sử dụng. |
| **Bảo mật & An toàn** | ✅ **Chạy thật (Working)** | Toàn bộ API Key nằm ở backend proxy (`.env`), chặn đứng Prompt Injection (`T00274`, `T00236`) và từ chối ngoài lề. |
| **Dữ liệu Cohort / Progress** | ⚠️ **Mô phỏng (Mock)** | Lịch học Cohort K4 và tiến độ sinh viên được nạp từ các file JSON mẫu tại `eval/mock_data/` do chưa kết nối trực tiếp DB VinUni. |
