import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddBlogForm from "./(client)/main";
import { cookies } from "next/headers";
import { axiosServer } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";
import { BlogTypes } from "../blogs/columns";

interface AddBlogPageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AddBlogPage({ searchParams }: AddBlogPageProps) {
  const data = await searchParams;
  const Id = data?.id;
  console.log("id from query:", Id);

  let blog: BlogTypes | null = null;

  if (Id) {
    // cookies
    const cookieStore = await cookies();
    // Build Cookie header manually
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const api = await axiosServer(cookieHeader);

    const result: ReturnPayload = await api.get(`/admin/single/blog/${Id}`);
    console.log("result----: ", result.data);
    blog = result.data?.blog;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">
              {Id ? "Edit Blog" : "Add Blog"}
            </h1>
            <Breadcrumbs page={Id ? "edit blog" : "add blog"} />
          </div>
          <AddBlogForm blog={blog || undefined} />
        </div>
      </div>
    </div>
  );
}
