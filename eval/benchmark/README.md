# Benchmark — VLearn Hub & Spoke Tutor · Nhóm SHUP

> **Mục đích file này:** Là tài liệu hướng dẫn đủ để bất kỳ agent hoặc thành viên nào đọc và hiểu cần phải build gì, đo gì, và nộp gì.

---

## Cấu trúc thư mục

```
eval/benchmark/
├── README.md              ← file này — đọc trước tiên
├── cases/                 ← 20 test cases (golden set)
│   ├── hub_routing.json       (6 cases — Hub navigate liên ngày)
│   ├── hub_ahead_schedule.json (4 cases — Hub cảnh báo trước lịch)
│   ├── bot_con_citation.json  (4 cases — Bot Con trích dẫn đúng trang)
│   ├── hub_rejection.json     (4 cases — Hub từ chối câu ngoài scope)
│   └── admin_pipeline.json    (2 cases — Admin upload → index cập nhật)
├── judges/                ← Định nghĩa tiêu chí chấm từng chiều
│   ├── JUDGE_SPEC.md          ← đọc file này để biết chấm thế nào
│   └── llm_judge_prompt.txt   ← prompt dùng cho LLM-as-Judge
└── results/               ← Kết quả các lần chạy benchmark
    └── .gitkeep
```

---

## Tổng quan hệ thống cần đánh giá

Hệ thống gồm **3 thành phần** — benchmark phải đánh giá được cả 3:

```
[1] Hub Bot (Bot Hỗ Trợ)
    Nhận câu hỏi tự do → tra knowledge_index → check cohort + progress
    → navigate đúng Day/Slide hoặc cảnh báo / từ chối

[2] Bot Con (Bot Con Day X)
    Nhận câu hỏi chuyên sâu trong 1 Day → RAG trên slide+transcript Day đó
    → trả lời ≤3 câu + trích dẫn [Day X - Trang N]

[3] Admin Pipeline (auto_index.py)
    Upload slide PDF → LLM extract → Admin confirm → merge vào knowledge_index.json
    → Hub tự nhận index mới
```

---

## 5 chiều đo (Dimensions)

Mỗi test case được đánh giá trên **một hoặc nhiều chiều** sau:

### D1 — Hub Routing Accuracy
**Câu hỏi:** Hub có navigate đúng Day và Slide không?
**Cách đo:** So sánh `day_linked` và `slides_linked` trong output với expected.
**Quality bar:** ≥ 90% cases đúng.
**Loại judge:** Rule-based (check cứng).

---

### D2 — Prerequisite & Schedule Check
**Câu hỏi:** Khi học viên hỏi về nội dung chưa tới lịch học, Hub có cảnh báo và gợi prerequisite đúng không?
**Cách đo:**
- Nếu `expected_day > student_profile.current_day` → output phải chứa tín hiệu cảnh báo.
- Output phải mention prerequisite concept đúng (theo knowledge_index).
**Quality bar:** ≥ 95% cases đúng.
**Loại judge:** Rule-based + keyword check.

---

### D3 — Bot Con Citation Accuracy
**Câu hỏi:** Bot Con có luôn trích dẫn `[Day X - Trang N]` không? Có cite nhầm Day không?
**Cách đo:**
- Regex tìm pattern `[Day \d+ - (Slide|Trang) \d+]` trong output.
- Day trong citation phải khớp với Day của Bot Con đang xử lý.
- Số câu trong output phải ≤ 3.
**Quality bar:** 100% — không có ngoại lệ.
**Loại judge:** Rule-based (regex).

---

### D4 — Out-of-scope Rejection
**Câu hỏi:** Hub có từ chối câu ngoài chương trình mà không bịa nguồn không?
**Cách đo:**
- Output phải chứa tín hiệu từ chối rõ ràng.
- Output không được chứa link Day/Slide không có trong knowledge_index.
**Quality bar:** 100% từ chối đúng, 0% bịa nguồn.
**Loại judge:** Rule-based + LLM-as-Judge (check fabrication).

---

### D5 — Hallucination-free
**Câu hỏi:** Bot có bịa ra thông tin không có trong tài liệu không?
**Cách đo:** LLM judge so sánh output với knowledge_index + slide content thật.
**Quality bar:** 100% — bất kỳ trường hợp bịa nào đều là fail nghiêm trọng.
**Loại judge:** LLM-as-Judge (xem `judges/llm_judge_prompt.txt`).

---

## Cấu trúc 1 Test Case (Schema)

Mọi file JSON trong `cases/` đều theo schema này:

```json
{
  "id": "string — mã định danh duy nhất, vd: hub_001",
  "source": "string — chatlog_K4_MMDD hoặc synthetic",
  "input": "string — câu hỏi của học viên",
  "student_profile": "string — profile_day1 | profile_day3 | profile_done",
  "target_bot": "string — hub | bot_con_dayX | admin_pipeline",
  "dimensions": ["D1", "D2"],
  "expected": {
    "day_linked": "number | null — Day Hub phải link tới",
    "slides_linked": "string | null — range slide Hub phải link",
    "warns_schedule": "boolean — Hub có cảnh báo ahead-of-schedule không",
    "prereq_mentioned": "string | null — tên concept prerequisite phải mention",
    "has_citation": "boolean — output có [Day X - Trang N] không",
    "citation_day": "number | null — Day đúng trong citation",
    "max_sentences": "number | null — số câu tối đa cho phép",
    "rejects": "boolean — Hub có từ chối không",
    "no_hallucination": "boolean — không bịa nguồn"
  },
  "notes": "string — ghi chú thêm về case này (tùy chọn)"
}
```

