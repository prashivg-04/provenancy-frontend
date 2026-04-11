import { useState, useEffect, useCallback } from 'react'
import { Activity } from 'lucide-react'
import api from '../../lib/api'

export default function SystemStatusIndicator({ type = 'student' }) {
  const [isBrowserOnline, setIsBrowserOnline] = useState(navigator.onLine)
  const [isBackendOnline, setIsBackendOnline] = useState(true)

  const checkBackendHealth = useCallback(async () => {
    if (!navigator.onLine) return
    try {
      const res = await api.get('/health')
      if (res.status === 200) setIsBackendOnline(true)
      else setIsBackendOnline(false)
    } catch (error) {
      setIsBackendOnline(false)
    }
  }, [])

  useEffect(() => {
    const handleOnline = () => {
      setIsBrowserOnline(true)
      checkBackendHealth()
    }
    const handleOffline = () => {
      setIsBrowserOnline(false)
      setIsBackendOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Initial check
    checkBackendHealth()

    // Poll every 30 seconds
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
         checkBackendHealth()
      }
    }, 30000)

    // Re-check when user focuses window
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkBackendHealth()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(interval)
    }
  }, [checkBackendHealth])

  let state = 'online'
  if (!isBrowserOnline) state = 'local_offline'
  else if (!isBackendOnline) state = 'server_offline'

  const content = type === 'supervisor' ? {
    title: 'Oracle Node Sync',
    online: {
      text: 'Authority Validation',
      status: 'Verified',
      tooltip: 'Systems normal. Cryptographic verification layer is fully synced and operational.',
      icon: <Activity className="w-3.5 h-3.5 text-primary shrink-0 opacity-80" />
    },
    local_offline: {
      text: 'Local connection lost',
      status: 'Offline',
      tooltip: 'Network connection lost. Please check your internet connection to continue validating.',
      icon: <Activity className="w-3.5 h-3.5 text-red-500 shrink-0 opacity-80" />
    },
    server_offline: {
      text: 'Core Node Unreachable',
      status: 'Degraded',
      tooltip: 'Backend service unreachable. Experiencing temporary latency or maintenance.',
      icon: <Activity className="w-3.5 h-3.5 text-orange-500 shrink-0 opacity-80" />
    }
  } : {
    title: 'Network Node',
    online: {
      text: 'Ledger Synchronization',
      status: 'Synced',
      tooltip: 'Systems normal. Engagement ledger is fully synchronized with the core network.',
      icon: null
    },
    local_offline: {
      text: 'Local network down',
      status: 'Offline',
      tooltip: 'Network connection lost. Please check your internet connection to sync your ledger.',
      icon: null
    },
    server_offline: {
      text: 'Ledger API unresponsive',
      status: 'Degraded',
      tooltip: 'Backend service unreachable. Institutional ledger operations are temporarily degraded.',
      icon: null
    }
  }

  const activeContent = content[state]

  let bgClass = 'bg-primary/5 group-hover:bg-primary/10'
  let pingClass = 'bg-primary/40'
  let dotClass = 'bg-primary shadow-[0_0_8px_hsl(var(--primary))]'
  let badgeColorClass = 'bg-primary/10 text-primary border-primary/30 shadow-[0_0_8px_rgba(26,35,126,0.15)]'
  
  if (state === 'local_offline') {
    bgClass = 'bg-red-500/5 group-hover:bg-red-500/10'
    pingClass = 'bg-red-500/40'
    dotClass = 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
    badgeColorClass = 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
  } else if (state === 'server_offline') {
    bgClass = 'bg-orange-500/5 group-hover:bg-orange-500/10'
    pingClass = 'bg-orange-500/40'
    dotClass = 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
    badgeColorClass = 'bg-orange-500/10 text-orange-500 border-orange-500/30 shadow-[0_0_8px_rgba(249,115,22,0.15)]'
  }
  
  return (
    <div className="bg-background/80 p-5 rounded-xl border border-border/30 shadow-sm group hover:border-border/60 transition-all cursor-default relative overflow-hidden min-h-[96px]">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[20px] transition-colors ${bgClass}`}></div>
      
      {/* Default State */}
      <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="relative flex items-center justify-center w-2 h-2">
            {/* We animate ping only if the system is attempting to reach out / is active */}
            <div className={`absolute inset-0 rounded-full ${state === 'online' ? 'animate-ping' : ''} ${pingClass}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full relative z-10 ${dotClass}`}></div>
          </div>
          <span className="text-[10px] text-foreground font-bold tracking-[0.15em] uppercase">{activeContent.title}</span>
        </div>
        
        {/* Sleek Status Readout Footer */}
        <div className="flex items-center justify-between gap-3 pt-3 mt-1 border-t border-border/30 relative z-10">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/80 font-medium tracking-wide">
            {activeContent.icon}
            <span>{activeContent.text}</span>
          </div>
          <div className={`px-2 py-0.5 rounded-md text-[9px] uppercase tracking-[0.15em] font-bold border backdrop-blur-sm ${badgeColorClass}`}>
            {activeContent.status}
          </div>
        </div>
      </div>

      {/* Hover State Popover */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-2 pointer-events-none">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md"></div>
        <p className="relative z-10 text-[11px] font-medium text-foreground leading-relaxed text-center drop-shadow-sm px-1">
          {activeContent.tooltip}
        </p>
      </div>
    </div>
  )
}
