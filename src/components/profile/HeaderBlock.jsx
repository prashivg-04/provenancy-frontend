import { ShieldCheck } from 'lucide-react'

export default function HeaderBlock({
  variant = 'student',
  badgeText,
  name,
  role,
  organization, // for supervisor
  idToken,
  verifiedSince, // for supervisor
  totalAttestations // for supervisor
}) {
  if (variant === 'student') {
    return (
      <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 bg-linear-to-b from-primary/5 to-transparent p-8 rounded-xl border border-border/10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-border/10">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--primary))]"></span>
            {badgeText || 'Identity Verified'}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground">{name}</h1>
          <p className="text-xl text-muted-foreground font-light">{role}</p>
        </div>
        <div className="flex flex-col md:items-end gap-2 text-left md:text-right">
          <span className="text-[10px] text-muted-foreground/60 tracking-widest uppercase font-semibold">Verified Record ID</span>
          <span className="font-mono text-sm text-foreground">{idToken}</span>
        </div>
      </header>
    )
  }

  return (
    <section className="mb-20">
      <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-end">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border/20">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] animate-pulse"></span>
            <span className="text-[0.6875rem] font-medium tracking-widest text-muted-foreground uppercase">{badgeText || 'Institutional Verifier'}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
            {name}
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-xl text-primary font-medium">{role}</p>
            <p className="text-muted-foreground font-light tracking-wide">{organization}</p>
          </div>
        </div>

        {/* Institutional Metadata Sidebar Style */}
        <div className="bg-card p-6 rounded-lg border border-border/10 space-y-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[0.625rem] text-muted-foreground/80 font-semibold tracking-tighter uppercase">ID Token</span>
            <p className="font-mono text-xs text-foreground/90">{idToken}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[0.625rem] text-muted-foreground/80 font-semibold tracking-tighter uppercase">Verified Since</span>
            <p className="text-sm font-medium text-foreground">{verifiedSince}</p>
          </div>
          <div className="pt-4 border-t border-border/10">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold">{totalAttestations} Total Attestations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
