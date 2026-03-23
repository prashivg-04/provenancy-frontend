import { useState } from 'react'
import { Layout } from '../components/Layout'
import { Button } from '../components/ui/Button'

export default function Submit() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    supervisorEmail: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Work record submitted successfully!')
  }

  return (
    <Layout>
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            Submit Work Record
          </h1>
          <p className="mb-8 text-muted-foreground">
            Document your work experience with supervisor verification.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g., Software Engineer"
                className="w-full rounded-md border border-border bg-input px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Acme Corp"
                className="w-full rounded-md border border-border bg-input px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border bg-input px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your responsibilities and achievements..."
                rows="6"
                className="w-full rounded-md border border-border bg-input px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {/* Supervisor Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Supervisor Email
              </label>
              <input
                type="email"
                name="supervisorEmail"
                value={formData.supervisorEmail}
                onChange={handleChange}
                placeholder="supervisor@company.com"
                className="w-full rounded-md border border-border bg-input px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full">
              Submit for Verification
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  )
}
