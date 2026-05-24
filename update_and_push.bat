@echo off
echo ===================================================
echo  [StockInsight AI] Starting Data Scraping...
echo ===================================================
echo.

:: Run Python scraper
python update_data.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Data scraping failed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo  [StockInsight AI] Pushing Updates to GitHub...
echo ===================================================
echo.

:: Stage, commit, and push updated data
git add src/data/krxStocks.json src/data/industryReports.json src/data/recentStockReports.json
git commit -m "data: update financials and reports from Naver Finance"
git push

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] GitHub upload failed. Check connection or credentials.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo  [SUCCESS] Data update and GitHub upload complete!
echo  Vercel will redeploy in about 15 seconds.
echo ===================================================
echo.
pause
