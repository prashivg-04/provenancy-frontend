import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CompleteProfile from './pages/CompleteProfile'
import StudentDashboard from './pages/StudentDashboard'
import StudentEngagements from './pages/StudentEngagements'
import StudentSkills from './pages/StudentSkills'
import EngagementCreate from './pages/EngagementCreate'
import EngagementDetail from './pages/EngagementDetail'
import Profile from './pages/Profile'
import SupervisorDashboard from './pages/SupervisorDashboard'
import SupervisorRequests from './pages/SupervisorRequests'
import SupervisorProfile from './pages/SupervisorProfile'
import PublicStudentProfile from './pages/PublicStudentProfile'
import PublicSupervisorProfile from './pages/PublicSupervisorProfile'

// Optional: Role-based protection wrapper
function ProtectedRoute({ children, allowedRole = null }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (allowedRole) {
    if (Array.isArray(allowedRole)) {
      if (!allowedRole.includes(user.role)) return <Navigate to="/" />
    } else {
      if (user.role !== allowedRole) return <Navigate to="/" />
    }
  }
  return children
}

function RoleBasedRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.role === 'supervisor') return <Navigate to="/supervisor/dashboard" />
  return <Navigate to="/student/dashboard" />
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'hsl(var(--muted)/0.1)',
            backdropFilter: 'blur(10px)',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border)/0.2)',
            borderRadius: '4px',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 'bold'
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'transparent',
            },
          },
        }} 
      />
      <Routes>
        {/* Public / Generic Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={user ? <RoleBasedRedirect /> : <Layout><Login /></Layout>} />
        <Route path="/signup" element={user ? <RoleBasedRedirect /> : <Layout><Signup /></Layout>} />
        <Route path="/complete-profile" element={<Layout><CompleteProfile /></Layout>} />
        
        {/* Public Profiles Rendered Inside Layout For Navbar Identity */}
        <Route path="/profile/:id" element={<PublicStudentProfile />} />
        <Route path="/supervisor/:id" element={<PublicSupervisorProfile />} />

        {/* Student Workspace Paths */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/engagements"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentEngagements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/engagements/create"
          element={
            <ProtectedRoute allowedRole="student">
              <EngagementCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/engagements/:id"
          element={
            <ProtectedRoute allowedRole={["student", "supervisor"]}>
              <EngagementDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/skills"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentSkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Supervisor Workspace Paths */}
        <Route
          path="/supervisor/dashboard"
          element={
            <ProtectedRoute allowedRole="supervisor">
              <SupervisorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supervisor/requests"
          element={
            <ProtectedRoute allowedRole="supervisor">
              <SupervisorRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supervisor/profile"
          element={
            <ProtectedRoute allowedRole="supervisor">
              <SupervisorProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
