import { NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Medal, User, Bell, LogOut, ChevronRight, Fingerprint } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Logo from '../Logo'
import SystemStatusIndicator from './SystemStatusIndicator'
import NotificationDropdown from './NotificationDropdown'

function getInitials(name = '') {
  return name.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || '?'
}

export default function StudentLayout({ children, activeTitle = "Provenancy", activeSubtitle = "" }) {
  const { logout, profile, user } = useAuth()

  // Prefer profile.full_name, fall back to user.email prefix
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Student'
  const ledgerId = profile?.ledger_id || user?.ledger_id || ''
  const initials = getInitials(displayName)
  const navLinks = [
    { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { name: "My Engagements", path: "/student/engagements", icon: Briefcase },
    { name: "Skills", path: "/student/skills", icon: Medal },
    { name: "Profile", path: "/student/profile", icon: User }
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
             <p className="text-[9px] text-primary uppercase tracking-[0.25em] font-bold">Digital Ledger</p>
          </div>
        </div>
        
        <nav className="mt-8 px-5 grow relative z-10 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group ${
                    isActive 
                    ? "bg-primary/15 border border-primary/30 text-primary shadow-[0_0_20px_rgba(26,35,126,0.15)]" 
                    : "border border-transparent text-muted-foreground hover:bg-muted/10 hover:border-border/30 hover:text-foreground"
                  }`
                }
              >
                <div className="flex items-center gap-3.5">
                  <link.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" strokeWidth={2} />
                  <span className="text-[13px] font-semibold tracking-wide uppercase">{link.name}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${window.location.pathname === link.path ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} />
              </NavLink>
            ))}
          </div>
        </nav>

        {/* System Integrity Indicator */}
        <div className="px-5 pb-6 mt-auto relative z-10">
          <SystemStatusIndicator type="student" />
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
              {/* Optional Breadcrumb or Current Context area */}
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Institutional Access Level</span>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-card/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-border/30 shadow-sm">
            <NotificationDropdown />
            
            <div className="h-5 w-px bg-border/40"></div>
            
            <a 
              href={profile?.id ? `/profile/${profile.id}` : '#'}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-3 pl-2 pr-4 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full border border-border/50 bg-card flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <span className="text-[10px] font-bold text-foreground">{initials}</span>
                </div>
                <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 scale-110 opacity-0 group-hover:opacity-100 transition-all"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-[11px] font-bold text-foreground leading-none tracking-wide group-hover:text-primary transition-colors">{displayName}</p>
                <p className="text-[9px] text-muted-foreground tracking-widest uppercase mt-1">{ledgerId}</p>
              </div>
            </a>

            <div className="h-5 w-px bg-border/40"></div>

            <button onClick={logout} className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all ml-1" title="Disconnect Session">
              <LogOut className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Active Page Payload */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Subtle grid pattern background for the content area */}
          <div className="fixed inset-0 bg-[#ffffff03] bg-size-[24px_24px] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle, var(--tw-colors-border) 1px, transparent 1px)' }}></div>
          {children}
        </main>
      </div>
    </div>
  )
}
