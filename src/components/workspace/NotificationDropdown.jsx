import { useState, useRef, useEffect } from 'react'
import { Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react'

// Dummy data for purely visual demonstration
const sampleNotifications = [
  { 
    id: 1, 
    type: 'success', 
    title: 'Skill Validation Complete', 
    message: 'Your certification for "Advanced Distributed Systems" has been verified and permanently added to the chain.', 
    time: '4 mins ago', 
    read: false 
  },
  { 
    id: 2, 
    type: 'alert', 
    title: 'Node Sync Notice', 
    message: 'Temporary delay detected in secondary nodes. Integrity remains unaffected.', 
    time: '2 hours ago', 
    read: false 
  },
  { 
    id: 3, 
    type: 'info', 
    title: 'System Firmware Update', 
    message: 'Platform v2.4 successfully deployed. Check your dashboard for new ledger analytics features.', 
    time: '1 day ago', 
    read: true 
  }
]

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const unreadCount = sampleNotifications.filter(n => !n.read).length

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all relative group ${isOpen ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
        title="Network Notifications"
      >
        <Bell className="w-4 h-4" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[hsl(var(--primary))] rounded-full shadow-[0_0_8px_hsl(var(--primary))] animate-pulse"></span>
        )}
      </button>

{/* Flyout Panel */}
      {isOpen && (
        <div className="absolute top-[calc(100%+16px)] right-0 w-80 sm:w-96 bg-background/95 backdrop-blur-2xl border border-border/40 shadow-2xl rounded-2xl overflow-hidden z-100 transform origin-top-right transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 bg-card/30">
            <h3 className="font-semibold text-foreground text-sm tracking-wide">Network Alerts</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest shadow-[inset_0_0_8px_rgba(var(--primary),0.1)]">
                {unreadCount} New
              </span>
            )}
          </div>

          {/* Render List */}
          <div className="max-h-[360px] overflow-y-auto no-scrollbar bg-card/10">
            {sampleNotifications.length > 0 ? (
              <div className="flex flex-col">
                {sampleNotifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border-b border-border/10 flex gap-4 transition-colors hover:bg-card/40 ${notif.read ? 'opacity-80' : 'bg-primary/5'}`}>
                    
                    {/* Icon Column */}
                    <div className="shrink-0 mt-0.5">
                      {notif.type === 'success' && <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /></div>}
                      {notif.type === 'alert' && <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20"><AlertCircle className="w-3.5 h-3.5 text-orange-500" /></div>}
                      {notif.type === 'info' && <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"><Info className="w-3.5 h-3.5 text-primary" /></div>}
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <p className={`text-xs font-bold leading-tight ${notif.read ? 'text-foreground/80' : 'text-foreground'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[9px] font-medium text-muted-foreground whitespace-nowrap pt-0.5">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{notif.message}</p>
                    </div>

                    {/* Unread indicator dot */}
                    {!notif.read && (
                      <div className="shrink-0 flex pt-1 w-1.5 justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))] animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center flex flex-col items-center justify-center">
                <Bell className="w-8 h-8 text-muted-foreground/30 mb-3" strokeWidth={1} />
                <p className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground">Log Empty</p>
              </div>
            )}
          </div>
          
          {/* Footer Action */}
          <div className="p-3 border-t border-border/20 bg-card/30 text-center">
            <button className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]">
              Mark all as seen
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
