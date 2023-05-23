import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { Button as Btn, useTheme } from '@mui/material';

interface ButtonProps extends PropsWithChildren {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  children: ReactNode;
  onClick?: () => void;
  styles?: CSSProperties;
  type?: 'button' | 'reset' | 'submit' | undefined;
  size?: 'small' | 'large' | 'medium' | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button = ({ variant, children, onClick, type, size, disabled, fullWidth }: ButtonProps) => {
  const theme = useTheme();
  return (
    <Btn
      type={type}
      size={size}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      sx={{
        width: fullWidth ? '100%' : 'auto',
        backgroundColor: disabled ? theme.palette.grey['300'] : theme.palette.secondary.light,
        border: `1px solid ${theme.palette.secondary.dark}`,
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          border: `1px solid ${theme.palette.secondary.light}`,
        },
      }}
    >
      {children}
    </Btn>
  );
};

export default Button;
