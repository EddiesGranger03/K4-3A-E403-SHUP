---
marp: true
theme: default
paginate: true
size: 16:9
header: '**VLearn Hub & Spoke AI Tutor** · Nhóm SHUP · Phòng E403 (VinUni Batch 04)'
footer: 'Trình diễn Checkpoint 5 · AI Thực Chiến 2026'
style: |
  section {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    padding: 36px 48px;
    background: #FAF7F0;
    color: #1e293b;
    font-size: 20px;
  }
  h1 {
    color: #0f172a;
    font-size: 29px;
    margin-top: 0;
    margin-bottom: 10px;
    border-bottom: 2px solid #e2d9cc;
    padding-bottom: 8px;
  }
  h2 {
    color: #0369a1;
    font-size: 21px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  p, li {
    line-height: 1.45;
    color: #334155;
  }
  strong {
    color: #0f172a;
  }
  code {
    background: #eee8dc;
    color: #0369a1;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 17px;
  }
  .highlight {
    color: #0284c7;
    font-weight: 600;
  }
  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    background: #0284c7;
    color: #ffffff;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
  }
  .card {
    background: #ffffff;
    border-radius: 10px;
    padding: 13px 17px;
    border: 1px solid #e7dfd0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }
  .card-danger {
    background: #fef2f2;
    border: 1px solid #fecaca;
  }
  .card-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
  }
  .card-info {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16.5px;
    margin-top: 8px;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e7dfd0;
  }
  th {
    background: #f4efea;
    color: #0f172a;
    padding: 8px 12px;
    text-align: left;
    border-bottom: 2px solid #0284c7;
    font-weight: 700;
  }
  td {
    padding: 7px 12px;
    border-bottom: 1px solid #f1ece1;
    color: #334155;
  }
  blockquote {
    background: #ffffff;
    border-left: 4px solid #0284c7;
    margin: 8px 0;
    padding: 8px 14px;
    font-style: italic;
    color: #0f172a;
    border-top: 1px solid #e7dfd0;
    border-right: 1px solid #e7dfd0;
    border-bottom: 1px solid #e7dfd0;
    border-radius: 0 8px 8px 0;
  }
  footer, header {
    font-size: 12px;
    color: #78716c;
  }
---

# 🚀 Trang 1: Bối Cảnh, Bài Toán & Bằng Chứng Thực Tế

<div class="grid-2">
  <div class="card card-info">
    <h2>🎯 Job Executor & Core JTBD</h2>
    <p><strong>Học viên AI Thực Chiến</strong> khi gặp vướng mắc code Lab cần <em>tra cứu và hiểu ngay kiến thức bài giảng</em> một cách <strong>nhanh chóng, chính xác & có bằng chứng gốc</strong> để tiếp tục hoàn thành bài Lab mà không bị phân tâm hay quá tải.</p>
    <p><strong>Hiện trạng:</strong> Mô hình Chatbot nguyên khối (Monolithic RAG) trả lời chung chung, không chỉ rõ nguồn, gây mất thời gian lục lại từng trang slide.</p>
  </div>
  
  <div class="card card-danger">
    <h2 style="color: #b91c1c;">📊 Bằng Chứng Dữ Liệu (13.494 Chatlogs)</h2>
    <ul>
      <li><strong style="color: #dc2626;">1.151 ca (8.5%):</strong> Lỗi hỏi ngoài lề (D4), hỏi triết học / công nghệ xa bài học mà bot vẫn trả lời lan man 1.000 từ.</li>
      <li><strong style="color: #dc2626;">271 ca (2.0%):</strong> Lỗi ảo giác (D3/D5), bot bịa đặt thông số kỹ thuật thay vì thừa nhận tài liệu chưa đề cập.</li>
      <li><strong style="color: #dc2626;">97 ca:</strong> Học viên Day 1 hỏi vượt cấp sang RAG/Agent Day 3–4 gây đứt gãy lộ trình sư phạm (D2).</li>
    </ul>
  </div>
</div>

<div class="card" style="margin-top: 10px;">
  <strong>💡 Nhận định cốt lõi:</strong> Học viên không cần một "bách khoa toàn thư nói nhiều". Họ cần <strong>định vị chính xác trang tài liệu gốc</strong> và <strong>ngăn ngừa học nhảy cóc mất căn bản</strong>.
</div>

---

# 💡 Trang 2: Lát Cắt Giải Pháp & Kiến Trúc Hub & Spoke

<blockquote>
<strong>Lát cắt 1 câu:</strong> "Học viên AI Thực Chiến cần tra cứu tức thì kiến thức khi làm Lab, được Kiến trúc Hub & Spoke đa tác tử điều hướng chính xác vào đúng trang Slide & dòng Transcript &lt;1.5s, tuyệt đối chống học vượt cấp."
</blockquote>

