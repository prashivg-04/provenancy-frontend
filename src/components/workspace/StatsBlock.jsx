export function StatsBlock({ title, activeStat, subStat, highlight, className = "" }) {
  return (
    <div className={`p-6 rounded-xl border border-border/5 flex flex-col justify-between h-40 ${highlight ? 'bg-muted/30 border-l-[3px] border-l-primary' : 'bg-muted/10'} ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{title}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl md:text-5xl font-light text-foreground">{activeStat}</span>
        {subStat && <span className="text-primary text-sm font-medium">{subStat}</span>}
      </div>
    </div>
  )
}
