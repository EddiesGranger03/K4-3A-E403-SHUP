/**
 * VLearn Hub & Spoke AI Tutor - Client Engine
 * Batch 04 · VinUni AI Thực Chiến 2026
 * Grounded on vlearn-pack data (13,494 chatlog turns, transcripts, 29-page slide decks)
 */

// Global Course Knowledge Base (Embedded for 100% offline & demo reliability)
const COURSE_KNOWLEDGE = {
  days: {
    1: {
      title: "DAY 1: AI & LLM Foundation — Cách LLM hoạt động",
      slidesTotal: 29,
      slideFile: "d1-slide-hackathon.pdf",
      transcriptFile: "transcript-04-clean.md",
      slides: [
        { 
          page: 4, 
          title: "Ba nhóm AI chính: Phân loại, Sinh nội dung, Hành động", 
          content: "Discriminative AI (phân loại/dự đoán), Generative AI (sinh nội dung: ảnh, text, code), Agentic AI (nhận mục tiêu rồi tự lập kế hoạch và hành động). LLM là engine chung.", 
          tag: "Khái niệm nền tảng" 
        },
        { 
          page: 8, 
          title: "2017: Transformer — Bước ngoặt hiểu ngôn ngữ linh hoạt", 
          content: "Cơ chế Transformer cho mô hình hiểu ngôn ngữ linh hoạt hơn: mỗi từ có thể nhìn sang những từ quan trọng khác trong câu thay vì đi tuần tự.", 
          tag: "Kiến trúc nền móng" 
        },
        { 
          page: 13, 
          title: "Token: Model đọc mảnh chữ & Chi phí token", 
          content: "Model không đọc từ nguyên vẹn mà cắt thành mảnh nhỏ gọi là token. Tiếng Việt, code, JSON tốn token hơn tiếng Anh. Mọi thứ model làm đều quy ra token và mỗi token đều có giá.", 
          tag: "Cơ chế vận hành" 
        },
        { 
          page: 14, 
          title: "Context: Bàn làm việc có hạn & Hiện tượng Lost in the Middle", 
          content: "Mỗi lần trả lời model chỉ nhìn được lượng chữ có hạn (context). Đặt thông tin quan trọng ở giữa một prompt dài thì model rất dễ bỏ sót ('Lost in the Middle').", 
          tag: "Giới hạn mô hình" 
        },
        { 
          page: 15, 
          title: "Attention: Tự chú ý và khóa nghĩa ngữ cảnh", 
          content: "Cơ chế Attention cho phép mỗi token chủ động quay đầu nhìn lại các token trước trong câu, chấm điểm mức độ liên quan để khóa nghĩa theo ngữ cảnh.", 
          tag: "Cơ chế Attention" 
        },
        { 
          page: 18, 
          title: "Quy trình tạo ra LLM: 4 Bước huấn luyện", 
          content: "① Pre-training (đọc cả thư viện hàng nghìn tỷ token), ② SFT (học theo ví dụ mẫu), ③ RLHF/DPO (uốn nắn theo phản hồi con người), ④ Luyện suy luận (Reasoning training với verifiable rewards).", 
          tag: "Quy trình huấn luyện" 
        },
        { 
          page: 19, 
          title: "RLHF: Uốn cỗ máy đoán token thành trợ lý biết nghe lời", 
          content: "Sử dụng Reward Model để chấm điểm các câu trả lời do model sinh ra theo đánh giá của con người, giúp tạo ra trợ lý helpful, harmless, honest.", 
          tag: "Căn chỉnh RLHF" 
        },
        { 
          page: 22, 
          title: "Chain-of-Thought (CoT): Giấy nháp biến sai thành đúng", 
          content: "Cho model viết nháp suy luận từng bước ('hãy nghĩ từng bước') giúp giải quyết bài toán phức tạp và bộc lộ bản chất suy luận (Wei et al. 2022).", 
          tag: "Kỹ thuật CoT" 
        },
        { 
          page: 24, 
          title: "Giải phẫu một AI Agent: 5 Bộ phận trong vòng lặp", 
          content: "Agent = Goal (mục tiêu) + Reasoning (bộ não chia bước) + Tools (công cụ API/code/DB) + Memory (sổ tay ghi nhớ) + Action (hành động thực tế).", 
          tag: "Cấu trúc Agent" 
        },
        { 
          page: 26, 
          title: "Chọn model theo tầng: Frontier, Rẻ mà mạnh, Self-host", 
          content: "Tầng 1 (Frontier đóng cho việc khó nhất), Tầng 2 (Rẻ mà mạnh cho 80% việc hàng ngày - mặc định thử trước), Tầng 3 (Self-host cho dữ liệu nhạy cảm/quy mô lớn).", 
          tag: "Chiến lược chọn model" 
        },
        { 
          page: 28, 
          title: "Giải phẫu một Prompt: 4 Lớp xếp chồng", 
          content: "Lớp 1: System instruction (lời dặn đầu ca), Lớp 2: User input (yêu cầu người dùng), Lớp 3: Context bổ sung (tài liệu/lịch sử), Lớp 4: Output mong muốn (định dạng trả về).", 
          tag: "Cấu trúc Prompt" 
        },
        { 
          page: 29, 
          title: "Hai núm vặn chọn từ: Temperature & Top_p", 
          content: "Temperature là núm vặn độ liều/sáng tạo (T=0 cho ổn định code/phân tích; T>0 cho phong phú). Top_p giới hạn chỉ chọn trong nhóm từ có xác suất cộng dồn >= p (thường p=0.9).", 
          tag: "Tham số Temperature" 
        }
      ]
    },
    2: {
      title: "DAY 2: Xác định bài toán kinh doanh cho AI & Mức tự động hóa",
      slidesTotal: 29,
      slideFile: "d2-slide-hackathon.pdf",
      transcriptFile: "transcript-01-clean.md, transcript-02-clean.md, transcript-03-clean.md",
      slides: [
        { 
          page: 3, 
          title: "Mô hình Double Diamond (Don Norman / Design Council)", 
          content: "Diamond 1: Tìm đúng vấn đề (Discover & Define). Diamond 2: Tìm đúng giải pháp (Develop & Deliver). Giải pháp xuất sắc cho sai vấn đề còn tệ hơn không có giải pháp.", 
          tag: "Tư duy thiết kế" 
        },
        { 
          page: 4, 
          title: "Diamond 1: Phân kỳ để thấu hiểu, Hội tụ để lựa chọn", 
          content: "Phân kỳ (Observation, User Interview, Survey, Diary Study) và Hội tụ (Affinity Mapping, 5 Whys, Impact-Effort Matrix, Problem Statement).", 
          tag: "Khám phá bài toán" 
        },
        { 
          page: 6, 
          title: "4 Lăng kính tìm bài toán AI (4 Lenses)", 
          content: "Tác vụ lặp lại (Repetitive), Tiêu tốn thời gian (Time-consuming), Lợi thế của AI (AI Advantage), Điểm đau người dùng (User Pain Points).", 
          tag: "Nhận diện bài toán" 
        },
        { 
          page: 7, 
          title: "4 Sai lầm thường gặp (Anti-patterns)", 
          content: "Solution-first (ưu tiên giải pháp trước bài toán), No evaluation (bỏ qua đánh giá), No baseline (mơ hồ hiện trạng), No boundary (mập mờ ranh giới HITL).", 
          tag: "Cảnh báo sai lầm" 
        },
        { 
          page: 8, 
          title: "Google PAIR Reframe câu hỏi: Hỏi bài toán trước, AI sau", 
          content: "Thay vì 'Can we use AI to...?', hãy đổi thành 'How might we solve...?' và 'Can AI solve this in a unique way?'. AI chỉ là một giải pháp trong nhiều giải pháp.", 
          tag: "PAIR Reframe" 
        },
        { 
          page: 9, 
          title: "Quick Problem Card: 6 Trường cốt lõi", 
          content: "Bài toán (1 câu), Đối tượng ảnh hưởng (Actor), Quy trình hiện tại (Workflow), Nút thắt & Tác động (Bottleneck + Impact), Chỉ số đo thành công, Định hướng giải pháp.", 
          tag: "Thẻ bài toán" 
        },
        { 
          page: 11, 
          title: "Định lượng hóa bài toán: Baseline, Target, Measurement", 
          content: "Baseline (hiện trạng hao phí bằng con số cụ thể), Target (ngưỡng kỳ vọng cải thiện), Measurement (chỉ số và phương pháp chứng minh hiệu quả).", 
          tag: "Định lượng bài toán" 
        },
        { 
          page: 13, 
          title: "Ba bước quyết định AI theo Google PAIR", 
          content: "Bước ①: Giao điểm nhu cầu x thế mạnh AI; Bước ②: Automate hay Augment?; Bước ③: Reward function & tiêu chí thành công.", 
          tag: "PAIR 3 Bước" 
        },
        { 
          page: 15, 
          title: "Khi nào AI KHÔNG tốt hơn (6 trường hợp PAIR)", 
          content: "Lỗi quá tốn kém (Cost of error cao), Cần tối ưu tốc độ & chi phí thấp, Cần duy trì tính dự đoán được, Thông tin tĩnh, Yêu cầu minh bạch tuyệt đối, Việc người dùng muốn tự làm.", 
          tag: "Khi nào không dùng AI" 
        },
        { 
          page: 17, 
          title: "Automation vs Augmentation (PAIR Bước 2)", 
          content: "Automate (AI làm thay việc tẻ nhạt, có đáp án đồng thuận); Augment (AI hỗ trợ con người khi stakes cao: tiền bạc, pháp lý, trách nhiệm cá nhân).", 
          tag: "Mức tự động hóa" 
        },
        { 
          page: 18, 
          title: "Ba mức giải pháp kỹ thuật: Rule / Workflow / Agent", 
          content: "Cấp độ 1: Rule/Script (logic if/else, cần đúng 100%); Cấp độ 2: LLM Feature/Workflow (đầu vào đa dạng, linh hoạt); Cấp độ 3: Agent (nhiều bước, tự quyết định).", 
          tag: "Cấp độ giải pháp" 
        },
        { 
          page: 20, 
          title: "Workflow Patterns cơ bản (Anthropic)", 
          content: "1. Prompt Chaining (chia chuỗi bước tuần tự có gate kiểm tra), 2. Routing (phân nhánh tối ưu model), 3. Parallelization (chạy song song lấy vote).", 
          tag: "Mô hình Workflow" 
        },
        { 
          page: 22, 
          title: "Reward Function: Hàm thưởng & Chi phí không đối xứng", 
          content: "False Positive (báo động giả - gợi ý sai) vs False Negative (bỏ sót). Chi phí FP và FN không đối xứng nhau, định hình trải nghiệm người dùng.", 
          tag: "Hàm thưởng Reward" 
        },
        { 
          page: 23, 
          title: "Precision ↔ Recall: Đánh đổi không tránh khỏi", 
          content: "Precision cao (ít gợi ý nhưng chắc đúng) vs Recall cao (bao trọn mọi trường hợp, không bỏ sót học viên). Test điểm cân bằng với người dùng thật.", 
          tag: "Đánh đổi Precision/Recall" 
        },
        { 
          page: 27, 
          title: "Problem Statement cho hệ thống AI: 9 Trường chuẩn mực", 
          content: "6 yếu tố bài toán (Actor, Workflow, Bottleneck, Impact, Metric, Boundary) + 3 yếu tố quyết định AI (Điểm can thiệp, Mức chọn Rule/Workflow/Agent, Rủi ro & HITL).", 
          tag: "Chuẩn Problem Statement" 
        },
        { 
          page: 28, 
          title: "Khung ra quyết định: Go / Not Yet / No-Go", 
          content: "Go (đủ điều kiện, bài toán rõ, kiểm soát rủi ro), Not Yet (có triển vọng, cần bổ sung dữ liệu/chuẩn hóa quy trình), No-Go (không phù hợp, AI không mang giá trị vượt trội).", 
          tag: "Khung quyết định" 
        },
        { 
          page: 29, 
          title: "Sáu nguyên tắc cốt lõi sau Day 02", 
          content: "Lượng hóa điểm đau, Quyết định trên số liệu, Đơn giản trước phức tạp, Mô hình hóa workflow trước khi tích hợp AI, Problem Statement thay brief mơ hồ, Đo reward function bằng trải nghiệm.", 
          tag: "6 Nguyên tắc cốt lõi" 
        }
      ]
    }
  }
};

// Application State
let currentDay = 2;
let currentPageNumber = 1;
let currentZoom = 100;
let isAiPanelOpen = true;

// PDF.js Engine Configuration & State
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';
}

let currentPdfDoc = null;
let currentPdfUrl = null;
let isRenderingPdf = false;
let pendingPageNumber = null;
let currentRenderTask = null;

// Course Configuration Mapping for Real PDF Slides (Grounded on Day 1 & Day 2)
const DAY_CONFIG = {
  1: {
    dayNum: 1,
    lessonBadge: "Bài 1 · Day 01",
    courseTitle: "Nền tảng GenAI & Kỹ thuật Prompt Engineering",
    slideFile: "slides/d1-slide-hackathon.pdf",
    totalPages: 29,
    labTitle: "Lab 01 – Nền tảng LLM API",
    botTitle: "Bot Con Day 1 (Nền tảng GenAI)",
    botSubStatus: "Ngữ cảnh cô lập: Slide Day 1 (29 trang)",
    welcomeMsg: `Chào bạn! Mình là <strong>Bot Con chuyên trách Day 1</strong>. Mình theo dõi trực tiếp file slide <code>d1-slide-hackathon.pdf</code> (29 trang) bên cạnh để giải đáp súc tích ≤ 3 câu có kèm trích dẫn số trang chính xác. Bạn đang cần làm rõ chỗ nào trên slide?`,
    pills: [
      { text: "Bốn lớp cấu trúc của một prompt chuẩn gồm những gì?", label: "📝 4 Lớp của Prompt (Trang 28)" },
      { text: "Hai núm vặn Temperature và Top_p khác biệt ra sao?", label: "🌡️ Temperature & Top_p (Trang 29)" },
      { text: "Cơ chế Attention và hiện tượng Lost in the Middle là gì?", label: "👁️ Attention & Context (Trang 14-15)" },
      { text: "Năm thành phần của một vòng lặp AI Agent?", label: "🤖 Giải phẫu Agent (Trang 24)" },
      { text: "Cho tôi đáp án câu 3 quiz: A, B, C hay D?", label: "🚫 Đố đáp án Quiz" }
    ],
    teacherNotes: "Ghi chú Buổi 1: Nắm vững 4 lớp cấu trúc của một prompt tại Slide 28 và sự khác biệt giữa hai núm vặn Temperature & Top_p tại Slide 29."
  },
  2: {
    dayNum: 2,
    lessonBadge: "Bài 2 · Day 02",
    courseTitle: "Xác định bài toán kinh doanh cho AI & Mức tự động hóa",
    slideFile: "slides/d2-slide-hackathon.pdf",
    totalPages: 29,
    labTitle: "Lab 02 – Prompt Chaining & CoT",
    botTitle: "Bot Con Day 2 (Bài toán AI & Prompt Nâng cao)",
    botSubStatus: "Ngữ cảnh cô lập: Slide Day 2 (29 trang)",
    welcomeMsg: `Chào bạn! Mình là <strong>Bot Con chuyên trách Day 2</strong>. Mình theo dõi trực tiếp file slide <code>d2-slide-hackathon.pdf</code> (29 trang) bên cạnh để giải đáp súc tích ≤ 3 câu có kèm trích dẫn số trang chính xác. Bạn đang cần làm rõ chỗ nào trên slide?`,
    pills: [
      { text: "Mô hình Double Diamond gồm những pha nào để tìm đúng bài toán?", label: "💎 Double Diamond (Trang 3)" },
      { text: "Khi nào nên chọn Automate thay vì Augment theo Google PAIR?", label: "⚖️ Automate vs Augment (Trang 17)" },
      { text: "Ba cấp độ giải pháp Rule, Workflow và Agent khác nhau thế nào?", label: "⚙️ Rule vs Workflow vs Agent (Trang 18)" },
      { text: "Mô hình Prompt Chaining và các workflow patterns hoạt động ra sao?", label: "🔗 Workflow Patterns (Trang 20)" },
      { text: "Khung ra quyết định Go, Not Yet hay No-Go dựa trên điều kiện gì?", label: "🚦 Go / Not Yet / No-Go (Trang 28)" },
      { text: "Cho tôi đáp án câu 5 quiz: A, B, C hay D?", label: "🚫 Đố đáp án Quiz" }
    ],
    teacherNotes: "Ghi chú Buổi 2: Xem kỹ mô hình Double Diamond tại Slide 3, mức độ tự động hóa tại Slide 17 và khung quyết định Go / Not Yet / No-Go tại Slide 28."
  }
};

