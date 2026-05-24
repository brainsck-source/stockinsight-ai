import { useState, useEffect } from 'react';
import Header from './components/Header';
import CompanyOverview from './components/CompanyOverview';
import MomentumFeed from './components/MomentumFeed';
import FinancialsTab from './components/FinancialsTab';
import DeepAnalysis from './components/DeepAnalysis';
import IndustryReportsFeed from './components/IndustryReportsFeed';
import SkeletonDashboard from './components/SkeletonDashboard';
import { api } from './services/api';
import { Eye, AlertCircle } from 'lucide-react';

// 한국 시간(KST) 기준 장 운영 시간 여부 체크 (평일 09:00 ~ 15:30)
function checkIfMarketOpen() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kst = new Date(utc + (3600000 * 9));
  
  const day = kst.getDay(); // 0: 일요일, 6: 토요일
  const hours = kst.getHours();
  const minutes = kst.getMinutes();
  const timeInMinutes = hours * 60 + minutes;
  
  const startMarket = 9 * 60; // 09:00
  const endMarket = 15 * 60 + 30; // 15:30
  
  if (day === 0 || day === 6) {
    return { isOpen: false, status: "closed-weekend", text: "주말 휴장" };
  }
  if (timeInMinutes >= startMarket && timeInMinutes < endMarket) {
    return { isOpen: true, status: "open", text: "장 운영 중 (Live)" };
  }
  return { isOpen: false, status: "closed-hours", text: "장 마감 (Market Closed)" };
}

export default function App() {
  const [activeStockId, setActiveStockId] = useState('005930'); // Default to Samsung Electronics
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [marketStatus, setMarketStatus] = useState(() => checkIfMarketOpen());
  const [theme, setTheme] = useState(() => {
    // Check if dark mode is preferred or previously saved
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Apply Theme Class to Document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // 주기적으로 장 운영 상태 확인 (10초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setMarketStatus(checkIfMarketOpen());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Stock Data on Selection Change
  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const data = await api.getStockById(activeStockId);
        setStockData(data);
      } catch (error) {
        console.error("Failed to load stock data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStockData();
  }, [activeStockId]);

  // 실시간 체결가 시뮬레이션 (3초마다 미세 변동 - 장 운영 중일 때만 & 가격 정보가 존재할 때만)
  useEffect(() => {
    if (!stockData || isLoading || !marketStatus.isOpen || stockData.price === null || stockData.prevClose === null) return;

    const interval = setInterval(() => {
      setStockData(prev => {
        if (!prev) return null;
        // -0.15% ~ +0.15% 가격 변동 시뮬레이션
        const fluctuationPercent = (Math.random() * 0.3 - 0.15) / 100;
        const priceDiff = Math.round(prev.price * fluctuationPercent);
        if (priceDiff === 0) return prev;

        const newPrice = Math.max(1000, prev.price + priceDiff);
        const newChange = newPrice - prev.prevClose;
        const newChangeRate = parseFloat(((newChange / prev.prevClose) * 100).toFixed(2));

        return {
          ...prev,
          price: newPrice,
          change: newChange,
          changeRate: newChangeRate
        };
      });
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStockId, isLoading, marketStatus.isOpen]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#090D1A] dark:text-slate-100 transition-colors duration-300 font-sans pb-16">
      
      {/* Search Header */}
      <Header
        currentStockId={activeStockId}
        onSelectStock={setActiveStockId}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Decorative Top Headline Banner */}
        <div className="mb-6 bg-gradient-to-r from-finance-primary/10 via-emerald-500/5 to-transparent border-l-4 border-finance-primary p-4 rounded-r-2xl flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 flex-1">
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${marketStatus.isOpen ? "animate-ping bg-finance-primary" : "bg-slate-400"}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${marketStatus.isOpen ? "bg-finance-primary" : "bg-slate-400"}`}></span>
            </span>
            <p className="text-xs sm:text-sm font-semibold text-finance-lightText dark:text-slate-200">
              {isLoading ? (
                <span>실시간 금융 시뮬레이터 데이터를 수집하고 있습니다.</span>
              ) : (
                <span>
                  현재 분석 대상: <strong className="text-finance-primary dark:text-finance-accentLight">{stockData?.name} ({stockData?.code})</strong>. 
                  {marketStatus.isOpen ? (
                    <span className="ml-1 text-emerald-600 dark:text-emerald-400 font-medium">3초 주기로 실시간 호가 시뮬레이션 중 (장중 체결 반영).</span>
                  ) : (
                    <span className="ml-1 text-slate-500 dark:text-slate-400 font-medium flex-wrap">장 외 시간으로 실시간 호가 시뮬레이션이 일시 정지되었습니다 (평일 09:00 ~ 15:30에만 동작).</span>
                  )}
                </span>
              )}
            </p>
          </div>
          <div className={`hidden md:flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors flex-shrink-0 ${
            marketStatus.isOpen 
              ? "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40" 
              : "text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800/60"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${marketStatus.isOpen ? "bg-emerald-500" : "bg-slate-400"}`}></span>
            {marketStatus.text}
          </div>
        </div>

        {/* Dashboard Content Area */}
        {isLoading ? (
          <SkeletonDashboard />
        ) : stockData ? (
          <div className="space-y-6 animate-slide-up">
            
            {/* Top Grid: Overview and Momentum */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2">
                <CompanyOverview stock={stockData} />
              </div>
              <div className="lg:col-span-1">
                <MomentumFeed momentums={stockData.momentums} />
              </div>
            </div>

            {/* Financial Charts & Table */}
            <div>
              <FinancialsTab financials={stockData.financials} />
            </div>

            {/* Bottom Grid: Deep Analysis and Industry Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2">
                <DeepAnalysis 
                  analysis={stockData.deepAnalysis} 
                  reports={stockData.reports}
                  stockCode={stockData.code}
                />
              </div>
              <div className="lg:col-span-1">
                <IndustryReportsFeed />
              </div>
            </div>

          </div>
        ) : (
          /* Error Fallback */
          <div className="p-12 text-center border border-dashed rounded-2xl bg-white dark:bg-finance-card border-finance-lightBorder dark:border-finance-border max-w-md mx-auto space-y-4">
            <AlertCircle className="w-12 h-12 text-finance-danger mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-finance-lightText dark:text-finance-text">데이터 로드 실패</h3>
              <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted">요청하신 종목 정보를 찾을 수 없거나 데이터베이스 오류가 발생했습니다.</p>
            </div>
            <button
              onClick={() => setActiveStockId('005930')}
              className="px-4 py-2 bg-finance-primary hover:bg-finance-primaryHover text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              기본 종목(삼성전자)으로 돌아가기
            </button>
          </div>
        )}
      </main>
      
      {/* Decorative footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted space-y-1">
        <p>© 2026 StockInsight AI Dashboard. All Rights Reserved. Powered by React, Tailwind & Recharts.</p>
        <p className="max-w-xl mx-auto opacity-70">본 대시보드는 모의 데이터를 기반으로 실시간 동향 분석을 시뮬레이션한 프로토타입이며, 실제 투자 결과를 보장하지 않습니다. 금융 거래 시에는 각별히 주의하시기 바랍니다.</p>
      </footer>

    </div>
  );
}
