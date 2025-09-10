import { createTheme } from '@mui/material'

export const sxTextField = {
  '& label.Mui-focused': {
    color: '#4e2096',
  },
  '& .MuiFormHelperText-root': {
    margin: '1px 0px 0 1px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4e2096',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4e2096',
    },
    '&:hover fieldset': {
      borderColor: '#4e2096',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4e2096',
    },
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    '& fieldset': {
      borderColor: '#4e2096 !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4e2096 !important',
    },
    '& .MuiAutocomplete-input': {
      color: '#4e2096 !important',
    },
  },
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4e2096',
      light: '#019F95',
      dark: '#019F95',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#13477B',
      light: '#34495E',
      dark: '#1565c0',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EF4058',
      light: '#CA3449',
      dark: '#CA3449',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ECC005',
      light: '#E0B605',
      dark: '#E0B605',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#FFFFFF',
    },
  },
})

export const sx = {
  '& label.Mui-focused': {
    color: '#4e2096',
  },
  '& .MuiFormHelperText-root': {
    margin: '1px 0px 0 1px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4e2096',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4e2096',
    },
    '&:hover fieldset': {
      borderColor: '#4e2096',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4e2096',
    },
  },
}

export const standard = {
  '& .MuiInput-underline:before': {
    borderBottomColor: 'whitesmoke',
  },
  '& .MuiFormHelperText-root': {
    margin: '1px 0px 0 1px',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInputBase-root': {
    color: 'white',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'white',
  },
}

export const sxAutoComplete = {
  '& label.Mui-focused': {
    color: '#4e2096',
  },
  '& .MuiFormHelperText-root': {
    margin: '1px 0px 0 1px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4e2096',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4e2096',
    },
    '&:hover fieldset': {
      borderColor: '#4e2096',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4e2096',
    },
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    '& fieldset': {
      borderColor: '#4e2096 !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4e2096 !important',
    },
    '& .MuiAutocomplete-input': {
      color: '#4e2096 !important',
    },
  },
}
