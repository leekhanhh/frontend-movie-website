import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import MoviePage from "../pages/MoviePage";
import ProfilePage from "../pages/ProfilePage";
export default function init(routes: object[]) {
  const route = {
    path: "/",

    element: <MainLayout />,
    errorComponent: ErrorPage,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "/movies",

        element: <MoviePage />,
      },
      {
        path: "/movie/:id",

        element: <MovieDetailPage />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
    ],
  };
  // push route
  routes.push(route);
}
