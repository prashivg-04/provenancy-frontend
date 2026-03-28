import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card py-16 px-6 border-t border-border/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-accent font-bold text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-accent"/> Provenancy</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Building the global infrastructure for professional trust and immutable work verification.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h6 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-6 border-b border-border/10 pb-2 inline-block">System</h6>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a className="hover:text-accent transition-colors" href="#">Verification Protocol</a></li>
              <li><a className="hover:text-accent transition-colors" href="#">Security Standards</a></li>
              <li><a className="hover:text-accent transition-colors" href="#">API Access</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-6 border-b border-border/10 pb-2 inline-block">Institution</h6>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a className="hover:text-accent transition-colors" href="#">Legal Ledger</a></li>
              <li><a className="hover:text-accent transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-accent transition-colors" href="#">Compliance</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border/5 flex flex-col md:flex-row justify-between text-[10px] text-muted-foreground/40 font-semibold uppercase tracking-widest gap-4 px-2">
        <p>© 2024 Provenancy Systems Inc. All Rights Reserved.</p>
        <div className="flex gap-8">
          <p>Protocol: V4.1.2</p>
          <p>Verified Node: 0x4f...882a</p>
        </div>
      </div>
    </footer>
  )
}
