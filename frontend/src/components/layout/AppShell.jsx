import { Box } from '@mui/material'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import CreatePostFAB from './CreatePostFAB'

const AppShell = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        pb: { xs: 7, sm: 0 }, // Space for bottom navigation on mobile
      }}
    >
      {/* Header - Hidden on mobile when bottom nav is visible */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 1, sm: 2 },
          pt: { xs: 1, sm: 2 },
        }}
      >
        {children}
      </Box>

      {/* Bottom Navigation - Mobile only */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <BottomNavigation />
      </Box>

      {/* Floating Action Button */}
      <CreatePostFAB />
    </Box>
  )
}

export default AppShell