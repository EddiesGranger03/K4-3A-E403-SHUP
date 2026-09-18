import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

// Cache for env variables
const cachedEnv: Record<string, string> = {};

export function getEnvVar(key: string, defaultValue = ""): string {
  if (process.env[key] && process.env[key] !== "") {
    return process.env[key]!;
  }
  if (cachedEnv[key]) {
    return cachedEnv[key];
  }

  const candidatePaths = [
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), "..", ".env"),
    path.join(process.cwd(), "..", "..", ".env"),
  ];

  for (const envPath of candidatePaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, "utf-8");
        const lines = content.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx !== -1) {
            const k = trimmed.slice(0, eqIdx).trim();
            const v = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
            cachedEnv[k] = v;
            if (!process.env[k]) {
              process.env[k] = v;
            }
          }
        }
      } catch (err) {
        // ignore read error
      }
    }
  }

  return process.env[key] || cachedEnv[key] || defaultValue;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callNvidiaNim(
  messages: ChatMessage[],
  options: { model?: string; temperature?: number; max_tokens?: number } = {}
): Promise<string> {
  const apiKey = getEnvVar("NVIDIA_API_KEY");
  if (!apiKey) {
    throw new Error("Chưa cấu hình NVIDIA_API_KEY trong .env");
  }

  const model = options.model || getEnvVar("MODEL_NAME", "meta/llama-3.2-11b-vision-instruct");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.2,
        max_tokens: options.max_tokens ?? 1024,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`NVIDIA NIM API HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function callGemini(
  prompt: string,
  options: { model?: string; temperature?: number } = {}
): Promise<string> {
  const apiKey = getEnvVar("GEMINI_API_KEY");
  if (!apiKey) {
    throw new Error("Chưa cấu hình GEMINI_API_KEY trong .env");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = options.model || getEnvVar("GEMINI_MODEL", "gemini-2.5-flash");

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: options.temperature ?? 0.2,
    },
  });

  return response.text || "";
}

export async function callUniversalLLM(
  messages: ChatMessage[],
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<{ text: string; engine: string }> {
  const nvidiaKey = getEnvVar("NVIDIA_API_KEY");
  const geminiKey = getEnvVar("GEMINI_API_KEY");

  // Priority 1: NVIDIA NIM (Llama 3.2)
  if (nvidiaKey) {
    try {
      const text = await callNvidiaNim(messages, options);
      const model = getEnvVar("MODEL_NAME", "meta/llama-3.2-11b-vision-instruct");
      return { text, engine: `NVIDIA NIM (${model})` };
    } catch (e: any) {
      console.warn("[AI Provider] NVIDIA NIM error, checking fallback:", e.message);
      if (!geminiKey) throw e;
    }
  }

  // Priority 2: Google Gemini
  if (geminiKey) {
    const systemPrompt = messages.find((m) => m.role === "system")?.content || "";
    const userQuery = messages.find((m) => m.role === "user")?.content || "";
    const prompt = `${systemPrompt}\n\n=== CÂU HỎI HỌC VIÊN ===\n${userQuery}`;
    const text = await callGemini(prompt, { temperature: options.temperature });
    const model = getEnvVar("GEMINI_MODEL", "gemini-2.5-flash");
    return { text, engine: `Google Gemini (${model})` };
  }

  throw new Error("Không tìm thấy NVIDIA_API_KEY hoặc GEMINI_API_KEY trong file .env!");
}
