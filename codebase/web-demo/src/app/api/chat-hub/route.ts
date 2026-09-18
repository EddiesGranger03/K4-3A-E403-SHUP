import { NextResponse } from "next/server";
import { callUniversalLLM } from "@/lib/aiProvider";
import fs from "fs";
import path from "path";

// ── Slide Heuristic Mapping cho Day 1 & Day 2 ─────────────────────────────────
const SPECIFIC_SLIDE_KEYWORDS: Array<{
  day: number;
  slide: number;
  concept: string;
  keywords: string[];
}> = [
  // Day 1
  { day: 1, slide: 3, concept: "Hệ Thống Các Tầng AI", keywords: ["tầng ai", "tầng", "hierarchy", "deep learning", "machine learning", "generative ai", "genai", "mối quan hệ", "phân cấp ai"] },
  { day: 1, slide: 4, concept: "Ba Nhóm AI Chính", keywords: ["ba nhóm", "3 nhóm", "discriminative", "phân loại", "sinh nội dung", "hành động", "nhóm ai"] },
  { day: 1, slide: 5, concept: "Lịch Sử AI 70 Năm", keywords: ["lịch sử ai", "70 năm", "turing", "1950", "khai sinh"] },
  { day: 1, slide: 6, concept: "Hệ Chuyên Gia (1980)", keywords: ["hệ chuyên gia", "expert system", "1980"] },
  { day: 1, slide: 7, concept: "ImageNet & Dữ Liệu Lớn (2009)", keywords: ["imagenet", "fei-fei li", "2009", "dữ liệu lớn"] },
  { day: 1, slide: 8, concept: "Transformer & Self-Attention (2017)", keywords: ["transformer", "self-attention", "2017", "bước ngoặt"] },
  { day: 1, slide: 9, concept: "ChatGPT Bùng Nổ (2022)", keywords: ["chatgpt", "openai", "2022", "bùng nổ ai", "2019"] },
  { day: 1, slide: 10, concept: "Bản Chất LLM (Bộ Não Nền Tảng)", keywords: ["llm là gì", "khái niệm llm", "large language model", "bộ não nền tảng", "không phải chatbot"] },
  { day: 1, slide: 11, concept: "Cơ Chế Dự Đoán Từ Tiếp Theo", keywords: ["dự đoán từ", "sinh văn bản", "next token", "next-token"] },
  { day: 1, slide: 12, concept: "Tham Số Sinh Văn Bản (Temperature)", keywords: ["temperature", "nhiệt độ", "top-p", "top-k", "tham số sinh"] },
  { day: 1, slide: 13, concept: "Token & Chi Phí Mô Hình", keywords: ["token", "tokenizer", "bpe", "chi phí token", "mảnh chữ"] },
  { day: 1, slide: 14, concept: "Context Window & Lost in the Middle", keywords: ["context window", "cửa sổ ngữ cảnh", "lost in the middle", "bàn làm việc"] },
  { day: 1, slide: 15, concept: "Cơ Chế Attention Khóa Nghĩa", keywords: ["attention", "cơ chế chú ý", "chú ý", "ma trận tương quan"] },
  { day: 1, slide: 16, concept: "Scaling Law & Năng Lực Nổi Trội", keywords: ["scaling law", "năng lực emergent", "luật quy mô"] },
  { day: 1, slide: 17, concept: "Tham Số Mô Hình & MoE", keywords: ["tham số", "parameters", "moe", "mixture of experts"] },
  { day: 1, slide: 18, concept: "Quy Trình Huấn Luyện & Pre-training", keywords: ["huấn luyện", "training", "pre-training", "pretraining", "tiền huấn luyện", "overfitting", "dữ liệu thô"] },
  { day: 1, slide: 19, concept: "RLHF & Tinh Chỉnh SFT", keywords: ["rlhf", "sft", "fine-tuning", "human feedback", "đạo đức", "tuân thủ"] },
  { day: 1, slide: 20, concept: "Giới Hạn & Ảo Giác (Hallucination)", keywords: ["ảo giác", "hallucination", "giới hạn llm", "knowledge cutoff"] },
  { day: 1, slide: 21, concept: "AI Agent & Tác Nhân Tự Hành", keywords: ["ai agent", "agent là gì", "tác nhân", "planning", "tool calling"] },
  { day: 1, slide: 22, concept: "Kỹ Thuật Chain-of-Thought (CoT)", keywords: ["chain of thought", "cot", "suy luận từng bước"] },
  { day: 1, slide: 23, concept: "Cấu Trúc Prompt 4 Lớp", keywords: ["prompt engineering", "cấu trúc prompt", "4 lớp prompt", "kỹ thuật prompt"] },

  // Day 2
  { day: 2, slide: 3, concept: "Mô Hình 2 Viên Kim Cương (Double Diamond)", keywords: ["double diamond", "kim cương", "2 viên kim cương", "discover define"] },
  { day: 2, slide: 4, concept: "Giai Đoạn Khám Phá & Định Nghĩa", keywords: ["khám phá bài toán", "định nghĩa bài toán", "problem framing"] },
  { day: 2, slide: 5, concept: "Tư Duy Nguyên Lý Đầu Tiên", keywords: ["first principle", "nguyên lý đầu tiên"] },
  { day: 2, slide: 6, concept: "4 Lăng Kính Đánh Giá Bài Toán AI", keywords: ["4 lăng kính", "lăng kính", "desirability", "feasibility", "viability", "responsibility"] },
  { day: 2, slide: 7, concept: "AI Anti-patterns (Bẫy Chống Mẫu)", keywords: ["anti-pattern", "anti pattern", "chống mẫu", "bẫy ai"] },
  { day: 2, slide: 8, concept: "Google PAIR & Thiết Kế Mental Model", keywords: ["google pair", "pair", "mental model", "hax", "hax guideline"] },
  { day: 2, slide: 9, concept: "Bản Định Nghĩa Bài Toán (Problem Card)", keywords: ["problem card", "quick problem card", "bản định nghĩa bài toán"] },
  { day: 2, slide: 10, concept: "Xác Định Người Dùng & JTBD", keywords: ["jtbd", "jobs to be done", "job executor", "người dùng"] },
  { day: 2, slide: 11, concept: "Định Lượng Điểm Đau & Giá Trị ROI", keywords: ["định lượng", "roi", "tiết kiệm thời gian", "tỷ lệ lỗi"] },
  { day: 2, slide: 12, concept: "Ma Trận Tác Động & Công Sức", keywords: ["ma trận", "impact vs effort", "impact effort"] },
  { day: 2, slide: 13, concept: "Augment vs Automate (Tự Động Hóa)", keywords: ["augment", "automate", "tự động hóa", "hỗ trợ"] },
  { day: 2, slide: 14, concept: "Chi Phí Sai Số (Cost of Error)", keywords: ["cost of error", "chi phí sai số", "graceful failure"] },
];

