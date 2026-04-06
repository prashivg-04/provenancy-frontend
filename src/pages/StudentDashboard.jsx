import { useState, useEffect } from 'react'
import { Terminal, Lightbulb, Activity, CheckCircle2, Clock, ShieldCheck, Network, Award } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { PageContainer, StatusBadge } from '../components/workspace/SharedPrimitives'
import { useNavigate } from 'react-router-dom'
import { getStudentMe, getUserSkills } from '../lib/api'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [profileRes, skillsRes] = await Promise.all([
          getStudentMe(),
          getUserSkills()
        ])
        setProfileData(profileRes.data)
        setSkills(skillsRes.data)
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
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-2">
                    {profile?.full_name
                      ? `Welcome, ${profile.full_name.split(' ')[0]}`
                      : 'Institutional Dashboard'}
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                    {profile?.institution
                      ? `Verified ledger profile for ${profile.institution}. All supervisor-signed entries are permanent and immutable.`
                      : 'Your cryptographic record of professional engagement. All verified nodes represent immutable, supervisor-signed entries in the global competency network.'}
                  </p>
                  {profile?.title && (
                    <p className="text-xs text-primary/70 font-mono mt-2 uppercase tracking-widest">
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
                  <span className="text-2xl font-light text-foreground tracking-tighter">12</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Verified<br/>Engagements
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-xl p-4 min-w-[140px] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xl font-light text-foreground tracking-tighter">02</span>
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
              <button className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase hover:bg-primary/10 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-primary/20">
                View Full Registry
              </button>
            </div>

            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-linear-to-b before:from-transparent before:via-border/50 before:to-transparent">
              
              {/* Timeline Item 1: Verified */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-background shadow-[0_0_15px_rgba(26,35,126,0.2)] text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 group-hover:scale-110 transition-transform">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-sm group-hover:border-primary/40 group-hover:bg-card/80 transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-muted-foreground bg-background/80 px-2 py-0.5 rounded border border-border/50">Jun 2023 - Present</span>
                    <StatusBadge status="Verified" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Software Intern</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">TechCorp Solutions • London, UK</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Architected robust microservices within the Core Platform team. Authored 42 production-level PRs resulting in significant latency reduction.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/10">
                    <span className="text-[9px] px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded font-mono uppercase">Ref: TC-884-X</span>
                    <span className="text-[9px] px-2 py-1 bg-background border border-border/50 text-muted-foreground rounded font-bold tracking-widest uppercase">Node_Verified</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2: Pending */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border border-border/30 bg-background/30 backdrop-blur-sm shadow-sm opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-border/60 transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-muted-foreground bg-card/80 px-2 py-0.5 rounded border border-border/50">Aug 2023 - Dec 2023</span>
                    <StatusBadge status="Pending" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Research Assistant</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">University Science Lab • Oxford</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Statistical modeling for environmental impact studies. Coordinating data collection across three regional monitoring stations.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/10">
                    <span className="text-[9px] px-2 py-1 bg-background border border-border text-muted-foreground rounded font-mono uppercase">Awaiting Signature</span>
                  </div>
                </div>
              </div>

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
