import { apiClient } from "@/lib/api-config/client";
import Main from "./(client)";

export interface TeamTypes {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  twitter: string;
  createdAt: string;
  updatedAt: string;
}

export default async function AboutPage() {
  try {
    // api client
    const result = await apiClient.get("/user/get/team");
    console.log("result: ", result);
    return <Main teams={result?.Teams || []} />;
  } catch (error) {
    console.log("Error: ", error);
  }
  // teams
}
