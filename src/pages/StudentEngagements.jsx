import { useState, useEffect, useCallback } from 'react'
import { Building2, ChevronLeft, ChevronRight, Plus, Activity, Search, Loader2, AlertTriangle, FileText, Clock, CheckCircle2, XCircle, PenLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StudentLayout from '../components/workspace/StudentLayout'
import { PageContainer, StatusBadge, EmptyState } from '../components/workspace/SharedPrimitives'
import { getEngagements } from '../lib/api'
import { toast } from 'react-hot-toast'

const STATUS_FILTERS = [
  { label: 'All Nodes', value: 'all', icon: Activity },
  { label: 'Draft', value: 'draft', icon: FileText },
  { label: 'Pending', value: 'pending', icon: Clock },
  { label: 'Verified', value: 'verified', icon: CheckCircle2 },
  { label: 'Edit Req.', value: 'edit_requested', icon: PenLine },
  { label: 'Rejected', value: 'rejected', icon: XCircle },
]

function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatDuration(start, end) {
  const startFmt = formatDate(start) || '—'
  const endFmt = end ? formatDate(end) : 'Present'
  return `${startFmt} — ${endFmt}`
}

function getStatusContext(engagement) {
  switch (engagement.status) {
    case 'verified':
      return {
        label: engagement.verified_at ? `Verified ${formatDate(engagement.verified_at)}` : 'Verified',
        active: true,
      }
    case 'pending':
      return { label: 'Awaiting Review', active: false }
    case 'edit_requested':
      return { label: 'Changes Requested', active: false }
    case 'rejected':
      return { label: 'Rejected', active: false }
    case 'draft':
    default:
      return { label: 'Not yet submitted', active: false }
  }
}

export default function StudentEngagements() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [engagements, setEngagements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEngagements = useCallback(async (filter) => {
    setLoading(true)
    setError(null)
    try {
      const param = filter === 'all' ? undefined : filter
      const res = await getEngagements(param)
      setEngagements(res.data)
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to load engagements'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEngagements(activeFilter)
  }, [activeFilter, fetchEngagements])

  const filtered = engagements.filter(e => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return e.organization_name?.toLowerCase().includes(q) || e.role?.toLowerCase().includes(q)
  })

  // Computed metrics
  const totalCount = engagements.length
  const pendingCount = engagements.filter(e => e.status === 'pending').length
  const verifiedCount = engagements.filter(e => e.status === 'verified').length

  return (
    <StudentLayout>
      <PageContainer>
        
        {/*  HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 relative">
          <div className="absolute inset-x-0 top-0 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>
          
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit mb-4">
               <Activity className="w-3 h-3 text-accent" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Active Protocol</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-2">Institutional Records</h1>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              A complete, verified ledger of your professional contributions and academic engagements.
            </p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => navigate('/student/engagements/create')}
              className="flex items-center gap-2 px-6 py-2 h-[42px] text-[10px] font-bold uppercase tracking-[0.15em] text-background bg-foreground rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              Initialize Node
            </button>
          </div>
        </div>

        {/* METRICS BENTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-colors shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 relative z-10">Total Records</span>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-4xl font-light tracking-tighter text-foreground">{loading ? '—' : totalCount}</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1.5">Nodes</span>
            </div>
          </div>
          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 flex flex-col hover:border-amber-500/20 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Awaiting Verification</span>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-light tracking-tighter text-foreground">{loading ? '—' : pendingCount}</span>
              <span className="text-[10px] uppercase font-bold text-amber-500/80 tracking-widest mb-1.5">Pending</span>
            </div>
          </div>
          <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Verified Entries</span>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-light tracking-tighter text-foreground">{loading ? '—' : verifiedCount}</span>
              <span className="text-[10px] uppercase font-bold text-primary/80 tracking-widest mb-1.5">Verified</span>
            </div>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg border transition-all ${
                activeFilter === value
                  ? 'text-foreground bg-card border-border/60 shadow-sm'
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* LEDGER TABLE */}
        <div className="bg-background/40 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl overflow-hidden mb-12 relative flex flex-col">
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
          
          {/* Toolbar */}
          <div className="p-4 border-b border-border/10 flex items-center justify-between bg-card/50">
             <div className="relative w-64">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search orgs or roles..." 
                  className="w-full bg-background border border-border/50 rounded-md py-2 pl-9 pr-3 text-xs placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all font-mono"
                />
             </div>
             <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.15em]">
               {loading ? 'Loading...' : `${filtered.length} record${filtered.length !== 1 ? 's' : ''}`}
             </span>
          </div>

          <div className="overflow-x-auto grow">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 text-primary/40 animate-spin" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Fetching ledger nodes...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <AlertTriangle className="w-8 h-8 text-destructive/50" />
                <p className="text-sm text-muted-foreground">{error}</p>
                <button onClick={() => fetchEngagements(activeFilter)} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Retry</button>
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
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-muted/10 border-b border-border/10">
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Entity & Role Node</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Vector Duration</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Signature Signal</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">Consensus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {filtered.map((row) => {
                    const ctx = getStatusContext(row)
                    return (
                      <tr 
                        key={row.id}
                        onClick={() => navigate(`/student/engagements/${row.id}`)}
                        className={`group cursor-pointer transition-all hover:bg-primary/2 ${row.status === 'draft' ? 'opacity-70 hover:opacity-100' : ''}`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-card rounded-xl border border-border/50 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-card/80 transition-all shadow-sm relative overflow-hidden">
                              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <Building2 className="text-muted-foreground group-hover:text-primary w-4 h-4 transition-colors" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{row.organization_name}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{row.role}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm text-foreground/90">{formatDuration(row.start_date, row.end_date)}</p>
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mt-1.5">
                            {row.end_date ? 'Completed' : 'Ongoing'}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            {ctx.active ? (
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--primary))] shrink-0"></div>
                            ) : (
                              <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full shrink-0"></div>
                            )}
                            <p className={`text-sm font-medium ${ctx.active ? 'text-primary' : 'text-muted-foreground'}`}>{ctx.label}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <StatusBadge status={row.status} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
          
          {!loading && !error && filtered.length > 0 && (
            <div className="p-4 bg-muted/5 flex items-center justify-between border-t border-border/10 mt-auto">
              <div className="flex items-center gap-2 pl-2">
                 <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                 <p className="text-[9px] font-mono text-accent uppercase tracking-[0.2em]">End of Validated Ledger</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border/30 hover:bg-card transition-colors bg-background">
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border/30 hover:bg-card transition-colors bg-background">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}
        </div>

      </PageContainer>
    </StudentLayout>
  )
}
