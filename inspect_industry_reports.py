import requests
from bs4 import BeautifulSoup
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = "https://finance.naver.com/research/industry_list.naver"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, verify=False, timeout=10)
    print(f"Status: {response.status_code}")
    response.encoding = 'euc-kr'
    
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table', class_='type_1')
    if table:
        print("Found industry report table!")
        rows = table.find_all('tr')
        print(f"Total rows: {len(rows)}")
        
        for idx, row in enumerate(rows[:15]):
            cols = row.find_all(['td', 'th'])
            col_texts = [col.text.strip() for col in cols]
            if len(col_texts) > 0 and col_texts[0] != '':
                print(f"Row {idx}: {col_texts}")
                links = []
                for a in row.find_all('a'):
                    links.append((a.text.strip(), a.get('href', '')))
                print(f"  -> Links: {links}")
except Exception as e:
    print(f"Error: {e}")
