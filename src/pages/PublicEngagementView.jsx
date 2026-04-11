import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import {
  ArrowLeft, ShieldCheck, Lock, CheckCircle2, Terminal,
  Calendar, Building2, Briefcase, Fingerprint, BadgeCheck,
  Clock, Loader2, AlertTriangle, Award,
  FileText, ListChecks, Code, Shield, ExternalLink
} from 'lucide-react'
import { getStudentPublic } from '../lib/api'

function fmtDate(iso) {
  if (!iso) return 'Present'
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function fmtDuration(start, end) {
  if (!start) return '—'
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

function MetaCell({ icon: Icon, label, value, mono = false, highlight = false }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground flex items-center gap-1.5">
        <Icon className="w-3 h-3" /> {label}
      </span>
      <span className={`text-sm ${highlight ? 'text-emerald-500 font-bold' : 'text-foreground font-medium'} ${mono ? 'font-mono text-[12px]' : ''}`}>
        {value || '—'}
      </span>
    </div>
  )
}

export default function PublicEngagementView() {
  const { id: studentId, engId } = useParams()
  const { user } = useAuth()

  const [engagement, setEngagement] = useState(null)
  const [student, setStudent]       = useState(null)
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await getStudentPublic(studentId)
        const data = res.data
        const eng  = (data.verified_engagements ?? []).find(e => e.id === engId)
        if (!eng) { setNotFound(true); return }
        setStudent(data)
        setEngagement(eng)
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 400) {
          setNotFound(true)
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [studentId, engId])

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-emerald-500/20">

      {/* Background ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[15%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%]  w-[400px] h-[400px] bg-primary/8  rounded-full blur-[180px]" />
      </div>

      {/* Top bar — workspace link if logged in, otherwise public branding */}
      <div className="w-full bg-background/80 backdrop-blur-xl border-b border-border/20 z-50 sticky top-0">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500">
              Verified Ledger Record
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/profile/${studentId}`}
              className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground bg-card hover:bg-muted py-2 px-4 rounded-full border border-border/40 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Profile
            </Link>
            {user && (
              <Link
                to={user.role === 'supervisor' ? '/supervisor/dashboard' : '/student/dashboard'}
                className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 py-2 px-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Workspace
              </Link>
            )}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 pb-32">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Fetching Ledger Record...
            </span>
          </div>
        )}

        {/* Not found */}
        {!loading && notFound && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-border/10 border border-border/20 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-muted-foreground/30" />
            </div>
            <h2 className="text-xl font-light text-foreground mb-2 tracking-tight">Record Not Found</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
              This engagement record does not exist or has been removed from the ledger.
            </p>
            <Link
              to="/"
              className="px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Return to Network
            </Link>
          </div>
        )}

        {/* Full record */}
        {!loading && !notFound && engagement && student && (
          <div className="space-y-10">

            {/* ── VERIFICATION STAMP ─────────────────────────────────────── */}
            <header className="relative">
              <div className="absolute -inset-4 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative bg-card/30 backdrop-blur-2xl border border-emerald-500/20 rounded-[2.5rem] p-10 lg:p-14 overflow-hidden">

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />
                <div className="absolute top-0 right-12 w-[2px] h-24 bg-linear-to-b from-emerald-500/40 to-transparent" />

                <div className="flex flex-col lg:flex-row justify-between gap-8 items-start">
                  <div className="space-y-5">
                    {/* Verified chip */}
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        Cryptographically Verified
                      </span>
                    </div>

                    {/* Main title */}
                    <div>
                      <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-foreground leading-tight">
                        {engagement.role}
                      </h1>
                      <p className="text-xl text-muted-foreground font-light mt-2 tracking-wide flex items-center gap-2">
                        <Building2 className="w-5 h-5 shrink-0" />
                        {engagement.organization_name}
                      </p>
                    </div>

                    {/* Duration badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl shrink-0">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-500">
                        {fmtDuration(engagement.start_date, engagement.end_date)}
                      </span>
                    </div>
                  </div>

                  {/* Right: verification readout */}
                  <div className="bg-background/70 border border-border/30 rounded-2xl p-6 min-w-[260px] space-y-4 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-2 text-emerald-500 mb-2 pb-4 border-b border-border/20">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Ledger Status</span>
                      <span className="ml-auto text-[10px] font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        VERIFIED
                      </span>
                    </div>
                    <div className="space-y-3 text-left">
                      <div>
                        <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-0.5">Engagement ID</span>
                        <span className="text-[11px] font-mono text-muted-foreground/80 break-all">{engagement.id}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-0.5">Verification Type</span>
                        <span className="text-sm text-foreground font-medium capitalize">{engagement.verification_type ?? 'Standard'}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-0.5">Signed On</span>
                        <span className="text-sm text-foreground font-medium">{fmtDate(engagement.verified_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* ── DETAIL GRID ──────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Engagement Details */}
              <div className="lg:col-span-2 bg-card/20 backdrop-blur-xl border border-border/20 rounded-3xl p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-border/20 pb-6">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Engagement Record</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <MetaCell icon={Building2} label="Organisation"  value={engagement.organization_name} />
                  <MetaCell icon={Briefcase}  label="Role / Position" value={engagement.role} />
                  <MetaCell icon={Calendar}   label="Start Date"   value={fmtDate(engagement.start_date)} />
                  <MetaCell icon={Calendar}   label="End Date"     value={fmtDate(engagement.end_date)} />
                  <MetaCell icon={Clock}      label="Duration"     value={fmtDuration(engagement.start_date, engagement.end_date)} />
                  <MetaCell icon={ShieldCheck} label="Verification Type" value={engagement.verification_type ?? 'Standard'} highlight />
                </div>

                {/* Verification timestamp footer */}
                <div className="pt-6 border-t border-border/10 flex items-center gap-3">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                  <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
                    Immutably signed to ledger on {fmtDate(engagement.verified_at)}
                  </span>
                </div>
              </div>

              {/* Claimant (Student) identity */}
              <div className="bg-card/20 backdrop-blur-xl border border-border/20 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-border/20 pb-6">
                  <Fingerprint className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Claimant Identity</span>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-xl font-light text-primary">
                      {(student.full_name || '?').split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')}
                    </span>
                  </div>
                  <div>
                    <Link
                      to={`/profile/${studentId}`}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {student.full_name}
                    </Link>
                    {student.title && (
                      <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5">
                        {student.title}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {student.institution && (
                    <div>
                      <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Institution</span>
                      <span className="text-sm text-foreground">{student.institution}</span>
                    </div>
                  )}
                  <div>
                    <span className="block text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Decentralized ID (DID)</span>
                    <span className="text-[11px] font-mono text-muted-foreground/80 break-all">{student.ledger_id}</span>
                  </div>
                </div>

                <Link
                  to={`/profile/${studentId}`}
                  className="mt-2 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  View Full Ledger →
                </Link>
              </div>
            </div>

            {/* ── ORACLE AUTHORITY (SUPERVISOR) ──────────────────────────── */}
            {engagement.supervisor_profile_id && (
              <div className="bg-card/20 backdrop-blur-xl border border-primary/15 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-primary/40 to-transparent" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-light text-primary">
                          {(engagement.supervisor_full_name || '?').split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')}
                        </span>
                      </div>
                      {/* Badge */}
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-background border border-border/30 rounded-full flex items-center justify-center shadow">
                        <Award className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Oracle Authority</span>
                      </div>
                      <p className="text-lg font-medium text-foreground tracking-tight">{engagement.supervisor_full_name}</p>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Credentialed Verifier</p>
                    </div>
                  </div>

                  <Link
                    to={`/supervisor/${engagement.supervisor_profile_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    View Oracle Profile →
                  </Link>
                </div>
              </div>
            )}

            {/* ── ENGAGEMENT SCOPE ───────────────────────────────────────── */}
            {(engagement.summary || (engagement.highlights && engagement.highlights.length > 0) || (engagement.skills && engagement.skills.length > 0) || (engagement.links && engagement.links.length > 0)) && (
              <div className="bg-card/20 backdrop-blur-xl border border-border/20 rounded-3xl p-8 space-y-12">
                <div className="flex items-center gap-3 border-b border-border/20 pb-6">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Engagement Scope</span>
                </div>

                {engagement.summary && (
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                       Overview
                    </h3>
                    <div className="border-l-2 border-primary/30 pl-5 py-1">
                      <p className="text-[14px] leading-[1.8] text-muted-foreground whitespace-pre-wrap">
                        {engagement.summary}
                      </p>
                    </div>
                  </div>
                )}

                {engagement.highlights && engagement.highlights.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                       Key Deliverables & Highlights
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {engagement.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 p-4 bg-background/50 border border-border/30 rounded-2xl hover:border-border/60 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-[13px] leading-relaxed text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {engagement.skills && engagement.skills.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                       Verified Skills Acquired
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {engagement.skills.map((s, idx) => (
                        <div key={idx} className="group relative overflow-hidden px-3.5 py-2 bg-primary/10 border border-primary/30 rounded-xl flex items-center gap-2.5 shadow-sm transition-all hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5">
                           <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                           <Shield className="w-3.5 h-3.5 text-primary" />
                           <span className="text-[12px] font-bold tracking-wide text-foreground capitalize relative z-10">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {engagement.links && engagement.links.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                       Related Links & Artifacts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {engagement.links.map((lnk, idx) => (
                        <a key={idx} href={lnk} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-background/50 border border-border/30 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <ExternalLink className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-[13px] text-foreground font-medium truncate">
                              {(() => {
                                try { return new URL(lnk).hostname } 
                                catch { return lnk.replace(/^https?:\/\//, '').split('/')[0] } 
                              })()}
                            </span>
                          </div>
                          <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground rotate-145 group-hover:text-primary transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── VERIFICATION NOTICE ──────────────────────────────────────── */}
            <div className="flex items-start gap-4 px-6 py-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  This record has been independently verified on the Provenancy Ledger
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Verification was performed by a credentialed supervisor, cryptographically signed and
                  immutably recorded. This credential cannot be falsified or retroactively altered.
                </p>
              </div>
            </div>

            {/* Terminal proof line */}
            <div className="bg-background border border-border/20 rounded-2xl px-6 py-4 font-mono text-[11px] text-muted-foreground/60 flex items-center gap-3 overflow-hidden">
              <Terminal className="w-3.5 h-3.5 shrink-0 text-primary/50" />
              <span className="truncate">
                LEDGER · ENG:{engagement.id} · STUDENT:{student.ledger_id}{engagement.supervisor_full_name ? ` · ORACLE:${engagement.supervisor_full_name.toUpperCase()}` : ''} · STATUS:VERIFIED · {fmtDate(engagement.verified_at).toUpperCase()}
              </span>
            </div>

          </div>
        )}
      </main>

      <Footer className="border-t border-border/10 bg-background/80 backdrop-blur-md relative z-20" />
    </div>
  )
}
