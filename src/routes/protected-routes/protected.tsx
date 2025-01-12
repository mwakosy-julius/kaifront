import {
  ProtectedRoot,
  LazyDashboard,
  ProtectedNotFound
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
        path: '*',
        element: <ProtectedNotFound />,
      },
    ],
  },
];