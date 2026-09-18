import { NextResponse } from "next/server";
import { callUniversalLLM, getEnvVar } from "@/lib/aiProvider";
import fs from "fs";
import path from "path";

// ── Tra cứu Knowledge Index ──────────────────────────────────────────────────
function search_knowledge_index(query: string, indexData: Record<string, any>) {
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);

  const matched = Object.entries(indexData).filter(([id, v]) => {
    const name = (v.concept_name || "").toLowerCase();
    const idLower = id.toLowerCase();
    const keywords: string[] = (v.keywords || []).map((k: string) => k.toLowerCase());

    if (name.includes(q) || idLower.includes(q) || q.includes(name)) return true;
    if (keywords.some((kw) => kw.includes(q) || q.includes(kw))) return true;

    // Token match
    const matchCount = tokens.filter(
      (tok) => name.includes(tok) || idLower.includes(tok) || keywords.some((kw) => kw.includes(tok))
    ).length;

    return matchCount >= Math.min(2, tokens.length);
  });

  return matched.map(([id, v]) => ({
    concept_id: id,
    concept_name: v.concept_name,
    day: v.day,
    level: v.level,
    slides: Array.isArray(v.slides) ? v.slides : [1],
    prerequisites: v.prerequisites || [],
    keywords: v.keywords || [],
    summary: v.summary || "",
  }));
}

const ROUTING_FORMAT = `
=== HƯỚNG DẪN TẠO DEEP-LINK ===
Khi điều hướng học viên, bạn PHẢI sử dụng đúng định dạng sau:
- Đến slide cụ thể:    [👉 Mở Day X - Slide Y](#deep-link-day-X-slide-Y)
- Đến tổng quan Day:   [👉 Mở trợ lý Day X](#deep-link-day-X)

Ví dụ: Nếu khái niệm ở Day 2, Slide 6, hãy viết:
[👉 Mở Day 2 - Slide 6](#deep-link-day-2-slide-6)
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

    // 2. Tra cứu kiến thức
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
    const contextPrompt = `
${systemPrompt}

${ROUTING_FORMAT}

=== KẾT QUẢ TRA CỨU KNOWLEDGE INDEX CHO CÂU HỎI HIỆN TẠI ===
${
  matchedConcepts.length > 0
    ? JSON.stringify(matchedConcepts, null, 2)
    : "KHÔNG TÌM THẤY khái niệm nào trong giáo trình 6 buổi."
}

QUY TẮC QUAN TRỌNG:
1. Nếu tìm thấy khái niệm ở Day 1 hoặc Day 2: Hãy tóm tắt ngắn gọn 1-2 câu và TẠO DEEP LINK [👉 Mở Day X - Slide Y](#deep-link-day-X-slide-Y).
2. Nếu khái niệm ở Day > 2: Cảnh báo học viên rằng Day đó chưa mở cho Cohort 4 (mới mở đến Day 2).
3. Nếu không tìm thấy: Lịch sự thông báo nằm ngoài phạm vi khóa học.
4. BẠN LÀ HUB BOT: TUYỆT ĐỐI KHÔNG giải thích bài dài lê thê, nhiệm vụ chính là ĐIỀU HƯỚNG bằng Deep-Link!
`.trim();

    // 5. Gọi AI Model (ưu tiên NVIDIA NIM với Llama 3.2 hoặc Gemini)
    try {
      const { text, engine } = await callUniversalLLM(
        [
          { role: "system", content: contextPrompt },
          { role: "user", content: query },
        ],
        { temperature: 0.2, max_tokens: 500 }
      );

      return NextResponse.json({ reply: text, engine });
    } catch (aiError: any) {
      console.warn("[Hub AI Call Warning, switching to Grounded Routing Fallback]:", aiError.message);

      // Fallback thông minh: Tự động sinh phản hồi đúng chuẩn nếu API gặp sự cố
      if (matchedConcepts.length > 0) {
        const top = matchedConcepts[0];
        const slideNo = top.slides[0] || 1;

        if (top.day > 2) {
          return NextResponse.json({
            reply: `Khái niệm **${top.concept_name}** thuộc nội dung **Day ${top.day}**.\n\n` +
              `Tuy nhiên, hiện tại lớp Cohort 4 mới mở đến **Day 2**. Lộ trình bài học này sẽ được mở trong các buổi tiếp theo. Hãy tập trung hoàn thành tốt kiến thức Day 1 và Day 2 trước nhé!`
          });
        }

        return NextResponse.json({
          reply: `Tuyệt vời! Khái niệm **"${top.concept_name}"** (${top.level}) nằm trong **Day ${top.day}**.\n\n` +
            `Tài liệu bài giảng và bài tập thực hành đã sẵn sàng. Bạn có thể mở trực tiếp tại slide số ${slideNo}:\n\n` +
            `[👉 Mở Day ${top.day} - Slide ${slideNo}](#deep-link-day-${top.day}-slide-${slideNo})`
        });
      }

      return NextResponse.json({
        reply: `Rất tiếc, khái niệm bạn vừa hỏi hiện chưa có trong nội dung bài giảng 6 buổi của khóa học AI Thực Chiến.\n\n` +
          `Bạn có thể kiểm tra lại từ khóa hoặc hỏi về các chủ đề như *LLM Foundation (Day 1)*, *Xác định bài toán AI & Automation (Day 2)* nhé!`
      });
    }
  } catch (fatalError: any) {
    console.error("[Hub Route Fatal Error]:", fatalError);
    return NextResponse.json({
      reply: `Chào bạn! Mình có thể giúp bạn tìm bài học trong khóa AI Thực Chiến. Bạn hãy thử hỏi: *"Tìm hiểu về Prompting"* hoặc *"Xác định bài toán AI nằm ở buổi nào?"* nhé!`
    });
  }
}
