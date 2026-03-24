import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function StudentDashboard() {
  const { user, logout } = useAuth()

  const myRecords = [
    {
      id: 1,
      title: 'Software Engineering Internship',
      company: 'Tech Corp',
      duration: '3 months',
      status: 'verified',
      supervisor: 'John Smith',
    },
    {
      id: 2,
      title: 'Research Assistant',
      company: 'University Lab',
      duration: '6 months',
      status: 'pending',
      supervisor: 'Dr. Jane Doe',
    },
    {
      id: 3,
      title: 'Web Development Project',
      company: 'StartUp Inc',
      duration: '2 months',
      status: 'rejected',
      supervisor: 'Mike Johnson',
    },
  ]

  const stats = {
    verified: 5,
    pending: 2,
    hours: '240+',
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border/20 bg-background/95 backdrop-blur z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-bold">✓</span>
          </div>
          <span className="font-semibold tracking-tight text-lg">Provenancy</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            🔔
          </button>
          <button
            onClick={logout}
            className="text-sm px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome, {user?.fullName || 'Student'}</h1>
            <p className="text-muted-foreground">Manage and track your verified work records</p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border/20 rounded-lg p-8">
              <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase mb-4">Verified Records</p>
              <span className="text-4xl font-bold text-primary">{stats.verified}</span>
              <p className="text-xs text-muted-foreground mt-2">100% verified by supervisors</p>
            </div>

            <div className="bg-card border border-border/20 rounded-lg p-8">
              <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase mb-4">Pending Review</p>
              <span className="text-4xl font-bold text-foreground">{stats.pending}</span>
              <p className="text-xs text-muted-foreground mt-2">Awaiting supervisor approval</p>
            </div>

            <div className="bg-card border border-border/20 rounded-lg p-8">
              <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase mb-4">Total Hours</p>
              <span className="text-4xl font-bold text-accent">{stats.hours}</span>
              <p className="text-xs text-muted-foreground mt-2">Logged and documented</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-12">
            <Link
              to="/submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Submit New Record
            </Link>
            <button className="px-6 py-3 bg-secondary/20 text-secondary rounded-lg font-semibold hover:bg-secondary/30 transition-colors">
              View Public Profile
            </button>
          </div>

          {/* Records Table */}
          <div className="bg-card border border-border/20 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-border/20">
              <h2 className="text-lg font-semibold">Your Work Records</h2>
            </div>

            <div className="divide-y divide-border/20">
              {myRecords.map((record) => (
                <div key={record.id} className="p-6 hover:bg-secondary/10 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{record.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {record.company} • {record.duration}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
                        record.status === 'verified'
                          ? 'bg-primary/20 text-primary'
                          : record.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {record.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-muted-foreground">Supervisor: {record.supervisor}</p>
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-secondary/10 border border-border/20 rounded-lg p-8">
            <h3 className="text-sm font-semibold mb-4 text-foreground">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">1. Submit</p>
                <p className="text-sm text-muted-foreground">Create a detailed record of your work experience with dates and descriptions.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">2. Verify</p>
                <p className="text-sm text-muted-foreground">Your supervisor reviews and approves the record with a digital signature.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">3. Share</p>
                <p className="text-sm text-muted-foreground">Share your verified achievements with employers via a secure, immutable link.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card px-8 py-8 text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        <p>© 2024 Provenancy. Building the infrastructure for professional trust.</p>
      </footer>
    </div>
  )
}
