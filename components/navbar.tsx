'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-foreground">
          Provenancy
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Submit Work
          </Link>
          <Link href="/verify" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Verify Records
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="md:flex hidden">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
