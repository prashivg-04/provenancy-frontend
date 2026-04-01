import { Code, Terminal, Building2, Ticket, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StudentLayout from '../components/workspace/StudentLayout'
import { StatsBlock } from '../components/workspace/StatsBlock'
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
      status: "VERIFIED",
      icon: Code,
    },
    {
      org: "Anthropic Research",
      role: "Model Eval Intern",
      duration: "Aug 2023 — Present",
      subDuration: "Ongoing Engagement",
      supervisor: "Sarah Jenkins",
      status: "VERIFIED",
      icon: Terminal,
    },
    {
      org: "Central Bank of Digital Trust",
      role: "Security Analyst Associate",
      duration: "Mar — July 2023",
      subDuration: "Completed",
      supervisor: "Dr. Robert Chen",
      status: "VERIFIED",
      icon: Building2,
    },
    {
      org: "Ethereum Foundation",
      role: "Grant Reviewer",
      duration: "Dec 2022 — Feb 2023",
      subDuration: "Project Based",
      supervisor: "Vitali S.",
      status: "VERIFIED",
      icon: Ticket,
    }
  ]

  return (
    <StudentLayout>
      <PageContainer>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-light text-foreground tracking-tight">Institutional Records</h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
              A complete, verified ledger of your professional contributions and academic engagements, secured via Provenancy's cryptographic verification protocol.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-muted/10 p-1 rounded-lg border border-border/10">
              <button className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-md">Verified</button>
              <button className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Pending</button>
              <button className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Rejected</button>
            </div>
            <button 
              onClick={() => navigate('/engagements/create')}
              className="flex items-center gap-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors"
            >
              <Plus className="w-3 h-3" />
              New Entry
            </button>
          </div>
        </div>

        {/* Bento Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <StatsBlock 
              title="Active Engagements" 
              activeStat="14" 
              subStat="+2 this month" 
              highlight 
            />
          </div>
          <StatsBlock title="Avg. Verification" activeStat="4.2d" />
          <StatsBlock title="Trust Score" activeStat="98%" />
        </div>

        {/* Ledger */}
        {dummyTableData.length > 0 ? (
          <div className="bg-card rounded-xl border border-border/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/10">
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Organization & Role</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Supervisor</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/5">
                  {dummyTableData.map((row, i) => (
                    <tr 
                      key={i} 
                      onClick={() => navigate(`/engagements/TC-2023-084${i}`)}
                      className="hover:bg-muted/10 transition-colors group cursor-pointer"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-background rounded border border-border/10 flex items-center justify-center">
                            <row.icon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{row.org}</p>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">{row.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-foreground/80">{row.duration}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{row.subDuration}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--primary))]"></span>
                          <p className="text-sm text-foreground/80">{row.supervisor}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-muted/10 flex items-center justify-between border-t border-border/10">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest px-4 font-semibold">End of Official Record Ledger</p>
              <div className="flex gap-2 px-4">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-border/20 hover:bg-muted/30 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-border/20 hover:bg-muted/30 transition-colors">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState 
            icon={Code} 
            title="No Engagements Found" 
            description="Your professional ledger is empty. Start documenting your institutional contributions." 
            actionText="Create Engagement" 
            onAction={() => navigate('/engagements/create')} 
          />
        )}

        {/* Editorial Explainers */}
        <div className="flex flex-col lg:flex-row gap-12 mt-4 pb-12">
           <div className="lg:w-1/3 space-y-4">
             <h3 className="text-lg font-semibold text-foreground">Ledger Integrity</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               Every entry in this ledger has been cryptographically signed by an institutional supervisor. The verification state represents an immutable proof of work recognized by the Provenancy Network.
             </p>
           </div>
        </div>
      </PageContainer>
    </StudentLayout>
  )
}
