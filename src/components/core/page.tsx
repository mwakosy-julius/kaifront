import { cn } from "@/lib/utils";

interface PageProps {
    children: React.ReactNode;
    className?: string;
    overflowHidden?: boolean;
    container?: boolean;
}


export const Page: React.FC<PageProps> = ({
    children,
    className = "",
    overflowHidden = false,
    container = false,
}) => {
    return (
        <div className={cn(
            `bg-backgorund w-full h-svh ${className} flex flex-col`,
            overflowHidden ? "overflow-hidden" : "overflow-auto",
            container ? "container mx-auto" : ""
        )}>
            {children}
        </div>
    );
};