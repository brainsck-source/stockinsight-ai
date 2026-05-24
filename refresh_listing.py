"""
refresh_listing.py
- FinanceDataReader로 최신 KRX 전체 종목 목록을 가져와서
  기존 krxStocks.json의 재무 데이터(financials, reports)를 보존하면서
  신규 상장 종목을 추가하고 상장 폐지 종목은 제거한다.
"""
import json
import os
import sys
import FinanceDataReader as fdr
import pandas as pd

JSON_PATH = os.path.join("src", "data", "krxStocks.json")

SECTOR_MAP = {
    "STK": "KOSPI",
    "KSQ": "KOSDAQ",
    "KNX": "KONEX",
}

def market_name(market_id, market):
    if market_id == "STK":
        return "KOSPI"
    elif market_id == "KSQ":
        return "KOSDAQ"
    elif market_id == "KNX":
        return "KONEX"
    return market or "KOSPI"

def main():
    # 1. 기존 JSON 로드
    print(f"Loading existing {JSON_PATH}...")
    with open(JSON_PATH, encoding="utf-8") as f:
        existing = json.load(f)

    existing_map = {s["code"]: s for s in existing}
    print(f"Existing stocks: {len(existing_map)}")

    # 2. 최신 KRX 목록 가져오기
    print("Fetching latest KRX listing from FinanceDataReader...")
    df = fdr.StockListing("KRX")
    print(f"Latest KRX stocks: {len(df)}")

    # 3. 새 목록 생성 (기존 데이터 보존 + 신규 추가)
    new_stocks = []
    added = 0
    updated = 0
    kept = 0

    for _, row in df.iterrows():
        code = str(row["Code"]).zfill(6)
        name = str(row.get("Name", "")).strip()
        market = market_name(str(row.get("MarketId", "")), str(row.get("Market", "")))

        if not name or not code:
            continue

        # 가격 데이터
        close = row.get("Close", None)
        changes = row.get("Changes", None)
        chg_ratio = row.get("ChagesRatio", None)
        open_p = row.get("Open", None)
        high = row.get("High", None)
        low = row.get("Low", None)
        volume = row.get("Volume", None)
        marcap = row.get("Marcap", None)

        def safe_num(v):
            try:
                val = float(v)
                return None if (pd.isna(val) or val == 0) else val
            except Exception:
                return None

        price = safe_num(close)
        change = safe_num(changes)
        change_rate = safe_num(chg_ratio)
        open_price = safe_num(open_p)
        high_price = safe_num(high)
        low_price = safe_num(low)
        vol = safe_num(volume)

        # 시가총액 포맷
        marcap_val = safe_num(marcap)
        if marcap_val:
            eok = marcap_val / 1e8  # 원 → 억원
            if eok >= 10000:
                market_cap_str = f"{eok/10000:.1f}조원"
            else:
                market_cap_str = f"{eok:.0f}억원"
        else:
            market_cap_str = ""

        if code in existing_map:
            # 기존 종목: 가격 데이터만 업데이트, 재무/리포트 보존
            s = dict(existing_map[code])
            s["name"] = name  # 이름 최신화
            if price is not None:
                s["price"] = price
            if change is not None:
                s["change"] = change
            if change_rate is not None:
                s["changeRate"] = change_rate
            if open_price is not None:
                s["open"] = open_price
            if high_price is not None:
                s["high"] = high_price
            if low_price is not None:
                s["low"] = low_price
            if vol is not None:
                s["volume"] = vol
            if market_cap_str:
                s["marketCap"] = market_cap_str
            new_stocks.append(s)
            kept += 1
        else:
            # 신규 종목 추가
            new_stocks.append({
                "id": code,
                "code": code,
                "name": name,
                "market": market,
                "sector": market,  # 섹터 정보가 없으면 시장 이름으로
                "price": price,
                "change": change,
                "changeRate": change_rate,
                "prevClose": None,
                "open": open_price,
                "high": high_price,
                "low": low_price,
                "volume": vol,
                "marketCap": market_cap_str,
                "financials": [],
                "reports": []
            })
            added += 1
            print(f"  + NEW: {code} ({name}) [{market}]")

    print(f"\nResult: {kept} existing kept, {added} new added")
    print(f"Total: {len(new_stocks)} stocks")

    # 4. 저장
    print(f"Saving to {JSON_PATH}...")
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(new_stocks, f, indent=2, ensure_ascii=False)

    # 5. JSON 검증
    with open(JSON_PATH, encoding="utf-8") as f:
        verify = json.load(f)
    print(f"Verified: {len(verify)} records OK")
    print("Done!")

if __name__ == "__main__":
    main()
