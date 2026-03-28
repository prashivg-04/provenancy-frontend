import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { ArrowRight } from 'lucide-react'

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
      navigate('/supervisor')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout 
      title="The Digital Ledger" 
      subtitle="Access the permanent, immutable repository of verified work records and institutional provenance."
      isLogin={true}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Input: Email */}
        <div className="space-y-2 group">
          <label 
            htmlFor="email" 
            className="block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="institutional.identity@provenancy.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground/40 focus:ring-0 focus:border-accent focus:border-b-2 transition-all outline-none text-sm"
            required
          />
        </div>

        {/* Input: Password */}
        <div className="space-y-2 group">
          <div className="flex justify-between items-end">
            <label 
              htmlFor="password" 
              className="block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors"
            >
              Password
            </label>
            <Link to="#" className="text-[10px] font-semibold text-muted-foreground hover:text-accent transition-colors uppercase tracking-widest">
              Forgot Key?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground/40 focus:ring-0 focus:border-accent focus:border-b-2 transition-all outline-none text-sm"
              required
            />
            {/* Keeping it simple with text/emoji since Stitch had visibility icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
          </div>
        </div>

        {/* Dev Role toggle helper (not in design but needed for auth engine testing) */}
        <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={() => setRole('student')}
              className={`text-[10px] px-2 py-1 rounded ${role === 'student' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} uppercase tracking-widest`}
            >
              Student
            </button>
            <button 
              type="button" 
              onClick={() => setRole('supervisor')}
              className={`text-[10px] px-2 py-1 rounded ${role === 'supervisor' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} uppercase tracking-widest`}
            >
              Supervisor
            </button>
        </div>

        {/* Primary Action */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full group relative flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold py-4 rounded-md overflow-hidden hover:bg-primary/90 transition-all duration-300"
          >
            <span className="relative z-10 text-sm tracking-wide">Login</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Footnote / Redirect */}
        <div className="pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent font-medium hover:underline underline-offset-4 ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
