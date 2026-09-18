export interface SlideItem {
  page: number;
  title: string;
  subtitle?: string;
  tag: string;
  tagColor?: "indigo" | "emerald" | "amber" | "purple" | "rose" | "sky" | "teal";
  points: Array<{
    title: string;
    desc: string;
    icon?: string;
  }>;
  takeaway: string;
  diagram?: {
    type: "steps" | "grid" | "compare" | "layers" | "quad";
    items: Array<{ label: string; sub?: string; color?: string }>;
  };
  quote?: string;
}

export const SLIDES_DATA: Record<string, Record<number, SlideItem>> = {
  // ── DAY 1: AI & LLM Foundation ──────────────────────────────
  "1": {
    1: {
      page: 1,
      title: "AI & LLM Foundation",
      subtitle: "Bạn đang dùng AI mỗi ngày — nhưng thực sự bên trong nó đang làm gì?",
      tag: "Tổng quan bài học",
      tagColor: "indigo",
      points: [
        { title: "Mục tiêu buổi 1", desc: "Hiểu bản chất kỹ thuật của LLM: từ dự đoán token, context window, attention đến huấn luyện.", icon: "🎯" },
        { title: "Giải phẫu bên trong", desc: "Không coi AI là chiếc hộp đen thần bí, mà là một cỗ máy suy luận dựa trên xác suất.", icon: "🔍" },
        { title: "Tư duy sản phẩm", desc: "Xác định rõ giới hạn, chi phí token và chọn mô hình phù hợp với bài toán thực tế.", icon: "💡" }
      ],
      takeaway: "Hiểu rõ cơ chế vận hành của LLM là bước đầu tiên để ứng dụng AI hiệu quả và tránh ảo giác."
    },
    2: {
      page: 2,
      title: "Mục Tiêu & Lộ Trình Buổi 1",
      subtitle: "Hành trình 29 slides từ cội nguồn AI đến ứng dụng thực tiễn",
      tag: "Lộ trình học tập",
      tagColor: "sky",
      points: [
        { title: "Phần 1: Cội nguồn & Phân loại", desc: "Lịch sử 70 năm phát triển AI và 3 nhóm AI chính trong kỷ nguyên hiện đại.", icon: "⏳" },
        { title: "Phần 2: Cơ chế sinh văn bản", desc: "Token, Context Window, Attention và quá trình huấn luyện Pre-training -> SFT -> RLHF.", icon: "⚙️" },
        { title: "Phần 3: Agent & Prompting", desc: "Giải phẫu AI Agent, kỹ thuật Chain-of-Thought và 4 lớp cấu trúc prompt.", icon: "🤖" }
      ],
      takeaway: "Lộ trình giúp bạn xây dựng nền móng vững chắc trước khi bước sang tư duy thiết kế sản phẩm ở Day 2."
    },
    3: {
      page: 3,
      title: "Hệ Thống Các Tầng AI",
      subtitle: "AI — Machine Learning — Deep Learning — Generative AI — LLM",
      tag: "Khái niệm nền tảng",
      tagColor: "indigo",
      points: [
        { title: "AI (Trí tuệ nhân tạo)", desc: "Chiếc ô lớn nhất: mọi hệ thống máy tính có yếu tố hành vi thông minh.", icon: "🌐" },
        { title: "Machine Learning (ML)", desc: "Máy tự học quy luật từ dữ liệu thay vì con người phải viết luật thủ công (hard-code).", icon: "📊" },
        { title: "Deep Learning (DL)", desc: "Mạng nơ-ron sâu nhiều tầng tự động trích xuất đặc trưng phức tạp.", icon: "🧠" },
        { title: "GenAI & LLM", desc: "GenAI sinh nội dung mới; LLM là mô hình nền tảng ngôn ngữ chuyên sâu đóng vai trò trái tim.", icon: "✨" }
      ],
      takeaway: "LLM là một tập con thuộc GenAI, được phát triển trên nền tảng Deep Learning và Machine Learning.",
      diagram: {
        type: "layers",
        items: [
          { label: "AI", sub: "Rộng nhất", color: "indigo" },
          { label: "Machine Learning", sub: "Học từ dữ liệu", color: "sky" },
          { label: "Deep Learning", sub: "Mạng nơ-ron sâu", color: "teal" },
          { label: "Generative AI / LLM", sub: "Sinh nội dung mới", color: "rose" }
        ]
      }
    },
    4: {
      page: 4,
      title: "Ba Nhóm AI Chính Trong Thực Tế",
      subtitle: "Phân loại theo phương thức hoạt động và mục đích sử dụng",
      tag: "Khái niệm nền tảng",
      tagColor: "emerald",
      points: [
        { title: "Discriminative AI (Phân loại)", desc: "Dự đoán nhãn, phân loại email spam, nhận diện khuôn mặt, chấm điểm tín nhiệm.", icon: "🏷️" },
        { title: "Generative AI (Sinh nội dung)", desc: "Tạo ra văn bản mới, code, hình ảnh, âm thanh dựa trên prompt đầu vào.", icon: "🎨" },
        { title: "Agentic AI (Hành động)", desc: "Nhận mục tiêu phức tạp, tự lập kế hoạch nhiều bước, dùng công cụ và thực thi.", icon: "⚡" }
      ],
      takeaway: "LLM ngày nay đóng vai trò là bộ não nền tảng (reasoning engine) dùng chung cho cả 3 nhóm AI này.",
      diagram: {
        type: "grid",
        items: [
          { label: "Phân loại", sub: "Discriminative AI", color: "blue" },
          { label: "Sinh nội dung", sub: "Generative AI", color: "emerald" },
          { label: "Hành động", sub: "Agentic AI", color: "purple" }
        ]
      }
    },
    5: {
      page: 5,
      title: "Lịch Sử AI Qua 70 Năm",
      subtitle: "Từ hệ chuyên gia đến cuộc cách mạng dữ liệu và mô hình lớn",
      tag: "Lịch sử & Xu hướng",
      tagColor: "amber",
      points: [
        { title: "1950 - Khai sinh", desc: "Phép thử Turing và những kỳ vọng đầu tiên về máy tính biết suy nghĩ.", icon: "🌱" },
        { title: "1980 - Hệ chuyên gia", desc: "Expert System: Cố gắng mã hóa luật if/else của chuyên gia, chạm trần vì không scale được.", icon: "📜" },
        { title: "2009 - ImageNet", desc: "Fei-Fei Li và cuộc cách mạng dữ liệu lớn làm bùng nổ Deep Learning.", icon: "📸" },
        { title: "2017 & 2022 - Bùng nổ", desc: "Kiến trúc Transformer ra đời (2017) và ChatGPT đưa AI tiếp cận toàn cầu (2022).", icon: "🚀" }
      ],
      takeaway: "AI phát triển nhờ 3 chân kiềng: Thuật toán (Transformer) + Dữ liệu quy mô lớn + Phần cứng tính toán (GPU)."
    },
    8: {
      page: 8,
      title: "2017: Transformer — Bước Ngoặt Lịch Sử",
      subtitle: "Cơ chế Self-Attention thay đổi hoàn toàn cách máy tính hiểu ngôn ngữ",
      tag: "Kiến trúc nền móng",
      tagColor: "purple",
      points: [
        { title: "Không còn đọc tuần tự", desc: "Các mô hình cũ (RNN/LSTM) đọc từng từ một nên chậm và quên ngữ cảnh xa.", icon: "❌" },
        { title: "Xử lý song song toàn diện", desc: "Transformer xử lý toàn bộ câu cùng lúc, tận dụng tối đa sức mạnh GPU.", icon: "⚡" },
        { title: "Mỗi từ nhìn sang từ quan trọng", desc: "Self-Attention cho phép mỗi token chủ động liên kết với các từ liên quan trong câu.", icon: "👀" }
      ],
      takeaway: "Transformer là kiến trúc nền tảng đứng sau GPT, Claude, Llama, Gemini và hầu hết các mô hình AI hiện đại."
    },
    10: {
      page: 10,
      title: "LLM Là Gì? — Không Phải Một Chatbot",
      subtitle: "Large Language Model là một bộ não nền tảng dự đoán từ tiếp theo",
      tag: "Bản chất LLM",
      tagColor: "indigo",
      points: [
        { title: "Bộ não nền tảng", desc: "LLM không phải chỉ là cửa sổ chat; nó là engine ngôn ngữ có thể cắm vào nhiều hệ thống.", icon: "🧩" },
        { title: "Nhiệm vụ cốt lõi duy nhất", desc: "Đọc chuỗi token đầu vào và dự đoán xác suất token tiếp theo có khả năng xuất hiện cao nhất.", icon: "🎲" },
        { title: "Khả năng suy luận nổi trội", desc: "Khi mô hình đủ lớn (scaling law), khả năng suy luận đa bước và tóm tắt tự nhiên xuất hiện.", icon: "🌟" }
      ],
      takeaway: "Chatbot chỉ là một giao diện bên ngoài. Bản chất LLM là mô hình xác suất thống kê cực lớn."
    },
    13: {
      page: 13,
      title: "Token: Model Đọc Mảnh Chữ & Chi Phí",
      subtitle: "Cách mô hình ngôn ngữ phân rã văn bản thành các đơn vị xử lý",
      tag: "Cơ chế vận hành",
      tagColor: "rose",
      points: [
        { title: "Token là mảnh chữ nhỏ", desc: "1 token ≈ 4 ký tự tiếng Anh, hoặc 0.75 từ. Tiếng Việt có dấu thường tốn 1.5 - 2x token hơn.", icon: "✂️" },
        { title: "Mọi thứ đều quy ra token", desc: "Prompt gửi vào tính tiền token, câu trả lời sinh ra cũng tính tiền token.", icon: "💳" },
        { title: "Tối ưu hóa token", desc: "Viết prompt ngắn gọn, súc tích giúp tiết kiệm chi phí và tăng tốc độ phản hồi đáng kể.", icon: "⚡" }
      ],
      takeaway: "Hiểu về token giúp bạn kiểm soát chi phí API, quản lý context window và tối ưu hiệu năng ứng dụng."
    },
    14: {
      page: 14,
      title: "Context Window: Bàn Làm Việc Có Hạn",
      subtitle: "Giới hạn bộ nhớ tạm thời & Hiện tượng Lost in the Middle",
      tag: "Giới hạn mô hình",
      tagColor: "amber",
      points: [
        { title: "Bàn làm việc hữu hạn", desc: "Context Window là lượng chữ tối đa mô hình có thể nhìn thấy cùng một lúc trong 1 phiên xử lý.", icon: "📏" },
        { title: "Hiện tượng Lost in the Middle", desc: "Thông tin đặt ở giữa một prompt quá dài rất dễ bị mô hình lơ đễnh hoặc bỏ sót.", icon: "⚠️" },
        { title: "Quy tắc bố cục Prompt", desc: "Đặt chỉ thị quan trọng nhất ở ĐẦU và định dạng mong muốn ở CUỐI cùng của prompt.", icon: "📌" }
      ],
      takeaway: "Không nhồi nhét tài liệu quá dài. Hãy ưu tiên lọc dữ liệu chuẩn xác trước khi nạp vào context."
    },
    15: {
      page: 15,
      title: "Attention: Khóa Nghĩa Theo Ngữ Cảnh",
      subtitle: "Mỗi từ trong câu tự liên kết để xác định ý nghĩa chính xác",
      tag: "Cơ chế Attention",
      tagColor: "teal",
      points: [
        { title: "Từ đa nghĩa", desc: "Từ 'ngân hàng' trong 'ngân hàng câu hỏi' khác hoàn toàn 'ngân hàng Vietcombank'.", icon: "🔍" },
        { title: "Chấm điểm tương quan", desc: "Attention tính toán ma trận tương quan giữa tất cả các cặp từ trong câu cùng lúc.", icon: "🧮" },
        { title: "Khóa chặt ngữ cảnh", desc: "Giúp mô hình hiểu được đại từ thay thế (nó, họ, đó) đang ám chỉ đối tượng nào phía trước.", icon: "🎯" }
      ],
      takeaway: "Attention chính là 'đôi mắt' giúp AI không bị lạc trôi ý nghĩa trong các đoạn văn bản phức tạp."
    },
    18: {
      page: 18,
      title: "Quy Trình 4 Bước Huấn Luyện LLM",
      subtitle: "Từ cỗ máy đoán chữ sơ khai đến trợ lý thông minh và an toàn",
      tag: "Quy trình huấn luyện",
      tagColor: "indigo",
      points: [
        { title: "Bước 1: Pre-training", desc: "Đọc hàng nghìn tỷ token văn bản trên Internet. Tốn hàng triệu USD tiền GPU.", icon: "📚" },
        { title: "Bước 2: SFT (Fine-tuning)", desc: "Dạy cách trả lời theo cặp Câu hỏi - Câu trả lời mẫu chất lượng cao.", icon: "🎓" },
        { title: "Bước 3: RLHF / DPO", desc: "Uốn nắn mô hình theo đánh giá của con người: hữu ích, vô hại và trung thực.", icon: "⚖️" },
        { title: "Bước 4: Reasoning Training", desc: "Luyện suy luận từng bước thông qua các bài toán có thể kiểm chứng kết quả.", icon: "🧠" }
      ],
      takeaway: "Mô hình sau Pre-training chỉ biết đoán chữ tiếp; nhờ SFT và RLHF nó mới trở thành trợ lý AI biết lắng nghe."
    },
    22: {
      page: 22,
      title: "Chain-of-Thought (CoT): Giấy Nháp Tư Duy",
      subtitle: "Yêu cầu suy nghĩ từng bước giúp AI tăng vọt độ chính xác",
      tag: "Kỹ thuật CoT",
      tagColor: "emerald",
      points: [
        { title: "Vấn đề khi trả lời ngay", desc: "Bắt AI đưa ngay đáp án cuối cùng dễ dẫn đến kết luận vội vàng và sai sót logic.", icon: "❌" },
        { title: "Viết nháp suy luận", desc: "Thêm câu thần chú 'Hãy suy nghĩ từng bước' (Think step by step) tạo không gian token cho AI lập luận.", icon: "📝" },
        { title: "Minh bạch và dễ kiểm tra", desc: "Con người có thể đọc từng bước suy luận để phát hiện AI sai ở khâu nào.", icon: "🔎" }
      ],
      takeaway: "Luôn áp dụng CoT cho các tác vụ tính toán, suy luận logic, so sánh hoặc trích xuất dữ liệu nhiều tầng."
    },
    24: {
      page: 24,
      title: "Giải Phẫu Một AI Agent: 5 Thành Phần",
      subtitle: "Mô hình tác nhân thông minh tự lập kế hoạch và hành động",
      tag: "Cấu trúc Agent",
      tagColor: "purple",
      points: [
        { title: "1. Goal (Mục tiêu)", desc: "Yêu cầu rõ ràng từ người dùng mà Agent cần đạt được.", icon: "🎯" },
        { title: "2. Reasoning (Bộ não)", desc: "LLM phân tích bài toán và chia nhỏ thành chuỗi hành động tuần tự.", icon: "🧠" },
        { title: "3. Tools (Công cụ)", desc: "Khả năng gọi API, truy vấn cơ sở dữ liệu, chạy code Python, tìm kiếm web.", icon: "🛠️" },
        { title: "4. Memory (Bộ nhớ)", desc: "Lưu trữ ngữ cảnh ngắn hạn và tri thức dài hạn qua Vector DB.", icon: "💾" },
        { title: "5. Action (Hành động)", desc: "Thực thi và quan sát kết quả phản hồi để tự điều chỉnh.", icon: "🚀" }
      ],
      takeaway: "Agent = LLM + Tools + Planning + Memory. LLM không còn thụ động mà chủ động giải quyết bài toán."
    },
    28: {
      page: 28,
      title: "Giải Phẫu Một Prompt: 4 Lớp Chuẩn Mực",
      subtitle: "Cấu trúc thiết kế System Prompt chuyên nghiệp cho sản phẩm AI",
      tag: "Cấu trúc Prompt",
      tagColor: "sky",
      points: [
        { title: "Lớp 1: System Instruction", desc: "Định nghĩa vai trò, thẩm quyền, quy tắc từ chối và phạm vi hành động.", icon: "🛡️" },
        { title: "Lớp 2: Context / Grounding", desc: "Dữ liệu bài giảng, tài liệu tham khảo được nạp vào để chống bịa đặt.", icon: "📚" },
        { title: "Lớp 3: User Input", desc: "Câu hỏi hoặc yêu cầu cụ thể của người dùng tại thời điểm hiện tại.", icon: "👤" },
        { title: "Lớp 4: Output Format", desc: "Quy định định dạng trả lời bắt buộc (JSON, Markdown, có citation).", icon: "📋" }
      ],
      takeaway: "Một prompt tốt không phải viết hoa hay năn nỉ, mà là cấu trúc 4 lớp mạch lạc, rõ ràng và có ràng buộc."
    },
    29: {
      page: 29,
      title: "Hai Núm Vặn: Temperature & Top_p",
      subtitle: "Kiểm soát mức độ sáng tạo và độ ổn định của câu trả lời",
      tag: "Tham số mô hình",
      tagColor: "amber",
      points: [
        { title: "Temperature (0.0 -> 1.0)", desc: "T=0.0 cho câu trả lời nhất quán, logic (dùng cho code, trích xuất). T>0.7 cho viết lách sáng tạo.", icon: "🌡️" },
        { title: "Top_p (Nucleus Sampling)", desc: "Giới hạn chỉ chọn trong nhóm từ có xác suất tích lũy đạt ngưỡng p (thường đặt 0.9).", icon: "🎯" },
        { title: "Khuyến nghị sản phẩm", desc: "Hệ thống hỏi đáp tài liệu / gia sư AI luôn nên đặt Temperature = 0.0 để loại bỏ ảo giác.", icon: "💡" }
      ],
      takeaway: "Với các bài toán tra cứu kiến thức học thuật, luôn ưu tiên Temperature thấp để đảm bảo tính chính xác."
    }
  },

  // ── DAY 2: Problem Hunt & Agentic Workflow ───────────────────
  "2": {
    1: {
      page: 1,
      title: "Xác Định Bài Toán Kinh Doanh Cho AI",
      subtitle: "Đi từ vấn đề thật quanh mình đến giải pháp AI có giá trị thực tế",
      tag: "Tổng quan bài học",
      tagColor: "indigo",
      points: [
        { title: "Tư duy Product First", desc: "Không bắt đầu bằng 'Công nghệ AI này làm được gì?', mà hỏi 'Vấn đề đau đớn nhất ở đâu?'.", icon: "💎" },
        { title: "Mô hình Double Diamond", desc: "Tìm đúng bài toán trước khi tìm giải pháp. Tránh bẫy Solution-First.", icon: "🔍" },
        { title: "Quyết định mức giải pháp", desc: "Khi nào không cần AI, khi nào dùng Rule, khi nào dùng Workflow, khi nào dùng Agent?", icon: "⚖️" }
      ],
      takeaway: "Một giải pháp AI xuất sắc cho sai bài toán còn tệ hại hơn việc không có giải pháp nào."
    },
    3: {
      page: 3,
      title: "Mô Hình Double Diamond (Tư Duy Thiết Kế)",
      subtitle: "Khung tư duy kinh điển của Design Council ứng dụng cho bài toán AI",
      tag: "Tư duy thiết kế",
      tagColor: "purple",
      points: [
        { title: "Diamond 1: Problem Space", desc: "Khám phá (Discover) các vấn đề tiềm năng rồi Hội tụ (Define) lại bài toán cốt lõi duy nhất.", icon: "💎" },
        { title: "Diamond 2: Solution Space", desc: "Phát triển (Develop) nhiều phương án giải pháp rồi Chọn lọc (Deliver) phương án tối ưu.", icon: "🚀" },
        { title: "Cảnh báo sai lầm", desc: "80% dự án AI thất bại vì nhảy thẳng vào Diamond 2 viết code mà chưa xong Diamond 1.", icon: "⚠️" }
      ],
      takeaway: "Dành 70% thời gian cho việc định hình vấn đề. Khi bài toán đã rõ, việc chọn mô hình AI trở nên đơn giản.",
      diagram: {
        type: "steps",
        items: [
          { label: "1. Discover", sub: "Mở rộng quan sát", color: "indigo" },
          { label: "2. Define", sub: "Hội tụ đúng vấn đề", color: "purple" },
          { label: "3. Develop", sub: "Thử nghiệm giải pháp", color: "sky" },
          { label: "4. Deliver", sub: "Chốt phương án triển khai", color: "emerald" }
        ]
      }
    },
    4: {
      page: 4,
      title: "Diamond 1: Phân Kỳ Thấu Hiểu & Hội Tụ Lựa Chọn",
      subtitle: "Cách tiếp cận có phương pháp để không bỏ sót các điểm nghẽn",
      tag: "Khám phá bài toán",
      tagColor: "sky",
      points: [
        { title: "Phân kỳ (Diverge)", desc: "Quan sát thực tế, phỏng vấn người dùng, ghi chép nhật ký công việc hằng ngày.", icon: "🔭" },
        { title: "Hội tụ (Converge)", desc: "Gom nhóm điểm đau (Affinity Mapping), đặt câu hỏi 5 Whys tìm nguyên nhân gốc rễ.", icon: "🎯" },
        { title: "Ma trận Impact / Effort", desc: "Ưu tiên bài toán có tác động kinh doanh cao nhưng độ phức tạp triển khai vừa phải.", icon: "📊" }
      ],
      takeaway: "Lắng nghe người dùng nói về nỗi đau của họ, đừng hỏi họ muốn tính năng AI nào."
    },
    6: {
      page: 6,
      title: "4 Lăng Kính Tìm Bài Toán AI (4 Lenses)",
      subtitle: "Bốn góc nhìn thực chiến để phát hiện cơ hội ứng dụng AI",
      tag: "Nhận diện bài toán",
      tagColor: "emerald",
      points: [
        { title: "1. Tác vụ lặp lại (Repetitive)", desc: "Những công việc lặp đi lặp lại hàng ngày, quy trình tương tự nhau.", icon: "🔄" },
        { title: "2. Tiêu tốn thời gian (Time-consuming)", desc: "Mất hàng giờ đồng hồ đọc tài liệu, tổng hợp dữ liệu hoặc viết báo cáo định kỳ.", icon: "⏳" },
        { title: "3. Lợi thế của AI (AI Advantage)", desc: "Tác vụ mà LLM vượt trội: hiểu ngôn ngữ tự nhiên, dịch thuật, tóm tắt, trích xuất cấu trúc.", icon: "✨" },
        { title: "4. Điểm đau người dùng (Pain Points)", desc: "Nơi người dùng thường xuyên phàn nàn, mệt mỏi, dễ xảy ra sai sót của con người.", icon: "💥" }
      ],
      takeaway: "Một bài toán hội tụ đủ cả 4 lăng kính là ứng viên hoàn hảo để đưa giải pháp AI vào kiểm chứng."
    },
    7: {
      page: 7,
      title: "4 Anti-Patterns (Sai Lầm Thường Gặp)",
      subtitle: "Những cạm bẫy chết người khi bắt đầu làm sản phẩm AI",
      tag: "Cảnh báo sai lầm",
      tagColor: "rose",
      points: [
        { title: "1. Solution-First", desc: "'Tôi có công nghệ GenAI mới nhất, giờ tìm xem áp dụng vào đâu?' -> Chắc chắn thất bại.", icon: "🚫" },
        { title: "2. No Evaluation", desc: "Không có bộ tiêu chí đánh giá đo lường (Eval benchmark) trước khi đưa vào sản xuất.", icon: "📉" },
        { title: "3. No Baseline", desc: "Không đo hiện trạng hao phí hiện tại bằng con số, dẫn đến không chứng minh được ROI.", icon: "🤷" },
        { title: "4. No Boundary", desc: "Mập mờ ranh giới tự chủ của AI; không có cơ chế Human-in-the-loop khi AI phạm sai lầm.", icon: "⚠️" }
      ],
      takeaway: "Luôn kiểm tra dự án của bạn có đang mắc phải bất kỳ lỗi nào trong 4 Anti-patterns trên hay không."
    },
    8: {
      page: 8,
      title: "Google PAIR Reframe: Hỏi Bài Toán Trước, AI Sau",
      subtitle: "Khung tư duy thiết kế trải nghiệm AI từ Google People + AI Research",
      tag: "Google PAIR",
      tagColor: "indigo",
      points: [
        { title: "Đừng hỏi: 'Liệu AI có làm được X?'", desc: "Câu hỏi này kích thích tư duy nhồi nhét công nghệ vào mọi chỗ không cần thiết.", icon: "❌" },
        { title: "Hãy hỏi: 'Làm thế nào để giải quyết nỗi đau Y?'", desc: "Mở rộng góc nhìn tìm giải pháp đơn giản nhất trước.", icon: "✅" },
        { title: "Sau đó mới hỏi: 'AI có mang lại giá trị độc nhất không?'", desc: "Chỉ chọn AI nếu nó giải quyết tốt hơn hẳn các giải pháp truyền thống.", icon: "🎯" }
      ],
      takeaway: "AI là một công cụ, không phải mục đích cuối cùng. Người dùng mua kết quả giải quyết vấn đề."
    },
    9: {
      page: 9,
      title: "Khung Quick Problem Card (6 Thành Phần)",
      subtitle: "Tấm thẻ chuẩn mực tóm gọn bài toán kinh doanh trước khi bắt tay làm",
      tag: "Thẻ bài toán",
      tagColor: "amber",
      points: [
        { title: "1. Bài toán cốt lõi", desc: "Mô tả vấn đề trong đúng 1 câu duy nhất, không dùng từ ngữ công nghệ.", icon: "🎯" },
        { title: "2. Đối tượng (Actor)", desc: "Ai là người trực tiếp chịu đựng nỗi đau này mỗi ngày?", icon: "👤" },
        { title: "3. Quy trình (Workflow)", desc: "Các bước công việc hiện tại đang diễn ra như thế nào?", icon: "📋" },
        { title: "4. Nút thắt & Tác động", desc: "Điểm nghẽn nằm ở đâu và gây thiệt hại bao nhiêu thời gian / chi phí?", icon: "⚡" },
        { title: "5. Chỉ số thành công", desc: "Con số đo lường cụ thể để khẳng định giải pháp thành công (VD: giảm 80% thời gian).", icon: "📈" },
        { title: "6. Định hướng giải pháp", desc: "Mức độ can thiệp dự kiến: Tự động hóa hoàn toàn hay trợ lý đồng hành?", icon: "🛠️" }
      ],
      takeaway: "Nếu không điền đầy đủ được 6 trường của Problem Card, bạn chưa sẵn sàng viết code AI."
    },
    11: {
      page: 11,
      title: "Định Lượng Hóa Bài Toán: Baseline & Target",
      subtitle: "Chuyển cảm giác định tính mơ hồ thành các con số đo lường chuẩn xác",
      tag: "Định lượng bài toán",
      tagColor: "teal",
      points: [
        { title: "Baseline (Hiện trạng)", desc: "Hiện tại mất bao nhiêu phút cho mỗi tác vụ? Tỷ lệ sai sót là bao nhiêu %?", icon: "⏱️" },
        { title: "Target (Mục tiêu)", desc: "Ngưỡng kỳ vọng thực tế sau khi có AI can thiệp (VD: từ 45 phút xuống 5 phút).", icon: "🎯" },
        { title: "Input & Output Metrics", desc: "Input metric: tỷ lệ người dùng sử dụng; Output metric: hiệu suất công việc tăng trưởng.", icon: "📊" }
      ],
      takeaway: "Không có Baseline thì không thể chứng minh được giá trị (ROI) của bất kỳ mô hình AI nào."
    },
    17: {
      page: 17,
      title: "Automate vs Augment (Google PAIR)",
      subtitle: "Quyết định mức độ trao quyền cho trí tuệ nhân tạo",
      tag: "Mức tự động hóa",
      tagColor: "purple",
      points: [
        { title: "Automate (Tự động hóa hoàn toàn)", desc: "Thích hợp cho tác vụ tẻ nhạt, ít rủi ro, kết quả có đáp án rõ ràng và có thể kiểm tra tự động.", icon: "🤖" },
        { title: "Augment (Trợ lý đồng hành)", desc: "Bắt buộc khi rủi ro cao: quyết định y tế, tài chính, pháp lý. Con người luôn là người duyệt cuối cùng (HITL).", icon: "🤝" },
        { title: "Nguyên tắc thiết kế", desc: "Mặc định luôn bắt đầu bằng Augment để người dùng tin tưởng, sau đó mới từng bước nâng cấp lên Automate.", icon: "🛡️" }
      ],
      takeaway: "Đừng cố tự động hóa 100% ngay từ đầu. Hãy để AI làm 80% phần việc nặng nhọc và để người duyệt 20% cốt lõi."
    },
    18: {
      page: 18,
      title: "3 Cấp Độ Giải Pháp Kỹ Thuật",
      subtitle: "Rule/Script -> LLM Workflow -> AI Agent",
      tag: "Cấp độ giải pháp",
      tagColor: "indigo",
      points: [
        { title: "Cấp 1: Rule / Script", desc: "Nếu logic if/else đơn giản đã giải quyết được thì KHÔNG dùng LLM. Nhanh, rẻ, đúng 100%.", icon: "📜" },
        { title: "Cấp 2: LLM Feature / Workflow", desc: "Dùng LLM cho các khâu cần xử lý văn bản phi cấu trúc, tóm tắt, trích xuất theo quy trình cố định.", icon: "⚙️" },
        { title: "Cấp 3: Autonomous Agent", desc: "Chỉ dùng khi bài toán đòi hỏi lập kế hoạch động nhiều bước và gọi nhiều tool bên ngoài.", icon: "🚀" }
      ],
      takeaway: "Luôn chọn cấp độ giải pháp đơn giản nhất có thể giải quyết được bài toán. Phức tạp không đồng nghĩa với hiệu quả."
    },
    28: {
      page: 28,
      title: "Khung Quyết Định: Go / Not Yet / No-Go",
      subtitle: "Bộ tiêu chí sàng lọc trước khi đầu tư nguồn lực làm sản phẩm",
      tag: "Khung quyết định",
      tagColor: "emerald",
      points: [
        { title: "🟢 GO", desc: "Vấn đề đau đớn rõ ràng, có dữ liệu sạch, rủi ro ảo giác kiểm soát được, chỉ số ROI đo lường được.", icon: "✅" },
        { title: "🟡 NOT YET", desc: "Ý tưởng tiềm năng nhưng quy trình nội bộ chưa chuẩn hóa hoặc dữ liệu chưa đủ chất lượng -> Cần dọn dẹp trước.", icon: "⏳" },
        { title: "🔴 NO-GO", desc: "Bài toán không cần AI, chi phí vận hành API quá cao so với giá trị thu về, hoặc rủi ro pháp lý quá lớn.", icon: "🛑" }
      ],
      takeaway: "Biết từ chối một ý tưởng 'No-Go' giúp đội ngũ tiết kiệm hàng tháng trời công sức lãng phí."
    },
    29: {
      page: 29,
      title: "Sáu Nguyên Tắc Cốt Lõi Sau Day 02",
      subtitle: "Hành trang của một AI Product Builder thực chiến",
      tag: "Tổng kết bài học",
      tagColor: "indigo",
      points: [
        { title: "1. Lượng hóa điểm đau", desc: "Dùng con số thay cho tính từ cảm xúc mơ hồ.", icon: "1️⃣" },
        { title: "2. Quyết định trên số liệu", desc: "Mọi thử nghiệm đều phải có Eval benchmark đo lường.", icon: "2️⃣" },
        { title: "3. Đơn giản trước phức tạp", desc: "Rule -> Prompt đơn -> Workflow -> Agent.", icon: "3️⃣" },
        { title: "4. Chuẩn hóa workflow", desc: "Quy trình con người làm chưa thông thì AI không thể cứu vãn.", icon: "4️⃣" },
        { title: "5. Problem Statement chuẩn mực", desc: "Làm rõ 6 trường bài toán trước khi bắt đầu code.", icon: "5️⃣" },
        { title: "6. Đo bằng trải nghiệm", desc: "Tối ưu hóa giá trị cuối cùng cho người dùng thực tế.", icon: "6️⃣" }
      ],
      takeaway: "Công nghệ thay đổi mỗi tuần, nhưng tư duy đặt bài toán và trải nghiệm người dùng lên hàng đầu luôn trường tồn."
    }
  }
};

