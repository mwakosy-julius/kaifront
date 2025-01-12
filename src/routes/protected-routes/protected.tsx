import {
  ProtectedRoot,
  LazyDashboard,
  ProtectedNotFound,
  LazyPairwiseAlignment
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
        path: '*',
        element: <ProtectedNotFound />,
      }
    ],
  },
];