import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <>
      {(isFetching || isMutating) && (
        <>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </>
      )}
    </>
  );
};

export default Loading;
