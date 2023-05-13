import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shows from "./routes/shows/Shows";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shows />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
