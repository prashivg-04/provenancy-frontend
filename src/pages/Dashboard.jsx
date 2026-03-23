import { Layout } from '../components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            View and manage your work records here.
          </p>
        </div>
      </section>
    </Layout>
  )
}
