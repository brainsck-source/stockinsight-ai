import { mockStocks } from '../data/mockStocks';
import krxStocks from '../data/krxStocks.json';

// 네트워크 지연 시뮬레이션 (800ms)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 시드 기반 의사난수 발생기 (일관성 유지를 위함)
function createRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = seed.charCodeAt(i) + ((h << 5) - h);
  }
  return () => {
    const x = Math.sin(h++) * 10000;
    return x - Math.floor(x);
  };
}

const stockRegistry = krxStocks;


// 의사 난수 기반의 결정론적 실적 및 전망 리포트 생성기
function generateStockData(
  id, 
  name, 
  market, 
  sector, 
  actualPrice, 
  actualChange, 
  actualChangeRate, 
  actualPrevClose, 
  actualOpen, 
  actualHigh, 
  actualLow, 
  actualVolume, 
  actualMarketCap,
  actualFinancials,
  actualReports,
  actualRoe
) {
  const rand = createRandom(id);
  
  // 실제 거래소 마감 지표가 존재하면 사용하고, 없을 시에만 결정론적 모의 데이터 생성
  const price = actualPrice !== undefined && actualPrice !== null ? actualPrice : Math.round((rand() * 720000 + 30000) / 100) * 100;
  const changeRate = actualChangeRate !== undefined && actualChangeRate !== null ? actualChangeRate : parseFloat((rand() * 4.6 - 2.3).toFixed(2));
  const prevClose = actualPrevClose !== undefined && actualPrevClose !== null ? actualPrevClose : Math.round((price / (1 + changeRate / 100)) / 100) * 100;
  const change = actualChange !== undefined && actualChange !== null ? actualChange : price - prevClose;
  
  const open = actualOpen !== undefined && actualOpen !== null ? actualOpen : Math.round((prevClose * (1 + (rand() * 1.2 - 0.6) / 100)) / 100) * 100;
  const high = actualHigh !== undefined && actualHigh !== null ? actualHigh : Math.round((Math.max(price, open) * (1 + (rand() * 1.8) / 100)) / 100) * 100;
  const low = actualLow !== undefined && actualLow !== null ? actualLow : Math.round((Math.min(price, open) * (1 - (rand() * 1.8) / 100)) / 100) * 100;
  const volume = actualVolume !== undefined && actualVolume !== null ? actualVolume : Math.round(rand() * 1200000 + 10000);
  const marketCap = actualMarketCap !== undefined && actualMarketCap !== null ? actualMarketCap : `${(rand() * 25.5 + 0.8).toFixed(1)}조원`;
  
  const per = parseFloat((rand() * 40 + 6).toFixed(1));
  const pbr = parseFloat((rand() * 5 + 0.35).toFixed(2));
  const roe = actualRoe !== undefined && actualRoe !== null ? actualRoe : parseFloat((rand() * 22 + 1).toFixed(1));
  
  // 억 원 단위 매출 기초
  const baseRevenue = Math.round(rand() * 135000 + 4000);
  const operatingMargin = parseFloat((rand() * 16 + 2.5).toFixed(2));
  const netMargin = parseFloat((operatingMargin * (rand() * 0.25 + 0.65)).toFixed(2));
  
  let financials = [];
  if (actualFinancials && actualFinancials.length > 0) {
    financials = actualFinancials;
  } else {
    const years = ["2023", "2024", "2025", "2026(E)", "2027(E)"];
    let currentRev = baseRevenue;
    for (let idx = 0; idx < years.length; idx++) {
      const yr = years[idx];
      const isCons = yr.includes("(E)");
      
      // 연간 매출 성장률 4% ~ 14%
      const growth = 1 + (rand() * 10 + 4) / 100;
      currentRev = Math.round(currentRev * growth);
      
      const opInc = Math.round(currentRev * (operatingMargin / 100));
      const netInc = Math.round(currentRev * (netMargin / 100));
      
      financials.push({
        year: yr,
        revenue: currentRev,
        operatingIncome: opInc,
        netIncome: netInc,
        operatingMargin,
        netMargin,
        roe,
        isConsensus: isCons
      });
    }
  }
  
  const targetPriceVal = Math.round((price * (1.12 + rand() * 0.18)) / 500) * 500;
  const targetPriceLow = Math.round((price * (0.88 + rand() * 0.08)) / 500) * 500;
  
  return {
    id,
    name,
    englishName: `${name} Corp`,
    code: id,
    market,
    sector,
    price,
    change,
    changeRate,
    prevClose,
    open,
    high,
    low,
    volume,
    marketCap,
    per,
    pbr,
    roe,
    momentums: [
      {
        title: `[신사업] ${name} 글로벌 시장 진출 본격화`,
        description: `독자 기술 브랜드와 해외 특허 가치를 필두로 북미 및 신흥국 시장에서의 장기적인 수주 채널 확보 및 성장이 견인되고 있습니다.`,
        badge: "호재"
      },
      {
        title: "[실적] 포트폴리오 개선 및 비용 구조 혁신",
        description: "고부가가치 주력 품목군의 매출 구성비 증가 및 주요 원소재 내재화 성공을 통해 장기 마진 스프레드가 안정적으로 반등 중입니다.",
        badge: "긍정"
      },
      {
        title: "밸류업 프로그램 및 친화 정책 검토",
        description: "안정적인 캐시카우 실적을 기초로 1주당 배당 강화 계획 및 자사주 환원 등 주주 만족 중심 정책 도입을 긍정 검토하고 있습니다.",
        badge: "안정"
      }
    ],
    financials,
    reports: actualReports || [],
    deepAnalysis: {
      growth: {
        score: parseFloat((rand() * 1.8 + 3.1).toFixed(1)),
        description: `${name}은(는) 해당 산업 내 확고한 시장 인지도를 바탕으로 R&D 투자를 대폭 단행하여 독점 특허 및 장벽을 확보해 가고 있습니다. 공정 완전 자동화와 신규 스마트 팹 라인 설비 증설이 마무리 단계에 접어들어, 향후 공급 규모 확대에 대응할 최적의 경쟁 우위를 지니고 있습니다.`,
        highlights: [
          "글로벌 탑티어 고객사 다수와 장기 독점 공급 체인 구축",
          "차세대 원천 기술에 대한 국내외 핵심 특허 출원 완료",
          "설비 가동률 및 수율 향상에 힘입은 한계 제조비용 절감"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: market === "KOSPI" ? "neutral" : "positive",
          statusText: market === "KOSPI" ? "금리 안정화에 따른 설비 차입 비용 조절 기대" : "금리 인하 기조 진입 시 성장 할인율 대폭 해소",
          description: "글로벌 통화 정책 완화는 기술/성장 기업 전반의 조달 금리 경감과 수급 심리 개선 효과를 주어 주가 리레이팅의 지탱목이 됩니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "환율 고점 유지에 의한 해외 매출 환차익 수혜",
          description: "전체 매출 내 글로벌 수출 대금의 외화 비중이 높기 때문에 환율 상승 흐름 속에서 상당한 매출 규모 부풀리기 효과가 나타납니다."
        },
        {
          name: "글로벌 공급망 및 원자재 운임",
          impact: "negative",
          statusText: "해상 물류비 급증 우려 및 가중 리스크 노출",
          description: "최근 국제 정세 불안에 따른 벌크선 운임 지수 및 컨테이너 운송비 상승은 마진을 갉아먹는 단기 위협 변수입니다."
        },
        {
          name: "자국 우선 보호주의 세제 정책",
          impact: "neutral",
          statusText: "해외 생산 거점 구축을 통한 관세 위협 분산",
          description: "주요 수출 교역국의 무역 분쟁 조짐은 리스크 요인이나, 자사는 현지 합작 법인 설립을 통해 세제 규제를 선제 방어하고 있습니다."
        }
      ],
      outlook: {
        shortTerm: "단기적으로는 업황 전반의 안정과 신규 가동 인프라 성과가 온전히 매출에 반영되며 견고한 우상향 수급을 보장할 가능성이 높습니다.",
        midLongTerm: "1년 중장기 시각에서는 주력 솔루션의 글로벌 신규 계약 달성 성과와 주주 가치 환원 이행율에 맞춰 밸류에이션 리레이팅이 가속화될 수 있습니다.",
        targetPrice: `${targetPriceLow.toLocaleString()}원 ~ ${targetPriceVal.toLocaleString()}원`
      }
    }
  };
}