---

## 20 Cases — Phân bổ

| File | Số case | Dimensions | Lấy từ đâu |
|---|---|---|---|
| `hub_routing.json` | 6 | D1, D5 | ≥4 case từ chatlog thật K4 |
| `hub_ahead_schedule.json` | 4 | D2, D5 | ≥2 case từ chatlog thật K4 |
| `bot_con_citation.json` | 4 | D3, D5 | ≥2 case từ chatlog thật K4 |
| `hub_rejection.json` | 4 | D4, D5 | mix: ngoài scope + prompt injection |
| `admin_pipeline.json` | 2 | — (functional test) | synthetic |
| **Tổng** | **20** | | **≥10 từ chatlog thật** |

> **Quan trọng:** Rubric yêu cầu ≥10 cases từ chatlog thật. Ghi rõ trường `"source"` trong từng case để chứng minh.

---

## Cách chạy Benchmark

> Code chưa được viết. Đọc phần này để biết cần build gì.

### Bước 1 — Chuẩn bị
```
1. Đảm bảo hệ thống Hub + Bot Con đang chạy được
2. Đảm bảo eval/knowledge_index.json đã có đủ entries
3. Đảm bảo eval/mock_data/ có:
   - cohort_schedule.json
   - student_progress.json (3 profiles)
```

### Bước 2 — Chạy
```bash
python eval/benchmark_runner.py --cases eval/benchmark/cases/ --output eval/benchmark/results/run_001.json
```

### Bước 3 — Đọc kết quả
Kết quả lưu tại `results/run_XXX.json` và in summary ra terminal:
```
PASS: 16/20 = 80%
D1 Routing:   14/16 = 87.5%  [bar ≥90%] ❌
D2 Prereq:     9/10 = 90%    [bar ≥95%] ❌
D3 Citation:   4/4  = 100%   [bar 100%] ✅
D4 Rejection:  4/4  = 100%   [bar 100%] ✅
D5 No-halluc: 18/20 = 90%    [bar 100%] ❌
```

### Bước 4 — Phân tích và ghi nhận
Với mỗi case fail, ghi vào kết quả:
- Case nào fail
- Fail ở dimension nào
- Output thực tế là gì
- Phán đoán nguyên nhân
- Đã fix chưa (nếu chưa thì ghi rõ)

> **Lưu ý:** Số xấu vẫn được điểm nếu ghi trung thực và có phân tích. Không được chỉnh sửa kết quả sau khi chạy.

---

## Kết quả cần nộp theo từng Checkpoint

| Checkpoint | Cần có trong `results/` |
|---|---|
| **CP3 — 16:00 17/9** | `run_001.json` — lần chạy đầu tiên, dù kết quả thấp |
| **CP4 — 21:00 17/9** | Spec chốt quality bar, không đổi sau đây |
| **CP5 — 13:00 18/9** | `run_final.json` — lần chạy cuối trước pitch |

---

## Quality Bar (đã chốt tại CP4)

| Dimension | Bar | Ghi chú |
|---|---|---|
| D1 Hub Routing Accuracy | ≥ 90% | Đo trên 16 cases có D1 |
| D2 Prerequisite Check | ≥ 95% | Đo trên 10 cases có D2 |
| D3 Citation Accuracy | 100% | Không có ngoại lệ |
| D4 Rejection Rate | 100% | Không có ngoại lệ |
| D5 Hallucination-free | 100% | Không có ngoại lệ |

---

## Những gì cần build (TODO cho agent)

Thứ tự ưu tiên:

- [ ] `cases/hub_routing.json` — 6 cases, ≥4 từ chatlog thật
- [ ] `cases/hub_ahead_schedule.json` — 4 cases, ≥2 từ chatlog thật
- [ ] `cases/bot_con_citation.json` — 4 cases, ≥2 từ chatlog thật
- [ ] `cases/hub_rejection.json` — 4 cases (2 ngoài scope + 2 injection)
- [ ] `cases/admin_pipeline.json` — 2 cases functional test
- [ ] `judges/JUDGE_SPEC.md` — định nghĩa chi tiết cách chấm từng dimension
- [ ] `judges/llm_judge_prompt.txt` — prompt cho LLM-as-Judge (D4, D5)
- [ ] `eval/benchmark_runner.py` — script chạy tự động toàn bộ
- [ ] `eval/mock_data/` — knowledge_index.json + cohort_schedule.json + student_progress.json

> **Để build cases:** Đọc `hackathon_docs/data/vlearn-pack/chatlog/` để lấy câu hỏi thật. Ưu tiên câu mà bot cũ đã fail (28% không có trích dẫn là nguồn case tốt).
