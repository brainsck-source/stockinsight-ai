import requests
import pandas as pd
import urllib3
import traceback

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = "https://finance.naver.com/item/main.nhn?code=005930"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

with open("log.txt", "w", encoding="utf-8") as f:
    f.write("Starting script...\n")
    try:
        response = requests.get(url, headers=headers, verify=False, timeout=10)
        f.write(f"Response status: {response.status_code}\n")
        response.encoding = 'euc-kr'
        
        f.write("Parsing HTML tables with pandas...\n")
        tables = pd.read_html(response.text)
        f.write(f"Tables found: {len(tables)}\n")
        
        for idx, df in enumerate(tables):
            df_str = df.to_string()
            has_rev = "매출액" in df_str
            f.write(f"Table {idx}: shape={df.shape}, has_revenue={has_rev}\n")
            if has_rev:
                # save table header and first rows
                f.write(f"--- Table {idx} Snippet ---\n")
                f.write(df_str[:1000] + "\n")
                df.to_csv(f"financial_table_{idx}.csv", encoding="utf-8")
        f.write("Finished successfully.\n")
    except Exception as e:
        f.write(f"Error occurred: {str(e)}\n")
        f.write(traceback.format_exc() + "\n")

print("ASCII: Done, check log.txt")
