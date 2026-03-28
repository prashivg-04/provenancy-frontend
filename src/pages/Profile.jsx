import { Save } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { FormSection, InputField, TextArea } from '../components/workspace/FormElements'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <StudentLayout>
      <div className="flex-1 overflow-y-auto w-full">
        {/* Main Content Area */}
        <div className="p-12 max-w-5xl mx-auto space-y-24 pb-32">
          
          <header>
            <h1 className="text-4xl font-light tracking-tight text-foreground mb-4">Profile Management</h1>
            <p className="text-muted-foreground/80 max-w-2xl leading-relaxed">
              Maintain your institutional identity. Your basic information and verified skills dictate how you appear on the public ledger.
            </p>
          </header>

          <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
            
            <FormSection 
              title="Basic Information" 
              description="Your primary identity within the Provenancy ledger."
            >
              <InputField label="Full Name" placeholder="e.g. Alex Carter" />
              <InputField label="Title / Role" placeholder="e.g. Graduate Research Assistant" />
              <div className="col-span-1 md:col-span-2 mt-4">
                <TextArea label="Professional Bio" placeholder="A brief summary of your academic and professional trajectory..." />
              </div>
            </FormSection>

            <FormSection 
              title="Contact / Professional" 
              description="Where institutions and peers can reach you outside the ledger."
            >
              <InputField label="Academic Email" type="email" placeholder="alex@stanford.edu" />
              <InputField label="LinkedIn URL" type="url" placeholder="https://linkedin.com/in/alexcarter" />
            </FormSection>

            <FormSection 
              title="Skills Management" 
              description="Declare technical and professional skills. Skills are automatically cross-referenced with your verified engagements."
            >
              <div className="col-span-1 md:col-span-2">
                <div className="flex gap-4 items-end mb-6">
                  <div className="flex-1">
                    <InputField label="Add Skill" placeholder="e.g. Data Analysis, React, Quantum Physics" />
                  </div>
                  <button type="button" className="px-6 py-2 bg-muted/20 border border-border/20 text-foreground font-bold text-xs uppercase tracking-widest rounded hover:bg-muted/40 transition-colors h-10 mb-1">
                    Add
                  </button>
                </div>
                
                {/* Mock Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium uppercase tracking-wide">Data Analysis</span>
                  <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium uppercase tracking-wide">Machine Learning</span>
                  <span className="px-3 py-1.5 bg-muted/10 border border-border/20 text-muted-foreground rounded-full text-xs font-medium uppercase tracking-wide">React</span>
                </div>
              </div>
            </FormSection>

            <FormSection 
              title="Account Info" 
              description="System-generated identifiers for your ledger entry. These cannot be modified."
            >
              <div className="col-span-1 md:col-span-2 space-y-6">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-bold">Student ID</p>
                  <p className="text-sm font-mono text-foreground bg-muted/5 border border-border/10 rounded px-4 py-3 inline-block">PRV-2024-0089</p>
                </div>
                
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-bold">Public Profile</p>
                  <Link to="/profile/PRV-2024-0089" className="text-sm text-primary hover:text-primary/80 transition-colors font-mono underline underline-offset-4 decoration-primary/30">
                    provenancy.edu/profile/PRV-2024-0089
                  </Link>
                </div>
              </div>
            </FormSection>

            {/* Bottom Sticky Action Bar */}
            <div className="fixed bottom-0 left-64 right-0 p-6 bg-background/80 backdrop-blur-xl border-t border-border/15 flex justify-end z-20">
              <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary/20 border border-primary/40 text-primary font-bold text-xs uppercase tracking-widest rounded hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>

        </div>
      </div>
    </StudentLayout>
  )
}
