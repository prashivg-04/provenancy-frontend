import { Link } from 'react-router-dom'
import { Fingerprint, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center relative overflow-hidden">
      
      {/* Ambient glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(26,35,126,0.15)]">
          <Fingerprint className="w-7 h-7 text-primary/70" strokeWidth={1.5} />
        </div>

        {/* 404 */}
        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.35em] mb-4">
          Error 404
        </p>
        <h1 className="text-7xl font-black text-foreground leading-none tracking-tighter mb-5">
          404
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          This page doesn't exist or has been moved.<br />
          The ledger entry you're looking for is not on record.
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-border/20 mb-8" />

        {/* Back button */}
        <Link
          to="/"
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary/10 border border-primary/25 text-primary text-[12px] font-bold uppercase tracking-widest hover:bg-primary/20 hover:border-primary/40 transition-all shadow-[0_0_20px_rgba(26,35,126,0.1)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
          Back to Home
        </Link>

      </div>
    </div>
  )
}
