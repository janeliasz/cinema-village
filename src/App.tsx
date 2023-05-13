import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import router from "./router";
import theme from "./theme";
import { showsApi } from "./api/showsApi";

function App() {
  return (
    <ApiProvider api={showsApi}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApiProvider>
  );
}

export default App;
