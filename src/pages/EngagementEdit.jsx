import { useState, useEffect } from 'react'
import { BadgeCheck, Link2, Trash2, Info, FileSignature, Plus, Save, Loader2, ArrowLeft, AlertCircle } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { FormSection, InputField, TextArea } from '../components/workspace/FormElements'
import { PageContainer } from '../components/workspace/SharedPrimitives'
import EngagementSkillSelector from '../components/workspace/EngagementSkillSelector'
import DatePickerField from '../components/workspace/DatePickerField'
import { toast } from 'react-hot-toast'
import { handleError } from '../lib/handleError'
import { useNavigate, useParams } from 'react-router-dom'
import { getEngagement, updateEngagement, submitEngagement } from '../lib/api'
import { useInvalidateEngagements } from '../hooks/useStudentData'

export default function EngagementEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const invalidateEngagements = useInvalidateEngagements()

  const [loading, setLoading] = useState(true)
  const [engagement, setEngagement] = useState(null)
  const [form, setForm] = useState({
    organization_name: '',
    role: '',
    start_date: '',
    end_date: '',
    summary: '',
    supervisor_ref: '',
  })
  const [highlights, setHighlights] = useState([''])
  const [links, setLinks] = useState([''])
  const [skills, setSkills] = useState([])
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Load existing engagement data
  useEffect(() => {
    if (!id) return
    setLoading(true)
    getEngagement(id)
      .then(res => {
        const eng = res.data
        setEngagement(eng)

        // Check if editable
        if (!['draft', 'edit_requested'].includes(eng.status)) {
          toast.error('This engagement cannot be edited in its current status')
          navigate(`/student/engagements/${id}`)
          return
        }

        // Pre-fill form
        setForm({
          organization_name: eng.organization_name || '',
          role: eng.role || '',
          start_date: eng.start_date ? eng.start_date.split('T')[0] : '',
          end_date: eng.end_date ? eng.end_date.split('T')[0] : '',
          summary: eng.summary || '',
          supervisor_ref: eng.supervisor_ref || '',
        })
        setHighlights(eng.highlights?.length > 0
          ? eng.highlights.length < 3
            ? [...eng.highlights, ...Array(3 - eng.highlights.length).fill('')]
            : eng.highlights
          : ['', '', ''])
        setLinks(eng.links?.length > 0 ? eng.links : [''])
        setSkills(eng.skills?.map(s => s.name) || [])
      })
      .catch(err => {
        handleError(err)
        navigate('/student/engagements')
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  // Highlights — min 3, max 5
  const updateHighlight = (idx, val) => setHighlights(prev => prev.map((h, i) => i === idx ? val : h))
  const addHighlight = () => setHighlights(prev => prev.length < 5 ? [...prev, ''] : prev)
  const removeHighlight = (idx) => setHighlights(prev => prev.length > 3 ? prev.filter((_, i) => i !== idx) : prev)

  // Links — min 1, max 3
  const updateLink = (idx, val) => setLinks(prev => prev.map((l, i) => i === idx ? val : l))
  const addLink = () => setLinks(prev => prev.length < 3 ? [...prev, ''] : prev)
  const removeLink = (idx) => setLinks(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev)

  // Skills — managed by EngagementSkillSelector via onChange


  const validate = () => {
    const errs = {}
    if (!form.organization_name.trim()) errs.organization_name = 'Organization name is required'
    if (!form.role.trim()) errs.role = 'Role is required'
    if (!form.start_date) errs.start_date = 'Start date is required'
    return errs
  }

  const validateForSubmit = () => {
    const errs = validate()
    if (!form.end_date) errs.end_date = 'End date is required to submit'
    if (!form.supervisor_ref.trim()) errs.supervisor_ref = 'Supervisor reference is required to submit'
    return errs
  }

  const buildPayload = () => ({
    organization_name: form.organization_name.trim(),
    role: form.role.trim(),
    start_date: form.start_date ? new Date(form.start_date).toISOString() : undefined,
    end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
    summary: form.summary.trim() || null,
    highlights: highlights.filter(h => h.trim()).length > 0 ? highlights.filter(h => h.trim()) : null,
    links: links.filter(l => l.trim()).length > 0 ? links.filter(l => l.trim()) : null,
    supervisor_ref: form.supervisor_ref.trim() || null,
    skills: skills.length > 0 ? skills : null,
  })

  const handleSave = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      await updateEngagement(id, buildPayload())
      toast.success('Changes saved successfully')
      invalidateEngagements()
      navigate(`/student/engagements/${id}`)
    } catch (err) {
      handleError(err)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAndSubmit = async (e) => {
    e.preventDefault()
    const errs = validateForSubmit()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    try {
      await updateEngagement(id, buildPayload())
      await submitEngagement(id)
      toast.success('Engagement resubmitted for verification')
      invalidateEngagements()
      navigate('/student/engagements')
    } catch (err) {
      handleError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const isLoading = saving || submitting
  const isEditRequested = engagement?.status === 'edit_requested'

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary/40 animate-spin" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Loading engagement...</p>
          </div>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout>
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <PageContainer>

            {/* HEADER */}
            <div className="mb-12 relative border-b border-border/10 pb-8">
              <div className="absolute inset-x-0 top-0 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>

              <button
                onClick={() => navigate(`/student/engagements/${id}`)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Record
              </button>

              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mb-4">
                <FileSignature className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary">
                  {isEditRequested ? 'Edit Requested' : 'Edit Draft'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
                Update Record
              </h1>
              <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                {isEditRequested
                  ? 'Your supervisor has requested changes. Update the relevant fields and resubmit for verification.'
                  : 'Make changes to your draft engagement before submitting for verification.'}
              </p>
            </div>

            {/* Edit Feedback Banner */}
            {isEditRequested && engagement?.rejection_reason && (
              <div className="mb-8 p-5 bg-orange-500/5 border border-orange-500/20 rounded-xl flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1">Supervisor Feedback</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{engagement.rejection_reason}</p>
                </div>
              </div>
            )}

            <form className="space-y-12" onSubmit={handleSaveAndSubmit}>

              {/* SECTION 01 — Core Details */}
              <FormSection title="Core Details" number="01">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  <div>
                    <InputField
                      label="Organization Name"
                      placeholder="e.g., Global Initiatives Ltd."
                      value={form.organization_name}
                      onChange={handleChange('organization_name')}
                    />
                    {errors.organization_name && <p className="text-destructive text-[10px] mt-2 pl-1">{errors.organization_name}</p>}
                  </div>
                  <div>
                    <InputField
                      label="Role / Position"
                      placeholder="e.g., Research Associate"
                      value={form.role}
                      onChange={handleChange('role')}
                    />
                    {errors.role && <p className="text-destructive text-[10px] mt-2 pl-1">{errors.role}</p>}
                  </div>
                  <div>
                    <DatePickerField
                      label="Start Date"
                      value={form.start_date}
                      onChange={val => { setForm(prev => ({ ...prev, start_date: val })); setErrors(prev => ({ ...prev, start_date: null })) }}
                      disableFuture
                      error={errors.start_date}
                    />
                  </div>
                  <div>
                    <DatePickerField
                      label="End Date"
                      value={form.end_date}
                      onChange={val => { setForm(prev => ({ ...prev, end_date: val })); setErrors(prev => ({ ...prev, end_date: null })) }}
                      disableFuture
                      optional
                      error={errors.end_date}
                    />
                  </div>
                </div>
              </FormSection>

              {/* SECTION 02 — Scope of Work */}
              <FormSection title="Scope of Work" number="02">
                <div className="space-y-10">
                  <TextArea
                    label="Comprehensive Summary"
                    placeholder="Describe the overarching goals and your specific involvement..."
                    rows={4}
                    value={form.summary}
                    onChange={handleChange('summary')}
                  />
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold">Key Performance Highlights</label>
                      <span className="text-[9px] font-mono text-muted-foreground/60">{highlights.length}/5 · min 3</span>
                    </div>
                    <div className="space-y-3">
                      {highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-background/30 p-3.5 pl-6 rounded-xl border border-border/30 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(26,35,126,0.1)] transition-all">
                          <span className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></span>
                          <input
                            className="flex-1 text-sm text-foreground placeholder:text-muted-foreground/50 bg-transparent border-0 rounded-none focus:outline-none focus:ring-0 w-full"
                            placeholder={`Highlight ${idx + 1}`}
                            type="text"
                            value={h}
                            onChange={e => updateHighlight(idx, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => removeHighlight(idx)}
                            disabled={highlights.length <= 3}
                            className="p-1 rounded transition-colors shrink-0 text-destructive/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-destructive/40"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addHighlight}
                      disabled={highlights.length >= 5}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors self-start px-3 py-2 border border-dashed rounded-lg text-muted-foreground border-border/40 hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-foreground disabled:hover:border-border/40"
                    >
                      <Plus className="w-3 h-3" /> Add Highlight
                    </button>
                  </div>
                </div>
              </FormSection>

              {/* SECTION 03 — Verification Metadata */}
              <FormSection title="Verification Metadata" number="03">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

                  {/* Skills */}
                  <EngagementSkillSelector
                    selectedSkills={skills}
                    onChange={setSkills}
                  />

                  {/* Supervisor Identity */}
                  <div className="flex flex-col">
                    <InputField
                      label="Supervisor Identity"
                      placeholder="e.g. PRV-SUP-8821"
                      value={form.supervisor_ref}
                      onChange={handleChange('supervisor_ref')}
                    />
                    {errors.supervisor_ref && <p className="text-destructive text-[10px] mt-2 pl-1">{errors.supervisor_ref}</p>}
                    <p className="text-[10px] text-muted-foreground mt-3 italic bg-muted/20 p-3 rounded-lg border border-border/10">
                      The supervisor's Provenancy Ledger ID (e.g. PRV-SUP-8821). Required to submit for verification.
                    </p>
                  </div>
                </div>
              </FormSection>

              {/* SECTION 04 — Supporting Evidence */}
              <FormSection title="Supporting Evidence" number="04">
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Links</span>
                    <span className="text-[9px] font-mono text-muted-foreground/60">{links.length}/3</span>
                  </div>
                  {links.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-background/50 border border-border/50 rounded-xl group hover:border-primary/30 transition-all shadow-sm">
                      <div className="w-8 h-8 rounded bg-muted/30 flex items-center justify-center border border-border/20 shrink-0">
                        <Link2 className="text-muted-foreground w-4 h-4" />
                      </div>
                      <input
                        type="url"
                        placeholder="https://github.com/you/project"
                        value={link}
                        onChange={e => updateLink(idx, e.target.value)}
                        className="flex-1 text-sm text-foreground placeholder:text-muted-foreground/40 bg-transparent border-0 focus:outline-none focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => removeLink(idx)}
                        disabled={links.length <= 1}
                        className="p-2 rounded transition-colors shrink-0 text-destructive/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-destructive/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLink}
                    disabled={links.length >= 3}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded-xl transition-all border border-dashed self-start text-muted-foreground border-border/40 hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-foreground disabled:hover:border-border/40"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    Add Another Link
                  </button>
                </div>
              </FormSection>

              {/* ACTION FOOTER */}
              <div className="pb-12 pt-8 flex flex-col items-center gap-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">

                  {/* Save changes only */}
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 h-[56px] border border-border/50 text-foreground font-bold uppercase tracking-[0.15em] text-[10px] rounded-xl hover:bg-muted/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </button>

                  {/* Save + Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 h-[56px] bg-foreground text-background font-bold uppercase tracking-[0.15em] text-[10px] rounded-xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <BadgeCheck className="w-4 h-4" />}
                    {isEditRequested ? 'Save & Resubmit' : 'Save & Submit'}
                  </button>
                </div>

                <div className="mt-2 p-4 bg-muted/10 border border-border/20 rounded-xl max-w-md w-full flex items-start gap-4">
                  <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    {isEditRequested
                      ? '"Save Changes" updates the record without resubmitting. "Save & Resubmit" saves your changes and sends it back to the supervisor for verification.'
                      : '"Save Changes" keeps the record as a draft. "Save & Submit" updates and immediately sends it to your supervisor for verification.'}
                  </p>
                </div>
              </div>
            </form>
          </PageContainer>
        </div>
      </div>
    </StudentLayout>
  )
}
