"""
clean_json.py - krxStocks.json의 깨진 한글 문자(mojibake)를 처리하는 후처리 스크립트.
Vite의 JSON 파서는 비-ASCII 문자 자체를 거부하지 않지만, 
깨진 바이트 시퀀스(replacement characters)가 JSON 구조를 깨트릴 수 있음.
모든 string 값에서 \ufffd (replacement character)와 기타 무효 바이트를 제거/치환한다.
"""
import json
import re

INPUT = "src/data/krxStocks.json"
OUTPUT = "src/data/krxStocks.json"

with open(INPUT, encoding="utf-8") as f:
    raw = f.read()

print(f"Loaded {len(raw)} chars")

# Count replacement characters
rc_count = raw.count('\ufffd')
print(f"Replacement chars (U+FFFD) found: {rc_count}")

# Remove replacement characters
cleaned = raw.replace('\ufffd', '')

# Validate JSON after cleaning
try:
    data = json.loads(cleaned)
    print(f"JSON valid after cleaning. Records: {len(data)}")
except json.JSONDecodeError as e:
    print(f"Still invalid: {e}")
    import sys
    sys.exit(1)

# Re-serialise cleanly (ensure_ascii=False to keep valid Korean chars)
final = json.dumps(data, indent=2, ensure_ascii=False)

# Verify the final output is valid
try:
    json.loads(final)
    print("Final JSON is valid.")
except json.JSONDecodeError as e:
    print(f"Final JSON invalid: {e}")
    import sys
    sys.exit(1)

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(final)

print(f"Saved cleaned JSON to {OUTPUT} ({len(final)} chars)")
