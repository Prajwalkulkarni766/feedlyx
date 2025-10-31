import { Box, Skeleton, Card, Stack } from '@mui/material'

// Post Loading Skeleton
export const PostSkeleton = () => {
  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ ml: 2, flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={16} />
        </Box>
      </Box>

      {/* Content */}
      <Skeleton variant="text" height={18} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={18} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={18} sx={{ mb: 2 }} />

      {/* Image */}
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />

      {/* Engagement Bar */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={60} height={20} />
      </Box>
    </Card>
  )
}

// Feed Loading Skeleton
export const FeedSkeleton = ({ count = 3 }) => {
  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </Box>
  )
}

// Profile Loading Skeleton
export const ProfileSkeleton = () => {
  return (
    <Box>
      {/* Cover Photo */}
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />

      {/* Avatar and Basic Info */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3, mt: -8 }}>
        <Skeleton variant="circular" width={120} height={120} sx={{ border: 4, borderColor: 'background.paper' }} />
        <Box sx={{ ml: 3, flex: 1 }}>
          <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="40%" height={20} />
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        {[1, 2, 3].map((item) => (
          <Box key={item} sx={{ textAlign: 'center', flex: 1 }}>
            <Skeleton variant="text" height={28} />
            <Skeleton variant="text" width="60%" height={16} />
          </Box>
        ))}
      </Box>

      {/* Bio */}
      <Skeleton variant="text" height={18} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={18} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={18} sx={{ mb: 3 }} />
    </Box>
  )
}

// Comment Loading Skeleton
export const CommentSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Skeleton variant="circular" width={32} height={32} />
      <Box sx={{ ml: 1, flex: 1 }}>
        <Skeleton variant="text" width="40%" height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" height={14} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="30%" height={12} />
      </Box>
    </Box>
  )
}