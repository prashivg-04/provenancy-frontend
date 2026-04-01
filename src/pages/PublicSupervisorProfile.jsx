import { useParams, Link } from 'react-router-dom'
import { Download, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import HeaderBlock from '../components/profile/HeaderBlock'
import Section from '../components/profile/Section'
import ListItem from '../components/profile/ListItem'

export default function PublicSupervisorProfile() {
  const { id } = useParams()

  const dummyValidations = [
    {
      studentName: "Alexander Vance",
      role: "Research Assistant",
      projectName: "Quantum Field Simulation Research Project",
      hash: "8f2b...9d4e",
      organization: "Institute of Technology",
      date: "14 MAY 2024"
    },
    {
      studentName: "Elena Rodriguez",
      role: "PhD Candidate",
      projectName: "Applied Neutronics Laboratory Work",
      hash: "4a9c...11f8",
      organization: "CERN Collaborations",
      date: "02 APR 2024"
    },
    {
      studentName: "Marcus Thorne",
      role: "Lab Intern",
      projectName: "Materials Stress Analysis Documentation",
      hash: "2e1d...00bb",
      organization: "Institute of Technology",
      date: "22 FEB 2024"
    },
    {
      studentName: "Sarah Chen",
      role: "Postdoc Fellow",
      projectName: "Advanced Computational Fluid Dynamics",
      hash: "99ba...fe24",
      organization: "Aerospace Defense Org",
      date: "15 JAN 2024"
    }
  ]

  const { user } = useAuth()

  return (
    <Layout>
      {user && (
        <div className="w-full bg-primary/5 border-b border-primary/20 z-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Previewing Public Profile</span>
            <Link 
              to={user.role === 'supervisor' ? '/supervisor' : '/dashboard'} 
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground bg-muted/50 hover:bg-muted py-2 px-4 rounded border border-border/20 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Return to Workspace
            </Link>
          </div>
        </div>
      )}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Header Block for Supervisor */}
        <HeaderBlock 
          variant="supervisor"
          name="Dr. Sarah Miller"
          role="Senior Research Lead"
          organization="Institute of Technology · Faculty of Applied Sciences"
          idToken={`#PROV-INST-8829-${id || 'X'}`}
          verifiedSince="August 2019"
          totalAttestations="1,240"
        />

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-card p-8 rounded-xl border-l-[3px] border-primary border-t border-t-border/10 border-r border-r-border/10 border-b border-b-border/10 shadow-sm">
            <p className="text-[0.625rem] font-bold text-muted-foreground tracking-widest uppercase mb-4">Integrity Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground tracking-tight">99.8</span>
              <span className="text-muted-foreground text-sm font-medium">/ 100</span>
            </div>
            <div className="mt-4 h-1 bg-muted w-full rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[99.8%]"></div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-xl border border-border/10 shadow-sm">
            <p className="text-[0.625rem] font-bold text-muted-foreground tracking-widest uppercase mb-4">Active Engagements</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground tracking-tight">14</span>
              <span className="text-muted-foreground text-sm font-medium">Projects</span>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-xl border border-border/10 shadow-sm">
            <p className="text-[0.625rem] font-bold text-muted-foreground tracking-widest uppercase mb-4">Avg. Verification Time</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground tracking-tight">1.2</span>
              <span className="text-muted-foreground text-sm font-medium">Days</span>
            </div>
          </div>
        </section>

        {/* Validated Engagements List using reusable Section & ListItem */}
        <Section 
          title="Validated Engagements" 
          subtitle="Public ledger of academic and professional attestations."
          action={
            <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
              <span>Export Transcript</span>
              <Download className="w-4 h-4" />
            </button>
          }
        >
          <div className="border-t border-border/10 mt-6 pt-4">
            {dummyValidations.map((val, i) => (
              <ListItem key={i} variant="supervisor" data={val} />
            ))}
          </div>
          
          <div className="flex justify-center pt-12">
            <button className="px-8 py-3 border border-border/30 rounded-md text-sm font-bold tracking-wide text-foreground hover:bg-muted/50 transition-all">
              Load Archive Records
            </button>
          </div>
        </Section>
      </main>
      
      {/* Footer using the extracted shared Footer component */}
      <Footer />
    </Layout>
  )
}
