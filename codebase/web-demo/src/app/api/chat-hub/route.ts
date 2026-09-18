import { NextResponse } from "next/server";
import {
  GoogleGenAI,
  FunctionCallingConfigMode,
  Type,
} from "@google/genai";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

// ── Tool implementation (runs server-side) ──────────────────────────────────
function search_knowledge_index(query: string, indexData: Record<string, any>): string {
  const q = query.toLowerCase();
  const matched = Object.entries(indexData).filter(([_, v]) => {
    const name = (v.concept_name || "").toLowerCase();
    const keywords: string[] = v.keywords || [];
    return (
      name.includes(q) ||
      keywords.some((kw: string) => kw.toLowerCase().includes(q)) ||
      q.includes(name)
    );
  });

  if (matched.length === 0) {
    return JSON.stringify({
      error: "Không tìm thấy khái niệm này trong giáo trình hiện tại. Hãy thông báo cho học viên biết nội dung này có thể chưa được cập nhật hoặc nằm ngoài phạm vi khóa học."
    });
  }

  return JSON.stringify(
    matched.map(([id, v]) => ({
      concept_id: id,
      concept_name: v.concept_name,
      day: v.day,
      level: v.level,
      slides: v.slides,
      prerequisites: v.prerequisites,
      keywords: v.keywords,
    }))
  );
}

// ── Gemini FunctionDeclaration ──────────────────────────────────────────────
const searchTool = {
  functionDeclarations: [
    {
      name: "search_knowledge_index",
      description:
        "Tim kiem trong Knowledge Index de lay metadata ve khai niem: Day, Slide numbers, Level, Prerequisites, Summary. Ket qua tra ve JSON co truong 'slides' (mang so trang), 'day' (so ngay), 'concept_id'.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          query: {
            type: Type.STRING,
            description: "Tu khoa hoac ten khai niem can tim, VD: 'RAG', 'AI Agent', 'bai toan AI'.",
          },
        },
        required: ["query"],
      },
    },
  ],
};

// ── Deep-link format instructions injected into Turn 2 ──────────────────────
const ROUTING_FORMAT = `
=== HUONG DAN TAO DEEP-LINK ===
Khi dieu huong hoc vien, su dung cac format sau:

- Den slide cu the:    [👉 Mo Day X - Slide Y](#deep-link-day-X-slide-Y)
- Den lab item cu the: [👉 Mo Lab Day X - Bai Z](#deep-link-day-X-lab-Z)
- Den tong quan day:   [👉 Mo tro ly Day X](#deep-link-day-X)

Vi du: neu khai niem o Day 1, slides=[3], thi viet: [👉 Mo Day 1 - Slide 3](#deep-link-day-1-slide-3)
`;


// ── API Route ───────────────────────────────────────────────────────────────
const LOG = (step: string, data?: unknown) =>
  console.log(`[HUB] ${step}`, data !== undefined ? JSON.stringify(data, null, 2) : "");

