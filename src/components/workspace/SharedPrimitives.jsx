import { Box } from 'lucide-react'

// Layout Wrapper
export function PageContainer({ children, className = "" }) {
  return (
    <div className={`p-8 md:p-12 w-full max-w-6xl mx-auto space-y-12 ${className}`}>
      {children}
    </div>
  )
}

// Ledger Status Identifier
export function StatusBadge({ status, className = "" }) {
  const normStatus = status?.toUpperCase() || "PENDING";
  
  let styles = ""
  let dotAnimation = ""
  
  switch(normStatus) {
    case 'VERIFIED':
    case 'ACCEPTED':
      styles = "bg-primary/10 border-primary/20 text-primary"
      dotAnimation = "animate-pulse shadow-[0_0_8px_hsl(var(--primary))]"
      break;
    case 'REJECTED':
      styles = "bg-destructive/10 border-destructive/20 text-destructive"
      break;
    case 'PENDING':
    default:
      styles = "bg-muted/10 border-border/20 text-muted-foreground"
      break;
  }

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${styles} ${className}`}>
      {normStatus === 'VERIFIED' && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current ${dotAnimation}`}></span>
      )}
      {normStatus}
    </span>
  )
}

// Standardized missing data / empty view
export function EmptyState({ icon: Icon = Box, title, description, actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center border border-border/10 rounded-xl bg-muted/5 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center border border-border/10 mb-6">
        <Icon className="w-8 h-8 text-muted-foreground/50 stroke-[1.5]" />
      </div>
      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground mb-4">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-8">
        {description}
      </p>
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="px-8 py-3 bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest text-[10px] font-bold rounded hover:bg-primary hover:text-primary-foreground transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}
