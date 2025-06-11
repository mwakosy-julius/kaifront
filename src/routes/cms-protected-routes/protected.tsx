import {
    ProtectedRoot,
    LazyDashboard,
    LazyBlogs,
    LazyCreateBlogs
} from "./protected-route-elements";

export const cmsProtectedRoutes = [
    {
        path: "/cms",
        element: <ProtectedRoot />,
        children: [
            {
                index: true,
                element: <LazyDashboard />,
            },
            {
                path: "blogs",
                element: <LazyBlogs />,
            },
            {
                path: "blogs/create",
                element: <LazyCreateBlogs />,
            },
        ],
    },
];