export async function POST(req: Request) {
  LOG("=== REQUEST START ===");

  try {
    // ── 0. Parse body ───────────────────────────────────────
    const body = await req.json();
    const { query, studentDay = 1 } = body;
    LOG("0. Body parsed", { query, studentDay });

    // ── 1. Check API key ────────────────────────────────────
    const apiKeyStatus = process.env.GEMINI_API_KEY
      ? `SET (${process.env.GEMINI_API_KEY.slice(0, 8)}...)`
      : "MISSING ❌";
    LOG("1. GEMINI_API_KEY", apiKeyStatus);

    if (!process.env.GEMINI_API_KEY) {
      console.error("[HUB] ❌ GEMINI_API_KEY is not set! Create .env.local with GEMINI_API_KEY=your_key");
      return NextResponse.json(
        { error: "GEMINI_API_KEY chua duoc set. Tao file .env.local va dien key vao." },
        { status: 500 }
      );
    }

    // ── 2. Load knowledge index ─────────────────────────────
    let indexPath = path.join(process.cwd(), "..", "..", "eval", "knowledge_index.json");
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(process.cwd(), "eval", "knowledge_index.json");
    }
    LOG("2. Index path", indexPath);
    let indexData: Record<string, any> = {};
    if (fs.existsSync(indexPath)) {
      indexData = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
      LOG("2. Index loaded", { conceptCount: Object.keys(indexData).length });
    } else {
      LOG("2. Index NOT found, using empty");
    }

    // ── 3. Load hub prompt ──────────────────────────────────
    let promptPath = path.join(process.cwd(), "..", "bots", "hub_bot_prompt.txt");
    if (!fs.existsSync(promptPath)) {
      promptPath = path.join(process.cwd(), "codebase", "bots", "hub_bot_prompt.txt");
    }
    LOG("3. Prompt path", promptPath);
    let systemPrompt = "Ban la VLearn Hub Bot.";
    if (fs.existsSync(promptPath)) {
      systemPrompt = fs.readFileSync(promptPath, "utf-8")
        .replace("{student_progress}", `Hoc vien dang o Day ${studentDay}. Da hoc: Cac kien thuc co ban Day ${studentDay}.`)
        .replace("{cohort_schedule}", `Cohort 4 hien dang mo den Day 2. Cac Day > 2 chua mo.`);
      LOG("3. Prompt loaded", { chars: systemPrompt.length });
    } else {
      LOG("3. Prompt file NOT found, using default");
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    LOG("4. Model", model);

    // Helper: safely pull text-only parts
    const extractTextParts = (res: Awaited<ReturnType<typeof ai.models.generateContent>>) =>
      (res.candidates?.[0]?.content?.parts ?? [])
        .filter((p: any) => typeof p.text === "string")
        .map((p: any) => p.text as string)
        .join("")
        .trim();

    // ── 5. Turn 1 ───────────────────────────────────────────
    LOG("5. Calling Turn 1 (with tool)...");
    const t1Start = Date.now();

    const turn1 = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nCau hoi hoc vien: "${query}"` }] }],
      config: {
        temperature: 0.1,
        tools: [searchTool],
        toolConfig: { functionCallingConfig: { mode: FunctionCallingConfigMode.AUTO } },
      },
    });

    LOG(`5. Turn 1 done in ${Date.now() - t1Start}ms`);
    const turn1Parts = turn1.candidates?.[0]?.content?.parts ?? [];
    LOG("5. Turn 1 parts", turn1Parts.map((p: any) => p.functionCall ? { type: "functionCall", name: p.functionCall.name, args: p.functionCall.args } : { type: "text", preview: p.text?.slice(0, 80) }));

    const fnCallParts = turn1Parts.filter((p: any) => p.functionCall !== undefined);

    if (fnCallParts.length === 0) {
      const directReply = extractTextParts(turn1);
      LOG("5. No function call → direct reply", { preview: directReply.slice(0, 100) });
      return NextResponse.json({ reply: directReply || "Khong co phan hoi." });
    }

    // ── 6. Execute tools ────────────────────────────────────
    LOG("6. Executing tools...");
    const toolResponses = fnCallParts.map((p: any) => {
      const fc = p.functionCall;
      const toolQuery = fc.args?.query || query;
      LOG(`6. Tool call: ${fc.name}(${toolQuery})`);
      const toolResult = search_knowledge_index(toolQuery, indexData);
      LOG("6. Tool result preview", toolResult.slice(0, 200));
      return { functionResponse: { name: fc.name as string, response: { result: toolResult } } };
    });

    // ── 7. Turn 2 ───────────────────────────────────────────
    LOG("7. Calling Turn 2 (text-only, no tools)...");
    const t2Start = Date.now();

    const turn2 = await ai.models.generateContent({
      model,
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nCau hoi hoc vien: "${query}"` }] },
        { role: "model", parts: turn1Parts },
        { role: "user", parts: toolResponses as any },
      ],
      config: { temperature: 0.2 },
    });

    LOG(`7. Turn 2 done in ${Date.now() - t2Start}ms`);
    const finalReply = extractTextParts(turn2);
    LOG("7. Final reply preview", finalReply.slice(0, 200));
    LOG("=== REQUEST END (success) ===");

    return NextResponse.json({ reply: finalReply || "Khong co phan hoi." });

  } catch (error: any) {
    console.error("[HUB] ❌ ERROR:", {
      message: error?.message,
      cause: error?.cause?.message ?? error?.cause,
      code: error?.code,
      status: error?.status,
      stack: error?.stack?.split("\n").slice(0, 6).join("\n"),
    });
    return NextResponse.json(
      { error: `[Hub Error] ${error?.message}`, cause: String(error?.cause ?? "") },
      { status: 500 }
    );
  }
}
