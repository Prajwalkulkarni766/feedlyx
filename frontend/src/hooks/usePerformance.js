import { useEffect, useRef } from 'react'

const usePerformance = (componentName, options = {}) => {
  const {
    logMount = true,
    logRender = false,
    logUnmount = true,
    warnOnSlowRender = true,
    slowRenderThreshold = 16, // 16ms = 60fps
  } = options

  const mountTime = useRef(performance.now())
  const renderCount = useRef(0)
  const lastRenderTime = useRef(performance.now())

  // Measure render time
  useEffect(() => {
    const now = performance.now()
    const renderTime = now - lastRenderTime.current
    lastRenderTime.current = now

    renderCount.current += 1

    if (logRender) {
      console.log(`🔄 ${componentName} rendered in ${renderTime.toFixed(2)}ms (render #${renderCount.current})`)
    }

    if (warnOnSlowRender && renderTime > slowRenderThreshold) {
      console.warn(`🐌 ${componentName} slow render: ${renderTime.toFixed(2)}ms (threshold: ${slowRenderThreshold}ms)`)
    }
  })

  // Measure mount time and setup cleanup
  useEffect(() => {
    const mountDuration = performance.now() - mountTime.current

    if (logMount) {
      console.log(`🚀 ${componentName} mounted in ${mountDuration.toFixed(2)}ms`)
    }

    if (warnOnSlowRender && mountDuration > slowRenderThreshold) {
      console.warn(`🐌 ${componentName} slow mount: ${mountDuration.toFixed(2)}ms`)
    }

    return () => {
      if (logUnmount) {
        const totalLifeTime = performance.now() - mountTime.current
        console.log(`📊 ${componentName} unmounted after ${totalLifeTime.toFixed(2)}ms (${renderCount.current} renders)`)
      }
    }
  }, [componentName, logMount, logUnmount, warnOnSlowRender, slowRenderThreshold])

  return {
    renderCount: renderCount.current,
    getLastRenderTime: () => {
      const now = performance.now()
      return now - lastRenderTime.current
    },
    getTotalLifeTime: () => {
      return performance.now() - mountTime.current
    }
  }
}

export default usePerformance