import urllib.request
import ssl
import traceback

def test_url(url, context=None):
    print(f"\nTesting: {url}")
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        )
        with urllib.request.urlopen(req, context=context, timeout=5) as response:
            html = response.read().decode('utf-8', errors='ignore')
            print(f"Success! Length of content: {len(html)}")
            print(f"Contains '매출액': {'매출액' in html}")
            print(html[:500])
    except Exception as e:
        print(f"Error: {e}")
        traceback.print_exc()

# 1. Test HTTPS with default SSL context
test_url("https://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930")

# 2. Test HTTP
test_url("http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930")

# 3. Test HTTPS with unverified context
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
test_url("https://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=005930", context=ctx)
