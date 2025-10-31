import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Menu,
  MenuItem,
  Divider
} from '@mui/material'
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilledIcon
} from '@mui/icons-material'
import { AnimatePresence } from 'framer-motion'
import { CustomAvatar, CustomButton } from '../common'
import { formatDistanceToNow } from 'date-fns'

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likeCount || 0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [imageError, setImageError] = useState(false)

  const handleLike = async () => {
    const newLikeState = !isLiked
    setIsLiked(newLikeState)
    setLikeCount(prev => newLikeState ? prev + 1 : prev - 1)

    // Simulate API call
    try {
      await onLike?.(post.id, newLikeState)
    } catch (err) {
      // Revert on error
      console.error(err)
      setIsLiked(!newLikeState)
      setLikeCount(prev => newLikeState ? prev - 1 : prev + 1)
    }
  }

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          mb: 2,
          overflow: 'visible',
          '&:hover': {
            borderColor: 'rgba(102, 126, 234, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        {/* Header */}
        <CardHeader
          avatar={
            <CustomAvatar
              username={post.user.username}
              src={post.user.avatar}
              size={44}
              isOnline={post.user.isOnline}
              hasStory={post.user.hasStory}
            />
          }
          action={
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
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
                    mt: 1
                  }
                }}
              >
                <MenuItem onClick={handleBookmark}>
                  {isBookmarked ? <BookmarkFilledIcon sx={{ mr: 1 }} /> : <BookmarkIcon sx={{ mr: 1 }} />}
                  {isBookmarked ? 'Saved' : 'Save Post'}
                </MenuItem>
                <MenuItem onClick={handleShare}>
                  <ShareIcon sx={{ mr: 1 }} />
                  Share
                </MenuItem>
                <Divider sx={{ my: 0.5, bgcolor: 'rgba(255,255,255,0.1)' }} />
                <MenuItem onClick={handleReport} sx={{ color: 'error.main' }}>
                  Report
                </MenuItem>
              </Menu>
            </>
          }
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                {post.user.username}
              </Typography>
              {post.user.isVerified && (
                <Chip
                  label="Verified"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 20
                  }}
                />
              )}
            </Box>
          }
          subheader={
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Typography>
          }
          sx={{
            pb: 1,
            '& .MuiCardHeader-content': {
              overflow: 'hidden'
            }
          }}
        />

        {/* Content */}
        <CardContent sx={{ pt: 0, pb: 1 }}>
          {post.content && (
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                mb: post.image ? 2 : 0,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {post.content}
            </Typography>
          )}

          {post.image && !imageError && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                bgcolor: 'rgba(0,0,0,0.1)'
              }}
            >
              <CardMedia
                component="img"
                height="auto"
                image={post.image}
                alt="Post image"
                onError={() => setImageError(true)}
                sx={{
                  maxHeight: 400,
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
            </Box>
          )}
        </CardContent>

        {/* Engagement Stats */}
        {(likeCount > 0 || post.commentCount > 0) && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {likeCount > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} />
                  <Typography variant="caption" color="text.secondary">
                    {likeCount} {likeCount === 1 ? 'like' : 'likes'}
                  </Typography>
                </Box>
              )}
              {post.commentCount > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Actions */}
        <CardActions sx={{ pt: 0, px: 1 }}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
            <CustomButton
              variant="text"
              startIcon={
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLiked ? 'liked' : 'not-liked'}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isLiked ? (
                      <FavoriteIcon sx={{ color: 'error.main' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </motion.div>
                </AnimatePresence>
              }
              onClick={handleLike}
              sx={{
                color: isLiked ? 'error.main' : 'text.secondary',
                minWidth: 'auto',
                px: 2
              }}
            >
              Like
            </CustomButton>

            <CustomButton
              variant="text"
              startIcon={<CommentIcon />}
              onClick={() => onComment?.(post)}
              sx={{
                color: 'text.secondary',
                minWidth: 'auto',
                px: 2
              }}
            >
              Comment
            </CustomButton>

            <CustomButton
              variant="text"
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{
                color: 'text.secondary',
                minWidth: 'auto',
                px: 2
              }}
            >
              Share
            </CustomButton>
          </Box>
        </CardActions>
      </Card>
    </motion.div>
  )
}

export default PostCard