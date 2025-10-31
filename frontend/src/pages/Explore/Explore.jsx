// src/pages/Explore/Explore.jsx
import { Container, Typography, Box } from '@mui/material'

const Explore = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="text.primary">
        Explore
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Discover amazing content from our community
      </Typography>
    </Container>
  )
}

export default Explore