"""
Auto Knowledge Index Pipeline — VLearn Hub & Spoke Tutor
Nhóm SHUP · K4-3A-E403

Pipeline:
  1. Parse PDF slide → text per slide
  2. Đọc transcript text
  3. Gọi Gemini API extract khái niệm
  4. Admin confirm/reject từng entry (CLI interactive)
  5. Merge entries đã confirm vào knowledge_index.json

Mỗi lần chạy tạo 1 folder trong eval/index_runs/:
  run_YYYYMMDD_HHMMSS_dayX/
    ├── run_summary.json      ← tổng quan
    ├── tokens_usage.json     ← token usage chi tiết + grand total
    ├── extracted_raw.json    ← LLM output thô
    ├── approved.json         ← entries admin confirm
    ├── rejected.json         ← entries admin reject
    └── run.log               ← full log toàn bộ quá trình

Usage:
  python auto_index.py --slide slides/d1-slide-hackathon.pdf \
                       --transcript transcript/transcript-04-clean.md \
                       --day 1
  python auto_index.py --slide slides/d1-slide-hackathon.pdf --day 1 --auto
"""

import json
import argparse
import os
import sys
import logging
import time
from pathlib import Path
from datetime import datetime, timezone, timedelta

# ── Thư viện cần cài ─────────────────────────────────────────────────────────
try:
    import pdfplumber
    # Tắt warning "Could not get FontBBox" của pdfminer (thư viện lõi của pdfplumber)
    logging.getLogger("pdfminer").setLevel(logging.ERROR)
except ImportError:
    print("[ERROR] Thiếu pdfplumber. Chạy: pip install pdfplumber")
    sys.exit(1)

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("[ERROR] Thiếu google-genai. Chạy: pip install google-genai")
    sys.exit(1)

# Load .env từ root project (nếu có python-dotenv)
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).parent.parent.parent / ".env"
    if _env_path.exists():
        load_dotenv(_env_path)
        print(f"[ENV] Loaded .env từ {_env_path}")
    else:
        print(f"[ENV] Không tìm thấy .env tại {_env_path} — dùng biến môi trường hệ thống")
except ImportError:
    print("[ENV] python-dotenv chưa cài — dùng biến môi trường hệ thống")
    print("      (Cài bằng: pip install python-dotenv)")


# ── Paths ─────────────────────────────────────────────────────────────────────
REPO_ROOT          = Path(__file__).parent.parent.parent
KNOWLEDGE_INDEX    = REPO_ROOT / "eval" / "knowledge_index.json"
INDEX_RUNS_DIR     = REPO_ROOT / "eval" / "index_runs"
GEMINI_MODEL       = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")

# Giá tham khảo Gemini 2.0 Flash (USD per 1M tokens) — cập nhật nếu đổi model
PRICE_INPUT_PER_1M  = 0.075
PRICE_OUTPUT_PER_1M = 0.30

# Timezone Việt Nam
VN_TZ = timezone(timedelta(hours=7))


# ── Prompt ────────────────────────────────────────────────────────────────────
EXTRACT_PROMPT = """
Bạn là chuyên gia phân tích nội dung giáo trình AI thực chiến.
Tôi cung cấp nội dung slide và transcript của Day {day} trong khóa học "AI Thực Chiến".

Hãy extract ra các KHÁI NIỆM CHÍNH được dạy trong buổi này.
Mỗi khái niệm là một unit kiến thức độc lập mà học viên cần nắm.

QUY TẮC:
- Không extract: câu hỏi ôn tập, ví dụ nhỏ, tiêu đề chương, phần giới thiệu giảng viên
- "concept_id": viết bằng Tiếng Anh, chữ thường, nối bằng dấu gạch dưới (VD: "llm_concept"). ĐÂY LÀ KHÓA CHÍNH.
- "concept_name": Tên khái niệm hiển thị (Tiếng Việt).
- "prerequisites": Mảng chứa các "concept_id" của những khái niệm cần học trước.
- "slide_refs": Mảng các object chứa vị trí trên slide. Trích xuất chính xác số trang (page), đoạn text nguyên bản (quote) và vị trí dòng ước lượng (line_number). Nếu không có, để [].
- "transcript_refs": Mảng các object chứa vị trí trong transcript. Trích xuất đoạn text (quote), timestamp (nếu có), và vị trí dòng ước lượng (line_number). Nếu không có, để [].

Trả về JSON array THUẦN TÚY, KHÔNG thêm markdown hay text khác:
[
  {{
    "concept_id": "english_key_id",
    "concept_name": "Tên khái niệm hiển thị (Tiếng Việt)",
    "slide_refs": [
      {{ "page": 1, "quote": "Đoạn text chính xác trên slide", "line_number": 5 }}
    ],
    "transcript_refs": [
      {{ "quote": "Đoạn text chính xác trong transcript", "timestamp": "12:05", "line_number": 142 }}
    ],
    "level": "basic | intermediate | advanced",
    "summary": "1 câu mô tả súc tích bằng tiếng Việt",
    "prerequisites": ["concept_id_A", "concept_id_B"],
    "keywords": ["từ khóa 1", "từ khóa 2"]
  }}
]

=== NỘI DUNG SLIDE DAY {day} ===
{slide_content}

=== TRANSCRIPT DAY {day} ===
{transcript_content}
""".strip()


