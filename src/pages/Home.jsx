import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-border/20 bg-background sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-foreground font-bold">✓</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Provenancy</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Link to="/signup" className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border/20">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Institutional Authority</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                The definitive record of <span className="italic text-primary">professional growth.</span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Provenancy provides a secure, supervisor-verified work record system designed for students and early professionals. We transform informal experience into permanent, immutable institutional assets.
              </p>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-sm text-muted-foreground">Verified by Supervisors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-sm text-muted-foreground">Institutional Standards</span>
                </div>
              </div>
            </div>

            {/* Right Column - Certificate */}
            <div className="flex justify-center md:justify-end">
              <div className="w-48 h-56 bg-card border border-border/30 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-primary to-transparent"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Verified Entry ID</p>
                  <p className="text-lg font-mono font-semibold text-foreground">DFF-082-2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Work Records Section */}
      <section className="px-6 md:px-12 py-24 border-b border-border/20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-16 text-foreground">Verified Work Records</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border/20 rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">The Permanent Record</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every hour logged, every skill demonstrated, and every milestone achieved is recorded with cryptographic integrity. Your history is no longer a static CV, but a living ledger.
              </p>
              <p className="text-xs text-muted-foreground mt-6">✓ 99.8% ATTRIBUTION ACCURACY</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border/20 rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">👤</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Identity Integrity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Multi-factor verification ensures that the professional identity attached to every record is authentic and unchanged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supervisor Authorization Section */}
      <section className="px-6 md:px-12 py-24 border-b border-border/20">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">Supervisor Authorization</h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Provenancy begins at the source. Supervisors provide real-time digital signatures, validating tasks as they are completed. This eliminates the uncertainty of 'self-reported' experience.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <div>
                    <p className="font-semibold text-foreground">Digital Attestation</p>
                    <p className="text-sm text-muted-foreground">Cryptographically signed approvals for every logged session.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <div>
                    <p className="font-semibold text-foreground">Institutional Oversight</p>
                    <p className="text-sm text-muted-foreground">Administrative dashboards for university and corporate oversight.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Portal Preview */}
            <div className="bg-card border border-border/20 rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Authorization Portal</p>
                <span className="text-lg">⚙️</span>
              </div>
              <div className="space-y-4">
                <div className="bg-background rounded p-4 border border-border/20">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Software Internship</p>
                  <p className="text-sm text-foreground font-medium">Logged: 12.5 Hours</p>
                  <div className="mt-3 flex justify-end">
                    <button className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                      Approve
                    </button>
                  </div>
                </div>
                <div className="bg-background rounded p-4 border border-border/20">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Lab Research</p>
                  <p className="text-sm text-muted-foreground">⏳ Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Provenancy Profiles Section */}
      <section className="px-6 md:px-12 py-24 border-b border-border/20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Public Provenancy Profiles</h2>
            <p className="text-base text-muted-foreground">
              Share your verified achievements with employers and institutions via a secure, unalterable public link.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card 1 */}
            <div className="bg-card border border-border/20 rounded-lg overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-primary/20 to-transparent"></div>
              <div className="p-6 -mt-8 relative z-10">
                <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg">👤</span>
                </div>
                <h3 className="font-bold text-center mb-2 text-foreground">James Chen</h3>
                <p className="text-xs text-center text-muted-foreground mb-4">Third Year, CS Student</p>
                <div className="flex gap-2 justify-center mb-4">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">Python</span>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">APIs</span>
                </div>
                <p className="text-xs text-center text-muted-foreground/50">1254 VERIFIED HOURS</p>
              </div>
            </div>

            {/* Profile Card 2 */}
            <div className="bg-card border border-border/20 rounded-lg overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-primary/20 to-transparent"></div>
              <div className="p-6 -mt-8 relative z-10">
                <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg">👤</span>
                </div>
                <h3 className="font-bold text-center mb-2 text-foreground">Sarah Miller</h3>
                <p className="text-xs text-center text-muted-foreground mb-4">Marketing Associate</p>
                <div className="flex gap-2 justify-center mb-4">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">Strategy</span>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">Content</span>
                </div>
                <p className="text-xs text-center text-muted-foreground/50">1224 VERIFIED HOURS</p>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col justify-center text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to certify your expertise?</h3>
              <p className="text-sm text-primary-foreground/90 mb-6">
                Join the network of thousands of professionals building institutional trust.
              </p>
              <Link to="/signup" className="inline-block px-6 py-2 bg-primary-foreground text-primary rounded-md font-semibold hover:bg-primary-foreground/90 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/20 px-6 md:px-12 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Provenancy</h4>
              <p className="text-sm text-muted-foreground">Building the global infrastructure for professional trust and immutable work verification.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">System</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Verification Protocol</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security Standards</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Institution</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Legal Ledger</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/20 pt-8 flex justify-between items-center text-xs text-muted-foreground/50 uppercase tracking-widest">
            <p>© 2024 Provenancy Systems. All Rights Reserved.</p>
            <p>Verification System v4.0 - Schema: 482A</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
