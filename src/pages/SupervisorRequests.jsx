import { useState, useEffect } from 'react'
import { ChevronRight, ShieldCheck, Activity, Search, AlertCircle, Fingerprint, Loader2, Calendar, Building2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { PageContainer, StatusBadge, EmptyState } from '../components/workspace/SharedPrimitives'
import { getSupervisorEngagements, getEngagement, getStudentPublic } from '../lib/api'
import { handleError } from '../lib/handleError'

// Single source of truth for all per-status colors
// Matches StatusBadge exactly: pending=amber, verified=primary, rejected=destructive, edit_requested=orange
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
  { key: 'all',           label: 'All'          },
  { key: 'pending',       label: 'Pending'       },
  { key: 'verified',      label: 'Verified'      },
  { key: 'edit_requested',label: 'Edit Requested'},
  { key: 'rejected',      label: 'Rejected'      },
]

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

// Skeleton shimmer
function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-border/20 rounded-lg ${className}`} aria-hidden />
}

// Enriched request card — uses STATUS_COLORS for full visual consistency
function RequestCard({ req, studentInfo, navigate }) {
  const c = STATUS_COLORS[req.status] || STATUS_COLORS.draft

  return (
    <div
      onClick={() => navigate(`/supervisor/engagements/${req.id}`)}
      className={`group cursor-pointer bg-card/20 backdrop-blur-md p-8 border ${c.border} transition-all duration-300 rounded-4xl shadow-sm relative overflow-hidden`}
    >
      {/* Left accent bar — color matches status */}
      <div className={`absolute inset-y-0 left-0 w-1 ${c.accent} opacity-0 group-hover:opacity-60 ${c.glow} transition-all duration-300`} />
      {/* Corner glow — color matches status */}
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
              <div className="space-y-1">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-48" />
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

export default function SupervisorRequests() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [engagements, setEngagements] = useState([])
  const [counts, setCounts] = useState({})     // { all: n, pending: n, ... }
  const [studentMap, setStudentMap] = useState({}) // { engagement_id: { full_name, ledger_id, institution } }
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // Fetch engagements for the active tab
  const loadEngagements = async (tab) => {
    setLoading(true)
    try {
      const res = await getSupervisorEngagements(tab)
      const data = res.data || []
      setEngagements(data)

      // Build per-status counts from whatever we loaded
      if (tab === 'all') {
        const c = { all: data.length }
        for (const e of data) {
          c[e.status] = (c[e.status] || 0) + 1
        }
        setCounts(c)
      }

      // EngagementListResponse has no student_profile_id —
      // fetch full engagement for each item to get it, then batch-fetch student profiles
      if (data.length > 0) {
        // 1. Get full details for all engagements in parallel
        const fullResults = await Promise.allSettled(data.map(e => getEngagement(e.id)))

        // 2. Build engagementId -> student_profile_id map, deduplicate student ids
        const engToStudentId = {}
        const uniqueStudentIds = new Set()
        fullResults.forEach((r, i) => {
          if (r.status === 'fulfilled') {
            const sid = r.value.data.student_profile_id
            if (sid) {
              engToStudentId[data[i].id] = sid
              uniqueStudentIds.add(sid)
            }
          }
        })

        // 3. Fetch student public profile for each unique student id
        const studentIds = [...uniqueStudentIds]
        const studentResults = await Promise.allSettled(studentIds.map(id => getStudentPublic(id)))

        // 4. Build studentId -> info lookup
        const studentById = {}
        studentResults.forEach((r, i) => {
          if (r.status === 'fulfilled') {
            const p = r.value.data
            studentById[studentIds[i]] = {
              full_name: p.full_name,
              ledger_id: p.ledger_id,
              institution: p.institution,
            }
          }
        })

        // 5. Build engagementId -> studentInfo and merge into state
        const updates = {}
        for (const [engId, stuId] of Object.entries(engToStudentId)) {
          if (studentById[stuId]) {
            updates[engId] = studentById[stuId]
          }
        }
        if (Object.keys(updates).length > 0) {
          setStudentMap(prev => ({ ...prev, ...updates }))
        }
      }
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  // Load when tab changes
  useEffect(() => {
    loadEngagements(activeTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // Load 'all' once on mount to populate counts
  useEffect(() => {
    getSupervisorEngagements('all').then(res => {
      const data = res.data || []
      const c = { all: data.length }
      for (const e of data) {
        c[e.status] = (c[e.status] || 0) + 1
      }
      setCounts(c)
    }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Client-side search filter (by org name, role, or student name / ledger_id)
  const filtered = search.trim()
    ? engagements.filter(e => {
        const q = search.toLowerCase()
        const s = studentMap[e.id]
        return (
          e.organization_name?.toLowerCase().includes(q) ||
          e.role?.toLowerCase().includes(q) ||
          s?.full_name?.toLowerCase().includes(q) ||
          s?.ledger_id?.toLowerCase().includes(q)
        )
      })
    : engagements

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
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by student, org, role…"
                  className="w-full bg-background/50 border border-border/50 rounded-xl pl-11 pr-4 py-3.5 text-[11px] tracking-wider text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>
          </header>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
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

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Main list */}
            <div className="lg:col-span-8 flex flex-col gap-6">
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
              ) : filtered.length > 0 ? (
                filtered.map(req => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    studentInfo={studentMap[req.id] || null}
                    navigate={navigate}
                  />
                ))
              ) : (
                <EmptyState
                  icon={ShieldCheck}
                  title={search ? 'No matches found' : `No ${activeTab === 'all' ? '' : activeTab} engagements`}
                  description={
                    search
                      ? 'Try a different search term.'
                      : 'The verification queue is clear for this category.'
                  }
                  actionText="View All"
                  onAction={() => { setSearch(''); setActiveTab('all') }}
                />
              )}
            </div>

            {/* Sidebar — real queue metrics */}
            <div className="hidden lg:block lg:col-span-4 sticky top-24 h-max">
              <div className="bg-card/20 backdrop-blur-xl p-8 border border-border/30 rounded-3xl relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 border-b border-border/20 pb-6 mb-8 relative z-10">
                  <Activity className="w-4 h-4 text-primary" />
                  <h4 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Queue Metrics</h4>
                </div>

                <div className="space-y-8 relative z-10">
                  {/* Big number */}
                  <div className="flex items-end gap-3">
                    <span className="text-7xl font-light tracking-tighter text-foreground leading-none">
                      {(counts[activeTab] ?? 0).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-muted-foreground mb-2 font-bold uppercase tracking-[0.2em]">
                      {TABS.find(t => t.key === activeTab)?.label} Records
                    </span>
                  </div>

                  {/* Status breakdown — colors from STATUS_COLORS */}
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

                  {/* Action hint */}
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
