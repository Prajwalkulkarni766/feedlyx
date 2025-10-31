import { Fab, Tooltip, Zoom } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CreatePostFAB = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleCreatePost = () => {
    navigate('/create-post')
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 24 },
          right: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: 56,
          height: 56,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
            transform: 'scale(1.1)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        <AddIcon
          sx={{
            fontSize: 28,
            transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </Fab>
    </Tooltip>
  )
}

export default CreatePostFAB