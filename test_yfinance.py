import yfinance as yf
import json
import traceback

with open("log_yf.txt", "w", encoding="utf-8") as f:
    f.write("Starting Yahoo Finance Test...\n")
    try:
        # Ticker for Samsung Electronics in KOSPI
        ticker_name = "005930.KS"
        f.write(f"Fetching ticker {ticker_name}...\n")
        ticker = yf.Ticker(ticker_name)
        
        # Fetch financials
        f.write("Fetching financials dataframe...\n")
        financials = ticker.financials
        f.write(f"Financials dataframe shape: {financials.shape}\n")
        
        # Save to string and print log
        f.write("--- Financials Snippet ---\n")
        f.write(financials.to_string() + "\n")
        f.write("Finished successfully.\n")
    except Exception as e:
        f.write(f"Error occurred: {str(e)}\n")
        f.write(traceback.format_exc() + "\n")

print("ASCII: Done, check log_yf.txt")
