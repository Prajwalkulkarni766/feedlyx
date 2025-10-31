import { useState } from 'react'
import { Box, Tooltip, CircularProgress } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomButton } from '../common'

const FollowButton = ({
  userId,
  initialFollowing = false,
  onFollow,
  size = 'medium',
  showIcon = true,
  ...props
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    if (isLoading) return

    const newFollowState = !isFollowing

    // Optimistic update
    setIsFollowing(newFollowState)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      await onFollow?.(userId, newFollowState)
    } catch (error) {
      // Revert on error
      setIsFollowing(!newFollowState)
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    if (isLoading) return '...'
    return isFollowing ? 'Following' : 'Follow'
  }

  const getButtonVariant = () => {
    return isFollowing ? 'outlined' : 'gradient'
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { py: 0.5, px: 2, fontSize: '0.875rem' }
      case 'large':
        return { py: 1.5, px: 4, fontSize: '1rem' }
      default:
        return { py: 1, px: 3, fontSize: '0.875rem' }
    }
  }

  return (
    <Tooltip title={isFollowing ? 'Unfollow user' : 'Follow user'}>
      <Box sx={{ position: 'relative' }}>
        <CustomButton
          variant={getButtonVariant()}
          onClick={handleFollow}
          disabled={isLoading}
          sx={{
            minWidth: size === 'small' ? 80 : 100,
            position: 'relative',
            overflow: 'hidden',
            ...getSizeStyles(),
            ...props.sx
          }}
          {...props}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={getButtonText()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {getButtonText()}
            </motion.span>
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <CircularProgress
                size={16}
                sx={{
                  color: isFollowing ? 'primary.main' : 'white'
                }}
              />
            </motion.div>
          )}
        </CustomButton>

        {/* Ripple effect on state change */}
        <AnimatePresence>
          {!isLoading && (
            <motion.div
              key={isFollowing ? 'following' : 'not-following'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isFollowing
                  ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                borderRadius: 8,
                pointerEvents: 'none'
              }}
            />
          )}
        </AnimatePresence>
      </Box>
    </Tooltip>
  )
}

export default FollowButton