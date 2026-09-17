# Bảng kết quả kiểm thử (Benchmark Results)

Tài liệu này ghi nhận kết quả các lượt chạy kiểm thử (eval) trên bộ Golden Set (20 cases) để đo lường hiệu năng của hệ thống Hub & Spoke (VLearn).

---

## Lần chạy: 18/09/2026 (Checkpoint 4)

**Cấu hình hệ thống:**
- **Mô hình AI:** `gemini-3.5-flash-lite`
- **Knowledge Index:** Đã tái cấu trúc sang chuẩn mới (Khóa chính `concept_id` tiếng Anh, mảng `slides`, `keywords`, và `transcript_refs`).
- **Nguồn đánh giá:** File `eval/benchmark_runner.py` (Giám khảo LLM độc lập).

### 1. Tổng quan (Final Summary)
- **Tổng số ca PASS:** 18 / 20 test cases.
- **Tỷ lệ thành công (Overall Pass Rate):** **90.0%** ✅ (Đạt chỉ tiêu CP4).

### 2. Các chỉ số đo lường chi tiết
Theo định hướng của Spec và Checkpoint 4, hệ thống đạt các chỉ số sau:

| Chỉ số (Metrics) | Kết quả | Chi tiết | Đánh giá |
|:---|:---:|:---|:---:|
| **Routing Precision** (Độ chính xác điều hướng) | 100% | 5/5 cases `D1_HUB`. Hub Bot map đúng `concept_id` và điều hướng mượt mà, không đi sai lộ trình. | 🟢 Xuất sắc |
| **Prerequisite Accuracy** (Bắt lỗi vượt cấp/Prerequisite) | 100% | 5/5 cases `D2_HUB`. Bắt gọn các học viên Day 1 "cầm đèn chạy trước ô tô" (hỏi kiến thức Day 3), cảnh báo và gợi ý đúng điều kiện tiên quyết. | 🟢 Xuất sắc |
| **Zero-Hallucination & Citation Rate** (Trích dẫn & Không bịa) | 100% | 5/5 cases `D35_BOT`. Bot Con 100% trích dẫn đúng `[Day X - Slide Y]`, trả lời Helpful và không bịa đặt (Fabricated: False). | 🟢 Xuất sắc |
| **Out-of-scope Rejection Rate** (Tỷ lệ từ chối ngoài lề) | 60% | 3/5 cases `D4_BOT`. Bot từ chối đúng 3 cases, 2 cases còn lại do lỗi "nhiệt tình" trả lời vòng vo thay vì dứt khoát từ chối. | 🟡 Cần tinh chỉnh Prompt |

### 3. Phân tích lỗi (Error Analysis)
Trong lượt chạy này, có 2 test cases không vượt qua được lưới chấm điểm khắt khe (Strict Mode):
- **`D4_BOT_01`** & **`D4_BOT_02`**:
  - **Kỳ vọng:** Khi hỏi code/kỹ thuật ngoài lề, Bot Con PHẢI trả lời chứa cụm từ `"Từ chối: Nằm ngoài phạm vi"`.
  - **Thực tế:** Mô hình `gemini-3.5-flash-lite` có xu hướng giải thích nhẹ nhàng hoặc vòng vo (bản tính thích giúp đỡ) nên đã "quên" chèn câu lệnh từ chối cứng (hard rejection) này vào đầu.
  - **Hướng khắc phục (Action Item):** Bổ sung chỉ thị mạnh hơn vào `spoke_node` prompt, ví dụ: *"BẤT KỂ BẠN BIẾT CÂU TRẢ LỜI, NẾU LÀ CÂU HỎI CODE/NGOÀI LỀ, BẠN CHỈ ĐƯỢC PHÉP IN RA ĐÚNG 1 CÂU: Từ chối: Nằm ngoài phạm vi"*.

### 4. Kết luận
- **Trạng thái:** **PASS CHECKPOINT 4** 🏆
- Việc chuẩn hóa cấu trúc Knowledge Index (chuyển sang Key Tiếng Anh và cấu trúc mảng) đã giúp Hub Bot triệt tiêu hoàn toàn lỗi suy luận nhầm lẫn (Routing Precision 100%). Token usage và tốc độ (dùng model Flash Lite) cũng được tối ưu rất tốt.
