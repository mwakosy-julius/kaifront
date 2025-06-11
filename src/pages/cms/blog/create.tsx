import Tiptap from "@/components/shared/tiptap/Tiptap";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CreateBlog() {
    const [content, setContent] = useState<string | null>(null)
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex justify-between gap-2">
                <h1 className="mb-4 font-bold text-3xl">Create Blog</h1>
            </div>
            <form action="">
                <Tiptap content={content} setContent={setContent} />
                <Button type="submit" className="my-3 bg-primary dark:bg-primary max-w-full w-full md:w-60">Submit</Button>
            </form>
        </div>
    )
}