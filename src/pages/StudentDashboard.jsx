import { Terminal, Lightbulb } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { StatsBlock } from '../components/workspace/StatsBlock'

export default function StudentDashboard() {
  return (
    <StudentLayout>
      <div className="p-10 space-y-12 max-w-7xl mx-auto w-full">
        {/* Hero Data Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8 flex flex-col justify-end">
            <h2 className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-2 font-bold">Institutional Overview</h2>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">Verified Professional Ledger</h3>
          </div>
          
          <div className="col-span-12 md:col-span-4 flex gap-8 md:justify-end border-l border-border/20 pl-6">
            <div className="flex flex-col">
              <span className="text-5xl font-bold text-primary tracking-tighter">12</span>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-semibold">Verified<br/>Engagements</span>
            </div>
            <div className="flex flex-col opacity-50">
              <span className="text-5xl font-bold text-muted-foreground tracking-tighter">02</span>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-semibold">Pending<br/>Verification</span>
            </div>
          </div>
        </section>

        {/* Main Dashboard Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Recent Engagements Timeline */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between border-b border-border/20 pb-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Record Chronology</h4>
              <button className="text-[10px] text-primary uppercase font-bold tracking-widest hover:underline underline-offset-4 pointer">Expand Registry</button>
            </div>
            
            <div className="space-y-10 pl-2">
              {/* Timeline Item 1 */}
              <div className="group relative flex items-start gap-6">
                <div className="w-1 bg-primary/20 h-full absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="shrink-0 pt-1">
                  <div className="w-10 h-10 flex items-center justify-center bg-muted/50 rounded-md border border-border/5">
                    <Terminal className="text-primary w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-lg font-medium text-foreground">Software Intern</h5>
                      <p className="text-sm text-muted-foreground">TechCorp Solutions • London, UK</p>
                    </div>
                    <div className="px-2 py-1 bg-muted/30 rounded flex items-center gap-2 border border-border/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Verified</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed max-w-lg">
                    Full-stack development contribution within the Core Platform team. Authored 42 production-level PRs across the microservices architecture.
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                    <span>Issued Jun 2023</span>
                    <span>•</span>
                    <span>Ref ID: TC-884-X</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 (Pending) */}
              <div className="group relative flex items-start gap-6 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="w-1 bg-border/20 h-full absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="shrink-0 pt-1">
                  <div className="w-10 h-10 flex items-center justify-center bg-muted/30 border border-border/10 rounded-md">
                    <Lightbulb className="text-muted-foreground w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-lg font-medium text-foreground">Research Assistant</h5>
                      <p className="text-sm text-muted-foreground">University Science Lab • Oxford</p>
                    </div>
                    <div className="px-2 py-1 bg-muted/10 border border-border/20 rounded flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Pending</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed max-w-lg">
                    Statistical modeling for environmental impact studies. Coordinating data collection across three regional monitoring stations.
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                    <span>Submitted Aug 2023</span>
                    <span>•</span>
                    <span>Awaiting Signature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="col-span-1 lg:col-span-5 space-y-12">
            <div className="bg-muted/10 p-8 rounded-xl border border-border/5">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-8 flex items-center gap-2">
                Endorsed Proficiencies
              </h4>
              
              <div className="space-y-6">
                {/* Skill 1 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-foreground">Python Architecture</span>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-tighter">Gold Standard</span>
                  </div>
                  <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-primary w-4/5"></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[9px] px-2 py-1 border border-border/20 text-muted-foreground font-semibold rounded uppercase tracking-widest">Django</span>
                    <span className="text-[9px] px-2 py-1 border border-border/20 text-muted-foreground font-semibold rounded uppercase tracking-widest">NumPy</span>
                  </div>
                </div>

                {/* Skill 2 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-foreground">Project Management</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Verified Level II</span>
                  </div>
                  <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-primary/60 w-3/5"></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[9px] px-2 py-1 border border-border/20 text-muted-foreground font-semibold rounded uppercase tracking-widest">Agile</span>
                    <span className="text-[9px] px-2 py-1 border border-border/20 text-muted-foreground font-semibold rounded uppercase tracking-widest">Scrum</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Credential Integrity Banner */}
            <div className="p-6 bg-card border border-border/10 rounded-lg shadow-sm">
               <div className="space-y-2">
                  <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">Immutable Record</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                      Your institutional work record is cryptographically secured. Every verified engagement contains a digital signature bound to the specific institutional supervisor.
                  </p>
               </div>
            </div>

          </div>
        </section>
      </div>
    </StudentLayout>
  )
}
