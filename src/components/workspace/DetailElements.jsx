import { useState } from 'react'
import { Share2, BadgeCheck, QrCode, X, Copy, Check, Link } from 'lucide-react'
import { createPortal } from 'react-dom'

// ─── Share Modal ──────────────────────────────────────────────────────────────

function ShareModal({ url, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md bg-background border border-border/30 rounded-2xl shadow-2xl overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/15">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-primary" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Share Verified Record</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Provenancy Ledger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-muted/10 border border-border/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a permanent, public link to this verified engagement record on the Provenancy Ledger. Anyone with the link can view the verified details.
          </p>

          {/* Link box */}
          <div className="flex items-center gap-2 bg-card/40 border border-border/20 rounded-xl px-4 py-3">
            <Link className="w-3.5 h-3.5 text-primary/60 shrink-0" strokeWidth={2} />
            <span className="flex-1 text-[11px] font-mono text-muted-foreground truncate select-all">
              {url}
            </span>
            <button
              onClick={handleCopy}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                copied
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500'
                  : 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20'
              }`}
            >
              {copied ? <Check className="w-3 h-3" strokeWidth={2.5} /> : <Copy className="w-3 h-3" strokeWidth={2.5} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <p className="text-[10px] text-muted-foreground/50 leading-relaxed">
            Share this link with recruiters, institutions, or anyone who needs to verify this work record.
          </p>
        </div>

      </div>
    </div>,
    document.body
  )
}

// ─── Engagement Header ────────────────────────────────────────────────────────

export function EngagementHeader({ title, org, duration, status, refId, publicUrl }) {
  const [showShare, setShowShare] = useState(false)
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
      
      {/* Share button — only shown when verified and a publicUrl is available */}
      {isVerified && publicUrl && (
        <div className="shrink-0">
          <button
            onClick={() => setShowShare(true)}
            className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 text-sm font-medium hover:bg-primary/20 transition-all flex items-center gap-2 rounded"
          >
            <Share2 className="w-4 h-4" />
            Share Record
          </button>
        </div>
      )}

      {showShare && publicUrl && (
        <ShareModal url={publicUrl} onClose={() => setShowShare(false)} />
      )}
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
        <div className="w-12 h-12 rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center grayscale contrast-125 opacity-40">
          <span className="text-[8px] font-bold tracking-widest text-primary">SEAL</span>
        </div>
      </div>
    </div>
  )
}
