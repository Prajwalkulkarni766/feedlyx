import { useState } from 'react'
import { Box, Typography, IconButton, Popover } from '@mui/material'
import {
  Favorite as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  Visibility as ViewIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import LikeButton from './LikeButton'
import CommentSection from './CommentSection'
import { CustomAvatar } from '../common'

const EngagementBar = ({
  postId,
  initialLikes = 0,
  initialComments = 0,
  initialViews = 0,
  initialLiked = false,
  onLike,
  onComment,
  onShare
}) => {
  const [commentOpen, setCommentOpen] = useState(false)
  const [likesAnchor, setLikesAnchor] = useState(null)
  const [commentCount, setCommentCount] = useState(initialComments)
  const [viewCount, setViewCount] = useState(initialViews)

  // Mock users who liked the post
  const mockLikers = [
    { id: 'user-1', username: 'alex_johnson', avatar: null, isVerified: true },
    { id: 'user-2', username: 'sarah_m', avatar: null, isVerified: false },
    { id: 'user-3', username: 'mike_taylor', avatar: null, isVerified: true },
    { id: 'user-4', username: 'emma_design', avatar: null, isVerified: false },
    { id: 'user-5', username: 'tech_guru', avatar: null, isVerified: true }
  ]

  const handleLike = async (postId, liked) => {
    await onLike?.(postId, liked)
  }

  const handleCommentClick = () => {
    setCommentOpen(!commentOpen)
    onComment?.(postId)
  }

  const handleShareClick = () => {
    onShare?.(postId)
    // In real app, open share dialog
  }

  const handleLikesClick = (event) => {
    setLikesAnchor(event.currentTarget)
  }

  const handleLikesClose = () => {
    setLikesAnchor(null)
  }

  const likesOpen = Boolean(likesAnchor)

  return (
    <Box>
      {/* Engagement Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Likes */}
        {initialLikes > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer'
            }}
            onClick={handleLikesClick}
          >
            <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} />
            <Typography variant="caption" color="text.secondary">
              {initialLikes} {initialLikes === 1 ? 'like' : 'likes'}
            </Typography>
          </Box>
        )}

        {/* Comments & Views */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {commentCount > 0 && (
            <Typography variant="caption" color="text.secondary">
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </Typography>
          )}

          {viewCount > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {viewCount} {viewCount === 1 ? 'view' : 'views'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          px: 1,
          py: 0.5
        }}
      >
        <LikeButton
          postId={postId}
          initialLiked={initialLiked}
          initialLikeCount={initialLikes}
          onLike={handleLike}
          size="medium"
          showCount={false}
        />

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={handleCommentClick}
            sx={{
              color: commentOpen ? 'primary.main' : 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                background: 'rgba(102, 126, 234, 0.1)'
              }
            }}
          >
            <CommentIcon />
          </IconButton>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={handleShareClick}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                background: 'rgba(102, 126, 234, 0.1)'
              }
            }}
          >
            <ShareIcon />
          </IconButton>
        </motion.div>
      </Box>

      {/* Comment Section */}
      <CommentSection
        postId={postId}
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
      />

      {/* Likes Popover */}
      <Popover
        open={likesOpen}
        anchorEl={likesAnchor}
        onClose={handleLikesClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            minWidth: 200,
            maxHeight: 300,
            overflow: 'auto'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.primary" gutterBottom>
            Liked by
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {mockLikers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                  <CustomAvatar username={user.username} src={user.avatar} size={32} />
                  <Typography variant="body2" color="text.primary">
                    {user.username}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

export default EngagementBar