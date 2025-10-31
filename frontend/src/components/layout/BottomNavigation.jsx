import {
  Paper,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material'
import {
  Home as HomeIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Explore as ExploreIcon
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const MobileBottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState(location.pathname)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    navigate(newValue)
  }

  const navItems = [
    {
      label: 'Home',
      value: '/',
      icon: <HomeIcon />
    },
    {
      label: 'Explore',
      value: '/explore',
      icon: <ExploreIcon />
    },
    {
      label: 'Create',
      value: '/create-post',
      icon: <AddIcon sx={{ fontSize: 32 }} />
    },
    {
      label: 'Profile',
      value: '/profile',
      icon: <PersonIcon />
    },
  ]

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(30, 41, 59, 0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          background: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: '#64748b',
            minWidth: 'auto',
            padding: '8px 12px',
          },
          '& .MuiBottomNavigationAction-root.Mui-selected': {
            color: '#667eea',
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            value={item.value}
            icon={item.icon}
            sx={{
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem',
                mt: 0.5,
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default MobileBottomNavigation