// ── Tra cứu & Chấm điểm Knowledge Index ───────────────────────────────────────
function search_knowledge_index(query: string, indexData: Record<string, any>) {
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);

  // 1. Kiểm tra bảng ánh xạ trực tiếp các chủ đề then chốt
  for (const item of SPECIFIC_SLIDE_KEYWORDS) {
    if (item.keywords.some((kw) => q.includes(kw))) {
      return [{
        concept_id: `slide_rule_${item.day}_${item.slide}`,
        concept_name: item.concept,
        day: item.day,
        level: "core",
        slides: [item.slide],
        bestSlide: item.slide,
        prerequisites: [],
        keywords: item.keywords,
        summary: `Nội dung ${item.concept} được trình bày chi tiết tại Slide ${item.slide} (Day ${item.day}).`,
        score: 100
      }];
    }
  }

  // 2. Tra cứu toàn diện trong knowledge_index.json
  const scoredMatches: Array<{
    concept_id: string;
    concept_name: string;
    day: number;
    level: string;
    slides: number[];
    bestSlide: number;
    prerequisites: string[];
    keywords: string[];
    summary: string;
    score: number;
  }> = [];

  for (const [id, v] of Object.entries(indexData)) {
    const name = (v.concept_name || "").toLowerCase();
    const idLower = id.toLowerCase();
    const keywords: string[] = (v.keywords || []).map((k: string) => k.toLowerCase());
    const summary = (v.summary || "").toLowerCase();

    // Thu thập toàn bộ slides từ cả `slides` và `slide_refs`
    const allSlides: number[] = [];
    if (Array.isArray(v.slides)) {
      for (const s of v.slides) {
        if (typeof s === "number" && !allSlides.includes(s)) allSlides.push(s);
      }
    }
    if (Array.isArray(v.slide_refs)) {
      for (const r of v.slide_refs) {
        if (typeof r.page === "number" && !allSlides.includes(r.page)) allSlides.push(r.page);
      }
    }
    if (allSlides.length === 0) allSlides.push(1);

    // Xác định slide phù hợp nhất dựa trên quote trong slide_refs
    let bestSlide = allSlides[0];
    if (Array.isArray(v.slide_refs)) {
      for (const ref of v.slide_refs) {
        const quote = (ref.quote || "").toLowerCase();
        if (tokens.some((tok) => quote.includes(tok))) {
          bestSlide = ref.page;
          break;
        }
      }
    }

    // Tính điểm tương đồng
    let score = 0;
    if (name === q || idLower === q) score += 60;
    else if (name.includes(q) || q.includes(name)) score += 40;
    else if (idLower.includes(q)) score += 30;

    for (const kw of keywords) {
      if (kw === q) score += 40;
      else if (q.includes(kw)) score += 30;
      else if (kw.includes(q)) score += 20;
    }

    const tokenHits = tokens.filter((t) => name.includes(t) || keywords.some((kw) => kw.includes(t)) || summary.includes(t)).length;
    score += tokenHits * 8;

    if (score > 10) {
      scoredMatches.push({
        concept_id: id,
        concept_name: v.concept_name,
        day: v.day || 1,
        level: v.level || "basic",
        slides: allSlides,
        bestSlide,
        prerequisites: v.prerequisites || [],
        keywords: v.keywords || [],
        summary: v.summary || "",
        score
      });
    }
  }

  // Sắp xếp theo điểm số giảm dần
  scoredMatches.sort((a, b) => b.score - a.score);
  return scoredMatches;
}