export function getSlideData(day: string, page: number, totalSlides: number = 29): SlideItem {
  const daySlides = SLIDES_DATA[day];
  if (daySlides && daySlides[page]) {
    return daySlides[page];
  }

  // Fallback dynamic slide generator for intermediate pages
  return {
    page,
    title: `Nội Dung Chi Tiết Bài Giảng (Trang ${page})`,
    subtitle: `Tài liệu học tập chuyên sâu · Khóa học AI Thực Chiến (Day ${day})`,
    tag: `Phần kiến thức chuyên đề`,
    tagColor: "indigo",
    points: [
      {
        title: "Nội dung phân tích trên Slide",
        desc: `Phần slide số ${page} tập trung trình bày các ví dụ thực tiễn, số liệu nghiên cứu và hướng dẫn áp dụng cho nội dung Day ${day}.`,
        icon: "📖"
      },
      {
        title: "Tương tác cùng Trợ giảng AI",
        desc: "Học viên có thể bấm nút 'Hỏi Trợ giảng AI' bên dưới để giải đáp chi tiết các khái niệm, công thức hoặc thuật ngữ trên slide này.",
        icon: "💡"
      },
      {
        title: "Liên kết bài tập thực hành",
        desc: "Đối chiếu nội dung trang này với phần Lab tương ứng ở menu bên trái để củng cố kỹ năng làm bài.",
        icon: "🧪"
      }
    ],
    takeaway: `Ghi nhớ nội dung trọng tâm tại slide ${page} và đặt câu hỏi cho Trợ giảng AI nếu có bất kỳ thắc mắc nào.`
  };
}
