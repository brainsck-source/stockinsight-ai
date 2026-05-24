import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';

export default function CompanyOverview({ stock }) {
  if (!stock) return null;

  const isUp = stock.changeRate >= 0;
  const changeColorClass = isUp ? 'text-finance-success bg-finance-success/10' : 'text-finance-danger bg-finance-danger/10';
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;

  const formatNum = (val, suffix = '원') => {
    if (val === null || val === undefined || isNaN(val)) return '-';
    return `${val.toLocaleString()}${suffix}`;
  };

  const getHighLowValue = () => {
    const hasHigh = stock.high !== null && stock.high !== undefined;
    const hasLow = stock.low !== null && stock.low !== undefined;
    if (hasHigh && hasLow) {
      return `${stock.high.toLocaleString()} / ${stock.low.toLocaleString()}`;
    }
    return '-';
  };

  const metrics = [
    { label: '전일 종가', value: formatNum(stock.prevClose), desc: '직전 거래일 종가' },
    { label: '시가', value: formatNum(stock.open), desc: '금일 거래 시작가' },
    { label: '고가 / 저가', value: getHighLowValue(), desc: '금일 최고/최저 가격' },
    { label: '거래량', value: formatNum(stock.volume, '주'), desc: '금일 총 거래 수량' },
    { label: '시가총액', value: stock.marketCap || '-', desc: '상장 주식수 × 현재가' },
    { label: 'PER (주가수익비율)', value: stock.per !== null && stock.per !== undefined ? `${stock.per}배` : '-', desc: '현재가 ÷ 주당순이익(EPS)' },
    { label: 'PBR (주가순자산비율)', value: stock.pbr !== null && stock.pbr !== undefined ? `${stock.pbr}배` : '-', desc: '현재가 ÷ 주당순자산(BPS)' },
    { label: 'ROE (자기자본이익률)', value: stock.roe !== null && stock.roe !== undefined ? `${stock.roe}%` : '-', desc: '당기순이익 ÷ 자기자본' }
  ];

  return (
    <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Upper Info Segment */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-finance-lightBorder dark:border-finance-border pb-6 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-finance-lightTextMuted dark:text-finance-textMuted tracking-wider font-sans">
              {stock.market}
            </span>
            <span className="text-xs text-finance-primary font-semibold">
              {stock.sector}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-finance-lightText dark:text-finance-text mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {stock.name}
            <span className="text-sm font-semibold font-mono text-finance-lightTextMuted dark:text-finance-textMuted">
              {stock.code}
            </span>
            <a
              href={`https://finance.naver.com/item/main.nhn?code=${stock.code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all duration-200 ml-2"
              title="네이버 금융에서 보기"
            >
              네이버 금융
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </h2>
        </div>

        {/* Price & Change Indicator */}
        <div className="text-left md:text-right flex md:flex-col items-baseline md:items-end gap-3 md:gap-0">
          <div className="text-3xl font-black text-finance-lightText dark:text-finance-text font-sans">
            {stock.price !== null && stock.price !== undefined ? stock.price.toLocaleString() : '-'}
            <span className="text-lg font-bold ml-0.5">원</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`flex items-center gap-0.5 text-xs font-bold px-2.5 py-1 rounded-lg ${changeColorClass}`}>
              <Icon className="w-3.5 h-3.5" />
              {stock.change !== null && stock.change !== undefined ? `${isUp ? '+' : ''}${stock.change.toLocaleString()}원` : '-'}
              {stock.changeRate !== null && stock.changeRate !== undefined ? ` (${isUp ? '+' : ''}${stock.changeRate}%)` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Key Market Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div 
            key={i} 
            className="p-3.5 rounded-xl bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-800/20 dark:hover:bg-slate-800/40 border border-slate-100 dark:border-slate-800/20 group transition-all duration-200"
            title={metric.desc}
          >
            <span className="block text-[11px] font-semibold text-finance-lightTextMuted dark:text-finance-textMuted transition-colors duration-200 group-hover:text-finance-primary dark:group-hover:text-finance-accentLight">
              {metric.label}
            </span>
            <span className="block text-base font-bold text-finance-lightText dark:text-finance-text mt-1 font-sans">
              {metric.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
