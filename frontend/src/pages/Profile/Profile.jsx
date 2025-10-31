import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Tab,
  Tabs,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Avatar,
  Divider,
  Chip
} from '@mui/material'
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  LocationOn as LocationIcon,
  Link as LinkIcon,
  CalendarToday as CalendarIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Favorite as FavoriteIcon,
  Chat as CommentIcon,
  Share as ShareIcon,
  ChatBubble as ChatIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { CustomAvatar, CustomButton, PostSkeleton } from '../../components/common'
import PostCard from '../../components/post/PostCard'

// Mock user data
const mockUser = {
  id: '1',
  username: 'johndoe',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null,
  coverPhoto: null,
  bio: 'Digital creator • Photography enthusiast • Coffee lover ☕\nSharing moments that matter ✨',
  location: 'New York, USA',
  website: 'johndoeportfolio.com',
  joinDate: '2024-01-15',
  profession: 'UX Designer',
  education: 'Stanford University',
  isVerified: true,
  isFollowing: false,
  stats: {
    posts: 47,
    followers: 1248,
    following: 563,
    likes: 2890
  }
}

// Mock user posts
const mockUserPosts = [
  {
    id: 'user-post-1',
    user: mockUser,
    content: 'Just launched my new portfolio website! 🚀 So excited to share my latest work with you all. Check it out and let me know what you think! #design #portfolio',
    image: 'https://picsum.photos/600/400?random=1',
    likeCount: 42,
    commentCount: 8,
    isLiked: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'user-post-2',
    user: mockUser,
    content: 'Beautiful sunset from my balcony today 🌅 Sometimes the best moments are the simplest ones.',
    image: 'https://picsum.photos/600/400?random=2',
    likeCount: 128,
    commentCount: 24,
    isLiked: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'user-post-3',
    user: mockUser,
    content: 'Working on some exciting new projects! Can\'t wait to share more details soon. Stay tuned! 💫',
    image: null,
    likeCount: 56,
    commentCount: 12,
    isLiked: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
]

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0)
  const [isFollowing, setIsFollowing] = useState(mockUser.isFollowing)
  const [coverPhoto, setCoverPhoto] = useState(mockUser.coverPhoto)
  const [avatar, setAvatar] = useState(mockUser.avatar)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // In real app, make API call here
  }

  const handleEditProfile = () => {
    console.log('Edit profile clicked')
    // Open edit profile modal
  }

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setCoverPhoto(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatar(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const stats = [
    { label: 'Posts', value: mockUser.stats.posts, color: '#667eea' },
    { label: 'Followers', value: mockUser.stats.followers, color: '#f5576c' },
    { label: 'Following', value: mockUser.stats.following, color: '#4facfe' },
    { label: 'Likes', value: mockUser.stats.likes, color: '#43e97b' }
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      {/* Cover Photo Section */}
      <Box
        sx={{
          height: { xs: 200, sm: 300, md: 400 },
          background: coverPhoto
            ? `url(${coverPhoto}) center/cover`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          borderRadius: { xs: 0, sm: 3 },
          mx: { xs: 0, sm: 2 },
          mt: { xs: 0, sm: 2 },
          overflow: 'hidden'
        }}
      >
        {/* Cover Photo Edit Button */}
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverPhotoChange}
          style={{ display: 'none' }}
          id="cover-photo-upload"
        />
        <label htmlFor="cover-photo-upload">
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.9)'
              }
            }}
          >
            <CameraIcon />
          </IconButton>
        </label>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', mt: -8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header Section */}
          <Card
            sx={{
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              overflow: 'visible'
            }}
          >
            <CardContent sx={{ p: 4, pt: 8 }}>
              <Grid container spacing={3} alignItems="flex-end">
                {/* Avatar Section */}
                <Grid item xs={12} md="auto">
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <CustomAvatar
                      username={mockUser.username}
                      src={avatar}
                      size={120}
                      sx={{
                        border: 4,
                        borderColor: 'background.paper',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }}
                    />

                    {/* Avatar Edit Button */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                      id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload">
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                          }
                        }}
                      >
                        <CameraIcon fontSize="small" />
                      </IconButton>
                    </label>
                  </Box>
                </Grid>

                {/* User Info Section */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
                      {mockUser.fullName}
                    </Typography>
                    {mockUser.isVerified && (
                      <Chip
                        label="Verified"
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    )}
                  </Box>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    @{mockUser.username}
                  </Typography>

                  {/* User Details */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {mockUser.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {mockUser.location}
                        </Typography>
                      </Box>
                    )}

                    {mockUser.joinDate && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Joined {new Date(mockUser.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </Typography>
                      </Box>
                    )}

                    {mockUser.profession && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <WorkIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {mockUser.profession}
                        </Typography>
                      </Box>
                    )}

                    {mockUser.education && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SchoolIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {mockUser.education}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Bio */}
                  {mockUser.bio && (
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{
                        mb: 2,
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {mockUser.bio}
                    </Typography>
                  )}

                  {/* Website */}
                  {mockUser.website && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <LinkIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                      <Typography
                        variant="body2"
                        component="a"
                        href={`https://${mockUser.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {mockUser.website}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12} md="auto" sx={{ ml: 'auto' }}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <CustomButton
                      variant={isFollowing ? "outlined" : "gradient"}
                      onClick={handleFollow}
                      sx={{ minWidth: 120 }}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </CustomButton>

                    <CustomButton
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </CustomButton>

                    <IconButton
                      sx={{
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'text.secondary',
                        '&:hover': {
                          borderColor: 'primary.main',
                          color: 'primary.main'
                        }
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Stats Cards Section */}
          <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                      border: `1px solid ${stat.color}30`,
                      borderRadius: 2,
                      textAlign: 'center',
                      p: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 25px ${stat.color}20`
                      }
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="div"
                      fontWeight="bold"
                      sx={{
                        background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {stat.value.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Tabbed Content Section */}
          <Card
            sx={{
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem',
                  minWidth: 120,
                  '&.Mui-selected': {
                    color: 'primary.main'
                  }
                },
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }
              }}
            >
              <Tab label="Posts" icon={<ChatIcon />} iconPosition="start" />
              <Tab label="Photos" icon={<CameraIcon />} iconPosition="start" />
              <Tab label="Likes" icon={<FavoriteIcon />} iconPosition="start" />
              <Tab label="About" icon={<WorkIcon />} iconPosition="start" />
            </Tabs>

            {/* Posts Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box>
                {mockUserPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </Box>
            </TabPanel>

            {/* Photos Tab */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={2}>
                {mockUserPosts.filter(post => post.image).map((post, index) => (
                  <Grid item xs={6} md={4} key={post.id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
                          }
                        }}
                      >
                        <img
                          src={post.image}
                          alt="Post"
                          style={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Likes Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <FavoriteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.primary" gutterBottom>
                  No liked posts yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Posts you like will appear here
                </Typography>
              </Box>
            </TabPanel>

            {/* About Tab */}
            <TabPanel value={tabValue} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', p: 3 }}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      Personal Information
                    </Typography>
                    <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.primary">
                          {mockUser.profession}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SchoolIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.primary">
                          {mockUser.education}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.primary">
                          {mockUser.location}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.primary">
                          Joined {new Date(mockUser.joinDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', p: 3 }}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      Bio
                    </Typography>
                    <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {mockUser.bio}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Profile