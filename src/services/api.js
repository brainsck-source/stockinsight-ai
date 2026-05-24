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


// 2026년 5월 시황 및 증권사 리포트 본문 기반 AI 종합 동적 분석 엔진
function synthesizeStockAnalysis(id, name, sector, price, changeRate, reports, rawReportTexts) {
  const rand = createRandom(id);
  const texts = rawReportTexts || [];

  // 1. 실제 리포트 요약본이 존재할 경우 핵심 구절 추출 및 가공
  let reportSnippet = "";
  if (texts.length > 0) {
    const cleanText = texts[0].replace(/\[.*?\]/g, "").replace(/\s+/g, " ").trim();
    if (cleanText.length > 20) {
      reportSnippet = cleanText.substring(0, 180) + "...";
    }
  }

  // 2. 2026년 5월 업종별 특화 메가 트렌드 테마 키워드 매핑
  let sectorTheme = "";
  let keywords = [];
  let highlights = [];
  
  const isSemiconductor = sector.includes("반도체") || name.includes("삼성전자") || name.includes("하이닉스") || name.includes("리노공업");
  const isAutomobile = sector.includes("자동차") || sector.includes("운수장비") || name.includes("현대") || name.includes("기아");
  const isBio = sector.includes("바이오") || sector.includes("의약") || name.includes("바이오") || name.includes("셀트리온");
  const isInternet = sector.includes("인터넷") || sector.includes("소프트웨어") || name.includes("NAVER") || name.includes("카카오");
  const isBattery = sector.includes("배터리") || sector.includes("에너지") || sector.includes("화학") || name.includes("에코프로") || name.includes("LG화학");

  if (isSemiconductor) {
    sectorTheme = "차세대 HBM4 규격으로의 전환 가속화와 CXL(Compute Express Link) 기술 비전, 그리고 2나노 파운드리 양산 진척";
    keywords = ["HBM4 수주 성과", "CXL 표준 선점", "2나노 파운드리 진척", "고대역폭 메모리 양산"];
    highlights = [
      "차세대 HBM4 및 커스텀 메모리 패키징 주도권 확보",
      "CXL 차세대 인터페이스 메모리 라인업 선제적 출하 준비",
      "글로벌 빅테크 전용 2나노 초미세 파운드리 공정 진척 및 다변화"
    ];
  } else if (isAutomobile) {
    sectorTheme = "고부가가치 하이브리드(HEV) 차종 믹스 개선 및 차세대 SDV(소프트웨어 중심 차량)로의 전환과 글로벌 신흥국 수주 모멘텀";
    keywords = ["하이브리드 판매 견인", "SDV 플랫폼 전환", "글로벌 신흥국 수주", "믹스 개선 효과"];
    highlights = [
      "고마진 하이브리드(HEV) 라인업 중심의 견고한 믹스 개선",
      "차세대 SDV 소프트웨어 플랫폼 통합 및 OTA 무선 업데이트 확대",
      "인도 시장 신규 법인 상장 추진을 통한 장기 성장 재원 확보"
    ];
  } else if (isBio) {
    sectorTheme = "주요 바이오시밀러 신규 파이프라인의 미국 FDA 승인 및 위탁개발생산(CDMO) 대규모 신규 수주 실적과 생산 인프라 증설";
    keywords = ["FDA 신규 승인", "CDMO 대규모 수주", "바이오시밀러 파이프라인", "생산 수율 극대화"];
    highlights = [
      "주요 파이프라인의 글로벌 승인 완료 및 미국 시장 침투 가속화",
      "글로벌 빅파마 향 대형 CDMO 위탁 생산 4공장 가동 및 5공장 증설 계획",
      "특허 만료에 맞춘 오리지널 의약품 대체 밸류에이션 리레이팅 선점"
    ];
  } else if (isInternet) {
    sectorTheme = "자체 거대언어모델 기반 생성형 AI 비즈니스 수익화 본격화와 디지털 플랫폼 광고/커머스 부문의 마진 스프레드 개선";
    keywords = ["생성형 AI 수익화", "HyperCLOVA X 확장", "광고 마진 개선", "커머스 플랫폼 확장"];
    highlights = [
      "자체 AI 검색 모델 및 초거대 AI 플랫폼 유료 구독 체인 본격 가동",
      "특화 이커머스 솔루션 도입에 따른 고정비 분산 및 마진 반등 성과",
      "글로벌 클라우드 인프라 확장 및 B2B 엔터프라이즈 솔루션 수주 개시"
    ];
  } else if (isBattery) {
    sectorTheme = "글로벌 완성차 OEM사와의 북미 합작공장(JV) 가동 본격화 및 LFP 배터리와 4680 차세대 원통형 배터리 다변화";
    keywords = ["북미 합작공장 가동", "LFP 양산 개시", "4680 원통형 공급", "글로벌 공급망 안정"];
    highlights = [
      "북미 중심 합작 법인(JV) 조기 양산 돌입을 통한 AMPC 세액 공제 극대화",
      "중저가 시장 겨냥 LFP 및 고성능 차세대 원통형 4680 배터리 공급 개시",
      "친환경 공급망 실사 대응 원소재 내재화 성공을 통한 원가 절감"
    ];
  } else {
    sectorTheme = "업종 내 핵심 지배력을 바탕으로 한 공정 효율화 및 차세대 프리미엄 솔루션 글로벌 시장 침투 본격화";
    keywords = ["글로벌 시장 침투", "마진 고도화 추진", "운영 효율성 개선", "안정적 캐시카우"];
    highlights = [
      "핵심 포트폴리오의 해외 수출 대리점망 확대 및 판가 인상 관철",
      "원소재 공급선 다변화를 통한 장기 비용 스프레드 안정화 성공",
      "안정적 잉여현금흐름(FCF) 기반의 배당 확대 방안 선제적 검토"
    ];
  }

  // 3. 2026년 5월 거시 매크로 현황 연계 변수
  const macroFed = "2026년 5월 현재 미 연준(Fed)의 기준금리는 연 3.5% ~ 3.75% 수준으로 매파적 동결 기조를 유지하고 있으며, 케빈 워시 신임 연준 의장 취임 모멘텀에 따른 시장 금리 변동성에 선제 대응하고 있습니다.";
  const macroFx = "최근 원/달러 환율이 1,500원 ~ 1,510원 선을 돌파하며 외환시장 변동성이 크게 확대된 상황입니다. 수출 의존도가 높은 본 종목의 해외 환차익 수혜 및 원화 매출 부풀리기 효과가 극대화되는 반면 원자재 수입 비용 부담도 공존합니다.";
  const macroSupply = "최근 해상 운송로 불안정으로 물류비가 소폭 증가했으나, 장기 수송 계약 체결 및 핵심 원자재 공급선 내재화로 마진에 미치는 리스크는 선제적으로 방어되고 있습니다.";
  const macroGeopolitics = "보호무역 장벽 강화 및 미·중 기술 무역 분쟁 가능성이 상존하지만, 현지 합작 공장 조기 가동 및 우회 공급망 구축을 통해 정책적 리스크를 안정적으로 조절하고 있습니다.";

  // 4. 문장 동적 조합 (Synthesized growth potential)
  let growthDesc = `[${sector}] 부문의 주력 기업인 ${name}은(는) 2026년 5월 시장 트렌드인 ${sectorTheme}을(를) 중심으로 강력한 도약 국면을 보이고 있습니다. `;
  if (reportSnippet) {
    growthDesc += `최근 수집된 증권사 분석에 따르면 "${reportSnippet}"과 같이 실제 기업 펀더멘털의 개선이 포착되었습니다. `;
  } else {
    growthDesc += `특히 업종 내 차세대 신기술 R&D 투자 비율을 시가총액 대비 최고 수준으로 유지하여 기술 진입장벽을 구축하고 있으며, 글로벌 탑티어 고객사와의 장기 수주 연동을 통해 매출 예측 시인성을 크게 개선했습니다. `;
  }
  growthDesc += `공정 자동화 수율 안정화에 힘입어 한계비용이 절감되면서 2026년 연간 영업이익 마진 또한 뚜렷한 리레이팅 국면에 안착한 것으로 평가됩니다.`;

  // 5. 문장 동적 조합 (Outlook)
  let shortTermDesc = `향후 6개월 단기 관점에서는 2026년 상반기 ${keywords[0] || "신규 라인업 효과"}의 실적 온기 반영이 두드러질 것입니다. `;
  if (changeRate > 0) {
    shortTermDesc += `최근 시장의 강한 매수세와 가격 반등 기조에 부합하여, 핵심 바이어 향 공급 물량의 큐(Q) 상승과 판가(P) 유지 효과가 영업이익을 견인할 것으로 예상됩니다. `;
  } else {
    shortTermDesc += `단기적인 매크로 수급 조정 및 환율 변동성에도 불구하고, ${keywords[1] || "안정적 캐시카우"}를 바탕으로 매각 및 공급 안정화 수율이 확고해 분기별 실적 성장의 기초 체력은 탄탄합니다. `;
  }
  shortTermDesc += "미국 대선 결과 및 글로벌 교역 세제 개편 움직임 등 대외 변동성이 단기 수급을 흔들 수 있으나, 우량 바이어 중심의 수주 잔고가 이를 충분히 상쇄할 것입니다.";

  let midLongTermDesc = `1년 이상의 중장기 시각에서는 차세대 기술인 ${keywords[2] || "차세대 솔루션"}의 글로벌 공급 표준 채택 여부가 밸류에이션 리벨링의 결정적 열쇠가 될 것입니다. `;
  midLongTermDesc += `특히 2026년 하반기에서 2027년으로 이어지는 시기에는 ${keywords[3] || "생태계 지배력 강화"}의 영향으로 시장 점유율이 2위권 이하 경쟁사 대비 격차를 더 벌릴 전망이며, 이에 맞춰 영업이익 50% 이상의 탄력적 증익 사이클 진입이 유력시됩니다.`;

  return {
    growth: {
      score: parseFloat((rand() * 1.5 + 3.4).toFixed(1)),
      description: growthDesc,
      highlights: highlights
    },
    globalMacro: [
      {
        name: "미국 연준 기준 금리",
        impact: sector.includes("반도체") || sector.includes("인터넷") || sector.includes("바이오") ? "positive" : "neutral",
        statusText: "금리 인하 사이클 도래 및 조달 비용 경감",
        description: macroFed
      },
      {
        name: "원/달러 환율",
        impact: "positive",
        statusText: "수출 대금 환차익 극대화 수혜",
        description: macroFx
      },
      {
        name: "글로벌 공급망 및 원자재 운임",
        impact: "negative",
        statusText: "해상 운임 변동성 조절 리스크",
        description: macroSupply
      },
      {
        name: "자국 우선 보호주의 세제 정책",
        impact: "neutral",
        statusText: "생산 거점 다변화를 통한 규제 방어",
        description: macroGeopolitics
      }
    ],
    outlook: {
      shortTerm: shortTermDesc,
      midLongTerm: midLongTermDesc,
      targetPrice: "" // 호출처에서 부여
    }
  };
}

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
  actualRoe,
  actualFinancialsQuarterly,
  actualRawReportTexts
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
  
  let financialsQuarterly = [];
  if (actualFinancialsQuarterly && actualFinancialsQuarterly.length > 0) {
    financialsQuarterly = actualFinancialsQuarterly;
  } else {
    const quarters = ["2024/06", "2024/09", "2024/12", "2025/03(E)", "2025/06(E)"];
    let currentRev = Math.round(baseRevenue / 4);
    for (let idx = 0; idx < quarters.length; idx++) {
      const qtr = quarters[idx];
      const isCons = qtr.includes("(E)");
      
      const growth = 1 + (rand() * 6 - 2) / 100;
      currentRev = Math.round(currentRev * growth);
      
      const opInc = Math.round(currentRev * (operatingMargin / 100));
      const netInc = Math.round(currentRev * (netMargin / 100));
      
      financialsQuarterly.push({
        year: qtr,
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

  // 최신 실시간 동적 분석 엔진 적용
  const dynamicAnalysis = synthesizeStockAnalysis(
    id,
    name,
    sector,
    price,
    changeRate,
    actualReports,
    actualRawReportTexts
  );
  dynamicAnalysis.outlook.targetPrice = `${targetPriceLow.toLocaleString()}원 ~ ${targetPriceVal.toLocaleString()}원`;
  
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
    financialsQuarterly,
    reports: actualReports || [],
    deepAnalysis: dynamicAnalysis
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
    // 1. mockStocks 우선 매칭 (실제 수집 데이터가 존재하면 병합)
    const stock = mockStocks.find((s) => s.id === id);
    if (stock) {
      const copy = JSON.parse(JSON.stringify(stock));
      const registered = stockRegistry.find((s) => s.id === id);
      if (registered) {
        // 실제 가격/수치 정보 덮어쓰기
        if (registered.price !== undefined && registered.price !== null) copy.price = registered.price;
        if (registered.change !== undefined && registered.change !== null) copy.change = registered.change;
        if (registered.changeRate !== undefined && registered.changeRate !== null) copy.changeRate = registered.changeRate;
        if (registered.prevClose !== undefined && registered.prevClose !== null) copy.prevClose = registered.prevClose;
        if (registered.open !== undefined && registered.open !== null) copy.open = registered.open;
        if (registered.high !== undefined && registered.high !== null) copy.high = registered.high;
        if (registered.low !== undefined && registered.low !== null) copy.low = registered.low;
        if (registered.volume !== undefined && registered.volume !== null) copy.volume = registered.volume;
        if (registered.marketCap !== undefined && registered.marketCap !== null) copy.marketCap = registered.marketCap;

        // 실제 재무제표 및 리포트 주입
        if (registered.financials && registered.financials.length > 0) {
          copy.financials = registered.financials;
        }
        if (registered.financialsQuarterly && registered.financialsQuarterly.length > 0) {
          copy.financialsQuarterly = registered.financialsQuarterly;
        }
        if (registered.reports && registered.reports.length > 0) {
          copy.reports = registered.reports;
        }
        
        // 2026년 5월 시황 및 크롤링된 리포트 원문 기반 동적 AI 분석 합성
        const reportsList = registered.reports || [];
        const rawReportTexts = registered.rawReportTexts || [];
        const dynamicAnalysis = synthesizeStockAnalysis(
          copy.id,
          copy.name,
          copy.sector,
          copy.price,
          copy.changeRate,
          reportsList,
          rawReportTexts
        );
        
        // 목표가 계산 및 덮어쓰기
        const rand = createRandom(copy.id);
        const targetPriceLow = Math.round((copy.price * (1.02 + rand() * 0.06)) / 500) * 500;
        const targetPriceVal = Math.round((copy.price * (1.12 + rand() * 0.15)) / 500) * 500;
        dynamicAnalysis.outlook.targetPrice = `${targetPriceLow.toLocaleString()}원 ~ ${targetPriceVal.toLocaleString()}원`;
        
        copy.deepAnalysis = dynamicAnalysis;
      } else {
        // registered가 없더라도 mockStocks의 자체 데이터를 기반으로 동적 합성 처리
        const dynamicAnalysis = synthesizeStockAnalysis(
          copy.id,
          copy.name,
          copy.sector,
          copy.price,
          copy.changeRate,
          copy.reports || [],
          copy.rawReportTexts || []
        );
        const rand = createRandom(copy.id);
        const targetPriceLow = Math.round((copy.price * (1.02 + rand() * 0.06)) / 500) * 500;
        const targetPriceVal = Math.round((copy.price * (1.12 + rand() * 0.15)) / 500) * 500;
        dynamicAnalysis.outlook.targetPrice = `${targetPriceLow.toLocaleString()}원 ~ ${targetPriceVal.toLocaleString()}원`;
        
        copy.deepAnalysis = dynamicAnalysis;
      }
      return copy;
    }

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
          financialsQuarterly: [],
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
        registered.roe,
        registered.financialsQuarterly,
        registered.rawReportTexts
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
        financialsQuarterly: [],
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
  },

  getRecentStockReports: async () => {
    await delay(100);
    try {
      const reports = await import('../data/recentStockReports.json');
      return reports.default || [];
    } catch (e) {
      console.warn("Failed to load recent stock reports:", e);
      return [];
    }
  }
};
