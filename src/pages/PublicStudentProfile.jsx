import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import { ArrowLeft, Fingerprint, Lock, ShieldCheck, FileCheck, CheckCircle2, Activity, Hexagon, Terminal, Network } from 'lucide-react'

export default function PublicStudentProfile() {
  const { id } = useParams()
  const token = `PRV-2024-AC-${id || '7892'}`

  const dummyEngagements = [
    {
      title: "Software Engineering Intern",
      organization: "TechCorp",
      duration: "3 months",
      hash: "0x8F9aC2...4dE1",
      supervisorName: "Dr. Sarah Miller",
      verificationDate: "Oct 24, 2024"
    },
    {
      title: "Open Source Contributor",
      organization: "Node.js Foundation",
      duration: "6 months",
      hash: "0x1A2bC3...9fE4",
      supervisorName: "Marcus Thorne",
      verificationDate: "July 12, 2024"
    },
    {
      title: "Graduate Research Assistant",
      organization: "University Data Science Lab",
      duration: "12 months",
      hash: "0x9C4dE5...2aB7",
      supervisorName: "Prof. Elena Volkov",
      verificationDate: "May 30, 2024"
    }
  ]

  const dummySkills = [
    { name: "Python", verifications: 12, power: 90 },
    { name: "React Architecture", verifications: 8, power: 75 },
    { name: "Machine Learning", verifications: 5, power: 60 },
    { name: "Systems Design", verifications: 3, power: 45 }
  ]

  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[#ffffff02] bg-[length:32px_32px]" style={{ backgroundImage: 'radial-gradient(circle, var(--tw-colors-border) 1px, transparent 1px)' }}></div>
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
        
        {/* Identity Header */}
        <header className="mb-16 relative">
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/10 to-transparent blur-[80px] rounded-[100px] opacity-70"></div>
          <div className="bg-card/30 backdrop-blur-2xl border border-border/20 rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row gap-10 lg:items-center justify-between shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative">
            
            {/* Inner Top/Right Line decorations */}
            <div className="absolute top-0 right-0 w-full h-[2px] bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="absolute top-0 right-10 w-[2px] h-32 bg-linear-to-b from-primary/30 to-transparent"></div>

            <div className="flex items-center gap-10 relative z-10">
              {/* Monolithic Avatar placeholder */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary rounded-[2rem] blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2rem] bg-background border border-border/40 p-2 relative z-10 overflow-hidden shadow-2xl">
                   <div className="w-full h-full bg-card rounded-xl flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-primary/5"></div>
                     <span className="text-5xl font-light text-foreground/80 tracking-tighter">AC</span>
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
                  <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-foreground">Alex Carter</h1>
                  <p className="text-xl lg:text-2xl text-muted-foreground font-light mt-2 tracking-wide">Computer Science Candidate</p>
                </div>
              </div>
            </div>

            {/* Cryptographic Hash readout */}
            <div className="flex flex-col gap-4 text-left lg:text-right bg-background/60 p-6 rounded-2xl border border-border/20 backdrop-blur-md relative z-10 min-w-[300px]">
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Decentralized Identifier (DID)</span>
                <span className="text-sm font-mono text-foreground tracking-wider">{token}</span>
              </div>
              <div className="h-px bg-border/30 w-full my-1"></div>
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Ledger Status</span>
                <div className="flex items-center lg:justify-end gap-2 text-primary font-mono text-xs">
                  <Terminal className="w-3.5 h-3.5" />
                  SYNCED_WAITING
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Triple Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
          
          {/* Column 1: Trust Profile & Oracles (Col-3) */}
          <div className="lg:col-span-3 space-y-8 sticky top-24">
            
            {/* Trust Matrix */}
            <div className="bg-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 relative overflow-hidden group">
               <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary/10 via-primary/50 to-primary/10"></div>
               <div className="mb-8">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                   <Network className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Network Trust Index</h2>
                 <div className="text-5xl font-light tracking-tighter text-foreground mt-2">9.8<span className="text-2xl text-muted-foreground">/10</span></div>
               </div>
               
               <div className="space-y-5">
                 <div>
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                     <span>Identity Nodes</span>
                     <span className="text-primary hover:animate-pulse">100%</span>
                   </div>
                   <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[100%] rounded-full shadow-[0_0_10px_hsl(var(--primary))]"></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                     <span>Skill Verification</span>
                     <span className="text-foreground">84%</span>
                   </div>
                   <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                     <div className="h-full bg-border w-[84%] rounded-full"></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                     <span>Oracle Endorsements</span>
                     <span className="text-foreground">92%</span>
                   </div>
                   <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                     <div className="h-full bg-border w-[92%] rounded-full"></div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Academic Oracle */}
            <div className="bg-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-6 border-b border-border/20 pb-6">
                <FileCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Linked Oracle</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-background border border-border/40 p-1 shrink-0 relative overflow-hidden">
                  <img className="w-full h-full object-cover rounded-xl filter grayscale contrast-125 opacity-70" alt="University crest" src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=150"/>
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-1 tracking-tight leading-tight">Stanford University</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Computer Science Inst.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: The Timeline Chain (Col-6) */}
          <div className="lg:col-span-6 space-y-8 relative">
            
            <div className="flex items-center justify-between mb-8 overflow-hidden rounded-2xl border border-border/20 bg-background/50 backdrop-blur-md p-4 px-6 md:px-8 shadow-sm">
               <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-foreground">Verified Execution Chain</h2>
               <span className="px-3 py-1 bg-border/30 rounded text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{dummyEngagements.length} Blocks</span>
            </div>

            <div className="relative pl-8 md:pl-16 space-y-12 pb-10">
              {/* Vertical Timeline Guide */}
              <div className="absolute left-[39px] md:left-[71px] top-6 bottom-0 w-[2px] bg-linear-to-b from-primary via-border/30 to-border/10"></div>

              {dummyEngagements.map((eng, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-8 md:-left-16 top-6 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.5)] z-10 transition-transform duration-300 group-hover:scale-125">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  </div>

                  {/* Horizontal connecting line */}
                  <div className="absolute -left-8 md:-left-16 top-8 w-8 md:w-16 h-[2px] bg-primary/40 -z-10 transition-colors duration-300 group-hover:bg-primary"></div>

                  <article className="bg-card/10 backdrop-blur-xl border border-border/20 hover:border-border/50 transition-all rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
                    {/* Glowing highlight inside card */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/5 to-transparent blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    <div className="flex flex-col gap-6 relative z-10">
                      
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-1 max-w-[80%]">
                          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">{eng.title}</h3>
                          <p className="text-lg font-medium text-muted-foreground">{eng.organization}</p>
                        </div>
                        <div className="shrink-0 text-left md:text-right pt-2 md:pt-0">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg">
                            <Lock className="w-3.5 h-3.5 text-primary" />
                            <span className="font-mono text-[10px] text-primary">{eng.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-border/15">
                        <div className="space-y-1.5">
                          <span className="block text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Node Supervisor</span>
                          <span className="text-sm font-medium">{eng.supervisorName}</span>
                        </div>
                        <div className="space-y-1.5">
                          <span className="block text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Timestamp</span>
                          <span className="text-sm font-mono text-muted-foreground">{eng.verificationDate}</span>
                        </div>
                        <div className="space-y-1.5 col-span-2 lg:col-span-1">
                          <span className="block text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Block Hash</span>
                          <span className="text-[11px] font-mono p-1.5 bg-background border border-border/30 rounded text-muted-foreground/80 tracking-widest">{eng.hash}</span>
                        </div>
                      </div>

                    </div>
                  </article>
                </div>
              ))}
            </div>

          </div>

          {/* Column 3: Distributed Skills Matrix (Col-3) */}
          <div className="lg:col-span-3 space-y-8">
            
            <div className="bg-card/20 backdrop-blur-xl border border-border/30 rounded-3xl p-8 relative overflow-hidden pb-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none"></div>
              
              <div className="flex items-center gap-3 border-b border-border/20 pb-6 mb-8">
                <Hexagon className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Verified Capabilities</span>
              </div>
              
              <div className="space-y-8">
                {dummySkills.map((skill, idx) => (
                  <div key={idx} className="space-y-3 group">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold tracking-wide text-foreground">{skill.name}</span>
                      <span className="font-mono text-xs text-primary">{skill.verifications} <span className="text-[9px]">SIGS</span></span>
                    </div>
                    
                    {/* Visual power bar */}
                    <div className="w-full h-1 bg-background rounded-full overflow-hidden relative">
                       <div 
                         className="absolute inset-y-0 left-0 bg-primary/50 group-hover:bg-primary transition-colors peer" 
                         style={{ width: `${skill.power}%` }}
                       ></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

             <div className="mt-8 pt-6 relative z-10 px-4 text-center">
                <p className="text-[9px] leading-relaxed text-muted-foreground font-medium uppercase tracking-widest">
                  Endorsements immutably recorded. <br/> tampering structurally impossible.
                </p>
            </div>

          </div>

        </div>
      </main>
      
      <Footer className="border-t border-border/10 bg-background/80 backdrop-blur-md relative z-20" />
    </div>
  )
}
