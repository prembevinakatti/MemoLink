import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <SignUpForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/",
      element: <Layout />, // Shared layout component
      children: [
        {
          path: "/home",
          element: <div>Welcome to Home</div>,
        },
        {
          path: "/home/search",
          element: <div>Search Page</div>, // Replace with actual component
        },
        {
          path: "/home/create",
          element: <div>Create Page</div>, // Replace with actual component
        },
        {
          path: "/home/dashboard",
          element: <div>Dashboard Page</div>, // Replace with actual component
        },
        {
          path: "/home/notifications",
          element: <div>Notifications Page</div>, // Replace with actual component
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
