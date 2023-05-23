import { LoadingButton as _LoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

const LoadingButton = styled(_LoadingButton)(({ theme }) => ({
  padding: '0.6rem 0',
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.common.white,
  fontWeight: 500,

  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    transform: 'translateY(-2px)',
  },
}));

export default LoadingButton;
