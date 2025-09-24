import MainBlogs from "./(client)/main";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { axiosServer } from "@/lib/api-config/client";
import { cookies } from "next/headers";
import { BlogTypes } from "./columns";
import { ReturnPayload } from "@/lib/types";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

/**
 * Pagination
 * On Server Side
 * Pending
 * **/

export default async function AllBlogsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  // const params = await searchParams;
  // const page = Number(params?.page) || 1;
  // const limit = Number(params?.limit) || 5;
  // const skip = (page - 1) * limit;

  // cookies
  const cookieStore = await cookies();
  // Build Cookie header manually
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const api = await axiosServer(cookieHeader);

  const result: ReturnPayload = await api.get("/admin/get/blog");
  console.log("result----: ", result);

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Blogs</h1>
            <Breadcrumbs page="add blog" />
          </div>
          {/* All Blogs */}
          <MainBlogs
            data={result.data?.blogs as BlogTypes[]}
            page={1}
            limit={10}
            total={1}
            linkInfo={{ text: "Add Blog", link: "add-blog" }}
          />
        </div>
      </div>
    </div>
  );
}
