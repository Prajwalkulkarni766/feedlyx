import { createContext, useState, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth API functions (mock implementations)
const authAPI = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (credentials.email && credentials.password) {
      return {
        user: {
          id: '1',
          username: credentials.email.split('@')[0],
          email: credentials.email,
          fullName: 'Demo User',
          avatar: null,
          isVerified: true
        },
        token: 'mock_jwt_token_' + Date.now()
      }
    }
    throw new Error('Invalid credentials')
  },

  signup: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (userData.email && userData.password && userData.username) {
      return {
        user: {
          id: '1',
          username: userData.username,
          email: userData.email,
          fullName: userData.fullName || userData.username,
          avatar: null,
          isVerified: false
        },
        token: 'mock_jwt_token_' + Date.now()
      }
    }
    throw new Error('Registration failed')
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return JSON.parse(userData)
    }
    throw new Error('No authenticated user')
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const queryClient = useQueryClient()

  // Query to get current user on app start
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: authAPI.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Update user state when query returns data
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
    }
  }, [currentUser])

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setUser(data.user)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      queryClient.setQueryData(['auth', 'currentUser'], data.user)
    },
    onError: (error) => {
      console.error('Login error:', error)
      throw error
    }
  })

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authAPI.signup,
    onSuccess: (data) => {
      setUser(data.user)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      queryClient.setQueryData(['auth', 'currentUser'], data.user)
    },
    onError: (error) => {
      console.error('Signup error:', error)
      throw error
    }
  })

  const login = async (credentials) => {
    return await loginMutation.mutateAsync(credentials)
  }

  const signup = async (userData) => {
    return await signupMutation.mutateAsync(userData)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    queryClient.setQueryData(['auth', 'currentUser'], null)
    queryClient.clear() // Clear all cached data on logout
  }

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    queryClient.setQueryData(['auth', 'currentUser'], updatedUser)
  }

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading: isLoading || loginMutation.isLoading || signupMutation.isLoading,
    isAuthenticated: !!user,
    loginError: loginMutation.error,
    signupError: signupMutation.error
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}