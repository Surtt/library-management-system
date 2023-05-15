import React from 'react';
import { Box, Theme, Typography, useTheme } from '@mui/material';

type ListProps = {
  icon: (theme: Theme) => JSX.Element;
  text: string;
};
type ListArrayProps = {
  firstColumn: ListProps[];
  secondColumn: ListProps[];
  thirdColumn: ListProps[];
};

const List = ({ firstColumn, secondColumn, thirdColumn }: ListArrayProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        {firstColumn.map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
            {icon(theme)}
            <Typography fontSize={18}>{text}</Typography>
          </Box>
        ))}
      </Box>
      <Box>
        {secondColumn.map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
            {icon(theme)}
            <Typography fontSize={18}>{text}</Typography>
          </Box>
        ))}
      </Box>
      <Box>
        {thirdColumn.map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
            {icon(theme)}
            <Typography fontSize={18}>{text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default List;
