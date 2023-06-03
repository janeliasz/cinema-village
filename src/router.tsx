import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Shows from "./routes/shows/Shows";
import Reserve from "./routes/reserve/Reserve";
import Movie from "./routes/movie/Movie";

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
        path: "movies/:id",
        element: <Movie />,
      },
      {
        path: "reserve/:id",
        element: <Reserve />,
      },
    ],
  },
]);

export default router;
