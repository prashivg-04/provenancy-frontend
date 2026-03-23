'use client'

import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function SubmitPage() {
  return (
    <Layout>
      <div className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 text-3xl font-bold text-foreground">Submit Work Record</h1>
          <p className="mb-8 text-muted-foreground">
            Document your work engagement and submit for supervisor verification.
          </p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Title
              </label>
              <Input placeholder="e.g., Software Engineer Intern" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company/Organization
              </label>
              <Input placeholder="e.g., Acme Corporation" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <Textarea placeholder="Describe your work responsibilities and achievements..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Date
                </label>
                <Input type="date" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Supervisor Email
              </label>
              <Input type="email" placeholder="supervisor@company.com" />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Submit for Verification
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
