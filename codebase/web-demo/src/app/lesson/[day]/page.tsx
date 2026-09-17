"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Search, ChevronDown, ChevronRight, CheckCircle, Flag, ArrowLeft, Send, Sparkles, X, FileText, Layout, File, MessageSquare, Menu, Clock, PlayCircle, Folder, FileQuestion, ThumbsUp, ThumbsDown, BookOpen } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "bot"; text: string };
type ContentView = "slide" | "lab";

// ── Sidebar data ─────────────────────────────────────────────
const SLIDES = [
  { id: 1, title: "Slide - GV Mai Anh", active: true },
  { id: 2, title: "4-day02-lecture-slides-v2" },
  { id: 3, title: "b2" },
  { id: 4, title: "k4-d2-slide-blue (2)" },
  { id: 5, title: "Day 02_C401_Xac Dinh Bai Toan" },
  { id: 6, title: "Day 02_C401_AI Product Lab" },
];

const LAB_ITEMS = [
  {
    id: 1,
    short: '"So tay tu dien" bo tui cho nguoi moi',
    title: '\u{1F4D6} "So tay tu dien" bo tui cho nguoi moi (Non-Tech Dictionary)',
    about: "Di tu van de that quanh minh den mot Problem Statement du chat, biet chon dung muc giai phap (No AI / Rule / Workflow / Agent) va ra quyet dinh Go / Not Yet / No-Go co can cu.",
    content: `## Bai thuc hanh Ngay 2 - Tim Dung Bai Toan Cho AI

Chao mung ban quay lai! Neu Ngay 1 la luc ban tap **bat loi** cach AI nhin the gioi, thi Ngay 2 la luc ban tap **tim dung bai toan** truoc khi nghi toi AI.

Day la buoi thuc hanh **4 tieng, vua lam ca nhan vua lam nhom**. Khong co dong lenh, khong can cai dat gi - cong cu chinh cua ban hom nay la quan sat, dat cau hoi, ve workflow va tranh luan co can cu voi nhom.

**Muc tieu lon nhat:** Dong vai mot Product Thinker, di tu mot van de that quanh minh den mot Problem Statement du chat, roi tu quyet dinh co nen dung AI hay khong - va neu co thi dung o muc nao.

\`\`\`
[Van de that quanh minh]
       |
[Scan ca nhan bang 4 lang kinh] ----(Problem Card: actor, workflow, bottleneck)----> Chon top 3!
       |
[Hoi tu cung nhom] ----------------(Cluster -> Shortlist -> Score -> chon 1 candidate)
       |
[Kiem chung + Research] -----------(Interview/khao sat nhanh + so sanh giai phap da co)
       |
[Problem Statement] + [AI Decision Matrix]
\`\`\``,
  },
  {
    id: 2,
    short: "Phan 1: Chuan bi ban lam viec",
    title: "Phan 1: Chuan bi ban lam viec (khoang 20 phut)",
    about: "Thiet lap moi truong lam viec ca nhan truoc khi bat dau scan van de.",
    content: `## Phan 1: Chuan bi ban lam viec

**Thoi gian:** 20 phut ca nhan

**Cong viec:**
- Mo Notion hoac bat ky cong cu ghi chu nao ban thich
- Tao mot trang moi voi tieu de: **Problem Hunt - Ngay 2**
- Chuan bi 4 cot tuong ung 4 lang kinh scan

**4 Lang kinh scan van de:**
1. **Actor** - Ai dang gap van de nay?
2. **Workflow** - Ho dang lam gi? Quy trinh ra sao?
3. **Bottleneck** - Diem nghen la o dau?
4. **AI Fit** - Phan nao co the AI ho tro?`,
  },
  {
    id: 3,
    short: "Phan 2: Scan ca nhan",
    title: "Phan 2: Scan ca nhan - tim it nhat 5 bai",
    about: "Quan sat moi truong xung quanh va ghi lai it nhat 5 van de tiem nang.",
    content: `## Phan 2: Scan ca nhan

**Thoi gian:** 45 phut

**Nhiem vu:** Tim it nhat **5 van de that** trong cuoc song / cong viec cua ban.

Moi van de ghi thanh 1 Problem Card:
| Truong | Noi dung |
|--------|----------|
| Actor | Ai gap van de? |
| Workflow | Ho dang lam gi? |
| Bottleneck | Van de cu the la gi? |
| AI Level | No AI / Rule / Workflow / Agent |

**Tips:** Dung chi nghi cac van de "lon". Cac van de nho, lap di lap lai hang ngay thuong la moi truong tot de AI phat huy tac dung.`,
  },
  {
    id: 4,
    short: "Phan 3: Chon Top 3 Problem Card",
    title: "Phan 3: Chon Top 3 Problem Card",
    about: "Tu danh sach van de da scan, lua chon 3 van de tiem nang nhat.",
    content: `## Phan 3: Chon Top 3

**Thoi gian:** 15 phut

**Tieu chi chon:**
- **Tan suat:** Van de xay ra bao nhieu lan/tuan?
- **Dau don:** Khi van de xay ra, ban mat bao nhieu thoi gian/cong suc?
- **Kha nang AI:** AI co the giai quyet duoc bao nhieu % cua van de nay?

**Score:** Cham 1-5 moi tieu chi, chon 3 van de co tong diem cao nhat.`,
  },
  {
    id: 5,
    short: "Phan 4: Hoi tu cung nhom",
    title: "Phan 4: Hoi tu cung nhom - tu 9-12h",
    about: "Chia se van de ca nhan, cluster va vote chon 1 candidate chinh.",
    content: `## Phan 4: Hoi tu cung nhom

**Thoi gian:** 45 phut (co the keo dai den 12h)

**Quy trinh:**
1. Moi nguoi trinh bay 3 Problem Card cua minh (3 phut/nguoi)
2. Nhom cluster cac van de tuong tu lai
3. Vote chon cluster nao dang quan tam nhat
4. Shortlist xuong con 1-2 van de chinh
5. Score tap the va chon 1 candidate chinh thuc`,
  },
  {
    id: 6,
    short: "Phan 5: Kiem chung nhanh + Research",
    title: "Phan 5: Kiem chung nhanh + Research",
    about: "Validate van de bang interview nhanh va research giai phap da co tren thi truong.",
    content: `## Phan 5: Kiem chung + Research

**Thoi gian:** 60 phut

**Nhiem vu:**
- **Interview nhanh:** Noi chuyen voi 2-3 nguoi co the gap van de tuong tu. Dat cau hoi mo, khong dan dat.
- **Desk research:** Tim cac giai phap da co tren thi truong. Bao nhieu nguoi dang dung? Diem yeu la gi?

**Output:**
- Problem Statement hoan chinh (1 doan van < 100 tu)
- AI Decision Matrix (chon muc No AI / Rule / Workflow / Agent)`,
  },
];

