import { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { PulseLoader } from '../animations/LoadingStates'

const LazyLoader = ({ children, fallback = null }) => {
  const defaultFallback = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        gap: 2
      }}
    >
      <PulseLoader size={40} />
      <Typography variant="body2" color="text.secondary">
        Loading content...
      </Typography>
    </Box>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

export default LazyLoader