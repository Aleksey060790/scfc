import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#20C668',
    },
    secondary: {
      main: '#293147',
    },
    background: {
      default: '#fff',
    },
    error: {
      main: '#E02856',
    }
  },
  overrides: {
    MuiButton: {
      root: {
        padding: '10px 8px',
        height: 40,
        color: '#20C668',
        textTransform: 'none',
        whiteSpace: 'nowrap'
      }
    }
  }
})

export default theme;
