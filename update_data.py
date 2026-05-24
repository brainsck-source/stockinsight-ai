import os
import sys
import json
import time
import re
import requests
import pandas as pd
from bs4 import BeautifulSoup
from io import StringIO
import urllib.parse
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Configurable constants
LIMIT_STOCKS = 200      # Number of top stocks to scrape financials for
SLEEP_INTERVAL = 0.5   # Seconds to sleep between requests to avoid block
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def parse_market_cap(val_str):
    if not val_str:
        return 0
    val_str = str(val_str).replace(',', '').strip()
    total = 0.0
    if "조" in val_str:
        parts = val_str.split("조")
        jo_part = parts[0].strip()
        jo_val = "".join(c for c in jo_part if c.isdigit() or c == '.')
        if jo_val:
            total += float(jo_val) * 10000.0  # 1조 = 10,000억원
        if len(parts) > 1 and "억" in parts[1]:
            eok_part = parts[1].split("억")[0].strip()
            eok_val = "".join(c for c in eok_part if c.isdigit() or c == '.')
            if eok_val:
                total += float(eok_val)
    elif "억" in val_str:
        eok_part = val_str.split("억")[0].strip()
        eok_val = "".join(c for c in eok_part if c.isdigit() or c == '.')
        if eok_val:
            total += float(eok_val)
    return total


def clean_value(val):
    if val is None:
        return None
    if isinstance(val, float) and pd.isna(val):
        return None
    s = str(val).replace(',', '').strip()
    if s in ['-', 'N/A', 'NaN', 'nan', '']:
        return None
    try:
        return float(s)
    except Exception:
        return None


def flatten_multiindex(df):
    """Flatten MultiIndex columns to plain strings. Returns df with string columns."""
    if isinstance(df.columns, pd.MultiIndex):
        flat_cols = []
        for col_tuple in df.columns:
            parts = [str(c) for c in col_tuple if not str(c).startswith('Unnamed')]
            if parts:
                flat_cols.append(' '.join(parts))
            else:
                flat_cols.append('')
        df = df.copy()
        df.columns = flat_cols
    else:
        df = df.copy()
        df.columns = [str(c) for c in df.columns]
    return df


def is_year_col(col_str):
    """Check if a column string represents a fiscal year (e.g., 2023/12, 2024E, 2023(E))."""
    return bool(re.search(r'\d{4}[./]', col_str)) or \
           bool(re.search(r'\d{4}\s*\(E\)', col_str, re.IGNORECASE)) or \
           bool(re.search(r'\d{4}E\b', col_str, re.IGNORECASE))


def extract_year_label(col_str):
    """Extract 'YYYY' or 'YYYY(E)' from a column name string."""
    is_consensus = bool(re.search(r'\(E\)', col_str, re.IGNORECASE)) or \
                   bool(re.search(r'E\b', col_str.strip(), re.IGNORECASE))
    year_m = re.search(r'(\d{4})', col_str)
    if not year_m:
        return None, False
    return year_m.group(1) + ('(E)' if is_consensus else ''), is_consensus


def get_row_val(df, label_col, row_label, data_col):
    """Look up a value by row label and data column name."""
    mask = df[label_col].astype(str).str.strip() == row_label
    if not mask.any():
        return None
    row = df[mask].iloc[0]
    if data_col not in row.index:
        return None
    return clean_value(row[data_col])


def build_financials_from_cols(df, label_col, year_cols):
    """Build financials list when year info is in column headers."""
    financials = []
    for col in year_cols:
        year_label, is_consensus = extract_year_label(col)
        if year_label is None:
            continue

        revenue = get_row_val(df, label_col, '매출액', col)
        op_income = get_row_val(df, label_col, '영업이익', col)
        if op_income is None:
            op_income = get_row_val(df, label_col, '영업이익(발표기준)', col)
        net_income = get_row_val(df, label_col, '당기순이익', col)
        roe_val = get_row_val(df, label_col, 'ROE(%)', col)
        if roe_val is None:
            roe_val = get_row_val(df, label_col, 'ROE', col)

        if all(v is None for v in [revenue, op_income, net_income, roe_val]):
            continue

        op_margin = round((op_income / revenue) * 100, 2) if revenue and op_income else None
        net_margin = round((net_income / revenue) * 100, 2) if revenue and net_income else None

        financials.append({
            "year": year_label,
            "revenue": revenue,
            "operatingIncome": op_income,
            "netIncome": net_income,
            "roe": roe_val,
            "operatingMargin": op_margin,
            "netMargin": net_margin,
            "isConsensus": is_consensus
        })
    return financials



