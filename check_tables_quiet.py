import requests
import pandas as pd
import urllib3
import json
import os

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = "https://finance.naver.com/item/main.nhn?code=005930"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, verify=False, timeout=10)
    response.encoding = 'euc-kr'
    
    tables = pd.read_html(response.text)
    print(f"ASCII: Tables count = {len(tables)}")
    
    for idx, df in enumerate(tables):
        # Convert columns and head to string and write to a log file
        log_path = f"table_{idx}.txt"
        df.to_csv(log_path, index=False, encoding='utf-8')
        
        # Check if financial indicators are present in the table
        df_str = df.to_string()
        has_revenue = "매출액" in df_str
        
        print(f"ASCII: Table {idx} shape = {df.shape}, has_revenue = {has_revenue}")
except Exception as e:
    print(f"ASCII: Error occurred: {str(e)}")
