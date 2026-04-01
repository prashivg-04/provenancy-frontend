import { ShieldCheck } from 'lucide-react'

export default function ListItem({ variant = 'student', data }) {
  if (variant === 'student') {
    const { title, organization, duration, dateRange, supervisorName, verificationDate } = data
    return (
      <article className="group relative p-8 mb-6 bg-card/10 backdrop-blur-sm transition-all border border-border/20 rounded-2xl hover:bg-card/30 hover:shadow-[0_0_25px_rgba(26,35,126,0.05)] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary/50 group-hover:h-3/4 transition-all duration-300 rounded-r-md"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-light text-foreground group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-lg font-medium text-muted-foreground">{organization}</p>
          </div>
          <div className="text-left md:text-right pt-2 md:pt-0">
            <p className="text-sm font-semibold text-foreground/80">{duration}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">{dateRange}</p>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-wrap items-center gap-x-12 gap-y-4 pt-6 mt-6 border-t border-border/15">
          <div className="space-y-1.5 flex-1 min-w-[150px]">
            <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold block">Verifying Authority</span>
            <span className="text-sm font-medium text-foreground">{supervisorName}</span>
          </div>
          <div className="space-y-1.5 flex-1 min-w-[150px]">
            <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold block">Verification Timestamp</span>
            <span className="text-sm font-medium text-foreground font-mono">{verificationDate}</span>
          </div>
          <div className="md:ml-auto flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md border border-primary/20">
            <ShieldCheck className="text-primary w-4 h-4" strokeWidth={2.5} />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]">Verified Node</span>
          </div>
        </div>
      </article>
    )
  }

  // Supervisor Variant
  const { studentName, role, projectName, hash, organization, date } = data
  return (
    <>
      <div className="group grid md:grid-cols-[1fr_200px_150px] items-center py-8 px-4 transition-colors hover:bg-muted/10">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-lg font-medium text-foreground">{studentName}</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-secondary border border-border/10 text-secondary-foreground tracking-tighter uppercase font-bold">
              {role}
            </span>
          </div>
          <p className="text-sm text-foreground/80">{projectName}</p>
          <p className="text-xs text-muted-foreground/60 font-mono italic">Hash: {hash}</p>
        </div>
        <div className="text-sm text-muted-foreground font-medium py-4 md:py-0">
          {organization}
        </div>
        <div className="md:text-right flex flex-col md:items-end gap-2">
          <span className="text-sm font-mono text-muted-foreground/80">{date}</span>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-muted border border-border/5">
            <ShieldCheck className="text-primary w-3 h-3" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Signed</span>
          </div>
        </div>
      </div>
      <div className="h-px bg-linear-to-r from-border/20 via-border/10 to-transparent"></div>
    </>
  )
}
