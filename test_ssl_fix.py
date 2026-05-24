import requests
import ssl
from requests.adapters import HTTPAdapter
from urllib3.poolmanager import PoolManager
from urllib3.util import create_urllib3_context
import pandas as pd
from io import StringIO
import traceback

class TLSAdapter(HTTPAdapter):
    def init_poolmanager(self, *args, **kwargs):
        # Force TLS v1.2 which Naver servers accept reliably
        context = create_urllib3_context(ssl_version=ssl.PROTOCOL_TLSv1_2)
        # Enable all ciphers
        context.set_ciphers('DEFAULT@SECLEVEL=1')
        kwargs['ssl_context'] = context
        return super(TLSAdapter, self).init_poolmanager(*args, **kwargs)

url = "https://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

with open("log_ssl.txt", "w", encoding="utf-8") as f:
    f.write("Starting TLSAdapter script...\n")
    try:
        session = requests.Session()
        session.mount("https://", TLSAdapter())
        
        response = session.get(url, headers=headers, timeout=10)
        f.write(f"Response status code: {response.status_code}\n")
        response.encoding = 'utf-8'
        
        tables = pd.read_html(StringIO(response.text))
        f.write(f"Tables found: {len(tables)}\n")
        
        for idx, df in enumerate(tables):
            df_str = df.to_string()
            has_rev = "매출액" in df_str
            f.write(f"Table {idx}: shape={df.shape}, has_revenue={has_rev}\n")
            if has_rev:
                f.write(f"--- Table {idx} Snippet ---\n")
                f.write(df_str[:2000] + "\n")
                df.to_csv(f"financial_table_{idx}.csv", encoding="utf-8")
        
        f.write("Finished successfully.\n")
    except Exception as e:
        f.write(f"Error occurred: {str(e)}\n")
        f.write(traceback.format_exc() + "\n")

print("ASCII: Done, check log_ssl.txt")
