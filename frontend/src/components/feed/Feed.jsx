import { useRef, useState, useEffect, useCallback } from 'react'
import { Box, Typography, Fab, Zoom } from '@mui/material'
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import PostCard from '../post/PostCard'
import { FeedSkeleton } from '../common'
import { usePosts, useLikePost } from '../../hooks/usePosts'
import { debounce, throttle } from '../../utils/performanceUtils'
import usePerformance from '../../hooks/usePerformance'

const Feed = () => {
  usePerformance('Feed')

  // React Query hooks
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = usePosts()

  const likeMutation = useLikePost()

  // State for UI
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [pullToRefreshState, setPullToRefreshState] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Refs
  const feedRef = useRef()
  const pullStartY = useRef(0)

  // Flatten all pages of posts
  const allPosts = data?.pages?.flatMap(page => page.posts) || []

  // Debounced scroll handler
  const handleScroll = useCallback(
    debounce((e) => {
      const scrollTop = e.target.scrollTop
      setShowScrollTop(scrollTop > 400)
    }, 100),
    []
  )

  // Throttled infinite scroll check
  const checkInfiniteScroll = useCallback(
    throttle(() => {
      if (isFetchingNextPage || !hasNextPage) return

      const { scrollTop, scrollHeight, clientHeight } = feedRef.current
      const scrollPosition = scrollTop + clientHeight

      // Load more when 200px from bottom
      if (scrollPosition >= scrollHeight - 200) {
        fetchNextPage()
      }
    }, 500),
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  )

  // Pull to refresh handlers
  const handleTouchStart = useCallback((e) => {
    if (feedRef.current?.scrollTop === 0) {
      pullStartY.current = e.touches[0].clientY
      setPullToRefreshState(true)
    }
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!pullToRefreshState || pullStartY.current === 0) return

    const currentY = e.touches[0].clientY
    const diff = currentY - pullStartY.current

    if (diff > 0) {
      e.preventDefault()
    }
  }, [pullToRefreshState])

  const handleTouchEnd = useCallback((e) => {
    if (pullToRefreshState) {
      setRefreshing(true)
      setPullToRefreshState(false)
      refetch().finally(() => {
        setRefreshing(false)
      })
    }
    pullStartY.current = 0
  }, [pullToRefreshState, refetch])

  // Post interaction handlers
  const handleLike = useCallback((postId, liked) => {
    likeMutation.mutate({ postId, liked })
  }, [likeMutation])

  const handleComment = useCallback((post) => {
    console.log('Comment on post:', post.id)
  }, [])

  const handleShare = useCallback((post) => {
    console.log('Share post:', post.id)
  }, [])

  // Scroll event listeners
  useEffect(() => {
    const currentRef = feedRef.current
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll)
      currentRef.addEventListener('scroll', checkInfiniteScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
        currentRef.removeEventListener('scroll', checkInfiniteScroll)
      }
    }
  }, [handleScroll, checkInfiniteScroll])

  // Loading states
  if (isLoading && allPosts.length === 0) {
    return <FeedSkeleton count={5} />
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading posts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error?.message || 'Please try refreshing the page'}
        </Typography>
      </Box>
    )
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
        {refreshing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 60 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 2,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Typography variant="body2" color="primary.main">
                  Refreshing...
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      <Box sx={{ pb: 2 }}>
        <AnimatePresence mode="popLayout">
          {allPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
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
        {isFetchingNextPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FeedSkeleton count={2} />
          </motion.div>
        )}

        {/* End of Feed Message */}
        {!hasNextPage && allPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                🎉 You've reached the end of the feed!
              </Typography>
            </Box>
          </motion.div>
        )}
      </Box>

      {/* Scroll to Top FAB */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={() => feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          size="medium"
          sx={{
            position: 'fixed',
            bottom: { xs: 80, sm: 24 },
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <ExpandLessIcon />
        </Fab>
      </Zoom>

      {/* Empty State */}
      {!isLoading && allPosts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No posts yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Be the first to share something amazing! ✨
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Feed