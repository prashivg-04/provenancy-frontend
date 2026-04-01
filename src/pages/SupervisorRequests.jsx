import { CheckCircle2, ChevronLeft, ChevronRight, Code } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { PageContainer, StatusBadge, EmptyState } from '../components/workspace/SharedPrimitives'

export default function SupervisorRequests() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Pending')

  const requests = [
    {
      id: "PRV-REQ-0089", // Used for linking to the Detail page
      studentName: "Alex Carter",
      studentId: "PRV-2024-0089",
      org: "Stark Industries",
      role: "Research Intern",
      duration: "120 Hours",
      status: "Pending",
      date: "Oct 24, 2024"
    },
    {
      id: "PRV-REQ-0112",
      studentName: "Elena Rodriguez",
      studentId: "PRV-2024-0112",
      org: "Bio-Tech Labs",
      role: "Lab Assistant",
      duration: "45 Hours",
      status: "Pending",
      date: "Oct 24, 2024"
    },
    {
      id: "PRV-REQ-0945",
      studentName: "Marcus Thorne",
      studentId: "PRV-2023-0945",
      org: "Nexus Media",
      role: "Copywriter",
      duration: "80 Hours",
      status: "Pending",
      date: "Oct 24, 2024"
    }
  ]

  const filteredRequests = requests.filter(r => r.status === activeTab)

  return (
    <SupervisorLayout>
      <PageContainer>
        {/* Header */}
        <header className="mb-12">
          <h2 className="text-4xl font-light tracking-tight mb-4 text-foreground">Engagement Requests</h2>
          <p className="text-muted-foreground/80 max-w-2xl leading-relaxed">
            Review and verify student work history entries for institutional archival. Each record requires manual validation to maintain ledger integrity.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex gap-12 border-b border-border/15 mb-12">
          {['Pending', 'Accepted', 'Rejected'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-4 relative group"
            >
              <span className={`text-sm font-medium tracking-wide transition-colors ${activeTab === tab ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                {tab}
              </span>
              {activeTab === tab && (
                <div className="h-[2px] bg-primary absolute -bottom-px left-0 right-0 shadow-[0_0_8px_hsl(var(--primary))]"></div>
              )}
            </button>
          ))}
        </div>

        {/* Bento Grid List */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main List Column */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {filteredRequests.length > 0 ? filteredRequests.map((req, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/engagements/${req.id}?role=supervisor`)}
                className="group cursor-pointer bg-muted/5 p-8 border border-border/10 border-l-4 border-l-primary/40 hover:border-l-primary transition-all duration-300 rounded-r"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2 group-hover:text-primary transition-colors">{req.studentName}</h3>
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-bold">Student ID: {req.studentId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={req.status} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">Organization</p>
                    <p className="text-sm font-medium text-foreground">{req.org}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">Role</p>
                    <p className="text-sm font-medium text-foreground">{req.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">Duration</p>
                    <p className="text-sm font-medium text-foreground">{req.duration}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">Submission Date</p>
                    <p className="text-sm font-medium text-foreground">{req.date}</p>
                  </div>
                </div>
              </div>
            )) : (
              <EmptyState 
                icon={Code} 
                title={`No ${activeTab} Requests`} 
                description="The institutional verification queue is currently clear for this category." 
                actionText="View All Ledgers" 
                onAction={() => setActiveTab('Pending')} 
              />
            )}
            
            {/* Footer Pagination/Bulk Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/15 mt-8 pt-8 gap-4">
              <div className="flex items-center gap-4">
                <button className="bg-primary/10 text-primary border border-primary/20 px-6 py-2 rounded font-medium text-sm flex items-center gap-2 hover:bg-primary transition-colors hover:text-primary-foreground group uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" />
                  Quick Verify All
                </button>
                <button className="border border-border/30 text-muted-foreground px-6 py-2 rounded font-medium text-sm hover:bg-muted/30 transition-colors uppercase tracking-widest">
                  Export Ledger
                </button>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-border/20 hover:bg-muted/30 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold uppercase tracking-widest">Page 1 of 1</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-border/20 hover:bg-muted/30 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Asymmetric Sidebar Block */}
          <div className="hidden lg:block lg:col-span-4 row-span-3">
            <div className="bg-muted/5 p-8 h-full border border-border/10 rounded">
              <h4 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-8 font-bold">Queue Summary</h4>
              <div className="space-y-8">
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-light text-primary">{filteredRequests.length.toString().padStart(2, '0')}</span>
                  <span className="text-xs text-muted-foreground mb-3 font-bold uppercase tracking-widest">{activeTab}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-background p-5 border border-border/10 rounded">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3 font-bold">System Health</p>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 bg-border/20 overflow-hidden rounded-full">
                        <div className="h-full bg-primary w-[88%] shadow-[0_0_8px_hsl(var(--primary))]"></div>
                      </div>
                      <span className="text-[10px] text-foreground font-mono">88%</span>
                    </div>
                  </div>
                  <div className="bg-background p-6 border-l-2 border-primary/30 rounded">
                    <p className="text-xs italic text-muted-foreground leading-relaxed">
                      "Verification ensures the academic integrity of all experiential learning milestones."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </PageContainer>
    </SupervisorLayout>
  )
}
