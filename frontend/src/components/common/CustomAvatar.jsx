import { Avatar, Box } from '@mui/material'

const CustomAvatar = ({
  username = 'user',
  src,
  size = 40,
  isOnline = false,
  hasStory = false,
  ...props
}) => {
  // Generate gradient based on username
  const generateGradient = (name) => {
    const colors = [
      ['#667eea', '#764ba2'], // Purple
      ['#f093fb', '#f5576c'], // Pink
      ['#4facfe', '#00f2fe'], // Blue
      ['#43e97b', '#38f9d7'], // Green
      ['#fa709a', '#fee140'], // Orange
      ['#a8edea', '#fed6e3'], // Pastel
    ]

    const index = name?.length % colors.length || 0
    return `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        ...props.sx
      }}
    >
      {/* Story Ring */}
      {hasStory && (
        <Box
          sx={{
            position: 'absolute',
            top: -3,
            left: -3,
            right: -3,
            bottom: -3,
            background: 'linear-gradient(135deg, #667eea, #f5576c)',
            borderRadius: '50%',
            zIndex: 1,
          }}
        />
      )}

      {/* Avatar */}
      <Avatar
        src={src}
        sx={{
          width: size,
          height: size,
          fontSize: size * 0.4,
          fontWeight: 'bold',
          background: generateGradient(username),
          border: hasStory ? 3 : 0,
          borderColor: 'background.paper',
          position: 'relative',
          zIndex: 2,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          },
          ...props.sx
        }}
        {...props}
      >
        {getInitials(username)}
      </Avatar>

      {/* Online Status Indicator */}
      {isOnline && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: size * 0.25,
            height: size * 0.25,
            backgroundColor: '#4ade80',
            border: 2,
            borderColor: 'background.paper',
            borderRadius: '50%',
            zIndex: 3,
          }}
        />
      )}
    </Box>
  )
}

export default CustomAvatar