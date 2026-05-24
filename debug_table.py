import requests
import re
import pandas as pd
from io import StringIO
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

code = "005930"
main_url = f"http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd={code}"
ajax_url = "http://companyinfo.stock.naver.com/v1/company/ajax/cF1001.aspx"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

res = requests.get(main_url, headers=HEADERS, timeout=10)
res.encoding = "utf-8"

enc_match = re.search(r"encparam\s*:\s*['\"]([^'\"]+)['\"]", res.text)
encparam = enc_match.group(1)
print("encparam:", encparam[:20], "...")

id_match = re.search(r"\bid\s*:\s*['\"]([^'\"]+)['\"]", res.text)
id_val = id_match.group(1) if id_match else ''
print("id:", id_val)

req_headers = HEADERS.copy()
req_headers["Referer"] = main_url
ajax = requests.get(ajax_url, params={"cmp_cd": code, "fin_typ": 0, "freq_typ": "Y", "encparam": encparam, "id": id_val}, headers=req_headers)
ajax.encoding = "utf-8"
print("AJAX status:", ajax.status_code)
print("AJAX response length:", len(ajax.text))
print("AJAX text (first 500 chars):", ajax.text[:500])
dfs = pd.read_html(StringIO(ajax.text))
print("Num tables:", len(dfs))

df = dfs[1]
print("Raw columns:", df.columns.tolist())
print("Shape:", df.shape)

if isinstance(df.columns, pd.MultiIndex):
    flat = []
    for t in df.columns:
        parts = [str(c) for c in t if not str(c).startswith("Unnamed")]
        flat.append(" ".join(parts) if parts else "")
    df.columns = flat
else:
    df.columns = [str(c) for c in df.columns]

print("Flat cols:", df.columns.tolist())
print()
print(df.fillna("").to_string())
