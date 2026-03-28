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
    if (formData.role === 'supervisor') {
      navigate('/supervisor')
    } else {
      navigate('/dashboard')
    }
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
            className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 ml-0.5 group-focus-within:text-accent transition-colors block"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full legal name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b border-border py-3 px-1 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 focus:border-accent focus:border-b-2 transition-all text-sm"
              required
            />
          </div>
        </div>

        {/* Institutional Email */}
        <div className="space-y-1.5 group">
          <label 
            htmlFor="email" 
            className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 ml-0.5 group-focus-within:text-accent transition-colors block"
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
              className="w-full bg-transparent border-0 border-b border-border py-3 px-1 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 focus:border-accent focus:border-b-2 transition-all text-sm"
              required
            />
          </div>
        </div>

        {/* Account Role Selection */}
        <div className="space-y-3">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 ml-0.5 block">
            Account Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer group">
              <input 
                checked={formData.role === 'student'}
                onChange={() => handleRoleChange('student')}
                className="hidden peer" 
                name="role" 
                type="radio"
              />
              <div className="flex items-center justify-center gap-2 p-3 rounded-md border border-border/30 bg-muted peer-checked:bg-primary peer-checked:border-primary group-hover:bg-card transition-all">
                <User className="w-4 h-4 text-muted-foreground peer-checked:text-primary-foreground" />
                <span className="text-xs font-medium text-muted-foreground peer-checked:text-primary-foreground">Student</span>
              </div>
            </label>

            <label className="cursor-pointer group">
              <input 
                checked={formData.role === 'supervisor'}
                onChange={() => handleRoleChange('supervisor')}
                className="hidden peer" 
                name="role" 
                type="radio"
              />
              <div className="flex items-center justify-center gap-2 p-3 rounded-md border border-border/30 bg-muted peer-checked:bg-primary peer-checked:border-primary group-hover:bg-card transition-all">
                <ShieldAlert className="w-4 h-4 text-muted-foreground peer-checked:text-primary-foreground" />
                <span className="text-xs font-medium text-muted-foreground peer-checked:text-primary-foreground">Supervisor</span>
              </div>
            </label>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5 group">
          <label 
            htmlFor="password" 
            className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 ml-0.5 group-focus-within:text-accent transition-colors block"
          >
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
              className="w-full bg-transparent border-0 border-b border-border py-3 px-1 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 focus:border-accent focus:border-b-2 transition-all text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-md hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98]"
          >
            Create Account
          </button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground font-semibold">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline decoration-1 underline-offset-4 ml-1">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