// Backend Server Endpoints (Proxy API - API Key is kept strictly on backend in .env)
const BACKEND_BASE = window.location.protocol.startsWith('http') ? '' : 'http://localhost:3000';
const API_STATUS_ENDPOINT = `${BACKEND_BASE}/api/status`;
const API_CHAT_ENDPOINT = `${BACKEND_BASE}/api/chat`;

// DOM Elements
const viewHub = document.getElementById('viewHub');
const viewSpoke = document.getElementById('viewSpoke');
const tabHub = document.getElementById('tabHub');
const tabSpoke = document.getElementById('tabSpoke');
const hubChatViewport = document.getElementById('hubChatViewport');
const spokeChatViewport = document.getElementById('spokeChatViewport');
const hubQueryInput = document.getElementById('hubQueryInput');
const spokeQueryInput = document.getElementById('spokeQueryInput');

// Slide Knowledge Store (Extracted 100% directly from vlearn-pack .pptx / .pdf)
let SLIDES_FULL_KNOWLEDGE = null;

async function loadSlidesKnowledge() {
  try {
    const res = await fetch('slides_knowledge.json');
    if (res.ok) {
      SLIDES_FULL_KNOWLEDGE = await res.json();
      console.log('📚 [KNOWLEDGE GROUNDING]: Nạp thành công toàn bộ 58 slide bài giảng Day 1 & Day 2 từ slides_knowledge.json');
    }
  } catch (e) {
    console.warn('ℹ️ Chưa nạp được slides_knowledge.json, sử dụng COURSE_KNOWLEDGE cục bộ.');
  }
}

// Scope Detector for Hub & Spoke Isolation
function detectQueryScope(query) {
  const lower = query.toLowerCase().trim();

  // 1. High Priority: Out-of-scope signals (Concepts NOT in official Day 1 or Day 2 slide decks)
  const outOfScopePatterns = [
    { pattern: /\brag\b/i, name: 'RAG (Retrieval-Augmented Generation)' },
    { pattern: /retrieval[\s-]augmented/i, name: 'Retrieval-Augmented Generation' },
    { pattern: /vector\s*(?:db|database|kho|cơ sở dữ liệu)/i, name: 'Vector Database' },
    { pattern: /\bembedding(?:s)?\b/i, name: 'Embeddings' },
    { pattern: /cosine\s*similarity/i, name: 'Cosine Similarity' },
    { pattern: /\bchunking\b/i, name: 'Chunking' },
    { pattern: /\breact\b(?:\s+framework|\s+agent|\s+pattern)?/i, name: 'ReAct (Reasoning + Acting)' },
    { pattern: /reasoning\s*\+\s*acting/i, name: 'Reasoning + Acting' },
    { pattern: /\bagentic\b/i, name: 'Agentic AI' },
    { pattern: /tool\s*calling/i, name: 'Tool Calling' },
    { pattern: /function\s*calling/i, name: 'Function Calling' },
    { pattern: /\bfine[- ]?tuning\b/i, name: 'Fine-tuning' },
    { pattern: /\blangchain\b/i, name: 'LangChain' },
    { pattern: /\bllamaindex\b/i, name: 'LlamaIndex' },
    { pattern: /\bchromadb\b/i, name: 'ChromaDB' },
    { pattern: /\bpinecone\b/i, name: 'Pinecone' },
    { pattern: /\bqdrant\b/i, name: 'Qdrant' },
    { pattern: /\bmilvus\b/i, name: 'Milvus' },
    { pattern: /\bday\s*(?:0?[3-9]|[1-9]\d+)\b/i, name: 'Day 3+' },
    { pattern: /\bbuổi\s*(?:0?[3-9]|[1-9]\d+)\b/i, name: 'Buổi 3+' }
  ];
  for (const item of outOfScopePatterns) {
    if (item.pattern.test(lower)) {
      return { day: 'out_of_scope', topic: item.name };
    }
  }

  // 2. Day 1 signals (Grounded in Day 1 Slide Deck: 29 pages)
  const d1Keywords = [
    'temperature', 'nhiệt độ', 'top_p', 'top-p', 'núm vặn', 'token', 'dự đoán token', 
    'next-token', 'context', 'lost in the middle', 'bàn làm việc', 'attention', 'transformer', 
    'tự chú ý', 'rlhf', 'reward model', 'sft', 'pre-training', 'chain of thought', 'cot', 'giấy nháp', 
    'giải phẫu agent', 'vòng lặp agent', '5 bộ phận', 'bộ não suy luận', 'chọn model theo tầng', 
    'frontier', '4 lớp của prompt', 'bốn lớp', 'lớp của prompt', 'system instruction', 'lời dặn đầu ca', 
    'discriminative', 'generative ai', 'ba nhóm ai', 'nền tảng genai', 'turing', 'hax', 'day 1', 'day 01', 'buổi 1'
  ];
  for (const kw of d1Keywords) {
    if (lower.includes(kw)) return { day: 1, topic: kw };
  }

  // 3. Day 2 signals (Grounded in Day 2 Slide Deck: 29 pages)
  const d2Keywords = [
    'double diamond', 'don norman', 'tìm đúng vấn đề', 'tìm đúng giải pháp', '4 lenses', 
    'lăng kính', 'anti-pattern', 'anti patterns', 'sai lầm', 'solution-first', 'pair', 
    'reframe', 'how might we', 'can ai solve', 'problem card', 'quick problem card', 
    'định lượng', 'baseline', 'target', 'measurement', 'khi nào ai không tốt', 
    'không nên dùng ai', 'lỗi quá tốn kém', 'cost of error', 'chi phí sai sót', 'automate', 'augment', 
    'tự động hóa', 'tự động hoá', 'rule', 'workflow', 'quy trình', '3 cấp độ', '3 mức giải pháp', 
    'prompt chaining', 'routing', 'parallelization', 'workflow patterns', 'reward function', 
    'hàm thưởng', 'false positive', 'false negative', 'fp', 'fn', 'precision', 'recall', 
    'problem statement', '9 trường', 'khung quyết định', 'go', 'not yet', 'no-go', 'day 2', 'day 02', 'buổi 2'
  ];
  for (const kw of d2Keywords) {
    if (lower.includes(kw)) return { day: 2, topic: kw };
  }

  // Exact word match for agent in Day 2
  if (/\bagent\b/i.test(lower)) {
    return { day: 2, topic: 'agent' };
  }

  return { day: null, topic: null };
}

// Conversation History & Memory for Hub Bot & Spoke Bot
const hubChatHistory = [];
let lastHubContext = {
  day: null,
  page: null,
  topic: null
};

const spokeChatHistory = {
  1: [],
  2: []
};
let lastReferencedSlide = {
  1: 1,
  2: 1
};

// ==========================================================================
// IMPROVEMENT #8: Visited Slides Tracking
// ==========================================================================
const visitedSlides = { 1: new Set(), 2: new Set() };

function markSlideVisited(dayId, pageNum) {
  visitedSlides[dayId] = visitedSlides[dayId] || new Set();
  visitedSlides[dayId].add(pageNum);
  updateSidebarVisitedBadge(dayId);
  saveSessionState();
}

function updateSidebarVisitedBadge(dayId) {
  const count = visitedSlides[dayId] ? visitedSlides[dayId].size : 0;
  const badge = document.getElementById(`visitedBadgeDay${dayId}`);
  const countEl = document.getElementById(`visitedCountDay${dayId}`);
  if (!badge || !countEl) return;
  if (count > 0) {
    badge.style.display = 'inline-flex';
    countEl.textContent = count;
  } else {
    badge.style.display = 'none';
  }
}

// ==========================================================================
// IMPROVEMENT #6: Session Storage - Persist chat history across F5
// ==========================================================================
function saveSessionState() {
  try {
    sessionStorage.setItem('vlearn_hub_history', JSON.stringify(hubChatHistory.slice(-16)));
    sessionStorage.setItem('vlearn_spoke1_history', JSON.stringify(spokeChatHistory[1].slice(-12)));
    sessionStorage.setItem('vlearn_spoke2_history', JSON.stringify(spokeChatHistory[2].slice(-12)));
    sessionStorage.setItem('vlearn_hub_context', JSON.stringify(lastHubContext));
    sessionStorage.setItem('vlearn_visited_1', JSON.stringify([...visitedSlides[1]]));
    sessionStorage.setItem('vlearn_visited_2', JSON.stringify([...visitedSlides[2]]));
  } catch (e) { /* sessionStorage may be blocked in some contexts */ }
}

function restoreSessionState() {
  try {
    const hubH = sessionStorage.getItem('vlearn_hub_history');
    const sp1H = sessionStorage.getItem('vlearn_spoke1_history');
    const sp2H = sessionStorage.getItem('vlearn_spoke2_history');
    const hubCtx = sessionStorage.getItem('vlearn_hub_context');
    const vis1 = sessionStorage.getItem('vlearn_visited_1');
    const vis2 = sessionStorage.getItem('vlearn_visited_2');

    if (hubH) { const parsed = JSON.parse(hubH); parsed.forEach(m => hubChatHistory.push(m)); }
    if (sp1H) { spokeChatHistory[1] = JSON.parse(sp1H); }
    if (sp2H) { spokeChatHistory[2] = JSON.parse(sp2H); }
    if (hubCtx) { Object.assign(lastHubContext, JSON.parse(hubCtx)); }
    if (vis1) { JSON.parse(vis1).forEach(p => visitedSlides[1].add(p)); }
    if (vis2) { JSON.parse(vis2).forEach(p => visitedSlides[2].add(p)); }

    // Update visited badges after restore
    updateSidebarVisitedBadge(1);
    updateSidebarVisitedBadge(2);

    // If there was an active session, restore memory badge hint
    if (hubChatHistory.length > 0) {
      const badge = document.getElementById('hubMemoryIndicator');
      if (badge) badge.title = `${hubChatHistory.length / 2} câu hỏi được khôi phục từ phiên trước`;
    }
  } catch (e) { /* ignore restore errors */ }
}

// Seamless Navigation helper for all clickable slide links (Hub & Spoke)
function handleSlideCitationClick(dayId, pageNum) {
  dayId = parseInt(dayId, 10) || currentDay || 2;
  pageNum = parseInt(pageNum, 10) || 1;
  switchView('spoke', dayId, pageNum);
}

// Check if query is a follow-up, clarification, or continuation
function isFollowUpQuery(query) {
  const lower = query.toLowerCase().trim();
  const followUpPhrases = [
    // Làm rõ, giải thích, ví dụ
    'dễ hiểu hơn', 'nói dễ hiểu', 'giải thích dễ hiểu', 'giải thích thêm',
    'giải thích lại', 'giải thích kỹ', 'nói rõ hơn', 'làm rõ', 'rõ hơn', 
    'cho ví dụ', 'ví dụ cụ thể', 'ví dụ minh họa', 'ví dụ là gì', 'thêm ví dụ',
    'tại sao', 'vì sao', 'sao lại thế', 'tiếp tục', 'nói tiếp', 'tiếp đi', 'còn gì nữa', 
    'ý là sao', 'nghĩa là gì', 'tức là sao', 'tóm lại', 'tóm tắt', 'áp dụng thế nào', 
    'chưa hiểu', 'chưa rõ', 'cụ thể hơn', 'chi tiết hơn', 'nói sâu hơn', 'hiểu sâu hơn',
    'nói lại', 'ví dụ?', 'tại sao?', 'vì sao?',
    // So sánh & liên hệ lượt trước
    'so sánh', 'khác nhau thế nào', 'khác biệt thế nào', 'phân biệt', 'cái nào hơn',
    'cái nào tốt hơn', 'chọn cái nào', 'khi nào dùng', 'ưu nhược điểm',
    'vừa nói', 'vừa nhắc', 'ở trên', 'vừa nãy', 'trước đó', 'câu trước', 'như đã nói',
    // Chỉ định vị trí slide
    'ở slide nào', 'slide mấy', 'trang mấy', 'ở đâu', 'xem ở đâu', 'tài liệu nào', 'chỗ nào',
    // Chỉ định bộ phận/thứ bậc bài học
    'lớp 1', 'lớp 2', 'lớp 3', 'lớp 4', 'layer 1', 'layer 2', 'layer 3', 'layer 4',
    'mức 1', 'mức 2', 'mức 3', 'cấp 1', 'cấp 2', 'cấp 3', 'level 1', 'level 2', 'level 3',
    'diamond 1', 'diamond 2', 'pha 1', 'pha 2',
    'bước 1', 'bước 2', 'bước 3', 'bước 4',
    'lăng kính 1', 'lăng kính 2', 'lăng kính 3', 'lăng kính 4',
    'nó là gì', 'nó có tác dụng gì', 'dùng để làm gì', 'còn gì nữa không'
  ];
  for (const phrase of followUpPhrases) {
    if (lower.includes(phrase)) return true;
  }

  // Brief question without specific standalone course topic keywords
  const tokens = lower.replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(t => t.length > 1);
  if (tokens.length <= 4) {
    const hasCoreTopic = tokens.some(t => [
      'diamond', 'automate', 'augment', 'rule', 'workflow', 'agent', 
      'temperature', 'top_p', 'token', 'attention', 'cot', 'prompt', 
      'chaining', 'routing', 'parallelization', 'reward', 'precision', 
      'recall', 'baseline', 'metric', 'actor', 'bottleneck', 'hitl', 'pair'
    ].includes(t));
    if (!hasCoreTopic) return true;
  }
  return false;
}

// Dynamic Slide Page Search Engine (Content-based Scoring across all slides of a Day)
function findBestMatchingSlidePage(dayId, query) {
  if (!SLIDES_FULL_KNOWLEDGE || !SLIDES_FULL_KNOWLEDGE['day_' + dayId]) {
    return null;
  }
  const slides = SLIDES_FULL_KNOWLEDGE['day_' + dayId].slides;
  if (!slides || slides.length === 0) return null;

  const stopWords = new Set([
    'và', 'là', 'gì', 'của', 'ở', 'nào', 'trong', 'thế', 'làm', 'cho', 
    'với', 'được', 'các', 'những', 'một', 'này', 'đó', 'có', 'bạn', 'tôi', 
    'hãy', 'giúp', 'cho', 'biết', 'slide', 'trang', 'bài', 'học',
    'thể', 'nói', 'dễ', 'hiểu', 'hơn', 'không', 'giải', 'thích', 'kia',
    'lại', 'ơi', 'à', 'nhé', 'xem', 'hỏi', 'về', 'nữa', 'sao', 'vậy',
    'rồi', 'chưa', 'thêm', 'kỹ', 'muốn', 'sâu', 'rõ'
  ]);

  const tokens = query.toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !stopWords.has(t));

  if (tokens.length === 0) return null;

  let bestPage = null;
  let maxScore = 0;

  for (const slide of slides) {
    const slideLower = slide.text.toLowerCase();
    let score = 0;

    for (const token of tokens) {
      if (slideLower.includes(token)) {
        score += 1;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestPage = slide.page;
    }
  }

  // Require strong matching score (>= 3 for longer questions, >= 2 for short distinct questions)
  return (tokens.length >= 3 ? maxScore >= 3 : maxScore >= 2) ? bestPage : null;
}

// Convert textual citations like "[Trang 28 - Slide Day 2]" or "[Trang 28]" into directly clickable links
function linkifySlideCitations(escapedText, defaultDay = 2) {
  if (!escapedText) return '';
  // Pattern 1: [Trang X - Slide Day Y]
  let result = escapedText.replace(/\[Trang\s*(\d+)\s*-\s*(?:Slide\s*)?Day\s*(\d+)\]/gi, (match, page, day) => {
    return `<a href="javascript:void(0)" class="inline-slide-link" onclick="handleSlideCitationClick(${day}, ${page})" title="Bấm để mở ngay Slide Trang ${page} (Day ${day})">[📄 Trang ${page} - Slide Day ${day}]</a>`;
  });
  // Pattern 2: [Trang X]
  result = result.replace(/\[Trang\s*(\d+)\]/gi, (match, page) => {
    return `<a href="javascript:void(0)" class="inline-slide-link" onclick="handleSlideCitationClick(${defaultDay}, ${page})" title="Bấm để mở ngay Slide Trang ${page}">[📄 Trang ${page}]</a>`;
  });
  return result;
}

