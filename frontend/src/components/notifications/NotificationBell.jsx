import { useState, useRef, useEffect } from 'react'
import {
  IconButton,
  Badge,
  Popover,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@mui/material'
import {
  Notifications as NotificationsIcon,
  Favorite as LikeIcon,
  Chat as CommentIcon,
  PersonAdd as FollowIcon,
  Share as ShareIcon,
  Check as CheckIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomAvatar } from '../common'
import { formatDistanceToNow } from 'date-fns'

// Mock notifications
const mockNotifications = [
  {
    id: 'notif-1',
    type: 'like',
    user: {
      id: 'user-2',
      username: 'sarahj',
      avatar: null
    },
    post: {
      id: 'post-1',
      preview: 'This is amazing! Love the design...'
    },
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 minutes ago
  },
  {
    id: 'notif-2',
    type: 'comment',
    user: {
      id: 'user-3',
      username: 'mike_t',
      avatar: null
    },
    post: {
      id: 'post-1',
      preview: 'Great work! Would love to see more...'
    },
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 'notif-3',
    type: 'follow',
    user: {
      id: 'user-4',
      username: 'design_guru',
      avatar: null
    },
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: 'notif-4',
    type: 'like',
    user: {
      id: 'user-5',
      username: 'tech_lover',
      avatar: null
    },
    post: {
      id: 'post-2',
      preview: 'Working on some exciting new projects...'
    },
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  }
]

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [hasNewNotifications, setHasNewNotifications] = useState(true)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleBellClick = (event) => {
    setAnchorEl(event.currentTarget)
    // Mark all as read when opening
    if (unreadCount > 0) {
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      )
      setHasNewNotifications(false)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <LikeIcon sx={{ color: '#f5576c' }} />
      case 'comment':
        return <CommentIcon sx={{ color: '#4facfe' }} />
      case 'follow':
        return <FollowIcon sx={{ color: '#43e97b' }} />
      case 'share':
        return <ShareIcon sx={{ color: '#fa709a' }} />
      default:
        return <NotificationsIcon />
    }
  }

  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'like':
        return `liked your post`
      case 'comment':
        return `commented on your post`
      case 'follow':
        return `started following you`
      case 'share':
        return `shared your post`
      default:
        return `interacted with your post`
    }
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <IconButton
        onClick={handleBellClick}
        sx={{
          color: 'text.secondary',
          position: 'relative',
          '&:hover': {
            color: 'primary.main',
            background: 'rgba(102, 126, 234, 0.1)'
          }
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          overlap="circular"
          sx={{
            '& .MuiBadge-badge': {
              background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        >
          <NotificationsIcon />
        </Badge>

        {/* Pulsing dot for new notifications */}
        <AnimatePresence>
          {hasNewNotifications && unreadCount === 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                borderRadius: '50%'
              }}
            />
          )}
        </AnimatePresence>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            width: 380,
            maxHeight: 500,
            overflow: 'hidden'
          }
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="h6" color="text.primary" fontWeight="bold">
            Notifications
          </Typography>
        </Box>

        {/* Notifications List */}
        <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
          <AnimatePresence mode="popLayout">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ListItem
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    background: notification.isRead
                      ? 'transparent'
                      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Box sx={{ position: 'relative' }}>
                      <CustomAvatar
                        username={notification.user.username}
                        src={notification.user.avatar}
                        size={40}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          background: 'background.paper',
                          borderRadius: '50%',
                          p: 0.25
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </Box>
                    </Box>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.primary" sx={{ mb: 0.5 }}>
                        <strong>{notification.user.username}</strong> {getNotificationText(notification)}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        {notification.post && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              fontStyle: 'italic',
                              display: 'block',
                              mb: 0.5
                            }}
                          >
                            "{notification.post.preview}"
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </Typography>
                      </Box>
                    }
                  />

                  {/* Unread indicator */}
                  {!notification.isRead && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        ml: 1
                      }}
                    />
                  )}
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>

          {notifications.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No notifications yet
              </Typography>
            </Box>
          )}
        </List>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main'
              }
            }}
          >
            View All Notifications
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default NotificationBell