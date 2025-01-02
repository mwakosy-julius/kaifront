import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Local imports
import SignIn from "./pages/authentication/sign-in.tsx";
import LandingPage from "./pages/website/landing-page.tsx";
import Dashboard from "./pages/protected/dashboard/index.tsx";

const unanuthenticatedRouter = createBrowserRouter([
  {
    path: "*",
    element: <LandingPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

const authenticatedRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

const App = () => {
  const authenticated = true;

  return (
    <RouterProvider
      router={authenticated ? authenticatedRouter : unanuthenticatedRouter}
    />
  );
};

export default App;
