import {
  PublicRoot,
  LazyLandingPage,
  LazySignIn,
  LazyRegister,
  PublicNotFound,
  LazyAbout,
  LazyClerkAuth,
} from "./public-route-elements";

export const publicRoutes = [
  {
    path: "/",
    element: <PublicRoot />,
    children: [
      {
        index: true,
        element: <LazyLandingPage />,
      },
      {
        path: "home",
        element: <LazyLandingPage />,
      },
      {
        path: "about",
        element: <LazyAbout />,
      },
      {
        path: "sign-in",
        element: <LazySignIn />,
      },
      {
        path: "sign-up",
        element: <LazyRegister />,
      },
      {
        path: "clerk",
        element: <LazyClerkAuth />,
      },
      {
        path: "*",
        element: <PublicNotFound />,
      },
    ],
  },
];
