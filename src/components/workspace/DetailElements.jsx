import { Download, Share2, BadgeCheck, QrCode } from 'lucide-react'

export function EngagementHeader({ title, org, duration, status, refId }) {
  const isVerified = status === 'Verified'

  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-border/10">
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="bg-muted/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary flex items-center gap-2 border border-border/10">
            <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
            {status.toUpperCase()} RECORD
          </span>
          <span className="text-muted-foreground text-[11px] font-medium uppercase tracking-[0.2em]">
            Ref: #{refId}
          </span>
        </div>
        
        <h2 className="text-5xl font-bold tracking-tight text-foreground">{title}</h2>
        
        <div className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">Organization</span>
            <span className="text-lg font-medium text-foreground/80">{org}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">Duration</span>
            <span className="text-lg font-medium text-foreground/80">{duration}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">Status</span>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-md border ${isVerified ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted/10 border-border/20 text-muted-foreground'}`}>
              <BadgeCheck className="w-4 h-4" />
              <span className="text-xs font-semibold">{status}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 shrink-0">
        <button className="px-6 py-2.5 bg-muted/10 border border-border/15 text-foreground text-sm font-medium hover:bg-muted/20 transition-all flex items-center gap-2 rounded">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
        <button className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 text-sm font-medium hover:bg-primary/20 transition-all flex items-center gap-2 rounded">
          <Share2 className="w-4 h-4" />
          Share Record
        </button>
      </div>
    </section>
  )
}

export function SupervisorBlock({ supervisor, organization, verificationDate, authId }) {
  return (
    <div className="bg-background border border-primary/20 p-8 space-y-8 relative overflow-hidden group">
      {/* Decorative Light */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
      
      <div className="space-y-2 relative">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Institutional Verification</h3>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          This record has been digitally signed and verified by the host institution via Provenancy Ledger protocol.
        </p>
      </div>
      
      <div className="space-y-6 relative">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Supervisor</span>
          <p className="text-sm font-semibold text-foreground">{supervisor.name}</p>
          <p className="text-xs text-muted-foreground">{supervisor.title}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Organization</span>
          <p className="text-sm font-semibold text-foreground">{organization}</p>
        </div>
        {verificationDate && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Verification Date</span>
            <p className="text-sm font-semibold text-foreground">{verificationDate}</p>
          </div>
        )}
      </div>
      
      <div className="pt-6 border-t border-border/15 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          <QrCode className="text-primary w-4 h-4" />
          <span className="text-[10px] font-mono text-muted-foreground font-semibold tracking-wider">AUTH_ID: {authId || 'PENDING'}</span>
        </div>
        <img 
          alt="Verification Seal" 
          src="https://images.unsplash.com/photo-1614064641913-6b7140414c71?auto=format&fit=crop&q=80&w=200"
          className="w-12 h-12 rounded-full opacity-40 grayscale contrast-125 object-cover" 
        />
      </div>
    </div>
  )
}
