import { useState, useEffect, useRef } from 'react'
import { Plus, X, Search, BadgeCheck, Shield, ChevronRight, Loader2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import StudentLayout from '../components/workspace/StudentLayout'
import { PageContainer } from '../components/workspace/SharedPrimitives'
import { searchSkills, getUserSkills, addDeclaredSkills, deleteDeclaredSkill } from '../lib/api'

export default function StudentSkills() {
  const [declaredSkills, setDeclaredSkills] = useState([])
  const [stagedSkills, setStagedSkills] = useState([])
  const [verifiedSkills, setVerifiedSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [skillToDelete, setSkillToDelete] = useState(null)
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const searchInputRef = useRef(null)

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsSearching(false)
      setDropdownOpen(false)
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true)
      try {
        const { data } = await searchSkills(searchQuery)
        setSearchResults(data)
        setDropdownOpen(true)
      } catch (err) {
        console.error("Search failed", err)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserSkills();
      setDeclaredSkills(data.declared);
      
      const mappedVerified = data.verified.map((v, idx) => ({
        id: `V-ID: ${String(idx + 1).padStart(3, '0')}`,
        name: v.name,
        subtitle: `${v.count} verification${v.count > 1 ? 's' : ''} logged`,
        level: v.count > 3 ? "Gold Standard" : (v.count > 1 ? "Verified Level II" : "Verified Level I"),
        tags: ["Verified"]
      }));
      setVerifiedSkills(mappedVerified);
    } catch (error) {
      console.error("Failed to load skills", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = (skill) => {
    const nameMatch = (s) => s.name.toLowerCase() === skill.name.toLowerCase();
    if (!declaredSkills.find(nameMatch) && !stagedSkills.find(nameMatch)) {
      setStagedSkills([...stagedSkills, skill]);
      setHasChanges(true);
    }
  };

  const handleRemoveSkill = async (skillObj) => {
    const isStaged = stagedSkills.find(s => s.name === skillObj.name);
    if (isStaged) {
      const newStaged = stagedSkills.filter(s => s.name !== skillObj.name);
      setStagedSkills(newStaged);
      if (newStaged.length === 0) setHasChanges(false);
      toast.success(`${skillObj.name} removed from staging`);
    } else {
      try {
        await deleteDeclaredSkill(skillObj.id);
        toast.success(`${skillObj.name} removed`);
        fetchSkills();
      } catch (err) {
        toast.error(err.response?.data?.detail || "Failed to remove skill");
      }
    }
    setSkillToDelete(null);
  };

  const handleSave = async () => {
    try {
      if (stagedSkills.length > 0) {
        await addDeclaredSkills(stagedSkills.map(s => s.name));
        toast.success("Skills successfully saved to your registry!");
        setStagedSkills([]);
        setHasChanges(false);
        fetchSkills();
      }
    } catch (err) {
      toast.error("Failed to save skills");
    }
    setSaveModalOpen(false);
  };

  return (
    <StudentLayout>
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <PageContainer>
            
            {/* 
              =============================================
              HEADER
              =============================================
            */}
            <div className="mb-12 relative border-b border-border/10 pb-8 pt-4">
              <div className="absolute inset-x-0 top-0 h-40 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit">
                   <Shield className="w-3 h-3 text-primary" />
                   <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Cryptographic Registry</span>
                </div>
                
                {/* Search / Filter Utility */}
                <div className="hidden sm:flex items-center gap-2 bg-background/50 border border-border/50 rounded-full px-4 py-2 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search ledger..." 
                    className="bg-transparent border-0 text-xs text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none w-48"
                  />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Skill Repository</h1>
              <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                A dual-layered ledger representing both professional aspirations and institutional validations. All verified skills are backed by immutable cryptographic signatures.
              </p>
            </div>

            <div className="space-y-16">
              
              {/* 
                =============================================
                VERIFIED SKILLS (BENTO GRID)
                =============================================
              */}
              <section className="space-y-8">
                <div className="flex items-end justify-between border-b border-border/20 pb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-tight text-foreground flex items-center gap-3">
                      Verified Assets
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-[10px] font-bold text-primary tracking-widest border border-primary/20">
                        {verifiedSkills.length}
                      </div>
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Institutional Proof of Competence</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verifiedSkills.map((skill, i) => (
                    <div key={i} className="bg-card/30 backdrop-blur-md border border-border/50 p-6 rounded-2xl flex flex-col justify-between min-h-[180px] group hover:border-primary/40 hover:shadow-[0_0_30px_rgba(26,35,126,0.1)] transition-all cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <span className="text-[10px] tracking-widest text-muted-foreground font-mono font-semibold">{skill.id}</span>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded border border-primary/20">
                          <BadgeCheck className="w-3 h-3 text-primary" />
                          <span className="text-[9px] font-bold text-primary tracking-widest uppercase">Verified</span>
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <h4 className="text-2xl font-light mb-2 text-foreground group-hover:text-primary transition-colors capitalize">{skill.name}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{skill.subtitle}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {skill.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 text-[9px] uppercase tracking-widest font-bold text-muted-foreground bg-muted/30 border border-border/20 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Request Verification Action Card */}
                  <div className="bg-primary/5 border border-dashed border-primary/30 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[180px] group hover:bg-primary/10 hover:border-primary/60 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Plus className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] text-primary font-bold uppercase group-hover:text-foreground transition-colors">Request Verification</span>
                  </div>
                </div>
              </section>

              {/* 
                =============================================
                DECLARED SKILLS
                =============================================
              */}
              <section className="space-y-8 bg-card/10 border border-border/20 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/20 pointer-events-none"></div>
                
                <div className="flex items-center justify-between relative z-10 border-b border-border/10 pb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-tight text-foreground flex items-center gap-3">
                      Declared Assets
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Self-attested pending validation</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAddModalOpen(true)
                      setTimeout(() => searchInputRef.current?.focus(), 100)
                    }}
                    className="flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2.5 rounded-xl transition-all border border-primary/20 hover:border-primary text-[10px] uppercase tracking-widest font-bold">
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add Competency</span>
                  </button>
                </div>
                
                <div className="flex flex-col gap-4 relative z-10 pt-2">
                  <div className="flex flex-wrap gap-3">
                    {(stagedSkills.length === 0 && declaredSkills.length === 0) && (
                      <div className="text-xs text-muted-foreground italic w-full p-4 text-center rounded-lg border border-dashed border-border/30">
                        No competencies declared yet. Start typing below to add.
                      </div>
                    )}
                    {stagedSkills.map((skill, i) => (
                      <div key={`staged-${i}`} className="group px-4 py-3 bg-primary/10 border border-primary/40 rounded-xl flex items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-xl"></div>
                        <span className="text-sm font-semibold text-primary transition-colors flex items-center gap-3 relative z-10 capitalize">
                           {skill.name} 
                           <span className="text-[9px] uppercase tracking-wider font-bold bg-primary/20 border border-primary/30 px-2 py-0.5 rounded text-primary">Pending Save</span>
                        </span>
                        <button 
                          onClick={() => setSkillToDelete(skill)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors z-10"
                        >
                          <X className="w-3.5 h-3.5 text-primary/60 group-hover:text-destructive transition-colors" />
                        </button>
                      </div>
                    ))}
                    {declaredSkills.map((skill, i) => (
                      <div key={`decl-${i}`} className="group px-4 py-2 bg-card/60 backdrop-blur-sm border border-border/80 hover:border-primary/50 flex items-center justify-between gap-4 rounded-xl transition-all shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-default relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <div className="flex items-center gap-3 relative z-10">
                           <div className="w-7 h-7 rounded-full bg-muted/40 border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30 flex items-center justify-center transition-colors">
                             <Shield className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                           </div>
                           <span className="text-sm font-semibold text-foreground tracking-wide group-hover:text-primary transition-colors capitalize">{skill.name}</span>
                        </div>
                        <button 
                          onClick={() => setSkillToDelete(skill)}
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-muted/50 hover:bg-destructive/10 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10"
                        >
                          <X className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-destructive transition-colors" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Save Button */}
                  {hasChanges && (
                    <div className="pt-6 mt-2 border-t border-border/10 flex justify-end">
                       <button
                        onClick={() => setSaveModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-md hover:-translate-y-0.5"
                       >
                         <Save className="w-3.5 h-3.5" />
                         Save Configured Assets
                       </button>
                    </div>
                  )}
                </div>
              </section>

            </div>
          </PageContainer>
        </div>

        {/* 
          =============================================
          RIGHT INFO PANEL 
          =============================================
        */}
        <aside className="w-80 lg:w-96 border-l border-border/10 bg-card/10 backdrop-blur-md p-8 hidden xl:flex flex-col gap-12 static right-0 top-0 shadow-[-10px_0_30px_rgba(0,0,0,0.2)]">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-8">Registry Stats</h3>
            
            <div className="space-y-6">
              <div className="bg-background/40 p-5 rounded-xl border border-border/30">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold block mb-2">Total Verifications</span>
                <div className="text-4xl font-light text-foreground">32</div>
              </div>
              
              <div className="bg-background/40 p-5 rounded-xl border border-border/30">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold block mb-2">Unique Endorsers</span>
                <div className="text-4xl font-light text-foreground">11</div>
              </div>
              
              <div className="bg-primary/10 p-5 rounded-xl border border-primary/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/20 rounded-full blur-[20px] group-hover:bg-primary/30 transition-all"></div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold block mb-2 relative z-10">Network Trust Score</span>
                <div className="text-4xl font-light text-primary relative z-10">94<span className="text-lg opacity-50">/100</span></div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
             <div className="flex items-center gap-3 p-4 bg-muted/10 border border-border/20 rounded-xl cursor-pointer hover:bg-muted/20 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-background border border-border/30 flex items-center justify-center shrink-0">
                 <Shield className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
               </div>
               <div className="flex-1">
                 <h4 className="text-xs font-bold text-foreground">Export Ledger</h4>
                 <p className="text-[10px] text-muted-foreground">Download verifiable JSON</p>
               </div>
               <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
             </div>
          </div>
        </aside>
      </div>

      {/* Delete Confirmation Modal */}
      {skillToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSkillToDelete(null)} 
          />
          <div className="relative w-full max-w-sm bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-light mb-2 text-foreground">Remove Asset?</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Are you sure you want to remove <span className="font-semibold text-foreground">"{skillToDelete?.name}"</span> from your declared assets?
            </p>
            <div className="flex justify-end gap-3 mt-2">
              <button 
                onClick={() => setSkillToDelete(null)}
                className="px-4 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-xs font-bold uppercase tracking-widest text-foreground transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleRemoveSkill(skillToDelete)
                  setSkillToDelete(null)
                }}
                className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSaveModalOpen(false)} 
          />
          <div className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-light mb-2 text-foreground">Save Registration?</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              You are about to save changes to your cryptographic registry. This process adds these competencies as pending-verification skills to your public profile.
            </p>
            <div className="flex justify-end gap-3 mt-2">
              <button 
                onClick={() => setSaveModalOpen(false)}
                className="px-4 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-xs font-bold uppercase tracking-widest text-foreground transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleSave()
                  setSaveModalOpen(false)
                }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-md"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Competency Modal UI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsAddModalOpen(false)} 
          />
          <div className="relative w-full max-w-2xl bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border-t-primary/20 animate-in fade-in zoom-in duration-200">
            {/* Search Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border/10 bg-muted/10">
              <Search className="w-5 h-5 text-primary/80" />
              <input 
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search and add competencies..."
                className="flex-1 bg-transparent text-lg border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50 outline-none w-full"
              />
              {isSearching && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-background rounded-full transition-colors hidden sm:block"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            {/* Search Results Area */}
            {searchQuery.trim() && searchResults.length > 0 && (
              <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                <ul className="py-2">
                  {searchResults.map((result) => {
                    const isSelected = !!declaredSkills.find(s => s.name === result.name) || !!stagedSkills.find(s => s.name === result.name);
                    return (
                      <li 
                        key={result.id}
                        onClick={() => !isSelected && handleAddSkill(result)}
                        className={`px-6 py-4 flex items-center justify-between transition-colors border-b border-border/5 last:border-0 group ${isSelected ? 'opacity-50 cursor-not-allowed bg-muted/5' : 'hover:bg-primary/5 cursor-pointer'}`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-foreground capitalize">{result.name}</span>
                          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">{result.id.substring(0, 8)} • System Asset</span>
                        </div>
                        {!isSelected ? (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/20 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm">
                            <Plus className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded border border-primary/20">
                            <BadgeCheck className="w-3 h-3 text-primary" />
                            <span className="text-[9px] font-bold text-primary tracking-widest uppercase">Added</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {searchQuery.trim() && searchResults.length === 0 && !isSearching && (
              <div className="p-12 text-center flex flex-col items-center justify-center text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                  <Search className="w-5 h-5 opacity-50" />
                </div>
                <p className="text-sm">No exact match found.</p>
                <p className="text-xs opacity-70 mt-1">Creation flow for new competencies coming soon.</p>
              </div>
            )}
            
            {!searchQuery.trim() && (
              <div className="p-12 text-center flex flex-col items-center justify-center text-muted-foreground">
                 <div className="w-12 h-12 border border-border/20 rounded-xl bg-background/50 flex items-center justify-center mb-4">
                   <Shield className="w-5 h-5 opacity-40" />
                 </div>
                 <p className="text-sm">Type to explore the global competency registry</p>
              </div>
            )}
            
            {/* Selected tags footer contextualizer */}
            {stagedSkills.length > 0 && (
               <div className="p-6 bg-background border-t border-border/10">
                 <div className="flex items-center justify-between mb-3">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Currently Staged</h4>
                   <span className="text-[10px] text-muted-foreground/60 font-mono">{stagedSkills.length} selected</span>
                 </div>
                 <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto no-scrollbar">
                   {stagedSkills.map(skill => (
                      <div key={skill.name} className="px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-2 group/tag">
                         <span className="text-xs font-semibold text-primary capitalize">{skill.name}</span>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation()
                             handleRemoveSkill(skill)
                           }}
                           className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                         >
                           <X className="w-3 h-3 text-primary/50 hover:text-primary" />
                         </button>
                      </div>
                   ))}
                 </div>
                 <div className="mt-6 flex justify-end">
                   <button
                     onClick={() => setIsAddModalOpen(false)}
                     className="px-6 py-2 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-foreground/90 transition-all shadow-md hover:-translate-y-0.5"
                   >
                     Confirm Selection
                   </button>
                 </div>
               </div>
            )}
          </div>
        </div>
      )}
    </StudentLayout>
  )
}
