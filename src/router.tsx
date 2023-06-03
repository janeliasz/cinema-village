import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Shows from "./routes/shows/Shows";
import Reserve from "./routes/reserve/Reserve";
import ShowDetails from "./routes/showDetails/ShowDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="shows" />,
      },
      {
        path: "shows",
        element: <Shows />,
      },
      {
        path: "shows/:id",
        element: <ShowDetails />,
      },
      {
        path: "reserve/:id",
        element: <Reserve />,
      },
    ],
  },
]);

export default router;