export const api = {
  /**
   * 주식 종목 검색 (이름 또는 종목코드 매칭)
   * @param {string} query 검색어
   * @returns {Promise<Array>} 검색 결과 리스트
   */
  searchStocks: async (query) => {
    await delay(300);
    if (!query || query.trim() === '') {
      return [];
    }
    const cleanQuery = query.toLowerCase().replace(/\s+/g, '');
    const isCode = /^\d{6}$/.test(cleanQuery);

    // 1. mockStocks 검색
    const mockStocksResults = mockStocks
      .filter((stock) => {
        const cleanName = stock.name.toLowerCase().replace(/\s+/g, '');
        const cleanEngName = stock.englishName.toLowerCase().replace(/\s+/g, '');
        return (
          cleanName.includes(cleanQuery) ||
          cleanEngName.includes(cleanQuery) ||
          stock.code.includes(cleanQuery)
        );
      })
      .map((stock) => ({
        id: stock.id,
        name: stock.name,
        code: stock.code,
        sector: stock.sector,
        price: stock.price,
        changeRate: stock.changeRate
      }));

    // 2. stockRegistry 검색
    const registryResults = stockRegistry
      .filter((stock) => {
        const cleanName = stock.name.toLowerCase().replace(/\s+/g, '');
        return cleanName.includes(cleanQuery) || stock.code.includes(cleanQuery);
      })
      .map((stock) => {
        // 실제 데이터가 있으면 활용하고, 없으면 생성
        const rand = createRandom(stock.code);
        const price = stock.price !== undefined && stock.price !== null ? stock.price : Math.round((rand() * 720000 + 30000) / 100) * 100;
        const changeRate = stock.changeRate !== undefined && stock.changeRate !== null ? stock.changeRate : parseFloat((rand() * 4.6 - 2.3).toFixed(2));
        return {
          id: stock.id,
          name: stock.name,
          code: stock.code,
          sector: stock.sector,
          price,
          changeRate
        };
      });

    // 3. mockStocks 우선 병합 (중복 방지)
    const merged = [...mockStocksResults];
    registryResults.forEach(r => {
      if (!merged.some(m => m.id === r.id)) {
        merged.push(r);
      }
    });

    // 4. 사용자가 직접 6자리 숫자를 입력했으나 목록에 없는 경우 폴백 생성
    if (isCode && !merged.some(m => m.code === cleanQuery)) {
      const rand = createRandom(cleanQuery);
      const price = Math.round((rand() * 720000 + 30000) / 100) * 100;
      const changeRate = parseFloat((rand() * 4.6 - 2.3).toFixed(2));
      merged.push({
        id: cleanQuery,
        name: `신규검색 종목 (${cleanQuery})`,
        code: cleanQuery,
        sector: "금융 투자 지표 종목",
        price,
        changeRate
      });
    }

    return merged;
  },

  /**
   * 상세 종목 데이터 가져오기 (시뮬레이션된 네트워크 딜레이 800ms 적용)
   * @param {string} id 종목코드
   * @returns {Promise<Object|null>} 종목 상세 정보
   */
  getStockById: async (id) => {
    await delay(800);
    // 1. mockStocks 우선 매칭
    const stock = mockStocks.find((s) => s.id === id);
    if (stock) return JSON.parse(JSON.stringify(stock));

    // 2. stockRegistry 명부 매칭
    const registered = stockRegistry.find((s) => s.id === id);
    if (registered) {
      // 200대 기업 밖이거나 실적 데이터가 없는 신규 종목
      const hasFinancials = registered.financials && registered.financials.length > 0;
      
      if (!hasFinancials) {
        return {
          id: registered.id,
          name: registered.name,
          englishName: `${registered.name} Corp`,
          code: registered.code,
          market: registered.market,
          sector: registered.sector || "신규 상장 / 기타 종목",
          price: registered.price ?? null,
          change: registered.change ?? null,
          changeRate: registered.changeRate ?? null,
          prevClose: registered.prevClose ?? null,
          open: registered.open ?? null,
          high: registered.high ?? null,
          low: registered.low ?? null,
          volume: registered.volume ?? null,
          marketCap: registered.marketCap ?? '',
          per: null,
          pbr: null,
          roe: null,
          momentums: [],
          financials: [],
          reports: registered.reports || [],
          isDataPending: true,
          deepAnalysis: null
        };
      }

      return generateStockData(
        registered.id, 
        registered.name, 
        registered.market, 
        registered.sector,
        registered.price,
        registered.change,
        registered.changeRate,
        registered.prevClose,
        registered.open,
        registered.high,
        registered.low,
        registered.volume,
        registered.marketCap,
        registered.financials,
        registered.reports,
        registered.roe
      );
    }

    // 3. 신규 6자리 입력 종목 폴백 생성
    if (/^\d{6}$/.test(id)) {
      return {
        id,
        name: `가상 종목 (${id})`,
        englishName: `Virtual Stock ${id}`,
        code: id,
        market: "KOSPI",
        sector: "금융 투자",
        price: null,
        change: null,
        changeRate: null,
        prevClose: null,
        open: null,
        high: null,
        low: null,
        volume: null,
        marketCap: '',
        per: null,
        pbr: null,
        roe: null,
        momentums: [],
        financials: [],
        reports: [],
        isDataPending: true,
        deepAnalysis: null
      };
    }

    return null;
  },

  /**
   * 기본 추천/인기 종목 목록 가져오기
   * @returns {Promise<Array>} 추천 종목 리스트
   */
  getRecommendedStocks: async () => {
    await delay(100);
    // 시가총액 상위 10개를 KRX 데이터에서 추출 (실제 가격 있는 것 우선)
    const TOP_CODES = [
      '005930', // 삼성전자
      '000660', // SK하이닉스
      '005380', // 현대자동차
      '035420', // NAVER
      '051910', // LG화학
      '005490', // POSCO홀딩스
      '035720', // 카카오
      '003550', // LG
      '030200', // KT
      '017670', // SK텔레콤
    ];

    return TOP_CODES.map((code) => {
      // mockStocks에서 먼저 찾기
      const mock = mockStocks.find((s) => s.id === code);
      if (mock) {
        return {
          id: mock.id,
          name: mock.name,
          code: mock.code,
          sector: mock.sector,
          price: mock.price,
          changeRate: mock.changeRate
        };
      }
      // krxStocks에서 찾기
      const krx = stockRegistry.find((s) => s.code === code);
      if (krx) {
        const rand = createRandom(code);
        const price = krx.price != null ? krx.price : Math.round((rand() * 200000 + 10000) / 100) * 100;
        const changeRate = krx.changeRate != null ? krx.changeRate : parseFloat((rand() * 4.6 - 2.3).toFixed(2));
        return {
          id: krx.id,
          name: krx.name,
          code: krx.code,
          sector: krx.sector || '대형주',
          price,
          changeRate
        };
      }
      return null;
    }).filter(Boolean);
  },

  getIndustryReports: async () => {
    await delay(100);
    try {
      const reports = await import('../data/industryReports.json');
      return reports.default || [];
    } catch (e) {
      console.warn("Failed to load industry reports:", e);
      return [];
    }
  }
};
