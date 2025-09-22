import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MainCategories from "./(client)/main";
import Link from "next/link";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllBlogsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;

  // fetch data from the server

  // total

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Blogs</h1>
            <Link href="add-blog">
              <Button variant="outline" size="sm">
                <Plus />
                <span className="hidden lg:inline">Add Blog</span>
              </Button>
            </Link>
          </div>
          {/* All categories */}
          <MainCategories data={[]} page={page} limit={limit} total={0} />
        </div>
      </div>
    </div>
  );
}
