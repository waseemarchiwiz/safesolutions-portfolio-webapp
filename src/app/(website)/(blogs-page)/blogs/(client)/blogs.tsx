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

export interface BlogPostTypes {
  id: 3;
  img: string;
  link: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const Blogs = ({ blogs }: { blogs: BlogPostTypes[] }) => {
  console.log("blogss- inside compoentn--", blogs);

  return (
    <section className="py-30">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:px-7">
        <div className="w-full flex justify-between items-center">
          <div>
            <div className="mb-3 flex items-center text-sm text-sky-600">
              <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
              <span className="font-semibold">Blogs</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900">
              Blog <span className="text-sky-600">Posts</span>
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Discover the latest trends, tips, and best practices in modern web
              development. From UI components to design systems, stay updated
              with our expert insights.
            </p>
          </div>
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <Link href="/blogs">
              View all
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="w-full">
          <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
              >
                <div className="aspect-16/9 w-full">
                  <Link
                    href={"/blogs"}
                    className="fade-in transition-opacity duration-200 hover:opacity-70"
                  >
                    <Image
                      width={150}
                      height={200}
                      src={blog.img || "/placeholder.png"}
                      alt={(blog.name as string) || "title"}
                      className=" object-cover object-center"
                    />
                  </Link>
                </div>
                <CardHeader>
                  <Link href={`/blog/${blog.id}`}>
                    <h3 className="text-lg font-semibold hover:underline md:text-xl">
                      {blog.name}
                    </h3>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{blog.description}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-foreground flex items-center hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
