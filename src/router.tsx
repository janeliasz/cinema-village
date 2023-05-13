import { createBrowserRouter, Navigate } from "react-router-dom";
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

export default router;