# ── RunLogger: ghi log + theo dõi token ──────────────────────────────────────
class RunLogger:
    """Ghi log ra file và stdout, theo dõi token usage mỗi API call."""

    def __init__(self, run_dir: Path):
        self.run_dir    = run_dir
        self.log_path   = run_dir / "run.log"
        self.token_calls: list[dict] = []
        self.start_time = time.time()

        # Setup logger ghi đồng thời ra file + stdout
        self.logger = logging.getLogger(f"auto_index.{run_dir.name}")
        self.logger.setLevel(logging.DEBUG)
        self.logger.propagate = False

        fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s",
                                datefmt="%Y-%m-%d %H:%M:%S")

        fh = logging.FileHandler(self.log_path, encoding="utf-8")
        fh.setLevel(logging.DEBUG)
        fh.setFormatter(fmt)

        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.INFO)
        ch.setFormatter(fmt)

        self.logger.addHandler(fh)
        self.logger.addHandler(ch)

    def info(self, msg):  self.logger.info(msg)
    def debug(self, msg): self.logger.debug(msg)
    def warn(self, msg):  self.logger.warning(msg)
    def error(self, msg): self.logger.error(msg)

    def record_token_call(self, purpose: str, response) -> dict:
        """Trích token usage từ Gemini response và ghi vào log."""
        usage = getattr(response, "usage_metadata", None)

        prompt_tokens     = getattr(usage, "prompt_token_count",     0) if usage else 0
        completion_tokens = getattr(usage, "candidates_token_count", 0) if usage else 0
        total_tokens      = getattr(usage, "total_token_count",      0) if usage else (prompt_tokens + completion_tokens)

        cost_usd = (prompt_tokens / 1_000_000 * PRICE_INPUT_PER_1M +
                    completion_tokens / 1_000_000 * PRICE_OUTPUT_PER_1M)

        call_record = {
            "call_id":           len(self.token_calls) + 1,
            "purpose":           purpose,
            "model":             GEMINI_MODEL,
            "timestamp":         datetime.now(VN_TZ).isoformat(),
            "prompt_tokens":     prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens":      total_tokens,
            "estimated_cost_usd": round(cost_usd, 6),
        }
        self.token_calls.append(call_record)

        self.logger.info(
            f"[TOKEN] {purpose}: prompt={prompt_tokens} | "
            f"completion={completion_tokens} | total={total_tokens} | "
            f"~${cost_usd:.6f}"
        )
        return call_record

    def save_tokens_usage(self) -> dict:
        """Tổng hợp token usage và lưu ra file."""
        grand_prompt     = sum(c["prompt_tokens"]     for c in self.token_calls)
        grand_completion = sum(c["completion_tokens"] for c in self.token_calls)
        grand_total      = sum(c["total_tokens"]      for c in self.token_calls)
        grand_cost       = sum(c["estimated_cost_usd"] for c in self.token_calls)

        grand_summary = {
            "prompt_tokens":      grand_prompt,
            "completion_tokens":  grand_completion,
            "total_tokens":       grand_total,
            "total_calls":        len(self.token_calls),
            "estimated_cost_usd": round(grand_cost, 6),
        }

        payload = {
            "calls":       self.token_calls,
            "grand_total": grand_summary,
        }

        out_path = self.run_dir / "tokens_usage.json"
        out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

        self.logger.info(
            f"[TOKEN SUMMARY] calls={len(self.token_calls)} | "
            f"prompt={grand_prompt} | completion={grand_completion} | "
            f"total={grand_total} | ~${grand_cost:.6f}"
        )
        return grand_summary

    def elapsed(self) -> float:
        return round(time.time() - self.start_time, 2)


