import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { handleError } from '../lib/handleError'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [loading, setLoading] = useState(true) // true during initial /me check

  /**
   * Hydrate state from GET /auth/me.
   * Called on mount (if token exists) and after login/signup/complete-profile.
   */
  const fetchMe = useCallback(async () => {
    try {
      const res = await api.get('/auth/me')
      const data = res.data
      setUser(data.user)
      setProfile(data.profile)
      setProfileComplete(data.profile_complete)
      return data
    } catch (error) {
      // On 401, clear everything
      if (error.response?.status === 401) {
        localStorage.removeItem('provenancy_token')
        setUser(null)
        setProfile(null)
        setProfileComplete(false)
      } else {
        handleError(error)
      }
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Check for existing token on app mount.
   */
  useEffect(() => {
    const token = localStorage.getItem('provenancy_token')
    if (token) {
      fetchMe()
    } else {
      setLoading(false)
    }
  }, [fetchMe])

  /**
   * Register a new user.
   * POST /auth/register
   *
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   * @param {string} role - "student" | "supervisor"
   * @returns {boolean} true on success, false on error
   */
  const signup = async (fullName, email, password, role) => {
    try {
      const res = await api.post('/auth/register', {
        full_name: fullName,
        email,
        password,
        role,
      })

      // Store token immediately
      localStorage.setItem('provenancy_token', res.data.access_token)

      // Hydrate full state from /me
      await fetchMe()

      toast.success('Account created successfully')
      return true
    } catch (error) {
      handleError(error)
      return false
    }
  }

  /**
   * Login an existing user.
   * POST /auth/login
   *
   * @param {string} email
   * @param {string} password
   * @returns {{ role: string, profile_complete: boolean } | null}
   */
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })

      // Store token
      localStorage.setItem('provenancy_token', res.data.access_token)

      // Hydrate full state from /me
      const meData = await fetchMe()

      if (!meData) return null

      toast.success('Welcome back')
      return {
        role: meData.user.role,
        profile_complete: meData.profile_complete,
      }
    } catch (error) {
      handleError(error)
      return null
    }
  }

  /**
   * Complete or update the user profile.
   * PUT /auth/complete-profile
   *
   * @param {object} data - Role-appropriate fields (snake_case)
   * @returns {boolean} true on success, false on error
   */
  const completeProfile = async (data) => {
    try {
      await api.put('/auth/complete-profile', data)

      // Refresh state from /me to get updated profile
      await fetchMe()

      toast.success('Profile activated')
      return true
    } catch (error) {
      handleError(error)
      return false
    }
  }

  /**
   * Logout the current user.
   * POST /auth/logout — fire and forget.
   * Always clears local state regardless of server response.
   */
  const logout = async () => {
    // Fire and forget — ignore errors
    try {
      await api.post('/auth/logout')
    } catch {
      // Intentionally ignored
    }

    // Always clear local state
    localStorage.removeItem('provenancy_token')
    setUser(null)
    setProfile(null)
    setProfileComplete(false)
    toast.success('Signed out')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        profile_complete: profileComplete,
        loading,
        signup,
        login,
        logout,
        completeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
