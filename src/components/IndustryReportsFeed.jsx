import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BookOpen, Download, Globe, FileText } from 'lucide-react';

export default function IndustryReportsFeed({ onSelectStock }) {
  const [activeTab, setActiveTab] = useState('industry'); // 'industry' | 'stock'
  const [industryReports, setIndustryReports] = useState([]);
  const [stockReports, setStockReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const indData = await api.getIndustryReports();
        setIndustryReports(indData.slice(0, 10)); // 최신 10개

        const stockData = await api.getRecentStockReports();
        setStockReports(stockData.slice(0, 10)); // 최신 10개
      } catch (e) {
        console.error("Failed to load reports", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm animate-pulse space-y-4 h-full">
        <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentReports = activeTab === 'industry' ? industryReports : stockReports;

  return (
    <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-finance-lightText dark:text-finance-text flex items-center gap-2">
          <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-1.5 rounded-lg text-emerald-500">
            <Globe className="w-4 h-4" />
          </div>
          실시간 리서치 및 시황 분석
        </h3>
        <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted mt-1">
          네이버 금융 리서치에서 업데이트된 최신 보고서 피드
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-100 dark:border-slate-800/40 mb-4 pb-0.5 space-x-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('industry')}
          className={`pb-2 border-b-2 transition-all duration-200 ${activeTab === 'industry' ? 'border-finance-primary text-finance-primary dark:text-finance-accentLight' : 'border-transparent text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
        >
          산업 리포트
        </button>
        <button
          onClick={() => setActiveTab('stock')}
          className={`pb-2 border-b-2 transition-all duration-200 ${activeTab === 'stock' ? 'border-finance-primary text-finance-primary dark:text-finance-accentLight' : 'border-transparent text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
        >
          최신 기업 리포트
        </button>
      </div>

      {/* Report Items List */}
      <div className="flex-1 space-y-3 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin">
        {currentReports && currentReports.length > 0 ? (
          currentReports.map((report, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/30 bg-slate-50/20 dark:bg-slate-800/10 hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-200 flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Stock Page Badge Link */}
                  {activeTab === 'stock' ? (
                    <button
                      onClick={() => onSelectStock && onSelectStock(report.stockCode)}
                      className="text-[9px] font-black bg-finance-primary/10 text-finance-primary dark:bg-finance-primary/20 dark:text-finance-accentLight px-2 py-0.5 rounded hover:scale-105 transition-transform"
                      title={`${report.stockName} 대시보드로 이동`}
                    >
                      {report.stockName}
                    </button>
                  ) : (
                    <span className="text-[9px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 px-1.5 py-0.5 rounded font-sans">
                      {report.category}
                    </span>
                  )}
                  <span className="text-[9px] text-finance-lightTextMuted dark:text-finance-textMuted font-sans">
                    {report.broker}
                  </span>
                  <span className="text-[9px] text-finance-lightTextMuted dark:text-finance-textMuted font-sans">
                    {report.date}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-finance-lightText dark:text-finance-text truncate hover:text-finance-primary dark:hover:text-finance-accentLight transition-colors" title={report.title}>
                  {report.title}
                </h4>
              </div>
              {report.pdfUrl ? (
                <a 
                  href={report.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-100 hover:bg-finance-primary/10 text-slate-600 hover:text-finance-primary dark:bg-slate-800 dark:text-slate-400 dark:hover:text-finance-accentLight dark:hover:bg-finance-primary/20 rounded-lg transition-colors flex-shrink-0"
                  title="PDF 다운로드"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-finance-lightTextMuted dark:text-finance-textMuted animate-fade-in">
            <BookOpen className="w-8 h-8 opacity-40 mb-2" />
            <p className="text-xs font-bold">리포트 데이터가 없습니다</p>
            <p className="text-[10px] mt-1">업데이트 스크립트를 확인해 주세요.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/40 flex justify-between items-center text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted font-sans">
        <span>최근 수집: {new Date().toLocaleDateString('ko-KR')}</span>
        <a 
          href={activeTab === 'stock' ? 'https://finance.naver.com/research/company_list.naver' : 'https://finance.naver.com/research/industry_list.naver'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline flex items-center gap-0.5"
        >
          원문 더보기
          <FileText className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
