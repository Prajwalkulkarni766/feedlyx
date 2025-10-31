import { Box } from '@mui/material'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import CreatePostFAB from './CreatePostFAB'
import useResponsive from '../../hooks/useResponsive'

const AppShell = ({ children }) => {
  const { isMobile, isTablet } = useResponsive()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        pb: isMobile ? 7 : 0, // Space for bottom navigation on mobile
        // Safe area insets for mobile devices with notches
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* Header - Hidden on mobile when bottom nav is visible */}
      <Box sx={{
        display: isMobile ? 'none' : 'block',
        position: 'sticky',
        top: 0,
        zIndex: 1100
      }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          px: isMobile ? 1 : isTablet ? 2 : 3,
          pt: isMobile ? 1 : 2,
          minHeight: isMobile ? 'calc(100vh - 56px)' : '100vh', // Account for bottom nav
        }}
      >
        {children}
      </Box>

      {/* Bottom Navigation - Mobile only */}
      {isMobile && (
        <Box sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200
        }}>
          <BottomNavigation />
        </Box>
      )}

      {/* Floating Action Button - Responsive positioning */}
      <CreatePostFAB />
    </Box>
  )
}

export default AppShell