// Chuyển đổi phản hồi của AI thành HTML có format đẹp (in đậm, xuống dòng, liên kết slide)
function formatAiResponse(text, defaultDay = 1) {
  if (!text) return '';
  let escaped = escapeHtml(text);
  // Markdown bold **text**
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Markdown italic *text*
  escaped = escaped.replace(/(^|[^\*])\*([^\*]+)\*([^\*]|$)/g, '$1<em>$2</em>$3');
  // Inline code `code`
  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Linkify citations
  let linked = linkifySlideCitations(escaped, defaultDay);
  // Split into paragraphs
  const paragraphs = linked.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length > 1) {
    return paragraphs.map(p => `<p style="margin-bottom: 0.5rem;">${p.replace(/\n/g, '<br/>')}</p>`).join('');
  }
  return `<p>${linked.replace(/\n/g, '<br/>')}</p>`;
}

// Prominent, Clickable Slide Direct Link Banner for Bot Con & Hub
function renderSlideLinkCard(dayId, pageNum, engineName = 'VLearn Grounding') {
  const cfg = DAY_CONFIG[dayId];
  if (!cfg) return '';

  let slideTitle = `Nội dung Slide Trang ${pageNum}`;
  let slideTag = `Day 0${dayId}`;
  let rawText = '';

  // 1. Check structured knowledge
  const kDay = COURSE_KNOWLEDGE.days[dayId];
  if (kDay && kDay.slides) {
    const sFound = kDay.slides.find(s => s.page === pageNum);
    if (sFound) {
      if (sFound.title) slideTitle = sFound.title;
      if (sFound.tag) slideTag = sFound.tag;
    }
  }

  // 2. Extract actual raw text snippet from slides_knowledge.json
  if (SLIDES_FULL_KNOWLEDGE && SLIDES_FULL_KNOWLEDGE['day_' + dayId]) {
    const slides = SLIDES_FULL_KNOWLEDGE['day_' + dayId].slides;
    if (slides && slides[pageNum - 1]) {
      rawText = slides[pageNum - 1].text || '';
    }
  }

  // Clean snippet lines: remove header/footer noise
  let cleanedLines = [];
  if (rawText) {
    const rawLines = rawText.split('\n');
    for (let line of rawLines) {
      line = line.trim();
      if (!line) continue;
      if (line.includes('DAY 0') || line.includes('AI IN ACTION') || line.includes('NGUỒN') || line.match(/· \d+ \/ \d+/)) {
        continue;
      }
      cleanedLines.push(line);
    }
  }

  if (cleanedLines.length === 0) {
    cleanedLines = [getSlideGroundingText(dayId, pageNum)];
  }

  // Concise key highlights on the slide
  const previewSnippet = cleanedLines.slice(0, 3).join(' • ');

  return `
    <div class="slide-link-banner" onclick="handleSlideCitationClick(${dayId}, ${pageNum})" title="Nhấp để hiển thị Slide Trang ${pageNum}">
      <div class="link-banner-main">
        <div class="link-banner-header">
          <span class="link-banner-icon">🔗</span>
          <div class="link-banner-titles">
            <span class="link-main-title">Xem trực tiếp Slide Trang ${pageNum}: <strong>${escapeHtml(slideTitle)}</strong></span>
            <span class="link-sub-desc">📄 File <code>${escapeHtml(cfg.slideFile)}</code> (Day 0${dayId} · Trang ${pageNum}/${cfg.totalPages}) · Nhấp để mở và học cùng Bot Con</span>
          </div>
        </div>
        <div class="link-banner-actions">
          <button class="btn-jump-slide" onclick="event.stopPropagation(); handleSlideCitationClick(${dayId}, ${pageNum})" title="Nhấp để hiển thị Slide Trang ${pageNum}">
            👁️ Mở Slide Trang ${pageNum} →
          </button>
          <button class="btn-open-new-tab" onclick="event.stopPropagation(); window.open('${cfg.slideFile}#page=${pageNum}', '_blank')" title="Mở trang slide này trong tab mới">
            ↗ Tab mới
          </button>
        </div>
      </div>
      <div class="link-banner-quote">
        <span class="quote-label">📌 Điểm cốt lõi trên Slide Trang ${pageNum}:</span>
        <span class="quote-text">${escapeHtml(previewSnippet)}</span>
      </div>
    </div>
  `;
}

function getSlideGroundingText(dayId, pageNum) {
  if (SLIDES_FULL_KNOWLEDGE && SLIDES_FULL_KNOWLEDGE['day_' + dayId]) {
    const slides = SLIDES_FULL_KNOWLEDGE['day_' + dayId].slides;
    if (slides && slides[pageNum - 1]) {
      return slides[pageNum - 1].text;
    }
  }
  const kDay = COURSE_KNOWLEDGE.days[dayId];
  if (kDay && kDay.slides) {
    const found = kDay.slides.find(s => s.page === pageNum);
    if (found) return `${found.title}: ${found.content}`;
  }
  return `Nội dung slide Trang ${pageNum} thuộc tài liệu bài học Day ${dayId}.`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSlidesKnowledge();
  initSpokePanelResizer();

  // #6: Restore session state (chat history, visited slides)
  restoreSessionState();

  // On mobile screen, default AI Tutor panel to closed so slide is immediately visible
  if (window.innerWidth <= 900) {
    const panel = document.getElementById('aiTutorPanel');
    const btn = document.getElementById('toggleAiPanelBtn');
    const text = document.getElementById('aiToggleText');
    if (panel) panel.classList.add('collapsed');
    if (btn) btn.classList.remove('active');
    if (text) text.innerText = '✦ Mở AI Tutor';
    isAiPanelOpen = false;
  }

  selectDay(2, 1);
  checkBackendStatus();

  // #10: Global Keyboard Shortcuts
  document.addEventListener('keydown', handleGlobalKeyDown);
});

// #10: Keyboard shortcut handler
let kbToastTimer = null;
function handleGlobalKeyDown(e) {
  const tag = document.activeElement?.tagName?.toLowerCase();
  const isInInput = tag === 'input' || tag === 'textarea';

  // Alt+1 → Switch to Day 1
  if (e.altKey && e.key === '1' && !isInInput) {
    e.preventDefault();
    switchView('spoke', 1);
    showKbToast('Alt+1', 'Chuyển sang Day 1');
    return;
  }

  // Alt+2 → Switch to Day 2
  if (e.altKey && e.key === '2' && !isInInput) {
    e.preventDefault();
    switchView('spoke', 2);
    showKbToast('Alt+2', 'Chuyển sang Day 2');
    return;
  }

  // Alt+H → Go to Hub
  if (e.altKey && (e.key === 'h' || e.key === 'H') && !isInInput) {
    e.preventDefault();
    switchView('hub');
    showKbToast('Alt+H', 'Mở Bot Hỗ Trợ');
    return;
  }

  // Esc → Close AI panel (if in Spoke view)
  if (e.key === 'Escape' && !isInInput) {
    const spoke = document.getElementById('viewSpoke');
    if (spoke && spoke.classList.contains('active-view')) {
      const panel = document.getElementById('aiTutorPanel');
      if (panel && !panel.classList.contains('collapsed')) {
        toggleAiPanel();
        showKbToast('Esc', 'Thu gọn AI Tutor');
      }
    }
    // Also close summary modal if open
    const modal = document.getElementById('summaryModalOverlay');
    if (modal && modal.classList.contains('visible')) {
      closeSummaryModal();
    }
  }
}

function showKbToast(key, label) {
  const toast = document.getElementById('kbToast');
  if (!toast) return;
  toast.innerHTML = `<span class="kb-key">${key}</span><span>${label}</span>`;
  toast.classList.add('show');
  clearTimeout(kbToastTimer);
  kbToastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}


// View Navigation (Hub vs Spoke)
function switchView(viewName, dayId = 2, page = 1) {
  if (viewName === 'hub') {
    viewHub.classList.add('active-view');
    viewSpoke.classList.remove('active-view');
    tabHub.classList.add('active');
    tabSpoke.classList.remove('active');
  } else {
    selectDay(dayId, page);
    viewHub.classList.remove('active-view');
    viewSpoke.classList.add('active-view');
    tabHub.classList.remove('active');
    tabSpoke.classList.add('active');
  }
}

// Select Day 1 or Day 2 in VLearn LMS Workspace
function selectDay(dayId, page = 1) {
  if (!DAY_CONFIG[dayId]) return;

  // #3: Day-switch context injection — notify Bot Con memory when Day changes
  const previousDay = currentDay;
  if (previousDay && previousDay !== dayId && spokeChatHistory[dayId]) {
    const switchNotice = `[Hệ thống: Học viên vừa chuyển từ Day ${previousDay} sang Day ${dayId}. Đây là một cuộc hội thoại mới trong phạm vi Day ${dayId}. Hãy bắt đầu từ nội dung Day ${dayId} và không tham chiếu nội dung Day ${previousDay} trừ khi được hỏi.]`;
    spokeChatHistory[dayId].push({ role: 'system', content: switchNotice });
    console.log(`🔄 [DAY SWITCH CONTEXT]: Day ${previousDay} → Day ${dayId} — context notice injected`);
  }

  currentDay = dayId;
  currentPageNumber = page;
  if (lastReferencedSlide) lastReferencedSlide[dayId] = page;
  const cfg = DAY_CONFIG[dayId];

  // #8: Mark first page as visited when selecting a day
  markSlideVisited(dayId, page);

  // 1. Update LMS Header Info
  const badgeEl = document.getElementById('lmsLessonBadge');
  const titleEl = document.getElementById('lmsCourseTitle');
  const progressText = document.getElementById('lmsProgressText');
  const progressFill = document.getElementById('lmsProgressFill');
  const labTitle = document.getElementById('sidebarLabTitle');

  if (badgeEl) badgeEl.innerText = cfg.lessonBadge;
  if (titleEl) titleEl.innerText = cfg.courseTitle;
  if (progressText) progressText.innerHTML = `Tiến độ: <strong>Bài ${dayId}/2</strong>`;
  if (progressFill) progressFill.style.width = `${Math.round((dayId / 2) * 100)}%`;
  if (labTitle) labTitle.innerText = cfg.labTitle;

  // 2. Update Sidebar Active state
  document.querySelectorAll('.slide-nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-status-tag').forEach(el => el.classList.remove('active'));
  
  const activeNav = document.getElementById(`navDay${dayId}`);
  const activeTag = document.getElementById(`tagDay${dayId}`);
  if (activeNav) activeNav.classList.add('active');
  if (activeTag) {
    activeTag.classList.add('active');
    activeTag.innerText = 'Đang học';
  }
  
  const otherDay = dayId === 1 ? 2 : 1;
  const otherTag = document.getElementById(`tagDay${otherDay}`);
  if (otherTag) otherTag.innerText = `Buổi ${otherDay}`;

  // On mobile screen, auto close sidebar drawer after selecting a day
  if (window.innerWidth <= 900) {
    const sidebar = document.getElementById('lmsSidebar');
    if (sidebar) sidebar.classList.remove('open-mobile');
  }

  // 3. Update Real PDF Canvas Stage (via Mozilla PDF.js Engine)
  loadAndRenderPdf(cfg.slideFile, page);

  // 4. Update Page Navigation Readout
  const pageInput = document.getElementById('currentPageInput');
  const totalDisplay = document.getElementById('totalPageDisplay');
  if (pageInput) {
    pageInput.value = page;
    pageInput.max = cfg.totalPages;
  }
  if (totalDisplay) totalDisplay.innerText = cfg.totalPages;

  // 5. Update Teacher Notes
  const notesEl = document.getElementById('teacherNotesText');
  if (notesEl) notesEl.innerHTML = cfg.teacherNotes;

  // 6. Update Bot Con Header & Info
  const botTitleEl = document.getElementById('spokeBotTitle');
  const subStatusEl = document.getElementById('spokeBotSubStatus');
  const welcomeSender = document.getElementById('spokeWelcomeSender');
  const welcomeMessage = document.getElementById('spokeWelcomeMessage');

  if (botTitleEl) botTitleEl.innerText = cfg.botTitle;
  if (subStatusEl) subStatusEl.innerHTML = `<span class="status-dot"></span> ${cfg.botSubStatus}`;
  if (welcomeSender) welcomeSender.innerText = `Bot Con Day ${dayId}`;
  if (welcomeMessage) welcomeMessage.innerHTML = cfg.welcomeMsg;

  // 7. Update Suggested Prompt Pills for Spoke
  renderSpokePills(cfg.pills);

  // 8. Update tab in main header
  if (tabSpoke) tabSpoke.innerHTML = `<span class="icon">📖</span> Bot Con (Day ${dayId})`;
}

// Render dynamic prompt pills for active Day
function renderSpokePills(pills) {
  const container = document.getElementById('spokePromptPills');
  if (!container) return;
  container.innerHTML = '';

  pills.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'pill';
    btn.style.fontSize = '0.75rem';
    btn.style.padding = '0.3rem 0.6rem';
    btn.innerText = p.label;
    btn.onclick = () => {
      spokeQueryInput.value = p.text;
      submitSpokeQuery();
    };
    container.appendChild(btn);
  });
}

// ==========================================================================
// MOZILLA PDF.JS CANVAS ENGINE (ELIMINATES BROWSER AUTO-DOWNLOAD & BLACK SCREEN)
// ==========================================================================

// Load and cache PDF document via JavaScript ArrayBuffer
async function loadAndRenderPdf(url, targetPage = 1) {
  const loadingOverlay = document.getElementById('pdfLoadingOverlay');
  const loadingText = document.getElementById('pdfLoadingText');
  const errorFallback = document.getElementById('pdfErrorFallback');
  
  if (errorFallback) errorFallback.style.display = 'none';
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
    if (loadingText) loadingText.innerText = `Đang tải ${url.split('/').pop()}...`;
  }

  // Check if PDF.js library is loaded
  if (typeof pdfjsLib === 'undefined') {
    console.warn('PDF.js chưa sẵn sàng.');
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
    if (errorFallback) errorFallback.style.display = 'block';
    return;
  }

  try {
    // If different document or not yet loaded, load PDF
    if (currentPdfUrl !== url || !currentPdfDoc) {
      if (currentRenderTask) {
        try { currentRenderTask.cancel(); } catch (e) {}
        currentRenderTask = null;
      }
      currentPdfDoc = null;

      const loadingTask = pdfjsLib.getDocument({
        url: url,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });
      currentPdfDoc = await loadingTask.promise;
      currentPdfUrl = url;

      // Update total pages dynamically from real PDF
      const totalPages = currentPdfDoc.numPages;
      if (DAY_CONFIG[currentDay]) {
        DAY_CONFIG[currentDay].totalPages = totalPages;
      }
      const totalDisplay = document.getElementById('totalPageDisplay');
      if (totalDisplay) totalDisplay.innerText = totalPages;
      const pageInput = document.getElementById('currentPageInput');
      if (pageInput) pageInput.max = totalPages;
    }

    // Render the target page
    await renderPdfPage(targetPage);
  } catch (err) {
    console.error('Lỗi khi nạp tài liệu PDF:', err);
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
    if (errorFallback) errorFallback.style.display = 'block';
  }
}

// Render individual slide page onto HTML5 Canvas
async function renderPdfPage(pageNum) {
  if (!currentPdfDoc) return;

  pageNum = parseInt(pageNum, 10);
  if (isNaN(pageNum) || pageNum < 1) pageNum = 1;
  if (pageNum > currentPdfDoc.numPages) pageNum = currentPdfDoc.numPages;

  currentPageNumber = pageNum;
  const pageInput = document.getElementById('currentPageInput');
  if (pageInput) pageInput.value = pageNum;

  // Queue page render if already rendering
  if (isRenderingPdf) {
    pendingPageNumber = pageNum;
    return;
  }

  isRenderingPdf = true;
  const loadingOverlay = document.getElementById('pdfLoadingOverlay');
  if (loadingOverlay) loadingOverlay.classList.remove('hidden');

  try {
    const page = await currentPdfDoc.getPage(pageNum);
    const canvas = document.getElementById('pdfRenderCanvas');
    const container = document.getElementById('pdfViewportBox');
    if (!canvas || !container) {
      isRenderingPdf = false;
      return;
    }

    const ctx = canvas.getContext('2d');

    // Calculate dynamic responsive scale
    const containerWidth = Math.max(container.clientWidth - 48, 300);
    const unscaledViewport = page.getViewport({ scale: 1.0 });

    // Scale to fit container width nicely
    const baseScale = containerWidth / unscaledViewport.width;
    const finalZoom = (currentZoom / 100) * baseScale;

    // Support Retina / HiDPI crisp rendering
    const pixelRatio = window.devicePixelRatio || 1;
    const viewport = page.getViewport({ scale: finalZoom * pixelRatio });

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.style.width = Math.floor(viewport.width / pixelRatio) + 'px';
    canvas.style.height = Math.floor(viewport.height / pixelRatio) + 'px';

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    if (currentRenderTask) {
      try { currentRenderTask.cancel(); } catch (e) {}
    }

    currentRenderTask = page.render(renderContext);
    await currentRenderTask.promise;
    currentRenderTask = null;
  } catch (err) {
    if (err.name !== 'RenderingCancelledException') {
      console.error('Lỗi khi vẽ trang slide:', err);
    }
  } finally {
    isRenderingPdf = false;
    if (loadingOverlay) loadingOverlay.classList.add('hidden');

    if (pendingPageNumber !== null) {
      const nextNum = pendingPageNumber;
      pendingPageNumber = null;
      renderPdfPage(nextNum);
    }
  }
}

