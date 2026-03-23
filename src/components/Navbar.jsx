import { Link } from 'react-router-dom'
import { Button } from './ui/Button'

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-foreground">
          Provenancy
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/submit">
            <Button>Submit</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
