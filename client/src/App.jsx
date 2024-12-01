import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import SearchUser from "./components/SearchUser";
import CreateMemory from "./components/CreateMemory";
import Dashboard from "./components/Dashboard";
import Notifications from "./components/Notifications";

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
          element: <HomePage />,
        },
        {
          path: "/home/search",
          element: <SearchUser />, // Replace with actual component
        },
        {
          path: "/home/create",
          element: <CreateMemory />, // Replace with actual component
        },
        {
          path: "/home/dashboard",
          element: <Dashboard />, // Replace with actual component
        },
        {
          path: "/home/notifications",
          element: <Notifications />, // Replace with actual component
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
