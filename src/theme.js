import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f7fa",
      paper: "rgba(255,255,255,0.6)"
    },
    primary: {
      main: "#111827"
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280"
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h3: {
      fontWeight: 800
    },
    h4: {
      fontWeight: 700
    },
    body1: {
      fontSize: "0.95rem"
    }
  },
  shape: {
    borderRadius: 18
  }
});

export default theme;