const ROUTING_FORMAT = `
=== HƯỚNG DẪN TẠO DEEP-LINK ===
Khi điều hướng học viên, bạn PHẢI sử dụng đúng định dạng sau:
- Đến slide cụ thể: [👉 Mở Day X - Slide Y](#deep-link-day-X-slide-Y)
- Đến tổng quan Day: [👉 Mở trợ lý Day X](#deep-link-day-X)
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, studentDay = 2 } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ reply: "Vui lòng nhập câu hỏi để mình hỗ trợ bạn định hướng nhé!" });
    }

    // 1. Load knowledge index
    let indexPath = path.join(process.cwd(), "..", "..", "eval", "knowledge_index.json");
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(process.cwd(), "eval", "knowledge_index.json");
    }
    let indexData: Record<string, any> = {};
    if (fs.existsSync(indexPath)) {
      try {
        indexData = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
      } catch (e) {
        // ignore parse error
      }
    }

    // 2. Tra cứu kiến thức với bộ giải quyết slide thông minh
    const matchedConcepts = search_knowledge_index(query, indexData);

    // 3. Load Hub Prompt
    let promptPath = path.join(process.cwd(), "..", "bots", "hub_bot_prompt.txt");
    if (!fs.existsSync(promptPath)) {
      promptPath = path.join(process.cwd(), "codebase", "bots", "hub_bot_prompt.txt");
    }

    let systemPrompt = "Bạn là VLearn Hub Bot, người điều hướng học viên.";
    if (fs.existsSync(promptPath)) {
      systemPrompt = fs.readFileSync(promptPath, "utf-8")
        .replace("{student_progress}", `Học viên hiện đang học Day ${studentDay}. Đã hoàn thành các bài học trước đó.`)
        .replace("{cohort_schedule}", `Lớp Cohort 4 hiện tại đang mở đến Day 2. Các Day 3, 4, 5, 6 chưa mở.`);
    }

    // 4. Bổ sung dữ liệu tra cứu và format vào prompt
    const topConcept = matchedConcepts[0];
    const topSlide = topConcept ? topConcept.bestSlide : 1;
    const topDay = topConcept ? topConcept.day : 1;
    const topName = topConcept ? topConcept.concept_name : "";

    const contextPrompt = `
