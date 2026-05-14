import { useMemo } from 'react'
import { ShieldCheck, CircleAlert, CheckCircle2, XCircle, Terminal, Network, Search, Activity, Lock, AlertCircle, Fingerprint } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { PageContainer, StatusBadge } from '../components/workspace/SharedPrimitives'
import { useSupervisorProfile, useSupervisorEngagements, useStudentPublic } from '../hooks/useSupervisorData'

// ─── Tiny shared UI components ────────────────────────────────────────────────

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-border/20 rounded-lg ${className}`} aria-hidden="true" />
}

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-4 text-center">
      <AlertCircle className="w-5 h-5 text-destructive mb-2" />
      <p className="text-xs text-destructive font-medium">{message || 'Failed to load'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-[10px] text-primary hover:text-primary/80 font-bold uppercase tracking-widest"
        >
          Try again
        </button>
      )}
    </div>
  )
}

function TrustBadge({ tier }) {
  if (!tier) return null
  const isInstitutional = tier === 'institutional'
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
      isInstitutional ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-muted/20 border-border/30 text-muted-foreground'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current ${isInstitutional ? 'animate-pulse' : ''}`} />
      {tier}
    </span>
  )
}

function formatDuration(start, end) {
  if (!start) return '—'
  const s = new Date(start)
  const e = end ? new Date(end) : null
  if (!e) return 'Ongoing'
  const months = Math.round((e - s) / (1000 * 60 * 60 * 24 * 30))
  if (months < 1) return '< 1 month'
  if (months === 1) return '1 month'
  return `${months} months`
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  return 'Just now'
}

// ─── Queue item card (now a component so each can independently resolve student) ──

