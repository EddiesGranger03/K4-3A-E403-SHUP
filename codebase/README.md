# Thư mục Mã Nguồn Prototype (Codebase) — VLearn Hub & Spoke Tutor

> **Track dự thi:** Track A · VLearn Tutor (A1 · Tối ưu AI Tutor có sẵn)  
> **Nhóm thực hiện:** SHUP · Lớp 3A · Phòng E403 · Cụm 4  
> **Mức hoàn thiện prototype:** Working Prototype (Tích hợp luồng đa tác tử Hub & Spoke, kết nối backend proxy an toàn tới NVIDIA NIM Llama 3.2, bảo mật API Key qua `.env` & `.gitignore`, không để lộ key trên frontend, kèm cơ chế RAG fallback cục bộ bảo đảm độ tin cậy 100%).

---

## 📂 1. Cấu trúc thư mục `codebase/`

| Tệp / Thư mục | Định dạng | Chức năng chi tiết |
|---|:---:|---|
| [`server.js`](server.js) | Node.js Server | Backend Proxy Server (thuần Node.js, không cần npm package nặng nề). Đọc `NVIDIA_API_KEY` từ `.env`, chuyển tiếp truy vấn AI an toàn tới NVIDIA NIM API và phục vụ static files trên cổng 3000. |
| [`.env`](.env) *(Gitignored)* | ENV | Chứa `NVIDIA_API_KEY` và `MODEL_NAME`. Được chặn tuyệt đối bởi `.gitignore`, không bao giờ bị lộ lên git hay client. |
| [`.env.example`](../.env.example) | Template | Bản mẫu cấu hình biến môi trường an toàn để chia sẻ mã nguồn. |
| [`index.html`](index.html) | HTML5 | Giao diện web 2 tầng (Tầng 1: Bot Hỗ Trợ điều hướng toàn khóa; Tầng 2: Bot Con chuyên sâu với split-screen đọc slide 29 trang). **Đã loại bỏ hoàn toàn ô nhập API Key trên giao diện.** |
| [`style.css`](style.css) | CSS3 | Hệ thống thiết kế chuẩn UI/UX dark mode, hiệu ứng glassmorphism, glowing cyan và neon violet theo nguyên tắc HAX/PAIR. |
| [`app.js`](app.js) | ES6 JavaScript | Động cơ điều phối đa tác tử, gọi AI thật qua backend proxy `/api/chat`, cơ chế ghi vết (Prompt & Raw Response Logging) và xử lý grounding trích dẫn. |
| [`workflow.png`](workflow.png) | Image PNG | Sơ đồ luồng hoạt động chi tiết (Flowchart) của kiến trúc Hub & Spoke phục vụ nghiệm thu mốc CP2. |

---

## ⚡ 2. Hướng dẫn chạy và trải nghiệm

### Cách 1: Chạy kèm Backend Proxy (Khuyến nghị để kích hoạt Live AI)
1. Mở terminal tại thư mục gốc của repository:
   ```bash
   node codebase/server.js
   ```
2. Mở trình duyệt và truy cập:
   ```
   http://localhost:3000
   ```
3. Hệ thống sẽ tự động nạp `NVIDIA_API_KEY` từ `.env`, kiểm tra trạng thái backend (`/api/status`) và hiển thị badge màu xanh lá: `NVIDIA NIM Active (llama-3.2-11b-vision-instruct)`.
4. Mọi câu hỏi gửi đến Bot Con sẽ được xử lý trực tiếp bởi mô hình Llama 3.2 trên NVIDIA NIM với độ trễ thấp và trích dẫn chuẩn số trang.

### Cách 2: Chạy trực tiếp tệp tĩnh (Offline Mode / Standalone)
- Nhấp đúp mở trực tiếp tệp `codebase/index.html` trong trình duyệt.
- Nếu Backend Server chưa bật, hệ thống tự động kích hoạt **Động cơ RAG Cục bộ (Offline Grounding Engine)** dựa trên dữ liệu đã khai phá từ `vlearn-pack/`, đảm bảo 100% demo mượt mà, không bao giờ gặp lỗi gián đoạn mạng.

---

## 🛡️ 3. An toàn thông tin & Phân định ranh giới

- **Bảo mật API Key:**
  - Toàn bộ thao tác nhập/hiển thị API Key trên giao diện người dùng đã được **loại bỏ hoàn toàn**.
  - `NVIDIA_API_KEY` được lưu trữ duy nhất trong tệp `.env` tại backend và được quản lý nghiêm ngặt bởi `.gitignore`.
  - Frontend chỉ gửi nội dung câu hỏi (`userQuery`) và ngữ cảnh bài học (`systemPrompt`) tới `/api/chat` nội bộ, tuyệt đối không nắm giữ credential.
- **Phần thực tế (Real Components):**
  - Backend proxy server hoàn chỉnh với xử lý timeout, error handling, CORS headers.
  - Lời gọi mô hình AI thật qua NVIDIA NIM (`meta/llama-3.2-11b-vision-instruct`).
  - Dữ liệu giáo trình thật: 29 trang slide Day 1 (`d1-slide-hackathon.pdf`), 29 trang slide Day 2 (`d2-slide-hackathon.pdf`) và các mã transcript trích dẫn `[Txx-NNN]`.
  - Bộ lọc bảo mật: Chặn đứng prompt injection (`T00274`, `T00236`) và từ chối câu hỏi ngoài phạm vi.
- **Phần mô phỏng (Mock Components):**
  - Khung đọc slide dạng text tương tác giúp học viên tra cứu nhanh mà không cần tải file PDF nặng.
