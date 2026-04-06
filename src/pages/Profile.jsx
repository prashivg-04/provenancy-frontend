import { useState, useEffect } from 'react'
import { Save, ExternalLink, User as UserIcon, Loader2, Lock, Edit2, Shield } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { FormSection } from '../components/workspace/FormElements'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/workspace/SharedPrimitives'
import { getStudentMe, updateStudentMe, getUserSkills } from '../lib/api'
import { handleError } from '../lib/handleError'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
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

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [profileId, setProfileId] = useState(null) // UUID for public link
  const [ledgerId, setLedgerId] = useState(null)
  const [skills, setSkills] = useState({ declared: [], verified: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    title: '',
    bio: '',
    institution: '',
    linkedin_url: '',
  })
  const [originalForm, setOriginalForm] = useState(null)

  // ── Load profile on mount ──────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const [res, skillsRes] = await Promise.all([
          getStudentMe(),
          getUserSkills()
        ])
        const { profile, ledger_id } = res.data
        setProfileId(profile.id)
        setLedgerId(ledger_id)
        setSkills(skillsRes.data)
        const initialForm = {
          full_name: profile.full_name ?? '',
          title: profile.title ?? '',
          bio: profile.bio ?? '',
          institution: profile.institution ?? '',
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

  // ── Handle form change ─────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // ── Save profile ───────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault()

    // Build payload — omit empty strings so server doesn't reject "no fields"
    const payload = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== '')
    )

    if (Object.keys(payload).length === 0) {
      toast.error('Please fill in at least one field.')
      return
    }

    // Client-side LinkedIn URL validation (mirrors backend rule)
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
      await updateStudentMe(payload)
      toast.success('Ledger updated successfully')
      setIsEditing(false)
      setOriginalForm(form)
    } catch (err) {
      handleError(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <StudentLayout>
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
                     <UserIcon className="w-3.5 h-3.5 text-primary" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Identity Settings</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3">Profile Management</h1>
                  <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                    Maintain your institutional identity. Your basic information and verified skills dictate how you appear on the public ledger.
                  </p>
                </div>

                {/* View Public Profile link */}
                <div className="flex shrink-0">
                  {loading ? (
                    <Skeleton className="h-[72px] w-[160px]" />
                  ) : (
                    <Link
                      to={`/profile/${profileId}`}
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

              {/* Form Content */}
              <form className="space-y-10" onSubmit={handleSave}>
                
                {/* Basic Information */}
                <FormSection title="Basic Information" subTitle="Primary Identity Document">
                  <div className="space-y-6">
                    {loading ? (
                      <>
                        <Skeleton className="h-[52px]" />
                        <Skeleton className="h-[52px]" />
                        <Skeleton className="h-[100px]" />
                        <Skeleton className="h-[52px]" />
                      </>
                    ) : (
                      <>
                        <Field label="Full Name">
                          <input
                            name="full_name"
                            type="text"
                            value={form.full_name}
                            onChange={handleChange}
                            placeholder="e.g. Alex Carter"
                            className={isEditing ? inputCls : readonlyCls}
                            disabled={!isEditing || saving}
                            readOnly={!isEditing}
                          />
                        </Field>
                        <Field label="Title / Role">
                          <input
                            name="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Graduate Research Assistant"
                            className={isEditing ? inputCls : readonlyCls}
                            disabled={!isEditing || saving}
                            readOnly={!isEditing}
                          />
                        </Field>
                        <Field label="Professional Bio">
                          <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="A brief summary of your academic and professional trajectory..."
                            rows={3}
                            className={isEditing ? `${inputCls} resize-y min-h-[100px]` : `${readonlyCls} resize-none min-h-[100px]`}
                            disabled={!isEditing || saving}
                            readOnly={!isEditing}
                          />
                        </Field>
                        <Field label="Institution">
                          <input
                            name="institution"
                            type="text"
                            value={form.institution}
                            onChange={handleChange}
                            placeholder="e.g. MIT, Stanford University"
                            className={isEditing ? inputCls : readonlyCls}
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
                          <Field label="Academic Email">
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
                              placeholder="https://linkedin.com/in/alexcarter"
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
                    <div className="space-y-6 h-full flex flex-col justify-end">
                      {loading ? (
                        <Skeleton className="h-[80px]" />
                      ) : (
                        <div className="p-5 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col gap-3">
                          <div className="flex justify-between items-start w-full">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Ledger ID</p>
                            <div className="px-2.5 py-1 bg-background border border-border/30 rounded shadow-sm text-[9px] uppercase font-bold tracking-widest text-primary">
                              Immutable
                            </div>
                          </div>
                          <p className="text-sm font-mono text-foreground">{ledgerId ?? '—'}</p>
                        </div>
                      )}
                    </div>
                  </FormSection>
                </div>

                {/* Skills Management */}
                <FormSection title="Skills Repository" subTitle="Cryptographically verified competences linked to your identity.">
                  <div className="space-y-6 mt-2 relative">
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="flex-1 w-full flex flex-col gap-2">
                         <span className="text-xs text-muted-foreground">
                           Your skills are managed in the dedicated Skill Repository where you can track endorsements and validations.
                         </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate('/student/skills')}
                        className="group relative overflow-hidden w-full sm:w-auto px-6 py-2.5 bg-background border border-primary/20 hover:border-primary/50 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        <span className="relative z-10 flex items-center gap-2">
                           <Edit2 className="w-3.5 h-3.5 group-hover:-rotate-12 transition-transform" />
                           Manage Assets
                        </span>
                      </button>
                    </div>
                    
                    <div className="relative p-6 bg-card/20 backdrop-blur-xl border border-border/40 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] min-h-[140px] overflow-hidden flex flex-col">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
                      
                      {loading ? (
                         <div className="w-full h-full flex-1 flex flex-col items-center justify-center gap-3">
                            <Loader2 className="w-6 h-6 text-primary/50 animate-spin" />
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Synchronizing...</span>
                         </div>
                      ) : skills.verified.length === 0 && skills.declared.length === 0 ? (
                         <div className="w-full h-full flex-1 flex flex-col items-center justify-center gap-3 opacity-60 py-4">
                           <Shield className="w-8 h-8 text-muted-foreground/50" />
                           <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">No skills declared yet</span>
                         </div>
                      ) : (
                         <div className="flex flex-wrap gap-3 relative z-10">
                           {skills.verified.map((skill, i) => (
                             <div key={`v-${i}`} className="group relative overflow-hidden px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl flex items-center gap-2 shadow-sm transition-all hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_-3px_rgba(26,35,126,0.2)]">
                                <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <Shield className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[12px] font-bold tracking-wide text-foreground capitalize relative z-10">{skill.name}</span>
                                <span className="text-[8px] bg-primary/20 px-1.5 py-0.5 rounded text-primary border border-primary/20 uppercase tracking-widest font-bold relative z-10 ml-1">Verified</span>
                             </div>
                           ))}
                           {skills.declared.map((skill, i) => (
                             <div key={`d-${i}`} className="group relative overflow-hidden px-4 py-2 bg-background/50 backdrop-blur-sm border border-border/60 hover:border-border rounded-xl flex items-center gap-2 transition-all hover:bg-card/80 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-default">
                               <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                               <span className="text-[12px] font-bold tracking-wide text-muted-foreground group-hover:text-foreground capitalize transition-colors relative z-10">{skill.name}</span>
                             </div>
                           ))}
                         </div>
                      )}
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
    </StudentLayout>
  )
}
