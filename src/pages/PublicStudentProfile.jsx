import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import {
  ArrowLeft, Fingerprint, Lock, ShieldCheck, FileCheck,
  CheckCircle2, Activity, Hexagon, Terminal, Network, Loader2, Shield
} from 'lucide-react'
import { getStudentPublic } from '../lib/api'
import { handleError } from '../lib/handleError'

// ── Helper: format ISO date ───────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return 'Present'
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

function fmtDuration(start, end) {
  const s = new Date(start)
  const e = end ? new Date(end) : new Date()
  const months = Math.round((e - s) / (1000 * 60 * 60 * 24 * 30))
  if (months < 1) return '< 1 month'
  if (months === 1) return '1 month'
  if (months < 12) return `${months} months`
  const yrs = Math.floor(months / 12)
  const rem = months % 12
  return rem > 0 ? `${yrs}y ${rem}m` : `${yrs} year${yrs > 1 ? 's' : ''}`
}

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-border/20 rounded-xl ${className}`} aria-hidden="true" />
}

// ── 404 / error state ─────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-border/10 border border-border/20 flex items-center justify-center mb-6">
        <ShieldCheck className="w-8 h-8 text-muted-foreground/30" />
      </div>
      <h2 className="text-xl font-light text-foreground mb-2 tracking-tight">Profile Not Found</h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
        This student profile does not exist or has been deactivated.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
      >
        Return to Network
      </Link>
    </div>
  )
}

export default function PublicStudentProfile() {
  const { id } = useParams()
  const { user } = useAuth()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await getStudentPublic(id)
        setData(res.data)
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 400) {
          setNotFound(true)
        } else {
          handleError(err)
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const initials = getInitials(data?.full_name)
  const engagements = data?.verified_engagements ?? []

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[#ffffff02] bg-size-[32px_32px]" style={{ backgroundImage: 'radial-gradient(circle, var(--tw-colors-border) 1px, transparent 1px)' }}></div>
      </div>

      {/* Workspace Return Bar */}
      {user && (
        <div className="w-full bg-background/80 backdrop-blur-xl border-b border-border/20 z-50 sticky top-0">
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary))]"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Live Ledger Network</span>
            </div>
            <Link
              to={user.role === 'supervisor' ? '/supervisor/dashboard' : '/student/dashboard'}
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-foreground bg-card hover:bg-muted py-2 px-5 rounded-full border border-border/40 transition-all hover:border-primary/50"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Exit to Workspace
            </Link>
          </div>
        </div>
      )}

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 pb-32">
        
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fetching Ledger...</span>
          </div>
        )}

        {!loading && notFound && <NotFound />}

        {!loading && !notFound && data && (
          <>
            {/* Identity Header */}
            <header className="mb-16 relative">
              <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/10 to-transparent blur-[80px] rounded-[100px] opacity-70"></div>
              <div className="bg-card/30 backdrop-blur-2xl border border-border/20 rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row gap-10 lg:items-center justify-between shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative">
                
                <div className="absolute top-0 right-0 w-full h-[2px] bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
                <div className="absolute top-0 right-10 w-[2px] h-32 bg-linear-to-b from-primary/30 to-transparent"></div>

                <div className="flex items-center gap-10 relative z-10">
                  {/* Avatar initials */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary rounded-4xl blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-4xl bg-background border border-border/40 p-2 relative z-10 overflow-hidden shadow-2xl">
                       <div className="w-full h-full bg-card rounded-xl flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-primary/5"></div>
                         <span className="text-5xl font-light text-foreground/80 tracking-tighter">{initials}</span>
                       </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-background rounded-full border border-border/30 flex items-center justify-center shadow-lg z-20">
                      <Fingerprint className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="w-5 h-5 text-primary" />
                       <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Verified Agent</span>
                    </div>
                    <div>
                      <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-foreground">{data.full_name}</h1>
                      <p className="text-xl lg:text-2xl text-muted-foreground font-light mt-2 tracking-wide">
                        {data.title ?? (data.institution ? `${data.institution} Candidate` : 'Student')}
                      </p>
                    </div>
                    {data.bio && (
                      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{data.bio}</p>
                    )}
                    {data.linkedin_url && (
                      <a
                        href={data.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
                      >
                        LinkedIn Profile →
                      </a>
                    )}
                  </div>
                </div>

                {/* Cryptographic readout */}
                <div className="flex flex-col gap-4 text-left lg:text-right bg-background/60 p-6 rounded-2xl border border-border/20 backdrop-blur-md relative z-10 min-w-[300px]">
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Decentralized Identifier (DID)</span>
                    <span className="text-sm font-mono text-foreground tracking-wider">{data.ledger_id}</span>
                  </div>
                  <div className="h-px bg-border/30 w-full my-1"></div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Ledger Status</span>
                    <div className="flex items-center lg:justify-end gap-2 text-primary font-mono text-xs">
                      <Terminal className="w-3.5 h-3.5" />
                      {engagements.length > 0 ? 'VERIFIED_ACTIVE' : 'SYNCED_WAITING'}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Verified Blocks</span>
                    <span className="text-sm font-mono text-foreground">{engagements.length}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Triple Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
              
              {/* Main Column: Verified Execution Chain (Col-8) */}
              <div className="lg:col-span-8 space-y-8 relative">
                
                <div className="flex items-center justify-between mb-8 overflow-hidden rounded-2xl border border-border/20 bg-background/50 backdrop-blur-md p-4 px-6 md:px-8 shadow-sm">
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-foreground">Verified Execution Chain</h2>
                   <span className="px-3 py-1 bg-border/30 rounded text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{engagements.length} Blocks</span>
                </div>

                {engagements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 border border-dashed border-border/20 rounded-4xl text-center">
                    <Activity className="w-10 h-10 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">No Verified Engagements</h3>
                    <p className="text-sm text-muted-foreground/60 max-w-xs leading-relaxed">This student has no verified engagement records on the ledger yet.</p>
                  </div>
                ) : (
                  <div className="relative pl-8 md:pl-16 space-y-12 pb-10">
                    {/* Vertical Timeline Guide */}
                    <div className="absolute left-[39px] md:left-[71px] top-6 bottom-0 w-[2px] bg-linear-to-b from-primary via-border/30 to-border/10"></div>

                    {engagements.map((eng, idx) => (
                      <div key={eng.id ?? idx} className="relative group">
                        {/* Timeline node */}
                        <div className="absolute -left-8 md:-left-16 top-6 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.5)] z-10 transition-transform duration-300 group-hover:scale-125">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        </div>

                        {/* Horizontal connecting line */}
                        <div className="absolute -left-8 md:-left-16 top-8 w-8 md:w-16 h-[2px] bg-primary/40 -z-10 transition-colors duration-300 group-hover:bg-primary"></div>

                        <article className="bg-card/10 backdrop-blur-xl border border-border/20 hover:border-border/50 transition-all rounded-4xl p-8 md:p-10 relative overflow-hidden">
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                          <div className="flex flex-col gap-6 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="space-y-1 max-w-[80%]">
                                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">{eng.role}</h3>
                                <p className="text-lg font-medium text-muted-foreground">{eng.organization_name}</p>
                              </div>
                              <div className="shrink-0 text-left md:text-right pt-2 md:pt-0">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg">
                                  <Lock className="w-3.5 h-3.5 text-primary" />
                                  <span className="font-mono text-[10px] text-primary">
                                    {fmtDuration(eng.start_date, eng.end_date)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-border/15">
                              <div className="space-y-1.5">
                                <span className="block text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Period</span>
                                <span className="text-sm font-mono text-muted-foreground">
                                  {fmtDate(eng.start_date)} – {fmtDate(eng.end_date)}
                                </span>
                              </div>
                              <div className="space-y-1.5">
                                <span className="block text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Verified</span>
                                <span className="text-sm font-medium">{fmtDate(eng.verified_at)}</span>
                              </div>
                              <div className="space-y-1.5 col-span-2 lg:col-span-1">
                                <span className="block text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Verification Type</span>
                                <span className="text-[11px] font-mono p-1.5 bg-background border border-border/30 rounded text-muted-foreground/80 tracking-widest capitalize">
                                  {eng.verification_type ?? 'N/A'}
                                </span>
                              </div>
                            </div>

                            {/* View Record link */}
                            <div className="pt-4 border-t border-border/10 flex justify-end">
                              <Link
                                to={`/profile/${data.id}/engagement/${eng.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                              >
                                View Full Record →
                              </Link>
                            </div>

                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Column: Oracle & Capabilities (Col-4) */}
              <div className="lg:col-span-4 space-y-8 sticky top-24">
                {/* Institution card */}
                {data.institution && (
                  <div className="bg-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-6 border-b border-border/20 pb-6">
                      <FileCheck className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Linked Oracle</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-foreground mb-1 tracking-tight leading-tight">{data.institution}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Affiliated Institution</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Profile */}
                <div className="bg-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 relative overflow-hidden pb-12 flex flex-col min-h-[400px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 border-b border-border/20 pb-6 mb-8 relative z-10">
                    <Hexagon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground flex-1">Skills Profile</span>
                  </div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    {(!data?.skills || (data.skills.verified.length === 0 && data.skills.declared.length === 0)) ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center h-full opacity-60">
                         <Shield className="w-8 h-8 text-muted-foreground/50 mb-3" />
                         <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">No skills declared yet</span>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-6">
                        
                        {/* Verified Skills */}
                        {data.skills.verified.length > 0 && (
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[9px] uppercase tracking-widest font-bold text-primary">Verified Competencies</span>
                              <span className="text-[9px] font-mono text-primary/70">{data.skills.verified.length}</span>
                            </div>
                            <div className="space-y-2.5">
                              {data.skills.verified.map((skill, i) => (
                                 <div key={`v-${i}`} className="group relative overflow-hidden px-4 py-3 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between shadow-sm transition-all">
                                    <div className="flex items-center gap-3 relative z-10 w-full pr-16 justify-between">
                                       <div className="flex items-center gap-3">
                                         <Shield className="w-4 h-4 text-primary shrink-0" />
                                         <span className="text-[13px] font-bold tracking-wide text-foreground capitalize truncate">{skill.name}</span>
                                       </div>
                                       <span className="text-[10px] font-bold text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 ml-2 shadow-sm shrink-0">x{skill.count || 1}</span>
                                    </div>
                                    <span className="absolute right-4 text-[8px] bg-primary/20 px-2 py-1 rounded-sm text-primary border border-primary/20 uppercase tracking-widest font-bold z-10">Verified</span>
                                 </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Declared Skills */}
                        {data.skills.declared.length > 0 && (
                          <div>
                            <div className="flex items-center justify-between mb-4 pt-2 border-t border-border/10">
                              <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Self Declared</span>
                              <span className="text-[9px] font-mono text-muted-foreground">{data.skills.declared.length}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {data.skills.declared.map((skill, i) => (
                                 <div key={`d-${i}`} className="px-3.5 py-2 bg-background/50 border border-border/50 rounded-lg flex items-center shadow-sm">
                                   <span className="text-[12px] font-medium tracking-wide text-muted-foreground capitalize">{skill.name}</span>
                                 </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 relative z-10 px-4 text-center">
                  <p className="text-[9px] leading-relaxed text-muted-foreground font-medium uppercase tracking-widest">
                    Endorsements immutably recorded. <br/> tampering structurally impossible.
                  </p>
                </div>
              </div>

            </div>
          </>
        )}
      </main>
      
      <Footer className="border-t border-border/10 bg-background/80 backdrop-blur-md relative z-20" />
    </div>
  )
}
