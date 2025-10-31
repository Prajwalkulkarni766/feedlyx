import { Button, Box } from '@mui/material'
import { motion } from 'framer-motion'

const MotionButton = motion(Button)

const CustomButton = ({
  children,
  variant = 'contained',
  gradient = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  sx,
  ...props
}) => {
  const getGradient = () => {
    const gradients = {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    }
    return gradients[gradient] || gradients.primary
  }

  const getHoverGradient = () => {
    const gradients = {
      primary: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      secondary: 'linear-gradient(135deg, #e082ee 0%, #e53e3e 100%)',
      success: 'linear-gradient(135deg, #3da5f5 0%, #00d9e6 100%)',
      warning: 'linear-gradient(135deg, #f55c8a 0%, #fcd734 100%)',
    }
    return gradients[gradient] || gradients.primary
  }

  const getSizeStyles = () => {
    const sizes = {
      small: { py: 0.5, px: 2, fontSize: '0.875rem' },
      medium: { py: 1, px: 3, fontSize: '1rem' },
      large: { py: 1.5, px: 4, fontSize: '1.125rem' },
    }
    return sizes[size] || sizes.medium
  }

  if (variant === 'gradient') {
    return (
      <MotionButton
        variant="contained"
        disabled={disabled || loading}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        whileHover={{
          scale: disabled ? 1 : 1.02,
          y: disabled ? 0 : -2
        }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        sx={{
          background: getGradient(),
          borderRadius: 2,
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            background: getHoverGradient(),
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-2px)'
          },
          '&:disabled': {
            background: '#475569',
            transform: 'none',
            boxShadow: 'none'
          },
          ...getSizeStyles(),
          ...sx
        }}
        {...props}
      >
        {/* Ripple Effect Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s ease',
          }}
          className="button-ripple"
        />

        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              ⏳
            </motion.div>
            Loading...
          </Box>
        ) : (
          children
        )}
      </MotionButton>
    )
  }

  return (
    <MotionButton
      variant={variant}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      sx={{
        borderRadius: 2,
        fontWeight: 'bold',
        textTransform: 'none',
        position: 'relative',
        overflow: 'hidden',
        ...getSizeStyles(),
        ...(variant === 'contained' && {
          background: getGradient(),
          '&:hover': {
            background: getHoverGradient(),
          }
        }),
        ...(variant === 'outlined' && {
          borderColor: '#475569',
          color: '#94a3b8',
          '&:hover': {
            borderColor: '#667eea',
            color: '#667eea',
            background: 'rgba(102, 126, 234, 0.1)'
          }
        }),
        ...(variant === 'text' && {
          color: '#94a3b8',
          '&:hover': {
            color: '#667eea',
            background: 'rgba(102, 126, 234, 0.1)'
          }
        }),
        '&:disabled': {
          background: variant === 'contained' ? '#475569' : 'transparent',
          color: '#64748b',
          borderColor: '#475569'
        },
        ...sx
      }}
      {...props}
    >
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⏳
          </motion.div>
          Loading...
        </Box>
      ) : (
        children
      )}
    </MotionButton>
  )
}

// Specialized Button Variants
export const GradientButton = (props) => <CustomButton variant="gradient" {...props} />
export const IconButton = ({ icon, ...props }) => (
  <CustomButton variant="text" sx={{ minWidth: 'auto', px: 1 }} {...props}>
    {icon}
  </CustomButton>
)

export default CustomButton