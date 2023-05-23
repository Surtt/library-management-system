import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { Button as Btn, useTheme } from '@mui/material';

interface ButtonProps extends PropsWithChildren {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  children: ReactNode;
  onClick?: () => void;
  styles?: CSSProperties;
  type?: 'button' | 'reset' | 'submit' | undefined;
  size?: 'small' | 'large' | 'medium' | undefined;
}

const Button = ({ variant, children, onClick, type, size }: ButtonProps) => {
  const theme = useTheme();
  return (
    <Btn
      type={type}
      size={size}
      onClick={onClick}
      variant={variant}
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
        },
      }}
    >
      {children}
    </Btn>
  );
};

export default Button;
