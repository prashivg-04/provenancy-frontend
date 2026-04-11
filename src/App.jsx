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
import EngagementEdit from './pages/EngagementEdit'
import EngagementDetail from './pages/EngagementDetail'
import Profile from './pages/Profile'
import SupervisorDashboard from './pages/SupervisorDashboard'
import SupervisorRequests from './pages/SupervisorRequests'
import SupervisorProfile from './pages/SupervisorProfile'
import PublicStudentProfile from './pages/PublicStudentProfile'
import PublicSupervisorProfile from './pages/PublicSupervisorProfile'
import PublicEngagementView from './pages/PublicEngagementView'

// Role-based protection wrapper with loading support
function ProtectedRoute({ children, allowedRole = null, checkCompletion = true }) {
  const { user, profile_complete, loading } = useAuth()

  // Don't redirect while initial /me check is in progress
  if (loading) return null

  if (!user) return <Navigate to="/login" />

  // If profile is incomplete, force them to onboarding (unless we are ALREADY there or explicit skip)
  if (checkCompletion && !profile_complete) {
    return <Navigate to="/complete-profile" />
  }

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
  const { user, profile_complete, loading } = useAuth()

  if (loading) return null

  if (!user) return <Navigate to="/login" />
  if (!profile_complete) return <Navigate to="/complete-profile" />
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
          duration: 3500,
          style: {
            background: 'hsl(220 20% 8% / 0.85)',
            backdropFilter: 'blur(16px)',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border)/0.25)',
            borderRadius: '8px',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: '700',
            padding: '14px 18px',
            boxShadow: '0 12px 40px -8px rgba(0,0,0,0.6)',
          },
          success: {
            style: {
              border: '1px solid hsl(142 70% 45% / 0.3)',
              boxShadow: '0 12px 40px -8px rgba(0,0,0,0.6), 0 0 20px rgba(34,197,94,0.08)',
            },
            iconTheme: {
              primary: 'hsl(142 70% 45%)',
              secondary: 'hsl(220 20% 8%)',
            },
          },
          error: {
            style: {
              border: '1px solid hsl(0 70% 50% / 0.3)',
              boxShadow: '0 12px 40px -8px rgba(0,0,0,0.6), 0 0 20px rgba(239,68,68,0.08)',
            },
            iconTheme: {
              primary: 'hsl(0 70% 50%)',
              secondary: 'hsl(220 20% 8%)',
            },
          },
        }} 
      />
      <Routes>
        {/* Public / Generic Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={user ? <RoleBasedRedirect /> : <Layout><Login /></Layout>} />
        <Route path="/signup" element={user ? <RoleBasedRedirect /> : <Layout><Signup /></Layout>} />
        <Route 
          path="/complete-profile" 
          element={
            <ProtectedRoute checkCompletion={false}>
              <Layout><CompleteProfile /></Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* Public Profiles Rendered Inside Layout For Navbar Identity */}
        <Route path="/profile/:id" element={<PublicStudentProfile />} />
        <Route path="/profile/:id/engagement/:engId" element={<PublicEngagementView />} />
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
          path="/student/engagements/:id/edit"
          element={
            <ProtectedRoute allowedRole="student">
              <EngagementEdit />
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
        <Route
          path="/supervisor/engagements/:id"
          element={
            <ProtectedRoute allowedRole="supervisor">
              <EngagementDetail />
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
