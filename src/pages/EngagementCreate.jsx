import { useState } from 'react'
import { BadgeCheck, Link2, Trash2, Info, FileSignature, Plus, Save, Loader2 } from 'lucide-react'
import StudentLayout from '../components/workspace/StudentLayout'
import { FormSection, InputField, TextArea } from '../components/workspace/FormElements'
import { PageContainer } from '../components/workspace/SharedPrimitives'
import EngagementSkillSelector from '../components/workspace/EngagementSkillSelector'
import DatePickerField from '../components/workspace/DatePickerField'
import { toast } from 'react-hot-toast'
import { handleError } from '../lib/handleError'
import { useNavigate } from 'react-router-dom'
import { createEngagement, submitEngagement } from '../lib/api'
import { Paperclip } from 'lucide-react'
import { useInvalidateEngagements } from '../hooks/useStudentData'

const INITIAL_FORM = {
  organization_name: '',
  role: '',
  start_date: '',
  end_date: '',
  summary: '',
  supervisor_ref: '',
}

export default function EngagementCreate() {
  const navigate = useNavigate()
  const invalidateEngagements = useInvalidateEngagements()
  const [form, setForm] = useState(INITIAL_FORM)
  const [highlights, setHighlights] = useState(['', '', ''])
  const [links, setLinks] = useState([''])
  const [skills, setSkills] = useState([])
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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

  const handleSaveDraft = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      await createEngagement(buildPayload())
      toast.success('Draft saved successfully')
      invalidateEngagements()
      navigate('/student/engagements')
    } catch (err) {
      handleError(err)
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateForSubmit()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const created = await createEngagement(buildPayload())
      const engagementId = created.data.id
      await submitEngagement(engagementId)
      toast.success('Engagement submitted for cryptographic verification')
      invalidateEngagements()
      navigate('/student/engagements')
    } catch (err) {
      handleError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const isLoading = saving || submitting

  return (
    <StudentLayout>
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <PageContainer>
            
            {/* HEADER */}
            <div className="mb-12 relative border-b border-border/10 pb-8">
              <div className="absolute inset-x-0 top-0 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mb-4">
                 <FileSignature className="w-3 h-3 text-primary" />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-primary">New Ledger Entry</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Initialize Record</h1>
              <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                Document your professional experience for institutional verification. Upon supervisor review, this record becomes immutable.
              </p>
            </div>

            <form className="space-y-12" onSubmit={handleSubmit}>
              
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
                      Enter the supervisor's Provenancy Ledger ID (e.g. PRV-SUP-8821). Only needed to submit — optional when saving draft.
                    </p>
                  </div>
                </div>
              </FormSection>

              {/* SECTION 04 — Supporting Evidence */}
              <FormSection title="Supporting Evidence" description="Link external proof or upload documentation." number="04">
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
                  
                  {/* Save as Draft */}
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 h-[56px] border border-border/50 text-foreground font-bold uppercase tracking-[0.15em] text-[10px] rounded-xl hover:bg-muted/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save as Draft
                  </button>

                  {/* Submit */}
                  <button 
                    className="flex-1 px-6 py-4 h-[56px] bg-foreground text-background font-bold uppercase tracking-[0.15em] text-[10px] rounded-xl hover:bg-foreground/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] disabled:opacity-50"
                    type="submit"
                    disabled={isLoading}
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <BadgeCheck className="w-4 h-4" />}
                    Sign & Submit
                  </button>
                </div>

                <div className="mt-2 p-4 bg-muted/10 border border-border/20 rounded-xl max-w-md w-full flex items-start gap-4">
                  <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    "Save as Draft" stores the record privately. "Sign & Submit" sends it to your supervisor for cryptographic verification. A ledger entry becomes immutable upon approval.
                  </p>
                </div>
              </div>
            </form>
          </PageContainer>
        </div>

        {/* Right Info Pane */}
        <aside className="w-80 lg:w-96 border-l border-border/10 bg-card/10 backdrop-blur-md p-8 hidden xl:flex flex-col gap-12 static right-0 top-0 shadow-[-10px_0_30px_rgba(0,0,0,0.2)]">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-10 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></span>
               Verification Pipeline
            </h3>
            <div className="relative pl-8 border-l border-border/20 space-y-16 ml-2">
              <div className="relative group">
                <div className="absolute top-1.5 -left-[37px] w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 shadow-[0_0_12px_hsl(var(--primary))] transition-all group-hover:scale-125"></div>
                <p className="text-[11px] font-bold text-foreground mb-2 uppercase tracking-widest">1. Compile Record</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Ensure all impact metrics are quantified. The node requires substantial proof of work.</p>
              </div>
              <div className="relative opacity-60 group hover:opacity-100 transition-opacity">
                <div className="absolute top-1.5 -left-[37px] w-3 h-3 rounded-full border-2 border-border/50 bg-background transition-all group-hover:border-primary/50 group-hover:bg-primary/10"></div>
                <p className="text-[11px] font-bold text-foreground mb-2 uppercase tracking-widest">2. Network Consensus</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Requests routing through institutional supervisors. Typically resolves in 48h.</p>
              </div>
              <div className="relative opacity-60 group hover:opacity-100 transition-opacity">
                <div className="absolute top-1.5 -left-[37px] w-3 h-3 rounded-full border-2 border-border/50 bg-background transition-all group-hover:border-primary/50 group-hover:bg-primary/10"></div>
                <p className="text-[11px] font-bold text-foreground mb-2 uppercase tracking-widest">3. Ledger Finalization</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Immutable block written. Record permanently verifiable by third parties.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 group">
            <div className="absolute -inset-10 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-3">
                 <BadgeCheck className="text-primary w-4 h-4" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Security Note</span>
               </div>
               <p className="text-xs text-primary/80 leading-relaxed">
                 Submitting fraudulent supervisors will result in immediate network flagging and node rejection. Verify the ledger ID or email before submitting.
               </p>
            </div>
          </div>
        </aside>
      </div>
    </StudentLayout>
  )
}
