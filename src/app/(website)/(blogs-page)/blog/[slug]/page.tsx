import Main from "../(client)/main";
import { GetBlogBySlug } from "../(actions)/actions";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailsPage({ params }: ParamsProps) {
  // slug
  const { slug } = await params;
  // blog data
  const { data: blog } = await GetBlogBySlug(slug);

  // if no blog found return this page
  if (!blog) {
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
      <Main blogData={blog || {}} />
    </div>
  );
}
