import { useState, useEffect } from 'react'
import { Save, ExternalLink, User as UserIcon, Loader2, Lock, ShieldCheck, Edit2 } from 'lucide-react'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { FormSection } from '../components/workspace/FormElements'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/workspace/SharedPrimitives'
import { getSupervisorMe, updateSupervisorMe } from '../lib/api'
import { handleError } from '../lib/handleError'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

// ── Shared input classes ──────────────────────────────────────────────────────
const inputCls = "w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm focus-within:shadow-[0_0_15px_rgba(26,35,126,0.1)]"
const readonlyCls = "w-full bg-background/20 border border-border/20 rounded-xl px-4 py-3.5 text-sm text-muted-foreground cursor-not-allowed select-none shadow-sm"
const labelCls = "text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground pl-1"

function Field({ label, children }) {
  return (
    <div className="flex flex-col space-y-2.5">
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  )
}

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-border/20 rounded-xl ${className}`} aria-hidden="true" />
}

function TrustTierCard({ tier }) {
  if (!tier) return null
  const isInstitutional = tier === 'institutional'
  return (
    <div className={`p-4 rounded-2xl border flex items-center gap-3 ${isInstitutional ? 'border-primary/20 bg-primary/5' : 'border-border/20 bg-card/30'}`}>
      <ShieldCheck className={`w-5 h-5 shrink-0 ${isInstitutional ? 'text-primary' : 'text-muted-foreground'}`} />
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Trust Tier</p>
        <p className={`text-sm font-medium capitalize ${isInstitutional ? 'text-primary' : 'text-foreground'}`}>{tier}</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">
          {isInstitutional
            ? 'Email domain matches organisation — elevated authority.'
            : 'Email domain does not match organisation.'}
        </p>
      </div>
    </div>
  )
}

export default function SupervisorProfile() {
  const { user } = useAuth()

  const [profileId, setProfileId] = useState(null)
  const [ledgerId, setLedgerId] = useState(null)
  const [trustTier, setTrustTier] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    designation: '',
    organization: '',
    bio: '',
    linkedin_url: '',
  })
  const [originalForm, setOriginalForm] = useState(null)

  // ── Load profile on mount ──────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const res = await getSupervisorMe()
        const { profile, ledger_id } = res.data
        setProfileId(profile.id)
        setLedgerId(ledger_id)
        setTrustTier(profile.trust_tier)
        const initialForm = {
          full_name: profile.full_name ?? '',
          designation: profile.designation ?? '',
          organization: profile.organization ?? '',
          bio: profile.bio ?? '',
          linkedin_url: profile.linkedin_url ?? '',
        }
        setForm(initialForm)
        setOriginalForm(initialForm)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const payload = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== '')
    )
    if (Object.keys(payload).length === 0) {
      toast.error('Please fill in at least one field.')
      return
    }

    if (payload.linkedin_url) {
      const isValidLinkedIn =
        payload.linkedin_url.startsWith('http') &&
        payload.linkedin_url.includes('linkedin.com')
      if (!isValidLinkedIn) {
        toast.error('LinkedIn URL must start with https:// and contain linkedin.com')
        return
      }
    }

    setSaving(true)
    try {
      await updateSupervisorMe(payload)
      // Re-fetch to get updated trust_tier if organization changed
      const refreshed = await getSupervisorMe()
      setTrustTier(refreshed.data.profile.trust_tier)
      toast.success('Oracle Ledger updated successfully')
      setIsEditing(false)
      setOriginalForm(form)
    } catch (err) {
      handleError(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <SupervisorLayout>
      <div className="flex flex-1 h-full overflow-hidden w-full relative bg-background/50">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-primary/10 blur-[120px] pointer-events-none -z-10 rounded-full"></div>

        <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
          <PageContainer>
            <div className="max-w-5xl mx-auto pb-40">
              
              {/* Header */}
              <header className="mb-10 relative flex flex-col md:flex-row md:items-end justify-between gap-6 py-4">
                <div className="relative z-10 w-full md:w-auto">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full w-fit mb-4">
                     <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Oracle Settings</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3">Profile Management</h1>
                  <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                    Maintain your administrative identity. This information confirms your authority and institutional standing on all ledger validations.
                  </p>
                </div>

                {/* View Public Profile link */}
                <div className="flex shrink-0">
                  {loading ? (
                    <Skeleton className="h-[72px] w-[160px]" />
                  ) : (
                    <Link
                      to={`/supervisor/${profileId}`}
                      className="group flex flex-col items-center justify-center py-4 px-6 bg-card/60 backdrop-blur-md border border-border/30 hover:border-primary/50 hover:bg-primary/5 rounded-2xl transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ExternalLink className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-primary">View Ledger</span>
                          <span className="block text-[9px] font-mono text-muted-foreground mt-0.5">{ledgerId ?? '—'}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </header>

              {/* Form */}
              <form className="space-y-10" onSubmit={handleSave}>

                {/* Basic Information */}
                <FormSection title="Basic Information" subTitle="Your primary identity and designation within the institution.">
                  <div className="space-y-6">
                    {loading ? (
                      <>
                        <Skeleton className="h-[52px]" />
                        <Skeleton className="h-[52px]" />
                        <Skeleton className="h-[52px]" />
                        <Skeleton className="h-[100px]" />
                      </>
                    ) : (
                      <>
                        <Field label="Full Name">
                          <input
                            name="full_name"
                            type="text"
                            value={form.full_name}
                            onChange={handleChange}
                            placeholder="e.g. Julian Vance"
                            className={isEditing ? inputCls : readonlyCls}
                            disabled={!isEditing || saving}
                            readOnly={!isEditing}
                          />
                        </Field>
                        <Field label="Designation / Role">
                          <input
                            name="designation"
                            type="text"
                            value={form.designation}
                            onChange={handleChange}
                            placeholder="e.g. Head of Data Science"
                            className={isEditing ? inputCls : readonlyCls}
                            disabled={!isEditing || saving}
                            readOnly={!isEditing}
                          />
                        </Field>
                        <Field label="Organization">
                          <input
                            name="organization"
                            type="text"
                            value={form.organization}
                            onChange={handleChange}
                            placeholder="e.g. DataCamp, Inc."
                            className={isEditing ? inputCls : readonlyCls}
                            disabled={!isEditing || saving}
                            readOnly={!isEditing}
                          />
                          <p className="text-[9px] text-muted-foreground/70 pl-1">
                            Updating organisation will re-evaluate your trust tier.
                          </p>
                        </Field>
                        <Field label="Professional Summary">
                          <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="A brief summary of your supervisory expertise..."
                            rows={3}
                            className={isEditing ? `${inputCls} resize-y min-h-[100px]` : `${readonlyCls} resize-none min-h-[100px]`}
                            disabled={!isEditing || saving}
                            readOnly={!isEditing}
                          />
                        </Field>
                      </>
                    )}
                  </div>
                </FormSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* System Bindings */}
                  <FormSection title="System Bindings" subTitle="External Locators">
                    <div className="space-y-6">
                      {loading ? (
                        <>
                          <Skeleton className="h-[52px]" />
                          <Skeleton className="h-[52px]" />
                        </>
                      ) : (
                        <>
                          {/* Email — read-only */}
                          <Field label="Work Email">
                            <div className="relative">
                              <input
                                type="email"
                                value={user?.email ?? ''}
                                readOnly
                                disabled
                                className={readonlyCls}
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 bg-background border border-border/30 rounded text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                <Lock className="w-2.5 h-2.5" />
                                Immutable
                              </div>
                            </div>
                          </Field>
                          <Field label="LinkedIn URL">
                            <input
                              name="linkedin_url"
                              type="url"
                              value={form.linkedin_url}
                              onChange={handleChange}
                              placeholder="https://linkedin.com/in/julianvance"
                              className={isEditing ? inputCls : readonlyCls}
                              disabled={!isEditing || saving}
                              readOnly={!isEditing}
                            />
                          </Field>
                        </>
                      )}
                    </div>
                  </FormSection>

                  {/* Account Identity */}
                  <FormSection title="Account Identity" subTitle="System-generated registry identifiers.">
                    <div className="space-y-4 h-full flex flex-col justify-end">
                      {loading ? (
                        <>
                          <Skeleton className="h-[80px]" />
                          <Skeleton className="h-[80px]" />
                        </>
                      ) : (
                        <>
                          <div className="p-5 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col gap-3">
                            <div className="flex justify-between items-start w-full">
                              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Admin ID</p>
                              <div className="px-2.5 py-1 bg-background border border-border/30 rounded shadow-sm text-[9px] uppercase font-bold tracking-widest text-primary">
                                Immutable
                              </div>
                            </div>
                            <p className="text-sm font-mono text-foreground">{ledgerId ?? '—'}</p>
                          </div>
                          {/* Trust tier — read-only, auto-computed */}
                          <TrustTierCard tier={trustTier} />
                        </>
                      )}
                    </div>
                  </FormSection>
                </div>

                {/* Domain Management — UI only, no API yet */}
                <FormSection title="Domain Management" subTitle="Institutional areas of expertise for validation.">
                  <div className="space-y-6 mt-2 relative">
                    {/* Coming Soon overlay */}
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-full shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Domain API — Coming Soon</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-end opacity-30 pointer-events-none select-none">
                      <div className="flex-1 w-full">
                        <label className={labelCls}>Add Verify Domain</label>
                        <input
                          type="text"
                          placeholder="e.g. Computer Science, Quantum Physics..."
                          className={inputCls}
                          disabled
                        />
                      </div>
                      <button
                        type="button"
                        disabled
                        className="w-full sm:w-auto px-8 py-2 bg-muted/40 border border-border/30 text-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl h-[44px] mb-[2px]"
                      >
                        Register Link
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2.5 p-5 bg-card/60 backdrop-blur-sm border border-border/20 rounded-2xl shadow-inner opacity-30 pointer-events-none select-none">
                      <span className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-lg text-[11px] font-bold uppercase tracking-widest">Computer Science</span>
                      <span className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-lg text-[11px] font-bold uppercase tracking-widest">Quantum Physics</span>
                    </div>
                  </div>
                </FormSection>

              </form>
            </div>
          </PageContainer>
        </div>

        {/* Premium Floating Save Button */}
        <div className="absolute bottom-8 right-8 z-50 pointer-events-none flex items-center gap-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="pointer-events-auto flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_15px_40px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.7)] hover:-translate-y-1 hover:bg-primary/90 group disabled:opacity-50"
            >
              <Edit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="mt-px">Edit Ledger</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  if (originalForm) setForm(originalForm)
                }}
                disabled={saving || loading}
                className="pointer-events-auto flex items-center gap-3 px-6 py-4 bg-background text-muted-foreground border border-border/50 font-bold text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-muted/50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || loading}
                className="pointer-events-auto flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_15px_40px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.7)] hover:-translate-y-1 hover:bg-primary/90 group disabled:opacity-50 disabled:pointer-events-none"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="mt-px">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="mt-px">Sign & Save Ledger</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </SupervisorLayout>
  )
}
