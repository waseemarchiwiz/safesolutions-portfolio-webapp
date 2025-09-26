import { apiClient } from "@/lib/api-config/client";
import MainBlogs from "./(client)/main";

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

type BlogPayload = {
  success: boolean;
  blogs: BlogTypes[];
};

export default async function BlogsPage() {
  // api client
  const result: BlogPayload = await apiClient.get("/user/get/blog");
  console.log("result: ", result);

  // blogs
  return <MainBlogs blogs={result?.blogs} />;
}
