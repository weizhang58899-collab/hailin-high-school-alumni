import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  approveAlumni: (userId: string) => void
  rejectAlumni: (userId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@hailin.edu',
    name: '管理员',
    role: 'admin',
    graduationYear: 2000,
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'alumni1@example.com',
    name: '张三',
    role: 'alumni',
    graduationYear: 2010,
    status: 'active',
    createdAt: '2024-01-02'
  }
]

const pendingUsers: User[] = []

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('alumni_user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      })
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = mockUsers.find(u => u.email === credentials.email)
    
    if (user && credentials.password === 'password') { // Simple demo password
      localStorage.setItem('alumni_user', JSON.stringify(user))
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      })
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      throw new Error('邮箱或密码错误')
    }
  }

  const register = async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      role: 'pending',
      status: 'active',
      createdAt: new Date().toISOString()
    }
    
    pendingUsers.push(newUser)
    localStorage.setItem('alumni_pending_users', JSON.stringify(pendingUsers))
    
    setAuthState(prev => ({ ...prev, isLoading: false }))
    
    // Auto-login after registration
    localStorage.setItem('alumni_user', JSON.stringify(newUser))
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    })
  }

  const logout = () => {
    localStorage.removeItem('alumni_user')
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  const approveAlumni = (userId: string) => {
    const pending = JSON.parse(localStorage.getItem('alumni_pending_users') || '[]')
    const userIndex = pending.findIndex((u: User) => u.id === userId)
    
    if (userIndex !== -1) {
      const user = { ...pending[userIndex], role: 'alumni' }
      pending.splice(userIndex, 1)
      mockUsers.push(user)
      
      localStorage.setItem('alumni_pending_users', JSON.stringify(pending))
      
      // Update current user if they were approved
      if (authState.user?.id === userId) {
        setAuthState(prev => ({
          ...prev,
          user: { ...prev.user!, role: 'alumni' }
        }))
        localStorage.setItem('alumni_user', JSON.stringify({ ...authState.user!, role: 'alumni' }))
      }
    }
  }

  const rejectAlumni = (userId: string) => {
    const pending = JSON.parse(localStorage.getItem('alumni_pending_users') || '[]')
    const userIndex = pending.findIndex((u: User) => u.id === userId)
    
    if (userIndex !== -1) {
      pending.splice(userIndex, 1)
      localStorage.setItem('alumni_pending_users', JSON.stringify(pending))
      
      // Logout user if they were rejected
      if (authState.user?.id === userId) {
        logout()
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      approveAlumni,
      rejectAlumni
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}