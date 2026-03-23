'use client'

import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function VerifyPage() {
  return (
    <Layout>
      <div className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-foreground">Verify Records</h1>
          <p className="mb-8 text-muted-foreground">
            As a supervisor, review and verify work records submitted to you.
          </p>
          
          <div className="space-y-4">
            <div className="border border-border rounded-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Pending Verification</h3>
                  <p className="text-sm text-muted-foreground mt-1">No pending records at this time</p>
                </div>
              </div>
            </div>
          </div>

          <Button className="mt-8">Sign In as Supervisor</Button>
        </div>
      </div>
    </Layout>
  )
}
