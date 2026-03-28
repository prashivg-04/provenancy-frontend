import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Medal, User, Bell } from 'lucide-react'

export default function StudentLayout({ children, activeTitle = "Provenancy", activeSubtitle = "" }) {
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Engagements", path: "/engagements", icon: Briefcase },
    { name: "Skills", path: "/skills", icon: Medal },
    { name: "Profile", path: "/profile/my-id", icon: User }
  ]

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border/15 flex-col hidden md:flex shrink-0 bg-surface-dim">
        <div className="p-8">
          <h1 className="text-foreground font-bold text-xl tracking-tight">Provenancy</h1>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest mt-1">Institutional Work Record</p>
        </div>
        
        <nav className="mt-4 px-4 grow">
          <div className="space-y-1 relative">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-md transition-colors group ${
                    isActive 
                    ? "bg-primary-container/10 border-r-2 border-primary text-primary" 
                    : "text-muted-foreground hover:bg-muted/10 hover:text-foreground"
                  }`
                }
              >
                <link.icon className="w-5 h-5 mr-3 shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-medium">{link.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User Card */}
        <div className="p-6 border-t border-border/15">
          <div className="flex items-center gap-3">
            <img 
              alt="User" 
              src="https://images.unsplash.com/photo-1544168190-79c15427015f?auto=format&fit=crop&q=80&w=150" 
              className="w-10 h-10 rounded-full object-cover grayscale opacity-80"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-foreground">Alex Rivera</p>
              <p className="text-[10px] text-muted-foreground truncate">ID: PRV-99281</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Top Navbar */}
        <header className="h-16 shrink-0 border-b border-border/15 flex items-center justify-between px-8 bg-background/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex flex-col">
          </div>
          <div className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
            </button>
            <div className="h-8 w-px bg-border/20"></div>
            <img 
              alt="User profile" 
              src="https://images.unsplash.com/photo-1544168190-79c15427015f?auto=format&fit=crop&q=80&w=150"
              className="w-8 h-8 rounded-full border border-border/30 grayscale opacity-90 object-cover"
            />
          </div>
        </header>

        {/* Pages flow into here */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-16">
          {children}
        </main>
      </div>
    </div>
  )
}
