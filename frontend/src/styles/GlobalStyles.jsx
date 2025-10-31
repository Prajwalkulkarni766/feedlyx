import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

const GlobalStyles = () => {
  return (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        // Custom scrollbar
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#1e293b',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#475569',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#64748b',
        },
        // Button ripple effect
        '.button-ripple': {
          transition: 'left 0.5s ease',
        },
        '.MuiButton-root:hover .button-ripple': {
          left: '100%',
        },
        // Shimmer animation
        '@keyframes shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        // Pulse animation
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.5,
          },
        },
        // Bounce animation
        '@keyframes bounce': {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0, -8px, 0)',
          },
          '70%': {
            transform: 'translate3d(0, -4px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -2px, 0)',
          },
        },
        // Fade in up animation
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, 20px, 0)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          },
        },
        // Gradient text animation
        '@keyframes gradientText': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        // Custom cursor effects
        '.magnetic-hover': {
          transition: 'transform 0.3s ease',
        },
        '.magnetic-hover:hover': {
          transform: 'scale(1.05)',
        },
        // Smooth transitions for all interactive elements
        'button, a, .interactive': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
        },
        // Focus styles for accessibility
        '*:focus-visible': {
          outline: '2px solid #667eea',
          outlineOffset: '2px',
          borderRadius: '4px',
        },
      }}
    />
  );
};

export default GlobalStyles;