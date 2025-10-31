import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material'
import {
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Check as VerifiedIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { CustomAvatar } from '../common'
import FollowButton from './FollowButton'

const UserCard = ({
  user,
  onFollow,
  onUserClick,
  variant = 'default'
}) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false)

  const handleFollow = async (userId, followState) => {
    setIsFollowing(followState)
    await onFollow?.(userId, followState)
  }

  const handleUserClick = () => {
    onUserClick?.(user)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(102, 126, 234, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }
        }}
        onClick={handleUserClick}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            {/* Avatar */}
            <CustomAvatar
              username={user.username}
              src={user.avatar}
              size={variant === 'compact' ? 48 : 56}
              isOnline={user.isOnline}
              hasStory={user.hasStory}
            />

            {/* User Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography
                  variant={variant === 'compact' ? "subtitle2" : "subtitle1"}
                  fontWeight="bold"
                  color="text.primary"
                  noWrap
                >
                  {user.fullName || user.username}
                </Typography>

                {user.isVerified && (
                  <VerifiedIcon
                    sx={{
                      fontSize: 16,
                      color: 'primary.main'
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
                noWrap
              >
                @{user.username}
              </Typography>

              {/* User Details */}
              {variant !== 'compact' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
                  {user.profession && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <WorkIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {user.profession}
                      </Typography>
                    </Box>
                  )}

                  {user.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {user.location}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {/* Bio (only for default variant) */}
              {variant === 'default' && user.bio && (
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    mb: 2,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {user.bio}
                </Typography>
              )}

              {/* Stats */}
              {variant === 'default' && (
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
                      {user.stats?.posts?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Posts
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
                      {user.stats?.followers?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Followers
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
                      {user.stats?.following?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Following
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Follow Button */}
            <Box sx={{ alignSelf: 'flex-start' }}>
              <FollowButton
                userId={user.id}
                initialFollowing={isFollowing}
                onFollow={handleFollow}
                size={variant === 'compact' ? 'small' : 'medium'}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default UserCard