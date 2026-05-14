import { useState, useEffect, useMemo } from 'react'
import { Building2, ChevronLeft, ChevronRight, Plus, Activity, Search, Loader2, AlertTriangle, FileText, Clock, CheckCircle2, XCircle, PenLine, Fingerprint, Calendar, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StudentLayout from '../components/workspace/StudentLayout'
import { PageContainer, StatusBadge, EmptyState } from '../components/workspace/SharedPrimitives'
import { useEngagements } from '../hooks/useStudentData'
import { toast } from 'react-hot-toast'

const STATUS_COLORS = {
  pending: {
    border:    'border-amber-500/20 hover:border-amber-500/50',
    accent:    'bg-amber-500',
    glow:      'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
    cardGlow:  'bg-amber-500/5 group-hover:bg-amber-500/10',
    icon:      'group-hover:text-amber-500',
    iconBorder:'group-hover:border-amber-500/30',
    link:      'text-amber-500',
    badge:     'text-amber-500 bg-amber-500/10 border-amber-500/20',
    tabActive: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
    dot:       'bg-amber-500',
    countBadge:'bg-amber-500/20 text-amber-500',
  },
  verified: {
    border:    'border-emerald-500/20 hover:border-emerald-500/50',
    accent:    'bg-emerald-500',
    glow:      'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
    cardGlow:  'bg-emerald-500/5 group-hover:bg-emerald-500/10',
    icon:      'group-hover:text-emerald-500',
    iconBorder:'group-hover:border-emerald-500/30',
    link:      'text-emerald-500',
    badge:     'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    tabActive: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
    dot:       'bg-emerald-500',
    countBadge:'bg-emerald-500/20 text-emerald-500',
  },
  rejected: {
    border:    'border-destructive/20 hover:border-destructive/50',
    accent:    'bg-destructive',
    glow:      'shadow-[0_0_20px_hsl(var(--destructive)/0.4)]',
    cardGlow:  'bg-destructive/5 group-hover:bg-destructive/10',
    icon:      'group-hover:text-destructive',
    iconBorder:'group-hover:border-destructive/30',
    link:      'text-destructive',
    badge:     'text-destructive bg-destructive/10 border-destructive/20',
    tabActive: 'bg-destructive/10 border-destructive/30 text-destructive',
    dot:       'bg-destructive',
    countBadge:'bg-destructive/20 text-destructive',
  },
  edit_requested: {
    border:    'border-orange-500/20 hover:border-orange-500/50',
    accent:    'bg-orange-500',
    glow:      'shadow-[0_0_20px_rgba(249,115,22,0.4)]',
    cardGlow:  'bg-orange-500/5 group-hover:bg-orange-500/10',
    icon:      'group-hover:text-orange-500',
    iconBorder:'group-hover:border-orange-500/30',
    link:      'text-orange-500',
    badge:     'text-orange-500 bg-orange-500/10 border-orange-500/20',
    tabActive: 'bg-orange-500/10 border-orange-500/30 text-orange-500',
    dot:       'bg-orange-500',
    countBadge:'bg-orange-500/20 text-orange-500',
  },
  draft: {
    border:    'border-border/20 hover:border-border/40',
    accent:    'bg-muted-foreground',
    glow:      '',
    cardGlow:  'bg-muted/5 group-hover:bg-muted/10',
    icon:      'group-hover:text-foreground',
    iconBorder:'group-hover:border-border/40',
    link:      'text-muted-foreground',
    badge:     'text-muted-foreground bg-muted/10 border-border/30',
    tabActive: 'bg-muted/10 border-border/30 text-muted-foreground',
    dot:       'bg-muted-foreground',
    countBadge:'bg-muted/20 text-muted-foreground',
  },
  all: {
    border:    'border-border/20 hover:border-border/40',
    accent:    'bg-primary',
    glow:      '',
    cardGlow:  'bg-primary/5 group-hover:bg-primary/10',
    icon:      'group-hover:text-primary',
    iconBorder:'group-hover:border-primary/30',
    link:      'text-primary',
    badge:     'text-primary bg-primary/10 border-primary/20',
    tabActive: 'bg-primary/10 border-primary/30 text-primary',
    dot:       'bg-primary',
    countBadge:'bg-primary/20 text-primary',
  },
}

const STATUS_FILTERS = [
  { label: 'All Nodes', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Pending', value: 'pending' },
  { label: 'Verified', value: 'verified' },
  { label: 'Edit Req.', value: 'edit_requested' },
  { label: 'Rejected', value: 'rejected' },
]

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDuration(start, end) {
  if (!start) return '—'
  const s = new Date(start)
  const e = end ? new Date(end) : null
  if (!e) return `${formatDate(start)} — Present`
  const months = Math.round((e - s) / (1000 * 60 * 60 * 24 * 30))
  if (months < 1) return '< 1 month'
  if (months === 1) return '1 month'
  return `${months} months`
}

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-border/20 rounded-lg ${className}`} aria-hidden />
}

function EngagementCard({ req, navigate }) {
  const c = STATUS_COLORS[req.status] || STATUS_COLORS.draft

  return (
    <div
      onClick={() => navigate(`/student/engagements/${req.id}`)}
      className={`group cursor-pointer bg-card/20 backdrop-blur-md p-8 border ${c.border} transition-all duration-300 rounded-4xl shadow-sm relative overflow-hidden`}
    >
      {/* Left accent bar */}
      <div className={`absolute inset-y-0 left-0 w-1 ${c.accent} opacity-0 group-hover:opacity-60 ${c.glow} transition-all duration-300`} />
      {/* Corner glow */}
      <div className={`absolute top-0 right-0 w-48 h-48 ${c.cardGlow} rounded-full blur-2xl transition-colors pointer-events-none`} />

      {/* Top row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10 border-b border-border/10 pb-6">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl bg-background border border-border/20 flex items-center justify-center shrink-0 ${c.iconBorder} transition-colors`}>
            <Building2 className={`w-5 h-5 text-muted-foreground ${c.icon} transition-colors`} />
          </div>
          <div>
            <h3 className={`text-xl font-light tracking-tight text-foreground mb-0.5 ${c.icon} transition-colors`}>
              {req.organization_name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-[9px] uppercase font-mono tracking-widest bg-background px-2 py-0.5 rounded border border-border/40">
                {req.role}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <StatusBadge status={req.status} />
          <span className="text-[9px] text-muted-foreground font-mono tracking-widest opacity-50">
            {req.id.slice(0, 8).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bottom row: metadata */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="space-y-1.5">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center gap-1.5">
             Status Note
          </p>
          <p className="text-sm font-medium text-foreground truncate">
            {req.status === 'verified' && req.verified_at ? `Verified ${formatDate(req.verified_at)}` : 
             req.status === 'pending' ? 'Awaiting Review' : 
             req.status === 'edit_requested' ? 'Changes Needed' : 
             req.status === 'rejected' ? 'Rejected' : 'Not Submitted'}
          </p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center gap-1.5">
            <Calendar className="w-3 h-3" /> Duration
          </p>
          <p className="text-sm font-medium text-foreground">{formatDuration(req.start_date, req.end_date)}</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Start Date</p>
          <p className="text-sm font-medium text-foreground">{formatDate(req.start_date)}</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Completion</p>
          <p className="text-sm font-medium text-foreground">{req.end_date ? 'Completed' : 'Ongoing'}</p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-border/10 flex justify-end">
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${c.link} flex items-center gap-2 group-hover:translate-x-1 transition-transform`}>
          Review Ledger Node <ChevronRightIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  )
}

export default function StudentEngagements() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  // OPTIMIZATION: Use cached hook - data is fetched once, shared across pages
  const { data: allEngagements = [], isLoading: loading, error, refetch } = useEngagements()

  // OPTIMIZATION: Compute counts from cached data (no extra API calls)
  const counts = useMemo(() => {
    const c = { all: allEngagements.length }
    for (const e of allEngagements) {
      c[e.status] = (c[e.status] || 0) + 1
    }
    return c
  }, [allEngagements])

  // OPTIMIZATION: Filter locally - instant tab switching
  const engagements = useMemo(() => {
    if (activeFilter === 'all') return allEngagements
    return allEngagements.filter(e => e.status === activeFilter)
  }, [allEngagements, activeFilter])

  // OPTIMIZED: Search filter with useMemo
  const filtered = useMemo(() => {
    if (!search.trim()) return engagements
    const q = search.toLowerCase()
    return engagements.filter(e =>
      e.organization_name?.toLowerCase().includes(q) ||
      e.role?.toLowerCase().includes(q)
    )
  }, [engagements, search])

  // Local pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, search])

  // Pagination metrics
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <StudentLayout>
        
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <PageContainer className="relative z-10 pt-10">
        
        {/*  HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-border/20 pb-8 relative">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit mb-4">
               <Activity className="w-3 h-3 text-accent" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Active Protocol</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Institutional Records</h1>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              A complete, verified ledger of your professional contributions and academic engagements.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full lg:w-auto">
            {/* Search */}
            <div className="relative group w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search orgs or roles…"
                className="w-full bg-background/50 border border-border/50 rounded-xl pl-11 pr-4 py-3 text-[11px] tracking-wider text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <button 
              onClick={() => navigate('/student/engagements/create')}
              className="flex items-center justify-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-background bg-foreground rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              Initialize Node
            </button>
          </div>
        </div>

        {/* Two-column layout identical to Supervisor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main List Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Toolbar: Tabs & Pagination */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                {STATUS_FILTERS.map(tab => {
                  const isActive = activeFilter === tab.value
                  const tc = STATUS_COLORS[tab.value] || STATUS_COLORS.all
                  return (
                    <button
                      key={tab.value}
                      onClick={() => setActiveFilter(tab.value)}
                      className={`relative px-5 py-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                        isActive
                          ? tc.tabActive
                          : 'bg-card/20 border-border/30 text-muted-foreground hover:bg-card/40 hover:text-foreground hover:border-border/50'
                      }`}
                    >
                      {isActive && <div className={`w-1.5 h-1.5 ${tc.dot || 'bg-current'} rounded-full animate-pulse`} />}
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{tab.label}</span>
                      <span className={`ml-1 px-2 py-0.5 rounded text-[9px] font-mono ${
                        isActive ? (tc.countBadge || 'bg-current/20 text-current') : 'bg-background border border-border/30 text-muted-foreground'
                      }`}>
                        {counts[tab.value] ?? '—'}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Top Pagination */}
              <div className="flex items-center justify-between xl:justify-end gap-3 shrink-0 bg-card/40 border border-border/40 px-2 py-1.5 rounded-xl backdrop-blur-md shadow-sm">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/80 px-3">
                  Page <span className="font-bold text-foreground mx-0.5">{currentPage}</span> of {totalPages}
                </span>
                <div className="flex gap-1 border-l border-border/30 pl-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background hover:text-foreground transition-colors text-muted-foreground disabled:opacity-30 disabled:hover:bg-transparent bg-background/50 border border-transparent hover:border-border/50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background hover:text-foreground transition-colors text-muted-foreground disabled:opacity-30 disabled:hover:bg-transparent bg-background/50 border border-transparent hover:border-border/50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <>
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-card/20 p-8 rounded-4xl border border-border/20 space-y-6">
                    <div className="flex items-center gap-4 pb-6 border-b border-border/10">
                      <Skeleton className="w-11 h-11 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-56" />
                      </div>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                      {[1,2,3,4].map(j => (
                        <div key={j} className="space-y-1.5">
                          <Skeleton className="h-2.5 w-16" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <AlertTriangle className="w-8 h-8 text-destructive/50" />
                <p className="text-sm text-muted-foreground">{error?.message ?? 'Failed to load engagements'}</p>
                <button onClick={() => refetch()} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Retry</button>
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={Building2}
                title="No Records Found"
                description={activeFilter === 'all' ? "You haven't created any engagement records yet. Initialize your first node to get started." : `No engagements with status "${activeFilter}" found.`}
                actionText={activeFilter === 'all' ? "Initialize Node" : undefined}
                onAction={activeFilter === 'all' ? () => navigate('/student/engagements/create') : undefined}
              />
            ) : (
              // Cards layout matches supervisor requests
              paginatedItems.map((req) => (
                <EngagementCard
                  key={req.id}
                  req={req}
                  navigate={navigate}
                />
              ))
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="p-4 bg-muted/5 flex items-center justify-between border-t border-border/10 mt-8 rounded-2xl">
                <div className="flex items-center gap-2 pl-2">
                   <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                   <p className="text-[9px] font-mono text-accent uppercase tracking-[0.2em] opacity-80">End of Validated Ledger</p>
                </div>
              </div>
            )}
            
          </div>

          {/* Sidebar Area - Mirrors Supervisor UI side metrics */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 h-max">
            <div className="bg-card/20 backdrop-blur-xl p-8 border border-border/30 rounded-3xl relative overflow-hidden shadow-sm space-y-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 border-b border-border/20 pb-6 relative z-10">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Ledger Metrics</span>
              </div>

              {/* METRICS */}
              <div className="space-y-6">
                <div className="group border-b border-border/10 pb-6">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 block">Total Records</span>
                  <div className="flex items-end gap-3 relative z-10">
                    <span className="text-4xl font-light tracking-tighter text-foreground group-hover:text-primary transition-colors">{counts['all'] ?? '—'}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1.5">Nodes</span>
                  </div>
                </div>
                <div className="group border-b border-border/10 pb-6">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 block">Awaiting Verification</span>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-light tracking-tighter text-foreground group-hover:text-amber-500 transition-colors">{counts['pending'] ?? '—'}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-500/80 tracking-widest mb-1.5">Pending</span>
                  </div>
                </div>
                <div className="group">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 block">Verified Entries</span>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-light tracking-tighter text-foreground group-hover:text-emerald-500 transition-colors">{counts['verified'] ?? '—'}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-500/80 tracking-widest mb-1.5">Verified</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 px-4">
               <p className="text-[9px] text-muted-foreground font-mono leading-relaxed uppercase tracking-[0.15em] text-center">
                 Your engagements are cryptographically sealed upon oracle verification.
               </p>
            </div>
          </div>

        </div>

      </PageContainer>
    </StudentLayout>
  )
}
