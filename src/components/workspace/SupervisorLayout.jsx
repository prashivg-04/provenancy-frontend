import { LayoutDashboard, FileText, User, Bell, LogOut, ShieldCheck, ChevronRight, Activity } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Logo from '../Logo'

function getInitials(name = '') {
  return name.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || '?'
}

export default function SupervisorLayout({ children }) {
  const location = useLocation()
  const { logout, profile, user } = useAuth()

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Supervisor'
  const ledgerId = profile?.ledger_id || user?.ledger_id || ''
  const initials = getInitials(displayName)

  const navLinks = [
    { name: "Dashboard", path: "/supervisor/dashboard", icon: LayoutDashboard },
    { name: "Engagement Requests", path: "/supervisor/requests", icon: FileText },
    { name: "Profile", path: "/supervisor/profile", icon: User }
  ]

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans relative selection:bg-primary/30">
      
      {/* Global Accent Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 
        =============================================
        SIDEBAR NAVIGATION
        =============================================
      */}
      <aside className="w-72 border-r border-border/20 flex-col hidden md:flex shrink-0 bg-background/50 backdrop-blur-xl z-20 relative">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none opacity-50"></div>
        
        <div className="px-8 pt-8 pb-4 relative z-10 flex flex-col justify-center gap-2">
          <Link to="/">
            <Logo textClassName="text-[17px]" iconSize={32} />
          </Link>
          <div className="flex items-center gap-2 mt-1 -ml-1">
             <div className="w-1 h-3 bg-primary/30 rounded-full"></div>
             <p className="text-[9px] text-primary uppercase tracking-[0.25em] font-bold">Verification Oracle</p>
          </div>
        </div>
        
        <nav className="mt-8 px-5 grow relative z-10 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar">
          <div className="space-y-2">
            {navLinks.map((link) => {
              // Exact match for dashboard, prefix match for others
              const isActive = link.path === '/supervisor/dashboard' 
                ? location.pathname === link.path 
                : location.pathname.startsWith(link.path);

              return (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group ${
                    isActive 
                    ? "bg-primary/15 border border-primary/30 text-primary shadow-[0_0_20px_rgba(26,35,126,0.15)]" 
                    : "border border-transparent text-muted-foreground hover:bg-muted/10 hover:border-border/30 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <link.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" strokeWidth={2} />
                    <span className="text-[13px] font-semibold tracking-wide uppercase">{link.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} />
                </Link>
              )
            })}
          </div>
        </nav>

        {/* System Integrity Indicator */}
        <div className="px-5 pb-6 mt-auto relative z-10">
          <div className="bg-background/80 p-5 rounded-xl border border-border/30 shadow-sm group hover:border-primary/40 transition-all cursor-default relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-[20px] group-hover:bg-primary/10 transition-colors"></div>
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary relative z-10 shadow-[0_0_8px_hsl(var(--primary))]"></div>
              </div>
              <span className="text-[10px] text-foreground font-bold tracking-[0.15em] uppercase">Oracle Node Sync</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed relative z-10 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-primary" /> Authority level access verified.
            </p>
          </div>
        </div>
      </aside>

      {/* 
        =============================================
        MAIN CONTENT FLOW
        =============================================
      */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background relative z-10">
        
        {/* Top Navbar */}
        <header className="h-20 shrink-0 border-b border-border/15 flex items-center justify-between px-10 bg-background/80 backdrop-blur-xl z-30">
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                 Active Root: <span className="text-foreground">Oracle Verification</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-card/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-border/30 shadow-sm">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all relative group">
              <Bell className="w-4 h-4" strokeWidth={2} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"></span>
            </button>
            
            <div className="h-5 w-px bg-border/40"></div>
            
            <div className="flex items-center gap-3 pl-2 pr-4 cursor-pointer group">
              <div className="relative">
                <div className="w-8 h-8 rounded-full border border-border/50 bg-card flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <span className="text-[10px] font-bold text-foreground">{initials}</span>
                </div>
                <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 scale-110 opacity-0 group-hover:opacity-100 transition-all"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-[11px] font-bold text-foreground leading-none tracking-wide group-hover:text-primary transition-colors">{displayName}</p>
                <p className="text-[9px] text-primary/80 tracking-widest uppercase mt-1 font-bold">{ledgerId}</p>
              </div>
            </div>

            <div className="h-5 w-px bg-border/40"></div>

            <button onClick={logout} className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all ml-1" title="Disconnect Session">
              <LogOut className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Active Page Payload */}
        <main className="flex-1 overflow-y-auto w-full flex flex-col relative">
          {/* Subtle grid pattern background for the content area */}
          <div className="absolute inset-0 bg-[#ffffff03] bg-size-[24px_24px] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--tw-colors-border) 1px, transparent 1px)' }}></div>
          {children}
        </main>
      </div>
    </div>
  )
}
