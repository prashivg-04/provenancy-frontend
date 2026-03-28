import { Plus } from 'lucide-react'

export function FormSection({ title, subTitle, number, children }) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-xl font-medium text-foreground">{title}</h2>
        {number && <span className="text-[10px] text-muted-foreground/60 tracking-widest uppercase">Section {number}</span>}
        {subTitle && !number && <span className="text-[10px] text-muted-foreground/60 tracking-widest uppercase">{subTitle}</span>}
      </div>
      {children}
    </section>
  )
}

export function InputField({ label, type = "text", placeholder, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-bold">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="text-foreground placeholder:text-muted bg-transparent border-0 border-b border-border/20 rounded-none px-0 focus:ring-0 focus:border-primary focus:border-b-2 transition-all w-full"
      />
    </div>
  )
}

export function TextArea({ label, placeholder, rows = 3, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-bold">{label}</label>
      <textarea 
        rows={rows}
        placeholder={placeholder}
        className="text-foreground placeholder:text-muted bg-transparent border-0 border-b border-border/20 rounded-none px-0 focus:ring-0 focus:border-primary focus:border-b-2 transition-all w-full resize-none"
      />
    </div>
  )
}

export function SkillSelector({ label, selectedSkills = [], availableTags = [], onAddClick }) {
  return (
    <div className="flex flex-col">
      <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4 font-bold">{label}</label>
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill, index) => (
          <div key={index} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs rounded-full">
            {skill}
          </div>
        ))}
        {availableTags.map((tag, index) => (
          <div key={index} className="px-3 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full cursor-pointer hover:border-border/30 transition-colors border border-transparent">
            {tag}
          </div>
        ))}
        <button 
          type="button" 
          onClick={onAddClick}
          className="px-3 py-1 bg-muted/20 flex items-center gap-1 text-muted-foreground text-xs rounded-full cursor-pointer hover:border-border/30 transition-colors border border-transparent"
        >
          <Plus className="w-3 h-3" /> Add Skill
        </button>
      </div>
    </div>
  )
}
