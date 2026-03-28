import { Link } from 'react-router-dom'
import { ShieldCheck, Landmark, Shield, ScrollText, Activity, Fingerprint, PenTool, BookCheck, CheckCircle, Share2, BadgeCheck } from 'lucide-react'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-background text-foreground font-body min-h-[calc(100vh-4rem)]">
      {/* Intro Section: The Digital Ledger */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-border/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="text-accent font-medium tracking-widest text-xs mb-4 uppercase">Institutional Authority</p>
            <h1 className="text-5xl font-light leading-tight mb-8">
              The definitive record of <span className="text-accent italic">professional growth</span>.
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Provenancy provides a secure, supervisor-verified work record system designed for students and early professionals. We transform informal experience into permanent, immutable institutional assets.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded-lg border border-border/5">
                <ShieldCheck className="w-5 h-5 text-primary-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Verified by Supervisors</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded-lg border border-border/5">
                <Landmark className="w-5 h-5 text-primary-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Institutional Standards</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-card p-8 flex items-center justify-center border border-border/5">
              {/* Abstract Visual Representative of a Ledger */}
              <div className="w-full h-full border border-border/20 rounded-lg p-6 relative flex flex-col gap-4 bg-background/50">
                <div className="h-4 w-2/3 bg-muted rounded-full"></div>
                <div className="h-4 w-full bg-border rounded-full"></div>
                <div className="h-4 w-1/2 bg-border rounded-full"></div>
                <div className="mt-auto flex justify-between items-end">
                  <div className="w-24 h-24 rounded bg-primary/20 border border-primary flex items-center justify-center shadow-[0_0_20px_rgba(26,35,126,0.3)]">
                    <Shield className="text-primary-foreground w-12 h-12" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1 font-semibold">Verified Entry ID</p>
                    <p className="text-xs font-mono text-accent">#PX-882-2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Work Records Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-border/10">
        <div className="mb-16">
          <h2 className="text-3xl font-light mb-4 text-foreground">Verified Work Records</h2>
          <div className="w-12 h-0.5 bg-accent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bento Grid Style Item */}
          <div className="md:col-span-2 bg-card border border-border/5 p-10 rounded-xl flex flex-col justify-between min-h-[400px]">
            <div>
              <ScrollText className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-medium mb-4 text-foreground">The Permanent Record</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">Every hour logged, every skill demonstrated, and every milestone achieved is recorded with cryptographic integrity. Your history is no longer a static CV, but a living ledger.</p>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-border/10 pt-8">
              <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                <Activity className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">99.9% ATTRIBUTION ACCURACY</span>
            </div>
          </div>
          
          {/* Feature Card */}
          <div className="bg-muted p-8 rounded-xl border border-border/5">
            <div className="h-full flex flex-col">
              <Fingerprint className="w-8 h-8 text-primary-foreground mb-4" />
              <h4 className="text-xl font-medium mb-4 text-foreground">Identity Integrity</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">Multi-factor verification ensures that the professional identity attached to every record is authentic and undisputed.</p>
              <div className="mt-auto w-full h-32 rounded-lg bg-cover bg-center grayscale opacity-50 border border-border/10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070)'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Supervisor Authorization Section */}
      <section className="bg-background py-24 px-6 border-b border-border/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -ml-64 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-light mb-6 text-foreground">Supervisor Authorization</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Provenance begins at the source. Supervisors provide real-time digital signatures, validating tasks as they are completed. This eliminates the uncertainty of "self-reported" experience.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                  <PenTool className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground">Digital Attestation</h5>
                  <p className="text-sm text-muted-foreground mt-1">Cryptographically signed approvals for every logged session.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                  <BookCheck className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground">Institutional Oversight</h5>
                  <p className="text-sm text-muted-foreground mt-1">Administrative dashboards for university and corporate oversight.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="bg-muted p-1 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-border/10">
              <div className="bg-border/30 p-6 rounded-t-lg border-b border-border/10 flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b-border/20 border-b pb-1">Authorization Portal</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-background rounded-lg border border-border/10">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 shrink-0 rounded bg-border"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Software Internship</p>
                      <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-1">Logged: 12.5 Hours</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto shrink-0 bg-primary/20 text-[10px] px-4 py-2 border border-primary/30 rounded-full text-primary-foreground uppercase font-bold tracking-tighter hover:bg-primary transition-colors">Authorize</button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-background/50 opacity-60 rounded-lg border border-border/5">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 shrink-0 rounded bg-border"></div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Lab Research</p>
                      <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest mt-1">Logged: 08.0 Hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-accent shrink-0">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Provenancy Profiles */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4 text-foreground">Public Provenancy Profiles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Share your verified achievements with employers and institutions via a secure, unalterable public link.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Profile Card 1 */}
          <div className="bg-card border border-border/10 p-6 rounded-lg hover:border-primary/30 transition-all group shadow-sm">
            <div className="w-16 h-16 bg-muted rounded-full mb-6 overflow-hidden border border-border/20">
              <img className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all" alt="Avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"/>
            </div>
            <h5 className="text-lg font-medium mb-1 text-foreground">James Chen</h5>
            <p className="text-xs text-muted-foreground mb-4">Final Year, CS Student</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-border/30 px-2 py-1 rounded text-[10px] text-muted-foreground font-medium">Python</span>
              <span className="bg-border/30 px-2 py-1 rounded text-[10px] text-muted-foreground font-medium">Agile</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground/60 border-t border-border/10 pt-4">
              <span>428 VERIFIED HOURS</span>
              <Share2 className="text-accent w-3.5 h-3.5" />
            </div>
          </div>
          
          {/* Profile Card 2 */}
          <div className="bg-card border border-border/10 p-6 rounded-lg hover:border-primary/30 transition-all group shadow-sm">
            <div className="w-16 h-16 bg-muted rounded-full mb-6 overflow-hidden border border-border/20">
              <img className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all" alt="Avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"/>
            </div>
            <h5 className="text-lg font-medium mb-1 text-foreground">Sarah Miller</h5>
            <p className="text-xs text-muted-foreground mb-4">Marketing Associate</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-border/30 px-2 py-1 rounded text-[10px] text-muted-foreground font-medium">Strategy</span>
              <span className="bg-border/30 px-2 py-1 rounded text-[10px] text-muted-foreground font-medium">Content</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground/60 border-t border-border/10 pt-4">
              <span>1,204 VERIFIED HOURS</span>
              <Share2 className="text-accent w-3.5 h-3.5" />
            </div>
          </div>
          
          {/* Feature Callout Card */}
          <div className="lg:col-span-2 bg-primary p-8 rounded-xl flex flex-col justify-center relative overflow-hidden group shadow-lg">
            <div className="relative z-10 flex flex-col h-full items-start justify-center">
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3 tracking-tight">Ready to certify your expertise?</h3>
              <p className="text-primary-foreground/80 mb-8 max-w-sm leading-relaxed text-sm">Join the network of thousands of professionals building institutional trust.</p>
              <Link to="/signup">
                <button className="bg-primary-foreground text-primary px-8 py-3 rounded-md font-bold transition-transform hover:scale-105 shadow-xl">Get Started</button>
              </Link>
            </div>
            <BadgeCheck className="absolute -right-8 -bottom-8 w-64 h-64 text-primary-foreground/10 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