def fetch_financials(code, freq_typ="Y"):
    main_url = f"http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd={code}"
    ajax_url = "http://companyinfo.stock.naver.com/v1/company/ajax/cF1001.aspx"

    try:
        # 1. Fetch main page to extract encparam
        res = requests.get(main_url, headers=HEADERS, timeout=10)
        res.encoding = 'utf-8'
        html = res.text

        encparam_match = re.search(r"encparam\s*:\s*['\"]([^'\"]+)['\"]", html)
        if not encparam_match:
            return None
        encparam = encparam_match.group(1)

        id_match = re.search(r"\bid\s*:\s*['\"]([^'\"]+)['\"]", html)
        id_val = id_match.group(1) if id_match else ''

        # 2. Call AJAX endpoint for financials
        params = {
            "cmp_cd": code,
            "fin_typ": 0,
            "freq_typ": freq_typ,
            "encparam": encparam,
            "id": id_val
        }
        ajax_headers = HEADERS.copy()
        ajax_headers["Referer"] = main_url

        ajax_res = requests.get(ajax_url, params=params, headers=ajax_headers, timeout=10)
        ajax_res.encoding = 'utf-8'

        # 3. Parse HTML tables
        tables = pd.read_html(StringIO(ajax_res.text))
        if len(tables) < 2:
            return None

        # Table index 1 contains the financial data
        raw_df = tables[1]
        df = flatten_multiindex(raw_df)
        df = df.fillna('')

        # 4. Identify year columns from column headers
        year_cols = [col for col in df.columns if is_year_col(col)]

        # 5. Identify label column (contains Korean financial terms)
        label_col = None
        for col in df.columns:
            if df[col].astype(str).str.contains('매출액').any():
                label_col = col
                break

        if label_col is None:
            # Try to find label inside rows (another table layout)
            # Find a row that acts as a header (has year patterns)
            header_row_idx = None
            for idx, row in df.iterrows():
                row_vals = [str(v) for v in row.tolist()]
                if any(is_year_col(v) for v in row_vals):
                    header_row_idx = idx
                    break

            if header_row_idx is None:
                return None

            # Rebuild df with this row as the header
            new_cols = [str(v).strip() for v in df.iloc[header_row_idx].tolist()]
            df2 = df.iloc[header_row_idx + 1:].copy()
            df2.columns = new_cols
            df2 = df2.reset_index(drop=True)

            year_cols2 = [col for col in df2.columns if is_year_col(col)]
            label_col2 = None
            for col in df2.columns:
                if df2[col].astype(str).str.contains('매출액').any():
                    label_col2 = col
                    break

            if label_col2 is None or not year_cols2:
                return None

            financials = build_financials_from_cols(df2, label_col2, year_cols2)
            return financials if financials else None

        if not year_cols:
            return None

        financials = build_financials_from_cols(df, label_col, year_cols)
        return financials if financials else None

    except Exception as e:
        print(f"    [ERROR] fetch_financials({code}, freq_typ={freq_typ}): {e}")
        return None


