import { Fab, Tooltip, Zoom } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useResponsive from '../../hooks/useResponsive'

const CreatePostFAB = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  const handleCreatePost = () => {
    navigate('/create-post')
  }

  const getPosition = () => {
    if (isMobile) return { bottom: 80, right: 16 }
    if (isTablet) return { bottom: 24, right: 24 }
    return { bottom: 24, right: 24 }
  }

  const getSize = () => {
    if (isMobile) return 56
    return 56
  }

  return (
    <Tooltip
      title="Create Post"
      placement="left"
      TransitionComponent={Zoom}
      arrow
    >
      <Fab
        color="primary"
        aria-label="create post"
        onClick={handleCreatePost}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        sx={{
          position: 'fixed',
          ...getPosition(),
          width: getSize(),
          height: getSize(),
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
          // Larger touch target on mobile
          '&:active': {
            transform: isMobile ? 'scale(0.95)' : 'scale(1.05)',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
            transform: !isMobile ? 'scale(1.1)' : 'scale(1)',
          },
          zIndex: 1300, // Above bottom navigation
        }}
      >
        <AddIcon
          sx={{
            fontSize: isMobile ? 28 : 28,
            transform: isHovered && !isMobile ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </Fab>
    </Tooltip>
  )
}

export default CreatePostFAB