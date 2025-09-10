import { memo } from 'react'
import { styled, TextField } from '@mui/material'

const InputTextField = styled(TextField)({
  '& input': {
    fontFamily: 'Montserrat !important',
    fontSize: '14px',
    color: '#333',
  },
  '& label': {
    fontFamily: 'Montserrat !important',
    fontSize: '14px',
    color: '#333',
  },
  '& label.Mui-focused': {
    color: '#4e2096 ',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '##4e2096',
  },
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Montserrat !important',
    '& fieldset': {
      borderColor: '##4e2096',
    },
    '&:hover fieldset': {
      borderColor: '##4e2096',
    },
    '&.Mui-focused fieldset': {
      borderColor: '##4e2096',
    },
  },
  '& .MuiFilledInput-root': {
    fontFamily: 'Montserrat !important',
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    '&:before': {
      borderBottomColor: '#4e2096',
    },
    '&:hover:before': {
      borderBottomColor: '#4e2096',
    },
    '&:after': {
      borderBottomColor: '#4e2096',
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Montserrat !important',
    fontSize: '14px',
    color: '#333',
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'Montserrat !important',
    fontSize: '10px',
    marginLeft: 2,
  },
})
export default memo(InputTextField)