def scrape_stock_reports(pages=4):
    print(f"Scraping stock research reports (pages: {pages})...")
    reports_by_code = {}
    base_url = "https://finance.naver.com/research/company_list.naver"

    for page in range(1, pages + 1):
        url = f"{base_url}?page={page}"
        try:
            res = requests.get(url, headers=HEADERS, timeout=10)
            res.encoding = 'euc-kr'
            soup = BeautifulSoup(res.text, 'html.parser')
            table = soup.find('table', class_='type_1')
            if not table:
                continue

            rows = table.find_all('tr')
            for row in rows:
                cols = row.find_all(['td', 'th'])
                if len(cols) < 6:
                    continue

                a_tags = row.find_all('a')
                if len(a_tags) < 2:
                    continue

                stock_a = a_tags[0]
                stock_href = stock_a.get('href', '')
                parsed_href = urllib.parse.urlparse(stock_href)
                queries = urllib.parse.parse_qs(parsed_href.query)
                stock_code = queries.get('code', [None])[0]
                if not stock_code:
                    continue

                report_a = a_tags[1]
                title = report_a.text.strip()
                read_href = report_a.get('href', '')
                parsed_read = urllib.parse.urlparse(read_href)
                read_queries = urllib.parse.parse_qs(parsed_read.query)
                nid = read_queries.get('nid', [None])[0]

                pdf_url = ""
                for a in a_tags[2:]:
                    href = a.get('href', '')
                    if href.endswith('.pdf') or 'pdf' in href:
                        pdf_url = href
                        break

                broker = cols[2].text.strip()
                date_str = cols[4].text.strip()
                views = cols[5].text.strip()

                if len(date_str) == 8:
                    date_str = "20" + date_str

                report_data = {
                    "nid": nid,
                    "title": title,
                    "broker": broker,
                    "date": date_str,
                    "views": views,
                    "pdfUrl": pdf_url
                }

                if stock_code not in reports_by_code:
                    reports_by_code[stock_code] = []
                reports_by_code[stock_code].append(report_data)

            time.sleep(0.5)
        except Exception as e:
            print(f"Error scraping stock reports page {page}: {e}")

    print(f"Finished scraping stock reports. Mapped to {len(reports_by_code)} stocks.")
    return reports_by_code


def scrape_industry_reports(pages=2):
    print(f"Scraping industry research reports (pages: {pages})...")
    industry_reports = []
    base_url = "https://finance.naver.com/research/industry_list.naver"

    for page in range(1, pages + 1):
        url = f"{base_url}?page={page}"
        try:
            res = requests.get(url, headers=HEADERS, timeout=10)
            res.encoding = 'euc-kr'
            soup = BeautifulSoup(res.text, 'html.parser')
            table = soup.find('table', class_='type_1')
            if not table:
                continue

            rows = table.find_all('tr')
            for row in rows:
                cols = row.find_all(['td', 'th'])
                if len(cols) < 6:
                    continue

                a_tags = row.find_all('a')
                if len(a_tags) < 1:
                    continue

                category = cols[0].text.strip()

                title_a = a_tags[0]
                title = title_a.text.strip()
                read_href = title_a.get('href', '')
                parsed_read = urllib.parse.urlparse(read_href)
                read_queries = urllib.parse.parse_qs(parsed_read.query)
                nid = read_queries.get('nid', [None])[0]

                pdf_url = ""
                for a in a_tags[1:]:
                    href = a.get('href', '')
                    if href.endswith('.pdf') or 'pdf' in href:
                        pdf_url = href
                        break

                broker = cols[2].text.strip()
                date_str = cols[4].text.strip()
                views = cols[5].text.strip()

                if len(date_str) == 8:
                    date_str = "20" + date_str

                industry_reports.append({
                    "nid": nid,
                    "category": category,
                    "title": title,
                    "broker": broker,
                    "date": date_str,
                    "views": views,
                    "pdfUrl": pdf_url
                })

            time.sleep(0.5)
        except Exception as e:
            print(f"Error scraping industry reports page {page}: {e}")

    print(f"Finished scraping industry reports. Collected {len(industry_reports)} reports.")
    return industry_reports


def clean_json_file(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, encoding="utf-8") as f:
        raw = f.read()
    cleaned = raw.replace('\ufffd', '').replace('\x00', '')
    try:
        json.loads(cleaned)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(cleaned)
        print(f"JSON post-processing complete: {file_path} is browser-safe.")
    except json.JSONDecodeError as e:
        print(f"Warning: JSON post-processing failed for {file_path} ({e}).")


