import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

// Temporary placeholder components
const HomePage = () => (
  <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
    <h1>🏠 Home Feed</h1>
    <p>Beautiful posts will appear here soon...</p>
  </div>
)

const ProfilePage = () => (
  <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
    <h1>👤 Profile</h1>
    <p>User profile coming soon...</p>
  </div>
)

const CreatePostPage = () => (
  <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
    <h1>📝 Create Post</h1>
    <p>Post creation form coming soon...</p>
  </div>
)

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
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/create-post" element={
          <ProtectedRoute>
            <CreatePostPage />
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