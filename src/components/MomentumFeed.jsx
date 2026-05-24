import { Sparkles, Zap, CheckCircle2 } from 'lucide-react';

export default function MomentumFeed({ momentums }) {
  if (!momentums || momentums.length === 0) return null;

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case '초강세':
      case '초호재':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case '호재':
      case '긍정':
        return 'bg-finance-success/10 text-finance-success border-finance-success/20';
      case '안정':
      default:
        return 'bg-finance-primary/10 text-finance-primary border-finance-primary/20';
    }
  };

  return (
    <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
      <div>
        <h3 className="text-base font-bold text-finance-lightText dark:text-finance-text flex items-center gap-2 mb-4">
          <div className="bg-finance-primary/10 dark:bg-finance-primary/20 p-1.5 rounded-lg text-finance-primary dark:text-finance-accentLight">
            <Sparkles className="w-4 h-4" />
          </div>
          AI 투자 모멘텀 요약
        </h3>

        <div className="space-y-4">
          {momentums.map((momentum, i) => (
            <div 
              key={i} 
              className="p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800/10 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all duration-200"
            >
              {/* Indicator Circle */}
              <div className="mt-1 flex-shrink-0">
                <div className="p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-finance-primary dark:text-finance-accentLight">
                  <Zap className="w-3.5 h-3.5 fill-current opacity-80" />
                </div>
              </div>

              {/* Text Area */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-sm font-bold text-finance-lightText dark:text-finance-text">
                    {momentum.title}
                  </span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${getBadgeStyle(momentum.badge)}`}>
                    {momentum.badge}
                  </span>
                </div>
                <p className="text-xs text-finance-lightTextMuted dark:text-finance-textMuted leading-relaxed">
                  {momentum.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between text-[11px] text-finance-lightTextMuted dark:text-finance-textMuted">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-finance-success" />
          최종 업데이트 완료
        </span>
        <span className="font-semibold text-finance-primary dark:text-finance-accentLight">
          StockInsight Engine
        </span>
      </div>
    </div>
  );
}
