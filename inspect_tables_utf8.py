import requests
import pandas as pd
from io import StringIO

url = "http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    response.encoding = 'utf-8'
    tables = pd.read_html(StringIO(response.text))
    
    with open("log_clean.txt", "w", encoding="utf-8") as f:
        f.write(f"Total tables: {len(tables)}\n")
        for idx, table in enumerate(tables):
            f.write(f"\n================ Table {idx} Shape: {table.shape} ================\n")
            f.write(table.to_string() + "\n")
    print("Done. Wrote to log_clean.txt")
except Exception as e:
    print(f"Error: {e}")
