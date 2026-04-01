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
      <header className="mb-16 relative overflow-hidden bg-card/40 backdrop-blur-xl p-10 lg:p-14 rounded-3xl border border-border/30 shadow-[0_0_40px_rgba(0,0,0,0.1)] group">
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-primary/10 blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full shadow-[0_0_15px_rgba(26,35,126,0.15)]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Cryptographically Verified Identity</span>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-3">{name}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">{role}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-3 text-left md:text-right bg-background/50 p-6 rounded-2xl border border-border/20 backdrop-blur-md">
            <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-bold">Immutable Ledger ID</span>
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]"></span>
               <span className="font-mono text-sm md:text-base text-foreground tracking-wider">{idToken}</span>
            </div>
          </div>
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
