import { createTheme } from "@mui/material/styles";

import "@fontsource/roboto";

const lightMode = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6B4226',
    },
    secondary: {
      main: '#556B2F',
    },
    accent: {
      main: '#B8860B',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Typography settings for dark theme
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    // Add other component customizations if needed
  },
});

export default lightMode;
