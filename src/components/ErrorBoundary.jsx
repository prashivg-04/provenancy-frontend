import React from 'react'
import { Fingerprint, RefreshCw, Home } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Could log to a monitoring service here
    console.error('[ErrorBoundary]', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center relative overflow-hidden">

        {/* Ambient glows */}
        <div className="absolute top-[-15%] left-[-10%] w-[40%] h-[40%] bg-destructive/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <Fingerprint className="w-7 h-7 text-destructive/70" strokeWidth={1.5} />
          </div>

          {/* Label */}
          <p className="text-[10px] font-bold text-destructive/80 uppercase tracking-[0.35em] mb-4">
            Runtime Error
          </p>
          <h1 className="text-3xl font-black text-foreground leading-tight tracking-tight mb-4">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            An unexpected error occurred in the application.
          </p>

          {/* Error detail (dev hint) */}
          {this.state.error?.message && (
            <p className="text-[10px] font-mono text-muted-foreground/50 bg-card/40 border border-border/20 rounded-lg px-4 py-2 mb-8 break-all">
              {this.state.error.message}
            </p>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-border/20 mb-8" />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card/60 border border-border/30 text-foreground text-[12px] font-bold uppercase tracking-widest hover:bg-card hover:border-border/60 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" strokeWidth={2.5} />
              Try Again
            </button>
            <a
              href="/"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary/10 border border-primary/25 text-primary text-[12px] font-bold uppercase tracking-widest hover:bg-primary/20 hover:border-primary/40 transition-all"
            >
              <Home className="w-3.5 h-3.5" strokeWidth={2.5} />
              Go Home
            </a>
          </div>

        </div>
      </div>
    )
  }
}
