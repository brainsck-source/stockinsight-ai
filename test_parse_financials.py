import pandas as pd
import numpy as np

def clean_value(val):
    if pd.isna(val) or val == '' or str(val).strip() in ['-', 'N/A', 'NaN', 'nan']:
        return None
    try:
        s = str(val).replace(',', '').strip()
        return float(s)
    except:
        return None

def parse_table(file_path):
    df = pd.read_csv(file_path, header=None).fillna('')
    
    header_row_idx = None
    for idx, row in df.iterrows():
        row_str_list = [str(x) for x in row.tolist()]
        if any("/12" in cell or "/06" in cell or "/03" in cell or "/09" in cell for cell in row_str_list):
            header_row_idx = idx
            break
            
    if header_row_idx is None:
        print("Could not find header row")
        return
        
    print(f"Header row found at index {header_row_idx}")
    
    columns = [str(x).strip() for x in df.iloc[header_row_idx].tolist()]
    print(f"Columns raw: {columns}")
    
    data_df = df.iloc[header_row_idx + 1:]
    
    label_col_idx = None
    for col_idx in range(len(df.columns)):
        col_vals = [str(x) for x in df.iloc[:, col_idx].tolist()]
        if any("매출액" in val for val in col_vals):
            label_col_idx = col_idx
            break
            
    if label_col_idx is None:
        print("Could not find label column")
        return
        
    print(f"Label column found at index {label_col_idx}")
    
    row_mapping = {}
    for idx, row in data_df.iterrows():
        label = str(row[label_col_idx]).strip()
        if label == "매출액":
            row_mapping["revenue"] = idx
        elif label == "영업이익":
            row_mapping["operatingIncome"] = idx
        elif label == "영업이익(발표기준)":
            row_mapping["operatingIncomeFallback"] = idx
        elif label == "당기순이익":
            row_mapping["netIncome"] = idx
        elif label in ["ROE(%)", "ROE"]:
            row_mapping["roe"] = idx
            
    print(f"Row mapping: {row_mapping}")
    
    financials = []
    for col_idx in range(label_col_idx + 1, len(columns)):
        col_name = columns[col_idx]
        if not col_name or col_name == 'nan':
            continue
            
        is_consensus = "(E)" in col_name
        year_digits = "".join(filter(str.isdigit, col_name))
        if len(year_digits) < 4:
            continue
        year_match = year_digits[:4]
            
        year_label = f"{year_match}(E)" if is_consensus else year_match
        
        revenue = clean_value(df.iloc[row_mapping.get("revenue"), col_idx]) if "revenue" in row_mapping else None
        
        operatingIncome = clean_value(df.iloc[row_mapping.get("operatingIncome"), col_idx]) if "operatingIncome" in row_mapping else None
        if operatingIncome is None and "operatingIncomeFallback" in row_mapping:
            operatingIncome = clean_value(df.iloc[row_mapping.get("operatingIncomeFallback"), col_idx])
            
        netIncome = clean_value(df.iloc[row_mapping.get("netIncome"), col_idx]) if "netIncome" in row_mapping else None
        roe = clean_value(df.iloc[row_mapping.get("roe"), col_idx]) if "roe" in row_mapping else None
        
        operatingMargin = round((operatingIncome / revenue) * 100, 2) if revenue and operatingIncome else None
        netMargin = round((netIncome / revenue) * 100, 2) if revenue and netIncome else None
        
        financials.append({
            "year": year_label,
            "revenue": revenue,
            "operatingIncome": operatingIncome,
            "netIncome": netIncome,
            "roe": roe,
            "operatingMargin": operatingMargin,
            "netMargin": netMargin,
            "isConsensus": is_consensus
        })
        
    print("\n--- Parsed Financials ---")
    for f in financials:
        print(f)
        
parse_table("financial_ajax_table_1.csv")
