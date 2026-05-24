import requests
import re

url = "http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    response.encoding = 'utf-8'
    html = response.text
    
    # Let's find occurrences of cF1001.aspx and print 10 lines before and after
    lines = html.split('\n')
    for idx, line in enumerate(lines):
        if 'cF1001.aspx' in line:
            print(f"--- Match at line {idx} ---")
            start = max(0, idx - 15)
            end = min(len(lines), idx + 25)
            for j in range(start, end):
                print(f"{j}: {lines[j]}")
except Exception as e:
    print(f"Error: {e}")
