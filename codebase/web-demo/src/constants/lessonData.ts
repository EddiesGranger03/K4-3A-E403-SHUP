export const DAY_METADATA: Record<string, { totalSlides: number; title: string }> = {
  "1": { totalSlides: 29, title: "Day 1: AI & Product Thinking" },
  "2": { totalSlides: 29, title: "Day 2: Problem Hunt & Agentic Workflow" },
  "4": { totalSlides: 30, title: "Day 4: RAG & Vector Databases" }
};

export type SidebarItem = {
  id: string;
  type: "slide" | "lab" | "reading";
  title: string;
  short?: string;
  about?: string;
  content?: string;
};

export const LESSON_CONTENT: Record<string, SidebarItem[]> = {
  "1": [
    { id: "d1-s1", type: "slide", title: "Slide Bài giảng: AI & Product Thinking" },
    { id: "d1-r1", type: "reading", title: "Tài liệu đọc: AI vs Machine Learning vs Deep Learning" },
    { 
      id: "d1-l1", 
      type: "lab", 
      title: "Lab 1: Tư duy Giải quyết Vấn đề với AI",
      short: "Khai thác bài toán thực tế",
      about: "Phân biệt giữa Hype và Giá trị thực, thực hành thiết kế luồng quy trình làm việc có tích hợp AI.",
      content: "## Bài thực hành Ngày 1\n\nNhiệm vụ của bạn là xác định 1 quy trình làm việc (workflow) hằng ngày và trả lời câu hỏi: AI có thể tối ưu khâu nào nhất?\n\n**Các bước:**\n1. Xác định quy trình (VD: Duyệt hồ sơ CV).\n2. Điểm nghẽn (Bottleneck) nằm ở đâu?\n3. AI sẽ thay thế hoàn toàn (Agent) hay chỉ hỗ trợ (Copilot)?"
    }
  ],
  "2": [
    { id: "d2-s1", type: "slide", title: "Slide Bài giảng: Problem Hunt & Agentic Workflow" },
    { id: "d2-s2", type: "slide", title: "Slide Case Study: Hành trình từ Ý tưởng đến AI Product" },
    {
      id: "d2-l1",
      type: "lab",
      short: '"Sổ tay từ điển" bỏ túi cho người mới',
      title: 'Lab 2: Problem Hunt & AI Fit',
      about: "Đi từ vấn đề thật quanh mình đến một Problem Statement đủ chất, biết chọn đúng mức giải pháp (No AI / Rule / Workflow / Agent) và ra quyết định Go / Not Yet / No-Go có căn cứ.",
      content: `## Bài thực hành Ngày 2 - Tìm Đúng Bài Toán Cho AI

Chào mừng bạn quay lại! Nếu Ngày 1 là lúc bạn tập **bắt lỗi** cách AI nhìn thế giới, thì Ngày 2 là lúc bạn tập **tìm đúng bài toán** trước khi nghĩ tới AI.

Đây là buổi thực hành **4 tiếng, vừa làm cá nhân vừa làm nhóm**. Không có dòng lệnh, không cần cài đặt gì - công cụ chính của bạn hôm nay là quan sát, đặt câu hỏi, vẽ workflow và tranh luận có căn cứ với nhóm.

**Mục tiêu lớn nhất:** Đóng vai một Product Thinker, đi từ một vấn đề thật quanh mình đến một Problem Statement đủ chất, rồi tự quyết định có nên dùng AI hay không - và nếu có thì dùng ở mức nào.

\`\`\`
[Vấn đề thật quanh mình]
       |
[Scan cá nhân bằng 4 lăng kính] ----(Problem Card: actor, workflow, bottleneck)----> Chọn top 3!
       |
[Hội tụ cùng nhóm] ----------------(Cluster -> Shortlist -> Score -> chọn 1 candidate)
       |
[Kiểm chứng + Research] -----------(Interview/khảo sát nhanh + so sánh giải pháp đã có)
       |
[Problem Statement] + [AI Decision Matrix]
\`\`\``
    },
    {
      id: "d2-l2",
      type: "lab",
      short: "Phần 1: Chuẩn bị bàn làm việc",
      title: "Lab 2 - Phần 1: Chuẩn bị bàn làm việc (20 phút)",
      about: "Thiết lập môi trường làm việc cá nhân trước khi bắt đầu scan vấn đề.",
      content: `## Phần 1: Chuẩn bị bàn làm việc

**Thời gian:** 20 phút cá nhân

**Công việc:**
- Mở Notion hoặc bất kỳ công cụ ghi chú nào bạn thích
- Tạo một trang mới với tiêu đề: **Problem Hunt - Ngày 2**
- Chuẩn bị 4 cột tương ứng 4 lăng kính scan

**4 Lăng kính scan vấn đề:**
1. **Actor** - Ai đang gặp vấn đề này?
2. **Workflow** - Họ đang làm gì? Quy trình ra sao?
3. **Bottleneck** - Điểm nghẽn là ở đâu?
4. **AI Fit** - Phần nào có thể AI hỗ trợ?`
    }
  ]
};
