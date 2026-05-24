import requests
import pandas as pd
import urllib3
import json

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Naver Finance Main Page URL
url = "https://finance.naver.com/item/main.nhn?code=005930"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, verify=False)
response.encoding = 'euc-kr'

tables = pd.read_html(response.text)
print(f"Total tables found: {len(tables)}")

for idx, df in enumerate(tables):
    print(f"\nTable {idx} shape: {df.shape}")
    # Convert dataframe to string and search for "매출액"
    df_str = df.to_string()
    if "매출액" in df_str:
        print(f"** Found '매출액' in Table {idx}! **")
        # Save table to temporary text file to avoid terminal encoding crashes
        df.to_csv(f"table_{idx}.csv", encoding='utf-8')
        print(f"Saved Table {idx} to table_{idx}.csv")
