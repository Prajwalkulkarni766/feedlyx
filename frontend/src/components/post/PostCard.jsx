import { useState, memo } from 'react'
// import { postPropsAreEqual } from '../optimization/memoization'
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Menu,
  MenuItem,
  Divider,
  IconButton
} from '@mui/material'
import {
  MoreVert as MoreIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilledIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomAvatar } from '../common'
import { GlassHover, FloatingHover } from '../animations'
import EngagementBar from '../engagement/EngagementBar'
import { formatDistanceToNow } from 'date-fns'
import useResponsive from '../../hooks/useResponsive'

const postPropsAreEqual = (prevProps, nextProps) => {
  return (
    prevProps.post.id === nextProps.post.id &&
    prevProps.post.likeCount === nextProps.post.likeCount &&
    prevProps.post.commentCount === nextProps.post.commentCount &&
    prevProps.post.isLiked === nextProps.post.isLiked &&
    prevProps.post.content === nextProps.post.content
  )
}

const PostCard = memo(({ post, onLike, onComment, onShare }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleShare = () => {
    onShare?.(post)
    handleMenuClose()
  }

  const handleReport = () => {
    console.log('Report post:', post.id)
    handleMenuClose()
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const getAvatarSize = () => {
    if (isMobile) return 40
    if (isTablet) return 44
    return 44
  }

  const getContentPadding = () => {
    if (isMobile) return { pt: 0, pb: 0.5, px: 2 }
    return { pt: 0, pb: 1, px: 2 }
  }

  return (
    <FloatingHover intensity={isMobile ? 2 : 3}>
      <GlassHover intensity={0.05}>
        <Card
          sx={{
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: isMobile ? 2 : 3,
            mb: isMobile ? 1.5 : 2,
            overflow: 'visible',
            cursor: 'pointer',
            mx: isMobile ? 0 : 'auto',
            '&:hover': {
              borderColor: 'rgba(102, 126, 234, 0.3)',
              boxShadow: isMobile ? '0 4px 16px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          {/* Header */}
          <CardHeader
            avatar={
              <motion.div whileHover={{ scale: isMobile ? 1 : 1.1 }} whileTap={{ scale: 0.9 }}>
                <CustomAvatar
                  username={post.user.username}
                  src={post.user.avatar}
                  size={getAvatarSize()}
                  isOnline={post.user.isOnline}
                  hasStory={post.user.hasStory}
                />
              </motion.div>
            }
            action={
              <motion.div whileHover={{ scale: isMobile ? 1 : 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={handleMenuOpen}
                  size={isMobile ? "small" : "medium"}
                >
                  <MoreIcon sx={{
                    fontSize: isMobile ? 18 : 24,
                    color: 'text.secondary'
                  }} />
                </IconButton>
              </motion.div>
            }
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography
                  variant={isMobile ? "subtitle2" : "subtitle1"}
                  fontWeight="bold"
                  color="text.primary"
                  sx={{
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}
                >
                  {post.user.username}
                </Typography>
                {post.user.isVerified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Chip
                      label="Verified"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontSize: isMobile ? '0.6rem' : '0.7rem',
                        height: isMobile ? 16 : 20,
                        '& .MuiChip-label': {
                          px: isMobile ? 1 : 1.5
                        }
                      }}
                    />
                  </motion.div>
                )}
              </Box>
            }
            subheader={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: isMobile ? '0.6875rem' : '0.75rem'
                  }}
                >
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </Typography>
              </motion.div>
            }
            sx={{
              pb: isMobile ? 0.5 : 1,
              px: isMobile ? 1.5 : 2,
              pt: isMobile ? 1.5 : 2,
              '& .MuiCardHeader-content': {
                overflow: 'hidden'
              },
              '& .MuiCardHeader-avatar': {
                mr: isMobile ? 1 : 2
              }
            }}
          />

          {/* Content */}
          <CardContent sx={getContentPadding()}>
            {post.content && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  color="text.primary"
                  sx={{
                    mb: post.image ? (isMobile ? 1.5 : 2) : 0,
                    lineHeight: isMobile ? 1.5 : 1.6,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}
                >
                  {post.content}
                </Typography>
              </motion.div>
            )}

            {post.image && !imageError && (
              <Box
                sx={{
                  borderRadius: isMobile ? 1 : 2,
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: 'rgba(0,0,0,0.1)',
                  mx: isMobile ? -2 : 0 // Full width on mobile
                }}
              >
                <AnimatePresence>
                  {!imageLoaded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s infinite'
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardMedia
                    component="img"
                    height="auto"
                    image={post.image}
                    alt="Post image"
                    onLoad={handleImageLoad}
                    onError={() => setImageError(true)}
                    sx={{
                      maxHeight: isMobile ? 300 : 400,
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                </motion.div>
              </Box>
            )}
          </CardContent>

          {/* Engagement Bar */}
          <EngagementBar
            postId={post.id}
            initialLikes={post.likeCount}
            initialComments={post.commentCount}
            initialViews={post.viewCount || 0}
            initialLiked={post.isLiked}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                background: 'rgba(30, 41, 59, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                mt: 1,
                minWidth: isMobile ? 160 : 200
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <MenuItem onClick={handleBookmark} sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isBookmarked ? 'bookmarked' : 'not-bookmarked'}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                    {isBookmarked ? 'Saved' : 'Save Post'}
                  </motion.span>
                </AnimatePresence>
              </MenuItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
            >
              <MenuItem onClick={handleShare} sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                Share
              </MenuItem>
            </motion.div>

            <Divider sx={{ my: 0.5, bgcolor: 'rgba(255,255,255,0.1)' }} />

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <MenuItem
                onClick={handleReport}
                sx={{
                  color: 'error.main',
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
              >
                Report
              </MenuItem>
            </motion.div>
          </Menu>
        </Card>
      </GlassHover>
    </FloatingHover>
  )
}, postPropsAreEqual)

export default PostCard