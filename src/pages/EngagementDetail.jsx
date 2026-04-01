import { useState } from 'react'
import { MapPin, CheckCircle2, XCircle, AlertCircle, ShieldAlert } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import StudentLayout from '../components/workspace/StudentLayout'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { EngagementHeader, SupervisorBlock } from '../components/workspace/DetailElements'
import { PageContainer } from '../components/workspace/SharedPrimitives'

export default function EngagementDetail() {
  const [searchParams] = useSearchParams()
  const isSupervisor = searchParams.get('role') === 'supervisor'
  const navigate = useNavigate()
  const [confirmAction, setConfirmAction] = useState(null) // 'approve' | 'reject' | null

  const handleAction = (type) => {
    toast.success(`Ledger ${type === 'approve' ? 'signature verified' : 'record rejected'} successfully`)
    setTimeout(() => {
      navigate('/supervisor/requests')
    }, 1200)
  }

  const dummyData = {
    title: "Software Intern",
    organization: "TechCorp Solutions",
    duration: "Jun 2023 - Aug 2023",
    status: isSupervisor ? "Pending" : "Verified",
    refId: "TC-2023-0841",
    scope: "In this capacity, I spearheaded the optimization of the core legacy API infrastructure, focusing on reducing latency across high-traffic endpoints. My primary objective involved the implementation of a distributed caching layer and the refactoring of asynchronous microservices. Beyond technical implementation, I collaborated with cross-functional product teams to translate high-level business requirements into technical specifications, ensuring system scalability and maintainability during a period of 40% growth in active user sessions.",
    highlights: [
      {
        title: "Architecture Redesign",
        desc: "Redesigned three critical backend microservices using Node.js and TypeScript, improving overall system throughput by 22%."
      },
      {
        title: "Latency Optimization",
        desc: "Reduced database query execution times by an average of 450ms through strategic indexing and query parameter tuning."
      },
      {
        title: "Quality Assurance",
        desc: "Established a new automated testing suite that achieved 85% code coverage for newly developed modules."
      }
    ],
    skills: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "System Design", "Agile"],
    supervisor: {
      name: "Dr. Sarah Miller",
      title: "Senior Engineering Director"
    },
    verificationDate: "Oct 24, 2024",
    authId: "8821-XPQ"
  }

  const LayoutWrapper = isSupervisor ? SupervisorLayout : StudentLayout

  return (
    <LayoutWrapper>
      <div className="flex-1 overflow-y-auto h-full w-full">
        <PageContainer>
        {/* Uses Extracted Header Block Element */}
        <EngagementHeader 
          title={dummyData.title}
          org={dummyData.organization}
          duration={dummyData.duration}
          status={dummyData.status}
          refId={dummyData.refId}
        />

        {/* Bento Grid layout */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Context Left Side */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
                Scope of Work
                <span className="h-px flex-1 bg-border/20"></span>
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-light first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-primary">
                {dummyData.scope}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
                Key Highlights
                <span className="h-px flex-1 bg-border/20"></span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {dummyData.highlights.map((highlight, idx) => (
                  <div key={idx} className="group p-6 bg-muted/10 hover:bg-muted/20 transition-colors rounded-lg flex items-start gap-6 border border-border/10 hover:border-border/30">
                    <span className="text-muted-foreground/60 font-mono text-sm pt-1">0{idx + 1}</span>
                    <div className="space-y-1">
                      <p className="text-foreground font-medium leading-tight">{highlight.title}</p>
                      <p className="text-sm text-muted-foreground">{highlight.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Sidebar Elements Component Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Endorsed Skills Tag Block */}
            <div className="bg-muted/5 p-8 space-y-6 border border-border/10 rounded-lg">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Endorsed Skills</h3>
              <div className="flex flex-wrap gap-2">
                {dummyData.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-muted/20 text-foreground text-[11px] font-medium uppercase tracking-wider rounded border border-border/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Stamp Block */}
            <SupervisorBlock 
               supervisor={dummyData.supervisor}
               organization={dummyData.organization}
               verificationDate={dummyData.verificationDate}
               authId={dummyData.authId}
            />

            {/* Map Placeholder Block */}
            <div className="bg-muted/5 rounded-lg p-6 space-y-4 border border-border/10">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Location Data</h3>
              <div className="h-40 bg-muted rounded-md overflow-hidden relative grayscale hover:grayscale-0 transition-all cursor-crosshair">
                <img 
                   alt="Map Location" 
                   className="w-full h-full object-cover opacity-60" 
                   src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=2000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <MapPin className="text-primary w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">San Francisco HQ</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Supervisor Actions Block */}
        {isSupervisor && (
          <div className="mt-8 border-t-2 border-b-2 border-border/20 py-8 bg-muted/5 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
            
            {!confirmAction ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-bold text-primary mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Signature Required
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                    Provide cryptographic authorization to append this engagement to the student's institutional ledger.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-muted/20 border border-border/40 text-muted-foreground font-bold text-[10px] uppercase tracking-widest hover:bg-muted/40 transition-colors">
                    <AlertCircle className="w-4 h-4" />
                    Req. Edit
                  </button>
                  <button onClick={() => setConfirmAction('reject')} className="flex items-center justify-center gap-2 px-6 py-3 bg-destructive/10 border border-destructive/20 text-destructive font-bold text-[10px] uppercase tracking-widest hover:bg-destructive hover:text-destructive-foreground transition-colors">
                    <XCircle className="w-4 h-4" />
                    Reject Node
                  </button>
                  <button onClick={() => setConfirmAction('approve')} className="flex items-center justify-center gap-2 px-8 py-3 bg-primary/20 border border-primary/40 text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                    Sign & Verify
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 animate-fade-in">
                <div>
                  <h3 className={`text-xs font-mono uppercase tracking-[0.3em] font-bold mb-2 flex items-center gap-2 ${confirmAction === 'approve' ? 'text-primary' : 'text-destructive'}`}>
                    {confirmAction === 'approve' ? <ShieldAlert className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} 
                    Confirm {confirmAction === 'approve' ? 'Signature' : 'Rejection'}
                  </h3>
                  <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
                    WARNING: Action is cryptographically irreversible on the ledger.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={() => setConfirmAction(null)} className="px-6 py-3 border border-border/30 text-muted-foreground text-[10px] uppercase font-bold tracking-widest hover:bg-muted/30 transition-colors">
                    Abort
                  </button>
                  <button onClick={() => handleAction(confirmAction)} className={`px-8 py-3 font-bold text-[10px] uppercase tracking-widest transition-all shadow-[0_0_15px_hsl(var(--${confirmAction === 'approve' ? 'primary' : 'destructive'})/0.2)] ${confirmAction === 'approve' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'}`}>
                     Execute Payload
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Meta */}
        <footer className="pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
          <div className="flex items-center gap-4 text-muted-foreground text-[10px] uppercase tracking-widest">
            <span>Generated: Oct 28, 2024</span>
            <span className="w-1 h-1 bg-border/40 rounded-full"></span>
            <span>Immutable Ledger Version 4.2.0</span>
          </div>
        </footer>

        </PageContainer>
      </div>
    </LayoutWrapper>
  )
}
