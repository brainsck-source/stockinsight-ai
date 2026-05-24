import { useState } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar, Line, CartesianGrid } from 'recharts';
import { BarChart3, Table as TableIcon, AlertCircle } from 'lucide-react';

// Custom Tooltip for Recharts declared outside of render
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isEst = payload[0].payload.isConsensus;
    const formatTrillion = (value) => {
      if (value === null || value === undefined || isNaN(value)) return '-';
      const trillion = (value / 10000).toFixed(2);
      return `${parseFloat(trillion).toLocaleString()}조원`;
    };

    return (
      <div className="bg-finance-lightCard dark:bg-finance-card border border-finance-lightBorder dark:border-finance-border p-4 rounded-xl shadow-lg font-sans">
        <p className="text-xs font-bold text-finance-lightText dark:text-finance-text flex items-center gap-1.5 mb-2">
          {label}
          {isEst ? (
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1 py-0.5 rounded">컨센서스(E)</span>
          ) : (
            <span className="text-[10px] bg-finance-success/10 text-finance-success border border-finance-success/20 px-1 py-0.5 rounded">확정 실적</span>
          )}
        </p>
        <div className="space-y-1">
          {payload.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs space-x-6">
              <span className="text-finance-lightTextMuted dark:text-finance-textMuted flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></span>
                {item.name}:
              </span>
              <span className="font-bold text-finance-lightText dark:text-finance-text">
                {formatTrillion(item.payload[item.name === '매출액' ? 'rawRevenue' : item.name === '영업이익' ? 'rawOperatingIncome' : 'rawNetIncome'])}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function FinancialsTab({ financials }) {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' | 'table'
  const [filterPeriod, setFilterPeriod] = useState('all'); // 'all' | 'actuals' | 'consensus'

  if (!financials || financials.length === 0) {
    return (
      <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-amber-500/10 dark:bg-amber-500/20 p-3 rounded-full text-amber-500 mb-4 animate-pulse">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-finance-lightText dark:text-finance-text">
          재무 실적 수집 대기 중
        </h3>
        <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted mt-2 max-w-md leading-relaxed">
          해당 기업은 최근에 상장된 신규 종목이거나 시가총액 순위(상위 200위 외)로 인해 실제 상세 재무 제표 스크래핑 대상에서 일시 제외된 상태입니다. 다음 데이터 업데이트 주기 때 자동으로 수집 및 매핑이 진행됩니다.
        </p>
      </div>
    );
  }

  // 100M KRW to Trillion (조원) formatter
  const formatTrillion = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '-';
    // value is in 억 원 (100 Million KRW)
    const trillion = (value / 10000).toFixed(2);
    return `${parseFloat(trillion).toLocaleString()}조원`;
  };

  const formatTrillionNum = (value) => {
    if (value === null || value === undefined || isNaN(value)) return null;
    return parseFloat((value / 10000).toFixed(2));
  };

  // Filter Data
  const getFilteredData = () => {
    switch (filterPeriod) {
      case 'actuals':
        return financials.filter(f => !f.isConsensus);
      case 'consensus':
        return financials.filter(f => f.isConsensus);
      case 'all':
      default:
        return financials;
    }
  };

  const filteredData = getFilteredData();
  
  // Transform data for chart to avoid flat lines
  const chartData = filteredData.map(f => ({
    year: f.year,
    '매출액': formatTrillionNum(f.revenue),
    '영업이익': formatTrillionNum(f.operatingIncome),
    '당기순이익': formatTrillionNum(f.netIncome),
    rawRevenue: f.revenue,
    rawOperatingIncome: f.operatingIncome,
    rawNetIncome: f.netIncome,
    isConsensus: f.isConsensus
  }));


  return (
    <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Tab Menu Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/40">
        <div>
          <h3 className="text-base font-bold text-finance-lightText dark:text-finance-text flex items-center gap-2">
            <div className="bg-finance-primary/10 dark:bg-finance-primary/20 p-1.5 rounded-lg text-finance-primary dark:text-finance-accentLight">
              <BarChart3 className="w-4 h-4" />
            </div>
            최근 실적 및 향후 전망
          </h3>
          <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted mt-1">
            최근 3개년의 확정 실적과 2개년의 시장 예상치(컨센서스)의 비교 추이
          </p>
        </div>

        {/* Filters and View Toggles */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Period Filter */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setFilterPeriod('all')}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${filterPeriod === 'all' ? 'bg-white dark:bg-finance-card text-finance-primary dark:text-finance-accentLight shadow-sm' : 'text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterPeriod('actuals')}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${filterPeriod === 'actuals' ? 'bg-white dark:bg-finance-card text-finance-primary dark:text-finance-accentLight shadow-sm' : 'text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
            >
              실적
            </button>
            <button
              onClick={() => setFilterPeriod('consensus')}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${filterPeriod === 'consensus' ? 'bg-white dark:bg-finance-card text-finance-primary dark:text-finance-accentLight shadow-sm' : 'text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText dark:hover:text-finance-text'}`}
            >
              예상(E)
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('chart')}
              className={`p-1.5 rounded-lg transition-all duration-200 ${viewMode === 'chart' ? 'bg-white dark:bg-finance-card text-finance-primary dark:text-finance-accentLight shadow-sm' : 'text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText'}`}
              title="차트 보기"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all duration-200 ${viewMode === 'table' ? 'bg-white dark:bg-finance-card text-finance-primary dark:text-finance-accentLight shadow-sm' : 'text-finance-lightTextMuted dark:text-finance-textMuted hover:text-finance-lightText'}`}
              title="테이블 보기"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'chart' ? (
        <div style={{ minHeight: 280 }} className="h-[280px] w-full font-sans">
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-850 opacity-40" />
              <XAxis 
                dataKey="year" 
                stroke="#64748B" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#3B82F6" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                label={{ value: '매출액 (조원)', angle: -90, position: 'insideLeft', offset: 0, fill: '#3B82F6', fontSize: 10, fontWeight: 'bold' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                stroke="#10B981" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                label={{ value: '영업/순이익 (조원)', angle: 90, position: 'insideRight', offset: 0, fill: '#10B981', fontSize: 10, fontWeight: 'bold' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ fontSize: 11, fontWeight: 'semibold', paddingBottom: 10 }}
              />
              <Bar yAxisId="left" dataKey="매출액" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={45} fillOpacity={0.85} />
              <Line yAxisId="right" type="monotone" dataKey="영업이익" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 1.5 }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="당기순이익" stroke="#EF4444" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 4, strokeWidth: 1.5 }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Structured Table View */
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-finance-lightTextMuted dark:text-finance-textMuted border-b border-slate-100 dark:border-slate-800/40">
                <th className="py-3.5 px-4">연도</th>
                <th className="py-3.5 px-4 text-right">매출액</th>
                <th className="py-3.5 px-4 text-right">영업이익</th>
                <th className="py-3.5 px-4 text-right">당기순이익</th>
                <th className="py-3.5 px-4 text-right">영업이익률</th>
                <th className="py-3.5 px-4 text-right">당기순이익률</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/20 text-xs font-semibold text-finance-lightText dark:text-finance-text">
              {filteredData.map((f, i) => (
                <tr 
                  key={i} 
                  className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors duration-150 ${f.isConsensus ? 'bg-amber-500/[0.02] dark:bg-amber-500/[0.01]' : ''}`}
                >
                  <td className="py-3.5 px-4 flex items-center gap-1.5">
                    {f.year}
                    {f.isConsensus && (
                      <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/10 px-1 py-0.2 rounded font-extrabold">E</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-sans font-bold">{formatTrillion(f.revenue)}</td>
                  <td className={`py-3.5 px-4 text-right font-sans font-bold ${f.operatingIncome < 0 ? 'text-finance-danger' : 'text-finance-lightText dark:text-finance-text'}`}>
                    {formatTrillion(f.operatingIncome)}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-sans font-bold ${f.netIncome < 0 ? 'text-finance-danger' : 'text-finance-lightText dark:text-finance-text'}`}>
                    {formatTrillion(f.netIncome)}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-sans ${f.operatingMargin < 0 ? 'text-finance-danger' : 'text-finance-success'}`}>
                    {f.operatingMargin !== null && f.operatingMargin !== undefined ? `${f.operatingMargin}%` : '-'}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-sans ${f.netMargin < 0 ? 'text-finance-danger' : 'text-finance-success'}`}>
                    {f.netMargin !== null && f.netMargin !== undefined ? `${f.netMargin}%` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Consensus Warning Footer */}
      <div className="mt-4 flex items-start gap-2 text-[10px] text-finance-lightTextMuted dark:text-finance-textMuted bg-slate-50 dark:bg-slate-800/10 p-3 rounded-xl border border-slate-100 dark:border-slate-800/10">
        <AlertCircle className="w-3.5 h-3.5 mt-0.5 text-amber-500 flex-shrink-0" />
        <div className="leading-relaxed">
          <strong>(E) 표시 연도는 시장 컨센서스(예상 전망치)입니다.</strong> 실제 실적치는 국내외 경기 변동, 기업 경영 환경, 회계 기준 변경 및 예상치 못한 시황 노출 요인에 의해 본 전망 그래프와 크게 다를 수 있으므로 본 데이터는 단순 투자 참고 지표로 사용되어야 합니다.
        </div>
      </div>

    </div>
  );
}
