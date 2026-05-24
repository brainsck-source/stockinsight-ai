import { useState } from 'react';
import { Target, TrendingUp, TrendingDown, Minus, CheckCircle2, ChevronRight, Award, Globe2, FileText, Sparkles, Download, ExternalLink, BookOpen } from 'lucide-react';

export default function DeepAnalysis({ analysis, reports, stockCode }) {
  const [activeTab, setActiveTab] = useState('growth'); // 'growth' | 'macro' | 'outlook' | 'reports'

  const hasAnalysis = !!analysis;
  const { growth, globalMacro, outlook } = analysis || {};

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-finance-success bg-finance-success/10 border border-finance-success/20 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            호재 (수혜)
          </span>
        );
      case 'negative':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-finance-danger bg-finance-danger/10 border border-finance-danger/20 px-2.5 py-1 rounded-full">
            <TrendingDown className="w-3.5 h-3.5" />
            악재 (리스크)
          </span>
        );
      case 'neutral':
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-finance-warning bg-finance-warning/10 border border-finance-warning/20 px-2.5 py-1 rounded-full">
            <Minus className="w-3.5 h-3.5" />
            중립 (보통)
          </span>
        );
    }
  };

  // Helper for Growth Score Ring
  const radius = 35;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = growth ? (circumference - (growth.score / 5) * circumference) : circumference;

  return (
    <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Dynamic Tab Headers */}
      <div className="flex border-b border-slate-100 dark:border-slate-800/40 mb-6 overflow-x-auto pb-0.5 space-x-1 sm:space-x-2">
        <button
          onClick={() => setActiveTab('growth')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all duration-200 whitespace-nowrap ${activeTab === 'growth' ? 'border-finance-primary text-finance-primary dark:text-finance-accentLight' : 'border-transparent text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
        >
          <Award className="w-4 h-4" />
          성장 가능성
        </button>
        <button
          onClick={() => setActiveTab('macro')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all duration-200 whitespace-nowrap ${activeTab === 'macro' ? 'border-finance-primary text-finance-primary dark:text-finance-accentLight' : 'border-transparent text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
        >
          <Globe2 className="w-4 h-4" />
          글로벌 시황 연관성
        </button>
        <button
          onClick={() => setActiveTab('outlook')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all duration-200 whitespace-nowrap ${activeTab === 'outlook' ? 'border-finance-primary text-finance-primary dark:text-finance-accentLight' : 'border-transparent text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
        >
          <FileText className="w-4 h-4" />
          종합 전망 리포트
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all duration-200 whitespace-nowrap ${activeTab === 'reports' ? 'border-finance-primary text-finance-primary dark:text-finance-accentLight' : 'border-transparent text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
        >
          <FileText className="w-4 h-4 text-emerald-500" />
          증권사 리포트
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[220px]">
        {/* AI Analysis Pending Fallback for growth, macro, and outlook tabs */}
        {!hasAnalysis && activeTab !== 'reports' ? (
          <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/20 dark:bg-slate-800/5 min-h-[200px] animate-fade-in">
            <Sparkles className="w-8 h-8 text-amber-500 opacity-80 mb-2.5 animate-pulse" />
            <h4 className="text-xs font-bold text-finance-lightText dark:text-finance-text">심층 AI 분석 준비 중</h4>
            <p className="text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted mt-1 max-w-[340px] leading-relaxed">
              본 종목은 최근 상장된 신규 종목이거나 시가총액 200위 권 외 종목으로, 현재 심층 AI 성장성 평가 및 거시경제 연관성 모델 연산 대기 중 상태입니다.
            </p>
          </div>
        ) : (
          <>
            {/* Tab 1: Growth Potential */}
            {activeTab === 'growth' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              
              {/* Radial Score Gauge */}
              <div className="flex items-center space-x-4 flex-shrink-0 bg-slate-50 dark:bg-slate-800/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/10">
                <div className="relative flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      className="text-slate-200 dark:text-slate-700"
                      strokeWidth={stroke}
                      stroke="currentColor"
                      fill="transparent"
                      r={normalizedRadius}
                      cx={radius + stroke}
                      cy={radius + stroke}
                    />
                    <circle
                      className="text-finance-primary dark:text-finance-accentLight transition-all duration-500 ease-out"
                      strokeWidth={stroke}
                      strokeDasharray={circumference + ' ' + circumference}
                      style={{ strokeDashoffset }}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r={normalizedRadius}
                      cx={radius + stroke}
                      cy={radius + stroke}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-lg font-black text-finance-lightText dark:text-finance-text font-sans">{growth.score}</span>
                    <span className="text-[9px] text-finance-lightTextMuted dark:text-finance-textMuted font-bold uppercase tracking-wider">/ 5.0</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-finance-lightText dark:text-finance-text">AI 종합 성장성 평가</div>
                  <div className="text-[10px] font-semibold text-finance-lightTextMuted dark:text-finance-textMuted mt-0.5">신사업, R&D, 시장 지배력 기준</div>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 space-y-2">
                <h4 className="text-sm font-bold text-finance-lightText dark:text-finance-text flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-finance-primary" /> 핵심 성장 모멘텀 분석
                </h4>
                <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted leading-relaxed">
                  {growth.description}
                </p>
              </div>
            </div>

            {/* Growth Highlights */}
            <div className="space-y-2.5 border-t border-slate-100 dark:border-slate-800/40 pt-4">
              <h5 className="text-xs font-extrabold text-finance-lightText dark:text-finance-text uppercase tracking-wider">세부 추진 현황 및 강점</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {growth.highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/20 bg-slate-50/50 dark:bg-slate-800/10 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-finance-success mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-semibold text-finance-lightText dark:text-finance-text leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Global Macro Correlation */}
        {activeTab === 'macro' && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted mb-2 leading-relaxed">
              글로벌 거시경제 지표 및 매크로 위협/기회 변수가 해당 종목에 미치는 즉각적인 영향 분석 결과입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {globalMacro.map((macro, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/20 bg-slate-50/30 dark:bg-slate-800/10 space-y-2 hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-200"
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs font-extrabold text-finance-lightText dark:text-finance-text">
                      {macro.name}
                    </span>
                    {getImpactIcon(macro.impact)}
                  </div>
                  <div className="text-[11px] font-bold text-finance-primary dark:text-finance-accentLight bg-finance-primary/[0.04] dark:bg-finance-primary/[0.08] px-2 py-1 rounded">
                    {macro.statusText}
                  </div>
                  <p className="text-[11px] text-finance-lightTextMuted dark:text-finance-textMuted leading-relaxed">
                    {macro.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Overall Outlook */}
        {activeTab === 'outlook' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Short Term */}
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/20 bg-slate-50/50 dark:bg-slate-800/10 space-y-2">
                <h4 className="text-xs font-extrabold text-finance-primary dark:text-finance-accentLight flex items-center gap-1.5 uppercase tracking-wider">
                  <ChevronRight className="w-4 h-4" /> 6개월 단기 분석
                </h4>
                <p className="text-xs text-finance-lightText dark:text-finance-text leading-relaxed">
                  {outlook.shortTerm}
                </p>
              </div>

              {/* Mid/Long Term */}
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/20 bg-slate-50/50 dark:bg-slate-800/10 space-y-2">
                <h4 className="text-xs font-extrabold text-emerald-500 flex items-center gap-1.5 uppercase tracking-wider">
                  <ChevronRight className="w-4 h-4" /> 1년 중장기 전망
                </h4>
                <p className="text-xs text-finance-lightText dark:text-finance-text leading-relaxed">
                  {outlook.midLongTerm}
                </p>
              </div>
            </div>

            {/* Target Price Callout Block */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-finance-primary/[0.05] to-emerald-500/[0.05] dark:from-finance-primary/[0.08] dark:to-emerald-500/[0.08] border border-finance-primary/10 dark:border-finance-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-tr from-finance-primary to-emerald-400 text-white rounded-xl shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-finance-lightText dark:text-finance-text">AI 합리적 기대 가격 (Target Price)</h4>
                  <p className="text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted mt-0.5">밸류에이션 리레이팅 및 컨센서스 달성 가중치 적용</p>
                </div>
              </div>
              <div className="text-lg font-black text-finance-primary dark:text-finance-accentLight font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
                {outlook.targetPrice}
              </div>
            </div>
          </div>
        )}
          </>
        )}

        {/* Tab 4: Broker Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4 animate-fade-in text-finance-lightText dark:text-finance-text">
            <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted leading-relaxed">
              네이버 금융 리서치에서 수집된 가장 최근의 증권사 기업분석 보고서 목록입니다.
            </p>
            {reports && reports.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {reports.map((report, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/20 bg-slate-50/30 dark:bg-slate-800/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-200"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] bg-finance-primary/10 text-finance-primary dark:bg-finance-primary/20 dark:text-finance-accentLight font-bold px-2 py-0.5 rounded">
                          {report.broker}
                        </span>
                        <span className="text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted font-sans">
                          {report.date}
                        </span>
                        <span className="text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted font-sans">
                          조회 {report.views}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-finance-lightText dark:text-finance-text leading-snug">
                        {report.title}
                      </h4>
                    </div>
                    {report.pdfUrl ? (
                      <a 
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-finance-primary hover:bg-finance-primaryHover px-4 py-2 rounded-xl transition-all shadow-sm self-stretch sm:self-auto justify-center"
                      >
                        <Download className="w-3.5 h-3.5" />
                        PDF 다운로드
                      </a>
                    ) : (
                      <span className="text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted font-semibold">
                        PDF 미제공
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/20 dark:bg-slate-800/5">
                <BookOpen className="w-8 h-8 text-finance-lightTextMuted dark:text-finance-textMuted opacity-50 mb-2.5" />
                <p className="text-xs font-bold text-finance-lightText dark:text-finance-text">수집된 최근 보고서가 없습니다</p>
                <p className="text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted mt-1 mb-4 max-w-[280px] leading-relaxed">
                  마이너 종목 또는 최근 발간 리포트가 드문 종목입니다. 네이버 금융 페이지에서 관련 정보를 확인해 보세요.
                </p>
                <a 
                  href={`https://finance.naver.com/item/main.naver?code=${stockCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-bold text-finance-primary dark:text-finance-accentLight hover:underline"
                >
                  네이버 금융 페이지로 이동
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Analysis Disclaimer/Source Guide */}
      {activeTab !== 'reports' && hasAnalysis && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center gap-2 text-[10px] font-semibold text-finance-lightTextMuted dark:text-finance-textMuted bg-slate-50/50 dark:bg-slate-800/5 px-3 py-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800/10">
          <Sparkles className="w-3.5 h-3.5 text-finance-primary animate-pulse flex-shrink-0" />
          <span>본 분석은 최근 수집된 증권사 기업분석 리포트 원문 및 시장 자료를 AI가 종합 분석한 결과입니다.</span>
        </div>
      )}
    </div>
  );
}
