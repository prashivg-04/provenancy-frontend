import { Navbar } from './Navbar'

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl">
        {children}
      </main>
    </div>
  )
}