def main():
    json_path = os.path.join("src", "data", "krxStocks.json")
    if not os.path.exists(json_path):
        print(f"Error: {json_path} does not exist!")
        sys.exit(1)

    print(f"Loading {json_path}...")
    with open(json_path, "r", encoding="utf-8") as f:
        stocks = json.load(f)

    print(f"Total stocks loaded: {len(stocks)}")

    # 1. Scrape broker stock reports and industry reports first
    reports_by_code = scrape_stock_reports(pages=4)
    industry_reports = scrape_industry_reports(pages=2)

    # Save industry reports to its own file
    ind_report_path = os.path.join("src", "data", "industryReports.json")
    with open(ind_report_path, "w", encoding="utf-8") as f:
        json.dump(industry_reports, f, indent=2, ensure_ascii=False)
    print(f"Saved industry reports to {ind_report_path}")

    # Compile and save recent stock reports feed
    print("Compiling recent stock reports...")
    all_stock_reports = []
    code_to_name = {s["code"]: s["name"] for s in stocks}
    for code, reports in reports_by_code.items():
        name = code_to_name.get(code, "알 수 없는 종목")
        for r in reports:
            r_copy = dict(r)
            r_copy["stockCode"] = code
            r_copy["stockName"] = name
            all_stock_reports.append(r_copy)

    all_stock_reports.sort(key=lambda x: x.get("date", ""), reverse=True)
    recent_stock_reports = all_stock_reports[:12]  # Extract top 12 most recent

    recent_report_path = os.path.join("src", "data", "recentStockReports.json")
    with open(recent_report_path, "w", encoding="utf-8") as f:
        json.dump(recent_stock_reports, f, indent=2, ensure_ascii=False)
    print(f"Saved recent stock reports to {recent_report_path}")

    # 2. Sort stocks by market cap to select top stocks for financials
    print("Sorting stocks by market cap...")
    stocks_with_cap = []
    for s in stocks:
        cap_val = parse_market_cap(s.get("marketCap", ""))
        stocks_with_cap.append((cap_val, s))

    stocks_with_cap.sort(key=lambda x: x[0], reverse=True)

    top_stocks = [x[1] for x in stocks_with_cap[:LIMIT_STOCKS]]
    print(f"Top {LIMIT_STOCKS} stocks selected for financials scraping.")

    success_count = 0

    # 3. Scrape financials (Annual & Quarterly) and merge
    for idx, s in enumerate(top_stocks):
        code = s["code"]
        name = s["name"]
        print(f"[{idx + 1}/{LIMIT_STOCKS}] {code} ({name})", end="", flush=True)

        # Scrape Annual
        financials = fetch_financials(code, freq_typ="Y")
        time.sleep(0.15)
        # Scrape Quarterly
        financials_q = fetch_financials(code, freq_typ="Q")

        if financials:
            success_count += 1
            print(f" -> OK (Annual: {len(financials)} yrs / Quarterly: {len(financials_q) if financials_q else 0} qtrs)")
            s["financials"] = financials
            s["financialsQuarterly"] = financials_q if financials_q else []
            
            actual = [f for f in financials if not f["isConsensus"]]
            if actual:
                latest = actual[-1]
                if latest.get("roe") is not None:
                    s["roe"] = latest["roe"]
        else:
            print(" -> SKIP (no data)")

        # Map stock reports if present
        if code in reports_by_code:
            s["reports"] = reports_by_code[code]
        else:
            s["reports"] = []

        time.sleep(SLEEP_INTERVAL)

    # For stocks not in the top 200, still map stock reports if present
    for s in stocks:
        code = s["code"]
        if code in reports_by_code and "reports" not in s:
            s["reports"] = reports_by_code[code]

    # Write updated krxStocks.json back
    print(f"\nSaving updated stocks data to {json_path}...")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(stocks, f, indent=2, ensure_ascii=False)

    # Post-processing: clean output JSONs
    print("Cleaning JSON files for browser compatibility...")
    clean_json_file(json_path)
    clean_json_file(ind_report_path)
    clean_json_file(recent_report_path)

    print(f"All tasks completed! Financials scraped: {success_count}/{LIMIT_STOCKS}")


if __name__ == "__main__":
    main()
