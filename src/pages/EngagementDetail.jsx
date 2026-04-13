import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, XCircle, AlertCircle, ShieldAlert, Loader2, AlertTriangle, Trash2, ArrowLeft, Fingerprint, Link2 } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { handleError } from '../lib/handleError'
import StudentLayout from '../components/workspace/StudentLayout'
import SupervisorLayout from '../components/workspace/SupervisorLayout'
import { EngagementHeader } from '../components/workspace/DetailElements'
import { PageContainer, StatusBadge } from '../components/workspace/SharedPrimitives'
import { getEngagement, deleteEngagement, submitEngagement, approveEngagement, rejectEngagement, requestEditEngagement, getStudentPublic } from '../lib/api'
import { useAuth } from '../context/AuthContext'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatDuration(start, end) {
  const s = formatDate(start)
  const e = end ? formatDate(end) : 'Present'
  return `${s} — ${e}`
}

export default function EngagementDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const role = user?.role || 'student'
  const isSupervisor = role === 'supervisor'
  const myLedgerId = profile?.ledger_id || user?.ledger_id || '—'

  const [engagement, setEngagement] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null) // 'approve' | 'reject' | 'edit' | 'delete' | null
  const [actionReason, setActionReason] = useState('')
  const [actioning, setActioning] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [studentInfo, setStudentInfo] = useState(null) // { full_name, ledger_id, institution }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getEngagement(id)
      .then(async res => {
        const eng = res.data
        setEngagement(eng)
        // For supervisors: fetch student identity from student_profile_id
        if (isSupervisor && eng.student_profile_id) {
          try {
            const sr = await getStudentPublic(eng.student_profile_id)
            setStudentInfo({ full_name: sr.data.full_name, ledger_id: sr.data.ledger_id, institution: sr.data.institution })
          } catch { /* non-critical */ }
        }
      })
      .catch(err => {
        const status = err.response?.status
        if (status === 404) setError('Engagement not found.')
        else if (status === 403) setError("You don't have access to this engagement.")
        else setError('Failed to load engagement. Please try again.')
      })
      .finally(() => setLoading(false))
  }, [id, isSupervisor])

  const handleSubmitDraft = async () => {
    setSubmitting(true)
    try {
      await submitEngagement(id)
      toast.success('Engagement submitted for verification')
      // Refresh the engagement data
      const res = await getEngagement(id)
      setEngagement(res.data)
    } catch (err) {
      handleError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteEngagement(id)
      toast.success('Engagement deleted')
      navigate('/student/engagements')
    } catch (err) {
      handleError(err)
    } finally {
      setDeleting(false)
      setConfirmAction(null)
    }
  }

  const handleSupervisorAction = async () => {
    if (!confirmAction) return
    if ((confirmAction === 'reject' || confirmAction === 'edit') && !actionReason.trim()) {
      toast.error('Please provide a reason before proceeding.')
      return
    }
    setActioning(true)
    try {
      if (confirmAction === 'approve') {
        await approveEngagement(id)
        toast.success('Engagement verified and signed to ledger')
      } else if (confirmAction === 'reject') {
        await rejectEngagement(id, actionReason.trim())
        toast.success('Engagement rejected')
      } else if (confirmAction === 'edit') {
        await requestEditEngagement(id, actionReason.trim())
        toast.success('Edit request sent to student')
      }
      navigate('/supervisor/requests')
    } catch (err) {
      handleError(err)
    } finally {
      setActioning(false)
      setConfirmAction(null)
      setActionReason('')
    }
  }

  const LayoutWrapper = isSupervisor ? SupervisorLayout : StudentLayout

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary/40 animate-spin" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Loading engagement...</p>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (error) {
    return (
      <LayoutWrapper>
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <AlertTriangle className="w-10 h-10 text-destructive/50" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <button onClick={() => navigate('/student/engagements')} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Go Back
            </button>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  const canEdit = ['draft', 'edit_requested'].includes(engagement.status)
  const canDelete = engagement.status !== 'verified'
  const canSubmit = engagement.status === 'draft'

  // Determine if we have edit-request feedback or rejection reason
  const hasEditFeedback = engagement.status === 'edit_requested' && engagement.rejection_reason
  const hasRejectionReason = engagement.status === 'rejected' && engagement.rejection_reason

  return (
    <LayoutWrapper>
      <div className="flex-1 overflow-y-auto h-full w-full">
        <PageContainer>
          
          {/* Back + Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(isSupervisor ? '/supervisor/requests' : '/student/engagements')}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <div className="flex items-center gap-3">
              {canSubmit && !isSupervisor && (
                <button
                  onClick={handleSubmitDraft}
                  disabled={submitting}
                  className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-primary/40 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  Submit for Review
                </button>
              )}
              {canEdit && (
                <button
                  onClick={() => navigate(`/student/engagements/${id}/edit`)}
                  className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-lg transition-all"
                >
                  Edit
                </button>
              )}
              {canDelete && !isSupervisor && (
                <button
                  onClick={() => setConfirmAction('delete')}
                  className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-destructive/20 text-destructive/70 hover:bg-destructive/5 hover:text-destructive rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              )}
            </div>
          </div>

          {/* EngagementHeader */}
          <EngagementHeader 
            title={engagement.role}
            org={engagement.organization_name}
            duration={formatDuration(engagement.start_date, engagement.end_date)}
            status={engagement.status.charAt(0).toUpperCase() + engagement.status.slice(1)}
            refId={engagement.id.slice(0, 8).toUpperCase()}
          />

          {/* Edit Feedback / Rejection Banner */}
          {hasEditFeedback && (
            <div className="mt-6 p-5 bg-orange-500/5 border border-orange-500/20 rounded-xl flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1">Edit Requested — Supervisor Feedback</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{engagement.rejection_reason}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-2">Update the relevant fields and resubmit for verification.</p>
              </div>
            </div>
          )}
          {hasRejectionReason && (
            <div className="mt-6 p-5 bg-destructive/5 border border-destructive/20 rounded-xl flex items-start gap-4">
              <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-destructive mb-1">Engagement Rejected</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{engagement.rejection_reason}</p>
              </div>
            </div>
          )}

          {/* Main Bento Grid */}
          <div className="grid grid-cols-12 gap-8 mt-8">
            
            {/* Left — Content */}
            <div className="col-span-12 lg:col-span-8 space-y-12">
              
              {engagement.summary && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
                    Scope of Work
                    <span className="h-px flex-1 bg-border/20"></span>
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground font-light first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-primary">
                    {engagement.summary}
                  </p>
                </div>
              )}

              {engagement.highlights?.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
                    Key Highlights
                    <span className="h-px flex-1 bg-border/20"></span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {engagement.highlights.map((highlight, idx) => (
                      <div key={idx} className="group p-6 bg-muted/10 hover:bg-muted/20 transition-colors rounded-lg flex items-start gap-6 border border-border/10 hover:border-border/30">
                        <span className="text-muted-foreground/60 font-mono text-sm pt-1">0{idx + 1}</span>
                        <p className="text-foreground font-medium leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {engagement.links?.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-4">
                    Supporting Links
                    <span className="h-px flex-1 bg-border/20"></span>
                  </h3>
                  <div className="space-y-2">
                    {engagement.links.map((link, idx) => (
                      <a key={idx} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-muted/5 border border-border/20 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all group">
                        <Link2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors font-mono truncate">{link}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Metadata */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              
              {/* Skills */}
              {engagement.skills?.length > 0 && (
                <div className="bg-muted/5 p-8 space-y-6 border border-border/10 rounded-lg">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Endorsed Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {engagement.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-muted/20 text-foreground text-[11px] font-medium uppercase tracking-wider rounded border border-border/20">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ledger Identity Block */}
              <div className="bg-background border border-border/20 p-6 space-y-5 rounded-lg relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground relative">Ledger Identities</h3>
                
                <div className="space-y-4 relative">
                  {!isSupervisor && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Your Ledger ID</span>
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                        <p className="text-sm font-mono font-semibold text-foreground tracking-wider">{myLedgerId}</p>
                      </div>
                    </div>
                  )}

                  {/* Supervisor view: show student identity */}
                  {isSupervisor && studentInfo && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Student Ledger ID</span>
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                        <p className="text-sm font-mono font-semibold text-foreground tracking-wider">{studentInfo.ledger_id}</p>
                      </div>
                      {studentInfo.full_name && (
                        <p className="text-[10px] text-muted-foreground mt-0.5 pl-5">{studentInfo.full_name}</p>
                      )}
                    </div>
                  )}

                  {engagement.supervisor_ref && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Supervisor Ref</span>
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                        <p className="text-sm font-mono font-semibold text-foreground tracking-wider">{engagement.supervisor_ref}</p>
                      </div>
                    </div>
                  )}

                  {engagement.status === 'draft' && !engagement.supervisor_ref && (
                    <p className="text-[10px] italic text-muted-foreground/60">Supervisor not yet assigned. Add a supervisor reference before submitting.</p>
                  )}
                </div>
              </div>

              {/* Verification Stamp */}
              {engagement.status === 'verified' && (
                <div className="bg-background border border-primary/20 p-8 space-y-6 relative overflow-hidden group rounded-lg">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                  <div className="space-y-2 relative">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Institutional Verification</h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      This record has been cryptographically verified via Provenancy Ledger protocol.
                    </p>
                  </div>
                  <div className="space-y-4 relative">
                    {engagement.verification_type && (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Verification Type</span>
                        <span className={`text-sm font-semibold capitalize ${engagement.verification_type === 'institutional' ? 'text-primary' : 'text-foreground'}`}>
                          {engagement.verification_type}
                        </span>
                      </div>
                    )}
                    {engagement.verified_at && (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Verified On</span>
                        <p className="text-sm font-semibold text-foreground">{formatDate(engagement.verified_at)}</p>
                      </div>
                    )}
                  </div>
                  {engagement.block_hash && (
                    <div className="pt-4 border-t border-border/15 relative">
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest block mb-2">Block Hash</span>
                      <span className="text-[11px] font-mono text-muted-foreground bg-muted/20 px-2 py-1 rounded border border-border/20 break-all">{engagement.block_hash}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Status + Timestamps */}
              <div className="bg-muted/5 p-6 space-y-4 border border-border/10 rounded-lg">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Record Metadata</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Status</span>
                    <StatusBadge status={engagement.status} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Created</span>
                    <span className="text-[11px] font-mono text-foreground/80">{formatDate(engagement.created_at)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Updated</span>
                    <span className="text-[11px] font-mono text-foreground/80">{formatDate(engagement.updated_at)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Supervisor Actions Block */}
          {isSupervisor && engagement.status === 'pending' && !confirmAction && (
            <div className="mt-8 border-t-2 border-border/20 pt-8 bg-muted/5 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-bold text-primary mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Signature Required
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                    Provide cryptographic authorization to append this engagement to the institutional ledger.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => { setConfirmAction('edit'); setActionReason('') }}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-muted/20 border border-border/40 text-muted-foreground font-bold text-[10px] uppercase tracking-widest hover:bg-muted/40 rounded-lg transition-all"
                  >
                    <AlertCircle className="w-4 h-4" /> Request Edit
                  </button>
                  <button
                    onClick={() => { setConfirmAction('reject'); setActionReason('') }}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-destructive/10 border border-destructive/20 text-destructive font-bold text-[10px] uppercase tracking-widest hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-all"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                  <button
                    onClick={() => setConfirmAction('approve')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary/20 border border-primary/40 text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground rounded-lg transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Sign & Verify
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Supervisor Action Portal Modal — approve / reject / request-edit */}
          {isSupervisor && confirmAction && confirmAction !== 'delete' && createPortal(
            <div
              className="fixed inset-0 z-9999 flex items-center justify-center p-4"
              onClick={e => { if (e.target === e.currentTarget) { setConfirmAction(null); setActionReason('') } }}
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
              <div className="relative z-10 w-full max-w-lg bg-card border border-border/30 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 space-y-5">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      confirmAction === 'approve' ? 'bg-primary/10' : confirmAction === 'reject' ? 'bg-destructive/10' : 'bg-orange-500/10'
                    }`}>
                      {confirmAction === 'approve'
                        ? <CheckCircle2 className="w-5 h-5 text-primary" />
                        : confirmAction === 'reject'
                        ? <XCircle className="w-5 h-5 text-destructive" />
                        : <AlertCircle className="w-5 h-5 text-orange-500" />}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-foreground mb-1">
                        {confirmAction === 'approve' && 'Confirm Verification'}
                        {confirmAction === 'reject' && 'Reject Engagement'}
                        {confirmAction === 'edit' && 'Request Student Edit'}
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {confirmAction === 'approve' &&
                          'This will cryptographically sign and verify the engagement. Once approved, the record becomes immutable on the ledger.'}
                        {confirmAction === 'reject' &&
                          'The student will be notified with your reason. Rejected engagements cannot be resubmitted.'}
                        {confirmAction === 'edit' &&
                          'The student will receive your feedback and can update the record before resubmitting for review.'}
                      </p>
                    </div>
                  </div>

                  {/* Reason textarea — only for reject and edit */}
                  {(confirmAction === 'reject' || confirmAction === 'edit') && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        {confirmAction === 'reject' ? 'Rejection Reason' : 'Edit Instructions'}
                        <span className="text-destructive ml-1">*</span>
                      </label>
                      <textarea
                        value={actionReason}
                        onChange={e => setActionReason(e.target.value)}
                        placeholder={confirmAction === 'reject'
                          ? 'Explain why this engagement cannot be verified…'
                          : 'Describe what the student needs to change or clarify…'}
                        rows={4}
                        className="w-full bg-background/60 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none"
                      />
                      {actionReason.trim().length === 0 && (
                        <p className="text-[10px] text-muted-foreground/60">A reason is required to proceed.</p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => { setConfirmAction(null); setActionReason('') }}
                      className="flex-1 px-4 py-2.5 border border-border/40 text-muted-foreground text-[10px] uppercase font-bold tracking-widest hover:bg-muted/20 rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSupervisorAction}
                      disabled={actioning || ((confirmAction === 'reject' || confirmAction === 'edit') && !actionReason.trim())}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-40 ${
                        confirmAction === 'approve'
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : confirmAction === 'reject'
                          ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          : 'bg-orange-500 text-white hover:bg-orange-500/90'
                      }`}
                    >
                      {actioning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                      {confirmAction === 'approve' && 'Sign & Verify'}
                      {confirmAction === 'reject' && 'Reject Permanently'}
                      {confirmAction === 'edit' && 'Send Edit Request'}
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* Delete Confirmation — Portal Modal */}
          {confirmAction === 'delete' && createPortal(
            <div
              className="fixed inset-0 z-9999 flex items-center justify-center p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setConfirmAction(null) }}
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
              <div className="relative z-10 w-full max-w-md bg-card border border-destructive/20 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-foreground mb-1">Delete Engagement Record</h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">This will permanently remove this engagement from your ledger. This action cannot be undone.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmAction(null)}
                      className="flex-1 px-4 py-2.5 border border-border/40 text-muted-foreground text-[10px] uppercase font-bold tracking-widest hover:bg-muted/20 rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-destructive text-destructive-foreground font-bold text-[10px] uppercase tracking-widest hover:bg-destructive/90 rounded-xl transition-all disabled:opacity-50"
                    >
                      {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Delete Permanently
                    </button>
                  </div>
                </div>
              </div>
            </div>
          , document.body)}

          {/* Footer Meta */}
          <footer className="pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
            <div className="flex items-center gap-4 text-muted-foreground text-[10px] uppercase tracking-widest">
              <span>Record ID: {engagement.id}</span>
            </div>
          </footer>

        </PageContainer>
      </div>
    </LayoutWrapper>
  )
}
