import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Provenancy
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              A supervisor-verified work record system for students and professionals. Build trust through structured documentation.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/submit">
                <Button size="lg">Submit Work Record</Button>
              </Link>
              <Link to="/verify">
                <Button size="lg" variant="outline">Verify Records</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-2xl font-bold text-foreground">How It Works</h2>
          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="border-l-2 border-accent pl-6">
              <h3 className="mb-2 font-semibold text-foreground">Submit Your Work</h3>
              <p className="text-muted-foreground">
                Document your work engagements with detailed descriptions, dates, and supervisor information. Create a professional record of your experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-l-2 border-accent pl-6">
              <h3 className="mb-2 font-semibold text-foreground">Supervisor Verification</h3>
              <p className="text-muted-foreground">
                Your supervisor reviews and verifies your work records, adding credibility and institutional trust to your professional profile.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border-l-2 border-accent pl-6">
              <h3 className="mb-2 font-semibold text-foreground">Portable Credentials</h3>
              <p className="text-muted-foreground">
                Share your verified work records with employers and institutions. A transparent, tamper-proof record of your professional accomplishments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Get Started?</h2>
          <p className="mb-8 text-muted-foreground">
            Join students and professionals who trust Provenancy for verified work records.
          </p>
          <Link to="/submit">
            <Button size="lg">Create Your First Record</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2024 Provenancy. Verified work records, built on trust.
          </p>
        </div>
      </footer>
    </Layout>
  )
}