# ── Step 1: Parse PDF ─────────────────────────────────────────────────────────
def parse_pdf(pdf_path: str, log: RunLogger) -> str:
    log.info(f"[PARSE] Đọc PDF: {pdf_path}")
    result = []
    with pdfplumber.open(pdf_path) as pdf:
        total = len(pdf.pages)
        for i, page in enumerate(pdf.pages, start=1):
            text = (page.extract_text() or "").strip()
            if text:
                result.append(f"[Slide {i}]\n{text}")
            else:
                log.debug(f"[PARSE] Slide {i}/{total}: không extract được text (có thể là hình ảnh)")
        log.info(f"[PARSE] Xong: {total} slides · {len(result)} slides có text")
    return "\n\n".join(result)


# ── Step 2: Đọc transcript ────────────────────────────────────────────────────
def read_transcript(path: str | None, log: RunLogger) -> str:
    if not path:
        log.info("[TRANSCRIPT] Không có transcript — chạy chỉ với slide")
        return "(Không có transcript)"
    p = Path(path)
    if not p.exists():
        log.warn(f"[TRANSCRIPT] Không tìm thấy file: {path}")
        return "(Không có transcript)"
    content = p.read_text(encoding="utf-8")
    log.info(f"[TRANSCRIPT] Đã đọc: {len(content):,} ký tự · {path}")
    return content


# ── Step 3: Gọi Gemini extract ────────────────────────────────────────────────
def extract_concepts(slide_content: str, transcript_content: str,
                     day: int, log: RunLogger,
                     client: genai.Client) -> list[dict]:
    # Pass full content without aggressive truncation (Gemini supports 1M+ tokens)
    slide_truncated      = slide_content
    transcript_truncated = transcript_content

    prompt = EXTRACT_PROMPT.format(
        day=day,
        slide_content=slide_truncated,
        transcript_content=transcript_truncated,
    )

    log.info(f"[EXTRACT] Gọi Gemini ({GEMINI_MODEL}) — prompt ~{len(prompt):,} chars")
    log.debug(f"[EXTRACT] Prompt preview (500 chars):\n{prompt[:500]}...")

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=4096,
        ),
    )

    log.record_token_call("extract_concepts", response)

    raw = response.text.strip()
    log.debug(f"[EXTRACT] Raw response ({len(raw)} chars):\n{raw[:800]}...")

    # Bỏ markdown fence nếu LLM bọc trong ```json ... ```
    if raw.startswith("```"):
        parts = raw.split("```")
        raw = parts[1] if len(parts) > 1 else raw
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    try:
        concepts = json.loads(raw)
        log.info(f"[EXTRACT] Extract được {len(concepts)} khái niệm")
        return concepts
    except json.JSONDecodeError as e:
        log.error(f"[EXTRACT] JSON không hợp lệ: {e}")
        log.debug(f"[EXTRACT] Raw output:\n{raw}")
        raise