${systemPrompt}

${ROUTING_FORMAT}

=== KẾT QUẢ TRA CỨU KNOWLEDGE INDEX CHO CÂU HỎI HIỆN TẠI ===
${
  matchedConcepts.length > 0
    ? JSON.stringify(matchedConcepts.slice(0, 3), null, 2)
    : "KHÔNG TÌM THẤY khái niệm nào trong giáo trình 6 buổi."
}

=== HƯỚNG DẪN TRẢ LỜI BẮT BUỘC ===
${
  matchedConcepts.length > 0
    ? `Khái niệm tìm thấy: "${topName}", thuộc Day ${topDay}, Slide ${topSlide}.
${
  topDay <= 2
    ? `- Day ${topDay} HIỆN TẠI ĐÃ MỞ (Cohort 4 đang học Day 1 và Day 2).
- Hãy trả lời tự nhiên, dãn dòng rõ ràng bằng các đoạn văn cách nhau 1 dòng trống (double newline).
- Khẳng định: Khái niệm "${topName}" nằm trong **Day ${topDay}**, tại **Slide số ${topSlide}**.
- Giải thích súc tích 1-2 câu về nội dung slide này.
- BẮT BUỘC tạo nút deep-link ở cuối câu trả lời:
[👉 Mở Day ${topDay} - Slide ${topSlide}](#deep-link-day-${topDay}-slide-${topSlide})
- TUYỆT ĐỐI KHÔNG nói Day ${topDay} chưa mở!`
    : `- Khái niệm "${topName}" thuộc **Day ${topDay}** (Chưa mở). Hãy đưa ra cảnh báo điều kiện tiên quyết (Prerequisite Warning), giải thích rằng học viên cần hoàn thành Day 1 và Day 2 trước khi chuyển sang Day ${topDay}.`
}
- TUYỆT ĐỐI KHÔNG sao chép các ký tự ngoặc nhọn như {concept}, {slide}, {day}, {slide_line}.`
    : `Khái niệm này chưa có bài giảng riêng biệt trong Knowledge Index 6 buổi học.
HƯỚNG DẪN TRẢ LỜI THÔNG MINH (PEDAGOGICAL BRIDGE):
1. KHÔNG từ chối khô khan! Giải thích súc tích bản chất khái niệm (1-2 câu ngắn gọn, chuẩn xác).
2. Định hướng (Bắc cầu): Chỉ ra khái niệm này liên quan mật thiết nhất tới buổi học nào trong khóa học:
   - Nền tảng mô hình, lịch sử, token, kiến trúc LLM -> Day 1 (AI & LLM Foundation).
   - Xác định bài toán, tự động hóa, ROI, Google PAIR -> Day 2 (Product Thinking & Automation).
   - Tác nhân AI, truy xuất dữ liệu nâng cao -> Day 3 (AI Agent & RAG).
3. Đề xuất học viên bắt đầu từ Day 1 hoặc Day 2.`
}
`.trim();

    // 5. Gọi AI Model
    try {
      const { text, engine } = await callUniversalLLM(
        [
          { role: "system", content: contextPrompt },
          { role: "user", content: query },
        ],
        { temperature: 0.2, max_tokens: 300 }
      );

      let cleanText = text;
      if (matchedConcepts.length > 0) {
        const top = matchedConcepts[0];
        const slideNo = top.bestSlide;

        // Dọn sạch triệt để mọi placeholder nếu LLM vô tình sao chép
        cleanText = cleanText
          .replace(/\{concept\}/gi, top.concept_name)
          .replace(/\{level\}/gi, top.level || "basic")
          .replace(/\{day\}/gi, String(top.day))
          .replace(/\{slide\}/gi, String(slideNo))
          .replace(/\{slide_line\}/gi, "1")
          .replace(/\{date\}/gi, "tuần tới")
          .replace(/\{current_day\}/gi, "2")
          .replace(/#deep-link-day-\d+-slide-\{slide\}[^)]*/gi, `#deep-link-day-${top.day}-slide-${slideNo}`)
          .replace(/#deep-link-day-\{day\}-slide-\d+[^)]*/gi, `#deep-link-day-${top.day}-slide-${slideNo}`)
          .replace(/#deep-link-day-\{day\}-slide-\{slide\}[^)]*/gi, `#deep-link-day-${top.day}-slide-${slideNo}`)
          .replace(/#deep-link-day-(\d+)-slide-(\d+)-highlight-[^\)]+/gi, `#deep-link-day-$1-slide-$2`);

        // Đảm bảo luôn có nút link bấm nếu thuộc Day 1 hoặc Day 2
        if (!cleanText.includes("#deep-link-day-") && top.day <= 2) {
          cleanText += `\n\n[👉 Mở Day ${top.day} - Slide ${slideNo}](#deep-link-day-${top.day}-slide-${slideNo})`;
        }
      }

      return NextResponse.json({ reply: cleanText, engine });
    } catch (aiError: any) {
      console.warn("[Hub AI Call Warning, switching to Grounded Routing Fallback]:", aiError.message);

      // Fallback thông minh: Tự động sinh phản hồi đúng chuẩn nếu API gặp sự cố
      if (matchedConcepts.length > 0) {
        const top = matchedConcepts[0];
        const slideNo = top.bestSlide;

        if (top.day > 2) {
          return NextResponse.json({
            reply: `Khái niệm **${top.concept_name}** thuộc nội dung **Day ${top.day}**.\n\n` +
              `Hiện tại lớp Cohort 4 mới mở đến **Day 2**. Lộ trình bài học này sẽ được mở trong các buổi tiếp theo. Hãy tập trung hoàn thành tốt kiến thức Day 1 và Day 2 trước nhé!`
          });
        }

        return NextResponse.json({
          reply: `Tuyệt vời! Khái niệm **"${top.concept_name}"** nằm trong **Day ${top.day}** (Slide số ${slideNo}).\n\n` +
            `${top.summary || "Bạn có thể xem trực tiếp nội dung chi tiết bài giảng và ví dụ minh họa trên slide này."}\n\n` +
            `[👉 Mở Day ${top.day} - Slide ${slideNo}](#deep-link-day-${top.day}-slide-${slideNo})`
        });
      }

      return NextResponse.json({
        reply: `Khái niệm bạn vừa hỏi liên quan đến lĩnh vực Trí tuệ nhân tạo nhưng chưa nằm trong danh mục bài giảng trực tiếp của khóa học.\n\n` +
          `Để xây dựng tư duy và kiến thức nền tảng vững vàng, bạn có thể bắt đầu với **Nền tảng AI & LLM** tại [👉 Mở Day 1](#deep-link-day-1) hoặc **Xác định bài toán AI** tại [👉 Mở Day 2](#deep-link-day-2) nhé!`
      });
    }
  } catch (fatalError: any) {
    console.error("[Hub Route Fatal Error]:", fatalError);
    return NextResponse.json({
      reply: `Chào bạn! Mình có thể giúp bạn tìm bài học trong khóa AI Thực Chiến. Bạn hãy thử hỏi: *"Tìm hiểu về Prompting"* hoặc *"Xác định bài toán AI nằm ở buổi nào?"* nhé!`
    });
  }
}
