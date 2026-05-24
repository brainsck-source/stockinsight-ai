
export default function SkeletonDashboard() {
  return (
    <div className="w-full space-y-6 animate-pulse-slow">
      {/* Overview & Momentum Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Company Overview Skeleton */}
        <div className="lg:col-span-2 p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-finance-lightBorder dark:border-finance-border pb-4 mb-6">
            <div className="space-y-3 w-1/2">
              <div className="h-7 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            </div>
            <div className="space-y-2 w-1/4 text-right">
              <div className="h-8 w-full bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-md ml-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2">
                <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-5 w-4/5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Core Momentum Skeleton */}
        <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm flex flex-col justify-between">
          <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md mb-6"></div>
          <div className="space-y-4 flex-grow">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex-shrink-0"></div>
                <div className="space-y-2 flex-grow">
                  <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financials Chart Skeleton */}
      <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
        </div>
        <div className="h-64 w-full bg-slate-50 dark:bg-slate-800/20 rounded-xl flex items-end justify-between p-4 space-x-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-full flex flex-col items-center space-y-2">
              <div
                className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-t-lg"
                style={{ height: `${i * 15 + 20}%` }}
              ></div>
              <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Analysis Tabs Skeleton */}
      <div className="p-6 rounded-2xl border bg-finance-lightCard border-finance-lightBorder dark:bg-finance-card dark:border-finance-border shadow-sm">
        <div className="flex space-x-3 border-b border-finance-lightBorder dark:border-finance-border pb-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-5 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
