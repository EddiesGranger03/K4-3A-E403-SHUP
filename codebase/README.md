# Thư mục Mã Nguồn Prototype (Codebase) — VLearn Hub & Spoke Tutor

> **Track dự thi:** Track A · VLearn Tutor (A1 · Tối ưu AI Tutor có sẵn)  
> **Nhóm thực hiện:** SHUP · Lớp 3A · Phòng E403 · Cụm 4  
> **Mức hoàn thiện prototype:** Working Prototype hoàn chỉnh trên nền tảng Next.js 15 Fullstack hiện đại (App Router, Tailwind CSS, TypeScript), tích hợp luồng đa tác tử Hub & Spoke, kết nối Live AI an toàn qua backend proxy (Google Gemini & NVIDIA NIM), bảo mật API Key tuyệt đối qua `.env`, có Auto-Index Pipeline và bộ Benchmark LLM-as-a-Judge 20 ca kiểm thử.

---

## 📂 1. Cấu trúc Tổng thể Thư mục `codebase/`

```
codebase/
├── web-demo/                  # Ứng dụng Fullstack Next.js 15 App Router (Mã nguồn chính)
│   ├── src/app/page.tsx       # Giao diện Hub (Điều hướng liên Day, Cohort K4, AI Router)
│   ├── src/app/lesson/[day]/  # Giao diện Spoke Lesson (PDF Canvas/Iframe, Resizable AI Panel, Transcript Markdown)
│   ├── src/app/api/           # API routes (/api/chat-hub, /api/chat-spoke)
│   ├── src/components/        # Component tái sử dụng (PdfViewer Canvas Mozilla Engine)
│   ├── src/constants/         # Dữ liệu bài giảng và danh mục khái niệm
│   ├── src/lib/               # Module AI Provider đa tầng (Gemini & NVIDIA NIM)
│   ├── public/slides/         # File PDF bài giảng thật (day1.pdf, day2.pdf)
│   ├── public/transcripts/    # File transcript bài giảng Markdown (day1.md, day2.md)
│   └── public/vendor/pdfjs/   # Mozilla PDF.js Canvas Engine cục bộ
├── pipeline/                  # Công cụ tự động hóa Auto-Index Pipeline
│   └── auto_index.py          # Script Python bóc tách PDF/Transcript và sinh Knowledge Index
├── bots/                      # System prompts chính thức cho Hub Bot và Bot Con
│   ├── hub_bot_prompt.txt     # Prompt định tuyến Hub & Spoke (chống lạc đề, trích dẫn bài học)
│   └── bot_con_prompt.txt     # Prompt Bot Con chuyên sâu (Micro-answer + Cầu nối sư phạm về slide)
└── workflow.png               # Sơ đồ luồng đa tác tử Hub & Spoke (Nghiệm thu CP2)
```

---

## ⚡ 2. Hướng dẫn Khởi chạy và Trải nghiệm Prototype

### 🌟 Khởi chạy Fullstack Next.js App

Từ thư mục gốc dự án:
```bash
# 1. Cấu hình API Key (nếu chưa có file .env):
cp .env.example .env

# 2. Khởi chạy ứng dụng dev server:
npm run dev
```
*(Hoặc di chuyển trực tiếp vào `codebase/web-demo` và chạy `npm run dev`)*

Truy cập trình duyệt tại: [http://localhost:3000](http://localhost:3000)
- **Hub Bot (Trang chủ):** Nhập câu hỏi tự do về AI/ML, nhận định vị bài giảng liên Day kèm nút chuyển hướng Deep-link tức thì.
- **Spoke Lesson (Trang bài học):** Chọn Day 1 hoặc Day 2 để xem slide PDF bằng bộ đọc Canvas chính xác (chế độ Theo trang không bị chườm lề / chế độ Cuộn dọc), thanh trượt co giãn Resizable Side Panel cho Trợ giảng AI, và tab Transcript Markdown.

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
| **Giao diện Học tập** | ✅ **Chạy thật (Working)** | Next.js Split-screen: Bộ đọc Mozilla PDF.js Canvas tích hợp (Chế độ Theo trang chuẩn xác / Cuộn dọc), Trợ giảng AI Resizable Side Panel, và Tab Transcript Markdown. |
| **Deep-linking** | ✅ **Chạy thật (Working)** | Phản hồi của Hub Bot tự động điều hướng sang URL Spoke tương ứng kèm tham số trang và nhảy trang chính xác. |
| **Pipeline tự động hóa** | ✅ **Chạy thật (Working)** | `auto_index.py` dùng `pdfplumber` bóc tách slide, gọi AI sinh JSON index và lưu log token sử dụng. |
| **Bảo mật & An toàn** | ✅ **Chạy thật (Working)** | Toàn bộ API Key nằm ở backend proxy (`.env`), chặn đứng Prompt Injection (`T00274`, `T00236`) và từ chối ngoài lề. |
| **Dữ liệu Cohort / Progress** | ⚠️ **Mô phỏng (Mock)** | Lịch học Cohort K4 và tiến độ sinh viên được nạp từ các file JSON mẫu tại `eval/mock_data/` do chưa kết nối trực tiếp DB VinUni. |
