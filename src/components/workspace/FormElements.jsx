import { Plus, Check } from 'lucide-react'

export function FormSection({ title, subTitle, number, children }) {
  return (
    <section className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-10 pb-6 border-b border-border/20 relative z-10 gap-2">
        <h2 className="text-xl sm:text-2xl font-light tracking-tight text-foreground flex items-center gap-4">
          {number && <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-[11px] font-bold text-primary tracking-widest border border-primary/20 shrink-0">{number}</span>}
          {title}
        </h2>
        {subTitle && !number && <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">{subTitle}</span>}
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

export function InputField({ label, type = "text", placeholder, className = "", ...props }) {
  return (
    <div className={`flex flex-col space-y-2.5 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground pl-1">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm focus-within:shadow-[0_0_15px_rgba(26,35,126,0.1)]"
        {...props}
      />
    </div>
  )
}

export function TextArea({ label, placeholder, rows = 3, className = "", ...props }) {
  return (
    <div className={`flex flex-col space-y-2.5 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground pl-1">{label}</label>
      <textarea 
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm focus-within:shadow-[0_0_15px_rgba(26,35,126,0.1)] resize-y min-h-[100px]"
        {...props}
      />
    </div>
  )
}

export function SkillSelector({ label, selectedSkills = [], availableTags = [], onAddClick }) {
  return (
    <div className="flex flex-col space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground pl-1">{label}</label>
      <div className="flex flex-wrap gap-2.5 bg-background/30 p-4 rounded-xl border border-border/30">
        {selectedSkills.map((skill, index) => (
          <div key={index} className="px-3 py-1.5 bg-primary/10 border border-primary/30 text-[10px] font-bold uppercase tracking-widest text-primary rounded shadow-[0_0_10px_rgba(26,35,126,0.1)] flex items-center gap-1.5 cursor-default">
            <Check className="w-3 h-3 text-primary" /> {skill}
          </div>
        ))}
        {availableTags.map((tag, index) => (
          <div key={index} className="px-3 py-1.5 bg-card border border-border/50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground rounded cursor-pointer hover:border-primary/40 hover:bg-card/80 transition-all shadow-sm">
            {tag}
          </div>
        ))}
        <button 
          type="button" 
          onClick={onAddClick}
          className="px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary border border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/5 rounded cursor-pointer transition-all"
        >
          <Plus className="w-3 h-3" /> Add Skill
        </button>
      </div>
    </div>
  )
}
