import requests
from bs4 import BeautifulSoup
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Naver Finance research list page
url = "https://finance.naver.com/research/company_list.naver"
# Search with code 005930
params = {
    "searchType": "itemCode",
    "keyword": "005930"
}
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, params=params, headers=headers, verify=False, timeout=10)
    print(f"Status: {response.status_code}")
    response.encoding = 'euc-kr'
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Let's find the table that lists reports. Usually a table with class 'type_1'
    table = soup.find('table', class_='type_1')
    if not table:
        print("Could not find table with class 'type_1'")
        # Let's dump some text to see what tables are present
        tables = soup.find_all('table')
        print(f"Found {len(tables)} tables")
        for i, t in enumerate(tables):
            print(f"Table {i} class: {t.get('class')}")
    else:
        print("Found report list table!")
        # Let's extract rows
        rows = table.find_all('tr')
        print(f"Found {len(rows)} rows")
        
        for idx, row in enumerate(rows):
            cols = row.find_all(['td', 'th'])
            col_texts = [col.text.strip() for col in cols]
            if len(col_texts) > 0:
                print(f"Row {idx}: {col_texts}")
                # Check for PDF links
                a_tags = row.find_all('a')
                for a in a_tags:
                    href = a.get('href', '')
                    if href.endswith('.pdf') or 'pdf' in href:
                        print(f"  -> PDF Link: {href}")
                    elif 'company_read.naver' in href:
                        print(f"  -> Report Read Link: {href}")
except Exception as e:
    print(f"Error: {e}")
