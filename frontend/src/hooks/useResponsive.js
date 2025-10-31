import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

const useResponsive = () => {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl'))

  const currentBreakpoint = () => {
    if (isMobile) return 'mobile'
    if (isTablet) return 'tablet'
    if (isDesktop) return 'desktop'
    if (isLargeScreen) return 'large'
    if (isExtraLarge) return 'xlarge'
    return 'desktop'
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isExtraLarge,
    currentBreakpoint,
    // Helper functions for common responsive patterns
    responsiveValue: (mobile, tablet, desktop) => {
      if (isMobile) return mobile
      if (isTablet) return tablet
      return desktop
    },
    // Conditional rendering helpers
    mobileOnly: (component) => isMobile ? component : null,
    tabletOnly: (component) => isTablet ? component : null,
    desktopOnly: (component) => isDesktop ? component : null,
    hideOnMobile: (component) => isMobile ? null : component,
    hideOnTablet: (component) => isTablet ? null : component,
    hideOnDesktop: (component) => isDesktop ? null : component,
  }
}

export default useResponsive