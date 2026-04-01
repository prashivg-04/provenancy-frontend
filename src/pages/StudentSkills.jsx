import { Plus, X, Search, BadgeCheck, Shield, ChevronRight } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { PageContainer } from '../components/workspace/SharedPrimitives'

export default function StudentSkills() {
  const verifiedSkills = [
    {
      id: "V-ID: 001",
      name: "Python",
      subtitle: "12 verifications from 4 institutions",
      level: "Gold Standard",
      tags: ["Django", "NumPy"]
    },
    {
      id: "V-ID: 002",
      name: "Agile",
      subtitle: "8 verifications from Project Managers",
      level: "Verified Level II",
      tags: ["Agile", "Scrum"]
    },
    {
      id: "V-ID: 003",
      name: "Data Analysis",
      subtitle: "5 verifications in Financial Auditing",
      level: "Verified Level I",
      tags: ["Pandas", "SQL"]
    },
    {
      id: "V-ID: 004",
      name: "Technical Writing",
      subtitle: "4 verifications across Documentation",
      level: "Verified Level I",
      tags: ["Markdown", "API Docs"]
    },
    {
      id: "V-ID: 005",
      name: "UI/UX Design",
      subtitle: "3 verifications from Product Leads",
      level: "Verified Level I",
      tags: ["Figma", "Research"]
    }
  ]

  const declaredSkills = ["Java", "AWS", "React", "Docker", "GraphQL", "Redux", "Tailwind CSS", "Figma", "Node.js", "System Design"]

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
            <div className="mb-12 relative border-b border-border/10 pb-8 pt-4">
              <div className="absolute inset-x-0 top-0 h-40 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit">
                   <Shield className="w-3 h-3 text-primary" />
                   <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Cryptographic Registry</span>
                </div>
                
                {/* Search / Filter Utility */}
                <div className="hidden sm:flex items-center gap-2 bg-background/50 border border-border/50 rounded-full px-4 py-2 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search ledger..." 
                    className="bg-transparent border-0 text-xs text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none w-48"
                  />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Skill Repository</h1>
              <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                A dual-layered ledger representing both professional aspirations and institutional validations. All verified skills are backed by immutable cryptographic signatures.
              </p>
            </div>

            <div className="space-y-16">
              
              {/* 
                =============================================
                VERIFIED SKILLS (BENTO GRID)
                =============================================
              */}
              <section className="space-y-8">
                <div className="flex items-end justify-between border-b border-border/20 pb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-tight text-foreground flex items-center gap-3">
                      Verified Assets
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-[10px] font-bold text-primary tracking-widest border border-primary/20">
                        {verifiedSkills.length}
                      </div>
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Institutional Proof of Competence</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verifiedSkills.map((skill, i) => (
                    <div key={i} className="bg-card/30 backdrop-blur-md border border-border/50 p-6 rounded-2xl flex flex-col justify-between min-h-[180px] group hover:border-primary/40 hover:shadow-[0_0_30px_rgba(26,35,126,0.1)] transition-all cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <span className="text-[10px] tracking-widest text-muted-foreground font-mono font-semibold">{skill.id}</span>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded border border-primary/20">
                          <BadgeCheck className="w-3 h-3 text-primary" />
                          <span className="text-[9px] font-bold text-primary tracking-widest uppercase">Verified</span>
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <h4 className="text-2xl font-light mb-2 text-foreground group-hover:text-primary transition-colors">{skill.name}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{skill.subtitle}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {skill.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 text-[9px] uppercase tracking-widest font-bold text-muted-foreground bg-muted/30 border border-border/20 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Request Verification Action Card */}
                  <div className="bg-primary/5 border border-dashed border-primary/30 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[180px] group hover:bg-primary/10 hover:border-primary/60 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Plus className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] text-primary font-bold uppercase group-hover:text-foreground transition-colors">Request Verification</span>
                  </div>
                </div>
              </section>

              {/* 
                =============================================
                DECLARED SKILLS
                =============================================
              */}
              <section className="space-y-8 bg-card/10 border border-border/20 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/20 pointer-events-none"></div>
                
                <div className="flex items-center justify-between relative z-10 border-b border-border/10 pb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-tight text-foreground flex items-center gap-3">
                      Declared Assets
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Self-attested pending validation</p>
                  </div>
                  <button className="flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2.5 rounded-xl transition-all border border-primary/20 hover:border-primary text-[10px] uppercase tracking-widest font-bold">
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add Competency</span>
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3 relative z-10 pt-2">
                  {declaredSkills.map((skill, i) => (
                    <div key={i} className="group px-4 py-2.5 bg-background/50 border border-border/40 rounded-lg flex items-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer shadow-sm">
                      <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
                      <X className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-destructive transition-colors" />
                    </div>
                  ))}
                  
                  {/* Quick Add Phantom Pill */}
                  <div className="px-4 py-2.5 bg-transparent border border-dashed border-border/40 rounded-lg flex items-center gap-2 hover:border-primary/40 transition-all cursor-text group">
                    <span className="text-xs text-muted-foreground/50 group-hover:text-muted-foreground">Type to add...</span>
                  </div>
                </div>
              </section>

            </div>
          </PageContainer>
        </div>

        {/* 
          =============================================
          RIGHT INFO PANEL 
          =============================================
        */}
        <aside className="w-80 lg:w-96 border-l border-border/10 bg-card/10 backdrop-blur-md p-8 hidden xl:flex flex-col gap-12 static right-0 top-0 shadow-[-10px_0_30px_rgba(0,0,0,0.2)]">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-8">Registry Stats</h3>
            
            <div className="space-y-6">
              <div className="bg-background/40 p-5 rounded-xl border border-border/30">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold block mb-2">Total Verifications</span>
                <div className="text-4xl font-light text-foreground">32</div>
              </div>
              
              <div className="bg-background/40 p-5 rounded-xl border border-border/30">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold block mb-2">Unique Endorsers</span>
                <div className="text-4xl font-light text-foreground">11</div>
              </div>
              
              <div className="bg-primary/10 p-5 rounded-xl border border-primary/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/20 rounded-full blur-[20px] group-hover:bg-primary/30 transition-all"></div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold block mb-2 relative z-10">Network Trust Score</span>
                <div className="text-4xl font-light text-primary relative z-10">94<span className="text-lg opacity-50">/100</span></div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
             <div className="flex items-center gap-3 p-4 bg-muted/10 border border-border/20 rounded-xl cursor-pointer hover:bg-muted/20 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-background border border-border/30 flex items-center justify-center shrink-0">
                 <Shield className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
               </div>
               <div className="flex-1">
                 <h4 className="text-xs font-bold text-foreground">Export Ledger</h4>
                 <p className="text-[10px] text-muted-foreground">Download verifiable JSON</p>
               </div>
               <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
             </div>
          </div>
        </aside>
      </div>
    </StudentLayout>
  )
}
