import {
  ProtectedRoot,
  LazyDashboard,
  ProtectedNotFound,
  LazyPairwiseAlignment,
  LazyGCContent
} from './protected-route-elements';

export const protectedRoutes = [
  {
    path: '/',
    element: <ProtectedRoot />,
    children: [
      {
        path: '/dashboard',
        element: <LazyDashboard />,
      },
      {
        path: '/dashboard/tools/pairwise-alignment',
        element: <LazyPairwiseAlignment />,
      },
      {
        path: '/dashboard/tools/gc-content',
        element: <LazyGCContent />,
      },
      {
        path: '*',
        element: <ProtectedNotFound />,
      }
    ],
  },
];