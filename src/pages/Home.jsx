import { Link } from 'react-router-dom'
import { ShieldCheck, Landmark, Shield, ScrollText, Activity, Fingerprint, PenTool, BookCheck, CheckCircle, Share2, BadgeCheck, ArrowRight, Database, Code, Globe2, Building2 } from 'lucide-react'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-background text-foreground font-body min-h-[calc(100vh-4rem)] relative overflow-hidden">
      
      {/* Global Ledger Grid & Glow Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>
      
      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto border-b border-border/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold tracking-widest uppercase text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Secure Infrastructure
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-8 tracking-tight">
              The definitive record<br/>
              of <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">professional growth</span>.
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-lg mb-12 leading-relaxed opacity-90">
              Transform informal experiences into permanent, immutable institutional assets. A supervisor-verified ledger designed for the next generation of professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/signup" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-lg shadow-[0_0_20px_rgba(26,35,126,0.4)] hover:shadow-[0_0_30px_rgba(26,35,126,0.6)] transition-all uppercase tracking-widest text-xs hover:-translate-y-0.5">
                Join the Network
              </Link>
              <Link to="/login" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-background border border-border/50 text-foreground font-semibold rounded-lg hover:bg-muted transition-all uppercase tracking-widest text-xs">
                View Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-8 border-t border-border/20 pt-8 opacity-80">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verified Identity</span>
              </div>
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-accent" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Institutional Standard</span>
              </div>
            </div>
          </div>
          
          {/* Hero Right Visual: The Ledger Stack */}
          <div className="lg:col-span-6 relative h-[500px] hidden md:block">
            {/* Background glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[100px] rounded-full mix-blend-screen z-0"></div>
            
            {/* Card Stack 1 (Back) */}
            <div className="absolute right-0 top-12 w-[80%] bg-card/60 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl transform rotate-3 z-10 opacity-70">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted"></div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-24 bg-muted rounded"></div>
                    <div className="h-2 w-16 bg-muted/60 rounded"></div>
                  </div>
                </div>
                <div className="h-6 w-20 bg-muted/50 rounded-full"></div>
              </div>
              <div className="space-y-2.5">
                <div className="h-2 w-full bg-muted/40 rounded"></div>
                <div className="h-2 w-full bg-muted/40 rounded"></div>
              </div>
            </div>

            {/* Card Stack 2 (Middle) */}
            <div className="absolute right-[10%] top-24 w-[85%] bg-card/80 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-2xl transform -rotate-2 z-20">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Global Systems Inc.</h4>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Engineering Log</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-border/30 rounded text-xs text-muted-foreground font-mono">
                  #EXT-442
                </div>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border/50 to-transparent mb-6"></div>
              <p className="text-xs text-muted-foreground mb-4">Developed secure backend architecture for scale.</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-border border-2 border-background"></div>
                  <div className="w-6 h-6 rounded-full bg-primary/40 border-2 border-background"></div>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Pending Supervisor</span>
              </div>
            </div>

            {/* Card Stack 3 (Front Focus) */}
            <div className="absolute right-[5%] top-48 w-[95%] bg-card backdrop-blur-2xl border border-primary/40 rounded-2xl p-8 shadow-[0_24px_48px_-12px_rgba(26,35,126,0.3)] transform z-30 ring-1 ring-background">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center shadow-inner">
                    <Shield className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium text-foreground">Software Internship</h3>
                      <CheckCircle className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <p className="text-xs text-muted-foreground">Stanford Computer Science Lab</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1 font-semibold">Ledger Entry</p>
                  <p className="text-sm font-mono text-accent">#PX-882-2024</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-background/50 border border-border/10 rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Attributed Time</p>
                  <p className="text-xl font-light text-foreground">125.0 <span className="text-sm text-muted-foreground">hrs</span></p>
                </div>
                <div className="p-3 bg-background/50 border border-border/10 rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Authorization</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span className="font-medium text-foreground">Dr. Elias Vance</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-primary/10 border border-primary/20 rounded px-4 py-2 flex items-center justify-between">
                 <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Immutable Record Saved</span>
                 <Database className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- TRUSTED BY BANNER --- */}
      <section className="border-b border-border/10 bg-muted/20 backdrop-blur-sm relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0 border-r border-border/50 pr-8">
            Verified Records Accepted By
          </p>
          <div className="flex flex-wrap items-center justify-between w-full gap-8">
             <div className="flex items-center gap-2 font-mono text-sm tracking-tighter font-semibold"><Globe2 className="w-5 h-5"/> PACIFIC UNV.</div>
             <div className="flex items-center gap-2 font-serif text-lg tracking-wide font-bold">Atlus Corp</div>
             <div className="flex items-center gap-2 font-sans text-md font-black tracking-tighter uppercase"><Code className="w-5 h-5"/> SYNTAX_LABS</div>
             <div className="flex items-center gap-2 font-mono text-sm tracking-wide font-medium"><Building2 className="w-5 h-5"/> FEDERATED TRUST</div>
          </div>
        </div>
      </section>

      {/* --- METRICS / STATS --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-border/10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/20 text-center">
          <div className="px-4">
             <p className="text-4xl font-light text-foreground mb-2">142K</p>
             <p className="text-xs text-muted-foreground uppercase tracking-widest">Hours Logged</p>
          </div>
          <div className="px-4">
             <p className="text-4xl font-light text-foreground mb-2">99.8%</p>
             <p className="text-xs text-muted-foreground uppercase tracking-widest">Verification Rate</p>
          </div>
          <div className="px-4">
             <p className="text-4xl font-light text-foreground mb-2">12.5K</p>
             <p className="text-xs text-muted-foreground uppercase tracking-widest">Active Students</p>
          </div>
          <div className="px-4">
             <p className="text-4xl font-light text-foreground mb-2">3,400</p>
             <p className="text-xs text-muted-foreground uppercase tracking-widest">Supervisors</p>
          </div>
        </div>
      </section>

      {/* --- THE ARCHITECTURE OF TRUST (BENTO GRID) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-border/10 relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl font-light mb-6 text-foreground tracking-tight">The Architecture of Trust</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Move past self-reported credentials. Provenancy builds a cryptographic chain of custody for every hour you log, turning claims into proof.
          </p>
        </div>
        
        {/* Full 5-Piece Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-6xl mx-auto auto-rows-[minmax(250px,auto)]">
          
          {/* Main Large Card */}
          <div className="md:col-span-2 md:row-span-2 bg-card/40 backdrop-blur-md border border-border/20 p-10 rounded-3xl flex flex-col justify-between group hover:border-primary/30 transition-all relative overflow-hidden shadow-lg">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 to-transparent pointer-events-none group-hover:from-primary/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <ScrollText className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-3xl font-medium mb-4 text-foreground tracking-tight">The Permanent Record</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">Every hour logged, every skill demonstrated, and every milestone achieved is recorded permanently. Your history becomes a living, incontrovertible ledger.</p>
            </div>
            
            <div className="relative z-10 bg-background/50 border border-border/30 rounded-2xl p-6 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Live Sync</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  <span className="text-xs font-mono text-accent">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-muted/60 rounded overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent relative">
                     <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/20 animate-[translateX_2s_infinite]"></div>
                  </div>
                </div>
                <div className="h-1.5 w-5/6 bg-muted/60 rounded"></div>
                <div className="h-1.5 w-2/3 bg-muted/60 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Top Right Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-card/60 to-muted/20 backdrop-blur-md p-8 rounded-3xl border border-border/20 group hover:border-primary/20 transition-all relative overflow-hidden shadow-lg">
            <Fingerprint className="w-8 h-8 text-primary-foreground mb-4" />
            <h4 className="text-xl font-medium mb-3 text-foreground">Identity Integrity</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">Multi-factor verification ensures that the professional identity attached to every record is authentic, undisputed, and unchangeable over time.</p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[20px] border-primary/5 rounded-full group-hover:border-primary/10 transition-colors"></div>
          </div>
          
          {/* Bottom Middle Card */}
          <div className="bg-card/40 backdrop-blur-md p-8 rounded-3xl border border-border/20 group hover:border-primary/20 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <Activity className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors mb-4" />
              <h4 className="font-medium text-foreground mb-2">Real-time Telemetry</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Granular tracking of active session durations and metadata.</p>
            </div>
            <div className="mt-8 flex items-baseline gap-1.5">
              <span className="text-3xl font-light text-foreground">100</span><span className="text-sm font-bold text-accent">%</span>
            </div>
          </div>
          
          {/* Bottom Right Card */}
          <div className="bg-card/40 backdrop-blur-md p-8 rounded-3xl border border-border/20 group hover:border-primary/20 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:4px_4px]"></div>
             <div className="relative z-10">
               <Database className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
               <h4 className="font-medium text-foreground mb-2">Immutable Storage</h4>
               <p className="text-xs text-muted-foreground leading-relaxed">Data cannot be retroactively altered without breaking the cryptographic signature.</p>
             </div>
          </div>
          
        </div>
      </section>

      {/* --- SUPERVISOR AUTHORIZATION DESK --- */}
      <section className="py-32 px-6 border-b border-border/10 relative z-10 bg-background overflow-hidden">
        {/* Deep atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
        <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>
        <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light mb-6 text-foreground tracking-tight">Supervisor Authorization</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Provenance begins at the source. Supervisors provide real-time digital signatures, validating tasks as they are completed. This completely eliminates the "self-reported" hiring gap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Features List */}
            <div className="lg:col-span-5 space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-card border border-border/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <PenTool className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-xl mb-2">Digital Attestation</h5>
                  <p className="text-muted-foreground leading-relaxed">Cryptographically signed approvals for every logged session, permanently confirming duration and quality of work.</p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-card border border-border/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <BookCheck className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-xl mb-2">Institutional Oversight</h5>
                  <p className="text-muted-foreground leading-relaxed">Advanced administrative dashboards built specifically for university programs and corporate QA adherence.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-card border border-border/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <ShieldCheck className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-xl mb-2">Fraud Prevention</h5>
                  <p className="text-muted-foreground leading-relaxed">Automated anomaly detection identifies impossible overlapping hours or suspicious supervisor identities.</p>
                </div>
              </div>
            </div>
            
            {/* Massive Interactive Dashboard Mockup */}
            <div className="lg:col-span-7 relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-accent/5 blur-2xl rounded-[3rem] z-0"></div>
              
              <div className="bg-card/90 backdrop-blur-3xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-border/20 relative z-10 overflow-hidden ring-1 ring-white/5">
                
                {/* Mock Mac Window Header */}
                <div className="bg-background/90 px-6 py-4 border-b border-border/20 flex justify-between items-center backdrop-blur-md">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-border hover:bg-red-500 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-border hover:bg-orange-500 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-border hover:bg-green-500 transition-colors"></div>
                  </div>
                  <div className="px-4 py-1.5 rounded-md bg-muted/50 border border-border/30 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80 flex items-center gap-2 w-1/2 justify-center">
                    <ShieldCheck className="w-3.5 h-3.5"/> app.provenancy.io/supervisor
                  </div>
                  <div className="w-16"></div> {/* Spacer for flex balance */}
                </div>

                {/* Dashboard Area */}
                <div className="p-8 bg-background/40">
                  <div className="flex justify-between items-end mb-8 border-b border-border/10 pb-6">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-1">Pending Authorizations</h3>
                      <p className="text-sm text-muted-foreground">You have 3 records requiring signature.</p>
                    </div>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-xs font-bold uppercase tracking-wider">Sign All</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Row 1 (Highlight) */}
                    <div className="group flex justify-between items-center p-5 bg-card border border-primary/30 rounded-2xl hover:bg-card/90 hover:shadow-[0_10px_30px_-10px_rgba(26,35,126,0.3)] transition-all cursor-pointer ring-1 ring-primary/10">
                      <div className="flex gap-4 items-center w-2/3">
                        <div className="w-12 h-12 rounded-full bg-muted border border-border/40 overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover grayscale opacity-80" alt="student" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium text-foreground text-sm truncate">Data Analysis Pipeline Mod 1</p>
                          <div className="flex items-center gap-3 mt-1.5 line-clamp-1">
                             <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1"><BookCheck className="w-3 h-3"/> James Chen</span>
                             <span className="text-[10px] text-accent uppercase tracking-widest bg-accent/10 px-1.5 rounded">4.5 Hrs</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button className="px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-md hover:-translate-y-0.5 transform">Sign Off</button>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="group flex justify-between items-center p-5 bg-background border border-border/10 rounded-2xl opacity-70 hover:opacity-100 transition-all cursor-pointer">
                      <div className="flex gap-4 items-center w-2/3">
                        <div className="w-12 h-12 rounded-full bg-muted border border-border/40 overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover grayscale opacity-80" alt="student" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium text-muted-foreground text-sm truncate group-hover:text-foreground">Frontend Component Refactor</p>
                          <div className="flex items-center gap-3 mt-1.5">
                             <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-semibold">Sarah Miller</span>
                             <span className="text-[10px] text-muted-foreground uppercase tracking-widest border border-border/20 px-1.5 rounded">8.0 Hrs</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button className="px-5 py-2 text-[10px] uppercase tracking-widest font-bold bg-muted text-muted-foreground border border-border/20 rounded-xl hover:bg-border transition-colors">Review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELITE PUBLIC PROFILES SECTION --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10 border-b border-border/10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold tracking-widest uppercase text-accent mb-6">
            Exportable Trust
          </div>
          <h2 className="text-4xl font-light mb-6 text-foreground tracking-tight">Public Provenancy Profiles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Share your verified achievements with employers and institutions via a secure, unalterable public link. Resumes and portfolios can be faked, ledgers cannot.
          </p>
        </div>
        
        {/* Profile Card Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Detailed Profile Card 1 */}
          <div className="bg-card/30 backdrop-blur-xl border border-border/20 p-8 rounded-3xl hover:border-primary/40 hover:bg-card/60 transition-all duration-500 group shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col h-full relative overflow-hidden">
             {/* Gradient header line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-border/5 via-primary/50 to-border/5"></div>
            
            <div className="flex justify-between items-start mb-8">
              <div className="w-20 h-20 bg-muted rounded-2xl overflow-hidden border-2 border-border/30 group-hover:border-primary/50 transition-colors shadow-inner">
                <img className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"/>
              </div>
              <div className="flex items-center gap-1.5 bg-background/80 px-3 py-1.5 rounded-lg border border-border/30">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-foreground">Verified</span>
              </div>
            </div>
            
            <h5 className="text-2xl font-medium mb-1 text-foreground">James Chen</h5>
            <p className="text-sm text-muted-foreground mb-8">Final Year, CS Student @ Pacific Unv.</p>
            
            <div className="space-y-6 mb-8 flex-grow">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">Top Authenticated Skills</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium flex items-center gap-1.5"><Code className="w-3 h-3"/> Python</span>
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium flex items-center gap-1.5"><Database className="w-3 h-3"/> SQL</span>
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium">Agile</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs font-bold tracking-widest text-muted-foreground bg-background/50 p-4 rounded-xl border border-border/10 group-hover:bg-primary/5 transition-colors">
              <span className="text-foreground">428 <span className="text-muted-foreground">VERIFIED HOURS</span></span>
              <Share2 className="text-accent w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          
          {/* Detailed Profile Card 2 */}
          <div className="bg-card/30 backdrop-blur-xl border border-border/20 p-8 rounded-3xl hover:border-primary/40 hover:bg-card/60 transition-all duration-500 group shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col h-full relative overflow-hidden md:-mt-8 md:mb-8">
             {/* Gradient header line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-border/5 via-accent/50 to-border/5"></div>
            
            <div className="flex justify-between items-start mb-8">
              <div className="w-20 h-20 bg-muted rounded-2xl overflow-hidden border-2 border-border/30 group-hover:border-accent/50 transition-colors shadow-inner">
                <img className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"/>
              </div>
              <div className="flex items-center gap-1.5 bg-background/80 px-3 py-1.5 rounded-lg border border-border/30">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-foreground">Verified</span>
              </div>
            </div>
            
            <h5 className="text-2xl font-medium mb-1 text-foreground">Sarah Miller</h5>
            <p className="text-sm text-muted-foreground mb-8">Marketing Associate @ Atlus Corp</p>
            
            <div className="space-y-6 mb-8 flex-grow">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">Top Authenticated Skills</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium">B2B Strategy</span>
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium">Content Marketing</span>
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium flex items-center gap-1.5"><Activity className="w-3 h-3"/> SEO</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs font-bold tracking-widest text-muted-foreground bg-background/50 p-4 rounded-xl border border-border/10 group-hover:bg-accent/5 transition-colors">
              <span className="text-foreground">1,204 <span className="text-muted-foreground">VERIFIED HOURS</span></span>
              <Share2 className="text-accent w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Detailed Profile Card 3 */}
          <div className="bg-card/30 backdrop-blur-xl border border-border/20 p-8 rounded-3xl hover:border-primary/40 hover:bg-card/60 transition-all duration-500 group shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col h-full relative overflow-hidden">
             {/* Gradient header line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-border/5 via-primary-foreground/50 to-border/5"></div>
            
            <div className="flex justify-between items-start mb-8">
              <div className="w-20 h-20 bg-muted rounded-2xl overflow-hidden border-2 border-border/30 group-hover:border-primary/50 transition-colors shadow-inner">
                <img className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Avatar" src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=150"/>
              </div>
              <div className="flex items-center gap-1.5 bg-background/80 px-3 py-1.5 rounded-lg border border-border/30">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-foreground">Verified</span>
              </div>
            </div>
            
            <h5 className="text-2xl font-medium mb-1 text-foreground">Marcus Thorne</h5>
            <p className="text-sm text-muted-foreground mb-8">Design Lead @ Syntax Labs</p>
            
            <div className="space-y-6 mb-8 flex-grow">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">Top Authenticated Skills</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium flex items-center gap-1.5"><PenTool className="w-3 h-3"/> UI Design</span>
                  <span className="bg-background/80 border border-border/20 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground font-medium">Design Systems</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs font-bold tracking-widest text-muted-foreground bg-background/50 p-4 rounded-xl border border-border/10 group-hover:bg-primary/5 transition-colors">
              <span className="text-foreground">3,550 <span className="text-muted-foreground">VERIFIED HOURS</span></span>
              <Share2 className="text-accent w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          
        </div>
      </section>

      {/* --- MAJESTIC FINALE CTA --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-card via-card to-primary/10 border border-primary/20 p-16 md:p-24 rounded-[3rem] text-center relative overflow-hidden group shadow-2xl">
          {/* Internal Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/10 transition-colors duration-1000"></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
            <h3 className="text-5xl md:text-6xl font-light text-foreground mb-8 tracking-tight leading-tight">Ready to certify<br/><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">your expertise?</span></h3>
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed">Join the network of thousands of professionals building institutional trust directly onto their resumes. Discard the static CV.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link to="/signup" className="w-full sm:w-auto">
                <button className="w-full bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold transition-transform hover:-translate-y-1 shadow-[0_10px_40px_-15px_rgba(26,35,126,0.8)] uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                  Create Ledger Account <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <button className="w-full bg-background border border-border/50 text-foreground px-10 py-5 rounded-2xl font-bold transition-all hover:bg-muted uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                  Supervisor Login
                </button>
              </Link>
            </div>
          </div>
          
          <BadgeCheck className="absolute -left-16 -bottom-16 w-96 h-96 text-primary/5 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-1000" />
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10">
         <Footer />
      </div>
    </div>
  )
}
