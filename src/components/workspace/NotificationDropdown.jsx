import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'


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
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative flex items-center" ref={dropdownRef}>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all relative group ${isOpen ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
        title="Network Notifications"
      >
        <Bell className="w-4 h-4" strokeWidth={2} />
      </button>

      {/* Flyout Panel */}
      {isOpen && (
        <div className="absolute top-[calc(100%+16px)] right-0 w-72 bg-background/95 backdrop-blur-2xl border border-border/40 shadow-2xl rounded-2xl overflow-hidden z-100 transform origin-top-right transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 bg-card/30">
            <h3 className="font-semibold text-foreground text-sm tracking-wide">Network Alerts</h3>
          </div>

          {/* Coming Soon Body */}
          <div className="px-6 py-10 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
              <Bell className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Coming Soon</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[180px]">
              Real-time notifications are not enabled in this version.
            </p>
          </div>

        </div>
      )}
    </div>
  )
}
