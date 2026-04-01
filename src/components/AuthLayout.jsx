import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, Network, Shield } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle, isLogin = false }) {
  return (
    <div className="flex h-[calc(100vh-5rem)] bg-background relative overflow-hidden">
      
      {/* 
        ========================================
        LEFT PANE: Premium Institutional Visual
        ========================================
      */}
      <div className="hidden lg:flex w-1/2 relative bg-muted/20 border-r border-border/10 flex-col justify-between p-12 overflow-hidden shadow-[inset_-20px_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Background Grids & Glows */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 border border-border/30 rounded-xl flex items-center justify-center hover:bg-card hover:border-primary/40 transition-colors bg-background/50 backdrop-blur-md group">
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Return to Network</span>
        </div>

        <div className="relative z-10 max-w-lg mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold tracking-widest uppercase text-accent mb-6 shadow-sm">
            <Shield className="w-3 h-3" /> System Access
          </div>
          <h2 className="text-4xl xl:text-5xl font-light text-foreground mb-6 leading-tight tracking-tight">
            The immutable <br/><span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-accent to-primary">professional record.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Enter the globally verified ledger network. We transform informal work experience into permanent, cryptographically backed institutional assets.
          </p>
          
          {/* Data Visualization Mockup */}
          <div className="mt-12 bg-card/40 border border-border/20 p-6 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/10 relative z-10">
               <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Network className="w-4 h-4"/> Live Node Status</span>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                 <span className="text-[10px] font-mono text-accent">SECURE</span>
               </div>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center bg-background/50 p-3 rounded border border-border/10">
                 <span className="text-[10px] font-mono text-muted-foreground">LATEST_HASH</span>
                 <span className="text-[10px] font-mono text-foreground">0x7F...3B9A</span>
              </div>
              <div className="flex justify-between items-center bg-background/50 p-3 rounded border border-border/10">
                 <span className="text-[10px] font-mono text-muted-foreground">ACTIVE_SUPERVISORS</span>
                 <span className="text-[10px] font-mono text-foreground bg-primary/20 text-primary px-2 rounded-sm border border-primary/20">3,402</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 opacity-60">
           <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground border-r border-border/50 pr-6">Data Encrypted</span>
           <span className="text-[10px] font-mono text-muted-foreground">RSA-4096 / SHA-256</span>
        </div>
      </div>

      {/* 
        ========================================
        RIGHT PANE: Authentication Form
        ========================================
      */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative overflow-y-auto">
        {/* Mobile returning link */}
        <Link to="/" className="lg:hidden absolute top-6 left-6 w-10 h-10 border border-border/30 rounded-xl flex items-center justify-center bg-card shadow-sm z-20">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </Link>
        
        <div className="w-full max-w-[440px] z-10 relative">
          
          <div className="mb-10 lg:mb-12">
            <h1 className="text-4xl font-light text-foreground tracking-tight mb-3">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {subtitle}
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] p-8 sm:p-10 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
            {children}
          </div>
          
          {isLogin ? (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-3 px-4 py-2 bg-muted/30 rounded-full border border-border/10">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(189,194,255,0.6)] animate-pulse"></div>
                <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase text-center w-full">End-to-End Encryption Active</span>
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center px-4">
              <p className="text-[10px] text-muted-foreground/50 leading-relaxed uppercase tracking-widest font-medium">
                 By continuing, you adhere to the Institutional Terms of Attestation. All signed records are immutable.
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}
