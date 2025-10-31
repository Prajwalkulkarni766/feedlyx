import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  Slide,
  LinearProgress
} from '@mui/material'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const passwordStrength = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)
  }

  const passwordScore = Object.values(passwordStrength).filter(Boolean).length
  const passwordStrengthPercent = (passwordScore / 5) * 100

  const getPasswordStrengthColor = () => {
    if (passwordScore <= 2) return '#f5576c'
    if (passwordScore <= 4) return '#f093fb'
    return '#4facfe'
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      return 'Please fill in all fields'
    }

    if (formData.username.length < 3) {
      return 'Username must be at least 3 characters'
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email address'
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match'
    }

    if (passwordScore < 3) {
      return 'Please choose a stronger password'
    }

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      // Simulate API call - Replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful signup
      const mockUser = {
        id: '1',
        username: formData.username,
        email: formData.email,
        avatar: null
      }
      const mockToken = 'mock_jwt_token'

      signup(mockUser, mockToken)
      navigate('/')
    } catch (err) {
      setError('An error occurred during signup. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Slide in={true} direction="up" timeout={500}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          margin: '0 auto',
          padding: 4,
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3
          }}
        >
          Create Account
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', mb: 3 }}
        >
          Join our community today
        </Typography>

        {error && (
          <Fade in={!!error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Fade>
        )}

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: '#667eea'
              }
            }
          }}
        />

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: '#667eea'
              }
            }
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: '#667eea'
              }
            }
          }}
        />

        {formData.password && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={passwordStrengthPercent}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#334155',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getPasswordStrengthColor(),
                  borderRadius: 3
                }
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              Password strength: {passwordScore}/5
            </Typography>
          </Box>
        )}

        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: '#667eea'
              }
            }
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            transform: loading ? 'scale(0.98)' : 'scale(1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              transform: 'scale(1.02)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
            },
            '&:disabled': {
              background: '#475569'
            }
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Creating Account...
            </Box>
          ) : (
            'Create Account'
          )}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Button
              onClick={() => navigate('/login')}
              sx={{
                color: '#667eea',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.1)'
                }
              }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
      </Box>
    </Slide>
  )
}

export default SignupForm