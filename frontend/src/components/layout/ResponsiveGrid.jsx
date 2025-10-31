import { Grid } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'

const ResponsiveGrid = ({
  children,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  spacing = 2,
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive()

  const getColumns = () => {
    if (isMobile) return mobileColumns
    if (isTablet) return tabletColumns
    return desktopColumns
  }

  return (
    <Grid
      container
      spacing={spacing}
      sx={{
        // Ensure proper spacing on mobile
        margin: isMobile ? '0 -8px' : 'inherit',
        width: isMobile ? 'calc(100% + 16px)' : '100%'
      }}
      {...props}
    >
      {children && Array.isArray(children)
        ? children.map((child, index) => (
          <Grid
            item
            xs={12}
            sm={12 / tabletColumns}
            md={12 / desktopColumns}
            key={index}
            sx={{
              // Mobile-specific adjustments
              padding: isMobile ? '0 8px' : 'inherit'
            }}
          >
            {child}
          </Grid>
        ))
        : children
      }
    </Grid>
  )
}

export default ResponsiveGrid