import { Box } from '@mui/material'

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout