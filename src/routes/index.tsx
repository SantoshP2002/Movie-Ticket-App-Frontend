import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Movies from "../pages/navChildren/Movies";
import Stream from "../pages/navChildren/Stream";
import MovieDetails from "../components/MovieDetails";
import Events from "../pages/navChildren/Events";
// import LoginRedirect from "./LoginRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },

  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/Stream",
    element: <Stream />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
  },
  {
    path: "/Events",
    element: <Events />,
  },

  // AUTH ROUTES
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
