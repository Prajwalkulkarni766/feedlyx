import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,    // Mobile
      md: 768,    // Tablet
      lg: 1024,   // Desktop
      xl: 1280,   // Large Desktop
      xxl: 1536,  // Extra Large
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#667eea',
      light: '#a3b5ff',
      dark: '#5a6fd8',
    },
    secondary: {
      main: '#f5576c',
      light: '#ff8a9c',
      dark: '#bc3c4e',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '2rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.75rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '1.75rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '1.5rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '1.25rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '0.8125rem',
      },
    },
    caption: {
      fontSize: '0.75rem',
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '0.6875rem',
      },
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '0.8125rem',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          [createTheme().breakpoints.down('sm')]: {
            padding: '6px 12px',
            minHeight: '36px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          [createTheme().breakpoints.down('sm')]: {
            borderRadius: 12,
            margin: '0 8px',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [createTheme().breakpoints.down('sm')]: {
            paddingLeft: 12,
            paddingRight: 12,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          [createTheme().breakpoints.down('sm')]: {
            '& .MuiInputBase-root': {
              fontSize: '16px', // Prevents zoom on iOS
            },
          },
        },
      },
    },
  },
});

export default theme