function QueueCard({ req }) {
  const navigate = useNavigate()
  // Each card independently fetches its student — cached by studentProfileId
  const { data: student } = useStudentPublic(req.student_profile_id)

  return (
    <div
      className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-card/10 backdrop-blur-sm hover:bg-card/30 transition-all border border-border/20 rounded-2xl hover:border-amber-500/30 relative overflow-hidden cursor-pointer"
      onClick={() => navigate(`/supervisor/engagements/${req.id}`)}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-amber-500/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl" />
      <div className="flex gap-6 items-center">
        <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border/20 shrink-0 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/15 transition-colors" />
          <Fingerprint className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 transition-colors relative z-10" />
        </div>
        <div>
          {student ? (
            <p className="text-sm font-medium text-foreground mb-1 tracking-tight group-hover:text-amber-500 transition-colors">
              {student.full_name}
            </p>
          ) : (
            <p className="font-medium text-foreground mb-1 tracking-tight group-hover:text-amber-500 transition-colors font-mono text-sm">
              {req.id.slice(0, 12).toUpperCase()}
            </p>
          )}
          <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-2">
            {req.organization_name}{req.role ? ` · ${req.role}` : ''}
          </p>
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-muted-foreground/50" />
            <span className="font-mono text-[9px] text-muted-foreground uppercase">
              {student?.ledger_id || req.id.slice(0, 12).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-0 w-full md:w-auto flex items-center justify-between md:justify-end gap-10">
        <div className="text-left w-full md:w-auto">
          <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-1">Eng. Duration</p>
          <p className="text-sm font-medium text-foreground tracking-tight">
            {formatDuration(req.start_date, req.end_date)}
          </p>
        </div>
        <button className="px-6 py-2.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold rounded-lg hover:bg-amber-500 hover:text-white transition-all uppercase tracking-[0.2em] shrink-0">
          Evaluate
        </button>
      </div>
    </div>
  )
}

// ─── Feed item card ────────────────────────────────────────────────────────────

function FeedItem({ item, isLast }) {
  const navigate = useNavigate()
  const { data: student } = useStudentPublic(item.student_profile_id)
  const isVerified = item.status === 'verified'
  const isRejected = item.status === 'rejected'
  const isEdit = item.status === 'edit_requested'
  const dotBorder = isVerified ? 'border-emerald-500' : isRejected ? 'border-destructive' : isEdit ? 'border-orange-500' : 'border-muted-foreground'
  const dotFill  = isVerified ? 'bg-emerald-500'    : isRejected ? 'bg-destructive'    : isEdit ? 'bg-orange-500'    : 'bg-muted-foreground'
  const dateField = item.verified_at || item.start_date

  return (
    <div
      className="relative group cursor-pointer pl-8"
      onClick={() => navigate(`/supervisor/engagements/${item.id}`)}
    >
      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 flex items-center justify-center z-10 transition-transform group-hover:scale-125 ${dotBorder}`}>
        <div className={`w-1 h-1 rounded-full ${dotFill}`} />
      </div>
      <div className="mb-3">
        <StatusBadge status={item.status} />
      </div>
      <p className="text-sm font-medium leading-relaxed text-foreground tracking-tight group-hover:text-primary transition-colors">
        {student?.full_name
          ? `${student.full_name} · ${item.role || item.organization_name}`
          : `${item.organization_name}${item.role ? ` · ${item.role}` : ''}`}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-[9px] bg-background border border-border/40 px-2 py-0.5 rounded text-muted-foreground font-mono tracking-widest uppercase truncate max-w-[140px]">
          {student?.ledger_id || item.id.slice(0, 10).toUpperCase()}
        </span>
        <span className="w-1 h-1 bg-border rounded-full" />
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          {timeAgo(dateField)}
        </span>
      </div>
    </div>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function SupervisorDashboard() {
  const navigate = useNavigate()

  // OPTIMIZATION: React Query — shared cache with Requests page
  const { data: supervisorData, isLoading: loadingProfile, isError: profileError, refetch: refetchProfile } = useSupervisorProfile()
  const { data: allEngagements = [], isLoading: loadingEngagements, isError: engError, refetch: refetchEngagements } = useSupervisorEngagements()

  const profile   = supervisorData?.profile
  const ledgerId  = supervisorData?.ledger_id

  // OPTIMIZATION: Derive all counts locally — zero API calls
  const counts = useMemo(() => {
    const c = { all: 0, pending: 0, verified: 0, rejected: 0, edit_requested: 0 }
    for (const e of allEngagements) {
      c.all++
      if (c[e.status] !== undefined) c[e.status]++
    }
    return c
  }, [allEngagements])

  // Top 3 pending for the queue — derived locally, no extra fetch
  const queueItems = useMemo(() =>
    allEngagements.filter(e => e.status === 'pending').slice(0, 3),
    [allEngagements]
  )

  // Recent activity (verified + rejected + edit_requested), newest first — derived locally
  const feedItems = useMemo(() =>
    allEngagements
      .filter(e => e.status === 'verified' || e.status === 'rejected' || e.status === 'edit_requested')
      .sort((a, b) => {
        const da = new Date(a.verified_at || a.start_date || 0)
        const db = new Date(b.verified_at || b.start_date || 0)
        return db - da
      })
      .slice(0, 5),
    [allEngagements]
  )

  const pendingPct = counts.all > 0 ? Math.round((counts.pending / counts.all) * 100) : 0
  const anomalyPct = counts.all > 0 ? ((counts.rejected / counts.all) * 100).toFixed(1) : '0.0'

  const loadingStats = loadingEngagements
  const loadingQueue = loadingEngagements
  const loadingFeed  = loadingEngagements

  return (
    <SupervisorLayout>
      <PageContainer>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.05),transparent_70%)] pointer-events-none" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 relative z-10 border-b border-border/10 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full">
                  <div className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-destructive">Oracle View Active</span>
                  {ledgerId && !loadingProfile && !profileError && (
                    <span className="text-[9px] font-mono text-destructive/60 ml-1">· {ledgerId}</span>
                  )}
                </div>
              </div>

              {loadingProfile ? (
                <>
                  <Skeleton className="h-10 w-72 mb-3" />
                  <Skeleton className="h-4 w-96 mb-1" />
                  <Skeleton className="h-4 w-64" />
                </>
              ) : profileError ? (
                <ErrorMessage message="Failed to load profile" onRetry={refetchProfile} />
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-2">
                    Registry Oversight
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                    {profile?.organization
                      ? `Institutional ledger management for ${profile.organization}. Validating the integrity of the professional record.`
                      : 'Institutional ledger management for verified student engagements and professional milestones.'}
                  </p>
                  {(profile?.full_name || profile?.designation) && (
                    <p className="text-xs text-primary/70 font-mono mt-2 uppercase tracking-widest">
                      {[profile.full_name, profile.designation].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {!loadingProfile && !profileError && profile?.trust_tier && (
                <div className="bg-card/50 backdrop-blur-md border border-border/30 rounded-xl px-4 py-3 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Trust Tier</span>
                    <TrustBadge tier={profile.trust_tier} />
                  </div>
                </div>
              )}
              {loadingProfile && <Skeleton className="h-16 w-[200px]" />}

              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-4 min-w-[200px] flex items-center justify-between shadow-[0_0_15px_rgba(26,35,126,0.1)]">
                <div className="flex gap-3 items-center">
                  <Network className="w-4 h-4 text-primary" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary leading-tight">Consensus<br />Sync</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_hsl(var(--primary))]" />
                  <span className="text-[10px] font-mono text-primary">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS BENTO ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">

          {/* Pending Verifications */}
          <div className="md:col-span-2 bg-background/40 backdrop-blur-xl p-8 rounded-4xl border border-border/20 relative overflow-hidden group hover:border-primary/40 transition-all shadow-sm">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors pointer-events-none" />
            <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] mb-8 uppercase flex items-center gap-2">
              <CircleAlert className="w-3.5 h-3.5 text-primary" /> Pending Verifications
            </p>
            <div className="flex items-baseline gap-4 relative z-10">
              {loadingStats ? (
                <Skeleton className="h-16 w-20" />
              ) : engError ? (
                <ErrorMessage message="Failed to load stats" onRetry={refetchEngagements} />
              ) : (
                <span className="text-6xl font-light text-foreground tracking-tighter group-hover:text-primary transition-colors">
                  {counts.pending.toString().padStart(2, '0')}
                </span>
              )}
              {!loadingStats && !engError && counts.pending > 0 && (
                <div className="flex items-center gap-1 text-primary/90 bg-primary/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-primary/20 animate-pulse">
                  Action Required
                </div>
              )}
              {!loadingStats && !engError && counts.pending === 0 && (
                <div className="flex items-center gap-1 text-emerald-500/90 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-emerald-500/20">
                  Queue Clear
                </div>
              )}
            </div>
            <div className="mt-8 flex gap-2 relative z-10 w-full max-w-xs">
              <div
                className="h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))] transition-all duration-700"
                style={{ width: `${pendingPct}%` }}
              />
              <div
                className="h-1.5 bg-border/40 rounded-full transition-all duration-700"
                style={{ width: `${100 - pendingPct}%` }}
              />
            </div>
            {!loadingStats && !engError && (
              <p className="mt-2 text-[9px] text-muted-foreground/50 font-mono uppercase tracking-widest">
                {pendingPct}% of {counts.all} total records
              </p>
            )}
          </div>

          {/* Approved Blocks */}
          <div className="bg-card/30 backdrop-blur-md p-8 rounded-4xl border border-border/20 flex flex-col justify-between hover:bg-card/50 transition-colors">
            <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Approved Blocks</p>
            <div className="mt-6">
              {loadingStats ? (
                <Skeleton className="h-10 w-16 mb-2" />
              ) : (
                <span className="text-4xl font-light text-foreground tracking-tight">{counts.verified}</span>
              )}
              <p className="text-[10px] uppercase font-mono text-emerald-500 mt-2 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> Signed to ledger
              </p>
            </div>
          </div>

          {/* Rejections */}
          <div className="bg-card/30 backdrop-blur-md p-8 rounded-4xl border border-border/20 flex flex-col justify-between hover:bg-card/50 transition-colors">
            <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Forged Rejections</p>
            <div className="mt-6">
              {loadingStats ? (
                <Skeleton className="h-10 w-16 mb-2" />
              ) : (
                <span className="text-4xl font-light text-foreground tracking-tight">{counts.rejected}</span>
              )}
              <p className="text-[10px] uppercase font-mono text-destructive mt-2 flex items-center gap-1">
                <XCircle className="w-3 h-3" /> {anomalyPct}% Anomaly Rate
              </p>
            </div>
          </div>
        </div>

        {/* ── QUEUE + FEED ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: Immediate Queue */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/10">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" /> Immediate Queue
              </h2>
              <Link
                to="/supervisor/requests"
                className="text-[10px] font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded uppercase tracking-widest transition-colors border border-transparent hover:border-primary/20"
              >
                View Ledger
              </Link>
            </div>

            <div className="space-y-4">
              {loadingQueue ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="p-6 bg-card/10 border border-border/20 rounded-2xl flex items-center gap-6">
                    <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-56" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-8 w-24 rounded-lg shrink-0" />
                  </div>
                ))
              ) : engError ? (
                <div className="p-6 bg-card/10 border border-border/20 rounded-2xl">
                  <ErrorMessage message="Failed to load queue" onRetry={refetchEngagements} />
                </div>
              ) : queueItems.length === 0 ? (
                <div className="relative border border-border/15 rounded-2xl bg-card/10 px-8 py-16 flex flex-col items-center text-center gap-4">
                  <div className="absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden"
                       style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center mb-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" strokeWidth={1.5} />
                  </div>
                  <div className="relative space-y-1.5 z-10">
                    <p className="text-sm font-semibold text-foreground tracking-tight">You're all caught up</p>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                      No engagements are awaiting your signature. New submissions from your students will appear here.
                    </p>
                  </div>
                  <div className="relative z-10">
                    <Link
                      to="/supervisor/requests"
                      className="inline-block mt-4 text-[10px] font-bold uppercase tracking-widest text-primary px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      View Full Ledger
                    </Link>
                  </div>
                </div>
              ) : (
                queueItems.map((req) => <QueueCard key={req.id} req={req} />)
              )}
            </div>

            {/* Edit Requested count hint */}
            {!loadingQueue && !engError && counts.edit_requested > 0 && (
              <div className="mt-4 flex items-center gap-3 px-5 py-3 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
                <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">
                  {counts.edit_requested} engagement{counts.edit_requested > 1 ? 's' : ''} awaiting student revision
                </p>
                <Link to="/supervisor/requests?tab=edit_requested" className="ml-auto text-[10px] text-orange-500/70 hover:text-orange-500 font-mono uppercase tracking-widest">
                  Review →
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT: Activity Feed */}
          <div className="lg:col-span-4 relative pl-8 lg:pl-12">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground mb-10 flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" /> Network Feed
            </h3>

            {loadingFeed ? (
              <div className="space-y-10">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ))}
              </div>
            ) : engError ? (
              <ErrorMessage message="Failed to load activity" onRetry={refetchEngagements} />
            ) : feedItems.length === 0 ? (
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-mono">No recent activity</p>
            ) : (
              <div className="relative space-y-12">
                <div className="absolute -left-1px top-2 bottom-2 w-[2px] bg-linear-to-b from-primary/40 via-border/30 to-transparent pointer-events-none" />
                {feedItems.map((item, i) => (
                  <FeedItem key={item.id || i} item={item} isLast={i === feedItems.length - 1} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="mt-24 pb-8 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-card border border-border/30 rounded text-[9px] font-bold text-muted-foreground tracking-widest uppercase">
              Oracle Version 2.4.0
            </div>
            <p className="text-[10px] text-muted-foreground/40 font-bold tracking-widest uppercase">© 2024 Provenancy Systems</p>
          </div>
        </footer>

      </PageContainer>
    </SupervisorLayout>
  )
}
