import { useState } from 'react'
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
  IconButton,
} from '@mui/material'
import {
  MoreVert as MoreIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilledIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { CustomAvatar } from '../common'
import EngagementBar from '../engagement/EngagementBar'
import { formatDistanceToNow } from 'date-fns'
import { Share as ShareIcon } from '@mui/icons-material'

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [imageError, setImageError] = useState(false)

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
      </Card>
    </motion.div>
  )
}

export default PostCard