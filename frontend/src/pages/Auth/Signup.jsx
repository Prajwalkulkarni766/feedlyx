import { Box } from '@mui/material'
import SignupForm from '../../components/auth/SignupForm'

const Signup = () => {
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
      <SignupForm />
    </Box>
  )
}

export default Signup