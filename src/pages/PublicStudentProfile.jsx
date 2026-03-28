import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import HeaderBlock from '../components/profile/HeaderBlock'
import Section from '../components/profile/Section'
import ListItem from '../components/profile/ListItem'

export default function PublicStudentProfile() {
  const { id } = useParams()

  const dummyEngagements = [
    {
      title: "Software Engineering Intern",
      organization: "TechCorp",
      duration: "3 months",
      dateRange: "June — Aug 2024",
      supervisorName: "Dr. Sarah Miller",
      verificationDate: "Oct 24, 2024"
    },
    {
      title: "Open Source Contributor",
      organization: "Node.js Foundation",
      duration: "6 months",
      dateRange: "Jan — June 2024",
      supervisorName: "Marcus Thorne",
      verificationDate: "July 12, 2024"
    },
    {
      title: "Graduate Research Assistant",
      organization: "University Data Science Lab",
      duration: "12 months",
      dateRange: "2023 — 2024",
      supervisorName: "Prof. Elena Volkov",
      verificationDate: "May 30, 2024"
    }
  ]

  const dummySkills = [
    { name: "Python", verifications: 12 },
    { name: "Agile", verifications: 8 },
    { name: "Machine Learning", verifications: 5 },
    { name: "SQL & NoSQL", verifications: 4 }
  ]

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Header Block */}
        <HeaderBlock 
          variant="student"
          name="Alex Carter"
          role="Computer Science Candidate"
          idToken={`PRV-2024-AC-${id || '7892'}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <Section 
              title="Verified Engagements" 
              action={<span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">{dummyEngagements.length} Records Found</span>}
            >
              {dummyEngagements.map((eng, i) => (
                <ListItem key={i} variant="student" data={eng} />
              ))}
            </Section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-card border border-border/10 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-border/20 pb-4">
                <h2 className="text-xl font-semibold text-foreground">Verified Skills</h2>
              </div>
              
              <div className="space-y-6">
                {dummySkills.map((skill, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-primary/20 group-hover:bg-primary transition-colors"></div>
                      <span className="text-foreground font-medium text-sm md:text-base">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-light text-primary">{skill.verifications}</span>
                      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter">Verifications</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-border/10">
                <p className="text-[11px] leading-relaxed text-muted-foreground italic">
                  The counts above represent unique endorsements from institutional supervisors and accredited program leads verified via the Provenancy protocol.
                </p>
              </div>
            </div>

            {/* Academic Credentials Mini-Bento */}
            <div className="p-6 bg-muted border border-border/10 rounded-xl space-y-4">
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Institution</span>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded bg-card object-cover grayscale opacity-70" alt="University crest" src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=150"/>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Stanford University</h4>
                  <p className="text-xs text-muted-foreground">B.S. Computer Science</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  )
}
