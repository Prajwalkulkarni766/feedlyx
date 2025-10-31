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
          WebkitOverflowScrolling: 'touch', // Momentum scrolling on iOS
          fontSize: '16px', // Base font size for rem units
        },
        body: {
          width: '100%',
          height: '100%',
          // Prevent text size adjustment on orientation change
          WebkitTextSizeAdjust: '100%',
          // Improve font rendering
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        // Custom scrollbar
        '::-webkit-scrollbar': {
          width: '6px',
        },
        '::-webkit-scrollbar-track': {
          background: '#1e293b',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#475569',
          borderRadius: '3px',
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
        // Mobile optimizations
        '@media (max-width: 768px)': {
          // Improve tap targets
          'button, [role="button"]': {
            minHeight: '44px',
            minWidth: '44px',
          },
          // Prevent zoom on input focus
          'input, select, textarea': {
            fontSize: '16px !important',
          },
          // Smooth scrolling
          'html': {
            scrollBehavior: 'smooth',
          },
        },
        // Touch device optimizations
        '@media (hover: none) and (pointer: coarse)': {
          // Disable hover effects on touch devices
          '.hover-effect:hover': {
            transform: 'none !important',
          },
          // Improve touch feedback
          '.MuiButton-root:active, .MuiIconButton-root:active': {
            transform: 'scale(0.95)',
            transition: 'transform 0.1s ease',
          },
        },
        // High DPI screen optimizations
        '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)': {
          // Crisper borders and text
          '.MuiCard-root': {
            borderWidth: '0.5px',
          },
        },
        // Focus styles for accessibility
        '*:focus-visible': {
          outline: '2px solid #667eea',
          outlineOffset: '2px',
          borderRadius: '4px',
        },
        // Selection styles
        '::selection': {
          background: 'rgba(102, 126, 234, 0.3)',
          color: 'white',
        },
      }}
    />
  );
};

export default GlobalStyles;