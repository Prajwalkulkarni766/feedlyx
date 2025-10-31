import { useState, useRef } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  Collapse,
  Divider,
  Menu,
  MenuItem
} from '@mui/material'
import {
  Send as SendIcon,
  MoreVert as MoreIcon,
  Reply as ReplyIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomAvatar, CustomButton } from '../common'
import { formatDistanceToNow } from 'date-fns'

// Mock comments data
const mockComments = [
  {
    id: 'comment-1',
    user: {
      id: 'user-2',
      username: 'sarahj',
      avatar: null,
      isVerified: true
    },
    content: 'This is amazing! Love the design and execution. 🔥',
    likeCount: 12,
    isLiked: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    replies: [
      {
        id: 'reply-1',
        user: {
          id: 'user-3',
          username: 'mike_t',
          avatar: null,
          isVerified: false
        },
        content: 'Totally agree! The attention to detail is impressive.',
        likeCount: 3,
        isLiked: true,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 'comment-2',
    user: {
      id: 'user-4',
      username: 'design_guru',
      avatar: null,
      isVerified: true
    },
    content: 'Great work! Would love to see more of your process behind this.',
    likeCount: 8,
    isLiked: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    replies: []
  }
]

const Comment = ({
  comment,
  onLike,
  onReply,
  onDelete,
  level = 0,
  isReply = false
}) => {
  const [showReplies, setShowReplies] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [isLiked, setIsLiked] = useState(comment.isLiked)
  const [likeCount, setLikeCount] = useState(comment.likeCount)

  const handleLike = async () => {
    const newLikeState = !isLiked
    setIsLiked(newLikeState)
    setLikeCount(prev => newLikeState ? prev + 1 : prev - 1)

    try {
      await onLike?.(comment.id, newLikeState)
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikeState)
      setLikeCount(prev => newLikeState ? prev - 1 : prev + 1)
    }
  }

  const handleReply = async () => {
    if (!replyContent.trim()) return

    const newReply = {
      id: `reply-${Date.now()}`,
      user: {
        id: 'current-user',
        username: 'currentuser',
        avatar: null,
        isVerified: false
      },
      content: replyContent,
      likeCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString()
    }

    await onReply?.(comment.id, newReply)
    setReplyContent('')
    setIsReplying(false)
    setShowReplies(true)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    onDelete?.(comment.id)
    handleMenuClose()
  }

  const hasReplies = comment.replies && comment.replies.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 2,
          ml: level * 3
        }}
      >
        {/* Avatar */}
        <CustomAvatar
          username={comment.user.username}
          src={comment.user.avatar}
          size={isReply ? 28 : 36}
        />

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          {/* Comment Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                  {comment.user.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </Typography>
              </Box>

              {/* Comment Text */}
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {comment.content}
              </Typography>
            </Box>

            {/* Menu Button */}
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{ color: 'text.secondary' }}
            >
              <MoreIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer'
              }}
              onClick={handleLike}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLiked ? 'liked' : 'not-liked'}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isLiked ? (
                    <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  )}
                </motion.div>
              </AnimatePresence>
              <Typography
                variant="caption"
                color={isLiked ? 'error.main' : 'text.secondary'}
                sx={{ userSelect: 'none' }}
              >
                {likeCount > 0 ? likeCount : 'Like'}
              </Typography>
            </Box>

            {!isReply && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  cursor: 'pointer'
                }}
                onClick={() => setIsReplying(!isReplying)}
              >
                <ReplyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" sx={{ userSelect: 'none' }}>
                  Reply
                </Typography>
              </Box>
            )}

            {hasReplies && (
              <Typography
                variant="caption"
                color="primary.main"
                sx={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontWeight: 'bold'
                }}
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </Typography>
            )}
          </Box>

          {/* Reply Input */}
          <Collapse in={isReplying}>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'flex-start' }}>
              <CustomAvatar username="currentuser" size={28} />
              <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  multiline
                  maxRows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                />
                <CustomButton
                  variant="gradient"
                  size="small"
                  startIcon={<SendIcon />}
                  onClick={handleReply}
                  disabled={!replyContent.trim()}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  Reply
                </CustomButton>
              </Box>
            </Box>
          </Collapse>

          {/* Replies */}
          {hasReplies && (
            <Collapse in={showReplies}>
              <Box sx={{ mt: 2 }}>
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onLike={onLike}
                    onReply={onReply}
                    onDelete={onDelete}
                    level={level + 1}
                    isReply={true}
                  />
                ))}
              </Box>
            </Collapse>
          )}
        </Box>

        {/* Comment Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              background: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2
            }
          }}
        >
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Report</MenuItem>
        </Menu>
      </Box>

      {!isReply && level === 0 && (
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', mb: 2 }} />
      )}
    </motion.div>
  )
}

const CommentSection = ({ postId, open, onClose }) => {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const comment = {
        id: `comment-${Date.now()}`,
        user: {
          id: 'current-user',
          username: 'currentuser',
          avatar: null,
          isVerified: false
        },
        content: newComment,
        likeCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
        replies: []
      }

      setComments(prev => [comment, ...prev])
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = async (commentId, liked) => {
    // Update local state optimistically
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, isLiked: liked, likeCount: liked ? comment.likeCount + 1 : comment.likeCount - 1 }
          : comment
      )
    )

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
  }

  const handleReplyToComment = async (commentId, reply) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    )
  }

  const handleDeleteComment = (commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              background: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              p: 2,
              maxHeight: 400,
              overflow: 'auto'
            }}
          >
            {/* Comment Input */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3, alignItems: 'flex-start' }}>
              <CustomAvatar username="currentuser" size={40} />
              <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  multiline
                  maxRows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                />
                <CustomButton
                  variant="gradient"
                  startIcon={<SendIcon />}
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isSubmitting}
                  loading={isSubmitting}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  Post
                </CustomButton>
              </Box>
            </Box>

            {/* Comments List */}
            <Box>
              <AnimatePresence mode="popLayout">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Comment
                      comment={comment}
                      onLike={handleLikeComment}
                      onReply={handleReplyToComment}
                      onDelete={handleDeleteComment}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {comments.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No comments yet. Be the first to comment!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommentSection