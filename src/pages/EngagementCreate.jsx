import { BadgeCheck, Paperclip, Link2, Trash2, Info, FileSignature } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { FormSection, InputField, TextArea, SkillSelector } from '../components/workspace/FormElements'
import { PageContainer } from '../components/workspace/SharedPrimitives'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function EngagementCreate() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Engagement submitted for cryptographic verification")
    setTimeout(() => {
      navigate('/student/dashboard')
    }, 1500)
  }

  return (
    <StudentLayout>
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <PageContainer>
            
            {/*
              =============================================
              HEADER
              =============================================
            */}
            <div className="mb-12 relative border-b border-border/10 pb-8">
              <div className="absolute inset-x-0 top-0 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mb-4">
                 <FileSignature className="w-3 h-3 text-primary" />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-primary">New Ledger Entry</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Initialize Record</h1>
              <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                Document your professional experience for institutional verification. Upon semantic review and supervisor cryptography, this record becomes immutable.
              </p>
            </div>

            <form className="space-y-12" onSubmit={handleSubmit}>
              
              {/* Form Areas map perfectly using primitives */}
              <FormSection title="Core Details" number="01">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <InputField label="Organization Name" placeholder="e.g., Global Initiatives Ltd." />
                  <InputField label="Role / Position" placeholder="e.g., Research Associate" />
                  <InputField label="Start Date" type="date" className="opacity-90 grayscale-0 hover:grayscale-0 focus-within:grayscale-0" />
                  <InputField label="End Date" type="date" />
                </div>
              </FormSection>

              <FormSection title="Scope of Work" number="02">
                <div className="space-y-10">
                  <TextArea 
                    label="Comprehensive Summary" 
                    placeholder="Describe the overarching goals and your specific involvement..."
                  />
                  <div className="flex flex-col space-y-6">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold">Key Performance Highlights</label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-background/30 p-3.5 pl-6 rounded-xl border border-border/30 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(26,35,126,0.1)] transition-all">
                        <span className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></span>
                        <input className="flex-1 text-sm text-foreground placeholder:text-muted-foreground/50 bg-transparent border-0 rounded-none focus:outline-none focus:ring-0 w-full" placeholder="Primary achievement or milestone" type="text"/>
                      </div>
                      <div className="flex items-center gap-4 bg-background/30 p-3.5 pl-6 rounded-xl border border-border/30 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(26,35,126,0.1)] transition-all">
                        <span className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></span>
                        <input className="flex-1 text-sm text-foreground placeholder:text-muted-foreground/50 bg-transparent border-0 rounded-none focus:outline-none focus:ring-0 w-full" placeholder="Secondary achievement or contribution" type="text"/>
                      </div>
                      <div className="flex items-center gap-4 bg-background/30 p-3.5 pl-6 rounded-xl border border-border/30 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(26,35,126,0.1)] transition-all">
                        <span className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></span>
                        <input className="flex-1 text-sm text-foreground placeholder:text-muted-foreground/50 bg-transparent border-0 rounded-none focus:outline-none focus:ring-0 w-full" placeholder="Additional notable impact" type="text"/>
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Verification Metadata" number="03">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <SkillSelector 
                    label="Skills Applied" 
                    selectedSkills={["Strategic Planning"]} 
                    availableTags={["Data Analysis", "Team Leadership", "Public Speaking"]} 
                    onAddClick={() => {}}
                  />
                  <div className="flex flex-col">
                    <InputField label="Supervisor Identity" placeholder="ID-4829-992 or email@institution.edu" />
                    <p className="text-[10px] text-muted-foreground mt-3 italic bg-muted/20 p-3 rounded-lg border border-border/10">This individual will receive a cryptographic verification request.</p>
                  </div>
                </div>
              </FormSection>

              {/* Supporting Evidence */}
              <FormSection title="Supporting Evidence" description="Link external proof or upload documentation." number="04">
                <div className="flex justify-end mb-4">
                  <button className="flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-3 rounded-xl transition-all border border-primary/20 hover:border-primary text-[10px] uppercase tracking-widest font-bold" type="button">
                    <Paperclip className="w-3.5 h-3.5" />
                    Attach Document
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-xl group hover:border-primary/30 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-muted/30 flex items-center justify-center border border-border/20">
                         <Link2 className="text-muted-foreground w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Project Portfolio Repository</span>
                    </div>
                    <button type="button" className="text-destructive/40 p-2 rounded hover:bg-destructive/10 hover:text-destructive transition-colors">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </FormSection>

              {/* Actions */}
              <div className="pb-12 pt-8 flex flex-col items-center">
                <button 
                  className="px-12 py-4 h-[56px] bg-foreground text-background font-bold uppercase tracking-[0.15em] text-[10px] rounded-xl hover:bg-foreground/90 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] w-full max-w-md justify-center" 
                  type="submit"
                >
                  <BadgeCheck className="w-4 h-4" />
                  Sign & Submit Protocol
                </button>
                <div className="mt-8 p-4 bg-muted/10 border border-border/20 rounded-xl max-w-md w-full flex items-start gap-4">
                   <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                   <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     By submitting, you certify that all entered details are true and accurate under the academic honor code. A ledger entry will be created upon institutional verification.
                   </p>
                </div>
              </div>
            </form>
          </PageContainer>
        </div>

        {/* Right Info Overlay Pane */}
        <aside className="w-80 lg:w-96 border-l border-border/10 bg-card/10 backdrop-blur-md p-8 hidden xl:flex flex-col gap-12 static right-0 top-0 shadow-[-10px_0_30px_rgba(0,0,0,0.2)]">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-10 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></span>
               Verification Pipeline
            </h3>
            
            <div className="relative pl-8 border-l border-border/20 space-y-16 ml-2">
              <div className="relative group">
                <div className="absolute top-1.5 -left-[37px] w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 shadow-[0_0_12px_hsl(var(--primary))] transition-all group-hover:scale-125"></div>
                <p className="text-[11px] font-bold text-foreground mb-2 uppercase tracking-widest">1. Compile Record</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Ensure all impact metrics are quantified. The node requires substantial proof of work.</p>
              </div>
              <div className="relative opacity-60 group hover:opacity-100 transition-opacity">
                <div className="absolute top-1.5 -left-[37px] w-3 h-3 rounded-full border-2 border-border/50 bg-background transition-all group-hover:border-primary/50 group-hover:bg-primary/10"></div>
                <p className="text-[11px] font-bold text-foreground mb-2 uppercase tracking-widest">2. Network Consensus</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Requests routing through institutional supervisors. Typically resolves in 48h.</p>
              </div>
              <div className="relative opacity-60 group hover:opacity-100 transition-opacity">
                <div className="absolute top-1.5 -left-[37px] w-3 h-3 rounded-full border-2 border-border/50 bg-background transition-all group-hover:border-primary/50 group-hover:bg-primary/10"></div>
                <p className="text-[11px] font-bold text-foreground mb-2 uppercase tracking-widest">3. Ledger Finalization</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Immutable block written. Record permanently verifiable by third parties.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 group">
            <div className="absolute -inset-10 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-3">
                 <BadgeCheck className="text-primary w-4 h-4" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Security Note</span>
               </div>
               <p className="text-xs text-primary/80 leading-relaxed">
                 Institutional identities are rigorously verified. Submitting fraudulent supervisors will result in immediate network flagging and node rejection.
               </p>
            </div>
          </div>
        </aside>
      </div>
    </StudentLayout>
  )
}
