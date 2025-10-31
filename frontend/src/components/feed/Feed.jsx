import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Box, Typography, Fab, Zoom } from '@mui/material'
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import PostCard from '../post/PostCard'
import { FeedSkeleton } from '../common'
import { debounce, throttle } from '../../utils/performanceUtils' // Fixed import
import usePerformance from '../../hooks/usePerformance'

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
  // Track performance of the Feed component
  usePerformance('Feed', {
    logMount: true,
    logRender: false,
    warnOnSlowRender: true
  })

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [pullToRefreshState, setPullToRefreshState] = useState(0)

  const feedRef = useRef()
  const pullStartY = useRef(0)

  // Memoize post data to prevent unnecessary re-renders
  const memoizedPosts = useMemo(() => posts, [posts])

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
      if (loadingMore || !hasMore) return

      const { scrollTop, scrollHeight, clientHeight } = feedRef.current
      const scrollPosition = scrollTop + clientHeight

      if (scrollPosition >= scrollHeight - 100) {
        loadPosts(page + 1)
      }
    }, 500),
    [loadingMore, hasMore, page]
  )

  // Optimized post handlers with useCallback
  const handleLike = useCallback(async (postId, liked) => {
    console.log(`Post ${postId} ${liked ? 'liked' : 'unliked'}`)
  }, [])

  const handleComment = useCallback((post) => {
    console.log('Comment on post:', post.id)
  }, [])

  const handleShare = useCallback((post) => {
    console.log('Share post:', post.id)
  }, [])

  // Memoized load posts function
  const loadPosts = useCallback(async (pageNum, initial = false) => {
    if (initial) setLoading(true)
    else setLoadingMore(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newPosts = generateMockPosts(pageNum)

      if (pageNum === 1) {
        setPosts(newPosts)
      } else {
        setPosts(prev => [...prev, ...newPosts])
      }

      setHasMore(pageNum < 5)
      setPage(pageNum)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
      setRefreshing(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    loadPosts(1, true)
  }, [loadPosts])

  // Scroll event listener with cleanup
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

  // Memoized post cards to prevent re-renders
  const renderedPosts = useMemo(() =>
    memoizedPosts.map((post, index) => (
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
    ))
    , [memoizedPosts, handleLike, handleComment, handleShare])

  if (loading && posts.length === 0) {
    return <FeedSkeleton count={3} />
  }

  return (
    <Box
      ref={feedRef}
      onScroll={handleScroll}
      onTouchStart={(e) => {
        if (feedRef.current?.scrollTop === 0) {
          pullStartY.current = e.touches[0].clientY
        }
      }}
      onTouchMove={(e) => {
        if (pullStartY.current === 0) return

        const currentY = e.touches[0].clientY
        const diff = currentY - pullStartY.current

        if (diff > 0) {
          e.preventDefault()
          const progress = Math.min(diff / 150, 1)
          setPullToRefreshState(progress)
        }
      }}
      onTouchEnd={(e) => {
        if (pullToRefreshState > 0.7) {
          setRefreshing(true)
          setPullToRefreshState(0)
          loadPosts(1, true)
        } else {
          setPullToRefreshState(0)
        }
        pullStartY.current = 0
      }}
      sx={{
        height: '100%',
        overflow: 'auto',
        position: 'relative',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}
    >
      {/* Rest of the component remains the same */}
      <Box sx={{ pb: 2 }}>
        <AnimatePresence mode="popLayout">
          {renderedPosts}
        </AnimatePresence>

        {loadingMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FeedSkeleton count={2} />
          </motion.div>
        )}

        {!hasMore && posts.length > 0 && (
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
    </Box>
  )
}

export default Feed