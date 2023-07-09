import React, { ReactNode } from "react";
import { Paper as MuiPaper } from "@mui/material";
import { useTheme } from "../../providers1/ThemeProviders1";

type Props = {
  children: ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <MuiPaper
      sx={{
        minHeight: "90vh",
        backgroundColor: !isDark ? "#333333" : "#e3f2fd",
      }}
    >
      {children}
    </MuiPaper>
  );
};

export default Main;
