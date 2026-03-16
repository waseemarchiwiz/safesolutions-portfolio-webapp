import MainBlogs from "./(client)/main";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { GetAllBlogs } from "./(actions)/actions";

// Pagination Url Props
export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}
// All Blogs Page
export default async function AllBlogsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;
  // result
  const { data: blogs, total: totalBlogs } = await GetAllBlogs({ skip, limit });
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
            data={blogs}
            page={page}
            limit={limit}
            total={totalBlogs}
            linkInfo={{ text: "Add Blog", link: "add-blog" }}
          />
        </div>
      </div>
    </div>
  );
}
