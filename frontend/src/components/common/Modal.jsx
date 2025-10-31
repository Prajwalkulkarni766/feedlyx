import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
  Box
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { forwardRef } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          backgroundImage: 'none'
        }
      }}
      {...props}
    >
      {/* Header */}
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            px: 3,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.25rem'
            }}
          >
            {title}
          </Box>

          {showCloseButton && (
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  background: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      {/* Content */}
      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>

      {/* Actions */}
      {actions && (
        <DialogActions
          sx={{
            p: 3,
            pt: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Modal