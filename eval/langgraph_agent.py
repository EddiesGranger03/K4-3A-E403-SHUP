import json
import os
import re
from typing import TypedDict
from google import genai
from google.genai import types

class AgentState(TypedDict):
    query: str
    profile_day: int
    index_data: dict
    action: str
    target_day: int
    reason: str
    final_response: str

class VLearnAgent:
    def __init__(self):
        self.client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        self.model = os.environ.get("GEMINI_MODEL", "gemini-2.0-flash")

    def hub_node(self, state: AgentState) -> AgentState:
        q = state["query"]
        p_day = state["profile_day"]
        index_summary = "\n".join([f"- {k}: {v['concept']}" for k, v in state['index_data'].items()])
        prompt = f"""Bạn là Hub Router của VLearn.
Hồ sơ học viên đang ở Day {p_day}.
Câu hỏi: "{q}"
Danh sách bài học:
{index_summary}
- Day 7: RAG, Vector DB, Embedding.
- Day 3: AI Agent, CrewAI.
NHIỆM VỤ (Trả về JSON):
{{
  "action": "REJECT" | "WARN_PREREQUISITE" | "ROUTE",
  "target_day": <int>,
  "reason": "<str>"
}}
QUY TẮC:
1. Hỏi lỗi code, cài đặt phần mềm, bug -> "action": "REJECT".
2. Hỏi khái niệm nâng cao (Agent/RAG) mà hồ sơ học viên chưa học tới -> "action": "WARN_PREREQUISITE", "target_day": <day tương lai>.
3. Hợp lệ / Tìm link bài học -> "action": "ROUTE", "target_day": <day tương ứng, VD 99 nếu không rõ>.
"""
        res = self.client.models.generate_content(model=self.model, contents=prompt, config=types.GenerateContentConfig(temperature=0.0, response_mime_type="application/json"))
        try:
            data = json.loads(res.text)
            state.update({"action": data.get("action", "REJECT"), "target_day": data.get("target_day", 1), "reason": data.get("reason", "")})
        except:
            state.update({"action": "REJECT", "reason": "Parse Error"})
        return state

    def spoke_node(self, state: AgentState) -> AgentState:
        q = state["query"]
        day = state["target_day"]
        context = next((json.dumps(v, ensure_ascii=False) for k, v in state['index_data'].items() if v.get("day") == day), "Chưa có tài liệu.")
        prompt = f"""Bạn là Bot Con cho Day {day}. Tài liệu: {context}. Câu hỏi: "{q}"
QUY TẮC PHẢN HỒI:
1. Nếu hỏi code, kỹ thuật lập trình, ngoài lề -> PHẢI TRẢ LỜI CÓ CHỨA CỤM TỪ: "Từ chối: Nằm ngoài phạm vi".
2. Nếu câu hỏi hợp lệ: Trả lời ngắn gọn dựa vào Tài liệu. BẮT BUỘC chèn trích dẫn [Day {day} - Slide 1] vào cuối.
3. Nếu tài liệu không chứa thông tin: Trả lời "Tôi không tìm thấy thông tin trong tài liệu [Day {day} - Slide 1]".
"""
        res = self.client.models.generate_content(model=self.model, contents=prompt, config=types.GenerateContentConfig(temperature=0.0))
        state["final_response"] = res.text.strip()
        return state

agent = VLearnAgent()

def run_hub_agent_real(case, index, schedule, progress):
    p_day = 1 if "day1" in case["input"].get("student_profile", "") else 99
    state = agent.hub_node({"query": case["input"]["user_query"], "profile_day": p_day, "index_data": index, "action": "", "target_day": 1, "reason": "", "final_response": ""})
    return f"{state['action']}: Day {state['target_day']} - {state['reason']}"

def run_spoke_agent_real(query, target_day_str, index):
    day_num = int(next((s for s in re.findall(r'\d+', target_day_str)), 1))
    state = agent.spoke_node({"query": query, "profile_day": 99, "index_data": index, "action": "", "target_day": day_num, "reason": "", "final_response": ""})
    return state["final_response"]
