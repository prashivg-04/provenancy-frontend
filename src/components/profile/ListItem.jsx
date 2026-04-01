import { ShieldCheck } from 'lucide-react'

export default function ListItem({ variant = 'student', data }) {
  if (variant === 'student') {
    const { title, organization, duration, dateRange, supervisorName, verificationDate } = data
    return (
      <article className="group relative py-8 space-y-6 transition-all border-b border-border/10 hover:border-primary/30">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            <p className="text-lg text-foreground">{organization}</p>
          </div>
          <div className="text-left md:text-right pt-2 md:pt-0">
            <p className="text-sm font-medium text-muted-foreground">{duration}</p>
            <p className="text-[11px] text-muted-foreground/60 uppercase tracking-widest mt-1">{dateRange}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-4 pt-4 px-6 py-4 bg-muted/30 rounded-md border border-border/5">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest block">Supervisor</span>
            <span className="text-sm font-medium text-foreground">{supervisorName}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest block">Verification Date</span>
            <span className="text-sm font-medium text-foreground">{verificationDate}</span>
          </div>
          <div className="md:ml-auto flex items-center gap-2">
            <ShieldCheck className="text-primary w-4 h-4" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Verified</span>
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
