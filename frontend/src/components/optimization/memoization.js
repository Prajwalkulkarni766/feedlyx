import { memo, useMemo, useCallback } from 'react'

// Higher-order component for memoization with custom comparison
export const memoWithProps = (Component, propsAreEqual) => {
  return memo(Component, propsAreEqual)
}

// Custom hook for expensive computations
export const useExpensiveComputation = (computeFn, deps) => {
  return useMemo(() => computeFn(), deps)
}

// Custom hook for stable callbacks
export const useStableCallback = (callback, deps) => {
  return useCallback(callback, deps)
}

// Props comparison function for common cases
export const propsAreEqual = (prevProps, nextProps) => {
  // Simple shallow comparison
  const prevKeys = Object.keys(prevProps)
  const nextKeys = Object.keys(nextProps)

  if (prevKeys.length !== nextKeys.length) return false

  return prevKeys.every(key => {
    if (key === 'children') return true // Skip children comparison
    return prevProps[key] === nextProps[key]
  })
}

// Specific comparison for post components
export const postPropsAreEqual = (prevProps, nextProps) => {
  return (
    prevProps.post.id === nextProps.post.id &&
    prevProps.post.likeCount === nextProps.post.likeCount &&
    prevProps.post.commentCount === nextProps.post.commentCount &&
    prevProps.post.isLiked === nextProps.post.isLiked &&
    prevProps.post.content === nextProps.post.content
  )
}

// Export all utilities
export default {
  memoWithProps,
  useExpensiveComputation,
  useStableCallback,
  propsAreEqual,
  postPropsAreEqual
}