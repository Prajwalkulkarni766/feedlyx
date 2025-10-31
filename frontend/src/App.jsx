import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import AppShell from './components/layout/AppShell'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LazyLoader from './components/lazy/LazyLoader'
import { FadeTransition, PageLoader } from './components/animations'
import { useState, useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

// Lazy load pages
const Login = lazy(() => import('./pages/Auth/Login'))
const Signup = lazy(() => import('./pages/Auth/Signup'))
const Home = lazy(() => import('./pages/Home/Home'))
const CreatePost = lazy(() => import('./pages/CreatePost/CreatePost'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Explore = lazy(() => import('./pages/Explore/Explore'))

// Fallback component for lazy loading
const PageFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: 2
    }}
  >
    <CircularProgress size={40} />
    <Typography variant="body2" color="text.secondary">
      Loading page...
    </Typography>
  </Box>
)

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <AppShell>
      <FadeTransition>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <LazyLoader fallback={<PageFallback />}>
                <Login />
              </LazyLoader>
            }
          />
          <Route
            path="/signup"
            element={
              <LazyLoader fallback={<PageFallback />}>
                <Signup />
              </LazyLoader>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LazyLoader fallback={<PageFallback />}>
                  <Home />
                </LazyLoader>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <LazyLoader fallback={<PageFallback />}>
                  <Profile />
                </LazyLoader>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <LazyLoader fallback={<PageFallback />}>
                  <CreatePost />
                </LazyLoader>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <LazyLoader fallback={<PageFallback />}>
                  <Explore />
                </LazyLoader>
              </ProtectedRoute>
            }
          />
        </Routes>
      </FadeTransition>
    </AppShell>
  )
}

export default App