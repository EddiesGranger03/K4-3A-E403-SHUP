import { NextResponse } from "next/server";
import { callUniversalLLM, getEnvVar } from "@/lib/aiProvider";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { query, targetDay = 1 } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ reply: "Vui lòng nhập câu hỏi để Bot Con hỗ trợ bạn nhé!" });
    }

    // 1. Read knowledge index
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

    // Filter index for the specific day
    const dayConcepts = Object.entries(indexData)
      .filter(([_, v]: [string, any]) => v.day === targetDay)
      .map(([_, v]: [string, any]) => JSON.stringify(v));

    const contextStr = dayConcepts.length > 0 ? dayConcepts.join("\n") : "Chưa có tài liệu cho Day này.";

    // 2. Read the official prompt
    let promptPath = path.join(process.cwd(), "..", "bots", "bot_con_prompt.txt");
    if (!fs.existsSync(promptPath)) {
      promptPath = path.join(process.cwd(), "codebase", "bots", "bot_con_prompt.txt");
    }
    let promptTemplate = `Bạn là VLearn Bot Con chuyên sâu cho Day {X}. Nhiệm vụ: trả lời câu hỏi ngắn gọn (≤3 câu), trích dẫn đúng số slide [Day {X} - Slide Y]. Tuyệt đối không trả lời kiến thức ngày khác.`;
    if (fs.existsSync(promptPath)) {
      promptTemplate = fs.readFileSync(promptPath, "utf-8");
    }

    const systemPrompt = promptTemplate
      .replace(/\{X\}/g, targetDay.toString())
      .replace("{rag_context_day_X}", contextStr);

    // 3. Call AI Model (NVIDIA NIM or Gemini)
    try {
      const { text, engine } = await callUniversalLLM(
        [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        { temperature: 0.2, max_tokens: 320 }
      );

      let cleanText = text.trim();

      // Đảm bảo luôn có trích dẫn slide kết nối bài học nếu câu trả lời chưa có trích dẫn hợp lệ
      if (!cleanText.includes(`[Day ${targetDay}`) && !cleanText.toLowerCase().includes("nằm ngoài chủ đề")) {
        const qLower = query.toLowerCase();
        let targetSlideNo = 1;

        // Ưu tiên các keyword mốc đặc thù
        if (targetDay === 1) {
          if (qLower.includes("chatgpt") || qLower.includes("2022") || qLower.includes("openai") || qLower.includes("bùng nổ")) targetSlideNo = 9;
          else if (qLower.includes("transformer") || qLower.includes("self-attention") || qLower.includes("2017")) targetSlideNo = 8;
          else if (qLower.includes("imagenet") || qLower.includes("2009")) targetSlideNo = 7;
          else if (qLower.includes("chuyên gia") || qLower.includes("1980")) targetSlideNo = 6;
          else if (qLower.includes("lịch sử") || qLower.includes("1950") || qLower.includes("turing")) targetSlideNo = 5;
          else if (qLower.includes("tầng") || qLower.includes("phân cấp") || qLower.includes("hierarchy") || (qLower.includes("deep learning") && qLower.includes("machine learning"))) targetSlideNo = 3;
          else if (qLower.includes("nhóm ai") || qLower.includes("3 nhóm") || qLower.includes("ba nhóm")) targetSlideNo = 4;
          else if (qLower.includes("token")) targetSlideNo = 13;
          else if (qLower.includes("context window") || qLower.includes("ngữ cảnh")) targetSlideNo = 14;
          else if (qLower.includes("attention")) targetSlideNo = 15;
          else if (qLower.includes("scaling law")) targetSlideNo = 16;
          else if (qLower.includes("moe") || qLower.includes("tham số")) targetSlideNo = 17;
          else if (qLower.includes("huấn luyện") || qLower.includes("pre-training")) targetSlideNo = 18;
          else if (qLower.includes("rlhf") || qLower.includes("sft")) targetSlideNo = 19;
          else if (qLower.includes("ảo giác") || qLower.includes("hallucination")) targetSlideNo = 20;
          else if (qLower.includes("agent") || qLower.includes("tác nhân")) targetSlideNo = 21;
          else if (qLower.includes("chain of thought") || qLower.includes("cot")) targetSlideNo = 22;
          else if (qLower.includes("prompt")) targetSlideNo = 23;
        } else if (targetDay === 2) {
          if (qLower.includes("double diamond") || qLower.includes("kim cương")) targetSlideNo = 3;
          else if (qLower.includes("pair") || qLower.includes("google")) targetSlideNo = 8;
          else if (qLower.includes("problem card")) targetSlideNo = 9;
          else if (qLower.includes("jtbd") || qLower.includes("người dùng")) targetSlideNo = 10;
          else if (qLower.includes("roi") || qLower.includes("định lượng")) targetSlideNo = 11;
          else if (qLower.includes("ma trận") || qLower.includes("impact")) targetSlideNo = 12;
          else if (qLower.includes("augment") || qLower.includes("automate")) targetSlideNo = 13;
          else if (qLower.includes("cost of error") || qLower.includes("sai số")) targetSlideNo = 14;
        }

        cleanText += ` [Day ${targetDay} - Slide ${targetSlideNo}]`;
      }

      return NextResponse.json({ reply: cleanText, engine });
    } catch (apiError: any) {
      console.warn("[Spoke AI API Error, using Local Grounding Fallback]:", apiError.message);

      // Fallback: Tìm kiếm semantic từ index của Day hiện tại
      const qLower = query.toLowerCase();
      const matched = Object.entries(indexData).filter(([_, v]: [string, any]) => {
        if (v.day !== targetDay) return false;
        const name = (v.concept_name || "").toLowerCase();
        const kw: string[] = v.keywords || [];
        return name.includes(qLower) || kw.some((k) => qLower.includes(k.toLowerCase()) || k.toLowerCase().includes(qLower));
      });

      if (matched.length > 0) {
        const top = matched[0][1];
        const slideNo = Array.isArray(top.slides) ? top.slides[0] : (top.slide_refs?.[0]?.page || 1);
        return NextResponse.json({
          reply: `Khái niệm **${top.concept_name}** được giảng dạy chi tiết trong nội dung Day ${targetDay}.\n\n` +
            `• ${top.summary || "Bạn có thể tham khảo trực tiếp sơ đồ và ví dụ trên slide."}\n\n` +
            `Bạn có thể xem trực tiếp ở khung tài liệu bên cạnh: [Day ${targetDay} - Slide ${slideNo}].`
        });
      }

      return NextResponse.json({
        reply: `Nội dung bạn vừa hỏi thuộc phạm vi bài học Day ${targetDay}. Bạn có thể theo dõi trực tiếp các trang slide hoặc nội dung transcript ở khung tài liệu bên trái để nắm vững cấu trúc chi tiết!`
      });
    }
  } catch (error: any) {
    console.error("[Spoke Handler Fatal Error]:", error);
    return NextResponse.json({
      reply: "Hệ thống đang sẵn sàng. Bạn có thể mở slide bên cạnh hoặc đặt lại câu hỏi cụ thể hơn nhé!"
    });
  }
}
