import json

with open('src/data/krxStocks.json', encoding='utf-8') as f:
    stocks = json.load(f)

# 삼성전자 확인
samsung = next((s for s in stocks if s['code'] == '005930'), None)
if samsung:
    print('=== 삼성전자 ===')
    fins = samsung.get('financials', [])
    print('financials:', len(fins), 'years')
    for fin in fins:
        yr = fin['year']
        rev = fin['revenue']
        op = fin['operatingIncome']
        roe = fin['roe']
        print(f'  {yr}: revenue={rev}, opIncome={op}, ROE={roe}')
    print('reports:', len(samsung.get('reports', [])))

# 전체 통계
with_fin = sum(1 for s in stocks if s.get('financials'))
with_rep = sum(1 for s in stocks if s.get('reports'))
print('\n===  통계 ===')
print(f'전체: {len(stocks)}개 종목')
print(f'재무 데이터 있음: {with_fin}개')
print(f'리포트 있음: {with_rep}개')

# 산업 리포트
with open('src/data/industryReports.json', encoding='utf-8') as f:
    industry = json.load(f)
print(f'산업 리포트: {len(industry)}개')
if industry:
    r = industry[0]
    print(f'  첫 번째: [{r["category"]}] {r["title"]} - {r["broker"]} ({r["date"]})')
