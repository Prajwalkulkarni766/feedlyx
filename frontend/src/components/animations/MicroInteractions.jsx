import { IconButton, Box } from '@mui/material'
import { motion } from 'framer-motion'

// Animated Icon Button
export const AnimatedIconButton = ({ children, onClick, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <IconButton onClick={onClick} {...props}>
        {children}
      </IconButton>
    </motion.div>
  )
}

// Scroll Progress Indicator
export const ScrollProgress = () => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        transformOrigin: '0%',
        zIndex: 9999
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.1 }}
    />
  )
}

// Typewriter Effect
export const TypewriterText = ({ text, delay = 0, duration = 0.5 }) => {
  return (
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: 'auto' }}
      transition={{ duration, delay, ease: "easeInOut" }}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      {text}
    </motion.span>
  )
}

// Confetti Effect
export const ConfettiEffect = ({ isActive = false }) => {
  if (!isActive) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0,
            opacity: 1
          }}
          animate={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: window.innerHeight + 100,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: 10 + Math.random() * 20,
            height: 10 + Math.random() * 20,
            background: `linear-gradient(135deg, ${['#667eea', '#f5576c', '#4facfe', '#43e97b', '#fa709a'][Math.floor(Math.random() * 5)]
              } 0%, ${['#764ba2', '#f093fb', '#00f2fe', '#38f9d7', '#fee140'][Math.floor(Math.random() * 5)]
              } 100%)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '20%'
          }}
        />
      ))}
    </Box>
  )
}

// Heart Beat Animation
export const HeartBeat = ({ isBeating = false, children }) => {
  return (
    <motion.div
      animate={isBeating ? {
        scale: [1, 1.2, 1],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}}
    >
      {children}
    </motion.div>
  )
}

// Shake Animation
export const Shake = ({ isShaking = false, children }) => {
  return (
    <motion.div
      animate={isShaking ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: {
          duration: 0.5,
          ease: "easeInOut"
        }
      } : {}}
    >
      {children}
    </motion.div>
  )
}