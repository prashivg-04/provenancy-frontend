import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Network,
  Building2,
  UserCircle2,
  CheckCircle2,
  Linkedin,
  Globe,
  BookOpen,
} from 'lucide-react'

// ── Reusable field components (auth-layout style, not workspace style) ──────

function OnboardingInput({ label, id, type = 'text', placeholder, value, onChange, required = false }) {
  return (
    <div className="space-y-1.5 group">
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors group-focus-within:text-foreground"
      >
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-background/50 border border-border/50 rounded-lg py-3.5 px-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-sm hover:border-border"
      />
    </div>
  )
}

function OnboardingTextarea({ label, id, placeholder, value, onChange }) {
  return (
    <div className="space-y-1.5 group">
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors group-focus-within:text-foreground"
      >
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full bg-background/50 border border-border/50 rounded-lg py-3.5 px-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-sm hover:border-border resize-none"
      />
    </div>
  )
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full border text-[10px] font-bold transition-all duration-300 ${
              i < currentStep
                ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]'
                : i === currentStep
                ? 'border-primary/60 text-primary bg-primary/10'
                : 'border-border/40 text-muted-foreground/50 bg-transparent'
            }`}
          >
            {i < currentStep ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`h-px w-10 transition-all duration-500 ${
                i < currentStep ? 'bg-primary/60' : 'bg-border/30'
              }`}
            />
          )}
        </div>
      ))}
      <span className="text-[10px] font-mono text-muted-foreground ml-2 uppercase tracking-widest">
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CompleteProfile() {
  // Role comes from AuthContext — will be real after integration
  const { user } = useAuth()
  const navigate = useNavigate()
  const role = user?.role ?? 'student' // fallback for UI-only preview
  const isStudent = role === 'student'

  const [step, setStep] = useState(0) // 0 = step 1, 1 = step 2

  // Step 1 — required field
  const [institution, setInstitution] = useState('')     // student
  const [organization, setOrganization] = useState('')   // supervisor

  // Step 2 — optional fields
  const [title, setTitle] = useState('')         // student: title, supervisor: designation
  const [bio, setBio] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')

  const handleNext = (e) => {
    e.preventDefault()
    setStep(1)
  }

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    // Will call PUT /auth/complete-profile when wired up
    console.log('Submit complete profile', {
      ...(isStudent ? { institution } : { organization }),
      ...(isStudent ? { title } : { designation: title }),
      bio,
      linkedin_url: linkedinUrl,
    })
    // Navigate to role-based dashboard
    if (role === 'supervisor') {
      navigate('/supervisor/dashboard')
    } else {
      navigate('/student/dashboard')
    }
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-background relative overflow-hidden">

      {/* ── Left Pane (same as AuthLayout) ─────────────────────────────────── */}
      <div className="hidden lg:flex w-1/2 relative bg-muted/20 border-r border-border/10 flex-col justify-between p-12 overflow-hidden shadow-[inset_-20px_0_40px_rgba(0,0,0,0.5)]">

        {/* Background glows */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

        {/* Back link */}
        <div className="relative z-10 flex items-center gap-3">
          <Link
            to="/login"
            className="w-10 h-10 border border-border/30 rounded-xl flex items-center justify-center hover:bg-card hover:border-primary/40 transition-colors bg-background/50 backdrop-blur-md group"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
            Return to Network
          </span>
        </div>

        {/* Left pane content */}
        <div className="relative z-10 max-w-lg mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold tracking-widest uppercase text-accent mb-6 shadow-sm">
            <Shield className="w-3 h-3" /> Identity Setup
          </div>
          <h2 className="text-4xl xl:text-5xl font-light text-foreground mb-6 leading-tight tracking-tight">
            Establish your <br />
            <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-accent to-primary">
              {isStudent ? 'institutional bond.' : 'verification authority.'}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            {isStudent
              ? 'Your institutional affiliation is the anchor of your ledger identity. It determines how supervisors discover and verify your records.'
              : 'Your organization links your verification authority to an institution. It determines your trust tier and the credibility weight of your approvals.'}
          </p>

          {/* Mini info card */}
          <div className="mt-12 bg-card/40 border border-border/20 p-6 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/10 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Network className="w-4 h-4" /> Profile Completeness
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-accent">PENDING</span>
              </div>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center bg-background/50 p-3 rounded border border-border/10">
                <span className="text-[10px] font-mono text-muted-foreground">IDENTITY_HASH</span>
                <span className="text-[10px] font-mono text-foreground/40">████████████</span>
              </div>
              <div className="flex justify-between items-center bg-background/50 p-3 rounded border border-border/10">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {isStudent ? 'INSTITUTION_BOUND' : 'ORG_VERIFIED'}
                </span>
                <span className="text-[10px] font-bold text-amber-400/80 font-mono border border-amber-400/20 bg-amber-400/10 px-2 rounded-sm">
                  REQUIRED
                </span>
              </div>
              <div className="flex justify-between items-center bg-background/50 p-3 rounded border border-border/10">
                <span className="text-[10px] font-mono text-muted-foreground">TRUST_TIER</span>
                <span className="text-[10px] font-mono text-foreground/40">
                  {isStudent ? 'N/A' : 'PENDING EVAL'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 opacity-60">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground border-r border-border/50 pr-6">
            Data Encrypted
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">RSA-4096 / SHA-256</span>
        </div>
      </div>

      {/* ── Right Pane (form) ───────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative overflow-y-auto">

        {/* Mobile back */}
        <Link
          to="/login"
          className="lg:hidden absolute top-6 left-6 w-10 h-10 border border-border/30 rounded-xl flex items-center justify-center bg-card shadow-sm z-20"
        >
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </Link>

        <div className="w-full max-w-[440px] z-10 relative">

          {/* Header */}
          <div className="mb-10 lg:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isStudent ? 'bg-primary/10' : 'bg-accent/10'}`}>
                {isStudent
                  ? <UserCircle2 className="w-4 h-4 text-primary" />
                  : <Building2 className="w-4 h-4 text-accent" />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                {isStudent ? 'Candidate Profile' : 'Supervisor Profile'}
              </span>
            </div>
            <h1 className="text-4xl font-light text-foreground tracking-tight mb-3">
              {step === 0 ? 'Bind Institution' : 'Complete Identity'}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {step === 0
                ? isStudent
                  ? 'Your institutional affiliation is required to publish your ledger.'
                  : 'Your organization is required to activate your verification authority and determine your trust tier.'
                : 'These details appear on your public ledger profile. You can update them anytime from settings.'}
            </p>
          </div>

          {/* Card */}
          <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] p-8 sm:p-10 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            <StepIndicator currentStep={step} totalSteps={2} />

            {/* ── Step 1: Required field ────────────────────────────────── */}
            {step === 0 && (
              <form onSubmit={handleNext} className="space-y-6">
                {isStudent ? (
                  <div>
                    <OnboardingInput
                      label="Academic Institution"
                      id="institution"
                      placeholder="e.g. MIT, Stanford University"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      required
                    />
                    <p className="mt-2 ml-1 text-[10px] text-muted-foreground/60 leading-relaxed">
                      This will be displayed as your "Linked Oracle" on your public profile.
                    </p>
                  </div>
                ) : (
                  <div>
                    <OnboardingInput
                      label="Organization"
                      id="organization"
                      placeholder="e.g. Stanford University, Acme Corp"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                    />
                    <p className="mt-2 ml-1 text-[10px] text-muted-foreground/60 leading-relaxed">
                      If your email domain matches your organization, your trust tier will auto-upgrade to{' '}
                      <span className="text-primary font-bold">Institutional</span>.
                    </p>

                    {/* Trust tier preview — supervisor only */}
                    <div className="mt-6 p-4 rounded-xl border border-border/30 bg-background/40 flex items-start gap-3">
                      <Shield className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          Trust Tier Preview
                        </p>
                        <p className="text-xs text-muted-foreground/70 leading-relaxed">
                          Enter your organization above. We'll evaluate your email domain and show your trust classification before you confirm.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-foreground/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ── Step 2: Optional fields ───────────────────────────────── */}
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <OnboardingInput
                  label={isStudent ? 'Title / Role' : 'Designation'}
                  id="title"
                  placeholder={isStudent ? 'e.g. Graduate Research Assistant' : 'e.g. Associate Professor, Dean of Faculty'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <OnboardingTextarea
                  label="Professional Bio"
                  id="bio"
                  placeholder={
                    isStudent
                      ? 'A brief summary of your academic and professional trajectory...'
                      : 'A brief summary of your research focus and institutional background...'
                  }
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                <div className="space-y-1.5 group">
                  <label
                    htmlFor="linkedin"
                    className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground ml-1 transition-colors group-focus-within:text-foreground"
                  >
                    LinkedIn URL
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourhandle"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg py-3.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-sm hover:border-border"
                    />
                  </div>
                </div>

                {/* Skip note */}
                <p className="text-[10px] text-muted-foreground/50 ml-1 leading-relaxed">
                  All fields on this step are optional — you can complete them later from your profile settings.
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-foreground/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                  >
                    Activate Ledger Identity
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full text-muted-foreground hover:text-foreground font-bold tracking-widest uppercase text-[10px] py-3 rounded-lg transition-colors"
                  >
                    Skip for now
                  </button>
                </div>

                {/* Back */}
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors font-bold uppercase tracking-widest mt-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center px-4">
            <p className="text-[10px] text-muted-foreground/50 leading-relaxed uppercase tracking-widest font-medium">
              By continuing, you adhere to the Institutional Terms of Attestation. All signed records are immutable.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
