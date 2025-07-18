import { cn } from "@/lib/utils";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  overflowHidden?: boolean;
  container?: boolean;
  isInnerPage?: boolean;
}

export const Page: React.FC<PageProps> = ({
  children,
  className = "",
  // overflowHidden = false,
  // container = false,
  // isInnerPage = false,
}) => {
  return (
    <div
      className={cn(
        // `bg-backgorund w-full h-svh flex flex-col`,
        // overflowHidden ? "overflow-hidden" : "overflow-auto",
        // container ? "container mx-auto" : "",
        // isInnerPage ? "h-[calc(100vh-70px)]:" : "",
        className,
      )}
    >
      {children}
    </div>
  );
};
