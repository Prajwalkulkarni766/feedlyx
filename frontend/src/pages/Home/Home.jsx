import { Box, Typography, Container } from '@mui/material'
import Feed from '../../components/feed/Feed'

const Home = () => {
  return (
    <Box sx={{ height: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          py: 2,
          mb: 2,
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            component="h1"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Feed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discover amazing content from our community
          </Typography>
        </Container>
      </Box>

      {/* Feed */}
      <Container maxWidth="lg" sx={{ height: 'calc(100% - 80px)' }}>
        <Feed />
      </Container>
    </Box>
  )
}

export default Home