@echo off
echo ===================================================
echo  [StockInsight AI] 최신 주식 재무 및 리포트 수집 시작
echo ===================================================
echo.

:: 1. 데이터 스크래퍼 실행
python update_data.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [에러] 데이터 수집 도중 오류가 발생했습니다.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo  [StockInsight AI] GitHub 원격 서버로 업데이트 전송 중...
echo ===================================================
echo.

:: 2. 변경된 데이터 커밋 및 푸시
git add src/data/krxStocks.json src/data/industryReports.json
git commit -m "data: update financials and reports from Naver Finance"
git push

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [에러] GitHub 업로드 도중 오류가 발생했습니다. 네트워크 또는 로그인 권한을 확인하세요.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo  [성공] 데이터 업데이트 및 GitHub 업로드가 완료되었습니다!
echo  Vercel 클라우드가 15초 내로 사이트를 자동 갱신합니다.
echo ===================================================
echo.
pause
