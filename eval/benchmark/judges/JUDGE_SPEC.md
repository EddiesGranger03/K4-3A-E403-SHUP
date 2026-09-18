# Judge Specification — Cách chấm từng Dimension

> File này định nghĩa chính xác "thế nào là đúng" cho từng chiều đo.
> Người ngoài nhóm đọc file này phải chấm ra cùng kết quả với nhóm.

---

## D1 — Hub Routing Accuracy

**Pass khi:** Output của Hub chứa link/mention tới đúng Day và đúng range Slide
theo `expected.day_linked` và `expected.slides_linked` trong test case.

**Cụ thể:**
- Tìm pattern `Day X` trong output — X phải khớp `expected.day_linked`
- Tìm pattern `Slide Y` hoặc `Trang Y` — Y phải nằm trong range `expected.slides_linked`
- Nếu expected có nhiều Day (câu hỏi liên ngày) — output phải mention ĐỦ các Day đó

**Fail khi:**
- Link tới sai Day
- Không có link nào
- Link tới Slide không thuộc range expected

**Judge:** Rule-based, không cần LLM

---

## D2 — Prerequisite & Schedule Check

**Pass khi:**
1. Nếu `expected.warns_schedule = true`:
   - Output phải chứa ≥1 trong các signal: `"chưa tới"`, `"lịch"`, `"prerequisite"`, `"cần học trước"`, `"Day X trước"`
   - Output phải mention concept prerequisite theo `expected.prereq_mentioned`
2. Nếu `expected.warns_schedule = false`:
   - Output KHÔNG được chứa cảnh báo không cần thiết

**Fail khi:**
- Cần cảnh báo mà không cảnh báo
- Không cần cảnh báo mà cảnh báo (false alarm)
- Cảnh báo đúng nhưng không mention prerequisite cụ thể

**Judge:** Rule-based (keyword check) + human verify nếu borderline

---

## D3 — Bot Con Citation Accuracy

**Pass khi TẤT CẢ 3 điều kiện đều đúng:**
1. **Có citation:** Output chứa pattern `[Day \d+ - (Slide|Trang) \d+]`
2. **Đúng Day:** Số Day trong citation = `expected.citation_day`
3. **Súc tích:** Số câu trong output ≤ `expected.max_sentences` (thường = 3)

**Đếm câu:** Tách bởi dấu `.`, `?`, `!` — bỏ qua câu rỗng

**Fail khi:**
- Không có citation (dù chỉ 1 câu không có)
- Citation dùng Day sai (ví dụ Bot Con Day 4 cite `[Day 1 - Slide 12]`)
- Output dài hơn 3 câu

**Judge:** Rule-based (regex + sentence count)

---

## D4 — Out-of-scope Rejection

**Pass khi:**
- Output chứa ≥1 signal từ chối: `"không nằm trong"`, `"ngoài phạm vi"`, `"khóa học không dạy"`, `"không có trong"`, `"không hỗ trợ"`
- Output KHÔNG chứa link Day/Slide nào (vì đây là từ chối)
- Output KHÔNG bịa thông tin (xem D5)

**Fail khi:**
- Không từ chối mà trả lời câu ngoài scope
- Từ chối nhưng vẫn đưa ra thông tin bịa
- Từ chối câu đáng ra phải trả lời (false rejection)

**Judge:** Rule-based + LLM-as-Judge (xem `llm_judge_prompt.txt`)

---

## D5 — Hallucination-free

**Pass khi:**
- Mọi thông tin trong output đều có thể trace ngược về knowledge_index.json HOẶC nội dung slide/transcript thật

**Fail khi:**
- Output chứa link `[Day X - Slide Y]` mà entry đó KHÔNG có trong knowledge_index
- Output khẳng định điều gì về nội dung khóa học không có trong tài liệu
- Output "đoán chắc" khi không có căn cứ

**Judge:** LLM-as-Judge — dùng prompt trong `llm_judge_prompt.txt`

---

## Tổng hợp điểm

| Case | D1 | D2 | D3 | D4 | D5 | PASS |
|---|---|---|---|---|---|---|
| hub_001 | ✅ | — | — | — | ✅ | ✅ |
| bot_004 | — | — | ❌ | — | ❌ | ❌ |

**PASS = TẤT CẢ dimensions của case đó đều ✅**

---

## Nguyên tắc khi borderline

- **Nghi ngờ thì FAIL** — an toàn hơn là cho pass sai
- **Ghi rõ lý do** trong trường `"judge_note"` của kết quả
- **Không retroactively thay đổi** expected sau khi đã chạy
