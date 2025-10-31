import { Box } from '@mui/material'
import LoginForm from '../../components/auth/LoginForm'

const Login = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <LoginForm />
    </Box>
  )
}

export default Login