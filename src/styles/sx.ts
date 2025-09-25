import { createTheme } from '@mui/material'

export const sxTextField = {
  '& label.Mui-focused': {
    color: '#2563EB',
  },
  '& .MuiFormHelperText-root': {
    margin: '1px 0px 0 1px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#2563EB',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#2563EB',
    },
    '&:hover fieldset': {
      borderColor: '#2563EB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
    },
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    '& fieldset': {
      borderColor: '#2563EB !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2563EB !important',
    },
    '& .MuiAutocomplete-input': {
      color: '#2563EB !important',
    },
  },
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1D4ED8',
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
    color: '#2563EB',
  },
  '& .MuiFormHelperText-root': {
    margin: '1px 0px 0 1px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#2563EB',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#2563EB',
    },
    '&:hover fieldset': {
      borderColor: '#2563EB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
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
    color: '#2563EB',
  },
  '& .MuiFormHelperText-root': {
    margin: '1px 0px 0 1px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#2563EB',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#2563EB',
    },
    '&:hover fieldset': {
      borderColor: '#2563EB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
    },
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    '& fieldset': {
      borderColor: '#2563EB !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2563EB !important',
    },
    '& .MuiAutocomplete-input': {
      color: '#2563EB !important',
    },
  },
}
