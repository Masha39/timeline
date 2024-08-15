import { ButtonProps, Button as MuiButton } from "@mui/material";
import { PropsWithChildren } from "react";

const variantStyles = {
  contained: {
    backgroundColor: "rgb(246, 73, 100)",
    "&:hover": {
      backgroundColor: "rgb(230, 73, 100)",
    },
  },
  outlined: {
    color: "rgb(7, 5, 76)",
    borderColor: "rgb(7, 5, 76)",
    "&:hover": {
      backgroundColor: "rgb(7, 5, 76, 0.05)",
      borderColor: "rgb(7, 5, 76)",
    },
  },
  text: {
    color: "rgb(7, 5, 76)",
    "&:hover": {
      backgroundColor: "rgb(7, 5, 76, 0.05)",
    },
  },
};

export const Button = ({
  children,
  onClick,
  sx,
  variant = "contained",
}: PropsWithChildren<ButtonProps>) => {
  return (
    <MuiButton
      sx={{
        ...variantStyles[variant],
        ...sx,
      }}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
