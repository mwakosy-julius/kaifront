import {
    PublicRoot,
    LazyLandingPage,
    LazySignIn,
    LazyRegister,
    PublicNotFound
} from './public-route-elements';

export const publicRoutes = [
    {
        path: '/',
        element: <PublicRoot />,
        children: [
            {
                path: '',
                element: <LazyLandingPage />,
            },
            {
                path: 'sign-in',
                element: <LazySignIn />,
            },
            {
                path: 'sign-up',
                element: <LazyRegister />,
            },
            {
                path: '*',
                element: <PublicNotFound />,
            },
        ],
    },
];