// ── Component ────────────────────────────────────────────────
import { useSearchParams } from "next/navigation";

function LessonContent() {
  const { day } = useParams<{ day: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSlide = searchParams.get("slide");
  const initialLab = searchParams.get("lab");
  const highlightSlideLine = searchParams.get("highlightSlideLine");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [page, setPage] = useState(initialSlide ? Number(initialSlide) : 1);
  const [contentView, setContentView] = useState<ContentView>(initialLab ? "lab" : "slide");
  const [activeLabId, setActiveLabId] = useState<number | null>(initialLab ? Number(initialLab) : null);
  const [liked, setLiked] = useState<null | "up" | "down">(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // When URL query params change (e.g. from Hub bot link click), update view
  useEffect(() => {
    if (initialSlide) {
      setContentView("slide");
      setPage(Number(initialSlide));
      setActiveLabId(null);
    } else if (initialLab) {
      setContentView("lab");
      setActiveLabId(Number(initialLab));
    }
  }, [initialSlide, initialLab, highlightSlideLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat-spoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, targetDay: Number(day) }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "bot", text: data.reply ?? "Co loi xay ra." }]);
    } catch {
      setMessages((p) => [...p, { role: "bot", text: "Khong ket noi duoc Tro giang AI." }]);
    }
    setLoading(false);
  };

  const activeLabItem = LAB_ITEMS.find((l) => l.id === activeLabId);
  const isEmpty = messages.length === 0;

  const handleLabClick = (id: number) => {
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
        <button onClick={() => router.push("/")} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="font-semibold text-[15px] text-gray-900">Bài {day} · DAY 0{day}</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
          <span>0/24 bài</span>
          <div className="w-28 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-0 h-full bg-indigo-500 rounded-full" />
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-indigo-100 transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          Đặt câu hỏi với AI
        </button>
        <button className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-600 hover:text-gray-900 px-2">
          <Send className="w-3.5 h-3.5" />
          Gửi yêu cầu
        </button>
        <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer">L</div>
      </header>

      {/* ═══════ BODY ═══════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Nội dung bài học</span>
            <button className="text-gray-300 hover:text-gray-500"><X className="w-3.5 h-3.5" /></button>
          </div>

          {/* Slides */}
          <div className="px-3 py-1">
            <div className="flex items-center justify-between px-1 py-2 cursor-pointer">
              <span className="text-[13px] font-bold text-gray-800">Slides</span>
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
                <div className={`p-1 rounded shrink-0 ${contentView === "slide" && s.id === 1 ? "bg-indigo-100" : "bg-orange-50"}`}>
                  <BookOpen className={`w-3 h-3 ${contentView === "slide" && s.id === 1 ? "text-indigo-600" : "text-orange-500"}`} />
                </div>
                <span className={`text-[12px] flex-1 truncate font-medium ${contentView === "slide" && s.id === 1 ? "text-indigo-700 font-semibold" : "text-gray-700"}`}>
                  {s.title}
                </span>
                {s.id === 1 && contentView === "slide" && (
                  <span className="text-[10px] font-bold text-indigo-500 shrink-0">Đang học</span>
                )}
              </button>
            ))}
          </div>

          {/* Videos */}
          <div className="px-4 py-2 border-t border-gray-100 mt-1">
            <div className="flex items-center justify-between cursor-pointer py-1">
              <span className="text-[13px] font-bold text-gray-800">Videos</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Lab */}
          <div className="px-3 py-2 border-t border-gray-100">
            <div className="flex items-center gap-2 px-1 py-2 cursor-pointer">
              <div className="p-1 bg-teal-50 rounded"><BookOpen className="w-3 h-3 text-teal-600" /></div>
              <span className="text-[12px] font-bold text-gray-800 flex-1">Day0{day}-AI-Product-Labs</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex flex-col gap-0.5 mt-1">
              {LAB_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLabClick(item.id)}
                  className={`w-full flex items-start gap-2.5 px-2 py-2 rounded-lg transition-colors text-left ${
                    activeLabId === item.id
                      ? "bg-indigo-50 border-l-[3px] border-indigo-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                    activeLabId === item.id
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-300 text-gray-400"
                  }`}>
                    {item.id}
                  </div>
                  <span className={`text-[12px] leading-snug line-clamp-2 ${activeLabId === item.id ? "text-indigo-700 font-semibold" : "text-gray-600 font-medium"}`}>
                    {item.short}
                  </span>
                  {activeLabId === item.id && (
                    <span className="text-[10px] font-bold text-indigo-500 shrink-0 mt-0.5">Đang học</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── CENTER ── */}
        <main className="flex-1 bg-[#F8F9FC] flex flex-col overflow-y-auto">

          {/* SLIDE VIEW */}
          {contentView === "slide" && (
            <div className="flex-1 p-6 flex flex-col items-center">
              <div className="w-full max-w-3xl flex flex-col gap-4">
                {/* Slide */}
                <div className="bg-[#8DAA91] rounded-2xl shadow-lg overflow-hidden relative" style={{ aspectRatio: "16/9.5" }}>
                  <iframe 
                    src={`/slides/day${day}.pdf#page=${page}&toolbar=0&navpanes=0`} 
                    className="w-full h-full border-none absolute inset-0 z-10"
                    title="Slide Viewer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none -rotate-12 z-0">
                    <span className="text-[20px] font-bold tracking-widest text-black whitespace-nowrap">
                      26A_PHATLCT@VINUNI.EDU.VN
                    </span>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm text-gray-500">
                  <div className="flex items-center gap-0.5">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-sm">✏️</button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-sm">📄</button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-sm">🗒️</button>
                    <div className="w-px h-4 bg-gray-200 mx-1" />
                    <button onClick={() => {}} className="p-1.5 hover:bg-gray-100 rounded-lg text-xs font-bold">−</button>
                    <span className="px-2 text-[12px] font-semibold text-gray-600">100%</span>
                    <button onClick={() => {}} className="p-1.5 hover:bg-gray-100 rounded-lg text-xs font-bold">+</button>
                  </div>
                  <div className="flex items-center gap-1 text-[13px] font-semibold text-gray-600">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2 py-0.5 hover:text-gray-900 disabled:opacity-30" disabled={page === 1}>&lt;</button>
                    <span>{page} / 76</span>
                    <button onClick={() => setPage((p) => Math.min(76, p + 1))} className="px-2 py-0.5 hover:text-gray-900">&gt;</button>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-100 rounded-lg text-[12px] font-semibold text-gray-700">
                    <FileText className="w-3.5 h-3.5" /> Sổ ghi chú
                  </button>
                </div>

                {/* Note */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-gray-700 mb-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400" /> Ghi chú của giảng viên
                  </div>
                  <p className="text-[13px] text-gray-400">Chưa có ghi chú cho phần này.</p>
                </div>

                {/* Reactions */}
                <div className="flex items-center gap-3 text-gray-400 pb-4">
                  <button onClick={() => setLiked("up")} className={`p-1.5 rounded-lg transition-colors ${liked === "up" ? "text-indigo-600 bg-indigo-50" : "hover:bg-gray-100"}`}><ThumbsUp className="w-4 h-4" /></button>
                  <button onClick={() => setLiked("down")} className={`p-1.5 rounded-lg transition-colors ${liked === "down" ? "text-red-500 bg-red-50" : "hover:bg-gray-100"}`}><ThumbsDown className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><Flag className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          )}

          
          {/* TRANSCRIPT VIEW */}
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

          {/* LAB CONTENT VIEW */}
          {contentView === "lab" && activeLabItem && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{activeLabItem.title}</h1>

                {/* About box */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold text-blue-800 mb-1">Ve bai lab nay</p>
                    <p className="text-[13px] text-blue-700 leading-relaxed">{activeLabItem.about}</p>
                  </div>
                </div>

                {/* Markdown content */}
                <div className="prose prose-sm max-w-none text-gray-800">
                  {activeLabItem.content.split("\n").map((line, i) => {
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

                {/* Code block sections */}
                {activeLabItem.content.includes("```") && (
                  <div className="mt-4 bg-gray-900 rounded-xl p-4 font-mono text-[13px] text-green-400 leading-relaxed whitespace-pre overflow-x-auto">
                    {activeLabItem.content.split("```")[1]?.replace(/^[a-z]*\n/, "")}
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => activeLabItem.id > 1 && handleLabClick(activeLabItem.id - 1)}
                    disabled={activeLabItem.id === 1}
                    className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" /> Trang trước
                  </button>
                  <div className="flex items-center gap-3 text-gray-400">
                    <ThumbsUp className={`w-4 h-4 cursor-pointer hover:text-indigo-600 ${liked === "up" ? "text-indigo-600" : ""}`} onClick={() => setLiked("up")} />
                    <ThumbsDown className={`w-4 h-4 cursor-pointer hover:text-red-500 ${liked === "down" ? "text-red-500" : ""}`} onClick={() => setLiked("down")} />
                    <Flag className="w-4 h-4 cursor-pointer hover:text-gray-600" />
                  </div>
                  <button
                    onClick={() => activeLabItem.id < LAB_ITEMS.length && handleLabClick(activeLabItem.id + 1)}
                    disabled={activeLabItem.id === LAB_ITEMS.length}
                    className="flex items-center gap-2 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-30"
                  >
                    Tiep theo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ── RIGHT SIDEBAR — Spoke Bot ── */}
        <aside className="w-[290px] bg-white border-l border-gray-200 flex flex-col shrink-0">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-[14px] text-gray-900">Tro giang AI</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <button onClick={() => setMessages([])} className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-gray-600 transition-colors" title="Chat moi">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-gray-600 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {isEmpty && (
              <div className="flex flex-col items-center text-center gap-3 mt-16">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-bold text-[14px] text-gray-900">PHAT co gi can hoi sang nay khong?</p>
                  <p className="text-[12px] text-gray-400 mt-1 leading-relaxed">
                    Dang mo: {contentView === "slide" ? "Slide - GV Mai Anh" : activeLabItem?.short ?? "Lab"} · trang {page}
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className={`max-w-[88%] px-3 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gray-100 text-gray-800 rounded-tr-md"
                    : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-md"
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
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-3 py-2.5 shadow-sm">
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
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 focus-within:bg-white focus-within:border-gray-300 focus-within:shadow-sm transition-all">
              <textarea
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
                placeholder="Hoi bat cu dieu gi..."
                className="flex-1 bg-transparent resize-none border-none focus:outline-none text-[13px] text-gray-800 placeholder-gray-400 max-h-24"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className={`p-1.5 rounded-xl shrink-0 transition-all ${input.trim() && !loading ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2">Tro giang AI co the sai - hay doi chieu voi bai giang.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div>Loading lesson...</div>}>
      <LessonContent />
    </Suspense>
  );
}
