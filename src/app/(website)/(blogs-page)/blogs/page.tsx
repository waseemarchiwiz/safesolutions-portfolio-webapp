import MainBlogs from "./(client)/main";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

/**
 * This page is dynamically generated at build time.
 * on Every request, the page is revalidated.
 * This is done to ensure that the page is always up-to-date.
 */

export const revalidate = 0;

export interface BlogTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
  images: [
    {
      id: number;
      image: string;
      blog_id: number;
    }
  ];
}

export default async function BlogsPage() {
  // api client
  const result = await prisma.blog.findMany({
    take: 10,
    include: { images: true },
  });

  const blogs = serializePrisma(result);

  // blogs
  return <MainBlogs blogs={blogs} />;
}
