import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddBlogForm from "./(client)/main";
import { BlogTypes } from "../blogs/columns";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

interface AddBlogPageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AddBlogPage({ searchParams }: AddBlogPageProps) {
  const data = await searchParams;
  const editId = Number(data?.id);

  let blog: BlogTypes | null = null;

  if (editId && editId !== null) {
    const result = await prisma.blog.findFirst({
      where: { id: editId },
      include: { images: true },
    });
    const serializedBlog = serializePrisma(result);
    console.log("blog:", serializedBlog);
    blog = serializedBlog;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">
              {editId ? "Edit Blog" : "Add Blog"}
            </h1>
            <Breadcrumbs page={editId ? "edit blog" : "add blog"} />
          </div>
          <AddBlogForm blog={blog || undefined} />
        </div>
      </div>
    </div>
  );
}
