import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button"

const blogs = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Blog Title ${i + 1}`,
    description: `This is a short description for blog ${i + 1}.`,
    image: `https://img.freepik.com/free-photo/pensive-displeased-woman-with-dark-skin-holds-chin-looks-away_273609-30348.jpg?uid=R101905828&ga=GA1.1.901298198.1737368230&semt=ais_hybrid&w=740`,
}));

export default function Blogs() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex justify-between gap-2">
                <h1 className="mb-4 font-bold text-3xl">Blogs</h1>
                <Button href={"/cms/blogs/create"} className={`flex gap-2 items-center font-semibold bg-primary dark:bg-primary`}>Create <Plus /></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}

function Blog({ blog }: { blog: { title: string; description: string; image: string } }) {
    return (
        <article className="group transition">
            <div className="h-48 lg:h-56 w-full overflow-hidden rounded-lg">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover object-center" />
            </div>
            <div className="py-4">
                <h2 className="text-lg font-bold bg-gradient-to-r from-rose-500 to-blue-700 dark:from-rose-600 dark:to-blue-700 bg-clip-text text-transparent line-clamp-2">
                    {blog.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {blog.description}
                </p>
            </div>
        </article>
    );
}
