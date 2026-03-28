import { Plus, X } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'

export default function StudentSkills() {
  const verifiedSkills = [
    {
      id: "V-ID: 001",
      name: "Python",
      subtitle: "12 verifications from 4 institutions",
      level: "Gold Standard",
      progress: "w-4/5",
      tags: ["Django", "NumPy"]
    },
    {
      id: "V-ID: 002",
      name: "Agile",
      subtitle: "8 verifications from Project Managers",
      level: "Verified Level II",
      progress: "w-3/5",
      tags: ["Agile", "Scrum"] // Reused tags from agile
    },
    {
      id: "V-ID: 003",
      name: "Data Analysis",
      subtitle: "5 verifications in Financial Auditing",
      level: "Verified Level I",
      progress: "w-1/2",
      tags: ["Pandas", "SQL"]
    },
    {
      id: "V-ID: 004",
      name: "Technical Writing",
      subtitle: "4 verifications across Documentation",
      level: "Verified Level I",
      progress: "w-1/3",
      tags: ["Markdown", "API Docs"]
    },
    {
      id: "V-ID: 005",
      name: "UI/UX Design",
      subtitle: "3 verifications from Product Leads",
      level: "Verified Level I",
      progress: "w-1/4",
      tags: ["Figma", "Research"]
    }
  ]

  const declaredSkills = ["Java", "AWS", "React", "Docker", "GraphQL", "Redux", "Tailwind CSS", "Figma"]

  return (
    <StudentLayout>
      <div className="p-10 max-w-7xl mx-auto w-full space-y-16">
        {/* Header */}
        <section className="space-y-4">
          <h2 className="text-4xl font-light tracking-tight text-foreground">Skill Repository</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-sm">
            A dual-layered ledger representing both professional aspirations and institutional validations. All verified skills are backed by cryptographic work signatures.
          </p>
        </section>

        {/* Verified Skills */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-border/20 pb-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-primary tracking-wide">Verified Skills</h3>
              <p className="text-xs text-muted-foreground">Institutional Proof of Competence</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-light text-foreground text-opacity-90">14</span>
              <span className="text-[10px] uppercase tracking-widest block text-muted-foreground font-semibold mt-1">Total Validations</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-border/10 border border-border/10">
            {verifiedSkills.map((skill, i) => (
              <div key={i} className="bg-muted/10 p-8 flex flex-col justify-between min-h-[160px] group hover:bg-muted/20 transition-all border border-transparent">
                <div className="flex justify-between items-start">
                  <span className="text-xs tracking-widest text-muted-foreground font-mono font-semibold">{skill.id}</span>
                  <div className="flex items-center gap-2 px-2 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Verified</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="text-2xl font-light mb-1 text-foreground">{skill.name}</h4>
                  <p className="text-xs text-muted-foreground">{skill.subtitle}</p>
                </div>
              </div>
            ))}
            
            {/* Request Verification Placeholder Block */}
            <div className="bg-muted/5 p-8 flex flex-col items-center justify-center min-h-[160px] border-2 border-dashed border-border/20 hover:border-primary/40 cursor-pointer transition-all">
              <Plus className="text-muted-foreground mb-2 w-6 h-6" />
              <span className="text-[10px] tracking-widest text-muted-foreground font-bold uppercase">Request Verification</span>
            </div>
          </div>
        </section>

        {/* Declared Skills */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-foreground tracking-wide">Declared Skills</h3>
              <p className="text-xs text-muted-foreground">Self-attested competencies pending validation</p>
            </div>
            <button className="text-xs px-4 py-2 border border-border/20 text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all rounded-md font-medium">
              Add Declared Skill
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {declaredSkills.map((skill, i) => (
              <div key={i} className="group px-5 py-3 bg-muted/10 border-b border-border/10 flex items-center gap-4 hover:border-border transition-all cursor-default">
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{skill}</span>
                <X className="w-3 h-3 text-muted-foreground/30 group-hover:text-muted-foreground/80 cursor-pointer" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </StudentLayout>
  )
}
