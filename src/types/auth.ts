export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'alumni' | 'pending'
  graduationYear: number
  phone?: string
  avatar?: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  graduationYear: number
  phone?: string
}