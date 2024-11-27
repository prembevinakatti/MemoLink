import { createBrowserRouter } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import { RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <SignUpForm />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
