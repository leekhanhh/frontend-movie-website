import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import ForgotPage from "../pages/ForgotPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

export default function init(routes: object[]) {
  const route = {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // path: "login",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPage />,
      },
    ],
  };
  // push route
  routes.push(route);
}