// Page Navigation
function jumpSlideRelative(delta) {
  const cfg = DAY_CONFIG[currentDay];
  let target = currentPageNumber + delta;
  if (target < 1) target = 1;
  if (target > cfg.totalPages) target = cfg.totalPages;
  jumpSlideDirect(target);
}

function jumpSlideDirect(page) {
  const cfg = DAY_CONFIG[currentDay];
  page = parseInt(page, 10);
  if (isNaN(page) || page < 1) page = 1;
  if (page > cfg.totalPages) page = cfg.totalPages;

  renderPdfPage(page);
  // #8: Mark this slide as visited
  markSlideVisited(currentDay, page);
}

// Zoom PDF Viewer
function zoomPdf(delta) {
  currentZoom += delta;
  if (currentZoom < 60) currentZoom = 60;
  if (currentZoom > 200) currentZoom = 200;
  
  const zoomDisplay = document.getElementById('zoomVal');
  if (zoomDisplay) zoomDisplay.innerText = `${currentZoom}%`;
  
  renderPdfPage(currentPageNumber);
}

// Fit PDF to container width
function fitPdfWidth() {
  currentZoom = 100;
  const zoomDisplay = document.getElementById('zoomVal');
  if (zoomDisplay) zoomDisplay.innerText = `100%`;
  renderPdfPage(currentPageNumber);
}

// ==========================================================================
// RESIZABLE SIDE PANEL FOR BOT CON (AI TUTOR PANEL)
// ==========================================================================
let isResizingPanel = false;
let savedPanelWidth = 360;

function initSpokePanelResizer() {
  const resizer = document.getElementById('spokePanelResizer');
  const panel = document.getElementById('aiTutorPanel');
  if (!resizer || !panel) return;

  // Restore saved width from localStorage on desktop
  const storedWidth = localStorage.getItem('vlearn_spoke_panel_width');
  if (storedWidth && window.innerWidth > 900) {
    const parsed = parseInt(storedWidth, 10);
    if (!isNaN(parsed) && parsed >= 280) {
      savedPanelWidth = Math.min(parsed, Math.max(280, window.innerWidth - 380));
      if (!panel.classList.contains('collapsed')) {
        panel.style.width = `${savedPanelWidth}px`;
      }
    }
  }

  let startX = 0;
  let startWidth = 0;

  function onPointerDown(e) {
    if (window.innerWidth <= 900) return; // Mobile uses overlay
    if (e.type === 'mousedown' && e.button !== 0) return;

    isResizingPanel = true;
    startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    startWidth = panel.getBoundingClientRect().width;

    // If panel was collapsed, open it on drag
    if (panel.classList.contains('collapsed')) {
      panel.classList.remove('collapsed');
      isAiPanelOpen = true;
      const btn = document.getElementById('toggleAiPanelBtn');
      const text = document.getElementById('aiToggleText');
      if (btn) btn.classList.add('active');
      if (text) text.innerText = 'AI Tutor (Đang mở)';
      startWidth = savedPanelWidth || 360;
    }

    panel.classList.add('no-transition');
    resizer.classList.add('is-dragging');
    document.body.classList.add('is-resizing-panel');

    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchmove', onPointerMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isResizingPanel) return;
    if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();

    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    // Resizer is on the LEFT of the panel: dragging left expands the panel
    const deltaX = clientX - startX;
    let newWidth = startWidth - deltaX;

    const minWidth = 280;
    const maxWidth = Math.max(minWidth, Math.min(800, window.innerWidth - 380));

    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;

    panel.style.width = `${newWidth}px`;
    savedPanelWidth = newWidth;
  }

  function onPointerUp() {
    if (!isResizingPanel) return;
    isResizingPanel = false;

    panel.classList.remove('no-transition');
    resizer.classList.remove('is-dragging');
    document.body.classList.remove('is-resizing-panel');

    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('mouseup', onPointerUp);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchend', onPointerUp);

    // Save custom width
    localStorage.setItem('vlearn_spoke_panel_width', Math.round(savedPanelWidth));

    // Re-render PDF Canvas to fit the new width cleanly
    if (currentPdfDoc) {
      renderPdfPage(currentPageNumber);
    }
  }

  resizer.addEventListener('mousedown', onPointerDown);
  resizer.addEventListener('touchstart', onPointerDown, { passive: true });
}

// Toggle AI Tutor Panel (Open / Close for full-width reading)
function toggleAiPanel() {
  const panel = document.getElementById('aiTutorPanel');
  const btn = document.getElementById('toggleAiPanelBtn');
  const text = document.getElementById('aiToggleText');
  isAiPanelOpen = !isAiPanelOpen;

  if (isAiPanelOpen) {
    panel.classList.remove('collapsed');
    if (window.innerWidth > 900 && savedPanelWidth) {
      panel.style.width = `${savedPanelWidth}px`;
    }
    if (btn) btn.classList.add('active');
    if (text) text.innerText = 'AI Tutor (Đang mở)';
  } else {
    panel.classList.add('collapsed');
    if (btn) btn.classList.remove('active');
    if (text) text.innerText = '✦ Mở AI Tutor';
  }

  // Re-render canvas to fit new available width
  setTimeout(() => {
    if (currentPdfDoc) renderPdfPage(currentPageNumber);
  }, 320);
}

// Toggle Left Sidebar (Desktop collapse / Mobile drawer)
function toggleSidebar() {
  const sidebar = document.getElementById('lmsSidebar');
  if (sidebar) {
    if (window.innerWidth <= 900) {
      sidebar.classList.toggle('open-mobile');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  }

  // Re-render canvas to fit new available width
  setTimeout(() => {
    if (currentPdfDoc) renderPdfPage(currentPageNumber);
  }, 320);
}

// Open Fullscreen PDF in separate tab
function openPdfFullscreen() {
  const cfg = DAY_CONFIG[currentDay];
  window.open(`${cfg.slideFile}#page=${currentPageNumber}`, '_blank');
}

// Responsive resize listener (debounced)
let resizeDebounceTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeDebounceTimer);
  resizeDebounceTimer = setTimeout(() => {
    const spokeView = document.getElementById('viewSpoke');
    if (currentPdfDoc && spokeView && spokeView.classList.contains('active-view')) {
      renderPdfPage(currentPageNumber);
    }
  }, 200);
});

// Quick Suggestion Click
function handleQuickPrompt(text) {
  hubQueryInput.value = text;
  submitHubQuery();
}

function handleKeyPress(e, type) {
  if (e.key === 'Enter') {
    if (type === 'hub') submitHubQuery();
    else submitSpokeQuery();
  }
}

// ==========================================================================
// TẦNG 1: BOT HỖ TRỢ (COURSE NAVIGATOR LOGIC)
// ==========================================================================
async function submitHubQuery() {
  const query = hubQueryInput.value.trim();
  if (!query) return;

  // Append User message
  appendMessage(hubChatViewport, 'user', query);
  hubQueryInput.value = '';

  // Show typing animation
  const typingIndicator = appendTypingIndicator(hubChatViewport, 'Bot Hỗ Trợ');

  const lower = query.toLowerCase();

  // 1. Guardrail: Prompt Injection Detection (Data Pack Turn IDs T00236, T00274, T02760)
  if (lower.includes('bỏ qua') || lower.includes('guardrail') || lower.includes('system_override') || lower.includes('admin') || lower.includes('ràng buộc')) {
    typingIndicator.remove();
    const injectionRefusal = `
      <p>🛡️ <strong>Cảnh báo An toàn & Bảo mật:</strong> Hệ thống phát hiện nỗ lực ghi đè chỉ thị (Prompt Injection - tương tự mã <code>T00274</code> trong chatlog). Mình giữ vững vai trò trợ lý học tập của khóa <strong>AI Thực Chiến</strong> và từ chối yêu cầu này. Mời bạn tiếp tục hỏi về kiến thức bài học!</p>
      <div class="citation-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border-color: rgba(239, 68, 68, 0.3);">⚠️ Bảo mật: Từ chối Injection (HAX G1/G2)</div>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Hệ thống phát hiện nỗ lực ghi đè chỉ thị và từ chối yêu cầu này để đảm bảo an toàn.' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', injectionRefusal);
    return;
  }

  // 2. Hướng dẫn sử dụng hệ thống (Chỉ hiển thị khi người dùng chủ động hỏi cách dùng)
  if (lower.includes('hướng dẫn sử dụng') || lower.includes('bạn làm được những gì') || lower.includes('chức năng của hệ thống')) {
    typingIndicator.remove();
    const capabilityMsg = `
      <p>Chào bạn! Mình là <strong>Bot Hỗ Trợ (Central Course Navigator)</strong> — "hoa tiêu" dẫn đường học tập cho 2 buổi học trọng tâm hiện có: <strong>Day 01 (Nền tảng GenAI)</strong> và <strong>Day 02 (Xác định bài toán & Kỹ thuật Prompt)</strong>. Dưới đây là những việc mình có thể hỗ trợ bạn:</p>
      <ul style="margin: 0.6rem 0 0.8rem 1.2rem; line-height: 1.65; color: var(--text-secondary); font-size: 0.9rem;">
        <li>🧭 <strong>Định vị tri thức Day 1 & Day 2:</strong> Bạn có thể hỏi bất kỳ thuật ngữ nào (<em>Prompting, Zero-shot, Few-shot, Temperature, Cost of Error, PM vs Project Manager, CoT, RateLimit 429...</em>), mình sẽ xác định ngay nó được dạy ở Day mấy và slide nào.</li>
        <li>🔗 <strong>Lối tắt bay thẳng vào bài học (Deep Links):</strong> Bấm vào các thẻ bài học bên dưới để chuyển thẳng sang giao diện đọc slide tương ứng.</li>
        <li>📖 <strong>Điều phối tới Bot Con:</strong> Kết nối bạn với Bot Con chuyên trách từng buổi học để được giải thích súc tích ≤ 3 câu có trích dẫn số trang chính xác 100%.</li>
        <li>🛡️ <strong>Bảo vệ liêm chính & Sư phạm:</strong> Hướng dẫn phương pháp tư duy, từ chối giải hộ bài thi trắc nghiệm quiz để bạn tự tin nắm vững bản chất.</li>
      </ul>
      <p style="font-size: 0.88rem; color: var(--text-muted);">👉 Bạn hãy thử bấm vào các câu hỏi gợi ý bên trên hoặc nhập bất kỳ thắc mắc nào về bài giảng nhé!</p>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Mình là Bot Hỗ Trợ định vị tri thức Day 1 và Day 2 của khóa AI Thực Chiến.' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', capabilityMsg);
    return;
  }

  // 3. Khai phá các chủ đề chuẩn hóa (Chỉ kiểm tra khi KHÔNG phải là câu hỏi nối tiếp/làm rõ)
  const isFollowUp = isFollowUpQuery(query);
  if (!isFollowUp) {
    if (checkCuratedTopics(query, lower, typingIndicator)) {
      return;
    }
  }

  // 4. Nếu câu hỏi tự do hoặc câu hỏi nối tiếp: Gọi Live AI với Trí Nhớ Hội Thoại Đa Lượt
  let contextHint = '';
  if (lastHubContext.day && lastHubContext.page) {
    contextHint = `\n[NGỮ CẢNH HỘI THOẠI TRƯỚC ĐÓ]: Cuộc trò chuyện đang thảo luận về bài học Day ${lastHubContext.day} (Trang slide ${lastHubContext.page}, Chủ đề: "${lastHubContext.topic || ''}"). Nếu người dùng hỏi câu tiếp theo (như 'nói rõ hơn', 'giải thích thêm', 'cho ví dụ', 'tại sao', 'ở slide nào', 'slide mấy', 'là gì'...), bạn hãy căn cứ vào câu hỏi & câu trả lời trước đó trong lịch sử kết hợp với ngữ cảnh này để tiếp tục giải đáp, định vị chính xác bài học Day 1 hoặc Day 2 kèm trích dẫn số trang rõ ràng dạng [Trang X - Slide Day Y].`;
  }

  let scopeHint = '';
  const initialScope = detectQueryScope(query);
  if (initialScope.day === 'out_of_scope') {
    scopeHint = `\n[CHỈ THỊ BẮT BUỘC VỀ PHẠM VI]: Câu hỏi này về chủ đề "${initialScope.topic || query}" NẰM NGOÀI PHẠM VI 2 BUỔI HỌC CHÍNH THỨC (Day 1 & Day 2). BẮT BUỘC: Câu đầu tiên trong câu trả lời của bạn PHẢI nêu rõ ràng rằng: "Lưu ý: Chủ đề này nằm ngoài phạm vi 2 buổi học chính thức (Day 1 & Day 2) của khóa học." Sau đó bạn mới giải thích súc tích, dễ hiểu bản chất khái niệm và gợi ý liên hệ với kiến thức nền tảng trong bài giảng (ví dụ liên hệ RAG với Context Window ở Day 1; liên hệ ReAct với vòng lặp Agent & Workflow Patterns ở Day 2).`;
  }

  const hubSystemPrompt = `Bạn là Bot Hỗ Trợ (Central Course Navigator) thông minh, sư phạm và có trí nhớ hội thoại sâu sắc của VLearn AI Tutor.
KHO DỮ LIỆU BÀI HỌC CHÍNH THỨC CỦA KHÓA HỌC HIỆN CÓ 2 BUỔI:
- Day 1: Nền tảng GenAI & Kỹ thuật Prompt Engineering cơ bản (29 trang slide d1-slide-hackathon.pdf): 4 lớp cấu trúc Prompt (System, User, Context, Output), Zero-shot, Few-shot Prompting, Chain-of-Thought (CoT), Tham số Temperature & Top_p, Token & Attention, Context Window ("bàn làm việc"), Hiện tượng Lost in the Middle, 5 bộ phận của AI Agent (Goal, Reasoning, Tools, Memory, Action), Turing Test, HAX Guidelines.
- Day 2: Xác định bài toán kinh doanh cho AI & Mức tự động hóa (29 trang slide d2-slide-hackathon.pdf): Mô hình Double Diamond (Don Norman 2005: Diamond 1 Tìm đúng vấn đề, Diamond 2 Tìm đúng giải pháp), Chi phí sai sót (Cost of Error), Automate vs Augment (Google PAIR), Ba mức giải pháp Rule / Workflow / Agent, Workflow Patterns (Prompt Chaining, Routing, Parallelization), Reward Function & Đánh đổi FP/FN, Khung ra quyết định Go / Not Yet / No-Go, 9 trường của Problem Statement.

QUY TẮC PHÂN LUỒNG TRI THỨC VÀ GIAO TIẾP THÔNG MINH (BẮT BUỘC):
1. GIAO TIẾP TỰ NHIÊN & TRÍ NHỚ HỘI THOẠI:
   - Duy trì mạch hội thoại liền mạch qua các lượt trao đổi trong lịch sử.
   - Khi người học chào hỏi, trò chuyện thân mật hoặc hỏi câu cá nhân (ví dụ: 'hê lô bạn biết tôi là ai không', 'chào bạn', 'bạn là ai'): Hãy trả lời thông minh, thân thiện, ân cần và tự nhiên như một trợ lý AI đồng hành (ví dụ: bạn là trợ lý AI học tập, không lưu trữ thông tin nhận dạng cá nhân để bảo vệ quyền riêng tư, nhưng luôn sẵn sàng đồng hành cùng học viên khám phá bài học).
   - Khi người học hỏi câu tiếp nối ('giải thích thêm', 'cho ví dụ', 'tại sao', 'so sánh'...), hãy dựa vào ngữ cảnh thảo luận trước đó để giải thích thông minh, dễ hiểu, mang tính giáo dục cao.

2. NẾU CÂU HỎI THUỘC PHẠM VI BÀI HỌC (Day 1 hoặc Day 2):
   - Giải thích cốt lõi bản chất vấn đề ngắn gọn, súc tích (3-4 câu).
   - Định vị chính xác buổi học và số trang slide, bắt buộc trích dẫn theo định dạng chuẩn: [Trang X - Slide Day Y].

3. NẾU CÂU HỎI NẰM NGOÀI PHẠM VI BÀI HỌC (như RAG, ReAct, Vector DB, Agentic AI nâng cao, LangChain, Fine-tuning, RLHF, Day 3, Day 4, v.v.):
   - [QUY TẮC ĐẦU TIÊN BẮT BUỘC]: Bạn PHẢI nêu rõ ràng và khẳng định ngay ở câu đầu tiên rằng kiến thức/chủ đề này NẰM NGOÀI PHẠM VI 2 BUỔI HỌC CHÍNH THỨC (Day 1 & Day 2) của khóa học hiện tại.
   - [HỖ TRỢ GIẢI THÍCH & GỢI Ý MỞ RỘNG]: Sau khi đã nêu rõ phạm vi, bạn hỗ trợ người học tìm hiểu thêm bằng cách giải thích ngắn gọn, súc tích bản chất của khái niệm đó (nguyên lý hoạt động, vai trò thực tế), đồng thời gợi ý hướng tìm hiểu mới hoặc liên hệ, kết nối với kiến thức nền tảng trong bài giảng (ví dụ: liên hệ RAG với Context Window & In-context Learning ở Day 1; liên hệ ReAct với vòng lặp 5 bộ phận Agent ở Day 1 và Workflow Patterns ở Day 2).

4. ĐỊNH DẠNG:
   - Trả lời bằng tiếng Việt chuẩn mực, thông minh, ân cần, mang tính sư phạm cao, độ dài khoảng 3-5 câu.${contextHint}${scopeHint}`;

  // Chuẩn hóa lịch sử hội thoại thành dạng text gọn nhẹ để giảm token, tăng tốc phản hồi AI
  const historyForAPI = hubChatHistory.slice(-8).map(m => {
    const cleanContent = String(m.content).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return {
      role: m.role,
      content: m.role === 'assistant' ? cleanContent.slice(0, 220) : cleanContent.slice(0, 300)
    };
  });

  const liveResult = await callLiveAI(hubSystemPrompt, query, historyForAPI);
  typingIndicator.remove();

  if (liveResult && liveResult.text) {
    const scope = detectQueryScope(query);
    const isOutOfScope = (scope.day === 'out_of_scope') || 
      liveResult.text.toLowerCase().includes('ngoài phạm vi') || 
      liveResult.text.toLowerCase().includes('ngoài 2 buổi');

    // Bulletproof Guardrail: Đảm bảo phản hồi ngoài phạm vi LUÔN có thông báo rõ ràng đầu câu
    if (isOutOfScope) {
      const lowerText = liveResult.text.toLowerCase();
      if (!lowerText.includes('ngoài phạm vi') && !lowerText.includes('ngoài 2 buổi') && !lowerText.includes('chưa có trong')) {
        liveResult.text = `⚠️ Lưu ý phạm vi: Chủ đề này nằm ngoài phạm vi 2 buổi học chính thức (Day 1 & Day 2) của khóa học.\n\n${liveResult.text}`;
      }
    }

    // Lưu vào trí nhớ hội thoại của Bot Hỗ Trợ
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: liveResult.text });
    if (hubChatHistory.length > 24) {
      hubChatHistory.splice(0, hubChatHistory.length - 24);
    }
    saveSessionState(); // #6

    // 1. Trích xuất số trang và Day được LLM nhắc đến trực tiếp trong câu trả lời
    let citedPage = null;
    let citedDay = null;
    const citationMatch = liveResult.text.match(/\[Trang\s*(\d+)(?:\s*-\s*(?:Slide\s*)?Day\s*(\d+))?\]/i);
    if (citationMatch) {
      citedPage = parseInt(citationMatch[1], 10);
      if (citationMatch[2]) citedDay = parseInt(citationMatch[2], 10);
    } else {
      const looseMatch = liveResult.text.match(/(?:Trang|Slide)\s*(\d+)/i);
      if (looseMatch) {
        const p = parseInt(looseMatch[1], 10);
        if (p >= 1 && p <= 29) citedPage = p;
      }
    }

    let bottomCardHtml = '';
    if (isOutOfScope) {
      if (citedPage && (citedDay === 1 || citedDay === 2)) {
        bottomCardHtml = renderSlideLinkCard(citedDay, citedPage, liveResult.engineName);
      }
      bottomCardHtml += `
        <div class="deep-links-container" style="margin-top: 0.8rem;">
          <div class="deep-link-card" onclick="switchView('spoke', 1)">
            <div>
              <div class="link-title">📍 Khám phá Day 1: Nền tảng GenAI & Kỹ thuật Prompt</div>
              <div class="link-desc">Tìm hiểu 4 lớp Prompt, Temperature & Top_p, Token và Attention (29 trang slide)</div>
            </div>
            <span class="link-arrow">→</span>
          </div>
          <div class="deep-link-card" onclick="switchView('spoke', 2)">
            <div>
              <div class="link-title">📍 Khám phá Day 2: Xác định bài toán kinh doanh cho AI</div>
              <div class="link-desc">Xem Double Diamond, Automate vs Augment, Rule/Workflow/Agent và Khung Go/Not Yet (29 trang slide)</div>
            </div>
            <span class="link-arrow">→</span>
          </div>
        </div>
      `;
    } else {
      const isGreeting = lower.includes('bạn biết tôi') || lower.includes('tôi là ai') || 
        lower === 'hi' || lower === 'hello' || lower === 'hê lô' || lower === 'helo' ||
        lower.startsWith('hê lô') || lower.startsWith('hello') || lower.startsWith('chào') || 
        lower.includes('bạn tên gì') || lower.includes('bạn có khỏe') || lower.includes('khỏe không') ||
        lower.includes('cảm ơn') || lower.includes('thank');

      if (isGreeting && !citedPage) {
        // Đối với câu hỏi chào hỏi xã giao tự nhiên, không gán ghép thẻ slide tùy tiện
        bottomCardHtml = '';
      } else {
        // 2. Xác định Day gợi ý dựa trên tri thức hiện tại hoặc ngữ cảnh trước
        let suggestedDay = citedDay;
        if (!suggestedDay) {
          if (scope.day === 1 || scope.day === 2) suggestedDay = scope.day;
        }
        if (!suggestedDay && lastHubContext.day) {
          suggestedDay = lastHubContext.day;
        }
        if (!suggestedDay) {
          for (let i = hubChatHistory.length - 1; i >= 0; i--) {
            const hScope = detectQueryScope(hubChatHistory[i].content);
            if (hScope.day === 1 || hScope.day === 2) {
              suggestedDay = hScope.day;
              break;
            }
          }
        }
        if (!suggestedDay) suggestedDay = 1;

        // 3. Xác định Page gợi ý dựa trên trí nhớ ngữ cảnh
        let matchedPage = citedPage;
        if (!matchedPage && !isFollowUp) {
          matchedPage = findBestMatchingSlidePage(suggestedDay, query);
        }
        if (!matchedPage && isFollowUp && lastHubContext.day === suggestedDay && lastHubContext.page) {
          matchedPage = lastHubContext.page;
        }
        if (!matchedPage) {
          matchedPage = findBestMatchingSlidePage(suggestedDay, query);
        }
        if (!matchedPage && lastHubContext.page) {
          matchedPage = lastHubContext.page;
        }
        if (!matchedPage) {
          matchedPage = suggestedDay === 1 ? 28 : 3;
        }

        // Ghi nhớ ngữ cảnh Hub gần nhất cho các lượt hội thoại tiếp theo
        lastHubContext = {
          day: suggestedDay,
          page: matchedPage,
          topic: query
        };

        bottomCardHtml = renderSlideLinkCard(suggestedDay, matchedPage, liveResult.engineName);
      }
    }

    const liveContent = `
      ${formatAiResponse(liveResult.text, citedDay || 1)}
      ${bottomCardHtml}
    `;
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', liveResult.engineName, liveContent);
    return;
  }

  // 5. Fallback Offline nếu server backend chưa bật
  processHubResponse(query);
}

