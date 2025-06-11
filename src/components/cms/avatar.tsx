import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AvatarBubble = (
    {
        url, className, fallback
    }: {
        url?: string, className?: string, fallback?: string
    }
) => {
    return (
        <Avatar className={className}>
            <AvatarImage src={url ?? "https://github.com/shadcn.png"} />
            <AvatarFallback>
                {fallback ?? "Kai"}
            </AvatarFallback>
        </Avatar>
    )
}

export default AvatarBubble