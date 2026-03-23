import { Layout } from '../components/Layout'
import { Button } from '../components/ui/Button'

export default function Verify() {
  const pendingRecords = [
    {
      id: 1,
      name: 'John Smith',
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      submittedDate: '2024-03-20',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      jobTitle: 'Product Manager',
      company: 'StartUp Inc',
      submittedDate: '2024-03-19',
    },
  ]

  return (
    <Layout>
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            Verify Work Records
          </h1>
          <p className="mb-8 text-muted-foreground">
            Review and verify pending work records from your employees.
          </p>

          <div className="space-y-4">
            {pendingRecords.map(record => (
              <div key={record.id} className="rounded-md border border-border bg-secondary/30 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {record.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {record.jobTitle} at {record.company}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Submitted: {record.submittedDate}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="default" size="sm">
                    Verify
                  </Button>
                  <Button variant="outline" size="sm">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
