import Main from "../(client)/main";
import { apiClient } from "@/lib/api.config";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function blogDetailsPage({ params }: ParamsProps) {
  // slug
  const paramsData = await params;

  console.log("slug: ", paramsData.slug);

  // blog data
  const data = await apiClient.get(
    `/user/get/blog/detail/${(await params).slug}`
  );

  console.log("blog Data: ", data);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            blog Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The requested blog could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#18181b]">
      <Main blogData={data?.blog || {}} />
    </div>
  );
}
