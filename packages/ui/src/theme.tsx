"use client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#FF7757",
      light: "#FFD2C7",
      contrastText: "#fff",
      
    },
    secondary: {
      main: "#331811",
      light: "#61291C",
    },
  },
});

export { ThemeProvider, CssBaseline };