# ── Step 4: Admin Review CLI ──────────────────────────────────────────────────
def admin_review(concepts: list[dict], day: int, log: RunLogger) -> tuple[list, list]:
    """
    Hiển thị từng concept để admin confirm/reject/edit.
    Trả về (approved_list, rejected_list).
    """
    print("\n" + "═" * 64)
    print(f"  ADMIN REVIEW — Day {day} · {len(concepts)} khái niệm được extract")
    print("  [Enter] Confirm ✅  |  [r] Reject ❌  |  [e] Edit ✏️  |  [s] Skip all")
    print("═" * 64)

    approved = []
    rejected = []

    for i, c in enumerate(concepts, start=1):
        prereqs = c.get("prerequisites", [])
        s_refs = c.get("slide_refs", [])
        t_refs = c.get("transcript_refs", [])
        keywords = c.get("keywords", [])
        
        print(f"\n[{i}/{len(concepts)}] ───────────────────────────────────────")
        print(f"  Concept ID: {c.get('concept_id','?')}")
        print(f"  Name      : {c.get('concept_name','?')}")
        print(f"  Slide refs: {s_refs}")
        print(f"  Trans refs: {t_refs}")
        print(f"  Level     : {c.get('level','?')}")
        print(f"  Summary   : {c.get('summary','?')}")
        print(f"  Prereqs   : {prereqs if prereqs else '(không có)'}")
        print(f"  Keywords  : {keywords}")

        action = input("\n  → [Enter/r/e/s]: ").strip().lower()
        log.debug(f"[REVIEW] Concept '{c.get('concept_id')}' — action='{action}'")

        if action == "r":
            log.info(f"[REVIEW] REJECT: {c.get('concept_id')}")
            c["day"] = day
            c["_review_action"] = "rejected"
            rejected.append(c)
            print("  ❌ Rejected")

        elif action == "e":
            print("  ✏️  Edit (Enter để giữ nguyên):")
            c["concept_id"]   = input(f"    Concept ID   [{c.get('concept_id')}]: ").strip() or c.get("concept_id")
            c["concept_name"] = input(f"    Concept Name [{c.get('concept_name')}]: ").strip() or c.get("concept_name")
            
            new_slides = input(f"    Slides       [{slides}]: ").strip()
            if new_slides:
                try:
                    c["slides"] = [int(x.strip()) for x in new_slides.split(",") if x.strip()]
                except ValueError:
                    print("    (Lỗi: Slides phải là số nguyên cách nhau bằng dấu phẩy. Giữ nguyên.)")
                    
            c["level"]   = input(f"    Level        [{c.get('level')}]: ").strip()   or c.get("level")
            c["summary"] = input(f"    Summary      [{c.get('summary')}]: ").strip() or c.get("summary")
            
            new_pre = input(f"    Prereqs      [{prereqs}]: ").strip()
            if new_pre:
                c["prerequisites"] = [p.strip() for p in new_pre.split(",") if p.strip()]
                
            new_kws = input(f"    Keywords     [{keywords}]: ").strip()
            if new_kws:
                c["keywords"] = [k.strip() for k in new_kws.split(",") if k.strip()]
                
            c["day"] = day
            c["_review_action"] = "edited_and_approved"
            approved.append(c)
            log.info(f"[REVIEW] EDIT+APPROVE: {c['concept_id']}")
            print("  ✅ Edited & Confirmed")

        elif action == "s":
            log.info(f"[REVIEW] SKIP ALL — dừng tại concept {i}/{len(concepts)}")
            print("  ⏩ Skip all remaining")
            break

        else:
            c["day"] = day
            c["_review_action"] = "approved"
            approved.append(c)
            log.info(f"[REVIEW] APPROVE: {c.get('concept_id')}")
            print("  ✅ Confirmed")

    print(f"\n  Kết quả: ✅ {len(approved)} approved · ❌ {len(rejected)} rejected")
    return approved, rejected


