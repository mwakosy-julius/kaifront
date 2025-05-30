import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import { publicRoutes } from "./routes/public-routes/public";
import { protectedRoutes } from "./routes/protected-routes/protected";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";

const routes: RouteObject[] = [...publicRoutes, ...protectedRoutes];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
