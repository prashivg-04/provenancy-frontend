import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="h-16 flex items-center justify-between px-6 border-b border-border/20 bg-background sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold leading-none select-none">✓</span>
          </div>
          <span className="font-semibold text-lg tracking-tight hover:text-primary transition-colors">Provenancy</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              {user.email || 'Verified User'}
            </span>
            <button 
              onClick={logout}
              className="text-sm px-4 py-2 border border-border rounded hover:bg-card hover:text-primary transition-all shadow-sm"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-sm px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary/20 transition-all shadow-sm font-medium">
              Join Ledger
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
