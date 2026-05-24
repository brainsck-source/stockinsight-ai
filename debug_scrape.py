import requests
import re
import pandas as pd
from io import StringIO
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

code = "005930"
main_url = f"http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd={code}"
ajax_url = "http://companyinfo.stock.naver.com/v1/company/ajax/cF1001.aspx"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print("1. Fetching main url...")
res = requests.get(main_url, headers=headers, timeout=10)
res.encoding = 'utf-8'
html = res.text
print(f"Main page status code: {res.status_code}")

print("2. Extracting encparam...")
encparam_match = re.search(r"encparam\s*:\s*['\"]([^'\"]+)['\"]", html)
if not encparam_match:
    print("FAIL: Could not find encparam in HTML")
    # print first 1000 characters of html
    print(html[:1000])
    exit()
encparam = encparam_match.group(1)
print(f"Success: encparam = {encparam}")

print("3. Extracting id...")
id_match = re.search(r"id\s*:\s*['\"]([^'\"]+)['\"]", html)
id_val = id_match.group(1) if id_match else ''
print(f"Success: id = {id_val}")

print("4. Fetching AJAX url...")
params = {
    "cmp_cd": code,
    "fin_typ": 0,
    "freq_typ": "Y",
    "encparam": encparam,
    "id": id_val
}
ajax_headers = headers.copy()
ajax_headers["Referer"] = main_url

ajax_res = requests.get(ajax_url, params=params, headers=ajax_headers, timeout=10)
ajax_res.encoding = 'utf-8'
print(f"AJAX status code: {ajax_res.status_code}")
print(f"AJAX response length: {len(ajax_res.text)}")

print("5. Parsing tables with pandas...")
try:
    tables = pd.read_html(StringIO(ajax_res.text))
    print(f"Success: Found {len(tables)} tables")
except Exception as e:
    print(f"FAIL: pd.read_html failed: {e}")
    exit()

if len(tables) < 2:
    print(f"FAIL: tables length is {len(tables)}, expected >= 2")
    exit()

df = tables[1].fillna('')
print("6. Searching for header row...")
header_row_idx = None
for idx, row in df.iterrows():
    row_str_list = [str(x) for x in row.tolist()]
    if any("/12" in cell or "/06" in cell or "/03" in cell or "/09" in cell for cell in row_str_list):
        header_row_idx = idx
        break

if header_row_idx is None:
    print("FAIL: Could not find header row")
    exit()
print(f"Success: Header row idx = {header_row_idx}")

columns = [str(x).strip() for x in df.iloc[header_row_idx].tolist()]
print(f"Columns: {columns}")

print("7. Searching for label column...")
label_col_idx = None
for col_idx in range(len(df.columns)):
    col_vals = [str(x) for x in df.iloc[:, col_idx].tolist()]
    if any("매출액" in val for val in col_vals):
        label_col_idx = col_idx
        break

if label_col_idx is None:
    print("FAIL: Could not find label column")
    exit()
print(f"Success: Label col idx = {label_col_idx}")

data_df = df.iloc[header_row_idx + 1:]
row_mapping = {}
for idx, row in data_df.iterrows():
    label = str(row[label_col_idx]).strip()
    if label == "매출액":
        row_mapping["revenue"] = idx
    elif label == "영업이익":
        row_mapping["operatingIncome"] = idx
    elif label == "영업이익(발표기준)":
        row_mapping["operatingIncomeFallback"] = idx
    elif label == "당기순이익":
        row_mapping["netIncome"] = idx
    elif label in ["ROE(%)", "ROE"]:
        row_mapping["roe"] = idx

print(f"Success: Row mapping = {row_mapping}")
print("ALL CHECKS PASSED!")
