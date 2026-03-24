import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password, role) => {
    setUser({
      email,
      role,
      id: 'user-' + Math.random().toString(36).substr(2, 9),
    })
  }

  const signup = (fullName, email, role, password) => {
    setUser({
      fullName,
      email,
      role,
      id: 'user-' + Math.random().toString(36).substr(2, 9),
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
