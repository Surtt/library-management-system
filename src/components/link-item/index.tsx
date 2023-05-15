import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkItem = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.secondary.light,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export default LinkItem;
