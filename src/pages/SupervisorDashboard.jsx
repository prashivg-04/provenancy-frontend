import { ShieldCheck, CircleAlert, CheckCircle2, XCircle, RefreshCcw, Terminal, Network, Search, Activity, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { PageContainer, StatusBadge } from '../components/workspace/SharedPrimitives'

export default function SupervisorDashboard() {
  const pendingRequests = [
    { name: "Alex Carter", title: "Stanford University • Graduate Research Assistant", duration: "6 months", hash: "0x82...91a" },
    { name: "Elena Rodriguez", title: "CERN Collaborations • PhD Candidate", duration: "12 months", hash: "0x4b...29c" }
  ]

  const feedItems = [
    { title: "Alex Carter for Software Intern", status: "Verified", icon: CheckCircle2, time: "4h ago", extra: "HASH: 0x82f..91a", color: "text-primary" },
    { title: "1 request for Lab Assistant", status: "Rejected", icon: XCircle, time: "8h ago", extra: "NON-COMPLIANT ROLE", color: "text-destructive" },
    { title: "Daily ledger reconciliation complete.", status: "System", icon: RefreshCcw, time: "12h ago", extra: "STATUS: SYNCED", color: "text-muted-foreground" }
  ]

  return (
    <SupervisorLayout>
      <PageContainer>
        
        {/*
          =============================================
          HERO: Security & Metrics Banner
          =============================================
        */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 relative z-10 border-b border-border/10 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full">
                   <div className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse"></div>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-destructive">Oracle View Active</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-2">Registry Oversight</h1>
              <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                Institutional ledger management for verified student engagements and professional milestones. Validating the integrity of the professional record.
              </p>
            </div>
            
            {/* Quick Actions / Node Sync */}
             <div className="bg-primary/5 rounded-2xl border border-primary/20 p-4 min-w-[200px] flex items-center justify-between shadow-[0_0_15px_rgba(26,35,126,0.1)]">
                <div className="flex gap-3 items-center">
                  <Network className="w-4 h-4 text-primary" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary leading-tight">Consensus<br/>Sync</span>
                </div>
                <div className="flex gap-2 items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_hsl(var(--primary))]"></div>
                   <span className="text-[10px] font-mono text-primary">Live</span>
                </div>
            </div>
          </div>
        </div>

        {/* 
          =============================================
          STATISTICS BENTO GRID
          =============================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          
          {/* Highlight Action Card */}
          <div className="md:col-span-2 bg-background/40 backdrop-blur-xl p-8 rounded-[2rem] border border-border/20 relative overflow-hidden group hover:border-primary/40 transition-all shadow-sm">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
            
            <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] mb-8 uppercase flex items-center gap-2">
              <CircleAlert className="w-3.5 h-3.5 text-primary" /> 
              Pending Verifications
            </p>
            
            <div className="flex items-baseline gap-4 relative z-10">
              <span className="text-6xl font-light text-foreground tracking-tighter group-hover:text-primary transition-colors">12</span>
              <div className="flex items-center gap-1 text-primary/90 bg-primary/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-primary/20">
                Action Required
              </div>
            </div>
            
            <div className="mt-8 flex gap-2 relative z-10 w-full max-w-xs">
               <div className="h-1.5 w-[30%] bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"></div>
               <div className="h-1.5 w-[70%] bg-border/40 rounded-full"></div>
            </div>
          </div>

          {/* Metric Card 1 */}
          <div className="bg-card/30 backdrop-blur-md p-8 rounded-[2rem] border border-border/20 flex flex-col justify-between hover:bg-card/50 transition-colors">
            <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Approved Blocks</p>
            <div className="mt-6">
              <span className="text-4xl font-light text-foreground tracking-tight">485</span>
              <p className="text-[10px] uppercase font-mono text-primary mt-2 flex items-center gap-1">
                 <Terminal className="w-3 h-3" /> +3 Current Cycle
              </p>
            </div>
          </div>

          {/* Metric Card 2 */}
          <div className="bg-card/30 backdrop-blur-md p-8 rounded-[2rem] border border-border/20 flex flex-col justify-between hover:bg-card/50 transition-colors">
            <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Forged Rejections</p>
            <div className="mt-6">
              <span className="text-4xl font-light text-foreground tracking-tight">14</span>
              <p className="text-[10px] uppercase font-mono text-destructive mt-2 flex items-center gap-1">
                 <XCircle className="w-3 h-3" /> 2.8% Anomaly Rate
              </p>
            </div>
          </div>
        </div>

        {/* 
          =============================================
          CONTENT ROW: LEDGER QUEUE & NETWORK FEED
          =============================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Immediate Queue View */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/10">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" /> Immediate Queue
              </h2>
              <Link to="/supervisor/requests" className="text-[10px] font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded uppercase tracking-widest transition-colors border border-transparent hover:border-primary/20">
                View Ledger
              </Link>
            </div>
            
            <div className="space-y-4">
              {pendingRequests.map((req, i) => (
                <div key={i} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-card/10 backdrop-blur-sm hover:bg-card/30 transition-all border border-border/20 rounded-2xl hover:border-primary/30 relative overflow-hidden">
                  
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border/20 shrink-0 shadow-sm relative overflow-hidden">
                       <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                       <ShieldCheck className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">{req.name}</p>
                      <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-2">{req.title}</p>
                      <div className="flex items-center gap-2">
                         <Lock className="w-3 h-3 text-muted-foreground/50" />
                         <span className="font-mono text-[9px] text-muted-foreground uppercase">{req.hash}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 w-full md:w-auto flex items-center justify-between md:justify-end gap-10">
                    <div className="text-left w-full md:w-auto">
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-1">Eng. Duration</p>
                      <p className="text-sm font-medium text-foreground tracking-tight">{req.duration}</p>
                    </div>
                    <Link to="/supervisor/requests" className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-[0.2em] shrink-0">
                      Evaluate
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Activity Feed */}
          <div className="lg:col-span-4 relative pl-8 lg:pl-12">
            
            <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-border/50 via-border/20 to-transparent"></div>
            
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground mb-10 flex items-center gap-2">
               <Activity className="w-4 h-4 text-muted-foreground" /> Network Feed
            </h3>
            
            <div className="relative space-y-12 before:absolute before:left-[-35px] lg:before:left-[-51px] before:top-4 before:bottom-0 before:w-[2px] before:bg-linear-to-b before:from-primary/30 before:via-border/30 before:to-transparent">
              {feedItems.map((item, i) => (
                <div key={i} className="relative group">
                  {/* Node Dot */}
                  <div className={`absolute -left-[42px] lg:-left-[58px] top-1 w-4 h-4 rounded-full bg-background border-2 flex items-center justify-center z-10 transition-transform group-hover:scale-125 ${item.status === 'Verified' ? 'border-primary' : item.status === 'Rejected' ? 'border-destructive' : 'border-muted-foreground'}`}>
                     {(item.status === 'Verified' || item.status === 'System') && <div className={`w-1 h-1 rounded-full ${item.status === 'Verified' ? 'bg-primary' : 'bg-muted-foreground'}`}></div>}
                  </div>
                  
                  <div className="mb-3">
                    <StatusBadge status={item.status} />
                  </div>
                  
                  <p className="text-sm font-medium leading-relaxed text-foreground tracking-tight">
                    {item.title}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-3">
                     <span className="text-[9px] bg-background border border-border/40 px-2 py-0.5 rounded text-muted-foreground font-mono tracking-widest uppercase truncate max-w-[140px]">
                       {item.extra}
                     </span>
                     <span className="w-1 h-1 bg-border rounded-full"></span>
                     <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                       {item.time}
                     </span>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        {/* Footer Meta */}
        <footer className="mt-24 pb-8 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-card border border-border/30 rounded text-[9px] font-bold text-muted-foreground tracking-widest uppercase">
              Oracle Version 2.4.0
            </div>
            <p className="text-[10px] text-muted-foreground/40 font-bold tracking-widest uppercase">© 2024 Provenancy Systems</p>
          </div>
        </footer>

      </PageContainer>
    </SupervisorLayout>
  )
}
