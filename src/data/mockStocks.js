// 국내 주요 10대 기업 상세 실적 및 분석 모의 데이터 (Mock Data)
export const mockStocks = [
  {
    id: "005930",
    name: "삼성전자",
    englishName: "Samsung Electronics",
    code: "005930",
    market: "KOSPI",
    sector: "반도체 및 전자장비",
    price: 292500,
    change: -7000,
    changeRate: -2.34,
    prevClose: 299500,
    open: 300000,
    high: 300500,
    low: 292000,
    volume: 18194628,
    marketCap: "442.9조원",
    per: 16.4,
    pbr: 1.35,
    roe: 8.5,
    momentums: [
      {
        title: "HBM3E/HBM4 엔비디아 공급 본격화",
        description: "5세대 HBM3E 12단 제품의 퀄 테스트 완료 및 하반기 본격 양산 돌입으로 AI 서버 매출 비중이 급증할 것으로 기대됨.",
        badge: "호재"
      },
      {
        title: "파운드리 3나노 GAA 수율 개선",
        description: "3나노 2세대 GAA(Gate-All-Around) 공정의 수율이 안정화 단계에 진입하며 글로벌 빅테크 고객사 수주 확대 가능성이 증가함.",
        badge: "긍정"
      },
      {
        title: "스마트폰/가전 온디바이스 AI 시장 선점",
        description: "갤럭시 S24 및 신형 폴더블 라인업의 AI 기능 고도화로 프리미엄 스마트폰 시장 점유율 1위를 굳건히 유지 중.",
        badge: "안정"
      }
    ],
    financials: [
      { year: "2023", revenue: 2589355, operatingIncome: 65670, netIncome: 154871, operatingMargin: 2.54, netMargin: 5.98, isConsensus: false },
      { year: "2024", revenue: 3085800, operatingIncome: 284200, netIncome: 228400, operatingMargin: 9.21, netMargin: 7.40, isConsensus: false },
      { year: "2025", revenue: 3452000, operatingIncome: 412000, netIncome: 320000, operatingMargin: 11.93, netMargin: 9.27, isConsensus: false },
      { year: "2026(E)", revenue: 3824000, operatingIncome: 512000, netIncome: 405000, operatingMargin: 13.39, netMargin: 10.59, isConsensus: true },
      { year: "2027(E)", revenue: 4120000, operatingIncome: 580000, netIncome: 462000, operatingMargin: 14.08, netMargin: 11.21, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.5,
        description: "AI 반도체 수요 폭발에 따른 HBM 시장 성장세와 GAA 파운드리 기술 고도화가 핵심 성장 동력입니다. 매년 매출액 대비 약 8~9% 수준인 25~30조 원을 R&D에 지속 투자하고 있으며, 평택 및 용인 클러스터 중심의 설비 투자가 향후 시장 점유율 상승의 발판이 될 것입니다.",
        highlights: [
          "연간 R&D 투자 규모 28조 원 돌파 (업계 최고 수준)",
          "용인 메가 반도체 클러스터 대규모 인프라 구축 중",
          "AI 가속기 및 차세대 CXL 메모리 표준 주도"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "neutral",
          statusText: "금리 인하 기조 진입 시 유동성 유입 기대",
          description: "금리 고점 통과 및 인하 시 자본집약적 산업인 반도체 설비 투자 부담 완화 및 기술주 전반의 밸류에이션 리레이팅이 가능합니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "환율 상승(원화 약세) 시 영업이익 개선 효과",
          description: "달러 결제 비중이 높은 반도체 수출 특성상 환율 상승은 즉각적인 원화 환산 매출 및 영업이익 상승으로 이어집니다."
        },
        {
          name: "DRAM/NAND 메모리 가격",
          impact: "positive",
          statusText: "고부가 메모리(HBM, DDR5) 단가 급등세",
          description: "전체 영업이익의 큰 축을 차지하는 메모리 반도체 고정거래가 상승세는 실적 턴어라운드의 핵심 지표입니다."
        },
        {
          name: "미-중 지정학적 갈등",
          impact: "negative",
          statusText: "중국 내 생산기지 규제 및 대중 수출 제약 리스크",
          description: "미국의 반도체 장비 대중국 수출 규제 및 중국 내 생산 라인 업그레이드 제한 조치는 장기적인 리스크 요인입니다."
        }
      ],
      outlook: {
        shortTerm: "향후 6개월간은 HBM3E 공급선 다변화 및 D램 판가 상승세 지속으로 분기별 실적 우상향 흐름이 뚜렷할 것입니다. 다만 미국 대선 결과에 따른 미중 무역 갈등 격화 및 환율 변동성 확대가 단기 주가 변동성을 높일 수 있습니다.",
        midLongTerm: "1년 이상의 중장기 관점에서는 파운드리 2나노 양산 진입 및 첨단 패키징 수주 결과가 밸류에이션 멀티플 상향의 핵심 열쇠입니다. AI 반도체 생태계의 허브 역할을 확고히 하며 연간 영업이익 50조 원대 복귀가 유력합니다.",
        targetPrice: "92,000원 ~ 105,000원"
      }
    }
  },
  {
    id: "000660",
    name: "SK하이닉스",
    englishName: "SK Hynix",
    code: "000660",
    market: "KOSPI",
    sector: "반도체 및 전자장비",
    price: 1941000,
    change: 21000,
    changeRate: 1.09,
    prevClose: 1920000,
    open: 1930000,
    high: 1952000,
    low: 1912000,
    volume: 3840291,
    marketCap: "137.0조원",
    per: 22.1,
    pbr: 2.10,
    roe: 12.1,
    momentums: [
      {
        title: "엔비디아 내 HBM 독점적 지위 유지",
        description: "HBM3 및 HBM3E 시장에서 압도적인 수율과 납품 실적을 앞세워 독과점적 초과수익을 지속적으로 확보 중.",
        badge: "초강세"
      },
      {
        title: "낸드(NAND) 솔리다임 턴어라운드",
        description: "적자 누적의 원인이었던 자회사 솔리다임의 기업용 SSD(eSSD) 판매 호조로 낸드 부문 흑자 규모 대폭 확대.",
        badge: "호재"
      },
      {
        title: "TSMC와의 차세대 HBM4 동맹",
        description: "글로벌 1위 파운드리인 TSMC와 파트너십을 통해 6세대 HBM4부터 맞춤형(Customized) HBM 리더십을 견고화함.",
        badge: "긍정"
      }
    ],
    financials: [
      { year: "2023", revenue: 327657, operatingIncome: -77303, netIncome: -91375, operatingMargin: -23.59, netMargin: -27.89, isConsensus: false },
      { year: "2024", revenue: 562000, operatingIncome: 154000, netIncome: 121000, operatingMargin: 27.40, netMargin: 21.53, isConsensus: false },
      { year: "2025", revenue: 685000, operatingIncome: 212000, netIncome: 169000, operatingMargin: 30.95, netMargin: 24.67, isConsensus: false },
      { year: "2026(E)", revenue: 768000, operatingIncome: 248000, netIncome: 198000, operatingMargin: 32.29, netMargin: 25.78, isConsensus: true },
      { year: "2027(E)", revenue: 820000, operatingIncome: 272000, netIncome: 218000, operatingMargin: 33.17, netMargin: 26.59, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.8,
        description: "글로벌 AI D램 시장의 선도적인 리더로 자리매김했습니다. AI 서버용 고속 메모리에 특화된 MR-MUF 패키징 기술을 독점적으로 고도화하여 타사 대비 높은 마진율을 시현하고 있습니다. 청주 M15X 신규 팹 및 용인 클러스터 투자를 통해 공급 역량을 대폭 확대하고 있습니다.",
        highlights: [
          "독자적 MR-MUF 기술로 고단 적층 HBM 수율 경쟁 우위",
          "고부가가치 eSSD(기업용 SSD) 시장 폭발적 성장 수혜",
          "글로벌 AI 가속기 설계 파트너십 구축 완료"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "neutral",
          statusText: "고금리 장기화 시 설비투자 금융비용 리스크",
          description: "최근 인프라 투자를 늘리고 있어 고금리가 유지될 경우 조달 비용 부담이 있으나, 강력한 영업 현금흐름으로 상쇄 중입니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "고환율 상태 지속 시 환차익 극대화",
          description: "수출 비중이 90% 이상인 구조로, 환율 상승세는 영업이익률 개선에 지대한 공헌을 합니다."
        },
        {
          name: "DRAM/NAND 메모리 가격",
          impact: "positive",
          statusText: "HBM 가격 프리미엄 지속 반영",
          description: "AI 메모리 제품군은 일반 범용 제품 대비 3~5배 비싸며 장기 공급 계약 구조로 안정적인 판가를 보장받고 있습니다."
        },
        {
          name: "미-중 지정학적 갈등",
          impact: "negative",
          statusText: "우시 D램 공장 장기 업그레이드 제한 리스크",
          description: "중국 우시 공장의 나노 공정 업그레이드를 위한 극자외선(EUV) 장비 반입 불확실성이 잠재적 리스크로 작용합니다."
        }
      ],
      outlook: {
        shortTerm: "엔비디아 신형 블랙웰(Blackwell) 칩 양산 개시와 맞물려 HBM3E 8단/12단 공급이 사상 최대를 기록하며 주가 역시 밸류에이션 상단에서 견조한 지지를 받을 전망입니다.",
        midLongTerm: "TSMC와의 HBM4 파운드리 연합이 본격 시너지를 낼 2026~2027년에는 메모리와 파운드리의 경계가 흐려지며 독점적 지위를 유지할 가능성이 높습니다. 주기적 업황 사이클 변동성에 대비한 체질 개선 여부가 핵심입니다.",
        targetPrice: "230,000원 ~ 260,000원"
      }
    }
  },
  {
    id: "005380",
    name: "현대차",
    englishName: "Hyundai Motor",
    code: "005380",
    market: "KOSPI",
    sector: "자동차 제조",
    price: 666000,
    change: 8000,
    changeRate: 1.22,
    prevClose: 658000,
    open: 660000,
    high: 670000,
    low: 655000,
    volume: 720512,
    marketCap: "51.8조원",
    per: 4.8,
    pbr: 0.58,
    roe: 14.2,
    momentums: [
      {
        title: "하이브리드(HEV) 차량의 폭발적 수요",
        description: "전기차 캐즘(Chasm) 시기에 하이브리드 엔진 라인업을 빠르게 강화하며 고수익성 믹스 개선 효과를 톡톡히 누리는 중.",
        badge: "초호재"
      },
      {
        title: "미국 메타플랜트(HMGMA) 가동 시작",
        description: "미국 조지아주 전기차 전용 공장의 가동으로 IRA(인플레이션감축법) 보조금 혜택 및 현지 생산 효율 극대화 전망.",
        badge: "호재"
      },
      {
        title: "인도 현지법인 IPO를 통한 재원 확보",
        description: "인도 증시 역사상 최대 규모의 IPO를 성사시키며 수조 원대 신규 자금을 조달해 신사업 투자 재원 대거 확보.",
        badge: "긍정"
      }
    ],
    financials: [
      { year: "2023", revenue: 1626636, operatingIncome: 151269, netIncome: 122723, operatingMargin: 9.30, netMargin: 7.54, isConsensus: false },
      { year: "2024", revenue: 1723000, operatingIncome: 158000, netIncome: 128000, operatingMargin: 9.17, netMargin: 7.43, isConsensus: false },
      { year: "2025", revenue: 1810000, operatingIncome: 162000, netIncome: 132000, operatingMargin: 8.95, netMargin: 7.29, isConsensus: false },
      { year: "2026(E)", revenue: 1920000, operatingIncome: 171000, netIncome: 140000, operatingMargin: 8.91, netMargin: 7.29, isConsensus: true },
      { year: "2027(E)", revenue: 2010000, operatingIncome: 182000, netIncome: 149000, operatingMargin: 9.05, netMargin: 7.41, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.1,
        description: "전통 완성차 제조사에서 스마트 모빌리티 솔루션 제공업체로 진화하고 있습니다. 고마진 제네시스(Genesis) 브랜드와 SUV 라인업 비중이 지속 상승하고 있으며, 보스턴 다이내믹스 기반의 로보틱스 비즈니스 및 자율주행(Motional), 수소 생태계 구축 등 미래형 신사업을 적극적으로 육성 중입니다.",
        highlights: [
          "제네시스 및 대형 SUV 글로벌 믹스 60% 상회",
          "SDV(소프트웨어 중심 자동차) 플랫폼 변환 본격화",
          "수소 모빌리티 및 에너지 체인 'HTWO' 구축"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "negative",
          statusText: "고금리 장기화 시 오토론 금리 상승으로 수요 위축",
          description: "글로벌 차량 구매의 대부분이 할부금융을 통하므로 고금리 장기화는 신차 수요 둔화의 주 요인입니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "고환율 기조 지속으로 원화 기준 매출 증폭",
          description: "수출 비중이 매우 높아 평균 환율 상승은 영업이익 증대와 더불어 인센티브 방어 체력을 제공합니다."
        },
        {
          name: "원자재 가격 (철강, 리튬 등)",
          impact: "neutral",
          statusText: "철강재/원자재가 하향 안정화로 비용 절감",
          description: "주요 원자재 가격이 하향 안정화 국면에 접어들면서 차량 제조 마진이 소폭 개선되고 있습니다."
        },
        {
          name: "미국 IRA / 관세 정책",
          impact: "negative",
          statusText: "미국 내 수입 관세 인상 우려 및 규제 노출",
          description: "미국 대선 결과에 따른 보조금 축소 위협이나 수입 자동차 고율 관세 부과 리스크는 주가의 최대 하방 압력입니다."
        }
      ],
      outlook: {
        shortTerm: "하이브리드 카의 지속적인 호조세와 미국 전기차 공장 가동 효과로 안정적인 분기 3조~4조원대 영업이익을 낼 것이나, 주주환원 밸류업 프로그램에 대한 시장의 높은 눈높이를 맞추는 것이 단기 주가의 관건입니다.",
        midLongTerm: "자율주행 소프트웨어 경쟁력 확보 및 로보틱스 비즈니스의 가시적 매출 기여가 확인되는 시점에 진정한 멀티플 확장이 나타날 것입니다. 저평가(PBR 0.58) 영역에서 점진적인 재평가가 예상됩니다.",
        targetPrice: "300,000원 ~ 330,000원"
      }
    }
  },
  {
    id: "035420",
    name: "NAVER",
    englishName: "NAVER",
    code: "035420",
    market: "KOSPI",
    sector: "인터넷 플랫폼 및 서비스",
    price: 203000,
    change: 3500,
    changeRate: 1.75,
    prevClose: 199500,
    open: 200000,
    high: 207000,
    low: 199300,
    volume: 531092,
    marketCap: "27.8조원",
    per: 18.2,
    pbr: 1.12,
    roe: 6.2,
    momentums: [
      {
        title: "생성형 AI 하이퍼클로바X B2B 가동",
        description: "클라우드, 공공기관 및 대기업 중심의 한국어 특화 초거대 AI 도입 프로젝트 계약 건수가 고속 성장 중.",
        badge: "긍정"
      },
      {
        title: "웹툰 엔터테인먼트 나스닥 상장 효과",
        description: "네이버웹툰의 미국 나스닥 상장 성공으로 글로벌 콘텐츠 IP 자산 가치가 극대화되고 추가적인 글로벌 M&A 재원 확보.",
        badge: "호재"
      },
      {
        title: "치지직(CHZZK) 스트리밍 연착륙",
        description: "국내 게임 스트리밍 시장에서 트위치 철수 수혜를 받으며 이용자 락인(Lock-in) 및 타겟 광고 매출 기반 확충.",
        badge: "안정"
      }
    ],
    financials: [
      { year: "2023", revenue: 96706, operatingIncome: 14888, netIncome: 10423, operatingMargin: 15.39, netMargin: 10.78, isConsensus: false },
      { year: "2024", revenue: 105800, operatingIncome: 17200, netIncome: 12500, operatingMargin: 16.26, netMargin: 11.82, isConsensus: false },
      { year: "2025", revenue: 114500, operatingIncome: 18900, netIncome: 13900, operatingMargin: 16.51, netMargin: 12.14, isConsensus: false },
      { year: "2026(E)", revenue: 124000, operatingIncome: 20800, netIncome: 15400, operatingMargin: 16.77, netMargin: 12.42, isConsensus: true },
      { year: "2027(E)", revenue: 133500, operatingIncome: 22700, netIncome: 17000, operatingMargin: 17.00, netMargin: 12.73, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 3.8,
        description: "검색과 커머스의 견고한 지배력을 기초로 삼고 있습니다. 최근에는 알리/테무 등 중국계 이커머스의 한국 진출에 따른 우려가 있었으나 고부가가치 AI 기반 타겟팅 솔루션과 멤버십 고도화로 거래액 성장을 방어 중입니다. 클라우드 기반 인공지능(AI) 비즈니스 모델 발굴이 중장기 모멘텀의 핵심입니다.",
        highlights: [
          "네이버 플러스 멤버십 혜택 확대로 이커머스 방어",
          "HyperCLOVA X 기반 지능형 검색 '큐:(CUE:)' 서비스 범위 확대",
          "라인야후(LY) 지분 리스크 일단락 국면"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "positive",
          statusText: "기준 금리 하락 시 밸류에이션 매력 증가",
          description: "성장주 성격이 짙은 플랫폼 기업 특성상 시중 금리 하락은 주가 할인율을 낮춰 강력한 반등 트리거가 됩니다."
        },
        {
          name: "원/달러 환율",
          impact: "neutral",
          statusText: "해외 마케팅 비용 증가 vs 글로벌 웹툰 매출 환산",
          description: "수출 중심 제조업과 달리 내수 플랫폼 성향이 강해 환율의 영향은 중립적입니다. 다만 웹툰 등 해외 법인 매출 환산 효과가 일부 존재합니다."
        },
        {
          name: "국내 민간 소비 지수",
          impact: "negative",
          statusText: "내수 침체 및 고물가 시 광고/쇼핑 매출 위축",
          description: "매출 비중이 가장 큰 검색 광고 및 커머스 쇼핑 수수료는 국내 내수 경기 상황에 극도로 민감합니다."
        },
        {
          name: "중국 커머스 경쟁사 공세",
          impact: "negative",
          statusText: "C-커머스 플랫폼의 공격적 국내 시장 잠식",
          description: "저가 직구 물품을 대거 쏟아내는 알리익스프레스, 테무 등과의 최저가 경쟁 및 광고 단가 경쟁 압력이 지속되고 있습니다."
        }
      ],
      outlook: {
        shortTerm: "단기적으로는 광고 집행 회복 속도가 실적을 결정할 것입니다. 저평가 인식이 확산된 구간(PER 18배 내외)이나, 성장 속도의 극적인 반등을 입증해야 의미 있는 주가 회복이 예상됩니다.",
        midLongTerm: "국내 시장의 한계를 뛰어넘어 북미/일본 등 웹툰 및 스노우, 그리고 사우디아라비아 등 중동 스마트시티 빌딩용 클라우드 기술 수출 성과가 구체적인 숫자로 입증되는 시점까지 완만한 회복세를 보일 전망입니다.",
        targetPrice: "210,000원 ~ 240,000원"
      }
    }
  },
  {
    id: "373220",
    name: "LG에너지솔루션",
    englishName: "LG Energy Solution",
    code: "373220",
    market: "KOSPI",
    sector: "전기제품 및 전자부품",
    price: 398500,
    change: 2500,
    changeRate: 0.63,
    prevClose: 396000,
    open: 397000,
    high: 401000,
    low: 395000,
    volume: 189204,
    marketCap: "84.7조원",
    per: 45.8,
    pbr: 3.50,
    roe: 4.8,
    momentums: [
      {
        title: "미국 AMPC 보조금 수익 지속 유입",
        description: "미국 합작 공장들의 가동 확대로 미국 IRA 보조금(AMPC) 혜택이 세전 영업이익의 큰 비중을 메우고 있음.",
        badge: "안정"
      },
      {
        title: "LFP 배터리 및 보급형 세그먼트 진입",
        description: "프리미엄 삼원계(NCM) 중심에서 탈피해 글로벌 완성차용 LFP 배터리 수주 계약을 확보하며 포트폴리오 다변화 성공.",
        badge: "긍정"
      },
      {
        title: "테슬라 4680 차세대 배터리 양산",
        description: "하반기 오창 팹에서 원통형 4680 배터리의 세계 최초 양산 돌입 및 주요 고객사 본격 인도 예정.",
        badge: "호재"
      }
    ],
    financials: [
      { year: "2023", revenue: 337455, operatingIncome: 21632, netIncome: 15378, operatingMargin: 6.41, netMargin: 4.56, isConsensus: false },
      { year: "2024", revenue: 268000, operatingIncome: 11000, netIncome: 6500, operatingMargin: 4.10, netMargin: 2.43, isConsensus: false },
      { year: "2025", revenue: 312000, operatingIncome: 18500, netIncome: 11500, operatingMargin: 5.93, netMargin: 3.69, isConsensus: false },
      { year: "2026(E)", revenue: 395000, operatingIncome: 31000, netIncome: 21000, operatingMargin: 7.85, netMargin: 5.32, isConsensus: true },
      { year: "2027(E)", revenue: 472000, operatingIncome: 42500, netIncome: 29800, operatingMargin: 9.00, netMargin: 6.31, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.0,
        description: "글로벌 전기차 일시적 캐즘 영향으로 가동률 조정 국면을 지났으나 중장기 성장 방향성은 매우 뚜렷합니다. 얼티엄셀즈(GM 합작법인)를 포함해 스텔란티스, 혼다, 현대차 등과의 북미 합작 생산공장이 속속 풀가동 궤도에 진입하고 있으며 차세대 전고체 배터리 상용화 R&D 리더십 역시 유지 중입니다.",
        highlights: [
          "북미 전기차 탑재 배터리 점유율 선두권 유지",
          "오창 에너지플랜트 내 차세대 원통형 라인 선제 투자",
          "ESS(에너지저장장치) 고효율 LFP 배터리 판매 확장"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "negative",
          statusText: "고금리로 인한 신규 설비 차입 비용 가중",
          description: "합작법인(JV) 투자 등 대규모 자본 지출이 필수적이어서 고금리는 금융 비용 증가 및 전기차 고가 할부 구매 축소를 야기합니다."
        },
        {
          name: "리튬/니켈 등 메탈 가격",
          impact: "negative",
          statusText: "양극재 판가 연동에 따른 배터리 단가 하락 리스크",
          description: "메탈 가격 폭락 시 배터리 셀 판매 가격도 하락하는 판가 연동 계약 구조로 인해, 재고자산 평가손실 및 스프레드 축소 영향을 받습니다."
        },
        {
          name: "미국 IRA 폐지 및 정책 가변성",
          impact: "negative",
          statusText: "공화당 집권 시 보조금 축소 리스크",
          description: "실적의 절대적인 비중을 차지하는 AMPC 수혜가 미국 대선 정책 기조에 따라 감축될 위협은 가장 치명적인 불확실성입니다."
        },
        {
          name: "유럽 탄소 규제 완화 움직임",
          impact: "negative",
          statusText: "유럽 완성차 제조사들의 전기차 전환 속도 조절",
          description: "유럽 내 유로7 배기가스 규제 완화 및 전기차 강제 시점 이연 움직임은 단기적인 유럽형 배터리 판매에 부정적입니다."
        }
      ],
      outlook: {
        shortTerm: "2024~2025년의 낮은 전기차 업황 기저 효과로 2026년 상반기부터 강한 실적 턴어라운드를 보여줄 가능성이 큽니다. 다만 전기차 수요 반등 속도와 미국 대선 관세 리스크 해소 여부가 복합적으로 작용할 것입니다.",
        midLongTerm: "2027년까지 북미 중심의 JV 라인이 모두 가동에 들어가면 연간 40조원 이상의 고정 매출 체력을 다질 수 있으며, 차세대 원통형 4680 배터리가 게임 체인저 역할을 할 수 있습니다.",
        targetPrice: "420,000원 ~ 480,000원"
      }
    }
  },
  {
    id: "207940",
    name: "삼성바이오로직스",
    englishName: "Samsung Biologics",
    code: "207940",
    market: "KOSPI",
    sector: "제약 및 바이오",
    price: 1417000,
    change: 22000,
    changeRate: 1.58,
    prevClose: 1395000,
    open: 1400000,
    high: 1425000,
    low: 1395000,
    volume: 52932,
    marketCap: "57.8조원",
    per: 58.2,
    pbr: 5.60,
    roe: 10.5,
    momentums: [
      {
        title: "제5공장 가동 시기 단축 진행",
        description: "압도적 건설 공법으로 18만 리터 규모의 5공장을 예정보다 수개월 앞당긴 하반기 내 조기 가동하여 선수주 계약 소화 예정.",
        badge: "초호재"
      },
      {
        title: "미국 생물보안법(Biosecure Act) 수혜",
        description: "미국 하원을 통과한 생물보안법으로 우시앱텍 등 중국 CDMO 사에 대한 규제가 개시되며 글로벌 대형 계약 반사이익 집중 중.",
        badge: "호재"
      },
      {
        title: "ADC(항체약물접합체) 시장 전격 진입",
        description: "차세대 항암제로 주목받는 ADC 전용 생산 라인 신축을 연내 완공하여 바이오 고부가가치 다변화 추진.",
        badge: "긍정"
      }
    ],
    financials: [
      { year: "2023", revenue: 36946, operatingIncome: 11137, netIncome: 8577, operatingMargin: 30.14, netMargin: 23.21, isConsensus: false },
      { year: "2024", revenue: 44200, operatingIncome: 13500, netIncome: 10200, operatingMargin: 30.54, netMargin: 23.08, isConsensus: false },
      { year: "2025", revenue: 52100, operatingIncome: 16100, netIncome: 12200, operatingMargin: 30.90, netMargin: 23.42, isConsensus: false },
      { year: "2026(E)", revenue: 61800, operatingIncome: 19800, netIncome: 15100, operatingMargin: 32.04, netMargin: 24.43, isConsensus: true },
      { year: "2027(E)", revenue: 72000, operatingIncome: 23500, netIncome: 18100, operatingMargin: 32.64, netMargin: 25.14, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.6,
        description: "글로벌 항체의약품 CMO(위탁생산) 시장에서 생산량 1위를 압도적으로 수성하고 있습니다. 5공장 가동을 통해 글로벌 전체 78.4만 리터의 캐파를 점유하여 대형 제약사들과의 중장기 고정 계약을 이어가고 있으며, 고마진 항암 타겟 바이오시밀러 개발 자회사인 에피스와의 시너지가 극대화되고 있습니다.",
        highlights: [
          "글로벌 빅파마 Top 20개 사 중 17개 사를 고객사로 확보",
          "5공장에 이어 송도 2바이오캠퍼스(6, 7, 8공장) 추가 부지 확보 완료",
          "글로벌 다국적 제약사 위탁생산 단일 수주 규모 1조 원 돌파"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "positive",
          statusText: "금리 인하 국면 시 바이오 투자 유입 활성화",
          description: "금리 인하는 중소 바이오텍들의 파이프라인 개발 투자 확대로 이어져, 결과적으로 대형 CDMO의 임상/상업 생산 수주가 급증하게 됩니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "계약금 달러 결제 방식으로 원화 실적 확대",
          description: "수주 계약의 대부분이 달러화 기준 장기 계약이므로 환율 상승세는 마진율 상승에 극도로 유리한 환경을 조성합니다."
        },
        {
          name: "글로벌 제약 규제 및 허가",
          impact: "neutral",
          statusText: "FDA 실사 합격 및 우수 의약품 생산 기준 통과",
          description: "미국 FDA 및 유럽 EMA의 제조 품질 적합성 실사 승인율 99% 이상을 유지 중이며, 규제 강도가 높을수록 진입장벽이 강화되는 이점이 있습니다."
        },
        {
          name: "글로벌 지정학적 리스크 (생물보안법)",
          impact: "positive",
          statusText: "중국 바이오 공급망 배제에 따른 수혜",
          description: "미국 정부의 자국 내 중국 바이오 기업 규제 강화는 아시아의 가장 신뢰할 만한 대형 대체재인 동사에게 강력한 반사이익이 됩니다."
        }
      ],
      outlook: {
        shortTerm: "4공장 풀가동 효과 및 5공장 선수주 활동 본격화로 영업이익률 30%대 이상을 완벽히 안착시키며, 경기 방어주이자 고성장주로서의 매력이 부각되어 탄탄한 우상향이 전망됩니다.",
        midLongTerm: "송도 2캠퍼스가 완공되는 2027년 전후로는 항체 바이오 CDMO를 넘어 메신저리보핵산(mRNA), 유전자치료제 및 ADC 등 차세대 모달리티 생산 허브로 완전히 거듭나며 독점적 밸류에이션을 받게 될 것입니다.",
        targetPrice: "980,000원 ~ 1,150,000원"
      }
    }
  },
  {
    id: "068270",
    name: "셀트리온",
    englishName: "Celltrion",
    code: "068270",
    market: "KOSPI",
    sector: "제약 및 바이오",
    price: 180000,
    change: 1500,
    changeRate: 0.84,
    prevClose: 178500,
    open: 179000,
    high: 182000,
    low: 178000,
    volume: 681029,
    marketCap: "40.3조원",
    per: 40.5,
    pbr: 2.85,
    roe: 7.1,
    momentums: [
      {
        title: "짐펜트라(Zymfentra) 미국 신약 승인 및 처방 가속",
        description: "피하주사 제형 자가면역질환 신약인 짐펜트라가 미국 주요 대형 처방약관리업체(PBM) 등재에 성공하며 사상 첫 대규모 매출 본격화.",
        badge: "초강세"
      },
      {
        title: "셀트리온헬스케어 합병 시너지 가시화",
        description: "양사 합병을 통해 그간 리스크 요인이었던 재고자산 단가 회계 이슈를 말끔히 씻어내고 원가율을 극적으로 개선 중.",
        badge: "호재"
      },
      {
        title: "후속 바이오시밀러 글로벌 허가 릴레이",
        description: "스텔라라, 아일리아, 프롤리아 등 특허 만료 시기에 맞춰 대형 블록버스터급 제품들의 미국/유럽 승인 순항 중.",
        badge: "긍정"
      }
    ],
    financials: [
      { year: "2023", revenue: 21764, operatingIncome: 6514, netIncome: 5397, operatingMargin: 29.93, netMargin: 24.80, isConsensus: false },
      { year: "2024", revenue: 34500, operatingIncome: 7400, netIncome: 6100, operatingMargin: 21.45, netMargin: 17.68, isConsensus: false },
      { year: "2025", revenue: 42100, operatingIncome: 11200, netIncome: 9200, operatingMargin: 26.60, netMargin: 21.85, isConsensus: false },
      { year: "2026(E)", revenue: 51200, operatingIncome: 15400, netIncome: 12500, operatingMargin: 30.08, netMargin: 24.41, isConsensus: true },
      { year: "2027(E)", revenue: 60500, operatingIncome: 19500, netIncome: 15800, operatingMargin: 32.23, netMargin: 26.12, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.3,
        description: "글로벌 바이오시밀러 선구자로서 퍼스트무버(First Mover) 효과를 누리고 있습니다. 자가면역질환 및 항암 치료제 중심에서 신약(짐펜트라) 비중을 40% 이상으로 확대하여 단순 카피약 제조사에서 바이오텍 신약 개발사로 정체성을 진화하고 있습니다. 합병 후 일시적으로 높아졌던 원가율이 빠르게 하락 안정화되고 있습니다.",
        highlights: [
          "자가면역 치료제 램시마SC의 독보적인 글로벌 침투율",
          "합병 비용 전액 상각 완료에 따른 이익 체력 정상화",
          "특허 만료 예정 블록버스터 신규 파이프라인 9개 대기 중"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "positive",
          statusText: "시중 금리 안정화 시 헬스케어 동반 반등",
          description: "금리 하락 시 위험자산인 신약 개발 파이프라인 가치가 재평가되며 헬스케어 업종 수급이 대폭 개선되는 긍정적 영향이 있습니다."
        },
        {
          name: "미국 의료 보험 및 PBM 등재",
          impact: "positive",
          statusText: "짐펜트라의 미국 대형 PBM 사 급여 등재 순항",
          description: "미국 의약품 유통의 핵심인 PBM(처방약관리업체) 등재 성공은 즉각적인 처방률 상승과 급격한 점유율 확보로 연계됩니다."
        },
        {
          name: "원/달러 환율",
          impact: "neutral",
          statusText: "수출 비중 높으나 해외 마케팅 비용 상쇄",
          description: "달러화 및 유로화 매출 비중이 높지만 현지 직접판매 법인의 글로벌 마케팅비 지출도 상당해 환율 영향은 다소 중립적입니다."
        },
        {
          name: "글로벌 바이오시밀러 가격 경쟁",
          impact: "negative",
          statusText: "경쟁사 난입으로 인한 오리지널 시밀러 약가 인하 압박",
          description: "미국 및 유럽 내 시밀러 출시 경쟁이 심해질수록 제조사들의 오리지널 의약품 단가 인하 방어 및 단가 훼손 우려가 있습니다."
        }
      ],
      outlook: {
        shortTerm: "합병 시너지가 영업이익률 반등으로 숫자로 입증되는 기간입니다. 미국 내 짐펜트라 매출 성장이 가시적으로 매달 월별 처방 데이터(IQVIA 등)에 찍히기 시작하면 전고점 돌파가 가능할 것입니다.",
        midLongTerm: "2026~2027년은 다수의 신규 허가 바이오시밀러가 매출에 본격 합산되며 원가율이 합병 전 수준인 30%대 중반 이하로 안정화되어, 연간 1.5조원 이상의 영업이익 체력을 갖추며 글로벌 메이저 제약사 대열에 진입할 것입니다.",
        targetPrice: "230,000원 ~ 260,000원"
      }
    }
  },
  {
    id: "005490",
    name: "POSCO홀딩스",
    englishName: "POSCO Holdings",
    code: "005490",
    market: "KOSPI",
    sector: "철강 및 금속",
    price: 365000,
    change: 2000,
    changeRate: 0.55,
    prevClose: 363000,
    open: 364000,
    high: 368000,
    low: 361000,
    volume: 298401,
    marketCap: "32.3조원",
    per: 15.1,
    pbr: 0.62,
    roe: 4.2,
    momentums: [
      {
        title: "아르헨티나 리튬 1단계 준공 및 가동",
        description: "옴브레 무에르토 염호 기반의 리튬 상용화 공장이 상반기 중 본격 가동하며 리튬 소재 매출이 본격 반영될 예정.",
        badge: "호재"
      },
      {
        title: "고부가 친환경 철강(Hyper NO) 수요 견조",
        description: "전기차 모터용 무방향성 전기강판(Hyper NO) 등 프리미엄 철강 제품군의 공급 확대로 철강 부문 수익성 방어 성공.",
        badge: "긍정"
      },
      {
        title: "글로벌 철강 가격 하방 지지력 확보",
        description: "중국의 저가 철강 불법 유통 규제 및 감산 기조 본격화로 철강 스프레드가 바닥을 다지고 반등 신호 노출.",
        badge: "안정"
      }
    ],
    financials: [
      { year: "2023", revenue: 771272, operatingIncome: 35314, netIncome: 18465, operatingMargin: 4.58, netMargin: 2.39, isConsensus: false },
      { year: "2024", revenue: 742000, operatingIncome: 29800, netIncome: 14500, operatingMargin: 4.02, netMargin: 1.95, isConsensus: false },
      { year: "2025", revenue: 795000, operatingIncome: 36200, netIncome: 21500, operatingMargin: 4.55, netMargin: 2.70, isConsensus: false },
      { year: "2026(E)", revenue: 865000, operatingIncome: 45800, netIncome: 29800, operatingMargin: 5.29, netMargin: 3.45, isConsensus: true },
      { year: "2027(E)", revenue: 924000, operatingIncome: 53200, netIncome: 36200, operatingMargin: 5.76, netMargin: 3.92, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.0,
        description: "철강 명가에서 2차전지 친환경 핵심 원소재 그룹으로의 대전환을 이루고 있습니다. 아르헨티나 리튬 염호 및 호주 광산 등을 소유하여 배터리용 수산화리튬 국산화 밸류체인을 구축했습니다. 니켈 제련, 양/음극재 계열사(포스코퓨처엠)의 내재화 시너지는 글로벌 최고 경쟁력을 지닙니다.",
        highlights: [
          "아르헨티나 염수 리튬 연산 2.5만 톤 체제 가동 본격화",
          "친환경 저탄소 수소환원제철 'HyREX' 기술 실증 가동 착수",
          "니켈, 리튬, 리사이클링을 포함한 원소재 풀 벨류체인 구축"
        ]
      },
      globalMacro: [
        {
          name: "중국 인프라 경기 및 부동산 부양책",
          impact: "positive",
          statusText: "중국 경기 부양 가시화 시 철강 수요 회복",
          description: "글로벌 철강 수요의 절반을 차지하는 중국 시장의 부동산/인프라 부양책이 시행되면 철강 가격이 크게 상승합니다."
        },
        {
          name: "탄산리튬 및 핵심 광물 가격",
          impact: "negative",
          statusText: "탄산리튬 가격 장기 횡보로 배터리 사업 가치 이연",
          description: "신성장 동력인 리튬 광산 가치는 리튬 고정거래가에 매우 민감하므로 광물 가격 폭락 시 미래 예상 이익이 크게 훼손됩니다."
        },
        {
          name: "환율 및 원자재(유연탄, 철광석) 수입가",
          impact: "neutral",
          statusText: "고환율 시 원자재 수입단가 가중 vs 수출 환가 상쇄",
          description: "철광석 및 유연탄 수입 대금이 달러로 지급되므로 원화 약세(환율 상승)는 제조원가 상승 압력으로 작용해 상방을 제약합니다."
        },
        {
          name: "탄소 배출세 규제 (CBAM 등)",
          impact: "negative",
          statusText: "유럽 CBAM 제도 도입에 따른 추가 관세 부담 리스크",
          description: "유럽 연합의 탄소국경조정제도(CBAM)가 시행됨에 따라 고탄소 배출 산업인 철강의 대유럽 관세 지출 증가가 예정되어 있어 극복이 필요한 과제입니다."
        }
      ],
      outlook: {
        shortTerm: "전통 철강 업황의 느린 회복과 리튬 가격의 바닥 확인 과정이 맞물려 다소 횡보 국면을 보일 수 있습니다. 하지만 분기별 철강 부문 이익 안정성이 확인되며 하방은 단단할 것입니다.",
        midLongTerm: "리튬 염호 가동에서 수산화리튬 정제가 완제품으로 출하되어 포스코퓨처엠의 배터리 양극재 생산에 본격 결합하는 2026~2027년 시점부터 소재 부문 이익이 조 단위로 불어날 것으로 보이며 강력한 이익 리레이팅이 예상됩니다.",
        targetPrice: "480,000원 ~ 550,000원"
      }
    }
  },
  {
    id: "035720",
    name: "카카오",
    englishName: "Kakao",
    code: "035720",
    market: "KOSPI",
    sector: "인터넷 플랫폼 및 서비스",
    price: 41850,
    change: -250,
    changeRate: -0.59,
    prevClose: 42100,
    open: 42000,
    high: 42350,
    low: 41750,
    volume: 1205391,
    marketCap: "21.6조원",
    per: 32.4,
    pbr: 1.82,
    roe: 4.5,
    momentums: [
      {
        title: "톡비즈(Talk Biz) 광고 상품 효율 고도화",
        description: "카카오톡 탭 개편 및 개인 맞춤형 비즈니스 메시지 광고 단가 인상으로 핵심 수익원인 톡비즈 매출 성장세 회복 중.",
        badge: "안정"
      },
      {
        title: "카카오헬스케어 '파스타(PASTA)' 글로벌 진출",
        description: "AI 기반 혈당 관리 솔루션 파스타가 해외 시장 제약사들과 파트너십을 체결하며 헬스케어 부문 미래 성장성 노출.",
        badge: "긍정"
      },
      {
        title: "경영진 쇄신 및 지배구조 리스크 완화",
        description: "준법과신뢰위원회 가동 및 대주주 관련 사법 리스크에 적극 대응하며 불확실성에 짓눌려있던 밸류에이션 리턴 조짐.",
        badge: "긍정"
      }
    ],
    financials: [
      { year: "2023", revenue: 75570, operatingIncome: 4610, netIncome: -1250, operatingMargin: 6.10, netMargin: -1.65, isConsensus: false },
      { year: "2024", revenue: 82400, operatingIncome: 5100, netIncome: 3200, operatingMargin: 6.19, netMargin: 3.88, isConsensus: false },
      { year: "2025", revenue: 89800, operatingIncome: 6200, netIncome: 4100, operatingMargin: 6.90, netMargin: 4.57, isConsensus: false },
      { year: "2026(E)", revenue: 98500, operatingIncome: 7400, netIncome: 5200, operatingMargin: 7.51, netMargin: 5.28, isConsensus: true },
      { year: "2027(E)", revenue: 106000, operatingIncome: 8600, netIncome: 6300, operatingMargin: 8.11, netMargin: 5.94, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 3.5,
        description: "전 국민이 사용하는 모바일 메신저 카카오톡의 락인 효과를 뼈대로 삼고 있습니다. 문어발식 확장 지양 기조 하에 부진한 종속기업의 구조조정을 추진하며 핵심 비즈니스인 광고와 커머스에 집중하고 있습니다. 소형언어모델(SLM) 코GPT 2.0 기반의 톡비즈니스 비서 서비스가 미래 커머스 수익률을 결정할 것입니다.",
        highlights: [
          "카카오톡 MAU 4,800만 명 돌파 (압도적 국내 1위)",
          "카카오뱅크, 카카오페이 등 금융 자회사 플랫폼 흑자 성장",
          "AI 서비스 'Kanana' 신규 공개 및 서비스 적용 계획 수립"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "positive",
          statusText: "금리 하락 시 국내 테크주 전반의 수급 개선",
          description: "성장주 할인율 감소와 글로벌 자금의 이머징 성장주 유입 효과로 금리 인하에 적극적인 수혜를 받습니다."
        },
        {
          name: "원/달러 환율",
          impact: "neutral",
          statusText: "내수형 서비스 비중이 높아 환율 민감도 낮음",
          description: "주요 서비스가 국내에 국한되어 환율 상승에 따른 환차익이 크지 않은 중립 지표입니다."
        },
        {
          name: "정부 규제 및 공정위 조사 정책",
          impact: "negative",
          statusText: "플랫폼 갑질 방지법 및 독점 규제 리스크",
          description: "독과점 플랫폼 사업자에 대한 정부 규제 및 수수료 강제 완화 규제는 핵심 광고/커머스 이익 단가를 훼손하는 리스크입니다."
        },
        {
          name: "국내 소상공인 경기 및 내수 활력",
          impact: "negative",
          statusText: "고금리 장기화로 자영업 폐업 및 커머스 거래 감소",
          description: "카카오 선물하기 및 톡비즈 메시지 광고주는 상당수가 국내 자영업자 및 소상공인으로 내수 경기 침체 시 실격 직격탄을 맞습니다."
        }
      ],
      outlook: {
        shortTerm: "사법 리스크 해소가 완전히 끝나지 않은 탓에 주가는 바닥권(PBR 1.8배)에서 제한적인 변동성을 보일 것입니다. 톡비즈의 구조적 성장이 견고함을 매 분기 숫자로 입증해야 서서히 주가가 안정을 취할 것입니다.",
        midLongTerm: "2026~2027년 비핵심 계열사 매각/합병 완료로 경영 효율화가 나타나고, 차세대 카나나(Kanana) AI 메신저가 대화형 AI 커머스로 수익화에 골인하면 펀더멘털의 본격 복귀가 예상됩니다.",
        targetPrice: "58,000원 ~ 65,000원"
      }
    }
  },
  {
    id: "000270",
    name: "기아",
    englishName: "Kia Corporation",
    code: "000270",
    market: "KOSPI",
    sector: "자동차 제조",
    price: 164800,
    change: 2300,
    changeRate: 1.42,
    prevClose: 162500,
    open: 163000,
    high: 165500,
    low: 162000,
    volume: 1802910,
    marketCap: "47.2조원",
    per: 4.1,
    pbr: 0.81,
    roe: 19.8,
    momentums: [
      {
        title: "EV3 대중화 라인업 해외 출시 대기",
        description: "보급형 소형 SUV 전기차인 EV3가 유럽 및 북미 출시를 대기 중이며, 얼어붙은 전기차 시장에 가성비 대안으로 판매 돌풍 예고.",
        badge: "초호재"
      },
      {
        title: "파격적인 주주환원(자사주 매입 및 소각)",
        description: "연간 순이익의 약 25~30% 이상을 배당 및 자사주 매입 후 즉시 소각하는 초강력 주주친화 정책으로 국내 기업 밸류업 대장주 등극.",
        badge: "초강세"
      },
      {
        title: "미국 내 고수익 SUV(텔루라이드, 쏘렌토) 쏠림",
        description: "미국 시장 내 레저용 차량(RV) 판매 비중이 75%를 돌파하며 최상급의 영업이익률(11%대) 달성의 든든한 버팀목 역할.",
        badge: "호재"
      }
    ],
    financials: [
      { year: "2023", revenue: 998084, operatingIncome: 116079, netIncome: 87778, operatingMargin: 11.63, netMargin: 8.79, isConsensus: false },
      { year: "2024", revenue: 1045000, operatingIncome: 121000, netIncome: 92000, operatingMargin: 11.58, netMargin: 8.80, isConsensus: false },
      { year: "2025", revenue: 1098000, operatingIncome: 125000, netIncome: 95500, operatingMargin: 11.38, netMargin: 8.70, isConsensus: false },
      { year: "2026(E)", revenue: 1162000, operatingIncome: 132000, netIncome: 102000, operatingMargin: 11.36, netMargin: 8.78, isConsensus: true },
      { year: "2027(E)", revenue: 1215000, operatingIncome: 139000, netIncome: 108000, operatingMargin: 11.44, netMargin: 8.89, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.4,
        description: "글로벌 완성차 메이커 중 최고의 수익성 지표(ROE 19.8%, 영업이익률 11%대)를 내고 있습니다. 디자인 경쟁력을 기반으로 RV 및 쏘렌토/카니발 페이스리프트가 연일 매진 행진을 이어가고 있으며, 향후 다목적 목적기반차량(PBV) 전용 라인 건설을 통해 상업용 물류 전기 모빌리티 시장을 신성장 동력으로 조기 타겟팅 중입니다.",
        highlights: [
          "영업이익률 글로벌 메이저 완성차 브랜드 최상위 수준",
          "PBV(목적 기반 모빌리티) 전용 팹 오토랜드 화성 건설 가시화",
          "해외 선진국 내 HEV 및 PHEV(플러그인하이브리드) 믹스 급증"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "negative",
          statusText: "고금리 유지가 판매 인센티브 증가 압박으로 연계",
          description: "금리가 인하되지 않고 유지되면 딜러 지원 인센티브를 확대해야 해 대당 마진이 깎이는 리스크가 있습니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "고환율 기조 속 마진 방어 체력 극대화",
          description: "수출 비중이 약 85%에 육박하는 사업 구조를 갖추어, 고환율 조건 하에서 막강한 영업 마진 방어력을 자랑합니다."
        },
        {
          name: "배터리 원가 하락",
          impact: "positive",
          statusText: "배터리 메탈 가격 인하로 전기차 제조원가 축소",
          description: "리튬/니켈 가 하향 안정으로 기아가 도입하려는 중저가 EV(EV3, EV4)의 배터리 조달 단가가 낮아져 마진 확대에 유리합니다."
        },
        {
          name: "글로벌 보호무역 주의 및 관세 규제",
          impact: "negative",
          statusText: "각국의 자국 우선주의 세제 혜택 위협",
          description: "유럽 및 미국의 추가 관세 리스크나 프랑스 등 유럽 각국의 탄소발자국 연동 보조금 축소 움직임은 위협 요인입니다."
        }
      ],
      outlook: {
        shortTerm: "역대급 배당성향(주당 약 5,000~6,000원대 기대)과 지속적인 자사주 소각으로 주주환원 주도권을 쥐며 저평가 상태(PER 4배 대)를 급속히 탈출하는 리레이팅 장세가 하반기에도 유효합니다.",
        midLongTerm: "2026~2027년 전기차 대중화 차종의 유럽 수주가 안착하고 특화된 모빌리티 PBV 라인이 본 궤도에 올라 상업 수주가 개시되면, 내연기관과 친환경 상용차 전 영역에서 안정적 고성장을 확보할 것입니다.",
        targetPrice: "145,000원 ~ 168,000원"
      }
    }
  },
  {
    id: "247540",
    name: "에코프로비엠",
    englishName: "EcoPro BM",
    code: "247540",
    market: "KOSDAQ",
    sector: "화학 (이차전지 소재)",
    price: 216000,
    change: -2500,
    changeRate: -1.14,
    prevClose: 218500,
    open: 217000,
    high: 219500,
    low: 215000,
    volume: 450192,
    marketCap: "16.8조원",
    per: 88.5,
    pbr: 5.80,
    roe: 6.5,
    momentums: [
      {
        title: "북미 EV 합작사향 양극재 장기 공급",
        description: "삼성SDI 및 SK온의 북미 신설 배터리 공장에 대응한 대규모 하이니켈 양극재 공급 계약이 본격 출하 개시됨.",
        badge: "호재"
      },
      {
        title: "보급형 LFP 양극재 기술 확보",
        description: "NCM 프리미엄 양극재 중심에서 LFP 및 망간리치(LMFP) 등 보급형 라인업 다변화를 통한 세그먼트 확장.",
        badge: "긍정"
      },
      {
        title: "전고체 배터리용 황화물계 고체전해질 개발",
        description: "꿈의 배터리라 불리는 전고체 배터리에 탑재될 특화 양극재 및 전해질 시제품 평가 완료로 미래 리더십 유지.",
        badge: "긍정"
      }
    ],
    financials: [
      { year: "2023", revenue: 69009, operatingIncome: 1532, netIncome: 702, operatingMargin: 2.22, netMargin: 1.02, isConsensus: false },
      { year: "2024", revenue: 41200, operatingIncome: -350, netIncome: -420, operatingMargin: -0.85, netMargin: -1.02, isConsensus: false },
      { year: "2025", revenue: 48500, operatingIncome: 820, netIncome: 510, operatingMargin: 1.69, netMargin: 1.05, isConsensus: false },
      { year: "2026(E)", revenue: 61200, operatingIncome: 2100, netIncome: 1480, operatingMargin: 3.43, netMargin: 2.42, isConsensus: true },
      { year: "2027(E)", revenue: 73500, operatingIncome: 3400, netIncome: 2540, operatingMargin: 4.63, netMargin: 3.46, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.2,
        description: "글로벌 이차전지 하이니켈 양극재 출하량 1위를 지키고 있습니다. 연간 양극재 생산 캐파를 2027년까지 28만 톤 규모로 대폭 증설하고 있으며, 메탈 원소재부터 양극재, 리사이클링까지 묶는 에코프로 그룹 '클로즈드 루프 시스템(Closed Loop System)'의 원가 경쟁력이 핵심 무기입니다.",
        highlights: [
          "포항 및 헝가리 글로벌 생산 허브 대규모 라인 신설",
          "니켈 함량 90% 이상인 초하이니켈 단결정 양극재 업계 리더십",
          "고객사 합작법인(JV) 다변화로 중장기 판매 안정성 확보"
        ]
      },
      globalMacro: [
        {
          name: "탄산리튬 및 니켈 가격",
          impact: "negative",
          statusText: "광물가 하향 안정 시 판가 하락 및 스프레드 둔화",
          description: "원소재 가격이 하락하면 양극재 공급 단가도 낮아져 단기 매출액 감소 및 재고 평가 손실 위협이 존재합니다."
        },
        {
          name: "미국 IRA 정책 및 전기차 보조금",
          impact: "negative",
          statusText: "미국 대선 결과에 따른 친환경 정책 기조 가변성",
          description: "북미 중심 배터리 투자를 진행 중이므로 친환경 보조금 감축 조치는 최대의 리스크 요소입니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "달러화 결제 대금 수취 시 원화 영업이익 증폭",
          description: "해외 완성차/배터리 제조사향 수출 계약 비중이 높아 환율 상승에 뚜렷한 수혜를 입습니다."
        },
        {
          name: "유럽 가솔린차 규제 완화",
          impact: "negative",
          statusText: "유럽 연합 내 전기차 강제 도입 일정 이연 우려",
          description: "유럽 각국의 보조금 폐지 및 전기차 도입 목표 시점 완화 움직임은 유럽 수출 비중이 높은 자사 실적의 단기 위협 요인입니다."
        }
      ],
      outlook: {
        shortTerm: "2024~2025년의 광물 가격 하락 충격을 극복하며 분기 이익이 턴어라운드를 시작했습니다. 2026년 신규 북미 전기차 가동 물량 배정이 가시화되며 완만한 우상향 흐름이 나타날 것입니다.",
        midLongTerm: "전기차 산업 캐즘 종식과 에너지 밀도가 강화된 차세대 폼팩터(46파이 등) 배터리향 특화 양극재 공급이 결합하는 2026~2027년에 급격한 실적 상향 리레이팅이 동반될 것입니다.",
        targetPrice: "210,000원 ~ 250,000원"
      }
    }
  },
  {
    id: "196170",
    name: "알테오젠",
    englishName: "Alteogen",
    code: "196170",
    market: "KOSDAQ",
    sector: "제약 및 바이오 (기술수출)",
    price: 359500,
    change: 14000,
    changeRate: 4.05,
    prevClose: 345500,
    open: 346000,
    high: 362000,
    low: 345000,
    volume: 582103,
    marketCap: "14.6조원",
    per: 125.4,
    pbr: 15.20,
    roe: 14.5,
    momentums: [
      {
        title: "머크 키트루다 SC 독점 공급 전환",
        description: "글로벌 1위 매출 의약품인 키트루다의 피하주사(SC) 제형 전환 계약을 독점 라이선스로 승격하며 대규모 수수료 유입 기대.",
        badge: "초강세"
      },
      {
        title: "인간 히알루로니다제 플랫폼 가치 팽창",
        description: "정맥주사(IV)를 피하주사(SC)로 바꾸는 원천 기술(ALT-B4)의 추가 글로벌 빅파마 파이프라인 계약 확장 진행 중.",
        badge: "호재"
      },
      {
        title: "아일리아 바이오시밀러(ALT-L9) 글로벌 임상 완료",
        description: "안과 질환 메가블록버스터 아일리아의 SC 제형 바이오시밀러의 성공적 글로벌 임상 3상 완료 및 허가 신청 돌입.",
        badge: "긍정"
      }
    ],
    financials: [
      { year: "2023", revenue: 965, operatingIncome: -95, netIncome: -120, operatingMargin: -9.84, netMargin: -12.44, isConsensus: false },
      { year: "2024", revenue: 1250, operatingIncome: 210, netIncome: 180, operatingMargin: 16.80, netMargin: 14.40, isConsensus: false },
      { year: "2025", revenue: 2650, operatingIncome: 1150, netIncome: 980, operatingMargin: 43.40, netMargin: 36.98, isConsensus: false },
      { year: "2026(E)", revenue: 4800, operatingIncome: 2850, netIncome: 2420, operatingMargin: 59.38, netMargin: 50.42, isConsensus: true },
      { year: "2027(E)", revenue: 6800, operatingIncome: 4500, netIncome: 3820, operatingMargin: 66.18, netMargin: 56.18, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.9,
        description: "전 세계 단 2개 사만 보유한 인간 히알루로니다제 피하주사 제형 변환 플랫폼 원천 특허를 보유하고 있습니다. 대형 면역관문억제제 및 자가면역치료제가 SC 제형으로 전환함에 따라 특허 연장이 시급한 빅파마들의 필수 파트너로 군림하고 있으며, 임상 마일스톤뿐만 아니라 상업 출하 시 판매액의 일정 지분(러닝 로열티)을 무기한 수취하여 바이오 기업 중 최고 수익률을 보장합니다.",
        highlights: [
          "머크(MSD) 독점 SC 전환 누적 마일스톤 5,000억 원 이상 순차 반영",
          "특허 장벽을 통한 SC 제형 변환 시장 독점 지배력 확보",
          "다수의 글로벌 제약사 추가 5~6개 품목 신규 기술수출 협상 중"
        ]
      },
      globalMacro: [
        {
          name: "미국 연준 기준 금리",
          impact: "positive",
          statusText: "금리 인하 사이클 도래 시 위험자산 할인율 하락 수혜",
          description: "바이오 테크는 차입 및 신약 임상 밸류에이션 리레이팅 성격이 짙어 기준금리 하락은 주가의 급진적 반등 재료가 됩니다."
        },
        {
          name: "오리지널 의약품 특허 만료 주기",
          impact: "positive",
          statusText: "글로벌 특허 장벽 우회 목적의 SC 변환 수요 집결",
          description: "블록버스터 의약품의 특허 만료가 임박함에 따라, 빅파마들이 특허권을 SC 제형 추가 출원 방식으로 20년 연장하려 하므로 기술 공급 수요가 증가합니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "달러 마일스톤/로열티 수취 시 원화 환산 마진 증폭",
          description: "계약금 및 마일스톤이 전액 달러로 입금되어 고환율 국면에서 추가적인 환차익 및 현금 수동 소득 극대화가 가능합니다."
        },
        {
          name: "글로벌 임상 시험 규제 강도",
          impact: "neutral",
          statusText: "SC 제형 추가 임상 3상 FDA 허가 난이도 조절",
          description: "신규 물질 대비 허가 성공 확률이 높은 제형 변환(SC) 특성상 FDA 허가 규제 허들이 비교적 낮아 리스크는 비교적 안정적입니다."
        }
      ],
      outlook: {
        shortTerm: "머크 키트루다 SC의 성공적인 상업 가동과 임상 완료 수수료 유입으로 2026년 기술수출형 바이오텍 사상 최초의 초대형 영업이익 흑자가 매 분기 숫자로 입증될 것입니다. 실적 우려를 해소한 대장주 흐름이 기대됩니다.",
        midLongTerm: "2027년 전후로 글로벌 의약품 시장 판매 로열티 유입 비중이 급증하면 연간 순이익률이 50%를 초과하는 압도적 재무 구조를 갖추게 됩니다. 독자 신약 파이프라인 개발 자금 조달 능력이 다져지며 고성장이 정당화됩니다.",
        targetPrice: "340,000원 ~ 400,000원"
      }
    }
  },
  {
    id: "058470",
    name: "리노공업",
    englishName: "Leeno Industrial",
    code: "058470",
    market: "KOSDAQ",
    sector: "반도체 장비 및 검사소켓",
    price: 106500,
    change: 1500,
    changeRate: 1.43,
    prevClose: 105000,
    open: 105500,
    high: 107500,
    low: 105000,
    volume: 120194,
    marketCap: "3.28조원",
    per: 24.2,
    pbr: 4.80,
    roe: 22.5,
    momentums: [
      {
        title: "온디바이스 AI 칩 R&D 테스트 수요 독식",
        description: "스마트폰, PC, 자동차 등 온디바이스 AI 구동 AP 설계 변경 건수가 폭증함에 따라 고부가 R&D 테스트 핀 수주 집중.",
        badge: "호재"
      },
      {
        title: "영업이익률 40%의 무결점 재무 구조",
        description: "반도체 부품업계에서 사상 유례가 없는 40% 내외의 순영업이익률을 수십 년간 고수하며 막강한 경제적 해자 입증.",
        badge: "초강세"
      },
      {
        title: "글로벌 팹리스 고객사 1,000여 개 다변화",
        description: "특정 메모리 대기업 의존도가 낮고 글로벌 팹리스, 빅테크 칩 설계사들과 직접 다품종 소량 연구용 소켓을 거래해 업황 탄력성 확보.",
        badge: "안정"
      }
    ],
    financials: [
      { year: "2023", revenue: 2556, operatingIncome: 1022, netIncome: 864, operatingMargin: 39.98, netMargin: 33.80, isConsensus: false },
      { year: "2024", revenue: 2850, operatingIncome: 1140, netIncome: 950, operatingMargin: 40.00, netMargin: 33.33, isConsensus: false },
      { year: "2025", revenue: 3250, operatingIncome: 1320, netIncome: 1120, operatingMargin: 40.62, netMargin: 34.46, isConsensus: false },
      { year: "2026(E)", revenue: 3820, operatingIncome: 1560, netIncome: 1340, operatingMargin: 40.84, netMargin: 35.08, isConsensus: true },
      { year: "2027(E)", revenue: 4400, operatingIncome: 1820, netIncome: 1580, operatingMargin: 41.36, netMargin: 35.91, isConsensus: true }
    ],
    deepAnalysis: {
      growth: {
        score: 4.7,
        description: "반도체 미세화 테스트 부품인 '리노핀(LEENO PIN)' 및 반도체 검사 소켓 시장을 지배하고 있습니다. 미세 패키징 가공 기술력을 통해 0.1mm 이하 극미세 핀 제조 부문에서 글로벌 표준 지위를 차지하고 있으며, 실리콘 러버 소켓 대비 고장률이 극도로 낮고 고다층 검사가 가능하여 글로벌 하이엔드 테스터용으로 최우선 납품됩니다.",
        highlights: [
          "원천 가공 기술을 통한 미세 소켓 가공 독점 시장 점유율 확보",
          "AI 가속기 및 차세대 메모리 칩 디자인 R&D 테스트 프로젝트 확장",
          "순현금 상태 및 부채 비율 3% 미만의 탁월한 재무 안전성 보유"
        ]
      },
      globalMacro: [
        {
          name: "글로벌 IT 신제품 개발 강도",
          impact: "positive",
          statusText: "AI 칩 설계 변경 건수 증가 시 고마진 소켓 수요 확장",
          description: "양산 물량보다 연구개발 단계의 소켓 단가가 3~5배 비싸기 때문에 글로벌 테크 기업들의 인공지능 칩 연구 강도는 매출의 최대 호재입니다."
        },
        {
          name: "글로벌 스마트폰/PC 출하량",
          impact: "neutral",
          statusText: "범용 IT 기기 판매량 하락 시 일부 영향 노출",
          description: "모바일 AP 위탁이 커 기기 소비 하락은 일부 부품에 악영향을 주나, 차세대 고스펙 AI 탑재 폰 비중이 올라가 단가 상승으로 상쇄합니다."
        },
        {
          name: "원/달러 환율",
          impact: "positive",
          statusText: "수출 비중 70% 상회로 고환율 시 이익률 증대",
          description: "글로벌 팹리스와의 직거래 결제 대금이 주로 달러로 이루어져 환율 상승세는 영업이익 스프레드에 큰 보탬이 됩니다."
        },
        {
          name: "미국 연준 기준 금리",
          impact: "neutral",
          statusText: "무차입 경영 상태로 금리 인하 여부 영향 미미",
          description: "풍부한 유동성 자금과 제로 부채 구조를 유지 중이어서 고금리 장기화에 따른 금융 위험 노출도가 극도로 낮습니다."
        }
      ],
      outlook: {
        shortTerm: "글로벌 AP 및 AI 칩 개발 사이클 가속화로 사상 최대 반도체 R&D 핀 매출을 기록 중입니다. 일반 반도체 제조 기업들의 부진과 무관하게 뛰어난 분기별 이익 안정성을 보여주며 주가의 탄탄한 지지를 보장합니다.",
        midLongTerm: "자율주행, XR, 온디바이스 가전 등 신규 칩셋 설계 영역이 대거 열릴 2026~2027년에는 리노핀 설계 수주의 대당 단가가 폭증하며, 전 세계에서 가장 안전하고 현금성 가치가 뛰어난 부품 대장주 지위를 다질 것입니다.",
        targetPrice: "260,000원 ~ 300,000원"
      }
    }
  }
];
