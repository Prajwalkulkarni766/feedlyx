import { Button, Typography, Box } from '@mui/material'
import Modal from './Modal'

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  isLoading = false
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      actions={
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <Button
            onClick={onClose}
            disabled={isLoading}
            fullWidth
            variant="outlined"
            sx={{
              borderColor: '#475569',
              color: '#94a3b8',
              '&:hover': {
                borderColor: '#64748b',
                color: '#cbd5e1'
              }
            }}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            fullWidth
            variant="contained"
            sx={{
              background: confirmColor === 'error'
                ? 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: confirmColor === 'error'
                  ? 'linear-gradient(135deg, #e53e3e 0%, #ed64a6 100%)'
                  : 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
              },
              '&:disabled': {
                background: '#475569'
              }
            }}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </Box>
      }
    >
      <Typography color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.6 }}>
        {message}
      </Typography>
    </Modal>
  )
}

export default ConfirmationDialog