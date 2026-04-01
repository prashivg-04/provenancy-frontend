import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('student')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password, role)
    if (role === 'supervisor') {
      navigate('/supervisor/dashboard')
    } else {
      navigate('/student/dashboard')
    }
  }

  return (
    <AuthLayout 
      title="The Digital Ledger" 
      subtitle="Access the permanent, immutable repository of verified work records and institutional provenance."
      isLogin={true}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input: Email */}
        <div className="space-y-1.5 group">
          <label 
            htmlFor="email" 
            className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors group-focus-within:text-foreground"
          >
            Institutional Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="name@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg py-3.5 px-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-sm hover:border-border"
              required
            />
          </div>
        </div>

        {/* Input: Password */}
        <div className="space-y-1.5 group">
          <div className="flex justify-between items-end mb-1.5">
            <label 
              htmlFor="password" 
              className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors group-focus-within:text-foreground"
            >
              Secure Passkey
            </label>
            <Link to="#" className="text-[9px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.1em]">
              Recovery Protocol
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg py-3.5 px-4 pr-12 text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm hover:border-border tracking-wider"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-border/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dev Role toggle helper (not in design but needed for auth engine testing) */}
        <div className="flex items-center justify-between pt-2 border-t border-border/10 mt-6 pb-2">
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Dev Environment Role:</span>
            <div className="flex gap-1 bg-background/50 p-1 rounded-md border border-border/50">
              <button 
                type="button" 
                onClick={() => setRole('student')}
                className={`text-[9px] px-3 py-1.5 rounded-sm transition-all duration-200 font-bold ${role === 'student' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'} uppercase tracking-widest`}
              >
                Candidate
              </button>
              <button 
                type="button" 
                onClick={() => setRole('supervisor')}
                className={`text-[9px] px-3 py-1.5 rounded-sm transition-all duration-200 font-bold ${role === 'supervisor' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'} uppercase tracking-widest`}
              >
                Supervisor
              </button>
            </div>
        </div>

        {/* Primary Action */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-foreground/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98]"
          >
            Authenticate Identity
          </button>
        </div>
      </form>
      
      {/* Footnote / Redirect */}
      <div className="mt-8 text-center border-t border-border/10 pt-6">
        <p className="text-xs font-medium text-muted-foreground">
          Unverified entity?{' '}
          <Link to="/signup" className="text-foreground font-bold hover:text-primary transition-colors underline-offset-4 hover:underline ml-1">
            Initialize here
          </Link>
        </p>
      </div>

    </AuthLayout>
  )
}
