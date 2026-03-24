import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SupervisorDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  const pendingRequests = [
    {
      id: 1,
      name: 'Alex Carter',
      institution: 'Stanford University',
      role: 'Graduate Research Assistant',
      duration: '6 months',
      icon: '🏫',
    },
    {
      id: 2,
      name: 'Elena Rodriguez',
      institution: 'CERN Collaborations',
      role: 'PhD Candidate',
      duration: '12 months',
      icon: '🔬',
    },
  ]

  const activityFeed = [
    {
      id: 1,
      action: 'Verified',
      subject: 'Alex Carter',
      detail: 'for Software Intern',
      hash: '0x82f...91a',
      time: '4h ago',
      type: 'success',
    },
    {
      id: 2,
      action: 'Rejected 1 request for',
      detail: 'Lab Assistant',
      hash: 'NON-COMPLIANT ROLE',
      time: '8h ago',
      type: 'error',
    },
    {
      id: 3,
      action: 'Daily ledger',
      detail: 'reconciliation complete.',
      hash: 'STATUS: SYNCED',
      time: '12h ago',
      type: 'info',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border/20 bg-background/95 backdrop-blur z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <span className="font-semibold tracking-tight text-xl text-primary">Provenancy</span>
          <div className="h-4 w-px bg-border/30"></div>
          <span className="text-muted-foreground text-sm font-medium tracking-wide">Supervisor Workspace</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            🔔
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <div className="font-medium text-foreground">PROV-SUP-8821</div>
              <div className="text-primary/70 text-[11px]">Verified Admin</div>
            </div>
            <button
              onClick={logout}
              className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-xs font-bold text-primary-foreground"
            >
              👤
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border/20 flex flex-col pt-8 z-40">
        <div className="px-6 mb-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold">Ledger Controls</p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
              activeTab === 'dashboard'
                ? 'bg-primary/10 border-l-2 border-primary text-primary'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
              activeTab === 'requests'
                ? 'bg-primary/10 border-l-2 border-primary text-primary'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            }`}
          >
            🤝 Engagement Requests
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
              activeTab === 'profile'
                ? 'bg-primary/10 border-l-2 border-primary text-primary'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            }`}
          >
            👤 Profile
          </button>
        </nav>
        <div className="p-6 mt-auto border-t border-border/20">
          <div className="bg-secondary/20 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">System Integrity</span>
            </div>
            <p className="text-[11px] text-muted-foreground/70">Last block validated 2m ago. Node status: Stable.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen pb-12">
        <div className="p-12 max-w-6xl">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Registry Overview</h1>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Institutional ledger management for verified student engagements and professional milestones. Validating the integrity of the professional record.
            </p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {/* Pending - Highlight */}
            <div className="md:col-span-2 bg-card border border-border/20 rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl">🛡️</div>
              <p className="text-muted-foreground text-sm font-medium tracking-wide mb-8">Pending Verification Requests</p>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-bold text-primary tracking-tight">12</span>
                <div className="flex items-center gap-1 text-primary/70 bg-primary/10 px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                  ⚠️ Action Required
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <div className="h-1 w-24 bg-border/20 rounded-full"></div>
              </div>
            </div>

            {/* Approved */}
            <div className="bg-card border border-border/20 rounded-lg p-8">
              <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase mb-12 opacity-60">Approved Engagements</p>
              <span className="text-4xl font-semibold text-foreground">485</span>
              <p className="text-[11px] text-muted-foreground mt-2">+3 since yesterday</p>
            </div>

            {/* Rejected */}
            <div className="bg-card border border-border/20 rounded-lg p-8">
              <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase mb-12 opacity-60">Rejected Engagements</p>
              <span className="text-4xl font-semibold text-muted-foreground">14</span>
              <p className="text-[11px] text-muted-foreground/50 mt-2">2.8% rejection rate</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Requests List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold">Pending Engagement Requests</h2>
                <button className="text-xs font-semibold text-primary/70 hover:text-primary uppercase tracking-widest">
                  Export Ledger
                </button>
              </div>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="group flex items-center justify-between p-6 bg-card border border-border/20 hover:border-primary/30 rounded-lg transition-all"
                  >
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 rounded bg-secondary/20 flex items-center justify-center border border-border/20 text-xl">
                        {request.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{request.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.institution} • {request.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-8">
                      <div className="hidden md:block">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Duration</p>
                        <p className="text-sm font-medium">{request.duration}</p>
                      </div>
                      <button className="px-6 py-2 bg-primary/10 text-primary text-xs font-bold rounded-md hover:bg-primary hover:text-primary-foreground transition-all">
                        Review Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-card border border-border/20 rounded-lg p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-8">Activity Feed</h3>
              <div className="relative space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border/20">
                {activityFeed.map((item) => (
                  <div key={item.id} className="relative pl-10">
                    <div
                      className={`absolute left-0 top-1 w-6 h-6 rounded-full border flex items-center justify-center z-10 ${
                        item.type === 'success'
                          ? 'bg-primary/20 border-primary'
                          : item.type === 'error'
                          ? 'bg-red-500/20 border-red-500'
                          : 'bg-secondary/20 border-border'
                      }`}
                    >
                      {item.type === 'success' ? '✓' : item.type === 'error' ? '✕' : '🔄'}
                    </div>
                    <p className="text-sm font-medium leading-relaxed">
                      <span className="text-muted-foreground">{item.action}</span> {item.subject && <span className="text-foreground">{item.subject}</span>}{' '}
                      <span className="text-muted-foreground">{item.detail}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1 font-mono">
                      {item.hash} • {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card px-12 py-8 ml-64 flex justify-between items-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        <div>V 2.4.0-STABLE</div>
        <p className="text-[10px] text-muted-foreground/40">© 2024 Provenancy Systems. Institutional Immutable Ledger Protocol.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Audit Logs
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            System Support
          </a>
        </div>
      </footer>
    </div>
  )
}
