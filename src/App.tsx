import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Local imports
import SignIn from "./pages/authentication/sign-in.tsx";
import LandingPage from "./pages/website/landing-page.tsx";

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

const App = () => {
  return <RouterProvider router={unanuthenticatedRouter} />;
};

export default App;
