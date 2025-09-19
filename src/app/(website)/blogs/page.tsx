import { apiClient } from "@/lib/api-config/client";
import Main from "./(client)/main";

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
  const result = await apiClient.get("/user/get/blog");
  console.log("result: ", result);

  // teams
  return <Main blogs={result?.blogs || []} />;
}
