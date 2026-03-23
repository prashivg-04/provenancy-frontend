'use client'

import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <Layout>
      <div className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mb-8 text-muted-foreground">
            View and manage your work records here.
          </p>
          <Button>View Your Records</Button>
        </div>
      </div>
    </Layout>
  )
}
