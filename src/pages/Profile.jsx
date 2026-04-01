import { Save, ExternalLink, User as UserIcon } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { FormSection, InputField, TextArea } from '../components/workspace/FormElements'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/workspace/SharedPrimitives'

export default function Profile() {
  return (
    <StudentLayout>
      <div className="flex flex-1 h-full overflow-hidden w-full relative bg-background/50">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-primary/10 blur-[120px] pointer-events-none -z-10 rounded-full"></div>

        <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
          <PageContainer>
            <div className="max-w-5xl mx-auto pb-40">
              
              {/* Header */}
              <header className="mb-10 relative flex flex-col md:flex-row md:items-end justify-between gap-6 py-4">
                <div className="relative z-10 w-full md:w-auto">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full w-fit mb-4">
                     <UserIcon className="w-3.5 h-3.5 text-primary" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Identity Settings</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3">Profile Management</h1>
                  <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                    Maintain your institutional identity. Your basic information and verified skills dictate how you appear on the public ledger.
                  </p>
                </div>

                <div className="flex shrink-0">
                  <Link 
                    to="/profile/PRV-2024-0089" 
                    className="group flex flex-col items-center justify-center py-4 px-6 bg-card/60 backdrop-blur-md border border-border/30 hover:border-primary/50 hover:bg-primary/5 rounded-2xl transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-primary">View Ledger</span>
                        <span className="block text-[9px] font-mono text-muted-foreground mt-0.5">PRV-2024-0089</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </header>

              {/* Form Content */}
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                
                <FormSection 
                  title="Basic Information" 
                  subTitle="Primary Identity Document"
                >
                  <div className="space-y-6">
                    <InputField label="Full Name" placeholder="e.g. Alex Carter" />
                    <InputField label="Title / Role" placeholder="e.g. Graduate Research Assistant" />
                    <TextArea label="Professional Bio" placeholder="A brief summary of your academic and professional trajectory..." />
                  </div>
                </FormSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <FormSection 
                    title="System Bindings" 
                    subTitle="External Locators"
                  >
                    <div className="space-y-6">
                      <InputField label="Academic Email" type="email" placeholder="alex@stanford.edu" />
                      <InputField label="LinkedIn URL" type="url" placeholder="https://linkedin.com/in/alexcarter" />
                    </div>
                  </FormSection>

                  <FormSection 
                    title="Account Identity" 
                    subTitle="System-generated registry identifiers."
                  >
                    <div className="space-y-6 h-full flex flex-col justify-end">
                      <div className="p-5 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col gap-3">
                        <div className="flex justify-between items-start w-full">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Ledger ID</p>
                          <div className="px-2.5 py-1 bg-background border border-border/30 rounded shadow-sm text-[9px] uppercase font-bold tracking-widest text-primary">
                            Immutable
                          </div>
                        </div>
                        <p className="text-sm font-mono text-foreground">PRV-2024-0089</p>
                      </div>
                    </div>
                  </FormSection>
                </div>

                <FormSection 
                  title="Skills Management" 
                  subTitle="Automated network cross-referencing."
                >
                  <div className="space-y-6 mt-2">
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="flex-1 w-full">
                        <InputField label="Add Registry Skill" placeholder="e.g. Data Analysis, React, Quantum Physics..." />
                      </div>
                      <button type="button" className="w-full sm:w-auto px-8 py-2 bg-muted/40 hover:bg-muted/80 border border-border/30 text-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all h-[44px] mb-[2px]">
                        Inject Node
                      </button>
                    </div>
                    
                    {/* Mock Skill Pills */}
                    <div className="flex flex-wrap gap-2.5 p-5 bg-card/60 backdrop-blur-sm border border-border/20 rounded-2xl shadow-inner">
                      <span className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-lg text-[11px] font-bold uppercase tracking-widest">Data Analysis</span>
                      <span className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-lg text-[11px] font-bold uppercase tracking-widest">Machine Learning</span>
                      <span className="px-4 py-2 bg-muted/50 border border-border/20 text-muted-foreground rounded-lg text-[11px] font-bold uppercase tracking-widest hover:border-border/40 cursor-pointer transition-colors">React</span>
                      <span className="px-4 py-2 bg-transparent border border-dashed border-border/30 text-muted-foreground/50 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:text-muted-foreground hover:border-border/60 transition-colors cursor-pointer">Add more...</span>
                    </div>
                  </div>
                </FormSection>

              </form>
            </div>
          </PageContainer>
        </div>

        {/* Premium Floating Action Pill */}
        <div className="absolute bottom-8 right-8 z-50 pointer-events-none">
          <button type="button" className="pointer-events-auto flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_15px_40px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.7)] hover:-translate-y-1 hover:bg-primary/90 group">
            <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="mt-[1px]">Sign & Save Ledger</span>
          </button>
        </div>
      </div>
    </StudentLayout>
  )
}