# ── Step 5: Merge vào knowledge_index.json ────────────────────────────────────
def merge_to_index(approved: list[dict], log: RunLogger) -> None:
    if KNOWLEDGE_INDEX.exists():
        index = json.loads(KNOWLEDGE_INDEX.read_text(encoding="utf-8"))
        log.info(f"[MERGE] Đọc index hiện tại: {len(index)} entries")
    else:
        index = {}
        KNOWLEDGE_INDEX.parent.mkdir(parents=True, exist_ok=True)
        log.info("[MERGE] Tạo knowledge_index.json mới")

    added = updated = 0
    for entry in approved:
        key = entry.get("concept_id")
        if not key:
            log.error(f"[MERGE] Thiếu concept_id, bỏ qua entry: {entry}")
            continue
            
        action = "UPDATE" if key in index else "ADD"
        if action == "UPDATE":
            updated += 1
        else:
            added += 1
        log.info(f"[MERGE] {action}: '{entry.get('concept_name')}' → key='{key}'")

        # Bỏ internal field trước khi lưu
        clean = {k: v for k, v in entry.items() if not k.startswith("_")}
        index[key] = clean

    KNOWLEDGE_INDEX.write_text(
        json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    log.info(f"[MERGE] Saved: +{added} mới · ~{updated} cập nhật · total={len(index)}")


# ── Tạo run directory ─────────────────────────────────────────────────────────
def create_run_dir(day: int) -> Path:
    ts = datetime.now(VN_TZ).strftime("%Y%m%d_%H%M%S")
    run_dir = INDEX_RUNS_DIR / f"run_{ts}_day{day}"
    run_dir.mkdir(parents=True, exist_ok=True)
    return run_dir


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Auto-Index Pipeline — VLearn Hub & Spoke")
    parser.add_argument("--slide",      required=True,             help="Đường dẫn PDF slide")
    parser.add_argument("--transcript", default=None,              help="Đường dẫn transcript (optional)")
    parser.add_argument("--day",        required=True, type=int,   help="Số thứ tự buổi học (vd: 1)")
    parser.add_argument("--auto",       action="store_true",       help="Auto-confirm tất cả (dùng để test)")
    args = parser.parse_args()

    # ── Setup run environment ────────────────────────────────────────────────
    run_dir = create_run_dir(args.day)
    log     = RunLogger(run_dir)
    run_id  = run_dir.name

    log.info(f"{'='*64}")
    log.info(f"  VLearn Auto-Index Pipeline · run_id={run_id}")
    log.info(f"  Day={args.day} · slide={args.slide} · transcript={args.transcript}")
    log.info(f"  auto_confirm={args.auto} · output_dir={run_dir}")
    log.info(f"{'='*64}")

    # ── Gemini client ────────────────────────────────────────────────────────
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        log.error("Thiếu GEMINI_API_KEY. Chạy: export GEMINI_API_KEY=your_key")
        sys.exit(1)
    client = genai.Client(api_key=api_key)

    # ── Step 1: Parse ────────────────────────────────────────────────────────
    log.info("[STEP 1/4] Parse tài liệu")
    slide_content      = parse_pdf(args.slide, log)
    transcript_content = read_transcript(args.transcript, log)

    # ── Step 2: Extract ──────────────────────────────────────────────────────
    log.info("[STEP 2/4] Extract khái niệm bằng Gemini")
    try:
        concepts = extract_concepts(slide_content, transcript_content, args.day, log, client)
    except Exception as e:
        log.error(f"Extract thất bại: {e}")
        sys.exit(1)

    # Lưu raw output
    raw_path = run_dir / "extracted_raw.json"
    raw_path.write_text(json.dumps(concepts, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"[STEP 2/4] Đã lưu extracted_raw.json ({len(concepts)} concepts)")

    # ── Step 3: Admin Review ─────────────────────────────────────────────────
    log.info("[STEP 3/4] Admin review")

    if args.auto:
        log.info("[STEP 3/4] Auto-confirm mode (--auto flag)")
        approved = []
        for c in concepts:
            c["day"] = args.day
            c["_review_action"] = "auto_approved"
            approved.append(c)
        rejected = []
    else:
        approved, rejected = admin_review(concepts, args.day, log)

    # Lưu approved + rejected
    (run_dir / "approved.json").write_text(
        json.dumps(approved, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (run_dir / "rejected.json").write_text(
        json.dumps(rejected, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    log.info(f"[STEP 3/4] Đã lưu approved.json ({len(approved)}) · rejected.json ({len(rejected)})")

    if not approved:
        log.warn("[STEP 3/4] Không có concept nào được approve — dừng")

    # ── Step 4: Merge ────────────────────────────────────────────────────────
    if approved:
        log.info("[STEP 4/4] Merge vào knowledge_index.json")
        merge_to_index(approved, log)

    # ── Lưu token usage ──────────────────────────────────────────────────────
    token_summary = log.save_tokens_usage()

    # ── Lưu run summary ──────────────────────────────────────────────────────
    summary = {
        "run_id":                    run_id,
        "timestamp":                 datetime.now(VN_TZ).isoformat(),
        "day":                       args.day,
        "slide_file":                str(args.slide),
        "transcript_file":           str(args.transcript),
        "model":                     GEMINI_MODEL,
        "auto_confirm":              args.auto,
        "total_concepts_extracted":  len(concepts),
        "total_approved":            len(approved),
        "total_rejected":            len(rejected),
        "duration_seconds":          log.elapsed(),
        "tokens_total":              token_summary["total_tokens"],
        "estimated_cost_usd":        token_summary["estimated_cost_usd"],
        "knowledge_index_path":      str(KNOWLEDGE_INDEX),
    }
    (run_dir / "run_summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # ── Done ─────────────────────────────────────────────────────────────────
    log.info(f"{'='*64}")
    log.info(f"  ✅ DONE · Day {args.day} · {len(approved)}/{len(concepts)} approved")
    log.info(f"  Tokens: {token_summary['total_tokens']:,} total "
             f"(prompt={token_summary['prompt_tokens']:,} "
             f"completion={token_summary['completion_tokens']:,})")
    log.info(f"  Cost:   ~${token_summary['estimated_cost_usd']:.6f} USD")
    log.info(f"  Time:   {log.elapsed()}s")
    log.info(f"  Output: {run_dir}")
    log.info(f"{'='*64}")


if __name__ == "__main__":
    main()
