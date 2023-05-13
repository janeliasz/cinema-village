import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import router from "./router";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
