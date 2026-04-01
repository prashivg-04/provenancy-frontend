import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthLayout({ children, title, subtitle, isLogin = false }) {
  return (
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 bg-background relative overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Atmospheric Background Element */}
      {isLogin ? (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        </>
      ) : (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary))_0%,transparent_70%)]"></div>
        </div>
      )}

      {/* Fixed Width Container for Sliding Transition Prep */}
      <div className="w-full max-w-[440px] z-10 transition-all duration-500 transform">
        <div className="mb-10 text-center md:text-left">
          {isLogin && <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">Secure Access</span>}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">{title}</h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            {subtitle}
          </p>
        </div>
        
        <div className="bg-card rounded-xl border border-border/20 shadow-2xl p-8 md:p-10">
          {children}
        </div>
        
        {isLogin ? (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-muted/40 rounded-full border border-border/10">
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(189,194,255,0.6)] animate-pulse"></div>
              <span className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">End-to-End Cryptographic Verification Active</span>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center px-4">
            <p className="text-[10px] text-muted-foreground/60 leading-relaxed uppercase tracking-widest">
               By continuing, you agree to the Institutional Terms of Verification. Records are immutable once committed to the Provenancy ledger.
            </p>
          </div>
        )}
        
        {/* Footer Meta */}
        <div className="mt-8 text-center md:hidden">
          <p className="text-[10px] text-muted-foreground/40 font-medium uppercase tracking-widest">
            © 2024 Provenancy Institutional Systems
          </p>
        </div>
      </div>

      {/* Decorative Archival Element (Login) */}
      {isLogin && (
        <div className="hidden lg:block absolute right-12 bottom-12 opacity-[0.03] pointer-events-none">
          <div className="text-[120px] font-bold leading-none select-none tracking-tighter">RECORD</div>
        </div>
      )}
    </div>
  )
}