// Kiểm tra các chủ đề khóa học đã được chuẩn hóa với deep-links và probing
function checkCuratedTopics(query, lower, typingIndicator) {
  // Case: Bốn lớp của Prompt (Day 1 - Slide 28)
  if (lower.includes('4 lớp') || lower.includes('bốn lớp') || lower.includes('lớp của prompt') || lower.includes('cấu trúc của một prompt')) {
    typingIndicator.remove();
    lastHubContext = { day: 1, page: 28, topic: 'Bốn lớp cấu trúc của một prompt' };
    const content = `
      <p>Cấu trúc một prompt chuẩn mực gồm <strong>4 lớp xếp chồng</strong> được phân tích chi tiết tại <strong>Day 1 - Slide 28</strong>:</p>
      <ul style="margin: 0.4rem 0 0.6rem 1.2rem; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
        <li><strong>Lớp 1 (System instruction):</strong> "Lời dặn đầu ca" — model là ai, cư xử thế nào, không được làm gì.</li>
        <li><strong>Lớp 2 (User input):</strong> Câu hỏi / yêu cầu cụ thể của người dùng trong lượt này.</li>
        <li><strong>Lớp 3 (Context bổ sung):</strong> Tài liệu, lịch sử hội thoại, dữ liệu tra sổ bày lên "bàn làm việc".</li>
        <li><strong>Lớp 4 (Output mong muốn):</strong> Định dạng kết quả (gạch đầu dòng, bảng biểu, JSON, độ dài).</li>
      </ul>
      <div class="deep-links-container">
        <div class="deep-link-card" onclick="switchView('spoke', 1, 28)">
          <div>
            <div class="link-title">📍 Mở Day 1: Slide 28 (Giải phẫu một prompt: 4 lớp xếp chồng)</div>
            <div class="link-desc">Đến trang slide và xem hướng dẫn chi tiết từ Bot Con Day 1</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Cấu trúc một prompt chuẩn mực gồm 4 lớp xếp chồng tại Day 1 - Slide 28: Lớp 1 System instruction, Lớp 2 User input, Lớp 3 Context bổ sung, Lớp 4 Output mong muốn.' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', content);
    return true;
  }

  // Case: Temperature & Top_p (Day 1 - Slide 29)
  if (lower.includes('temperature') || lower.includes('top_p') || lower.includes('top-p') || lower.includes('núm vặn') || lower.includes('nhiệt độ')) {
    typingIndicator.remove();
    lastHubContext = { day: 1, page: 29, topic: 'Hai núm vặn chọn từ: Temperature & Top_p' };
    const content = `
      <p>Hai "núm vặn" chọn từ của LLM được giảng dạy tại <strong>Day 1 - Slide 29</strong>:</p>
      <ul style="margin: 0.4rem 0 0.6rem 1.2rem; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
        <li><strong>Temperature ("Núm vặn độ liều"):</strong> Điều khiển độ phẳng của phân bố xác suất. <code>T = 0</code> luôn chọn từ chắc nhất (tất định, hợp code & trích xuất); <code>T cao</code> giúp câu từ phong phú, sáng tạo.</li>
        <li><strong>Top_p ("Chỉ xem top đầu bảng"):</strong> Chỉ giữ nhóm token có xác suất cộng dồn đạt ngưỡng <code>p</code> (thường 0.9), loại bỏ nhóm đuôi dài dễ sai lạc.</li>
      </ul>
      <div class="deep-links-container">
        <div class="deep-link-card" onclick="switchView('spoke', 1, 29)">
          <div>
            <div class="link-title">📍 Mở Day 1: Slide 29 (Hai núm vặn chọn từ: Temperature & Top_p)</div>
            <div class="link-desc">Xem bảng minh họa phân bố xác suất và nguyên tắc tinh chỉnh</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Hai núm vặn chọn từ của LLM tại Day 1 - Slide 29: Temperature là núm vặn độ liều và Top_p là chỉ giữ nhóm token có xác suất cộng dồn đạt ngưỡng p.' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', content);
    return true;
  }

  // Case: Double Diamond (Day 2 - Slide 3 & 4)
  if (lower.includes('double diamond') || lower.includes('norman') || lower.includes('tìm đúng vấn đề')) {
    typingIndicator.remove();
    lastHubContext = { day: 2, page: 3, topic: 'Mô hình Double Diamond (Don Norman)' };
    const content = `
      <p>Mô hình <strong>Double Diamond</strong> (Don Norman / British Design Council 2005) được giảng dạy tại <strong>Day 2 - Slide 3 & 4</strong>:</p>
      <ul style="margin: 0.4rem 0 0.6rem 1.2rem; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
        <li><strong>Diamond 1 (Tìm đúng vấn đề):</strong> Phân kỳ (Discover - phỏng vấn, quan sát) để thấu hiểu sâu sắc; Hội tụ (Define - 5 Whys, Affinity Mapping) để chọn đúng bài toán gốc.</li>
        <li><strong>Diamond 2 (Tìm đúng giải pháp):</strong> Phân kỳ (Develop) mở rộng nhiều giải pháp; Hội tụ (Deliver) triển khai giải pháp tối ưu.</li>
      </ul>
      <p style="font-size: 0.88rem; color: var(--text-muted);"><em>"Giải pháp xuất sắc cho sai vấn đề có thể còn tệ hơn không có giải pháp."</em></p>
      <div class="deep-links-container">
        <div class="deep-link-card" onclick="switchView('spoke', 2, 3)">
          <div>
            <div class="link-title">📍 Mở Day 2: Slide 3 (Mô hình Double Diamond)</div>
            <div class="link-desc">Khám phá tư duy tìm đúng vấn đề trước khi tìm giải pháp AI</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Mô hình Double Diamond tại Day 2 - Slide 3 & 4: Diamond 1 Tìm đúng vấn đề và Diamond 2 Tìm đúng giải pháp.' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', content);
    return true;
  }

  // Case: Automate vs Augment (Day 2 - Slide 17)
  if (lower.includes('automate') || lower.includes('augment') || lower.includes('tự động hóa') || lower.includes('tự động hoá') || lower.includes('cost of error')) {
    typingIndicator.remove();
    lastHubContext = { day: 2, page: 17, topic: 'Automation vs Augmentation (Google PAIR)' };
    const content = `
      <p>Quyết định <strong>Automation vs Augmentation</strong> (Bước 2 của Google PAIR) được trình bày tại <strong>Day 2 - Slide 17 & 15</strong>:</p>
      <ul style="margin: 0.4rem 0 0.6rem 1.2rem; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
        <li><strong>Automate (AI làm thay):</strong> Chọn khi việc tẻ nhạt, khó, nhàm chán hoặc cần scale; có "đáp án đúng" đồng thuận; chi phí sai sót thấp.</li>
        <li><strong>Augment (AI hỗ trợ con người):</strong> Chọn khi stakes cao (tiền bạc, pháp lý, sức khỏe); chi phí sai sót đắt; người dùng thích tự kiểm soát hoặc cần trách nhiệm cá nhân.</li>
      </ul>
      <div class="deep-links-container">
        <div class="deep-link-card" onclick="switchView('spoke', 2, 17)">
          <div>
            <div class="link-title">📍 Mở Day 2: Slide 17 (Automation vs Augmentation theo PAIR)</div>
            <div class="link-desc">Xem bảng tiêu chí lựa chọn vai trò con người trong hệ thống AI</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Quyết định Automation vs Augmentation tại Day 2 - Slide 17: Automate cho việc lặp lại, chi phí sai sót thấp; Augment cho tác vụ có rủi ro cao hoặc cần trách nhiệm cá nhân.' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', content);
    return true;
  }

  // Case: Ba mức giải pháp: Rule / Workflow / Agent (Day 2 - Slide 18 & 19)
  if (lower.includes('rule') && (lower.includes('workflow') || lower.includes('agent')) || lower.includes('ba mức') || lower.includes('cấp độ giải pháp')) {
    typingIndicator.remove();
    lastHubContext = { day: 2, page: 18, topic: 'Ba mức giải pháp: Rule / Workflow / Agent' };
    const content = `
      <p>Ba mức giải pháp kỹ thuật theo khuyến nghị của Anthropic được phân tích tại <strong>Day 2 - Slide 18 & 19</strong>:</p>
      <ul style="margin: 0.4rem 0 0.6rem 1.2rem; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
        <li><strong>Cấp độ 1 (Rule / Script):</strong> Logic tường minh (if/else), kết quả cố định, luôn đúng 100% (Ví dụ: tính thuế, chặn spam theo từ khóa).</li>
        <li><strong>Cấp độ 2 (LLM Feature / Workflow):</strong> Đầu vào đa dạng, cần linh hoạt (tóm tắt, phân loại, prompt chaining có gate kiểm tra).</li>
        <li><strong>Cấp độ 3 (Agent):</strong> Tình huống động, nhiều bước, tự gọi công cụ và tự ra quyết định giữa các bước.</li>
      </ul>
      <p style="font-size: 0.88rem; color: var(--text-muted);"><em>"Thứ tự ưu tiên thực dụng: Bắt đầu từ Rule, chỉ sang Agent khi giá trị tăng hơn độ phức tạp."</em></p>
      <div class="deep-links-container">
        <div class="deep-link-card" onclick="switchView('spoke', 2, 18)">
          <div>
            <div class="link-title">📍 Mở Day 2: Slide 18 (Ba mức giải pháp: Rule / Workflow / Agent)</div>
            <div class="link-desc">Xem so sánh kỹ thuật và ví dụ thực tế cho từng cấp độ</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Ba mức giải pháp kỹ thuật tại Day 2 - Slide 18: Cấp 1 Rule/Script, Cấp 2 LLM Feature/Workflow, Cấp 3 Agent.' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', content);
    return true;
  }

  // Case: Khung quyết định Go / Not Yet / No-Go (Day 2 - Slide 28)
  if (lower.includes('go') && (lower.includes('not yet') || lower.includes('no-go')) || lower.includes('quyết định go')) {
    typingIndicator.remove();
    lastHubContext = { day: 2, page: 28, topic: 'Khung quyết định: Go / Not Yet / No-Go' };
    const content = `
      <p>Khung ra quyết định <strong>Go / Not Yet / No-Go</strong> được giảng dạy tại <strong>Day 2 - Slide 28</strong>:</p>
      <ul style="margin: 0.4rem 0 0.6rem 1.2rem; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
        <li><strong>✓ Go (Đủ điều kiện):</strong> Bài toán rõ ràng, chỉ số đo lường khả thi, điểm can thiệp AI phù hợp và kiểm soát được rủi ro.</li>
        <li><strong>⏸ Not Yet (Tạm hoãn - Có triển vọng):</strong> Cần bổ sung dữ liệu thực tế, chuẩn hóa quy trình, thiết lập chỉ số và xác định ranh giới HITL.</li>
        <li><strong>✕ No-Go (Không triển khai):</strong> AI không mang lại giá trị vượt trội, rủi ro vận hành quá cao, hoặc giải pháp phi AI tối ưu hơn.</li>
      </ul>
      <div class="deep-links-container">
        <div class="deep-link-card" onclick="switchView('spoke', 2, 28)">
          <div>
            <div class="link-title">📍 Mở Day 2: Slide 28 (Khung quyết định: Go / Not Yet / No-Go)</div>
            <div class="link-desc">Xem hướng dẫn lập luận dựa trên tính khả thi của Problem Statement</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    hubChatHistory.push({ role: 'user', content: query });
    hubChatHistory.push({ role: 'assistant', content: 'Khung ra quyết định tại Day 2 - Slide 28: Go (đủ điều kiện), Not Yet (có triển vọng, cần thêm dữ liệu), No-Go (không phù hợp).' });
    appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', content);
    return true;
  }

  return false;
}

