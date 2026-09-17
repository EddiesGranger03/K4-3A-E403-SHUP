import csv
import random

csv_path = "hackathon_docs/data/vlearn-pack/chatlog/tutor_turns.csv"

# Tìm các keyword đặc trưng cho các test cases
keywords = {
    "llm": [],
    "double diamond": [],
    "ngoài luồng (code, react, python)": [],
    "rag": [],
    "bịa đặt / fact check": []
}

with open(csv_path, encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["is_preset"] == "True": continue # Bỏ qua câu hỏi bấm sẵn
        q = row["student_question"].lower()
        if len(q) < 15 or len(q) > 150: continue # Lấy câu hỏi vừa vặn
        
        if "llm" in q and "là gì" in q: keywords["llm"].append(row["student_question"])
        elif "diamond" in q: keywords["double diamond"].append(row["student_question"])
        elif "python" in q or "code" in q or "react" in q: keywords["ngoài luồng (code, react, python)"].append(row["student_question"])
        elif "rag" in q: keywords["rag"].append(row["student_question"])
        elif "gpt" in q or "tham số" in q: keywords["bịa đặt / fact check"].append(row["student_question"])

for category, qs in keywords.items():
    print(f"=== {category.upper()} ===")
    for q in random.sample(qs, min(3, len(qs))):
        print(f"- {q.strip().replace(chr(10), ' ')}")
