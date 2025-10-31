import { Container, Box } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'

const ResponsiveContainer = ({ children, maxWidth = 'lg', sx = {}, ...props }) => {
  const { isMobile } = useResponsive()

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: isMobile ? 2 : 3,
        ...sx
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden' // Prevent horizontal scroll on mobile
        }}
      >
        {children}
      </Box>
    </Container>
  )
}

export default ResponsiveContainer