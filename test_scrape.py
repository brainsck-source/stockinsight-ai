import requests
import pandas as pd
import urllib3

# Disable insecure request warnings if verifying is disabled
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# We will try both companyinfo and finance.naver.com
urls = [
    "https://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930",
    "https://finance.naver.com/item/main.nhn?code=005930"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
}

for url in urls:
    print(f"\nTrying URL: {url}")
    try:
        response = requests.get(url, headers=headers, verify=False, timeout=10)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            # Try parsing with EUC-KR encoding for finance.naver.com
            response.encoding = 'euc-kr' if 'finance.naver.com' in url else 'utf-8'
            tables = pd.read_html(response.text)
            print(f"Total tables found: {len(tables)}")
            
            # Print a snippet of the first few tables
            for idx, table in enumerate(tables[:15]):
                print(f"Table {idx} columns: {list(table.columns)[:3]} (rows: {len(table)})")
                if '매출액' in str(table.values):
                    print(f"-> Table {idx} contains '매출액'!")
                    print(table.head(10))
    except Exception as e:
        print(f"Error: {e}")
