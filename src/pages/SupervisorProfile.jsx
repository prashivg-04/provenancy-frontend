import { Save } from 'lucide-react'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { FormSection, InputField, TextArea } from '../components/workspace/FormElements'
import { Link } from 'react-router-dom'

export default function SupervisorProfile() {
  return (
    <SupervisorLayout>
      <div className="flex-1 overflow-y-auto w-full">
        {/* Main Content Area */}
        <div className="p-12 max-w-5xl mx-auto space-y-24 pb-32">
          
          <header>
            <h1 className="text-4xl font-light tracking-tight text-foreground mb-4">Profile Management</h1>
            <p className="text-muted-foreground/80 max-w-2xl leading-relaxed">
              Maintain your administrative identity. This information confirms your authority and institutional standing on all ledger validations.
            </p>
          </header>

          <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
            
            <FormSection 
              title="Basic Information" 
              description="Your primary identity and designation within the institution."
            >
              <InputField label="Full Name" placeholder="e.g. Dr. Julian Vance" />
              <InputField label="Designation" placeholder="e.g. Dean of Students" />
              <div className="col-span-1 md:col-span-2 mt-4">
                <InputField label="Organization" placeholder="e.g. Stanford University" />
              </div>
              <div className="col-span-1 md:col-span-2 mt-4">
                <TextArea label="Professional Bio" placeholder="Academic and administrative background governing your ledger authority..." />
              </div>
            </FormSection>

            <FormSection 
              title="Contact / Professional" 
              description="Where students and external bodies can reach you."
            >
              <InputField label="Work Email" type="email" placeholder="jvance@stanford.edu" />
              <InputField label="LinkedIn URL" type="url" placeholder="https://linkedin.com/in/jvance" />
            </FormSection>

            <FormSection 
              title="Supervisor Info" 
              description="Your immutable signing authority identifier inside the Provenancy ecosystem."
            >
              <div className="col-span-1 md:col-span-2 space-y-6">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-bold">Admin ID</p>
                  <p className="text-sm font-mono text-foreground bg-muted/5 border border-border/10 rounded px-4 py-3 inline-block">PRV-SUP-8821</p>
                </div>
                
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-bold">Public Verification Profile</p>
                  <Link to="/supervisor/PRV-SUP-8821" className="text-sm text-primary hover:text-primary/80 transition-colors font-mono underline underline-offset-4 decoration-primary/30">
                    provenancy.edu/supervisor/PRV-SUP-8821
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
    </SupervisorLayout>
  )
}
