import { useMediaQuery, useTheme } from "@mui/material";

export const useIsMobileSize = () => {
  const theme = useTheme();

  const isXSmall = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.only("sm"));

  return isXSmall || isSmall;
};
