import { CheckCircle2, ChevronLeft, ChevronRight, Code, ShieldCheck, Activity, Search, AlertCircle, Fingerprint } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { PageContainer, StatusBadge, EmptyState } from '../components/workspace/SharedPrimitives'

export default function SupervisorRequests() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Pending')

  const requests = [
    {
      id: "PRV-REQ-0089", 
      studentName: "Alex Carter",
      studentId: "PRV-2024-0089",
      org: "Stark Industries",
      role: "Research Intern",
      duration: "120 Hours",
      status: "Pending",
      date: "Oct 24, 2024",
      trustScore: 98
    },
    {
      id: "PRV-REQ-0112",
      studentName: "Elena Rodriguez",
      studentId: "PRV-2024-0112",
      org: "Bio-Tech Labs",
      role: "Lab Assistant",
      duration: "45 Hours",
      status: "Pending",
      date: "Oct 24, 2024",
      trustScore: 85
    },
    {
      id: "PRV-REQ-0945",
      studentName: "Marcus Thorne",
      studentId: "PRV-2023-0945",
      org: "Nexus Media",
      role: "Copywriter",
      duration: "80 Hours",
      status: "Pending",
      date: "Oct 24, 2024",
      trustScore: 72
    }
  ]

  const filteredRequests = requests.filter(r => r.status === activeTab)

  return (
    <SupervisorLayout>
      <div className="relative min-h-screen">
        
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
          <div className="absolute top-[40%] -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>
        </div>

        <PageContainer className="relative z-10 pt-10">
          
          {/* Header */}
          <header className="mb-12 relative">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border/20 pb-8">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full">
                       <div className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--destructive))]"></div>
                       <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-destructive">Verification Authority</span>
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Engagement Validation</h2>
                  <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                    Review and mutually sign student work history records for institutional archival. Each cryptographic record requires oracle validation to maintain ledger integrity.
                  </p>
               </div>
               
               {/* Quick Search */}
               <div className="w-full lg:w-72 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by ID or Node..." 
                    className="w-full bg-background/50 border border-border/50 rounded-xl pl-11 pr-4 py-3.5 text-[11px] uppercase tracking-widest font-bold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm"
                  />
               </div>
             </div>
          </header>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-10">
            {['Pending', 'Accepted', 'Rejected'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 rounded-xl border transition-all flex items-center gap-2 ${
                  activeTab === tab 
                    ? 'bg-primary/10 border-primary/30 text-primary shadow-[0_0_15px_rgba(26,35,126,0.15)]' 
                    : 'bg-card/20 border-border/30 text-muted-foreground hover:bg-card/40 hover:text-foreground hover:border-border/50'
                }`}
              >
                {activeTab === tab && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  {tab}
                </span>
                <span className={`ml-2 px-2 py-0.5 rounded text-[9px] font-mono ${activeTab === tab ? 'bg-primary/20 text-primary' : 'bg-background border border-border/30 text-muted-foreground'}`}>
                  {tab === 'Pending' ? requests.length : 0}
                </span>
              </button>
            ))}
          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main List Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {filteredRequests.length > 0 ? filteredRequests.map((req, i) => (
                <div 
                  key={i} 
                  onClick={() => navigate(`/student/engagements/${req.id}?role=supervisor`)}
                  className="group cursor-pointer bg-card/20 backdrop-blur-md p-8 border border-border/20 hover:border-primary/40 transition-all duration-300 rounded-[2rem] shadow-sm relative overflow-hidden"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary/50 opacity-0 group-hover:opacity-100 shadow-[0_0_20px_hsl(var(--primary))] transition-all duration-300"></div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10 border-b border-border/15 pb-6">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-xl bg-background border border-border/20 flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors">
                          <Fingerprint className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                       </div>
                       <div>
                         <h3 className="text-2xl font-light tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors">{req.studentName}</h3>
                         <div className="flex items-center gap-3">
                           <span className="text-muted-foreground text-[10px] uppercase font-mono tracking-widest bg-background px-2 py-0.5 rounded border border-border/50">{req.studentId}</span>
                           <span className="w-1 h-1 bg-border rounded-full"></span>
                           <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{req.org}</span>
                         </div>
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <StatusBadge status={req.status} />
                      <span className="text-[9px] text-muted-foreground uppercase font-mono tracking-widest opacity-60">REQ::{req.id.split('-')[2]}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Claimed Role</p>
                      <p className="text-sm font-medium text-foreground">{req.role}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Duration</p>
                      <p className="text-sm font-medium text-foreground">{req.duration}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Submission</p>
                      <p className="text-sm font-medium text-foreground">{req.date}</p>
                    </div>
                    <div className="space-y-2 lg:text-right">
                       <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Node Trust Score</p>
                       <div className="flex items-center lg:justify-end gap-2">
                         <div className="w-16 h-1 bg-border/40 rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-primary" style={{ width: `${req.trustScore}%` }}></div>
                         </div>
                         <span className="text-[11px] font-mono font-bold text-foreground">{req.trustScore}%</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border/10 flex justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Evaluate Node Signature <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )) : (
                <EmptyState 
                  icon={ShieldCheck} 
                  title={`No ${activeTab} Requests`} 
                  description="The institutional verification queue is currently clear for this category. No cryptographic attestations require your signature." 
                  actionText="View Oracle Dashboard" 
                  onAction={() => navigate('/supervisor/dashboard')} 
                />
              )}
              
              {/* Footer Pagination/Bulk Actions */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-8 p-6 bg-background/50 backdrop-blur border border-border/20 rounded-2xl gap-4">
                <div className="flex items-center gap-4">
                  <button className="bg-primary/10 text-primary border border-primary/20 px-6 py-2.5 rounded-xl font-bold text-[10px] flex items-center gap-2 hover:bg-primary transition-colors hover:text-primary-foreground group uppercase tracking-[0.2em]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Quick Verify All Mined
                  </button>
                  <button className="bg-transparent border border-border/40 text-muted-foreground px-6 py-2.5 rounded-xl font-bold text-[10px] hover:bg-muted/30 transition-colors uppercase tracking-[0.2em] hover:text-foreground">
                    Export Ledger Tree
                  </button>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/20 hover:bg-muted/30 hover:border-border/40 hover:text-foreground transition-colors disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2">Page 1 of 1</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/20 hover:bg-muted/30 hover:border-border/40 hover:text-foreground transition-colors disabled:opacity-50">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Asymmetric Sidebar Block */}
            <div className="hidden lg:block lg:col-span-4 sticky top-24 h-max">
              <div className="bg-card/20 backdrop-blur-xl p-8 border border-border/30 rounded-3xl relative overflow-hidden shadow-sm">
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none"></div>

                <div className="flex items-center gap-3 border-b border-border/20 pb-6 mb-8 relative z-10">
                   <Activity className="w-4 h-4 text-primary" />
                   <h4 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Queue Metrics</h4>
                </div>
                
                <div className="space-y-10 relative z-10">
                  <div className="flex items-end gap-3 group">
                    <span className="text-7xl font-light tracking-tighter text-foreground group-hover:text-primary transition-colors leading-none">{filteredRequests.length.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-muted-foreground mb-2 font-bold uppercase tracking-[0.2em]">{activeTab} Blocks</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-background/80 p-6 border border-border/30 rounded-2xl shadow-inner">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-4 font-bold flex justify-between items-center">
                         Oracle System Health
                         <span className="text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">98.2%</span>
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 bg-border/30 overflow-hidden rounded-full">
                          <div className="h-full bg-primary w-[98.2%] shadow-[0_0_8px_hsl(var(--primary))]"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 p-6 border border-primary/20 rounded-2xl flex gap-3 items-start">
                      <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider font-medium">
                        "Your verification structurally guarantees the academic integrity of all experiential learning signatures within the institutional perimeter."
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>

          </div>
        </PageContainer>
      </div>
    </SupervisorLayout>
  )
}
