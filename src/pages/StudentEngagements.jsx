import { Code, Terminal, Building2, Ticket, ChevronLeft, ChevronRight, Plus, Activity, Search, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StudentLayout from '../components/workspace/StudentLayout'
import { PageContainer, StatusBadge, EmptyState } from '../components/workspace/SharedPrimitives'

export default function StudentEngagements() {
  const navigate = useNavigate()

  const dummyTableData = [
    {
      org: "Node.js Foundation",
      role: "Open Source Contributor",
      duration: "Jan — June 2024",
      subDuration: "240 Hours Logged",
      supervisor: "Marcus Thorne",
      status: "Verified",
      hash: "0x8F9...2A1B",
      icon: Code,
    },
    {
      org: "Anthropic Research",
      role: "Model Eval Intern",
      duration: "Aug 2023 — Present",
      subDuration: "Ongoing Engagement",
      supervisor: "Sarah Jenkins",
      status: "Verified",
      hash: "0x4A2...9C3F",
      icon: Terminal,
    },
    {
      org: "Central Bank of Digital Trust",
      role: "Security Analyst",
      duration: "Mar — July 2023",
      subDuration: "Completed",
      supervisor: "Dr. Robert Chen",
      status: "Pending",
      hash: "Pending Sign",
      icon: Building2,
    },
    {
      org: "Ethereum Foundation",
      role: "Grant Reviewer",
      duration: "Dec 2022 — Feb 2023",
      subDuration: "Project Based",
      supervisor: "Vitali S.",
      status: "Verified",
      hash: "0x1E7...8D5A",
      icon: Ticket,
    }
  ]

  return (
    <StudentLayout>
      <PageContainer>
        
        {/*
          =============================================
          HEADER: Title & Actions
          =============================================
        */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 relative">
          <div className="absolute inset-x-0 top-0 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>
          
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit mb-4">
               <Activity className="w-3 h-3 text-accent" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Active Protocol</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-2">Institutional Records</h1>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              A complete, verified ledger of your professional contributions and academic engagements, secured via continuous cryptographic verification.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 shrink-0">
            {/* Filter Toggle */}
            <div className="flex items-center bg-background/50 backdrop-blur-md p-1 rounded-lg border border-border/50 shadow-sm">
              <button className="px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground bg-card border border-border/50 rounded-md shadow-sm">All Nodes</button>
              <button className="px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">Verified</button>
              <button className="px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">Pending</button>
            </div>
            
            {/* Primary Action */}
            <button 
              onClick={() => navigate('/student/engagements/create')}
              className="flex items-center gap-2 px-6 py-2 h-[42px] text-[10px] font-bold uppercase tracking-[0.15em] text-background bg-foreground rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              Initialize Node
            </button>
          </div>
        </div>

        {/*
          =============================================
          METRICS BENTO
          =============================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-colors shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 relative z-10">Active Contracts</span>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-4xl font-light tracking-tighter text-foreground">14</span>
              <span className="text-[10px] uppercase font-bold text-primary tracking-widest bg-primary/10 px-2 py-1 rounded border border-primary/20 mb-1.5">+2 This Month</span>
            </div>
          </div>
          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Verification Latency</span>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-light tracking-tighter text-foreground">4.2d</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1.5">Network Avg</span>
            </div>
          </div>
          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Trust Consensus</span>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-light tracking-tighter text-foreground">98%</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1.5">A-Tier</span>
            </div>
          </div>
        </div>

        {/*
          =============================================
          LEDGER DATA TABLE
          =============================================
        */}
        <div className="bg-background/40 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl overflow-hidden mb-12 relative flex flex-col">
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
          
          {/* Toolbar */}
          <div className="p-4 border-b border-border/10 flex items-center justify-between bg-card/50">
             <div className="relative w-64">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search hashes, roles, orgs..." 
                  className="w-full bg-background border border-border/50 rounded-md py-2 pl-9 pr-3 text-xs placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all font-mono"
                />
             </div>
             <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground px-3 py-2 rounded border border-border/30 hover:bg-muted/30 transition-all">
                <Filter className="w-3.5 h-3.5" /> Filter Config
             </button>
          </div>

          <div className="overflow-x-auto grow">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-muted/10 border-b border-border/10">
                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Entity & Role Node</th>
                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Vector Duration</th>
                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Signature Node</th>
                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">Consensus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/10">
                {dummyTableData.map((row, i) => (
                  <tr 
                    key={i} 
                    onClick={() => navigate(`/engagements/TC-2023-084${i}`)}
                    className={`group cursor-pointer transition-all ${row.status === 'Pending' ? 'opacity-80 grayscale hover:grayscale-0 hover:opacity-100' : ''} hover:bg-primary/2`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-card rounded-xl border border-border/50 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-card/80 transition-all shadow-sm relative overflow-hidden">
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <row.icon className="text-muted-foreground group-hover:text-primary w-4 h-4 transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{row.org}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{row.role}</span>
                            <span className="text-border mx-1">•</span>
                            <span className="text-[9px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border/50">{row.hash}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-foreground/90">{row.duration}</p>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mt-1.5">{row.subDuration}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {row.status === 'Verified' ? (
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--primary))] shrink-0"></div>
                        ) : (
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full border border-border shrink-0"></div>
                        )}
                        <p className="text-sm text-foreground/90 font-medium">{row.supervisor}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-muted/5 flex items-center justify-between border-t border-border/10 mt-auto">
            <div className="flex items-center gap-2 pl-2">
               <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
               <p className="text-[9px] font-mono text-accent uppercase tracking-[0.2em]">End of Validated Ledger</p>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border/30 hover:bg-card transition-colors bg-background">
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border/30 hover:bg-card transition-colors bg-background">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

      </PageContainer>
    </StudentLayout>
  )
}
