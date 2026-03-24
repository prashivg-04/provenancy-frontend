import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-border/20 bg-background">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-foreground font-bold">✓</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Provenancy</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/signup" className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Signup
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 bg-background relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-transparent blur-3xl"></div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md z-10">
          <div className="bg-card rounded-lg border border-border/20 shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Secure Access</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">The Digital Ledger</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access the permanent, immutable repository of verified work records and institutional provenance.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Login As
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-3 rounded-md border transition-all text-xs font-medium ${
                      role === 'student'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card border-border hover:border-primary text-foreground'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('supervisor')}
                    className={`p-3 rounded-md border transition-all text-xs font-medium ${
                      role === 'supervisor'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card border-border hover:border-primary text-foreground'
                    }`}
                  >
                    Supervisor
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="institutional.identity@provenancy.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Password
                  </label>
                  <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
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
                    className="w-full bg-transparent border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? '✓' : '○'}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors mt-8 flex items-center justify-center gap-2"
              >
                Login
                <span>→</span>
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-semibold hover:underline decoration-1 underline-offset-2 ml-1">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Verification Notice */}
          <div className="mt-8 text-center px-4">
            <p className="text-xs text-muted-foreground/50 uppercase tracking-widest">
              ● END-TO-END CRYPTOGRAPHIC VERIFICATION ACTIVE
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 px-6 md:px-8 py-8 flex justify-between items-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        <div>System Status: Operational</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            Protocol: v4.1.2
          </a>
        </div>
        <div>© 2024 Provenancy Institutional Archives. All Rights Reserved.</div>
      </footer>
    </div>
  )
}
