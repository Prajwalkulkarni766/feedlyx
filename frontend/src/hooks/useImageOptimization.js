// src/hooks/useImageOptimization.js
import { useState, useEffect } from 'react'

const useImageOptimization = (src, options = {}) => {
  const { lazyLoad = true, priority = false } = options
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(!lazyLoad || priority)

  useEffect(() => {
    if (!lazyLoad || priority) {
      setIsInView(true)
      return
    }

    // Simple in-view detection (can be replaced with Intersection Observer)
    const checkInView = () => {
      // For simplicity, we'll consider it in view
      // In a real app, you'd use Intersection Observer
      setIsInView(true)
    }

    // Simulate checking when component mounts
    const timer = setTimeout(checkInView, 100)
    return () => clearTimeout(timer)
  }, [lazyLoad, priority])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoaded(true)
    setHasError(true)
  }

  return {
    src: isInView ? src : null,
    isLoaded,
    hasError,
    handleLoad,
    handleError,
    shouldLoad: isInView
  }
}

export default useImageOptimization