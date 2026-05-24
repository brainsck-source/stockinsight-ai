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

res = requests.get(main_url, headers=headers, timeout=10)
res.encoding = 'utf-8'
enc = re.search(r"encparam\s*:\s*['\"]([^'\"]+)['\"]", res.text).group(1)

ajax_res = requests.get(ajax_url, params={"cmp_cd": code, "fin_typ": 0, "freq_typ": "Y", "encparam": enc}, headers={"User-Agent": "Mozilla/5.0", "Referer": main_url})
ajax_res.encoding = 'utf-8'

df = pd.read_html(StringIO(ajax_res.text))[1]
print("--- columns ---")
print(df.columns)
print("--- head(5) ---")
print(df.head(5).to_string())
