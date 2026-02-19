import { GetAllBlogs } from "@/app/(admin)/dashboard/(blog-page)/blogs/(actions)/actions";
import MainBlogs from "./(client)/main";

/**
 * This page is dynamically generated at build time.
 * on Every request, the page is revalidated.
 * This is done to ensure that the page is always up-to-date.
 */

export default async function BlogsPage() {
  // Get all blogs
  const { data: blogs } = await GetAllBlogs({ skip: 0, limit: 10 });
  // blogs
  return <MainBlogs blogs={blogs} />;
}
