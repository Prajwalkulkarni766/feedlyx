import { useState, useRef } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Divider
} from '@mui/material'
import {
  Close as CloseIcon,
  Image as ImageIcon,
  EmojiEmotions as EmojiIcon,
  Public as PublicIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal, CustomAvatar, CustomButton } from '../common'

const CreatePostModal = ({ open, onClose, onSubmit }) => {
  const [content, setContent] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [privacy, setPrivacy] = useState('public')
  const fileInputRef = useRef(null)

  // Mock user data
  const currentUser = {
    id: '1',
    username: 'johndoe',
    avatar: null
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      setSelectedImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage) {
      alert('Please add some content or an image to your post')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const newPost = {
        id: Date.now().toString(),
        user: currentUser,
        content: content.trim(),
        image: imagePreview,
        likeCount: 0,
        commentCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString()
      }

      onSubmit?.(newPost)
      handleClose()
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setContent('')
    setSelectedImage(null)
    setImagePreview(null)
    setPrivacy('public')
    onClose?.()
  }

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: <PublicIcon sx={{ fontSize: 16 }} /> },
    { value: 'friends', label: 'Friends', icon: '👥' },
    { value: 'private', label: 'Only me', icon: '🔒' }
  ]

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create Post"
      maxWidth="sm"
      fullWidth
      showCloseButton={false}
    >
      {/* Header */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Create Post
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CustomAvatar username={currentUser.username} src={currentUser.avatar} size={40} />
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
              {currentUser.username}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Button
                variant="text"
                size="small"
                startIcon={privacyOptions.find(opt => opt.value === privacy)?.icon}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  minWidth: 'auto',
                  p: 0.5,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                {privacyOptions.find(opt => opt.value === privacy)?.label}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Content Area */}
      <Box sx={{ p: 2, maxHeight: '60vh', overflow: 'auto' }}>
        {/* Text Input */}
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '1.1rem',
              color: 'text.primary',
              '&::placeholder': {
                color: 'text.secondary'
              }
            }
          }}
          sx={{ mb: 2 }}
        />

        {/* Image Preview */}
        <AnimatePresence>
          {imagePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 2,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img
                  src={imagePreview}
                  alt="Post preview"
                  style={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.9)'
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to Your Post */}
        <Box
          sx={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Add to your post
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <CustomButton
              variant="outlined"
              startIcon={<ImageIcon />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }
              }}
            >
              Photo
            </CustomButton>

            <CustomButton
              variant="outlined"
              startIcon={<EmojiIcon />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }
              }}
            >
              Feeling
            </CustomButton>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Actions */}
      <Box sx={{ p: 2 }}>
        <CustomButton
          fullWidth
          variant="gradient"
          loading={isSubmitting}
          onClick={handleSubmit}
          disabled={!content.trim() && !selectedImage}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </CustomButton>
      </Box>
    </Modal>
  )
}

export default CreatePostModal