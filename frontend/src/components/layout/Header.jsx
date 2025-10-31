import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material'
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Add as AddIcon
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
  ]

  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          SocialPost
        </Typography>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                color: location.pathname === item.path ? '#667eea' : '#94a3b8',
                background: location.pathname === item.path
                  ? 'rgba(102, 126, 234, 0.1)'
                  : 'transparent',
                borderRadius: 2,
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.2)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Auth Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              borderColor: '#475569',
              color: '#94a3b8',
              '&:hover': {
                borderColor: '#667eea',
                color: '#667eea',
              },
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header