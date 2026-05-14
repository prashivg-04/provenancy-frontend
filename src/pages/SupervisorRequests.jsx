import { useState, useEffect, useMemo } from 'react'
import { ChevronRight, ChevronLeft, ShieldCheck, Activity, Search, AlertCircle, Fingerprint, Calendar, Building2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { PageContainer, StatusBadge, EmptyState } from '../components/workspace/SharedPrimitives'
import { useSupervisorEngagements, useStudentPublic } from '../hooks/useSupervisorData'

// ─── Static config ─────────────────────────────────────────────────────────────

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

const TABS = [
  { key: 'all',           label: 'All'           },
  { key: 'pending',       label: 'Pending'        },
  { key: 'verified',      label: 'Verified'       },
  { key: 'edit_requested',label: 'Edit Requested' },
  { key: 'rejected',      label: 'Rejected'       },
]

// ─── Utility helpers ───────────────────────────────────────────────────────────

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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

// ─── Request Card — resolves student independently via React Query ──────────────

function RequestCard({ req }) {
  const navigate = useNavigate()
  const c = STATUS_COLORS[req.status] || STATUS_COLORS.draft
  // OPTIMIZATION: Each card resolves its own student — cached by student_profile_id
  // No getEngagement() call needed — student_profile_id already comes from the list endpoint
  const { data: studentInfo } = useStudentPublic(req.student_profile_id)

  return (
    <div
      onClick={() => navigate(`/supervisor/engagements/${req.id}`)}
      className={`group cursor-pointer bg-card/20 backdrop-blur-md p-8 border ${c.border} transition-all duration-300 rounded-4xl shadow-sm relative overflow-hidden`}
    >
      {/* Left accent bar */}
      <div className={`absolute inset-y-0 left-0 w-1 ${c.accent} opacity-0 group-hover:opacity-60 ${c.glow} transition-all duration-300`} />
      {/* Corner glow */}
      <div className={`absolute top-0 right-0 w-48 h-48 ${c.cardGlow} rounded-full blur-2xl transition-colors pointer-events-none`} />

      {/* Top row: student + status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10 border-b border-border/10 pb-6">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl bg-background border border-border/20 flex items-center justify-center shrink-0 ${c.iconBorder} transition-colors`}>
            <Fingerprint className={`w-5 h-5 text-muted-foreground ${c.icon} transition-colors`} />
          </div>
          <div>
            {studentInfo ? (
              <>
                <h3 className={`text-xl font-light tracking-tight text-foreground mb-0.5 ${c.icon} transition-colors`}>
                  {studentInfo.full_name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[9px] uppercase font-mono tracking-widest bg-background px-2 py-0.5 rounded border border-border/40">
                    {studentInfo.ledger_id}
                  </span>
                  {studentInfo.institution && (
                    <>
                      <span className="w-1 h-1 bg-border rounded-full" />
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{studentInfo.institution}</span>
                    </>
                  )}
                </div>
              </>
            ) : (
              // No student_profile_id on this engagement — show placeholder while resolving
              <div className="space-y-1">
                {req.student_profile_id
                  ? <><Skeleton className="h-5 w-36" /><Skeleton className="h-3 w-48" /></>
                  : <p className="text-sm text-muted-foreground font-mono">{req.id.slice(0, 12).toUpperCase()}</p>
                }
              </div>
            )}
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
            <Building2 className="w-3 h-3" /> Organisation
          </p>
          <p className="text-sm font-medium text-foreground truncate">{req.organization_name}</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Claimed Role</p>
          <p className="text-sm font-medium text-foreground truncate">{req.role}</p>
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
      </div>

      <div className="mt-6 pt-5 border-t border-border/10 flex justify-end">
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${c.link} flex items-center gap-2 group-hover:translate-x-1 transition-transform`}>
          Review Engagement <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SupervisorRequests() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // OPTIMIZATION: Shared React Query cache — zero API call if Dashboard was visited first
  const { data: allEngagements = [], isLoading, isError, refetch } = useSupervisorEngagements()

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Reset page on tab or search change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, debouncedSearch])

  // OPTIMIZATION: Derive counts locally — no API calls
  const counts = useMemo(() => {
    const c = { all: allEngagements.length }
    for (const e of allEngagements) {
      c[e.status] = (c[e.status] || 0) + 1
    }
    return c
  }, [allEngagements])

  // OPTIMIZATION: Filter by tab locally
  const tabFiltered = useMemo(() => {
    if (activeTab === 'all') return allEngagements
    return allEngagements.filter(e => e.status === activeTab)
  }, [allEngagements, activeTab])

  // OPTIMIZATION: Search filter runs locally on cached data
  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return tabFiltered
    const q = debouncedSearch.toLowerCase()
    return tabFiltered.filter(e =>
      e.organization_name?.toLowerCase().includes(q) ||
      e.role?.toLowerCase().includes(q)
      // Note: student name search would require the student cache to be populated.
      // For now, org + role search covers the vast majority of use cases without
      // creating a dependency on studentMap state.
    )
  }, [tabFiltered, debouncedSearch])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <SupervisorLayout>
      <div className="relative min-h-screen">

        {/* Ambient glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute top-[40%] -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <PageContainer className="relative z-10 pt-10">

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border/20 pb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full">
                    <div className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--destructive))]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-destructive">Verification Authority</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Engagement Validation</h1>
                <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                  Review and cryptographically verify student work history records. Each action is permanently logged to the institutional ledger.
                </p>
              </div>

              {/* Search */}
              <div className="w-full lg:w-72 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search by org or role…"
                  className="w-full bg-background/50 border border-border/50 rounded-xl pl-11 pr-4 py-3.5 text-[11px] tracking-wider text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>
          </header>

          {/* Toolbar: Tabs & Pagination */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {TABS.map(tab => {
                const isActive = activeTab === tab.key
                const tc = STATUS_COLORS[tab.key] || STATUS_COLORS.all
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
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
                      {counts[tab.key] ?? '—'}
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

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Main list */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {isLoading ? (
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
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-6 h-6 text-destructive mb-3" />
                  <p className="text-sm text-destructive font-medium mb-3">Failed to load engagements</p>
                  <button
                    onClick={() => refetch()}
                    className="text-[10px] text-primary hover:text-primary/80 font-bold uppercase tracking-widest"
                  >
                    Try again
                  </button>
                </div>
              ) : filtered.length > 0 ? (
                paginatedItems.map(req => (
                  <RequestCard key={req.id} req={req} />
                ))
              ) : (
                <EmptyState
                  icon={ShieldCheck}
                  title={debouncedSearch ? 'No matches found' : `No ${activeTab === 'all' ? '' : activeTab} engagements`}
                  description={
                    debouncedSearch
                      ? 'Try a different search term.'
                      : 'The verification queue is clear for this category.'
                  }
                  actionText="View All"
                  onAction={() => { setSearchInput(''); setActiveTab('all') }}
                />
              )}
            </div>

            {/* Sidebar — queue metrics */}
            <div className="hidden lg:block lg:col-span-4 sticky top-24 h-max">
              <div className="bg-card/20 backdrop-blur-xl p-8 border border-border/30 rounded-3xl relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 border-b border-border/20 pb-6 mb-8 relative z-10">
                  <Activity className="w-4 h-4 text-primary" />
                  <h4 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Queue Metrics</h4>
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="flex items-end gap-3">
                    <span className="text-7xl font-light tracking-tighter text-foreground leading-none">
                      {(counts[activeTab] ?? 0).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-muted-foreground mb-2 font-bold uppercase tracking-[0.2em]">
                      {TABS.find(t => t.key === activeTab)?.label} Records
                    </span>
                  </div>

                  <div className="space-y-3">
                    {TABS.filter(t => t.key !== 'all').map(tab => (
                      <div key={tab.key} className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{tab.label}</span>
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${(STATUS_COLORS[tab.key] || STATUS_COLORS.draft).badge}`}>
                          {counts[tab.key] ?? 0}
                        </span>
                      </div>
                    ))}
                  </div>

                  {(counts['pending'] ?? 0) > 0 && (
                    <div className="bg-primary/5 p-5 border border-primary/20 rounded-2xl flex gap-3 items-start">
                      <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider font-medium">
                        {counts['pending']} engagement{counts['pending'] > 1 ? 's' : ''} awaiting your cryptographic signature.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </PageContainer>
      </div>
    </SupervisorLayout>
  )
}
