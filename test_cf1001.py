import requests
import re
import pandas as pd
from io import StringIO

def get_financial_summary(code):
    print(f"Fetching financial summary for {code}...")
    main_url = f"http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd={code}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": main_url
    }
    
    # 1. Fetch main page
    response = requests.get(main_url, headers=headers, timeout=10)
    response.encoding = 'utf-8'
    html = response.text
    
    # 2. Extract encparam and id
    # Let's search for: encparam: '...'
    encparam_match = re.search(r"encparam\s*:\s*['\"]([^'\"]+)['\"]", html)
    if not encparam_match:
        print("Error: Could not find encparam")
        return None
    encparam = encparam_match.group(1)
    
    # Let's search for the ID used in the ajax call.
    # In the JS code, we saw: id: 'RVArcVR1a2' ? 'RVArcVR1a2' : '' or similar.
    # Let's search for patterns like: id: '...' or similar.
    # Or let's see if we can find RVArcVR1a2 or similar dynamic target.
    # Wait, let's look for: url : "ajax/cF1001.aspx" ... id: '...'
    id_match = re.search(r"id\s*:\s*['\"]([^'\"]+)['\"]", html)
    id_val = id_match.group(1) if id_match else ''
    
    print(f"Extracted encparam: {encparam}")
    print(f"Extracted id: {id_val}")
    
    # 3. Call cF1001.aspx AJAX endpoint
    ajax_url = "http://companyinfo.stock.naver.com/v1/company/ajax/cF1001.aspx"
    params = {
        "cmp_cd": code,
        "fin_typ": 0,    # 0 = MAIN (Key Financial Summary)
        "freq_typ": "Y", # Y = Annual, Q = Quarterly
        "encparam": encparam,
        "id": id_val
    }
    
    ajax_headers = headers.copy()
    ajax_headers["Referer"] = main_url
    
    ajax_response = requests.get(ajax_url, params=params, headers=ajax_headers, timeout=10)
    ajax_response.encoding = 'utf-8'
    
    # 4. Parse tables from the HTML returned by AJAX
    ajax_html = ajax_response.text
    print(f"AJAX Response Length: {len(ajax_html)}")
    
    tables = pd.read_html(StringIO(ajax_html))
    print(f"Found {len(tables)} tables in AJAX response.")
    
    for idx, table in enumerate(tables):
        print(f"\n--- Table {idx} Shape: {table.shape} ---")
        print(table.head(10).to_string())
        
        # Save to csv to inspect
        table.to_csv(f"financial_ajax_table_{idx}.csv", encoding="utf-8")
        
    return tables

tables = get_financial_summary("005930")
