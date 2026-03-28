import React from 'react'

export default function Section({ title, subtitle, action, children }) {
  return (
    <section className="space-y-12">
      <div className="flex items-end justify-between border-b border-border/10 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>}
        </div>
        {action && (
          <div className="shrink-0">{action}</div>
        )}
      </div>
      <div className="space-y-0">
        {children}
      </div>
    </section>
  )
}
