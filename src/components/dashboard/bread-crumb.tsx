import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const BBreadcrumb = () => {
    const location = useLocation();

    const generateBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(path => path);
        let currentPath = '';

        const items = [
            {
                label: 'Kaidoki',
                path: '/home',
                isLast: paths.length === 0
            }
        ];

        paths.forEach((path, index) => {
            currentPath += `/${path}`;
            items.push({
                label: path.charAt(0).toUpperCase() + path.slice(1),
                path: currentPath,
                isLast: index === paths.length - 1
            });
        });

        return items;
    };

    const breadcrumbs = generateBreadcrumbs();

    if (location.pathname === '/') {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb) => (
                    <React.Fragment key={breadcrumb.path}>
                        <BreadcrumbItem className="cursor-pointer">
                            {breadcrumb.isLast ? (
                                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {!breadcrumb.isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BBreadcrumb;