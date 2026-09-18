import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { query, targetDay = 1 } = await req.json();

    // Read knowledge index
    let indexPath = path.join(process.cwd(), "..", "..", "eval", "knowledge_index.json");
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(process.cwd(), "eval", "knowledge_index.json");
    }
    let indexData = {};
    if (fs.existsSync(indexPath)) {
      indexData = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    }

    // Filter index for the specific day
    const dayContextData = Object.entries(indexData)
      .filter(([k, v]: [string, any]) => v.day === targetDay)
      .map(([k, v]: [string, any]) => JSON.stringify(v))
      .join("\n");

    const contextStr = dayContextData || "Chưa có tài liệu cho Day này.";

    // Read the official prompt
    let promptPath = path.join(process.cwd(), "..", "bots", "bot_con_prompt.txt");
    if (!fs.existsSync(promptPath)) {
      promptPath = path.join(process.cwd(), "codebase", "bots", "bot_con_prompt.txt");
    }
    let promptTemplate = "Bạn là VLearn Bot Con...";
    if (fs.existsSync(promptPath)) {
      promptTemplate = fs.readFileSync(promptPath, "utf-8");
    }

    let prompt = promptTemplate
        .replace(/\{X\}/g, targetDay.toString())
        .replace("{rag_context_day_X}", contextStr);
        
    prompt += `\n\n=== CÂU HỎI CỦA HỌC VIÊN ===\n${query}`;

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const response = await ai.models.generateContent({
      model, 
      contents: prompt,
      config: {
        temperature: 0.2,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
