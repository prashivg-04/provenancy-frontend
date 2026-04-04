import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'

// ── Zod Schema ────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(6, 'Password must be at least 6 characters.'),
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched', // validate on blur, then live on change
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await login(data.email, data.password)
      if (!result) return // error already shown via toast

      if (!result.profile_complete) {
        navigate('/complete-profile')
      } else if (result.role === 'supervisor') {
        navigate('/supervisor/dashboard')
      } else {
        navigate('/student/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="The Digital Ledger"
      subtitle="Access the permanent, immutable repository of verified work records and institutional provenance."
      isLogin={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

        {/* Email */}
        <div className="space-y-0 group">
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

        {/* Password */}
        <div className="space-y-0 group">
          <div className="flex justify-between items-end mb-1.5">
            <label
              htmlFor="password"
              className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 transition-colors group-focus-within:text-foreground"
            >
              Secure Passkey
            </label>
            <Link
              to="#"
              className="text-[9px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              Recovery Protocol
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              autoComplete="current-password"
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
                Authenticating...
              </>
            ) : (
              'Authenticate Identity'
            )}
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center border-t border-border/10 pt-6">
        <p className="text-xs font-medium text-muted-foreground">
          Unverified entity?{' '}
          <Link
            to="/signup"
            className="text-foreground font-bold hover:text-primary transition-colors underline-offset-4 hover:underline ml-1"
          >
            Initialize here
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
