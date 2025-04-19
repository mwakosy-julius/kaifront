import {
  ProtectedRoot,
  LazyDashboard,
  LazyPairwiseAlignment,
  LazyGCContent,
} from "./protected-route-elements";

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedRoot />,
    children: [
      {
        index: true,
        element: <LazyDashboard />,
      },
      {
        path: "tools/pairwise_alignment",
        element: <LazyPairwiseAlignment />,
      },
      {
        path: "tools/gc_content",
        element: <LazyGCContent />,
      },
    ],
  },
];
