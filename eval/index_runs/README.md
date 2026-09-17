# Index Runs — Lịch sử chạy Auto-Index Pipeline

Mỗi lần chạy `auto_index.py` sẽ tạo ra 1 thư mục con theo timestamp tại đây.

## Cấu trúc 1 lần chạy

```
eval/index_runs/
└── run_YYYYMMDD_HHMMSS_dayX/
    ├── run_summary.json     ← Tổng quan: day, files, thời gian, kết quả
    ├── tokens_usage.json    ← Token usage chi tiết: prompt + completion + total
    ├── extracted_raw.json   ← Raw output LLM trả về (trước khi admin review)
    ├── approved.json        ← Entries đã được admin confirm
    ├── rejected.json        ← Entries đã bị admin reject
    └── run.log              ← Full log toàn bộ quá trình chạy
```

## Schema các file

### `run_summary.json`
```json
{
  "run_id": "run_20260917_113000_day1",
  "timestamp": "2026-09-17T11:30:00+07:00",
  "day": 1,
  "slide_file": "path/to/slide.pdf",
  "transcript_file": "path/to/transcript.md",
  "model": "gemini-2.0-flash",
  "total_concepts_extracted": 12,
  "total_approved": 9,
  "total_rejected": 3,
  "duration_seconds": 47.3,
  "tokens_total": 8420
}
```

### `tokens_usage.json`
```json
{
  "calls": [
    {
      "call_id": 1,
      "purpose": "extract_concepts",
      "prompt_tokens": 3200,
      "completion_tokens": 820,
      "total_tokens": 4020,
      "model": "gemini-2.0-flash",
      "timestamp": "2026-09-17T11:30:05+07:00"
    }
  ],
  "grand_total": {
    "prompt_tokens": 3200,
    "completion_tokens": 820,
    "total_tokens": 4020,
    "total_calls": 1,
    "estimated_cost_usd": 0.0008
  }
}
```

### `extracted_raw.json`
LLM output thô — danh sách entries trước khi admin review.

### `approved.json` / `rejected.json`
Entries sau khi admin xử lý, merge vào knowledge_index.json.

### `run.log`
Full log: parse → extract → mỗi bước admin review → merge.

## Lưu ý
- Không commit file này lên repo nộp bài (chứa API call log và token count)
- Thêm `eval/index_runs/run_*/` vào `.gitignore`
- Giữ lại để audit và debug pipeline