function processHubResponse(query) {
  const scope = detectQueryScope(query);
  const lower = query.toLowerCase();

  let bodyHtml = '';
  let assistantSummary = '';

  const isGreeting = lower.includes('bạn biết tôi') || lower.includes('tôi là ai') || 
    lower === 'hi' || lower === 'hello' || lower === 'hê lô' || lower === 'helo' ||
    lower.startsWith('hê lô') || lower.startsWith('hello') || lower.startsWith('chào') || 
    lower.includes('bạn tên gì') || lower.includes('bạn có khỏe') || lower.includes('khỏe không') ||
    lower.includes('cảm ơn') || lower.includes('thank');

  if (isGreeting) {
    bodyHtml = `
      <p>Chào bạn! Mình là <strong>Bot Hỗ Trợ</strong> của VLearn AI Tutor. Mình không lưu trữ danh tính cá nhân để đảm bảo an toàn quyền riêng tư, nhưng mình luôn sẵn sàng đồng hành cùng bạn học tập khóa AI Thực Chiến! Hôm nay bạn muốn cùng mình tìm hiểu chủ đề nào trong <strong>Day 1 (Nền tảng GenAI)</strong> hoặc <strong>Day 2 (Xác định bài toán & Kỹ thuật Prompt)</strong>?</p>
      <div class="deep-links-container" style="margin-top: 0.8rem;">
        <div class="deep-link-card" onclick="switchView('spoke', 1)">
          <div>
            <div class="link-title">📍 Vào học Day 1: Nền tảng GenAI & Kỹ thuật Prompt</div>
            <div class="link-desc">Tìm hiểu Zero-shot, Few-shot, Temperature và cơ chế dự đoán token (29 trang slide)</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
        <div class="deep-link-card" onclick="switchView('spoke', 2)">
          <div>
            <div class="link-title">📍 Vào học Day 2: Xác định bài toán kinh doanh cho AI</div>
            <div class="link-desc">Trao đổi với Bot Con Day 2 để tìm hiểu Cost of Error và Prompt Chaining (29 trang slide)</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    assistantSummary = 'Chào bạn! Mình là Bot Hỗ Trợ luôn sẵn sàng đồng hành cùng bạn học tập Day 1 và Day 2.';
  } else if (scope.day === 'out_of_scope') {
    if (lower.includes('rag') || lower.includes('retrieval')) {
      bodyHtml = `<p>⚠️ <strong>Lưu ý phạm vi:</strong> Khái niệm <strong>RAG (Retrieval-Augmented Generation)</strong> nằm ngoài phạm vi 2 buổi học chính thức (Day 1 & Day 2) của khóa học.</p><p>💡 <strong>Tìm hiểu thêm:</strong> RAG là kỹ thuật truy xuất dữ liệu từ nguồn bên ngoài (tài liệu, database) rồi đưa vào prompt để LLM trả lời chuẩn xác, tránh ảo giác. Trong bài học, bạn có thể liên hệ RAG với kiến thức <em>Context Window ("bàn làm việc")</em> tại [Trang 14 - Slide Day 1] và cấu trúc Prompt 4 lớp tại [Trang 28 - Slide Day 1]!</p>`;
      assistantSummary = 'RAG nằm ngoài phạm vi 2 buổi học Day 1 & Day 2; là kỹ thuật truy xuất tài liệu ngoài đưa vào context của LLM.';
    } else if (lower.includes('react') || lower.includes('agentic')) {
      bodyHtml = `<p>⚠️ <strong>Lưu ý phạm vi:</strong> Mô hình <strong>ReAct / Agentic AI</strong> nằm ngoài phạm vi 2 buổi học chính thức (Day 1 & Day 2) của khóa học.</p><p>💡 <strong>Tìm hiểu thêm:</strong> ReAct (Reasoning + Acting) kết hợp suy luận từng bước (Thought) với gọi công cụ bên ngoài (Action) và quan sát (Observation). Trong bài học, bạn có thể liên hệ với <em>Vòng lặp 5 bộ phận của AI Agent</em> tại [Trang 24 - Slide Day 1] và <em>Ba mức giải pháp Rule/Workflow/Agent</em> tại [Trang 18 - Slide Day 2]!</p>`;
      assistantSummary = 'ReAct/Agentic AI nằm ngoài phạm vi Day 1 & Day 2; là cơ chế suy luận kết hợp hành động gọi tool lặp lại.';
    } else if (lower.includes('vector') || lower.includes('embedding')) {
      bodyHtml = `<p>⚠️ <strong>Lưu ý phạm vi:</strong> Công nghệ <strong>Vector Database & Embeddings</strong> nằm ngoài phạm vi 2 buổi học chính thức (Day 1 & Day 2) của khóa học.</p><p>💡 <strong>Tìm hiểu thêm:</strong> Vector DB lưu trữ văn bản dưới dạng vector số để tìm kiếm ngữ nghĩa (semantic search) theo độ tương đồng Cosine, hỗ trợ LLM tra cứu ngữ cảnh nhanh chóng.</p>`;
      assistantSummary = 'Vector DB nằm ngoài phạm vi Day 1 & Day 2; lưu trữ embeddings để tìm kiếm ngữ nghĩa.';
    } else if (lower.includes('fine-tuning') || lower.includes('finetuning')) {
      bodyHtml = `<p>⚠️ <strong>Lưu ý phạm vi:</strong> Kỹ thuật <strong>Fine-tuning</strong> nằm ngoài phạm vi 2 buổi học chính thức (Day 1 & Day 2) của khóa học.</p><p>💡 <strong>Tìm hiểu thêm:</strong> Fine-tuning là huấn luyện lại mô hình trên tập dữ liệu chuyên biệt để thay đổi trọng số. Khóa học khuyến nghị thành thạo Prompt Engineering và Workflow trước khi triển khai Fine-tuning!</p>`;
      assistantSummary = 'Fine-tuning nằm ngoài phạm vi Day 1 & Day 2; là huấn luyện cập nhật trọng số mô hình.';
    } else {
      bodyHtml = `<p>⚠️ <strong>Lưu ý phạm vi:</strong> Chủ đề bạn vừa hỏi (<em>${escapeHtml(scope.topic || 'khái niệm mở rộng')}</em>) nằm ngoài phạm vi 2 buổi học chính thức (Day 1 & Day 2) của khóa học.</p><p>💡 Mời bạn chọn một trong 2 buổi học bên dưới để nắm vững nền tảng kiến thức cốt lõi trước khi tìm hiểu thêm:</p>`;
      assistantSummary = 'Chủ đề này nằm ngoài phạm vi 2 buổi học chính thức Day 1 & Day 2.';
    }

    bodyHtml += `
      <div class="deep-links-container" style="margin-top: 0.8rem;">
        <div class="deep-link-card" onclick="switchView('spoke', 1)">
          <div>
            <div class="link-title">📍 Khám phá Day 1: Nền tảng GenAI & Kỹ thuật Prompt</div>
            <div class="link-desc">Tìm hiểu 4 lớp Prompt, Temperature & Top_p, Token và Attention (29 trang slide)</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
        <div class="deep-link-card" onclick="switchView('spoke', 2)">
          <div>
            <div class="link-title">📍 Khám phá Day 2: Xác định bài toán kinh doanh cho AI</div>
            <div class="link-desc">Xem Double Diamond, Automate vs Augment, Rule/Workflow/Agent và Khung Go/Not Yet (29 trang slide)</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
  } else {
    bodyHtml = `
      <p>Mình đã ghi nhận câu hỏi của bạn. Hệ thống hiện có 2 buổi học chính thức, mời bạn chọn một trong 2 bài học bên dưới để vào học trực tiếp cùng Bot Con:</p>
      <div class="deep-links-container">
        <div class="deep-link-card" onclick="switchView('spoke', 1)">
          <div>
            <div class="link-title">📍 Vào học Day 1: Nền tảng GenAI & Kỹ thuật Prompt</div>
            <div class="link-desc">Tìm hiểu Zero-shot, Few-shot, Temperature và cơ chế dự đoán token (29 trang slide)</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
        <div class="deep-link-card" onclick="switchView('spoke', 2)">
          <div>
            <div class="link-title">📍 Vào học Day 2: Xác định bài toán kinh doanh cho AI</div>
            <div class="link-desc">Trao đổi với Bot Con Day 2 để tìm hiểu Cost of Error và Prompt Chaining (29 trang slide)</div>
          </div>
          <span class="link-arrow">→</span>
        </div>
      </div>
    `;
    assistantSummary = 'Hệ thống hiện có 2 buổi học chính thức: Day 1 và Day 2.';
  }

  hubChatHistory.push({ role: 'user', content: query });
  hubChatHistory.push({ role: 'assistant', content: assistantSummary });
  if (hubChatHistory.length > 24) {
    hubChatHistory.splice(0, hubChatHistory.length - 24);
  }
  saveSessionState();
  appendBotMessage(hubChatViewport, 'Bot Hỗ Trợ', 'Course Navigator', bodyHtml);
}

// Clear Chat History & Reset Memory (Hub & Spoke)
function clearHubChat() {
  hubChatHistory.length = 0;
  lastHubContext = { day: null, page: null, topic: null };
  saveSessionState(); // #6
  const viewport = document.getElementById('hubChatViewport');
  if (viewport) {
    viewport.innerHTML = `
      <div class="chat-message bot-message">
        <div class="avatar bot-avatar">🧭</div>
        <div class="message-body">
          <div class="sender-info">
            <span class="sender-name">Bot Hỗ Trợ</span>
            <span class="sender-badge">Course Navigator</span>
            <span class="time">Vừa xong</span>
          </div>
          <div class="message-text">
            Chào bạn! Lịch sử hội thoại đã được làm mới. Mình là <strong>Bot Hỗ Trợ</strong>, nắm toàn bộ bài giảng của <strong>Day 01 (Nền tảng GenAI - 29 trang slide)</strong> và <strong>Day 02 (Xác định bài toán & Kỹ thuật Prompt - 29 trang slide)</strong>. Bạn muốn tìm hiểu nội dung nào?
          </div>
        </div>
      </div>
    `;
  }
}

function clearSpokeChat() {
  if (spokeChatHistory[currentDay]) {
    spokeChatHistory[currentDay] = [];
  }
  saveSessionState(); // #6
  const cfg = DAY_CONFIG[currentDay];
  const viewport = document.getElementById('spokeChatViewport');
  if (viewport) {
    viewport.innerHTML = `
      <div class="chat-message bot-message">
        <div class="avatar spoke-avatar">📖</div>
        <div class="message-body">
          <div class="sender-info">
            <span class="sender-name">Bot Con Day ${currentDay}</span>
            <span class="sender-badge">In-Lecture Tutor</span>
            <span class="time">Vừa xong</span>
          </div>
          <div class="message-text">
            ${cfg ? cfg.welcomeMsg : 'Chào bạn! Lịch sử trò chuyện đã được làm mới.'}
          </div>
        </div>
      </div>
    `;
  }
}

// ==========================================================================
// LIVE AI CALL MODULE (SECURE BACKEND PROXY & LOGGING FOR CP3)
// ==========================================================================
async function callLiveAI(systemPrompt, userQuery, chatHistory = [], timeoutMs = 20000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
    console.warn(`⏱️ [TIMEOUT]: Yêu cầu AI vượt quá ${timeoutMs / 1000}s → tự động fallback sang Local RAG Engine.`);
  }, timeoutMs);

  try {
    const startTime = performance.now();
    const res = await fetch(API_CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt, userQuery, chatHistory }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`⚠️ [API Backend Error HTTP ${res.status}]:`, errText);
      return null;
    }

    const data = await res.json();
    const elapsed = Math.round(performance.now() - startTime);
    console.group(`🤖 [LIVE AI CALL - BACKEND SECURE PROXY: ${data.engineName || 'NVIDIA NIM'}]`);
    console.log(`📥 [USER QUERY]: "${userQuery}" | Context History: ${chatHistory.length} turns`);
    console.log(`⏱️ [LATENCY]: ${elapsed}ms | STATUS: 200 OK | ENGINE: ${data.engineName}`);
    console.log('📤 [AI REPLY]:', data.text);
    console.groupEnd();

    return {
      text: data.text,
      engineName: data.engineName || 'NVIDIA NIM (Llama 3.2)'
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.warn('⏱️ [TIMEOUT FALLBACK]: Chuyển sang Local RAG Engine sau 10 giây chờ.');
    } else {
      console.warn('ℹ️ Backend server chưa khởi chạy hoặc không kết nối được (chuyển sang Local RAG Engine):', err.message);
    }
    return null;
  }
}


