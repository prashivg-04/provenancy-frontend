import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout({ children, withSidebar = false }) {
  return (
    <div className="flex flex-col h-screen text-foreground bg-background overflow-hidden selection:bg-primary/20">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {withSidebar && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
