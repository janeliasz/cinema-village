import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Layout from "./components/Layout";
import Shows from "./routes/shows/Shows";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        children: [
          {
            index: true,
            element: <Navigate to="shows" />,
          },
          {
            path: "shows",
            element: <Shows />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
