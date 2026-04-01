import { BadgeCheck, Paperclip, Link2, Trash2, Info } from 'lucide-react'
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
    // Simulate network delay then redirect
    setTimeout(() => {
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <StudentLayout>
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <PageContainer>
            
            {/* Header */}
            <div className="mb-16 border-b border-border/15 pb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold">New Entry</span>
              </div>
              <h1 className="text-4xl font-light text-foreground mb-4">Create Engagement Record</h1>
              <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                Document your professional experience for institutional verification. Verified records are permanently added to your academic ledger.
              </p>
            </div>

            <form className="space-y-16" onSubmit={handleSubmit}>
              
              {/* Form Areas map perfectly using primitives */}
              <FormSection title="Core Details" number="01">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
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
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Key Performance Highlights</label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0"></span>
                        <input className="flex-1 text-foreground placeholder:text-muted bg-transparent border-0 border-b border-border/20 rounded-none px-0 focus:ring-0 focus:border-primary focus:border-b-2 transition-all w-full" placeholder="Primary achievement or milestone" type="text"/>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0"></span>
                        <input className="flex-1 text-foreground placeholder:text-muted bg-transparent border-0 border-b border-border/20 rounded-none px-0 focus:ring-0 focus:border-primary focus:border-b-2 transition-all w-full" placeholder="Secondary achievement or contribution" type="text"/>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0"></span>
                        <input className="flex-1 text-foreground placeholder:text-muted bg-transparent border-0 border-b border-border/20 rounded-none px-0 focus:ring-0 focus:border-primary focus:border-b-2 transition-all w-full" placeholder="Additional notable impact" type="text"/>
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Verification Metadata" number="03">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <SkillSelector 
                    label="Skills Applied" 
                    selectedSkills={["Strategic Planning"]} 
                    availableTags={["Data Analysis", "Team Leadership", "Public Speaking"]} 
                    onAddClick={() => {}}
                  />
                  <div className="flex flex-col">
                    <InputField label="Supervisor ID / Email" placeholder="ID-4829-992 or email@institution.edu" />
                    <p className="text-[10px] text-muted-foreground mt-2 italic">This individual will receive a formal verification request.</p>
                  </div>
                </div>
              </FormSection>

              {/* Supporting Evidence */}
              <FormSection title="Supporting Evidence" description="Link external proof or upload documentation." number="04">
                <div className="flex justify-end mb-6">
                  <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" type="button">
                    <Paperclip className="w-5 h-5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Add Attachment</span>
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-border/10 group">
                    <div className="flex items-center gap-4">
                      <Link2 className="text-muted-foreground w-4 h-4" />
                      <span className="text-sm text-foreground">Project Portfolio Link</span>
                    </div>
                    <Trash2 className="text-destructive/40 text-sm opacity-0 group-hover:opacity-100 cursor-pointer w-4 h-4 hover:text-destructive transition-colors" />
                  </div>
                </div>
              </FormSection>

              {/* Actions */}
              <div className="pt-12 flex flex-col items-center border-t border-border/15">
                <button 
                  className="px-10 py-4 bg-primary-container/20 border border-primary/30 text-primary font-bold uppercase tracking-widest text-xs rounded hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-3" 
                  type="submit"
                >
                  <BadgeCheck size={18} />
                  Submit for Verification
                </button>
                <p className="text-[10px] text-muted-foreground mt-6 text-center max-w-xs leading-relaxed italic">
                  By submitting, you certify that all entered details are accurate. A ledger entry will be created upon supervisor approval.
                </p>
              </div>
            </form>
          </PageContainer>
        </div>

        {/* Right Info Overlay Pane */}
        <aside className="w-80 border-l border-border/15 bg-background p-8 hidden xl:flex flex-col gap-12 static right-0 top-0">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-8">Process Overview</h3>
            <div className="relative pl-6 border-l-2 border-border/20 space-y-12 ml-2">
              <div className="relative">
                <div className="absolute top-1.5 -left-[31px] w-3 h-3 rounded-full border-background bg-primary ring-2 ring-primary/20 shadow-[0_0_12px_hsl(var(--primary))]"></div>
                <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-widest">Drafting Engagement</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Ensure all impact statements are quantified where possible.</p>
              </div>
              <div className="relative opacity-60">
                <div className="absolute top-1.5 -left-[31px] w-3 h-3 rounded-full border-2 border-background bg-border/40"></div>
                <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-widest">Institutional Queue</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Verification requests typically processed within 48 hours.</p>
              </div>
              <div className="relative opacity-60">
                <div className="absolute top-1.5 -left-[31px] w-3 h-3 rounded-full border-2 border-background bg-border/40"></div>
                <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-widest">Ledger Finalization</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Immutable record added to your professional provenance.</p>
              </div>
            </div>
          </div>
          <div className="mt-auto p-6 bg-muted/10 rounded-lg border border-border/10">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-primary w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-foreground">Verification Note</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              "Accuracy is the foundation of the Digital Ledger. Supervisor IDs are cross-referenced with the Institutional Identity Registry."
            </p>
          </div>
        </aside>
      </div>
    </StudentLayout>
  )
}
