import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="h-20 flex items-center justify-between px-6 border-b border-border/10 bg-background/70 backdrop-blur-xl sticky top-0 z-50">
      
      {/* Left side: Logo */}
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-primary/30 transition-colors">
            <ShieldCheck className="text-primary w-5 h-5" />
          </div>
          <span className="font-medium text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
            Provenancy
          </span>
        </Link>
        
        {/* Intermediary Links (Desktop only) */}
        {!user && (
          <div className="hidden lg:flex items-center gap-8 ml-8">
            <a href="#" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold hover:text-foreground transition-colors">Platform</a>
            <a href="#" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold hover:text-foreground transition-colors">Institutions</a>
            <a href="#" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold hover:text-foreground transition-colors">Attestation</a>
            <a href="#" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold hover:text-foreground transition-colors">Network</a>
          </div>
        )}
      </div>

      {/* Right side: Auth Links */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground hidden sm:inline-block">
              {user.email || 'Verified User'}
            </span>
            <Link 
              to={user?.role === 'supervisor' ? '/supervisor/dashboard' : '/student/dashboard'} 
              className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
            >
              Dashboard
            </Link>
            <button 
              onClick={logout}
              className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 border border-border/50 text-muted-foreground rounded-md hover:bg-border hover:text-foreground transition-all shadow-sm"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="hidden sm:flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_20px_rgba(26,35,126,0.3)] hover:-translate-y-0.5 transition-all shadow-sm">
              Create Ledger <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
