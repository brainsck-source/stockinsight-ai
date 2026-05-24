import { useState, useEffect, useRef } from 'react';
import { Search, Moon, Sun, TrendingUp, Sparkles, X, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

export default function Header({ currentStockId, onSelectStock, theme, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch initial recommended stocks for the empty search state
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await api.getRecommendedStocks();
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      }
    };
    fetchRecommendations();
  }, []);

  // Handle Search Input Change
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const data = await api.searchStocks(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (stockId) => {
    onSelectStock(stockId);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-finance-lightBorder bg-finance-lightCard/80 backdrop-blur-md dark:border-finance-border dark:bg-finance-bg/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0 cursor-pointer" onClick={() => onSelectStock("005930")}>
          <div className="bg-gradient-to-tr from-finance-primary to-emerald-400 p-2 rounded-xl text-white shadow-md shadow-finance-primary/10">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight font-sans text-finance-lightText dark:text-finance-text flex items-center gap-1.5">
              시황 분석기
              <span className="text-xs font-semibold bg-finance-primary/10 text-finance-primary dark:bg-finance-primary/20 dark:text-finance-accentLight px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                <Sparkles className="w-3 h-3" />
                AI
              </span>
            </h1>
            <p className="text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted tracking-wider font-medium uppercase">
              StockInsight AI
            </p>
          </div>
        </div>

        {/* Search Input Container */}
        <div ref={dropdownRef} className="flex-1 max-w-md relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-finance-primary transition-colors duration-200">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="종목명 또는 종목코드를 입력하세요 (예: 삼성전자, 000660)"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-finance-lightBorder dark:border-finance-border bg-slate-50 dark:bg-finance-card/50 text-sm font-medium text-finance-lightText dark:text-finance-text placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-finance-primary/30 focus:border-finance-primary focus:bg-white dark:focus:bg-finance-card transition-all duration-200"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-finance-lightText dark:hover:text-finance-text transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-finance-lightBorder dark:border-finance-border bg-finance-lightCard dark:bg-finance-card shadow-xl overflow-hidden max-h-[360px] overflow-y-auto animate-fade-in z-50">
              
              {/* Searching Indicator */}
              {isLoading && (
                <div className="p-4 text-center text-xs text-finance-lightTextMuted dark:text-finance-textMuted flex items-center justify-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-finance-primary/30 border-t-finance-primary rounded-full animate-spin"></div>
                  검색 중...
                </div>
              )}

              {/* Search Results */}
              {!isLoading && query && results.length > 0 && (
                <div className="py-2">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-finance-lightTextMuted dark:text-finance-textMuted tracking-wider uppercase border-b border-slate-100 dark:border-slate-800/40">
                    검색 결과 ({results.length})
                  </div>
                  {results.map((stock) => (
                    <button
                      key={stock.id}
                      onClick={() => handleSelect(stock.id)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition-colors duration-200 group"
                    >
                      <div>
                        <div className="text-sm font-semibold text-finance-lightText dark:text-finance-text group-hover:text-finance-primary transition-colors duration-200">
                          {stock.name}
                        </div>
                        <div className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted mt-0.5">
                          {stock.code} · {stock.sector}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-finance-lightText dark:text-finance-text">
                          {stock.price.toLocaleString()}원
                        </div>
                        <div className={`text-xs font-semibold mt-0.5 ${stock.changeRate >= 0 ? 'text-finance-success' : 'text-finance-danger'}`}>
                          {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate}%
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No Search Results */}
              {!isLoading && query && results.length === 0 && (
                <div className="p-6 text-center text-sm text-finance-lightTextMuted dark:text-finance-textMuted space-y-1">
                  <p className="font-semibold">일치하는 종목이 없습니다.</p>
                  <p className="text-xs">종목 이름이나 6자리 종목코드를 다시 확인해 주세요.</p>
                </div>
              )}

              {/* Recommendations (shown when search box is empty or focused) */}
              {!query && (
                <div className="p-3.5 bg-finance-primary/5 dark:bg-finance-primary/10 border-b border-finance-lightBorder dark:border-finance-border/50 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-finance-primary dark:text-finance-accentLight text-sm">💡</span>
                    <div>
                      <p className="font-bold text-finance-lightText dark:text-finance-accentLight">코스피 & 코스닥 전 종목(2,700+) 검색 지원</p>
                      <p className="text-[11px] mt-0.5 leading-relaxed text-slate-500 dark:text-slate-400">
                        국내 유가증권시장(KOSPI) 및 코스닥(KOSDAQ)에 상장된 2,700여 개 모든 종목의 시황 및 AI 분석 리포트를 제공합니다. 종목명이나 6자리 코드로 자유롭게 검색해 보세요.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!query && recommendations.length > 0 && (
                <div className="py-2">
                  <div className="px-3.5 py-2 flex items-center justify-between text-[10px] font-bold text-finance-lightTextMuted dark:text-finance-textMuted tracking-wider uppercase border-b border-slate-100 dark:border-slate-800/40">
                    <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-finance-primary" /> 실시간 추천 종목</span>
                  </div>
                  {recommendations.map((stock) => (
                    <button
                      key={stock.id}
                      onClick={() => handleSelect(stock.id)}
                      className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left transition-colors duration-200 group ${currentStockId === stock.id ? 'bg-slate-50/50 dark:bg-slate-800/20' : ''}`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${stock.changeRate >= 0 ? 'bg-finance-success' : 'bg-finance-danger'}`} />
                        <div>
                          <span className="text-sm font-semibold text-finance-lightText dark:text-finance-text group-hover:text-finance-primary transition-colors duration-200">
                            {stock.name}
                          </span>
                          <span className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted ml-2">
                            {stock.code}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-semibold text-finance-lightText dark:text-finance-text">
                          {stock.price.toLocaleString()}원
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${stock.changeRate >= 0 ? 'bg-finance-success/10 text-finance-success' : 'bg-finance-danger/10 text-finance-danger'}`}>
                          {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate}%
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl border border-finance-lightBorder dark:border-finance-border text-finance-lightTextMuted dark:text-finance-textMuted hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-finance-primary dark:hover:text-finance-accentLight transition-all duration-200 flex-shrink-0"
          title={theme === 'dark' ? '라이트 모드 전환' : '다크 모드 전환'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

      </div>
    </header>
  );
}
