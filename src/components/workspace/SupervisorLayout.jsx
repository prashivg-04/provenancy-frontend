import { LayoutDashboard, FileText, User, Bell, LogOut, ShieldCheck } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function SupervisorLayout({ children }) {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-muted/5 border-r border-border/10 flex flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-sm bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="text-primary w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-foreground">Provenancy</h1>
          </div>
          <p className="text-xs text-muted-foreground px-1 uppercase tracking-widest mt-2 font-bold">Supervisor Workspace</p>
        </div>

        <div className="px-6 mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold">Ledger Controls</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <Link
            to="/supervisor"
            className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all group ${
              location.pathname === '/supervisor' 
                ? 'bg-primary/10 border-l-2 border-primary text-primary' 
                : 'text-muted-foreground hover:bg-muted/10 hover:text-foreground border-l-2 border-transparent'
            }`}
          >
            <LayoutDashboard className="w-[20px] h-[20px]" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          
          <Link
            to="/supervisor/requests"
            className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all group ${
              location.pathname === '/supervisor/requests' 
                ? 'bg-primary/10 border-l-2 border-primary text-primary' 
                : 'text-muted-foreground hover:bg-muted/10 hover:text-foreground border-l-2 border-transparent'
            }`}
          >
            <FileText className="w-[20px] h-[20px]" />
            <span className="font-medium text-sm">Engagement Requests</span>
          </Link>

          <Link
            to={`/supervisor/prv-vance`} // Generic routing to previous supervisor profile
            className="flex items-center gap-4 px-4 py-3 rounded-md text-muted-foreground hover:bg-muted/10 hover:text-foreground transition-all group border-l-2 border-transparent"
          >
            <User className="w-[20px] h-[20px]" />
            <span className="font-medium text-sm">Profile</span>
          </Link>
        </nav>

        <div className="p-6 mt-auto border-t border-border/10">
          <div className="bg-muted/5 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]"></div>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">System Integrity</span>
            </div>
            <p className="text-[11px] text-muted-foreground/70">Last block validated 2m ago. Node status: Stable.</p>
          </div>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Topbar */}
        <header className="h-16 border-b border-border/15 flex items-center justify-between px-12 bg-background/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Path:</span>
            <span className="text-foreground text-sm font-medium">
              {location.pathname === '/supervisor' ? 'Dashboard' : 'Engagement Requests'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border border-background"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-border/15">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-semibold text-foreground">Dr. Julian Vance</span>
                <span className="text-[10px] text-primary/80 uppercase tracking-widest font-bold">Verified Admin</span>
              </div>
              <img 
                className="w-8 h-8 rounded-md object-cover ring-1 ring-border/30" 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150" 
                alt="Supervisor Profile" 
              />
              <Link to="/login" className="text-muted-foreground hover:text-destructive transition-colors ml-2">
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Scrollable Main Window */}
        <main className="flex-1 overflow-y-auto w-full flex flex-col">
          {children}
        </main>
      </div>

    </div>
  )
}
