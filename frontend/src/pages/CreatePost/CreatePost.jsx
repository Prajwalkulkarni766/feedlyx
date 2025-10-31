import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@mui/material'
import {
  Edit as EditIcon,
  Image as ImageIcon,
  Preview as PreviewIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import CreatePostModal from '../../components/post/CreatePostModal'
import RichTextEditor from '../../components/post/RichTextEditor'
import { CustomButton } from '../../components/common'

const CreatePost = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [postContent, setPostContent] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const steps = ['Compose', 'Add Media', 'Preview']

  const handleCreatePost = (newPost) => {
    console.log('New post created:', newPost)
    // In a real app, you would add this to your feed state or send to API
    setPostContent('')
    setSelectedImage(null)
    setActiveStep(0)
  }

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="text.primary">
              Write your post
            </Typography>
            <RichTextEditor
              value={postContent}
              onChange={setPostContent}
              placeholder="Share your thoughts, ideas, or experiences..."
            />
          </Box>
        )
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="text.primary">
              Add media to your post
            </Typography>
            <Box
              sx={{
                border: '2px dashed rgba(255, 255, 255, 0.3)',
                borderRadius: 3,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  background: 'rgba(102, 126, 234, 0.1)'
                }
              }}
              onClick={() => document.getElementById('image-upload').click()}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.primary" gutterBottom>
                Add Photo/Video
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click to browse or drag and drop
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Supports JPG, PNG, GIF • Max 5MB
              </Typography>
            </Box>

            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ mt: 2, background: 'rgba(255, 255, 255, 0.05)' }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.primary" gutterBottom>
                      Selected Image:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedImage.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </Box>
        )
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="text.primary">
              Preview your post
            </Typography>
            <Card sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <CardContent>
                {postContent ? (
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
                  >
                    {postContent}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    No content added
                  </Typography>
                )}

                {selectedImage && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      [Image: {selectedImage.name}]
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )
      default:
        return 'Unknown step'
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Create Post
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your thoughts with the community
          </Typography>
        </Box>

        {/* Quick Create Button */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CustomButton
            variant="gradient"
            size="large"
            startIcon={<EditIcon />}
            onClick={() => setCreateModalOpen(true)}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Quick Create
          </CustomButton>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Or use the step-by-step creator below
          </Typography>
        </Box>

        {/* Step-by-Step Creator */}
        <Card
          sx={{
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: 'text.secondary',
                        '&.Mui-completed, &.Mui-active': {
                          color: 'primary.main'
                        }
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            <Box sx={{ mb: 4, minHeight: 200 }}>
              {getStepContent(activeStep)}
            </Box>

            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ color: 'text.secondary' }}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <CustomButton
                  variant="gradient"
                  onClick={() => setCreateModalOpen(true)}
                  disabled={!postContent && !selectedImage}
                >
                  Create Post
                </CustomButton>
              ) : (
                <CustomButton
                  variant="gradient"
                  onClick={handleNext}
                  disabled={activeStep === 0 && !postContent.trim()}
                >
                  Next
                </CustomButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create Post Modal */}
      <CreatePostModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </Container>
  )
}

export default CreatePost