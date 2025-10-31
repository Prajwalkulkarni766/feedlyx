import { useState, useEffect, useCallback, useRef } from 'react'
import { Box, Typography, Fab, Zoom } from '@mui/material'
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import PostCard from '../post/PostCard'
import { FeedSkeleton } from '../common'

// Mock data generator
const generateMockPosts = (page, pageSize = 5) => {
  const posts = []
  const startIndex = (page - 1) * pageSize

  for (let i = 0; i < pageSize; i++) {
    const id = startIndex + i + 1
    posts.push({
      id: `post-${id}`,
      user: {
        id: `user-${id}`,
        username: `user${id}`,
        avatar: null,
        isVerified: Math.random() > 0.7,
        isOnline: Math.random() > 0.5,
        hasStory: Math.random() > 0.3
      },
      content: id % 3 === 0 ? `This is post number ${id}. Check out this amazing content! 🚀` :
        id % 3 === 1 ? `Just sharing some thoughts here... ✨\nWhat do you think about this?` :
          `Another day, another post! 🌟\n#social #post ${id}`,
      image: id % 4 === 0 ? `https://picsum.photos/600/400?random=${id}` : null,
      likeCount: Math.floor(Math.random() * 50),
      commentCount: Math.floor(Math.random() * 20),
      isLiked: Math.random() > 0.7,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    })
  }

  return posts
}

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [pullToRefreshState, setPullToRefreshState] = useState(0)

  const observer = useRef()
  const lastPostRef = useRef()
  const feedRef = useRef()
  const pullStartY = useRef(0)

  // Load initial posts
  useEffect(() => {
    loadPosts(1, true)
  }, [])

  const loadPosts = async (pageNum, initial = false) => {
    if (initial) setLoading(true)
    else setLoadingMore(true)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

      const newPosts = generateMockPosts(pageNum)

      if (pageNum === 1) {
        setPosts(newPosts)
      } else {
        setPosts(prev => [...prev, ...newPosts])
      }

      // Stop loading more after 5 pages for demo
      setHasMore(pageNum < 5)
      setPage(pageNum)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
      setRefreshing(false)
    }
  }

  // Infinite scroll observer
  const lastPostElementRef = useCallback(node => {
    if (loadingMore) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadPosts(page + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loadingMore, hasMore, page])

  // Scroll to top functionality
  const scrollToTop = () => {
    feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop
    setShowScrollTop(scrollTop > 400)
  }

  // Pull to refresh functionality
  const handleTouchStart = (e) => {
    if (feedRef.current.scrollTop === 0) {
      pullStartY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e) => {
    if (pullStartY.current === 0) return

    const currentY = e.touches[0].clientY
    const diff = currentY - pullStartY.current

    if (diff > 0) {
      e.preventDefault()
      const progress = Math.min(diff / 150, 1)
      setPullToRefreshState(progress)
    }
  }

  const handleTouchEnd = (e) => {
    if (pullToRefreshState > 0.7) {
      setRefreshing(true)
      setPullToRefreshState(0)
      loadPosts(1, true)
    } else {
      setPullToRefreshState(0)
    }
    pullStartY.current = 0
  }

  const handleLike = async (postId, liked) => {
    console.log(`Post ${postId} ${liked ? 'liked' : 'unliked'}`)
    // In a real app, you would make an API call here
  }

  const handleComment = (post) => {
    console.log('Comment on post:', post.id)
    // Navigate to comments or open comment modal
  }

  const handleShare = (post) => {
    console.log('Share post:', post.id)
    // Implement share functionality
  }

  if (loading && posts.length === 0) {
    return <FeedSkeleton count={3} />
  }

  return (
    <Box
      ref={feedRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        height: '100%',
        overflow: 'auto',
        position: 'relative',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}
    >
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {pullToRefreshState > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: Math.min(pullToRefreshState * 80, 80)
            }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 2,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <motion.div
                animate={{ rotate: refreshing ? 360 : 0 }}
                transition={{
                  rotate: {
                    duration: 1,
                    repeat: refreshing ? Infinity : 0,
                    ease: "linear"
                  }
                }}
              >
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {refreshing ? 'Refreshing...' : 'Pull to refresh'}
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      <Box sx={{ pb: 2 }}>
        <AnimatePresence mode="popLayout">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              ref={index === posts.length - 1 ? lastPostElementRef : null}
            >
              <PostCard
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading More Indicator */}
        {loadingMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FeedSkeleton count={2} />
          </motion.div>
        )}

        {/* End of Feed Message */}
        {!hasMore && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                px: 2
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontStyle: 'italic' }}
              >
                🎉 You've reached the end of the feed!
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: 'block' }}
              >
                Come back later for more amazing content
              </Typography>
            </Box>
          </motion.div>
        )}
      </Box>

      {/* Scroll to Top FAB */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={scrollToTop}
          size="medium"
          sx={{
            position: 'fixed',
            bottom: { xs: 80, sm: 24 },
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            }
          }}
        >
          <ExpandLessIcon />
        </Fab>
      </Zoom>

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            textAlign: 'center',
            px: 2
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
          >
            No posts yet
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Be the first to share something amazing! ✨
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Feed