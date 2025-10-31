import {
  Paper,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material'
import {
  Home as HomeIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Explore as ExploreIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useResponsive from '../../hooks/useResponsive'

const MobileBottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState(location.pathname)
  const { isMobile } = useResponsive()

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
      label: 'Search',
      value: '/search',
      icon: <SearchIcon />
    },
    {
      label: 'Create',
      value: '/create-post',
      icon: <AddIcon sx={{ fontSize: 28 }} />
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
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        // Safe area for devices with home indicator
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          background: 'transparent',
          height: 56,
          '& .MuiBottomNavigationAction-root': {
            color: '#64748b',
            minWidth: 'auto',
            padding: '8px 12px',
            minHeight: '56px', // Better touch target
            '&.Mui-selected': {
              color: '#667eea',
            },
          },
          // Larger touch targets for mobile
          '& .MuiTouchRipple-root': {
            width: '100%',
            height: '100%',
          }
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            value={item.value}
            icon={item.icon}
            sx={{
              // Optimize for touch
              minWidth: 56,
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.7rem',
                mt: 0.5,
                transition: 'font-size 0.2s ease',
                '&.Mui-selected': {
                  fontSize: '0.75rem',
                }
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default MobileBottomNavigation