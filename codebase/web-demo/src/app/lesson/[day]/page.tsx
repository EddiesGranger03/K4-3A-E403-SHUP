"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { 
  RotateCcw, ChevronDown, ChevronRight, CheckCircle, Flag, ArrowLeft, 
  Send, Sparkles, X, FileText, ThumbsUp, ThumbsDown, BookOpen, 
  Copy, Check, Monitor
} from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { DAY_METADATA, LESSON_CONTENT } from "@/constants/lessonData";
import { getSlideData } from "@/constants/slidesData";

type Message = { role: "user" | "bot"; text: string };
type ContentView = "slide" | "lab" | "transcript";
type SlideMode = "interactive" | "pdf";

// ── Component ────────────────────────────────────────────────

function LessonContent() {
  const { day } = useParams<{ day: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentContent = LESSON_CONTENT[day as string] || [];
  const SLIDES = currentContent.filter(item => item.type === "slide");
  const LAB_ITEMS = currentContent.filter(item => item.type === "lab");
  const totalSlides = DAY_METADATA[day as string]?.totalSlides || 29;
  
  const initialSlide = searchParams.get("slide");
  const initialLab = searchParams.get("lab");
  const highlightSlideLine = searchParams.get("highlightSlideLine");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [page, setPage] = useState(initialSlide ? Number(initialSlide) : 1);
  const [contentView, setContentView] = useState<ContentView>(initialLab ? "lab" : "slide");
  const [slideMode, setSlideMode] = useState<SlideMode>("interactive");
  const [isAiOpen, setIsAiOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [transcriptContent, setTranscriptContent] = useState("");
  const [activeLabId, setActiveLabId] = useState<string | null>(initialLab ? String(initialLab) : null);
  const [liked, setLiked] = useState<null | "up" | "down">(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  // Current slide data
  const currentSlide = getSlideData(day as string, page, totalSlides);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in textarea or input
      if (document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.tagName === "INPUT") {
        return;
      }
      if (contentView === "slide") {
        if (e.key === "ArrowLeft") {
          setPage((p) => Math.max(1, p - 1));
        } else if (e.key === "ArrowRight") {
          setPage((p) => Math.min(totalSlides, p + 1));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contentView, totalSlides]);

  // When URL query params change (e.g. from Hub bot link click), update view
  useEffect(() => {
    if (initialSlide) {
      setContentView("slide");
      setPage(Number(initialSlide));
      setActiveLabId(null);
    } else if (initialLab) {
      setContentView("lab");
      setActiveLabId(String(initialLab));
    }
  }, [initialSlide, initialLab, highlightSlideLine]);

  useEffect(() => {
    if (contentView === "transcript") {
      fetch(`/transcripts/day${day}.md`)
        .then(res => res.ok ? res.text() : "Chưa có transcript cho bài này.")
        .then(text => setTranscriptContent(text));
    }
  }, [contentView, day]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text }]);
    setLoading(true);
    
    // Ensure AI panel is visible
    if (!isAiOpen) {
      setIsAiOpen(true);
    }

    try {
      const res = await fetch("/api/chat-spoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, targetDay: Number(day) }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "bot", text: data.reply ?? "Có lỗi xảy ra." }]);
    } catch {
      setMessages((p) => [...p, { role: "bot", text: "Không kết nối được Trợ giảng AI." }]);
    }
    setLoading(false);
  };

  const handleCopySlide = () => {
    const textToCopy = `${currentSlide.title}\n${currentSlide.subtitle || ""}\n\n${currentSlide.points.map(p => `- ${p.title}: ${p.desc}`).join("\n")}\n\nĐiểm cốt lõi: ${currentSlide.takeaway}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAiAboutSlide = (customQuery?: string) => {
    if (!isAiOpen) {
      setIsAiOpen(true);
    }
    const query = customQuery || `Giải thích chi tiết hơn cho tôi về nội dung Slide ${page}: "${currentSlide.title}"`;
    sendMessage(query);
  };

  const activeLabItem = LAB_ITEMS.find((l) => l.id === activeLabId);
  const activeLabIndex = LAB_ITEMS.findIndex((l) => l.id === activeLabId);
  const isEmpty = messages.length === 0;

  const handleLabClick = (id: string) => {
    setActiveLabId(id);
    setContentView("lab");
  };

  const handleSlideClick = () => {
    setActiveLabId(null);
    setContentView("slide");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] font-sans overflow-hidden">

      {/* ═══════ HEADER ═══════ */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-5 gap-3 shrink-0 z-20 shadow-sm">
        <button 
          onClick={() => router.push("/")} 
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          title="Về trang tổng quan khóa học"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="font-semibold text-[15px] text-gray-900">
          {DAY_METADATA[day as string]?.title || `Bài ${day} · DAY 0${day}`}
        </span>
        <div className="flex-1" />
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium hidden sm:flex">
          <span>Tiến độ bài học</span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((page / totalSlides) * 100)}%` }} 
            />
          </div>
          <span className="text-[11px] text-indigo-600 font-semibold">{page}/{totalSlides}</span>
        </div>

        {/* ── Nút Đặt câu hỏi với AI (Toggles AI Assistant) ── */}
        <button 
          onClick={() => {
            setIsAiOpen(prev => !prev);
            if (!isAiOpen) {
              setTimeout(() => chatInputRef.current?.focus(), 150);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
            isAiOpen 
              ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200" 
              : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
          }`}
          title="Bật/Tắt Trợ giảng AI"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAiOpen ? "Trợ giảng AI (Đang mở)" : "Đặt câu hỏi với AI"}</span>
        </button>

        {/* ── User Account: Mặc định là Học viên ── */}
        <div 
          className="flex items-center gap-2 pl-2 border-l border-gray-200 cursor-pointer"
          title="Tài khoản: Học viên (Cohort 4)"
        >
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">
            HV
          </div>
          <span className="text-[12px] font-semibold text-gray-700 hidden md:inline">Học viên</span>
        </div>
      </header>

      {/* ═══════ BODY ═══════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Nội dung bài học</span>
          </div>

          {/* Slides */}
          <div className="px-3 py-1">
            <div className="flex items-center justify-between px-1 py-2 cursor-pointer">
              <span className="text-[13px] font-bold text-gray-800">Slides bài giảng</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            {SLIDES.map((s) => (
              <button
                key={s.id}
                onClick={handleSlideClick}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors text-left ${
                  contentView === "slide"
                    ? "bg-indigo-50 border-l-[3px] border-indigo-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className={`p-1 rounded shrink-0 ${contentView === "slide" && s.id === SLIDES[0]?.id ? "bg-indigo-100" : "bg-orange-50"}`}>
                  <BookOpen className={`w-3 h-3 ${contentView === "slide" && s.id === SLIDES[0]?.id ? "text-indigo-600" : "text-orange-500"}`} />
                </div>
                <span className={`text-[12px] flex-1 truncate font-medium ${contentView === "slide" && s.id === SLIDES[0]?.id ? "text-indigo-700 font-semibold" : "text-gray-700"}`}>
                  {s.title}
                </span>
                {contentView === "slide" && (
                  <span className="text-[10px] font-bold text-indigo-500 shrink-0">Đang học</span>
                )}
              </button>
            ))}
          </div>

          {/* Lab Exercises */}
          <div className="px-3 py-2 border-t border-gray-100 mt-2">
            <div className="flex items-center gap-2 px-1 py-2 cursor-pointer">
              <div className="p-1 bg-teal-50 rounded"><BookOpen className="w-3 h-3 text-teal-600" /></div>
              <span className="text-[12px] font-bold text-gray-800 flex-1">Day0{day}-AI-Product-Labs</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex flex-col gap-0.5 mt-1">
              {LAB_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleLabClick(item.id)}
                  className={`w-full flex items-start gap-2.5 px-2 py-2 rounded-lg transition-colors text-left ${
                    activeLabId === item.id && contentView === "lab"
                      ? "bg-indigo-50 border-l-[3px] border-indigo-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                    activeLabId === item.id && contentView === "lab"
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-300 text-gray-400"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[12px] leading-snug line-clamp-2 ${activeLabId === item.id && contentView === "lab" ? "text-indigo-700 font-semibold" : "text-gray-600 font-medium"}`}>
                    {item.short}
                  </span>
                  {activeLabId === item.id && contentView === "lab" && (
                    <span className="text-[10px] font-bold text-indigo-500 shrink-0 mt-0.5">Đang học</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── CENTER: MAIN CONTENT ── */}
        <main className="flex-1 bg-[#F8F9FC] flex flex-col overflow-y-auto">

          {/* ══════ SLIDE VIEW (SLIDE TƯƠNG TÁC + TÙY CHỌN PDF) ══════ */}
          {contentView === "slide" && (
            <div className="flex-1 p-6 flex flex-col items-center">
              <div className="w-full max-w-4xl flex flex-col gap-4">

                {/* ── 1. SLIDE CANVAS ── */}
                {slideMode === "interactive" ? (
                  <div 
                    className="w-full bg-white rounded-2xl shadow-md border border-gray-200/90 overflow-hidden flex flex-col relative transition-all duration-200"
                    style={{ aspectRatio: "16/9.6", minHeight: "440px" }}
                  >
                    {/* Top gradient strip */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shrink-0" />

                    {/* Header bar of the slide */}
                    <div className="px-6 pt-4 pb-3 flex items-center justify-between border-b border-gray-100 shrink-0 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold rounded-md tracking-wide uppercase">
                          DAY {day} · SLIDE {page}/{totalSlides}
                        </span>
                        <span className="px-2.5 py-1 bg-purple-50 border border-purple-100 text-purple-700 text-[11px] font-semibold rounded-md">
                          {currentSlide.tag}
                        </span>
                      </div>

                      {/* Interactive slide action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAskAiAboutSlide()}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 text-[11px] font-semibold rounded-lg shadow-sm transition-all transform hover:scale-[1.02]"
                          title="Hỏi Trợ giảng AI về nội dung slide này"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Hỏi AI về slide này</span>
                        </button>
                        <button
                          onClick={handleCopySlide}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-[11px] font-medium rounded-lg border border-gray-200 transition-colors"
                          title="Sao chép nội dung slide vào bộ nhớ tạm"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                          <span>{copied ? "Đã chép" : "Sao chép"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Slide main body */}
                    <div className="px-8 py-5 flex-1 flex flex-col justify-between overflow-y-auto">
                      {/* Title & Subtitle */}
                      <div className="mb-4">
                        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">
                          {currentSlide.title}
                        </h2>
                        {currentSlide.subtitle && (
                          <p className="text-[13px] md:text-[14px] text-gray-500 mt-1 font-medium">
                            {currentSlide.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Concept Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-auto">
                        {currentSlide.points.map((pt, idx) => (
                          <div 
                            key={idx}
                            className="p-3.5 bg-slate-50/80 hover:bg-indigo-50/40 border border-slate-200/80 hover:border-indigo-200 rounded-xl transition-all group shadow-sm hover:shadow"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="text-lg shrink-0 mt-0.5">{pt.icon || "📌"}</span>
                              <div>
                                <h4 className="text-[13px] font-bold text-gray-800 group-hover:text-indigo-900 transition-colors">
                                  {pt.title}
                                </h4>
                                <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">
                                  {pt.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Key Takeaway Banner */}
                      {currentSlide.takeaway && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl flex items-start gap-2.5 shrink-0">
                          <span className="text-base shrink-0">💡</span>
                          <div>
                            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                              Điểm cốt lõi cần nhớ
                            </span>
                            <p className="text-[12px] font-medium text-amber-900/90 leading-relaxed mt-0.5">
                              {currentSlide.takeaway}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Slide Footer */}
                    <div className="px-6 py-2.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium shrink-0">
                      <span>VLearn · Khóa học AI Thực Chiến</span>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline">Phím ◄ ► để chuyển slide</span>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <span className="font-semibold text-gray-500">Trang {page} / {totalSlides}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* PDF View (Khi người dùng chọn xem file gốc) */
                  <div className="bg-[#8DAA91] rounded-2xl shadow-lg overflow-hidden relative" style={{ aspectRatio: "16/9.5" }}>
                    <iframe 
                      key={page}
                      src={`/slides/day${day}.pdf#page=${page}&view=Fit&scrollbar=0&toolbar=0&navpanes=0`} 
                      className="w-full h-full border-none absolute inset-0 z-10"
                      title="Slide Viewer PDF"
                    />
                  </div>
                )}

                {/* ── 2. SLIDE TOOLBAR ── */}
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm text-gray-600 flex-wrap gap-2">
                  {/* Left: Mode Switcher */}
                  <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs font-semibold">
                    <button
                      onClick={() => setSlideMode("interactive")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                        slideMode === "interactive" 
                          ? "bg-white text-indigo-700 shadow-sm font-bold" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Chế độ slide tương tác thông minh"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Slide Tương Tác</span>
                    </button>
                    <button
                      onClick={() => setSlideMode("pdf")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                        slideMode === "pdf" 
                          ? "bg-white text-indigo-700 shadow-sm font-bold" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Chế độ xem file PDF gốc"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Xem PDF Gốc</span>
                    </button>
                  </div>

                  {/* Center: Pager */}
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700">
                    <button 
                      onClick={() => setPage((p) => Math.max(1, p - 1))} 
                      disabled={page === 1}
                      className="px-2.5 py-1 rounded-md hover:bg-gray-100 text-gray-700 disabled:opacity-30 transition-colors cursor-pointer"
                      title="Trang trước"
                    >
                      ◄
                    </button>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 bg-gray-50 border border-gray-200 rounded-md">
                      <span className="font-bold text-indigo-600">{page}</span>
                      <span className="text-gray-400">/</span>
                      <span>{totalSlides}</span>
                    </div>
                    <button 
                      onClick={() => setPage((p) => Math.min(totalSlides, p + 1))} 
                      disabled={page === totalSlides}
                      className="px-2.5 py-1 rounded-md hover:bg-gray-100 text-gray-700 disabled:opacity-30 transition-colors cursor-pointer"
                      title="Trang sau"
                    >
                      ►
                    </button>
                  </div>

                  {/* Right: Quick actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleAskAiAboutSlide()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[12px] font-semibold border border-indigo-200 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Hỏi Trợ giảng</span>
                    </button>
                  </div>
                </div>

                {/* ── 3. GHI CHÚ BÀI GIẢNG ── */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-700">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Ghi chú của bài giảng (Slide {page})</span>
                    </div>
                    <span className="text-[11px] text-gray-400">Tự động đồng bộ theo slide</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    {currentSlide.takeaway || "Học viên có thể sử dụng Trợ giảng AI ở khung bên phải để đặt câu hỏi trực tiếp về nội dung bài giảng đang mở!"}
                  </p>
                </div>

                {/* Reactions */}
                <div className="flex items-center justify-between text-gray-400 pb-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setLiked("up")} 
                      className={`p-1.5 rounded-lg transition-colors ${liked === "up" ? "text-indigo-600 bg-indigo-50" : "hover:bg-gray-100"}`}
                      title="Hữu ích"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setLiked("down")} 
                      className={`p-1.5 rounded-lg transition-colors ${liked === "down" ? "text-red-500 bg-red-50" : "hover:bg-gray-100"}`}
                      title="Chưa rõ"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Báo lỗi">
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[11px] text-gray-400">Khóa học AI Thực Chiến · VinUni Hackathon</span>
                </div>
              </div>
            </div>
          )}

          {/* ══════ TRANSCRIPT VIEW ══════ */}
          {contentView === "transcript" && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Transcript Day {day}</h1>
                <div className="prose prose-sm max-w-none text-gray-800 transcript-viewer">
                  <ReactMarkdown>
                    {transcriptContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* ══════ LAB CONTENT VIEW ══════ */}
          {contentView === "lab" && activeLabItem && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{activeLabItem.title}</h1>

                {/* About box */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold text-blue-800 mb-1">Về bài lab này</p>
                    <p className="text-[13px] text-blue-700 leading-relaxed">{activeLabItem.about}</p>
                  </div>
                </div>

                {/* Markdown content */}
                <div className="prose prose-sm max-w-none text-gray-800">
                  {(activeLabItem.content || "").split("\n").map((line, i) => {
                    if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace("## ", "")}</h2>;
                    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-gray-900 my-2">{line.replace(/\*\*/g, "")}</p>;
                    if (line.startsWith("- ")) return <li key={i} className="ml-4 text-[14px] text-gray-700 leading-relaxed list-disc">{line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>;
                    if (line.startsWith("| ")) return <p key={i} className="font-mono text-[13px] text-gray-600 bg-gray-50 px-2 py-0.5">{line}</p>;
                    if (line === "```" || line.startsWith("```")) return null;
                    if (line === "") return <div key={i} className="h-2" />;
                    return (
                      <p key={i} className="text-[14px] text-gray-700 leading-relaxed my-1">
                        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                        )}
                      </p>
                    );
                  })}
                </div>

                {/* Nav buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => activeLabIndex > 0 && handleLabClick(LAB_ITEMS[activeLabIndex - 1].id)}
                    disabled={activeLabIndex <= 0}
                    className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Trang trước
                  </button>
                  <button
                    onClick={() => activeLabIndex < LAB_ITEMS.length - 1 && handleLabClick(LAB_ITEMS[activeLabIndex + 1].id)}
                    disabled={activeLabIndex === LAB_ITEMS.length - 1 || activeLabIndex === -1}
                    className="flex items-center gap-2 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-30 cursor-pointer"
                  >
                    Tiếp theo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ── RIGHT SIDEBAR: TRỢ GIẢNG AI ── */}
        {isAiOpen && (
          <aside className="w-[320px] bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-[14px] text-gray-900">Trợ giảng AI</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <button 
                  onClick={() => setMessages([])} 
                  className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-gray-600 transition-colors cursor-pointer" 
                  title="Xóa đoạn chat để bắt đầu phiên mới"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsAiOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-gray-600 transition-colors cursor-pointer"
                  title="Đóng Trợ giảng AI"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {isEmpty && (
                <div className="flex flex-col items-center text-center gap-3 mt-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-gray-900">
                      Học viên có gì cần hỏi hôm nay không?
                    </p>
                    <p className="text-[12px] text-gray-400 mt-1 leading-relaxed">
                      Đang mở: {contentView === "slide" ? `Slide bài giảng Day ${day}` : activeLabItem?.short ?? "Lab"} · Trang {page}
                    </p>
                  </div>

                  {/* Quick suggested prompt pills */}
                  <div className="flex flex-col gap-1.5 w-full mt-4">
                    <button 
                      onClick={() => handleAskAiAboutSlide(`Tóm tắt các điểm cốt lõi trong Slide ${page}: "${currentSlide.title}"`)}
                      className="text-left text-[11px] px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors border border-rose-100 font-medium"
                    >
                      💡 Tóm tắt Slide {page}
                    </button>
                    <button 
                      onClick={() => handleAskAiAboutSlide(`Tại sao kiến thức trong Slide ${page}: "${currentSlide.title}" lại quan trọng trong thực tế?`)}
                      className="text-left text-[11px] px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors border border-gray-200 font-medium"
                    >
                      ❓ Tại sao slide này quan trọng?
                    </button>
                    <button 
                      onClick={() => handleAskAiAboutSlide(`Cho tôi một ví dụ thực tế minh họa cho Slide ${page}: "${currentSlide.title}"`)}
                      className="text-left text-[11px] px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors border border-gray-200 font-medium"
                    >
                      🌍 Cho ví dụ thực tiễn
                    </button>
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-sm"
                      : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 focus-within:bg-white focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <textarea
                  ref={chatInputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
                  }}
                  placeholder="Hỏi bất cứ điều gì về bài học..."
                  className="flex-1 bg-transparent resize-none border-none focus:outline-none text-[13px] text-gray-800 placeholder-gray-400 max-h-24"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className={`p-1.5 rounded-xl shrink-0 transition-all ${input.trim() && !loading ? "bg-rose-500 text-white hover:bg-rose-600 shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  title="Gửi câu hỏi"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-2">Trợ giảng AI hỗ trợ học tập · Bám sát giáo trình bài giảng.</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải bài học...</div>}>
      <LessonContent />
    </Suspense>
  );
}