<div class="grid-2" style="margin-top: 10px;">
  <div class="card">
    <h2>⚖️ So Sánh & Lý Do Lựa Chọn</h2>
    <ul>
      <li><strong>A1 - RAG Nguyên khối cũ:</strong> Nhồi 6 ngày học vào 1 context $\rightarrow$ <em>Bị loại vì sinh 271 ca ảo giác và lẫn lộn ngày học.</em></li>
      <li><strong>A2 - Chatbot hội thoại chung:</strong> Chỉ trả lời text suông $\rightarrow$ <em>Bị loại vì học viên không tin nếu thiếu slide vật lý.</em></li>
      <li><strong>A3 - Hub & Spoke Router (CHỌN):</strong> Tách biệt Hub điều phối và Spoke chuyên gia $\rightarrow$ <em>Rõ ranh giới, trích dẫn chính xác 100%.</em></li>
    </ul>
  </div>

  <div class="card card-info">
    <h2>🏛️ Kiến Trúc Tổng Quan 2 Tầng</h2>
    <ul>
      <li><strong>Tầng 1 - Hub Bot (Router Navigator):</strong> Dùng Tool Calling tra cứu <code>knowledge_index.json</code>, phân tích ý định, kiểm tra điều kiện tiên quyết (Prerequisites), sinh <strong>Deep-link</strong>.</li>
      <li><strong>Tầng 2 - Spoke Bots (Chuyên gia Bài học):</strong> Nạp riêng PDF Slide & Markdown Transcript từng Day, trả lời $\le 3$ câu kèm citation <code>[Day X - Slide Y]</code>.</li>
    </ul>
  </div>
</div>

---

# 🛡️ Trang 3: 4 Lớp Chỗ Khó (Taxonomy) & Giải Pháp UX

<div class="grid-2">
  <div class="card">
    <h2>1. D1 · Định Tuyến Sai Ngã Rẽ</h2>
    <p><strong>Thách thức:</strong> Học viên dùng thuật ngữ lóng, câu hỏi mập mờ.</p>
    <p><strong>Giải pháp UX:</strong> Chuẩn hóa Concept Index Key + Deep-link trỏ thẳng vào URL bài học (<code>/lesson/1?slide=9</code>) và tự động lật đúng slide.</p>
  </div>

  <div class="card">
    <h2>2. D2 · Học Viên Học Vượt Cấp</h2>
    <p><strong>Thách thức:</strong> Chưa xong Day 1 đã hỏi Agentic RAG Day 3–4.</p>
    <p><strong>Giải pháp UX:</strong> Cảnh báo sư phạm mềm (Graceful Guidance), giải thích logic phụ thuộc và điều hướng hoàn thành bài học trước.</p>
  </div>
</div>

<div class="grid-2" style="margin-top: 12px;">
  <div class="card">
    <h2>3. D3/D5 · Ảo Giác & Thiếu Căn Cứ</h2>
    <p><strong>Thách thức:</strong> LLM bịa số liệu khi slide không nhắc đến.</p>
    <p><strong>Giải pháp UX:</strong> Bộ đọc <strong>Mozilla PDF.js Canvas</strong> hiển thị slide thật + Tab Transcript Markdown cho phép bôi đen copy code thật.</p>
  </div>

  <div class="card">
    <h2>4. D4 · Hỏi Ngoài Luồng & Chệch Hướng</h2>
    <p><strong>Thách thức:</strong> Bẫy triết học ("ý nghĩa cuộc sống") hoặc lịch sử AI.</p>
    <p><strong>Giải pháp UX:</strong> <strong>Micro-answer 1-2 câu</strong> giải đáp tò mò + <strong>Cầu nối sư phạm</strong> kiên quyết kéo học viên về slide bài học liên quan.</p>
  </div>
</div>

---

# 📊 Trang 4: Đo Lường Thực Tế Đối Chiếu Quality Bar (CP4)

<div class="card">
  Kiểm thử tự động trên <strong>20 ca Golden Set hiểm hóc</strong> thông qua LLM-as-a-Judge (<code>eval/benchmark_runner.py</code>):
</div>

| Chiều Đánh Giá | Quality Bar Cam Kết (CP4) | Thực Tế Đạt Được | Đánh Giá Nghiệm Thu |
|---|:---:|:---:|:---|
| **D1: Routing Precision** (Đúng bài, đúng slide) | $\ge 90\%$ | <strong style="color: #16a34a;">100%</strong> (5/5) | 🟢 Xuất sắc · Điều hướng chuẩn xác tuyệt đối |
| **D2: Prerequisite Accuracy** (Cảnh báo vượt cấp) | $100\%$ | <strong style="color: #16a34a;">100%</strong> (5/5) | 🟢 Xuất sắc · Chặn đứng mọi ca nhảy cóc kiến thức |
| **D3: Zero-Hallucination Rate** (Không bịa đặt) | $\ge 95\%$ | <strong style="color: #16a34a;">100%</strong> (5/5) | 🟢 Xuất sắc · 100% câu trả lời có căn cứ slide |
| **D4: Out-of-scope Handling** (Xử lý ngoài luồng) | $\ge 80\%$ | <strong style="color: #d97706;">80.0%</strong> (4/5) | 🟡 Đạt chuẩn · Từ chối an toàn bẫy injection |
| **TỔNG THỂ (Overall Pass Rate)** | $\ge 85\%$ | <strong style="color: #0284c7;">95.0% (19/20)</strong> | 🏆 **VƯỢT QUALITY BAR CAM KẾT** |

