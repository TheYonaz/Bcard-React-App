import React, {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  useMemo,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
type Props = {
  children: ReactNode;
};
type ContextArgs = {
  isDark: boolean;
  toggleDarkMode: () => void;
};
export const ThemeContext = React.createContext<ContextArgs | null>(null);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
const ThemeProviders1: React.FC<Props> = ({ children }) => {
  const [isDark, setDark] = useState(false);

  const toggleDarkMode = useMemo(() => {
    return () => setDark((prev) => !prev);
  }, []);

  const theme = createTheme({ palette: { mode: !isDark ? "dark" : "light" } });
  return (
    <>
      <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeProviders1;
