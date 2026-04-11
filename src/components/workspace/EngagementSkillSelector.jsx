import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search, X, Plus, BadgeCheck, Loader2, Check, Sparkles } from 'lucide-react'
import { getUserSkills, searchSkills } from '../../lib/api'

/**
 * EngagementSkillSelector
 *
 * Compact chip display + "Add Skill" button that opens a modal.
 * Modal shows the student's own skills as quick-pick chips + a search box
 * for adding skills from the global pool.
 *
 * Props:
 *   selectedSkills: string[]       — currently selected skill names (lowercase)
 *   onChange: (skills: string[])   — called with the new full selection array
 */
export default function EngagementSkillSelector({ selectedSkills = [], onChange }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [userSkills, setUserSkills] = useState({ declared: [], verified: [] })
  const [loadingUser, setLoadingUser] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const searchRef = useRef(null)

  // Load student's skill pool when modal opens (only once)
  const hasFetched = useRef(false)
  useEffect(() => {
    if (modalOpen && !hasFetched.current) {
      setLoadingUser(true)
      hasFetched.current = true
      getUserSkills()
        .then(res => setUserSkills(res.data))
        .catch(() => {})
        .finally(() => setLoadingUser(false))
    }
    if (modalOpen) {
      setTimeout(() => searchRef.current?.focus(), 80)
    }
  }, [modalOpen])

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    const t = setTimeout(async () => {
      setSearching(true)
      try {
        const { data } = await searchSkills(searchQuery)
        setSearchResults(data)
      } catch {
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 280)
    return () => clearTimeout(t)
  }, [searchQuery])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    if (modalOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  const closeModal = () => {
    setModalOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const isSelected = (name) => selectedSkills.includes(name.toLowerCase())

  const toggleSkill = (name) => {
    const norm = name.toLowerCase()
    if (isSelected(norm)) {
      onChange(selectedSkills.filter(s => s !== norm))
    } else {
      onChange([...selectedSkills, norm])
    }
  }

  // Deduped pool — verified first, then declared
  const verifiedNames = userSkills.verified.map(s => s.name.toLowerCase())
  const declaredNames = userSkills.declared.map(s => s.name.toLowerCase())
  const allUserSkillNames = [
    ...new Set([...verifiedNames, ...declaredNames])
  ]

  // If searching, show results; otherwise show the student's own pool
  const showSearch = searchQuery.trim().length > 0

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground pl-1">
        Skills Applied
      </label>

      {/* Selected chips + Add button */}
      <div className="flex flex-wrap gap-2 items-center min-h-[36px]">
        {selectedSkills.map(skill => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary rounded-lg"
          >
            {skill}
            <button
              type="button"
              onClick={() => toggleSkill(skill)}
              className="text-primary/50 hover:text-destructive transition-colors"
              aria-label={`Remove ${skill}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-dashed border-border/50 hover:border-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
        >
          <Plus className="w-3 h-3" />
          Add Skill
        </button>
      </div>

      {/* ─── Modal (portal) ─── */}
      {modalOpen && createPortal(
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/10 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <h2 className="text-sm font-bold text-foreground tracking-tight">Add Skills</h2>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {selectedSkills.length} selected · Click to toggle
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-border/10 shrink-0">
              <div className="flex items-center gap-3 bg-background/60 border border-border/40 rounded-xl px-4 py-2.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search all skills (e.g. Python, Machine Learning...)"
                  className="flex-1 text-sm text-foreground placeholder:text-muted-foreground/50 bg-transparent border-0 focus:outline-none focus:ring-0"
                />
                {searching && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground shrink-0" />}
                {searchQuery && !searching && (
                  <button type="button" onClick={() => setSearchQuery('')}>
                    <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Content — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {/* Always show selected strip if anything is selected */}
              {selectedSkills.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                    Selected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map(name => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleSkill(name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg border bg-primary/10 border-primary/30 text-primary transition-all hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive group"
                      >
                        <Check className="w-3 h-3 shrink-0 group-hover:hidden" />
                        <X className="w-3 h-3 shrink-0 hidden group-hover:block" />
                        {name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-border/10" />
                </div>
              )}

              {showSearch ? (
                /* Search results */
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                    {searching ? 'Searching...' : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`}
                  </p>
                  {searchResults.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {searchResults.map(skill => {
                        const selected = isSelected(skill.name)
                        return (
                          <button
                            key={skill.id}
                            type="button"
                            onClick={() => toggleSkill(skill.name)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${
                              selected
                                ? 'bg-primary/10 border-primary/30 text-primary'
                                : 'bg-background/50 border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-card'
                            }`}
                          >
                            {selected && <Check className="w-3 h-3 shrink-0" />}
                            {skill.name}
                          </button>
                        )
                      })}
                    </div>
                  ) : !searching ? (
                    <p className="text-sm text-muted-foreground italic">No results for "{searchQuery}"</p>
                  ) : null}
                </div>
              ) : (
                /* Student's own skill pool */
                loadingUser ? (
                  <div className="flex items-center gap-3 py-4">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Loading your skills...</span>
                  </div>
                ) : allUserSkillNames.length > 0 ? (
                  <div className="space-y-5">
                    {verifiedNames.length > 0 && (
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-3 flex items-center gap-2">
                          <BadgeCheck className="w-3 h-3 text-primary" />
                          Verified Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {verifiedNames.map(name => {
                            const selected = isSelected(name)
                            return (
                              <button
                                key={name}
                                type="button"
                                onClick={() => toggleSkill(name)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${
                                  selected
                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                    : 'bg-background/50 border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-card'
                                }`}
                              >
                                {selected ? <Check className="w-3 h-3 shrink-0" /> : <BadgeCheck className="w-3 h-3 shrink-0 text-primary/50" />}
                                {name}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {declaredNames.length > 0 && (
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
                          Declared Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {declaredNames.map(name => {
                            const selected = isSelected(name)
                            return (
                              <button
                                key={name}
                                type="button"
                                onClick={() => toggleSkill(name)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${
                                  selected
                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                    : 'bg-background/50 border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-card'
                                }`}
                              >
                                {selected && <Check className="w-3 h-3 shrink-0" />}
                                {name}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground mb-1">No skills in your profile yet.</p>
                    <p className="text-[10px] text-muted-foreground/60">Use the search box above to find and add skills.</p>
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/10 bg-muted/5 flex items-center justify-between shrink-0">
              <span className="text-[10px] text-muted-foreground font-mono">
                {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      , document.body)}
    </div>
  )
}
