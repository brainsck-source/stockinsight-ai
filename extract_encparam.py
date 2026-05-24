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
    
    # Search for encparam and id patterns
    # Usually they look like: encparam: '...' or id: '...' or similar in javascript variables
    encparam_matches = re.findall(r"encparam\s*:\s*['\"]([^'\"]+)['\"]", html)
    id_matches = re.findall(r"id\s*:\s*['\"]([^'\"]+)['\"]", html)
    
    print(f"encparam matches: {encparam_matches}")
    print(f"id matches: {id_matches}")
    
    # Print some Javascript blocks around those keywords to inspect
    for line in html.split('\n'):
        if 'encparam' in line or 'cF1001' in line:
            print(line.strip())
except Exception as e:
    print(f"Error: {e}")
