import React, { CSSProperties } from 'react';
import { Box, Modal as ModalComp, Typography, useTheme } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/button';
import { useStateContext } from '@/context';
import { useBookCopiesById } from '@/features/book-copies/queries/useBookCopiesById';
import { useBookById } from '@/features/books/queries/useBookById';
import { useCategoryById } from '@/features/categories/queries/useCategoryById';
import { useBorrowBook } from '@/features/checkout/queries/useBorrowBook';

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  style?: CSSProperties;
};

const Modal = ({ open, handleClose, style }: ModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: book } = useBookById(id);
  const { data: category } = useCategoryById(book?.category as string);
  const { data: bookCopies, refetch } = useBookCopiesById(book?.id as string);
  const { mutate } = useBorrowBook();

  const date = new Intl.DateTimeFormat('eu-EU');
  const user = useStateContext().state.authUser;

  const handleBorrowBook = () => {
    if (!user) {
      navigate('/signin', { state: location.pathname });
    }

    refetch();
    const bookCopyId = bookCopies?.find((bookCopy) => bookCopy.status)?.id as string;
    mutate({ bookCopyId, userId: user?.id });
  };

  return (
    <ModalComp
      sx={style}
      onClick={() => navigate(-1)}
      open={open}
      onClose={handleClose}
      disableAutoFocus
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          maxHeight: '80%',
          overflowY: 'scroll',
          width: '55%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: theme.palette.grey['200'],
          p: { xs: '1rem', sm: '2rem' },
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', columnGap: 5 }}>
          <Box component="img" src={book?.image} width={300} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 2,
              justifyContent: 'space-between',
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {book?.title}
            </Typography>
            <Typography id="modal-modal-description">{book?.description}</Typography>
            <Typography id="modal-modal-description">
              <b>Authors:</b> {book?.authors?.map((author) => author.name)}
            </Typography>
            <Typography id="modal-modal-description">
              <b>Category:</b>{' '}
              <Link to={`/books/${category?.name.toLowerCase()}` as string}>{category?.name}</Link>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                columnGap: 2,
                borderTop: `1px solid ${theme.palette.grey['300']}`,
              }}
            >
              <Typography
                id="modal-modal-description"
                variant="body2"
                sx={{ textAlign: 'center', mt: 2 }}
              >
                <b>ISBN:</b> <br /> {book?.isbn}
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="body2"
                sx={{ textAlign: 'center', mt: 2 }}
              >
                <b>Publisher:</b>
                <br /> {book?.publisher}
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="body2"
                sx={{ textAlign: 'center', mt: 2 }}
              >
                <b>Publication date:</b>
                <br /> {book && date.format(new Date(book?.publishedDate as string))}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleBorrowBook}
              disabled={!book?.status}
            >
              {book?.status ? 'Borrow' : 'Not available'}
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalComp>
  );
};

export default Modal;
