import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'
import CreatePost from './pages/CreatePost/CreatePost'
import Profile from './pages/Profile/Profile'

const ExplorePage = () => (
  <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
    <h1>🔍 Explore</h1>
    <p>Discover new content coming soon...</p>
  </div>
)

function App() {
  return (
    <AppShell>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/create-post" element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } />
        <Route path="/explore" element={
          <ProtectedRoute>
            <ExplorePage />
          </ProtectedRoute>
        } />
      </Routes>
    </AppShell>
  )
}

export default App