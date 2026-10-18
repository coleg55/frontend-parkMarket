import { createTheme } from "@mui/material/styles";

import "@fontsource/roboto";

const darkMode = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A52A2A',
    },
    secondary: {
      main: '#4682B4',
    },
    accent: {
      main: '#FF8C00',
    },
    background: {
      default: '#0c0c0c',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Typography settings for dark theme
    // Add other typography settings if needed
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

export default darkMode;