<div class="card card-info" style="margin-top: 10px;">
  <strong>🔍 Phân tích ca thất bại đáng kể nhất (D35_BOT_05):</strong> Học viên ép sinh 5 ý + công thức + mindmap làm bot vượt ngưỡng token $\rightarrow$ <em>Xử lý: Khóa cứng <code>max_tokens: 260-320</code> và áp dụng cơ chế Progressive Disclosure (chỉ đào sâu khi người học hỏi tiếp).</em>
</div>

---

# 🔄 Trang 5: Phản Hồi Người Dùng Thực Tế (R6 Validation)

<div class="card">
  Thực hiện <strong>Mom Test trên 5 người dùng ngoài nhóm</strong> tại phòng E403 (gồm 2 willing users đăng ký từ CP1):
</div>

<div class="grid-3" style="margin-top: 10px;">
  <div class="card">
    <span class="badge">Ca 1 · Học viên P.T.Anh</span>
    <p><em>"Ủa slide này là hình chụp à? Sao tớ không bôi đen copy được text code mẫu để chạy thử?"</em></p>
    <p><strong>$\rightarrow$ Quyết định (§9):</strong> Bổ sung ngay <strong>Tab Transcript Markdown</strong> đồng bộ song song với Slide PDF.</p>
  </div>

  <div class="card">
    <span class="badge">Ca 2 · N.V.Bình (Willing User)</span>
    <p><em>"Bấm nhảy sang slide xong tớ lỡ tay lăn chuột một cái là trôi mất tiêu trang cần đọc!"</em></p>
    <p><strong>$\rightarrow$ Quyết định (§9):</strong> Chuyển sang <strong>Bộ đọc PDF.js Canvas Theo trang</strong> độc lập, triệt tiêu lỗi chườm lề.</p>
  </div>

  <div class="card">
    <span class="badge">Ca 3 · Học viên T.H.Minh</span>
    <p><em>"Khung chat AI choán hết nửa màn hình, che mất chữ và biểu đồ trong slide bài học."</em></p>
    <p><strong>$\rightarrow$ Quyết định (§9):</strong> Xây dựng <strong>Resizable Side Panel</strong> (300px–800px) và nút bật/tắt AI trên Navbar.</p>
  </div>
</div>

<div class="card card-success" style="margin-top: 10px;">
  <strong style="color: #166534;">💡 Bài học đắt giá:</strong> "Một ràng buộc giao diện vật lý (Physical UI Constraints) hiệu quả gấp 10 lần việc nhồi nhét prompt nhắc nhở mô hình."
</div>

---

# 🌟 Trang 6: Kế Hoạch Mở Rộng & Đội Ngũ Thực Hiện

<div class="grid-2">
  <div class="card">
    <h2>🚀 Nếu Có Thêm 1 Tuần (3 Việc Trọng Tâm)</h2>
    <ul>
      <li><strong>1. Đồng bộ đám mây (Cloud Progress):</strong> Kết nối SSO VinUni LMS lưu chính xác vị trí slide đang học dở theo tài khoản cá nhân.</li>
      <li><strong>2. Auto-Index Pipeline Gen 2:</strong> Admin chỉ cần thả file PDF/Video, AI tự động phân đoạn và sinh Knowledge Index đa phương thức.</li>
      <li><strong>3. Voice Query Hỗ Trợ Lab:</strong> Nhận diện giọng nói để học viên hỏi đáp khi hai tay đang bận gõ code trên notebook.</li>
    </ul>
  </div>

  <div class="card card-info">
    <h2>👥 Đóng Góp Của Từng Thành Viên (Nhóm SHUP)</h2>
    <ul>
      <li><strong>Nguyễn Khánh Sơn (Product Lead):</strong> Chốt bài toán JTBD, kiến trúc Fullstack Next.js, API Routing đa tác tử, quản trị chất lượng.</li>
      <li><strong>Bùi Thị Thu Uyên (Data & Research):</strong> Khai phá 13.494 log, đo đếm 4 loại lỗi, thực hiện Mom Test 5 người dùng (R6).</li>
      <li><strong>Lê Châu Trần Phát (AI & Evaluation):</strong> Thiết kế System Prompt đa tầng, xây dựng Benchmark 20 ca Golden Set LLM-as-a-Judge.</li>
      <li><strong>Ngô Xuân Hoàng (Frontend UI/UX):</strong> Xây dựng PDF.js Canvas, Resizable Panel, Tab Transcript Markdown, kiểm thử trải nghiệm.</li>
    </ul>
  </div>
</div>

<div class="card" style="margin-top: 10px; text-align: center;">
  <strong style="color: #0284c7;">VLearn Hub & Spoke — Nền tảng Gia sư Thích ứng Thông minh · Nhóm SHUP · Phòng E403</strong>
</div>
