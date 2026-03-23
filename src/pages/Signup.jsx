import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'student',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (newRole) => {
    setFormData((prev) => ({
      ...prev,
      role: newRole,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('[v0] Signup attempt:', formData)
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
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Link to="/login" className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Login
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Account</h1>
              <p className="text-sm text-muted-foreground">
                Establish your institutional identity on the ledger.
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full legal name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>

              {/* Institutional Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Institutional Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@institution.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>

              {/* Account Role */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-muted-foreground block">Account Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('student')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-md border transition-all ${
                      formData.role === 'student'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border bg-transparent text-muted-foreground hover:bg-card'
                    }`}
                  >
                    <span className="text-lg">👤</span>
                    <span className="text-xs font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('supervisor')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-md border transition-all ${
                      formData.role === 'supervisor'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border bg-transparent text-muted-foreground hover:bg-card'
                    }`}
                  >
                    <span className="text-lg">🛡️</span>
                    <span className="text-xs font-medium">Supervisor</span>
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-lg"
                  >
                    {showPassword ? '👁️' : '○'}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors mt-8"
              >
                Create Account
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline decoration-1 underline-offset-2 ml-1">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Terms Notice */}
          <div className="mt-8 text-center px-4">
            <p className="text-xs text-muted-foreground/50 leading-relaxed uppercase tracking-[0.1em]">
              By continuing, you agree to the Institutional Terms of Verification. Records are immutable once committed to the Provenancy ledger.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 px-6 md:px-8 py-8 flex justify-between items-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        <div>© 2024 Provenancy Institutional Systems</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Security
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Nodes
          </a>
        </div>
      </footer>
    </div>
  )
}
