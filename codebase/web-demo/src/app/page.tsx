"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, Sparkles, BookOpen, ChevronRight } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const QUICK_PROMPTS = [
  "Xác định bài toán AI là gì?",
  "Tìm bài học về RAG",
  "Tôi muốn học AI Agent",
];

export default function HomePage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat-hub", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, studentDay: 1 }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "bot", text: data.reply ?? "Có lỗi xảy ra." }]);
    } catch {
      setMessages((p) => [...p, { role: "bot", text: "Không kết nối được Hub Bot." }]);
    }
    setLoading(false);
  };

  // Parse deep-links: [label](#deep-link-day-X-slide-Y) or [label](#deep-link-day-X)
  const renderBotText = (text: string) => {
    const parts: React.ReactNode[] = [];
    const regex = /\[([^\]]+)\]\(#deep-link-day-(\d+)(?:-slide-(\d+))?(?:-lab-(\d+))?(?:-highlight-(\d+))?\)/g;
    let last = 0, m: RegExpExecArray | null;
    while ((m = regex.exec(text))) {
      if (m.index > last) parts.push(renderMarkdown(text.slice(last, m.index), parts.length));
      
      const label = m[1];
      const day = m[2];
      const slide = m[3];
      const lab = m[4];
      const highlight = m[5];
      
      let url = `/lesson/${day}`;
      const params = new URLSearchParams();
      if (slide) params.append("slide", slide);
      if (lab) params.append("lab", lab);
      if (highlight) params.append("highlightSlideLine", highlight);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      parts.push(
        <button
          key={m.index}
          onClick={() => router.push(url)}
          className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {label} <ChevronRight className="w-3 h-3" />
        </button>
      );
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(renderMarkdown(text.slice(last), parts.length + 100));
    return parts;
  };

  const renderMarkdown = (txt: string, keyOffset: number) =>
    txt.split("\n").map((line, i) => (
      <span key={keyOffset + i} className="block">
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
      </span>
    ));

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col">
      {/* ── Navbar ────────────────────────────────────── */}
      <nav className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-3 shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px] text-gray-900">VLearn</span>
        </div>
        <div className="h-5 w-px bg-gray-200 mx-2" />
        <span className="text-[13px] text-gray-500 font-medium">AI Thực Chiến · Cohort 4</span>
      </nav>

      {/* ── Main ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-between max-w-2xl w-full mx-auto px-4 py-8">

        {/* Empty state hero */}
        {isEmpty && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 pb-8">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-indigo-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Xin chào, học viên!</h1>
              <p className="text-gray-500 text-sm">Mình sẽ giúp bạn tìm đúng bài học trong khoá AI Thực Chiến.</p>
            </div>
            {/* Quick prompts */}
            <div className="flex flex-col gap-2 w-full mt-4">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all text-left shadow-sm"
                >
                  <BookOpen className="w-4 h-4 shrink-0 text-gray-400" />
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {!isEmpty && (
          <div className="flex-1 w-full flex flex-col gap-4 overflow-y-auto py-2 pr-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-md shadow-sm"
                  }`}
                >
                  {msg.role === "user" ? msg.text : renderBotText(msg.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-5">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* ── Input ───────────────────────────────────── */}
        <div className="w-full mt-4">
          <div className="flex items-end gap-2 bg-white border border-gray-300 rounded-2xl px-4 py-3 shadow-md focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Bạn muốn học gì hôm nay?"
              className="flex-1 bg-transparent resize-none border-none focus:outline-none text-[14px] text-gray-800 placeholder-gray-400 max-h-32 overflow-y-auto"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className={`p-2 rounded-xl transition-all shrink-0 ${
                input.trim() && !loading
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-2">
            Hub Bot sẽ điều hướng bạn tới đúng bài học. Nhấn Enter để gửi.
          </p>
        </div>
      </div>
    </div>
  );
}
