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
      }}
    />
  );
};

export default GlobalStyles;