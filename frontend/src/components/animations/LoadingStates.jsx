import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

// Pulse Loading Animation
export const PulseLoader = ({ size = 40, color = '#667eea' }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
        margin: '0 auto'
      }}
    />
  )
}

// Wave Loading Animation
export const WaveLoader = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      {[0, 1, 2, 3, 4].map((item) => (
        <motion.div
          key={item}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: item * 0.1,
            ease: "easeInOut"
          }}
          style={{
            width: 4,
            height: 20,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2
          }}
        />
      ))}
    </Box>
  )
}

// Bouncing Dots Loader
export const BouncingDots = ({ color = '#667eea', size = 8 }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: item * 0.2,
            ease: "easeInOut"
          }}
          style={{
            width: size,
            height: size,
            background: color,
            borderRadius: '50%'
          }}
        />
      ))}
    </Box>
  )
}

// Shimmer Loading Effect
export const ShimmerLoader = ({ width = '100%', height = 100, borderRadius = 8 }) => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
        backgroundSize: '200% 100%'
      }}
    />
  )
}

// Page Loading Screen
export const PageLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          SocialPost
        </Typography>
      </motion.div>

      <WaveLoader />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading your experience...
        </Typography>
      </motion.div>
    </Box>
  )
}

// Progress Bar Loader
export const ProgressLoader = ({ progress = 0, height = 4 }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: height / 2,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: height / 2
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          borderRadius: height / 2
        }}
      />
    </Box>
  )
}