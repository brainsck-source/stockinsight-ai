import requests
import pandas as pd
from io import StringIO

url = "http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Status Code: {response.status_code}")
    response.encoding = 'utf-8'
    
    tables = pd.read_html(StringIO(response.text))
    print(f"Total tables found: {len(tables)}")
    
    for idx, table in enumerate(tables):
        print(f"\n--- Table {idx} Shape: {table.shape} ---")
        print(table.head(5).to_string())
except Exception as e:
    print(f"Error: {e}")
