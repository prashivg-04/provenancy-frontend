import { useState, useEffect } from 'react'
import { Terminal, Lightbulb, Activity, CheckCircle2, Clock, ShieldCheck, Network, Award, FileText, Plus } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { PageContainer, StatusBadge } from '../components/workspace/SharedPrimitives'
import { useNavigate } from 'react-router-dom'
import { getStudentMe, getUserSkills, getEngagements } from '../lib/api'
import { handleError } from '../lib/handleError'

// ── Skeleton shimmer ──────────────────────────────────────────────────────────
function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-border/20 rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState(null)
  const [skills, setSkills] = useState({ declared: [], verified: [] })
  const [engagements, setEngagements] = useState([])      // latest 5 for timeline
  const [allEngagements, setAllEngagements] = useState([]) // full list for counts
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [profileRes, skillsRes, engRes] = await Promise.all([
          getStudentMe(),
          getUserSkills(),
          getEngagements()
        ])
        setProfileData(profileRes.data)
        setSkills(skillsRes.data)
        const all = engRes.data || []
        setAllEngagements(all)
        // Latest 5 for timeline
        const sorted = [...all]
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 5)
        setEngagements(sorted)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const profile = profileData?.profile
  const ledgerId = profileData?.ledger_id
  const verifiedCount = allEngagements.filter(e => e.status === 'verified').length
  const pendingCount  = allEngagements.filter(e => e.status === 'pending').length

  return (
    <StudentLayout>
      <PageContainer>
        
        {/*
          =============================================
          HERO: Security & Metrics Banner
          =============================================
        */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 relative z-10 border-b border-border/10 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                   <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-accent">
                     Active Ledger Profile
                   </span>
                   {/* Real ledger ID */}
                   {ledgerId && !loading && (
                     <span className="text-[9px] font-mono text-accent/70 ml-1">· {ledgerId}</span>
                   )}
                </div>
              </div>

              {loading ? (
                <>
                  <Skeleton className="h-10 w-72 mb-3" />
                  <Skeleton className="h-4 w-96 mb-1" />
                  <Skeleton className="h-4 w-64" />
                </>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3 leading-[1.1]">
                    {profile?.full_name
                      ? <>{profile.full_name.split(' ')[0]}<span className="text-muted-foreground/40">'s</span> Verified<br />Work Record.</>
                      : <>Your Verified<br />Work Record.</>}
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                    {profile?.institution
                      ? `Every engagement you complete is cryptographically signed by your supervisor and permanently stored — building a tamper-proof professional identity that speaks for itself.`
                      : 'Every engagement you log is cryptographically signed by a verified supervisor and sealed on the ledger — building a tamper-proof professional identity that no one can dispute.'}
                  </p>
                  {profile?.title && (
                    <p className="text-xs text-primary/70 font-mono mt-3 uppercase tracking-widest">
                      {profile.title}
                    </p>
                  )}
              </>
              )}
            </div>
            
            {/* Quick Stats Bento */}
            <div className="flex gap-4">
              <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-xl p-4 min-w-[140px] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-light text-foreground tracking-tighter">
                    {loading ? '—' : String(verifiedCount).padStart(2, '0')}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Verified<br/>Engagements
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-xl p-4 min-w-[140px] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xl font-light text-foreground tracking-tighter">
                    {loading ? '—' : String(pendingCount).padStart(2, '0')}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Pending<br/>Verification
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 
          =============================================
          MAIN CONTENT GRID
          =============================================
        */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Record Chronology (Timeline) */}
          <div className="xl:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity className="w-4 h-4 text-muted-foreground" /> Record Chronology
              </h2>
              <button
                onClick={() => navigate('/student/engagements')}
                className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase hover:bg-primary/10 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-primary/20"
              >
                View Full Registry
              </button>
            </div>

            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-linear-to-b before:from-transparent before:via-border/50 before:to-transparent">

              {/* Loading skeletons */}
              {loading && [
                ...Array(3)].map((_, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="w-10 h-10 rounded-full bg-border/20 animate-pulse shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border border-border/20 bg-card/20 space-y-3">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {!loading && engagements.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary/40" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">No engagements on record yet</p>
                    <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                      Log your first internship or freelance engagement to start building your verified work record.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/student/engagements/create')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary/20 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Log First Engagement
                  </button>
                </div>
              )}

              {/* Real engagement timeline items */}
              {!loading && engagements.map((eng, i) => {
                const isVerified = eng.status === 'verified'
                const isPending = eng.status === 'pending'
                const startDate = eng.start_date ? new Date(eng.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'
                const endDate = eng.end_date ? new Date(eng.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'
                const statusLabel = eng.status.charAt(0).toUpperCase() + eng.status.slice(1)

                return (
                  <div
                    key={eng.id}
                    onClick={() => navigate(`/student/engagements/${eng.id}`)}
                    className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer ${
                      isVerified ? 'is-active' : ''
                    }`}
                  >
                    {/* Node icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 group-hover:scale-110 transition-transform ${
                      isVerified
                        ? 'border-primary/30 bg-background shadow-[0_0_15px_rgba(26,35,126,0.2)] text-primary'
                        : 'border-border bg-background text-muted-foreground opacity-70 group-hover:opacity-100'
                    }`}>
                      {isVerified ? <Terminal className="w-4 h-4" /> : <Lightbulb className="w-4 h-4" />}
                    </div>

                    {/* Card */}
                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 ${
                      isVerified
                        ? 'border-border/50 bg-card/40 group-hover:border-primary/40 group-hover:bg-card/80'
                        : 'border-border/30 bg-background/30 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-border/60'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isVerified ? 'text-muted-foreground bg-background/80 border-border/50' : 'text-muted-foreground bg-card/80 border-border/50'
                        }`}>{startDate} — {endDate}</span>
                        <StatusBadge status={statusLabel} />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-1 capitalize">{eng.role}</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">{eng.organization_name}</p>
                      {eng.summary && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{eng.summary}</p>
                      )}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-border/10">
                        <span className="text-[9px] px-2 py-1 bg-primary/5 text-primary border border-primary/10 rounded font-mono uppercase">
                          Ref: {eng.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className={`text-[9px] px-2 py-1 rounded font-bold tracking-widest uppercase border ${
                          isVerified
                            ? 'bg-background border-border/50 text-muted-foreground'
                            : isPending
                              ? 'bg-orange-500/5 border-orange-500/20 text-orange-500/70'
                              : 'bg-background border-border/50 text-muted-foreground'
                        }`}>
                          {isVerified ? 'Node_Verified' : isPending ? 'Awaiting Signature' : statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>

          {/* 
            =============================================
            RIGHT: Skills & Protocol Integrity
            =============================================
          */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Endorsed Proficiencies Bento */}
            <div className="bg-card/30 backdrop-blur-md rounded-2xl border border-border/50 p-6 shadow-sm overflow-hidden relative group flex flex-col min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-[11px] font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Endorsed Proficiencies
                </h2>
                <button 
                  onClick={() => navigate('/student/skills')}
                  className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase hover:bg-primary/10 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-primary/20"
                >
                  Manage Assets
                </button>
              </div>
              
              <div className="space-y-6 relative z-10 flex-1">
                {skills.verified.length === 0 && skills.declared.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center h-[100px] opacity-50 text-center space-y-2 py-4">
                    <ShieldCheck className="w-8 h-8 text-primary/40" />
                    <p className="text-xs">No skills configured in registry.</p>
                  </div>
                )}
                
                {skills.verified.map((v, i) => (
                  <div key={`v-${i}`}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-foreground capitalize">{v.name}</span>
                      <span className="text-[9px] text-primary uppercase font-bold tracking-widest px-2 py-0.5 bg-primary/10 rounded border border-primary/20">
                        {v.count > 3 ? "Gold Standard" : (v.count > 1 ? "Verified Level II" : "Verified Level I")}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-background border border-border/50 overflow-hidden rounded-full">
                      <div className="h-full bg-linear-to-r from-primary to-accent relative" style={{ width: `${Math.min(30 + v.count * 20, 100)}%` }}>
                         <div className="absolute top-0 right-0 bottom-0 w-10 bg-linear-to-r from-transparent to-white/30 animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {skills.declared.length > 0 && (
                  <div className="pt-2 border-t border-border/10 mt-2">
                    <h3 className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-3">Declared</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.declared.map((d, i) => (
                        <span key={`d-${i}`} className="text-[9px] px-2 py-1 bg-card border border-border text-muted-foreground font-bold rounded uppercase tracking-widest hover:border-primary/50 transition-colors cursor-default">
                          {d.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Protocol Integrity Card */}
            <div className="bg-background/40 backdrop-blur-sm rounded-2xl border border-border/50 p-6 flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex shrink-0 items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-muted-foreground" />
               </div>
               <div>
                  <h3 className="text-[11px] font-bold text-foreground uppercase tracking-widest mb-1">Cryptographic Security</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                     All records are permanently bound to institutional cryptographic signatures. Manipulation post-verification requires network consensus override.
                  </p>
               </div>
            </div>
            
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-4 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <Network className="w-4 h-4 text-primary" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Network Sync</span>
                </div>
                <div className="flex gap-2 items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                   <span className="text-[10px] font-mono text-primary">Connected</span>
                </div>
            </div>

          </div>
        </div>
      </PageContainer>
    </StudentLayout>
  )
}
