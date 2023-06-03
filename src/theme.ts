import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3C9FF6",
      main: "#158CF4",
      dark: "#0A77D6",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});

export default theme;
