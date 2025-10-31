import { Box } from '@mui/material'
import { motion } from 'framer-motion'

// Glass Morphism Hover Effect
export const GlassHover = ({ children, intensity = 0.1, ...props }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        background: `rgba(255, 255, 255, ${intensity})`
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Floating Hover Effect
export const FloatingHover = ({ children, intensity = 5, ...props }) => {
  return (
    <motion.div
      whileHover={{
        y: -intensity,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Gradient Border Hover Effect
export const GradientBorderHover = ({ children, ...props }) => {
  return (
    <motion.div
      whileHover={{
        background: [
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
          'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        padding: 2,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
      {...props}
    >
      <Box
        sx={{
          background: 'rgba(30, 41, 59, 0.95)',
          borderRadius: 10,
          backdropFilter: 'blur(20px)'
        }}
      >
        {children}
      </Box>
    </motion.div>
  )
}

// Magnetic Pull Effect
export const MagneticPull = ({ children, pullStrength = 0.1, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={pullStrength}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Ripple Hover Effect
export const RippleHover = ({ children, color = 'rgba(102, 126, 234, 0.3)', ...props }) => {
  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      style={{ position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      {children}

      <motion.div
        variants={{
          hover: {
            scale: 2,
            opacity: 0
          },
          tap: {
            scale: 3,
            opacity: 0
          }
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 100,
          height: 100,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) scale(0)'
        }}
      />
    </motion.div>
  )
}

// Glow Hover Effect
export const GlowHover = ({ children, glowColor = '#667eea', ...props }) => {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Tilt Hover Effect
export const TiltHover = ({ children, intensity = 5, ...props }) => {
  return (
    <motion.div
      whileHover={{
        rotateX: intensity,
        rotateY: intensity,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}