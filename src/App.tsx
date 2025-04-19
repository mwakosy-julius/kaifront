import {
  // Navigate,
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import { publicRoutes } from "./routes/public-routes/public";
import { protectedRoutes } from "./routes/protected-routes/protected";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/providers/theme-provider";

const routes: RouteObject[] = [...publicRoutes, ...protectedRoutes];

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