// ==========================================================================
// TẦNG 2: BOT CON (IN-LECTURE SPOKE LOGIC WITH STRICT SCOPE ISOLATION)
// ==========================================================================
async function submitSpokeQuery() {
  const query = spokeQueryInput.value.trim();
  if (!query) return;

  // Append User message
  appendMessage(spokeChatViewport, 'user', query);
  spokeQueryInput.value = '';

  const lower = query.toLowerCase();

  // 1. Anti-Cheat / Quiz Direct Answer Guardrail (Improved Regex Pattern)
  const quizGuardrailRegex = /(đáp án|đáp án là|chọn câu|trắc nghiệm|a, b, c hay d|lựa chọn đúng|phương án đúng|option [a-d]|chọn [a-d]\b|câu trả lời đúng|đúng là [a-d]\b|[a-d] hay [a-d])/i;
  if (quizGuardrailRegex.test(lower)) {
    const refusal = `
      <p>Mình là gia sư định hướng phương pháp, không cung cấp đáp án trực tiếp cho bài trắc nghiệm. Bạn hãy xem kỹ nội dung trên slide đang mở và dựa vào nguyên lý cốt lõi để tự tin chọn đáp án nhé!</p>
      <div class="citation-badge">📌 Gia sư không giải hộ quiz — [Trang ${currentPageNumber} - Slide Day ${currentDay}]</div>
    `;
    appendBotMessage(spokeChatViewport, `Bot Con Day ${currentDay}`, 'Scope Guardrail', refusal);
    return;
  }

  // 2. Hub & Spoke Scope Isolation Check (Strict Context Sandboxing)
  const scope = detectQueryScope(query);

  // CASE A: User is in Day 1, but asks about Day 2 concepts
  if (currentDay === 1 && scope.day === 2) {
    const alertHtml = `
      <div class="scope-boundary-card">
        <div class="scope-boundary-header">
          <span>🛡️ Giới hạn phạm vi: Khái niệm thuộc Day 02</span>
        </div>
        <div class="scope-boundary-body">
          <p>Bạn đang trao đổi với <strong>Bot Con Day 1 (Nền tảng GenAI)</strong>. Chủ đề bạn vừa hỏi (liên quan đến <em>"${escapeHtml(scope.topic)}"</em>) thuộc bài học <strong>Day 2: Xác định bài toán kinh doanh cho AI & Mức tự động hóa</strong> (Slide Day 2).</p>
          <p>Để đảm bảo tính cô lập tri thức theo mô hình Hub & Spoke, Bot Con Day 1 không được phép giải thích bài học của ngày khác. Mời bạn bấm chuyển sang Day 2 để được hỗ trợ chuyên sâu nhé!</p>
        </div>
        <div class="scope-boundary-action">
          <button class="btn-switch-day" onclick="switchView('spoke', 2)">
            👉 Chuyển sang Day 2 ngay (Mở Slide Day 2)
          </button>
        </div>
      </div>
    `;
    appendBotMessage(spokeChatViewport, `Bot Con Day 1`, 'Scope Guardrail', alertHtml);
    return;
  }

  // CASE B: User is in Day 2, but asks about Day 1 concepts
  if (currentDay === 2 && scope.day === 1) {
    const alertHtml = `
      <div class="scope-boundary-card">
        <div class="scope-boundary-header">
          <span>🛡️ Giới hạn phạm vi: Khái niệm thuộc Day 01</span>
        </div>
        <div class="scope-boundary-body">
          <p>Bạn đang trao đổi với <strong>Bot Con Day 2 (Prompt Nâng cao & Bài toán AI)</strong>. Chủ đề bạn vừa hỏi (liên quan đến <em>"${escapeHtml(scope.topic)}"</em>) đã được giảng dạy tại <strong>Day 1: Nền tảng GenAI & Kỹ thuật Prompt Engineering cơ bản</strong> (Slide Day 1).</p>
          <p>Để đảm bảo tính cô lập tri thức theo mô hình Hub & Spoke, Bot Con Day 2 chỉ giải đáp nội dung Day 2. Mời bạn bấm quay về Day 1 để tra cứu lại nhé!</p>
        </div>
        <div class="scope-boundary-action">
          <button class="btn-switch-day" onclick="switchView('spoke', 1)">
            👈 Quay lại Day 1 ngay (Mở Slide Day 1)
          </button>
        </div>
      </div>
    `;
    appendBotMessage(spokeChatViewport, `Bot Con Day 2`, 'Scope Guardrail', alertHtml);
    return;
  }

  // CASE C: Asks about topics outside Day 1 & Day 2 (e.g. RAG, Agents, ReAct, Day 3, Day 4...)
  if (scope.day === 'out_of_scope' || scope.day === 3 || scope.day === 4) {
    const alertHtml = `
      <div class="scope-boundary-card">
        <div class="scope-boundary-header">
          <span>⚠️ Nằm ngoài dữ liệu bài giảng hiện có</span>
        </div>
        <div class="scope-boundary-body">
          <p>Kho bài giảng hiện tại của hệ thống chỉ có dữ liệu bài giảng chính thức của <strong>Day 01</strong> (Nền tảng GenAI - 29 slide) và <strong>Day 02</strong> (Xác định bài toán & Kỹ thuật Prompt - 29 slide).</p>
          <p>Chủ đề bạn vừa hỏi (<em>"${escapeHtml(scope.topic || 'khái niệm mở rộng')}"</em>) chưa có trong bộ slide được tải lên hệ thống. Mời bạn quay lại <strong>Bot Hỗ Trợ</strong> hoặc tiếp tục trao đổi về nội dung của Day ${currentDay} nhé!</p>
        </div>
        <div class="scope-boundary-action">
          <button class="btn-switch-day" onclick="switchView('hub')">
            🧭 Về Bot Hỗ Trợ
          </button>
        </div>
      </div>
    `;
    appendBotMessage(spokeChatViewport, `Bot Con Day ${currentDay}`, 'Scope Guardrail', alertHtml);
    return;
  }

  // 3. Question is Valid & IN-SCOPE for current Day!
  // Check whether the user is asking a follow-up, clarification, or continuation:
  const isFollowUp = isFollowUpQuery(query);
  let targetPage = null;

  if (isFollowUp) {
    // CONVERSATION MEMORY: Keep current slide context when following up
    targetPage = lastReferencedSlide[currentDay] || currentPageNumber || 1;
    console.log(`🧠 [CONVERSATION MEMORY]: Câu hỏi nối tiếp/làm rõ ("${query}") -> Duy trì ngữ cảnh Slide Trang ${targetPage}`);
  } else {
    // User is asking about a new concept or topic
    const matchedPage = findBestMatchingSlidePage(currentDay, query);
    if (matchedPage) {
      targetPage = matchedPage;
    } else {
      if (currentDay === 1) {
        if (lower.includes('4 lớp') || lower.includes('bốn lớp') || lower.includes('cấu trúc prompt') || lower.includes('system instruction') || lower.includes('lời dặn')) targetPage = 28;
        else if (lower.includes('temperature') || lower.includes('top_p') || lower.includes('top-p') || lower.includes('núm vặn') || lower.includes('nhiệt độ')) targetPage = 29;
        else if (lower.includes('attention') || lower.includes('chú ý') || lower.includes('tự chú ý')) targetPage = 15;
        else if (lower.includes('context') || lower.includes('lost in the middle') || lower.includes('bàn làm việc')) targetPage = 14;
        else if (lower.includes('token') || lower.includes('mảnh chữ')) targetPage = 13;
        else if (lower.includes('agent') || lower.includes('5 bộ phận') || lower.includes('vòng lặp') || lower.includes('giải phẫu')) targetPage = 24;
        else if (lower.includes('cot') || lower.includes('chain of thought') || lower.includes('giấy nháp') || lower.includes('nghĩ từng bước')) targetPage = 22;
        else if (lower.includes('chọn model') || lower.includes('tầng 1') || lower.includes('tầng 2') || lower.includes('frontier')) targetPage = 26;
        else if (lower.includes('rlhf') || lower.includes('reward model') || lower.includes('uốn nắn')) targetPage = 19;
        else if (lower.includes('pre-training') || lower.includes('sft') || lower.includes('tạo ra llm')) targetPage = 18;
        else if (lower.includes('transformer') || lower.includes('2017')) targetPage = 8;
        else if (lower.includes('discriminative') || lower.includes('generative') || lower.includes('ba nhóm')) targetPage = 4;
        else if (lower.includes('chi phí') || lower.includes('input token') || lower.includes('output token')) targetPage = 27;
      } else if (currentDay === 2) {
        if (lower.includes('double diamond') || lower.includes('norman') || lower.includes('tìm đúng vấn đề')) targetPage = 3;
        else if (lower.includes('phân kỳ') || lower.includes('hội tụ') || lower.includes('5 whys') || lower.includes('affinity mapping') || lower.includes('diamond 1')) targetPage = 4;
        else if (lower.includes('cursor') || lower.includes('artifact') || lower.includes('notebooklm') || lower.includes('case study')) targetPage = 5;
        else if (lower.includes('4 lenses') || lower.includes('lăng kính') || lower.includes('lặp lại') || lower.includes('tốn thời gian') || lower.includes('điểm đau')) targetPage = 6;
        else if (lower.includes('anti-pattern') || lower.includes('sai lầm') || lower.includes('solution-first')) targetPage = 7;
        else if (lower.includes('pair') || lower.includes('reframe') || lower.includes('how might we') || lower.includes('can ai solve')) targetPage = 8;
        else if (lower.includes('quick problem card') || lower.includes('problem card') || lower.includes('thẻ bài toán')) targetPage = 9;
        else if (lower.includes('định lượng') || lower.includes('baseline') || lower.includes('target') || lower.includes('measurement')) targetPage = 11;
        else if (lower.includes('khi nào ai không tốt') || lower.includes('không nên dùng ai') || lower.includes('lỗi quá tốn kém') || lower.includes('chi phí sai sót') || lower.includes('cost of error')) targetPage = 15;
        else if (lower.includes('hệ thống ai') || lower.includes('kiến trúc') || lower.includes('model context planning tools')) targetPage = 16;
        else if (lower.includes('automate') || lower.includes('augment') || lower.includes('tự động hóa') || lower.includes('tự động hoá')) targetPage = 17;
        else if (lower.includes('rule') || lower.includes('workflow') || lower.includes('agent') || lower.includes('3 cấp độ') || lower.includes('3 mức giải pháp')) targetPage = 18;
        else if (lower.includes('prompt chaining') || lower.includes('routing') || lower.includes('parallelization') || lower.includes('workflow patterns')) targetPage = 20;
        else if (lower.includes('reward function') || lower.includes('hàm thưởng') || lower.includes('fp') || lower.includes('tp') || lower.includes('fn') || lower.includes('tn') || lower.includes('báo động giả')) targetPage = 22;
        else if (lower.includes('precision') || lower.includes('recall') || lower.includes('đánh đổi')) targetPage = 23;
        else if (lower.includes('problem statement') || lower.includes('9 trường') || lower.includes('actor') || lower.includes('bottleneck')) targetPage = 27;
        else if (lower.includes('go') || lower.includes('not yet') || lower.includes('no-go') || lower.includes('khung ra quyết định')) targetPage = 28;
        else if (lower.includes('6 nguyên tắc') || lower.includes('nguyên tắc cốt lõi') || lower.includes('recap')) targetPage = 29;
      }
    }
  }

  if (!targetPage) targetPage = lastReferencedSlide[currentDay] || currentPageNumber || 1;
  lastReferencedSlide[currentDay] = targetPage;

  // Auto-synchronize the slide canvas to the exact page ONLY if page changes!
  if (targetPage !== currentPageNumber) {
    jumpSlideDirect(targetPage);
  }

  // Show typing indicator
  const typingIndicator = appendTypingIndicator(spokeChatViewport, `Bot Con Day ${currentDay}`);

  const cfg = DAY_CONFIG[currentDay];
  const slideTextGrounding = getSlideGroundingText(currentDay, targetPage);

  const systemContext = `Bạn là Bot Con AI Tutor độc quyền của Buổi học Day ${currentDay}: ${cfg.courseTitle}.
TÀI LIỆU SLIDE CÔ LẬP DUY NHẤT BẠN ĐƯỢC PHÉP TRUY CẬP: File slide ${cfg.slideFile} (Học viên đang mở Trang ${targetPage}).
[TRÍCH XUẤT NỘI DUNG THẬT TỪ SLIDE TRANG ${targetPage}]:
"""
${slideTextGrounding}
"""
QUY TẮC BẢO MẬT & PHẠM VI (HUB & SPOKE - TUYỆT ĐỐI TUÂN THỦ):
1. GIỚI HẠN BÀI HỌC CỐT LÕI: Bạn CHỈ ĐƯỢC GIẢI THÍCH CHI TIẾT KIẾN THỨC CÓ TRONG BÀI GIẢNG SLIDE DAY ${currentDay}. TUYỆT ĐỐI KHÔNG ĐƯỢC ĐƯA RA NGOÀI PHẠM VI BÀI HỌC.
2. TỪ CHỐI KIẾN THỨC NGOÀI SLIDE: Nếu học viên hỏi về các khái niệm nằm ngoài bài giảng Day ${currentDay} (như RAG, ReAct, Vector DB, Fine-tuning, hoặc bài học của Day khác), bạn PHẢI từ chối lịch sự, nêu rõ chủ đề này không nằm trong bài giảng Day ${currentDay}, và hướng dẫn học viên quay lại Bot Hỗ Trợ trung tâm để được tìm hiểu mở rộng.
3. PHƯƠNG PHÁP SƯ PHẠM & TRỰC QUAN: Đối với các kiến thức thuộc bài học, bạn hãy giải thích chi tiết, sư phạm, trực quan và dễ hiểu, có ví dụ minh họa thực tế để học viên thực sự nắm chắc bản chất bài học.
4. DUY TRÌ TRÍ NHỚ HỘI THOẠI: Kết nối tự nhiên với các lượt trao đổi trước đó trong lịch sử để giải đáp sâu sắc các câu hỏi làm rõ, ví dụ thêm, hoặc so sánh của học viên.
5. Bắt buộc kết thúc câu trả lời bằng mã trích dẫn: [Trang ${targetPage} - Slide Day ${currentDay}].
6. Bảo vệ liêm chính học thuật: Tuyệt đối không cung cấp đáp án trắc nghiệm A/B/C/D.`;

  // Prepare recent history turns for context continuity (clean HTML & truncate to keep tokens small)
  const historyForAPI = (spokeChatHistory[currentDay] || []).slice(-8).map(m => {
    const cleanContent = String(m.content).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return {
      role: m.role,
      content: m.role === 'assistant' ? cleanContent.slice(0, 220) : cleanContent.slice(0, 300)
    };
  });

  // Ưu tiên gọi AI Thật qua Backend Server bảo mật
  const liveResult = await callLiveAI(systemContext, query, historyForAPI);
  if (liveResult && liveResult.text) {
    typingIndicator.remove();

    if (!liveResult.text.includes('[Trang')) {
      liveResult.text += ` [Trang ${targetPage} - Slide Day ${currentDay}]`;
    }

    // Lưu vào bộ nhớ hội thoại
    spokeChatHistory[currentDay].push({ role: 'user', content: query });
    spokeChatHistory[currentDay].push({ role: 'assistant', content: liveResult.text });
    if (spokeChatHistory[currentDay].length > 20) {
      spokeChatHistory[currentDay] = spokeChatHistory[currentDay].slice(-20);
    }
    saveSessionState(); // #6

    const linkCardHtml = renderSlideLinkCard(currentDay, targetPage, liveResult.engineName);
    const formattedHtml = `
      ${formatAiResponse(liveResult.text, currentDay)}
      ${linkCardHtml}
    `;
    appendBotMessage(spokeChatViewport, `Bot Con Day ${currentDay}`, liveResult.engineName, formattedHtml);
    return;
  }

  // Fallback sang Động cơ RAG Cục bộ nếu Backend Server chưa chạy hoặc lỗi mạng
  setTimeout(() => {
    typingIndicator.remove();
    processSpokeResponse(query, targetPage);
  }, 450);
}

