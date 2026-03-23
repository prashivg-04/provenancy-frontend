'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SidebarLink {
  href: string
  label: string
  isActive?: boolean
}

interface SidebarProps {
  links: SidebarLink[]
}

export function Sidebar({ links }: SidebarProps) {
  return (
    <aside className="hidden w-64 border-r border-border bg-card md:block">
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-sm font-semibold text-muted-foreground">Menu</h2>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors',
                link.isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
