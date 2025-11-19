import MainBlogs from "./(client)/main";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

/**
 * This page is dynamically generated at build time.
 * on Every request, the page is revalidated.
 * This is done to ensure that the page is always up-to-date.
 */

export const revalidate = 0;

export default async function BlogsPage() {
  // api client
  const result = await prisma.blog.findMany({
    take: 10,
    include: { images: true },
  });

  const blogs = serializePrisma(result);

  console.log("blogs- inpage--", blogs);

  // blogs
  return <MainBlogs blogs={blogs} />;
}