function processSpokeResponse(query, targetPage) {
  const lower = query.toLowerCase();
  let answerText = '';
  let citation = `[Trang ${targetPage} - Slide Day ${currentDay}]`;

  if (currentDay === 1) {
    if (lower.includes('4 lớp') || lower.includes('bốn lớp') || lower.includes('cấu trúc prompt') || lower.includes('system instruction')) {
      answerText = `Cấu trúc một prompt chuẩn mực gồm 4 lớp: Lớp 1 là System instruction (lời dặn đầu ca về vai trò và giới hạn); Lớp 2 là User input (yêu cầu trong lượt này); Lớp 3 là Context bổ sung (tài liệu tra sổ bày lên bàn làm việc); và Lớp 4 là Output mong muốn (định dạng kết quả trả lời). Viết rõ cả 4 lớp là bạn đã làm tốt một nửa kỹ nghệ prompt.`;
      citation = `[Trang 28 - Slide Day 1]`;
    } else if (lower.includes('temperature') || lower.includes('top_p') || lower.includes('top-p') || lower.includes('núm vặn') || lower.includes('nhiệt độ')) {
      answerText = `Temperature là "núm vặn độ liều": T = 0 giúp câu trả lời tất định, ổn định và hợp với code hoặc phân tích dữ liệu, còn T cao làm tăng tính đa dạng nhưng dễ lạc đề. Top_p chỉ giữ lại nhóm token có xác suất cộng dồn >= p (thường 0.9) để loại bỏ các từ đuôi dài rủi ro. Cả hai núm này chỉ thay đổi cách chọn từ chứ không làm model thông minh hơn.`;
      citation = `[Trang 29 - Slide Day 1]`;
    } else if (lower.includes('attention') || lower.includes('chú ý') || lower.includes('tự chú ý')) {
      answerText = `Cơ chế Attention cho phép mỗi token chủ động quay đầu nhìn lại các token trước đó trong câu để chấm điểm mức độ liên quan và khóa nghĩa theo ngữ cảnh. Đây là bước ngoặt kỹ thuật cốt lõi giúp Transformer hiểu sâu sắc văn bản thay vì chỉ đọc tuần tự từng chữ.`;
      citation = `[Trang 15 - Slide Day 1]`;
    } else if (lower.includes('context') || lower.includes('lost in the middle') || lower.includes('bàn làm việc')) {
      answerText = `Context là "bàn làm việc có hạn" của model, mọi thứ muốn model thấy đều phải bày lên bàn. Hiện tượng Lost in the Middle chỉ ra rằng model chú ý nhiều nhất ở đầu và cuối prompt, thông tin quan trọng đặt ở giữa rất dễ bị bỏ sót.`;
      citation = `[Trang 14 - Slide Day 1]`;
    } else if (lower.includes('agent') || lower.includes('5 bộ phận') || lower.includes('vòng lặp') || lower.includes('giải phẫu')) {
      answerText = `Một AI Agent là một vòng lặp gồm 5 bộ phận: Goal (mục tiêu cần đạt) → Reasoning (bộ não LLM chia bước) → Tools (công cụ thực thi) → Memory (sổ tay ghi nhớ các bước) → Action (hành động thực tế). Vòng lặp này lặp lại liên tục cho đến khi hoàn thành mục tiêu.`;
      citation = `[Trang 24 - Slide Day 1]`;
    } else if (lower.includes('cot') || lower.includes('chain of thought') || lower.includes('giấy nháp')) {
      answerText = `Chain-of-Thought (Wei et al. 2022) cho phép mô hình viết nháp suy luận từng bước trước khi đưa ra kết quả cuối cùng. Kỹ thuật này giúp giải quyết các bài toán số học hoặc logic phức tạp, biến câu trả lời từ sai thành đúng.`;
      citation = `[Trang 22 - Slide Day 1]`;
    } else if (lower.includes('token') || lower.includes('mảnh chữ')) {
      answerText = `Model không đọc từ nguyên vẹn mà chia nhỏ văn bản thành các mảnh gọi là token. Tiếng Việt và JSON tốn token hơn tiếng Anh do dấu thanh và ký tự đặc biệt, và mỗi token vào hay ra đều có chi phí tính tiền riêng.`;
      citation = `[Trang 13 - Slide Day 1]`;
    } else {
      answerText = `Khái niệm bạn đang hỏi được trích xuất trực tiếp từ slide Trang ${targetPage} của bài học Day 1 (Nền tảng GenAI & LLM Foundation). Bạn có thể theo dõi slide đang hiển thị ở khung bên trái để nắm cấu trúc chi tiết!`;
      citation = `[Trang ${targetPage} - Slide Day 1]`;
    }
  } else if (currentDay === 2) {
    if (lower.includes('double diamond') || lower.includes('norman') || lower.includes('tìm đúng vấn đề')) {
      answerText = `Mô hình Double Diamond gồm hai viên kim cương: Diamond 1 là Tìm đúng vấn đề (phân kỳ để khám phá và hội tụ để định nghĩa bài toán gốc); Diamond 2 là Tìm đúng giải pháp (phân kỳ thử nghiệm và hội tụ để triển khai). Giải pháp xuất sắc cho sai vấn đề còn tệ hơn không có giải pháp.`;
      citation = `[Trang 3 - Slide Day 2]`;
    } else if (lower.includes('automate') || lower.includes('augment') || lower.includes('tự động hóa') || lower.includes('tự động hoá')) {
      answerText = `Theo Google PAIR, chọn Automate (AI làm thay) khi tác vụ lặp lại, tẻ nhạt, có đáp án đúng đồng thuận và chi phí sai sót thấp. Ngược lại, chọn Augment (AI hỗ trợ con người) khi bài toán có rủi ro cao về tiền bạc, pháp lý hoặc cần trách nhiệm cá nhân của con người.`;
      citation = `[Trang 17 - Slide Day 2]`;
    } else if (lower.includes('rule') || lower.includes('workflow') || lower.includes('agent') || lower.includes('3 cấp độ') || lower.includes('3 mức giải pháp')) {
      answerText = `Hệ thống chia làm ba cấp độ kỹ thuật: Cấp 1 là Rule/Script (logic if/else cố định, đúng 100%); Cấp 2 là LLM Feature/Workflow (đầu vào linh hoạt, có gate kiểm tra); Cấp 3 là Agent (tự gọi tool và tự ra quyết định). Luôn ưu tiên giải pháp đơn giản nhất, chỉ tăng độ phức tạp khi thực sự cần thiết.`;
      citation = `[Trang 18 - Slide Day 2]`;
    } else if (lower.includes('prompt chaining') || lower.includes('routing') || lower.includes('parallelization') || lower.includes('workflow patterns')) {
      answerText = `Có 3 mẫu workflow cơ bản: Prompt Chaining (chia chuỗi bước tuần tự có gate kiểm tra để đổi độ trễ lấy độ chính xác); Routing (phân nhánh để câu dễ đi model rẻ, câu khó đi model mạnh); và Parallelization (chạy song song rồi tổng hợp hoặc vote để giảm rủi ro).`;
      citation = `[Trang 20 - Slide Day 2]`;
    } else if (lower.includes('reward function') || lower.includes('fp') || lower.includes('fn') || lower.includes('hàm thưởng')) {
      answerText = `Reward Function định nghĩa cách hệ thống hiểu đúng/sai qua ma trận nhầm lẫn: False Positive (báo động giả) và False Negative (bỏ sót). Chi phí của FP và FN không đối xứng nhau, việc lựa chọn ưu tiên bên nào sẽ quyết định trực tiếp trải nghiệm của người dùng cuối.`;
      citation = `[Trang 22 - Slide Day 2]`;
    } else if (lower.includes('go') || lower.includes('not yet') || lower.includes('no-go')) {
      answerText = `Khung quyết định gồm 3 trạng thái: Go (bài toán rõ ràng, chỉ số khả thi, kiểm soát được rủi ro); Not Yet (có triển vọng nhưng cần bổ sung dữ liệu thực tế và chuẩn hóa quy trình); No-Go (AI không mang lại giá trị vượt trội hoặc giải pháp phi AI tối ưu hơn).`;
      citation = `[Trang 28 - Slide Day 2]`;
    } else if (lower.includes('problem statement') || lower.includes('9 trường') || lower.includes('actor') || lower.includes('bottleneck')) {
      answerText = `Một Problem Statement chuẩn cho hệ thống AI gồm 6 yếu tố bài toán cốt lõi (Actor, Workflow, Bottleneck, Impact, Success Metric, Boundary) kết hợp với 3 yếu tố quyết định AI (Điểm can thiệp, Mức chọn Rule/Workflow/Agent, Rủi ro & HITL).`;
      citation = `[Trang 27 - Slide Day 2]`;
    } else {
      answerText = `Khái niệm bạn vừa hỏi được định nghĩa chi tiết tại slide bài giảng đang mở của Day 2 (Xác định bài toán kinh doanh cho AI & Mức tự động hóa). Bạn có thể tham khảo trực tiếp cấu trúc và ví dụ ở khung slide bên trái!`;
      citation = `[Trang ${targetPage} - Slide Day 2]`;
    }
  }

  // Lưu vào bộ nhớ hội thoại
  spokeChatHistory[currentDay].push({ role: 'user', content: query });
  spokeChatHistory[currentDay].push({ role: 'assistant', content: answerText });
  if (spokeChatHistory[currentDay].length > 12) {
    spokeChatHistory[currentDay] = spokeChatHistory[currentDay].slice(-12);
  }
  saveSessionState(); // #6

  const linkCardHtml = renderSlideLinkCard(currentDay, targetPage, 'VLearn Local Engine');
  const linkifiedText = linkifySlideCitations(escapeHtml(answerText), currentDay);
  const html = `
    <p>${linkifiedText}</p>
    ${linkCardHtml}
  `;
  appendBotMessage(spokeChatViewport, `Bot Con Day ${currentDay}`, 'In-Lecture Tutor', html);
}

// Helpers for Chat UI
function appendMessage(viewport, type, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${type}-message`;
  
  const avatar = type === 'user' ? '🧑‍🎓' : '🤖';
  const name = type === 'user' ? 'Học viên' : 'Trợ lý';

  msgDiv.innerHTML = `
    <div class="avatar ${type}-avatar">${avatar}</div>
    <div class="message-body">
      <div class="sender-info">
        <span class="sender-name">${name}</span>
        <span class="time">Vừa xong</span>
      </div>
      <div class="message-text">${escapeHtml(text)}</div>
    </div>
  `;
  viewport.appendChild(msgDiv);
  requestAnimationFrame(() => { viewport.scrollTop = viewport.scrollHeight; });
}

function appendBotMessage(viewport, name, badge, htmlContent) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message bot-message';
  const avatar = name.includes('Con') ? '📖' : '🧭';

  msgDiv.innerHTML = `
    <div class="avatar ${name.includes('Con') ? 'spoke' : 'bot'}-avatar">${avatar}</div>
    <div class="message-body">
      <div class="sender-info">
        <span class="sender-name">${name}</span>
        <span class="sender-badge">${badge}</span>
        <span class="time">Vừa xong</span>
      </div>
      <div class="message-text">${htmlContent}</div>
    </div>
  `;
  viewport.appendChild(msgDiv);
  requestAnimationFrame(() => { viewport.scrollTop = viewport.scrollHeight; });
}

function appendTypingIndicator(viewport, name) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message bot-message typing';
  const avatar = name.includes('Con') ? '📖' : '🧭';
  msgDiv.innerHTML = `
    <div class="avatar bot-avatar">${avatar}</div>
    <div class="message-body" style="padding: 0.6rem 1rem; flex: 1;">
      <div class="thinking-progress-wrap">
        <div class="thinking-label">
          <span style="font-size:0.82rem; color:var(--text-muted);">${name} đang định vị và xử lý...</span>
          <span class="thinking-timer" id="thinkingTimer_${Date.now()}">0s</span>
        </div>
        <div class="thinking-progress-bar"></div>
      </div>
    </div>
  `;
  viewport.appendChild(msgDiv);
  requestAnimationFrame(() => { viewport.scrollTop = viewport.scrollHeight; });

  // Start elapsed-time counter
  const timerId = msgDiv.querySelector('.thinking-timer');
  const startTime = Date.now();
  const timerInterval = setInterval(() => {
    if (!document.body.contains(msgDiv)) { clearInterval(timerInterval); return; }
    timerId.textContent = `${Math.round((Date.now() - startTime) / 1000)}s`;
  }, 1000);
  msgDiv._timerInterval = timerInterval;

  return msgDiv;
}


function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Backend Status Polling & Health Indicator
async function checkBackendStatus() {
  const badge = document.getElementById('apiStatusBadge');
  if (!badge) return;
  
  try {
    const res = await fetch(API_STATUS_ENDPOINT);
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'online') {
        const modelLabel = data.model ? data.model.replace('meta/', '') : 'Llama 3.2';
        badge.innerText = `NVIDIA NIM Active (${modelLabel})`;
        badge.className = 'status-indicator ready';
        badge.style.color = '#76b900';
        badge.style.borderColor = 'rgba(118, 185, 0, 0.45)';
        badge.title = `Backend Proxy kết nối an toàn: ${data.model}`;
        return;
      }
    }
  } catch (err) {
    // Backend offline
  }
  
  badge.innerText = 'Engine RAG Sẵn Sàng (Cục Bộ)';
  badge.className = 'status-indicator';
  badge.style.color = '#34d399';
  badge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
  badge.title = 'Chạy `node codebase/server.js` để kích hoạt NVIDIA NIM qua proxy';
}

// ==========================================================================
// IMPROVEMENT #9: Session Summary Modal
// ==========================================================================
async function generateSessionSummary(source = 'hub') {
  const overlay = document.getElementById('summaryModalOverlay');
  const body = document.getElementById('summaryModalBody');
  if (!overlay || !body) return;

  // Show loading state
  body.innerHTML = `
    <div class="summary-thinking">
      <div class="thinking-progress-bar" style="width:200px;"></div>
      <span>Đang tổng hợp nội dung buổi học của bạn...</span>
    </div>
  `;
  overlay.classList.add('visible');

  // Build history for summary
  let historyToSummarize = [];
  let contextLabel = '';

  if (source === 'spoke') {
    historyToSummarize = spokeChatHistory[currentDay] || [];
    const cfg = DAY_CONFIG[currentDay];
    contextLabel = `Bot Con Day ${currentDay} (${cfg ? cfg.courseTitle : 'Bài giảng'})`;
  } else {
    historyToSummarize = hubChatHistory;
    contextLabel = 'Bot Hỗ Trợ (Định vị tri thức Day 1 & Day 2)';
  }

  const userTurns = historyToSummarize.filter(m => m.role === 'user');

  if (userTurns.length === 0) {
    body.innerHTML = `
      <p style="color:var(--text-muted); text-align:center; padding:1.5rem 0;">
        Chưa có câu hỏi nào trong buổi học này. Hãy bắt đầu đặt câu hỏi để tạo tóm tắt nhé!
      </p>
    `;
    return;
  }

  // Build compact Q&A for the prompt
  const historyText = historyToSummarize
    .filter(m => m.role !== 'system')
    .slice(-20)
    .map(m => `${m.role === 'user' ? 'Học viên' : 'Bot'}: ${m.content}`)
    .join('\n');

  const summaryPrompt = `Bạn là trợ lý tổng kết buổi học. Dựa trên lịch sử hội thoại bên dưới của ${contextLabel}, hãy tổng hợp ngắn gọn:
1. Những chủ đề / khái niệm nào học viên đã hỏi (gạch đầu dòng, 5–8 mục).
2. Những điểm cốt lõi học viên đã được giải đáp.
3. Gợi ý 1–2 chủ đề tiếp theo nên xem kỹ.
Trả lời bằng tiếng Việt, súc tích, dùng emoji phù hợp để dễ đọc.

LỊCH SỬ HỘI THOẠI:
"""
${historyText}
"""`;

  try {
    const result = await callLiveAI(
      'Bạn là trợ lý tổng kết buổi học AI Thực Chiến.',
      summaryPrompt,
      [],
      15000
    );

    if (result && result.text) {
      const formatted = result.text
        .split('\n')
        .map(line => {
          if (line.match(/^#+\s/)) return `<strong style="color:#c084fc;font-size:0.95rem;">${line.replace(/^#+\s/, '')}</strong>`;
          if (line.match(/^[-•*]\s/)) return `<li style="margin:0.3rem 0 0.3rem 1rem;">${line.replace(/^[-•*]\s/, '')}</li>`;
          if (line.trim() === '') return '<br>';
          return `<span>${line}</span>`;
        })
        .join('\n');

      body.innerHTML = `
        <div style="margin-bottom:0.8rem; padding:0.5rem 0.8rem; background:rgba(157,78,221,0.08); border-radius:8px; border-left:3px solid #9d4edd;">
          <small style="color:var(--text-muted);">${contextLabel} · ${userTurns.length} câu hỏi đã hỏi</small>
        </div>
        <div style="line-height:1.7;">${formatted}</div>
      `;
      return;
    }
  } catch (e) {
    // Fallback to offline summary
  }

  // Offline fallback summary
  const topics = userTurns.slice(0, 8)
    .map(m => `<li style="margin:0.3rem 0 0.3rem 1rem;">• ${m.content.slice(0, 80)}${m.content.length > 80 ? '...' : ''}</li>`)
    .join('');
  body.innerHTML = `
    <div style="margin-bottom:0.8rem; padding:0.5rem 0.8rem; background:rgba(157,78,221,0.08); border-radius:8px; border-left:3px solid #9d4edd;">
      <small style="color:var(--text-muted);">${contextLabel} · ${userTurns.length} câu hỏi đã hỏi (tóm tắt cục bộ)</small>
    </div>
    <p><strong>📋 Câu hỏi đã đặt trong buổi học:</strong></p>
    <ul style="list-style:none;">${topics}</ul>
    <p style="margin-top:0.8rem;color:var(--text-muted);font-size:0.85rem;">💡 Bật Backend NVIDIA NIM để tạo tóm tắt AI thông minh hơn.</p>
  `;
}

function closeSummaryModal(event) {
  if (event && event.target !== document.getElementById('summaryModalOverlay')) return;
  const overlay = document.getElementById('summaryModalOverlay');
  if (overlay) overlay.classList.remove('visible');
}
