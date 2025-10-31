import { useState, useRef, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

const OptimizedImage = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = 8,
  placeholderColor = '#1e293b',
  lazyLoad = true,
  priority = false,
  onLoad,
  onError,
  sx = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(!lazyLoad || priority)
  const imgRef = useRef()
  const observerRef = useRef()

  useEffect(() => {
    if (!lazyLoad || priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before element comes into view
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [lazyLoad, priority])

  const handleLoad = (e) => {
    setIsLoaded(true)
    setHasError(false)
    onLoad?.(e)
  }

  const handleError = (e) => {
    setIsLoaded(true)
    setHasError(true)
    onError?.(e)
  }

  // Generate low-quality image placeholder (LQIP) style
  const getPlaceholderStyle = () => ({
    width,
    height,
    background: placeholderColor,
    borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  })

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      {/* Loading Skeleton */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={getPlaceholderStyle()}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{
                background: `linear-gradient(90deg, #1e293b 0%, #334155 50%, #1e293b 100%)`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image */}
      <AnimatePresence>
        {isInView && !hasError && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit,
              borderRadius,
              display: isLoaded ? 'block' : 'none'
            }}
            loading={lazyLoad ? 'lazy' : 'eager'}
            decoding="async"
          />
        )}
      </AnimatePresence>

      {/* Error Fallback */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={getPlaceholderStyle()}
          >
            <Box
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                p: 2
              }}
            >
              <Typography variant="caption">
                Failed to load image
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default OptimizedImage