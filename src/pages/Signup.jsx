import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { User, ShieldAlert, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'

// ── Zod Schema ────────────────────────────────────────────────────────────────

const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required.')
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Include at least one uppercase letter.')
    .regex(/[0-9]/, 'Include at least one number.'),
  role: z.enum(['student', 'supervisor']),
})

// ── Inline field error ────────────────────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="flex items-center gap-1.5 mt-1.5 ml-1 text-[10px] font-bold uppercase tracking-widest text-red-400/90 animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {message}
    </p>
  )
}

// ── Password strength meter ───────────────────────────────────────────────────

function PasswordStrength({ password }) {
  if (!password) return null

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length

  const levels = [
    { label: 'Weak', color: 'bg-red-500' },
    { label: 'Fair', color: 'bg-amber-400' },
    { label: 'Good', color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ]
  const level = levels[score - 1] ?? levels[0]

  return (
    <div className="mt-2 ml-1">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
              i < score ? level.color : 'bg-border/30'
            }`}
          />
        ))}
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-widest ${
        score <= 1 ? 'text-red-400/80' :
        score === 2 ? 'text-amber-400/80' :
        score === 3 ? 'text-yellow-400/80' :
        'text-emerald-500/80'
      }`}>
        {level.label} passkey
      </span>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'student' },
    mode: 'onTouched',
  })

  const role = watch('role')
  const password = watch('password')

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const success = await signup(data.fullName, data.email, data.password, data.role)
      if (success) navigate('/complete-profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Establish your institutional identity on the ledger."
      isLogin={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

        {/* Full Name */}
        <div className="group">
          <label
            htmlFor="fullName"
            className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 mb-1.5 transition-colors group-focus-within:text-foreground"
          >
            Full Legal Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. John Doe"
            autoComplete="name"
            disabled={loading}
            {...register('fullName')}
            className={`w-full bg-background/50 border rounded-lg py-3.5 px-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-all font-medium shadow-sm hover:border-border ${
              errors.fullName
                ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50'
                : 'border-border/50 focus:ring-primary/50 focus:border-primary/50'
            }`}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        {/* Email */}
        <div className="group">
          <label
            htmlFor="email"
            className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 mb-1.5 transition-colors group-focus-within:text-foreground"
          >
            Institutional Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@institution.edu"
            autoComplete="email"
            disabled={loading}
            {...register('email')}
            className={`w-full bg-background/50 border rounded-lg py-3.5 px-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-all font-medium shadow-sm hover:border-border ${
              errors.email
                ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50'
                : 'border-border/50 focus:ring-primary/50 focus:border-primary/50'
            }`}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Role selector */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 mb-2">
            Account Role
          </label>
          <input type="hidden" {...register('role')} />
          <div className="grid grid-cols-2 gap-3">
            {/* Student tile */}
            <button
              type="button"
              disabled={loading}
              onClick={() => setValue('role', 'student', { shouldValidate: true })}
              className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 shadow-sm ${
                role === 'student'
                  ? 'bg-primary/10 border-primary/50 text-foreground'
                  : 'bg-background/30 border-border/50 text-muted-foreground hover:bg-card hover:border-border'
              }`}
            >
              <User className={`w-6 h-6 transition-colors ${role === 'student' ? 'text-primary' : ''}`} />
              <span className="text-xs font-bold uppercase tracking-widest">Candidate</span>
              {role === 'student' && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
              )}
            </button>

            {/* Supervisor tile */}
            <button
              type="button"
              disabled={loading}
              onClick={() => setValue('role', 'supervisor', { shouldValidate: true })}
              className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 shadow-sm ${
                role === 'supervisor'
                  ? 'bg-primary/10 border-primary/50 text-foreground'
                  : 'bg-background/30 border-border/50 text-muted-foreground hover:bg-card hover:border-border'
              }`}
            >
              <ShieldAlert className={`w-6 h-6 transition-colors ${role === 'supervisor' ? 'text-primary' : ''}`} />
              <span className="text-xs font-bold uppercase tracking-widest">Supervisor</span>
              {role === 'supervisor' && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="group">
          <label
            htmlFor="password"
            className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 mb-1.5 transition-colors group-focus-within:text-foreground"
          >
            Secure Passkey
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 chars, 1 uppercase, 1 number"
              autoComplete="new-password"
              disabled={loading}
              {...register('password')}
              className={`w-full bg-background/50 border rounded-lg py-3.5 px-4 pr-12 text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-all shadow-sm hover:border-border tracking-wider ${
                errors.password
                  ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50'
                  : 'border-border/50 focus:ring-primary/50 focus:border-primary/50'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-border/50 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
          <PasswordStrength password={password} />
        </div>

        {/* Submit */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-foreground/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Initializing...
              </>
            ) : (
              'Initialize Account'
            )}
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center border-t border-border/10 pt-6">
        <p className="text-xs font-medium text-muted-foreground">
          Already part of the network?{' '}
          <Link
            to="/login"
            className="text-foreground font-bold hover:text-primary transition-colors underline-offset-4 hover:underline ml-1"
          >
            Authenticate here
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
