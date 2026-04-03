import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { User, ShieldAlert, Eye, EyeOff } from 'lucide-react'

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'student',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

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
    signup(formData.fullName, formData.email, formData.role, formData.password)
    navigate('/complete-profile')
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Establish your institutional identity on the ledger."
      isLogin={false}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-1.5 group">
          <label 
            htmlFor="fullName" 
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors block group-focus-within:text-foreground"
          >
            Full Legal Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-background/50 border border-border/50 rounded-lg py-3.5 px-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-sm hover:border-border"
              required
            />
          </div>
        </div>

        {/* Institutional Email */}
        <div className="space-y-1.5 group">
          <label 
            htmlFor="email" 
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors block group-focus-within:text-foreground"
          >
            Institutional Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@institution.edu"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-background/50 border border-border/50 rounded-lg py-3.5 px-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-sm hover:border-border"
              required
            />
          </div>
        </div>

        {/* Account Role Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 block">
            Account Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer group relative">
              <input 
                checked={formData.role === 'student'}
                onChange={() => handleRoleChange('student')}
                className="hidden peer" 
                name="role" 
                type="radio"
              />
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border/50 bg-background/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 hover:bg-card hover:border-border shadow-sm transition-all duration-200">
                <User className="w-6 h-6 text-muted-foreground peer-checked:text-primary transition-colors duration-200" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground peer-checked:text-foreground transition-colors duration-200">Candidate</span>
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </label>

            <label className="cursor-pointer group relative">
              <input 
                checked={formData.role === 'supervisor'}
                onChange={() => handleRoleChange('supervisor')}
                className="hidden peer" 
                name="role" 
                type="radio"
              />
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border/50 bg-background/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 hover:bg-card hover:border-border shadow-sm transition-all duration-200">
                <ShieldAlert className="w-6 h-6 text-muted-foreground peer-checked:text-primary transition-colors duration-200" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground peer-checked:text-foreground transition-colors duration-200">Supervisor</span>
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </label>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5 group">
          <label 
            htmlFor="password" 
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors block group-focus-within:text-foreground"
          >
            Secure Passkey
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
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

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-foreground/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98]"
          >
            Initialize Account
          </button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="mt-8 text-center border-t border-border/10 pt-6">
        <p className="text-xs font-medium text-muted-foreground">
          Already part of the network?{' '}
          <Link to="/login" className="text-foreground font-bold hover:text-primary transition-colors underline-offset-4 hover:underline ml-1">
            Authenticate here
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
