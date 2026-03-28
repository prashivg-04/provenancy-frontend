import { ShieldCheck, CircleAlert, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import SupervisorLayout from '../components/workspace/SupervisorLayout'

export default function SupervisorDashboard() {
  const pendingRequests = [
    { name: "Alex Carter", title: "Stanford University • Graduate Research Assistant", duration: "6 months" },
    { name: "Elena Rodriguez", title: "CERN Collaborations • PhD Candidate", duration: "12 months" }
  ]

  const feedItems = [
    { title: "Alex Carter for Software Intern", status: "Verified", icon: CheckCircle2, time: "4h ago", extra: "HASH: 0x82f..91a", color: "text-primary" },
    { title: "1 request for Lab Assistant", status: "Rejected", icon: XCircle, time: "8h ago", extra: "NON-COMPLIANT ROLE", color: "text-destructive" },
    { title: "Daily ledger reconciliation complete.", status: "System", icon: RefreshCcw, time: "12h ago", extra: "STATUS: SYNCED", color: "text-muted-foreground" }
  ]

  return (
    <SupervisorLayout>
      <div className="p-10 md:p-12 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-light tracking-tight text-foreground mb-4">Registry Overview</h1>
          <p className="text-muted-foreground/80 max-w-2xl font-light leading-relaxed">
            Institutional ledger management for verified student engagements and professional milestones. Validating the integrity of the professional record.
          </p>
        </header>

        {/* Statistics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {/* Highlight Card */}
          <div className="md:col-span-2 bg-muted/5 p-8 rounded-xl border border-border/10 relative overflow-hidden group hover:border-border/30 transition-all">
            <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-32 h-32 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm font-medium tracking-wide mb-8 uppercase">Pending Verification Requests</p>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-bold text-primary tracking-tighter">12</span>
              <div className="flex items-center gap-1 text-primary/90 bg-primary/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-primary/20">
                <CircleAlert className="w-3 h-3" />
                Action Required
              </div>
            </div>
            <div className="mt-8 flex gap-2">
              <div className="h-1 w-12 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"></div>
              <div className="h-1 w-32 bg-border/40 rounded-full"></div>
            </div>
          </div>

          {/* Metric Card 1 */}
          <div className="bg-background p-8 rounded-xl border border-border/10 hover:border-border/30 transition-colors">
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase mb-12 opacity-80">Approved Engagements</p>
            <span className="text-4xl font-semibold tracking-tight text-foreground">485</span>
            <p className="text-[11px] text-muted-foreground/70 mt-2 font-medium tracking-wide">+3 since yesterday</p>
          </div>

          {/* Metric Card 2 */}
          <div className="bg-background p-8 rounded-xl border border-border/10 hover:border-border/30 transition-colors">
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase mb-12 opacity-80">Rejected Engagements</p>
            <span className="text-4xl font-semibold tracking-tight text-muted-foreground">14</span>
            <p className="text-[11px] text-muted-foreground/50 mt-2 font-medium tracking-wide">2.8% rejection rate</p>
          </div>
        </div>

        {/* Content Row: Ledger & Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Verification Ledger */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium tracking-tight text-foreground">Immediate Queue View</h2>
              <Link to="/supervisor/requests" className="text-xs font-bold text-primary/70 hover:text-primary uppercase tracking-widest transition-colors">
                View Ledger
              </Link>
            </div>
            
            <div className="space-y-4">
              {pendingRequests.map((req, i) => (
                <div key={i} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-muted/5 hover:bg-muted/10 transition-all border border-transparent rounded hover:border-primary/20 cursor-pointer">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 rounded bg-background flex items-center justify-center border border-border/10 shrink-0">
                      <ShieldCheck className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{req.name}</p>
                      <p className="text-xs text-muted-foreground tracking-wide">{req.title}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 w-full md:w-auto text-right flex items-center justify-between md:justify-end gap-12">
                    <div className="hidden md:block text-left">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-sm font-medium text-foreground/80">{req.duration}</p>
                    </div>
                    <Link to="/supervisor/requests" className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 text-xs font-bold rounded hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest text-center">
                      Review File
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-muted/5 p-8 border-l-2 border-primary/10 rounded-br-2xl">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-10">Network Feed</h3>
            <div className="relative space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/20">
              
              {feedItems.map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-background border flex items-center justify-center z-10 ${item.status === 'Verified' ? 'border-primary' : item.status === 'Rejected' ? 'border-destructive' : 'border-muted-foreground'}`}>
                    <item.icon className={`w-3 h-3 ${item.color}`} />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground">
                    <span className="text-muted-foreground font-bold mr-2 uppercase tracking-wide text-[10px] border border-border/20 px-1.5 py-0.5 rounded">{item.status}</span> 
                    {item.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mt-3 font-mono tracking-widest flex items-center gap-2">
                    {item.extra} 
                    <span className="w-1 h-1 bg-muted-foreground rounded-full"></span> 
                    {item.time}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>

        {/* Footer Meta */}
        <footer className="mt-24 pb-8 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-muted/10 rounded text-[10px] font-bold text-muted-foreground tracking-widest border border-border/10">
              V 2.4.0-STABLE
            </div>
            <p className="text-[11px] text-muted-foreground/40 font-light tracking-wide uppercase">© 2024 Provenancy Systems.</p>
          </div>
        </footer>

      </div>
    </SupervisorLayout>
  )
}
