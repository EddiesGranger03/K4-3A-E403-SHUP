"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Loader2, AlertCircle 
} from "lucide-react";

interface PdfViewerProps {
  pdfUrl: string;
  currentPage: number;
  totalSlides: number;
  onPageChange: (page: number) => void;
  viewMode: "single" | "scroll"; // "single" = Theo trang, "scroll" = Cuộn dọc
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function PdfViewer({
  pdfUrl,
  currentPage,
  totalSlides,
  onPageChange,
  viewMode,
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.0);
  const [rendering, setRendering] = useState(false);
  const renderTaskRef = useRef<any>(null);

  // ── 1. Load PDF.js library ──────────────────────────────────
  useEffect(() => {
    let isMounted = true;

    const loadPdfJs = async () => {
      if (window.pdfjsLib) {
        return window.pdfjsLib;
      }

      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById("pdfjs-script");
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve(window.pdfjsLib));
          return;
        }

        const script = document.createElement("script");
        script.id = "pdfjs-script";
        script.src = "/vendor/pdfjs/pdf.min.js";
        script.onload = () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
            resolve(window.pdfjsLib);
          } else {
            reject(new Error("PDF.js failed to initialize"));
          }
        };
        script.onerror = () => {
          // Fallback to CDN
          const cdnScript = document.createElement("script");
          cdnScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          cdnScript.onload = () => {
            if (window.pdfjsLib) {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
              resolve(window.pdfjsLib);
            }
          };
          cdnScript.onerror = () => reject(new Error("Cannot load PDF.js from local or CDN"));
          document.head.appendChild(cdnScript);
        };
        document.head.appendChild(script);
      });
    };

    setLoading(true);
    setError(null);

    loadPdfJs()
      .then((pdfjs: any) => {
        if (!isMounted) return;
        return pdfjs.getDocument(pdfUrl).promise;
      })
      .then((doc: any) => {
        if (!isMounted || !doc) return;
        setPdfDoc(doc);
        setLoading(false);
      })
      .catch((err: any) => {
        if (!isMounted) return;
        console.error("PDF load error:", err);
        setError("Không thể nạp PDF. Chuyển sang khung xem dự phòng.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  const renderSeqRef = useRef(0);

  // ── 2. Render Single Page on Canvas (Theo trang - Không bị thừa mép) ────────────
  const renderSinglePage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current || viewMode !== "single") return;

    const currentSeq = ++renderSeqRef.current;

    // Await cancellation of previous render task if active
    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
        await renderTaskRef.current.promise;
      } catch {
        // Expected cancellation
      }
      renderTaskRef.current = null;
    }

    // If another render was initiated while cancelling, drop this one
    if (currentSeq !== renderSeqRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    try {
      setRendering(true);
      const pageNum = Math.min(Math.max(1, currentPage), pdfDoc.numPages);
      const page = await pdfDoc.getPage(pageNum);

      if (currentSeq !== renderSeqRef.current) return;

      const availableWidth = Math.max(200, container.clientWidth - 32);
      const availableHeight = Math.max(200, container.clientHeight - 32);

      const unscaledViewport = page.getViewport({ scale: 1 });
      
      const scaleX = availableWidth / unscaledViewport.width;
      const scaleY = availableHeight / unscaledViewport.height;
      const fitScale = Math.min(scaleX, scaleY > 0 ? scaleY : scaleX) * zoom;
      const viewport = page.getViewport({ scale: fitScale });

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.scale(dpr, dpr);

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;
      await task.promise;

      if (currentSeq === renderSeqRef.current) {
        renderTaskRef.current = null;
        setRendering(false);
      }
    } catch (err: any) {
      if (err?.name !== "RenderingCancelledException") {
        console.error("Render page error:", err);
      }
      if (currentSeq === renderSeqRef.current) {
        renderTaskRef.current = null;
        setRendering(false);
      }
    }
  }, [pdfDoc, currentPage, zoom, viewMode]);

  useEffect(() => {
    if (viewMode === "single") {
      renderSinglePage();
    }
  }, [renderSinglePage, viewMode, currentPage, zoom]);

  // Debounced ResizeObserver to prevent rapid-fire render calls during resize
  useEffect(() => {
    if (!containerRef.current || viewMode !== "single") return;
    let timeoutId: any = null;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        renderSinglePage();
      }, 120);
    });
    observer.observe(containerRef.current);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [renderSinglePage, viewMode]);

  return (
    <div className="w-full flex flex-col bg-slate-900 rounded-2xl shadow-xl border border-slate-700/60 overflow-hidden">
      
      {/* ── Main Display Area ── */}
      <div 
        ref={containerRef}
        className="w-full relative flex items-center justify-center bg-[#18202F] overflow-hidden"
        style={{ height: "calc(100vh - 250px)", minHeight: "440px" }}
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-white z-20 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <span className="text-sm font-medium text-slate-300">Đang chuẩn bị slide bài giảng...</span>
          </div>
        )}

        {/* Error Fallback */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-20 gap-3 p-6 text-center">
            <AlertCircle className="w-10 h-10 text-amber-400" />
            <p className="text-sm text-slate-300">{error}</p>
            <iframe 
              src={pdfUrl}
              className="w-full h-full border-0 rounded-xl"
              title="PDF Fallback"
            />
          </div>
        )}

        {/* ── MODE 1: THEO TRANG (Single Page Canvas - Không lộ trang sau) ── */}
        {viewMode === "single" && !error && (
          <div className="w-full h-full flex items-center justify-center p-3 select-none overflow-hidden">
            <canvas 
              key={`canvas-page-${currentPage}`}
              ref={canvasRef} 
              className="rounded-lg shadow-2xl transition-all max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* ── MODE 2: CUỘN DỌC (Continuous Vertical Scroll) ── */}
        {viewMode === "scroll" && (
          <div 
            ref={scrollContainerRef}
            className="w-full h-full overflow-y-auto p-4 flex flex-col items-center gap-6"
          >
            <iframe 
              src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
              className="w-full h-full border-0 rounded-xl shadow-2xl bg-white"
              style={{ minHeight: "calc(100vh - 280px)" }}
              title="PDF Continuous Scroll"
            />
          </div>
        )}
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div className="px-5 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-slate-300 flex-wrap gap-3">
        {/* Left: Zoom Controls */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.1).toFixed(1))))}
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-[11px] px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(2.0, Number((z + 0.1).toFixed(1))))}
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(1.0)}
            className="px-2 py-1 ml-1 rounded-lg hover:bg-slate-800 text-[11px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Vừa vặn màn hình"
          >
            Mặc định
          </button>
        </div>

        {/* Center: Slide Paging (Active in Single Mode) */}
        {viewMode === "single" ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1 || rendering}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              title="Slide trước (Phím ◄)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Trang trước</span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
              <span className="text-indigo-400 font-bold text-[13px]">{currentPage}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{totalSlides}</span>
            </div>

            <button
              onClick={() => onPageChange(Math.min(totalSlides, currentPage + 1))}
              disabled={currentPage >= totalSlides || rendering}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold shadow transition-all cursor-pointer"
              title="Slide sau (Phím ►)"
            >
              <span className="hidden sm:inline">Trang sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>📜 Đang ở chế độ cuộn dọc: Cuộn chuột để đọc toàn bộ tài liệu</span>
          </div>
        )}

        {/* Right: Keyboard Shortcut Hint */}
        <div className="text-[11px] text-slate-400 hidden md:flex items-center gap-2">
          <span>Phím tắt:</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-mono">◄</kbd>
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-mono">►</kbd>
        </div>
      </div>
    </div>
  );
}
