import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

// -----------------------------
// Get Blog By Slug Action
// -----------------------------
export async function GetBlogBySlug(slug: string) {
  try {
    const [blogsResult] = await Promise.all([
      await prisma.blog.findUnique({
        where: { slug },
        include: { images: true },
      }),
    ]);

    // serialize data
    const blog = serializePrisma(blogsResult);

    // return the blogs data
    return {
      success: true,
      message: "Blog record fetched successfully.",
      data: blog,
    };
  } catch (error) {
    console.log("error:- ", error);
    // return
    return {
      success: false,
      message: "Failed to fetch blog.",
      data: {},
    };
  }
}
