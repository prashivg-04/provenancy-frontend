import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'

export default function SystemStatusIndicator({ type = 'student' }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const content = type === 'supervisor' ? {
    title: 'Oracle Node Sync',
    online: {
      text: 'Authority Validation',
      status: 'Verified',
      icon: <Activity className="w-3.5 h-3.5 text-primary shrink-0 opacity-80" />
    },
    offline: {
      text: 'Authority Validation',
      status: 'Halted',
      icon: <Activity className="w-3.5 h-3.5 text-red-500 shrink-0 opacity-80" />
    }
  } : {
    title: 'Network Node',
    online: {
      text: 'Ledger Synchronization',
      status: 'Synced',
      icon: null
    },
    offline: {
      text: 'Ledger Synchronization',
      status: 'Paused',
      icon: null
    }
  }

  const bgClass = isOnline ? 'bg-primary/5 group-hover:bg-primary/10' : 'bg-red-500/5 group-hover:bg-red-500/10'
  const pingClass = isOnline ? 'bg-primary/40' : 'bg-red-500/40'
  const dotClass = isOnline ? 'bg-primary shadow-[0_0_8px_hsl(var(--primary))]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
  
  return (
    <div className="bg-background/80 p-5 rounded-xl border border-border/30 shadow-sm group hover:border-border/60 transition-all cursor-default relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[20px] transition-colors ${bgClass}`}></div>
      
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="relative flex items-center justify-center w-2 h-2">
          {/* We only ping if online (or we can ping red if offline, up to design, let's keep pinging red to show it's trying to connect) */}
          <div className={`absolute inset-0 rounded-full ${isOnline ? 'animate-ping' : ''} ${pingClass}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full relative z-10 ${dotClass}`}></div>
        </div>
        <span className="text-[10px] text-foreground font-bold tracking-[0.15em] uppercase">{content.title}</span>
      </div>
      
      {/* Sleek Status Readout Footer */}
      <div className="flex items-center justify-between gap-3 pt-3 mt-1 border-t border-border/30 relative z-10">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/80 font-medium tracking-wide">
          {isOnline ? content.online.icon : content.offline.icon}
          <span>{isOnline ? content.online.text : content.offline.text}</span>
        </div>
        <div className={`px-2 py-0.5 rounded-md text-[9px] uppercase tracking-[0.15em] font-bold border backdrop-blur-sm ${
          isOnline 
            ? 'bg-primary/10 text-primary border-primary/30 shadow-[0_0_8px_rgba(26,35,126,0.15)]' 
            : 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
        }`}>
          {isOnline ? content.online.status : content.offline.status}
        </div>
      </div>
    </div>
  )
}
