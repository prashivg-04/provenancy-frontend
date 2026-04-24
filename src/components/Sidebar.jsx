import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  
  // Choose links based on user role (defaulting to student paths if unauthenticated)
  const isSupervisor = user?.role === 'supervisor'
  
  const navLinks = isSupervisor ? [
    { label: 'Dashboard', path: '/supervisor/dashboard' },
    { label: 'Requests', path: '/supervisor/requests' },
  ] : [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Engagements', path: '/engagements' },
    { label: 'Skills', path: '/skills' },
    { label: 'Profile', path: '/profile' },
  ]

  return (
    <aside className="w-64 border-r border-border/20 bg-card hidden md:flex flex-col shrink-0">
      <div className="px-6 py-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          {isSupervisor ? 'Supervisor Workspace' : 'Student Workspace'}
        </p>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="mt-4 w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
