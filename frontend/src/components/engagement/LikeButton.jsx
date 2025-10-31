import { useState } from 'react'
import { IconButton, Typography, Box, Tooltip } from '@mui/material'
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const LikeButton = ({
  postId,
  initialLiked = false,
  initialLikeCount = 0,
  onLike,
  size = 'medium',
  showCount = true,
  ...props
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLike = async () => {
    if (isAnimating) return

    const newLikeState = !isLiked
    const newLikeCount = newLikeState ? likeCount + 1 : likeCount - 1

    // Optimistic update
    setIsLiked(newLikeState)
    setLikeCount(newLikeCount)
    setIsAnimating(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      await onLike?.(postId, newLikeState)
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikeState)
      setLikeCount(likeCount)
    } finally {
      setIsAnimating(false)
    }
  }

  const getIconSize = () => {
    switch (size) {
      case 'small': return 18
      case 'large': return 28
      default: return 24
    }
  }

  const getButtonSize = () => {
    switch (size) {
      case 'small': return 32
      case 'large': return 48
      default: return 40
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            onClick={handleLike}
            disabled={isAnimating}
            sx={{
              color: isLiked ? 'error.main' : 'text.secondary',
              width: getButtonSize(),
              height: getButtonSize(),
              position: 'relative',
              overflow: 'visible',
              '&:hover': {
                color: isLiked ? 'error.dark' : 'error.main',
                background: isLiked ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 255, 255, 0.1)'
              }
            }}
            {...props}
          >
            {/* Heart Icon */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? 'liked' : 'not-liked'}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                {isLiked ? (
                  <FavoriteIcon sx={{ fontSize: getIconSize() }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: getIconSize() }} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Particle Effects */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{
                        scale: 0,
                        opacity: 1,
                        x: 0,
                        y: 0
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                        x: Math.cos((i * 72 * Math.PI) / 180) * 30,
                        y: Math.sin((i * 72 * Math.PI) / 180) * 30
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      style={{
                        position: 'absolute',
                        width: 6,
                        height: 6,
                        background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                        borderRadius: '50%',
                        pointerEvents: 'none'
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Pulse Effect */}
            <AnimatePresence>
              {isLiked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                  }}
                />
              )}
            </AnimatePresence>
          </IconButton>
        </motion.div>
      </Tooltip>

      {/* Like Count */}
      {showCount && likeCount > 0 && (
        <motion.div
          key={likeCount}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Typography
            variant="body2"
            color={isLiked ? 'error.main' : 'text.secondary'}
            sx={{
              fontWeight: isLiked ? 'bold' : 'normal',
              minWidth: 20,
              textAlign: 'center',
              userSelect: 'none'
            }}
          >
            {likeCount > 999 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
          </Typography>
        </motion.div>
      )}
    </Box>
  )
}

export default LikeButton