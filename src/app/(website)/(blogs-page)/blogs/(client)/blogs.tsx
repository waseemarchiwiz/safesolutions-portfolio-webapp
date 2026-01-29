import { ArrowRight, ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { BlogTypes } from "@/app/(admin)/dashboard/(blog-page)/blogs/columns";
import { shortText } from "@/lib/utils";

interface BlogProps {
  blogs: BlogTypes[];
  view: boolean;
}

const Blogs = ({ blogs, view }: BlogProps) => {
  console.log("blogss- inside compoentn--", blogs);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:px-7">
        {view === true ? (
          <div className="w-full space-y-3 mb-5">
            <div className="mb-3 flex items-center text-sm text-sky-600">
              <ScanText size={15} className="mr-2" aria-hidden />
              <span className="font-semibold tracking-wide">Blogs</span>
            </div>
            <h2 className=" text-4xl font-semibold text-slate-900">
              Blog <span className="text-sky-600">Posts</span>
            </h2>
            <p className="text-slate-500 max-w-2xl">
              Discover the latest trends, tips, and best practices in modern web
              development. From UI components to design systems, stay updated
              with our expert insights.
            </p>
          </div>
        ) : (
          <div className="w-full">
            <div>
              <h2 className="text-4xl text-center font-semibold text-slate-900">
                Blog <span className="text-sky-600">Posts</span>
              </h2>
              <p className="mt-3 text-center mx-auto max-w-2xl text-slate-600">
                Discover the latest trends, tips, and best practices in modern
                web development. From UI components to design systems, stay
                updated with our expert insights.
              </p>
            </div>
          </div>
        )}

        <div className="w-full">
          <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="bg-white grid grid-rows-[auto_auto_1fr_auto] pt-0"
              >
                <div className=" w-full">
                  <Link
                    href={"/blogs"}
                    className="fade-in transition-opacity duration-200 hover:opacity-70"
                  >
                    <Image
                      width={400}
                      height={300}
                      src={blog.images?.[0]?.url || "/placeholder.png"}
                      alt={(blog.title as string) || "title"}
                      className=""
                    />
                  </Link>
                </div>
                <CardHeader>
                  <h3 className="dark:text-slate-800 text-lg font-semibold md:text-xl">
                    {blog.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {shortText(blog.description, 100)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="dark:text-slate-800 text-foreground flex items-center hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          className="bg-sky-600 text-white hover:bg-sky-700 hover:text-white w-full sm:w-auto"
          asChild
        >
          <Link href="/blogs">
            View all
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Blogs;
