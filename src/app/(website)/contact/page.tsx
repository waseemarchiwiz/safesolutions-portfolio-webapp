import { apiClient } from "@/lib/api.config";
import Main from "./(client)/main";

export interface EmailTypes {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export default async function ContactPage() {
  // api client

  const emailsResult = await apiClient.get("/user/get/emails");

  // emails
  const emails = emailsResult?.emails || [];

  console.log("emails: ", emails);

  // teams
  return <Main emails={emails || []} />;
}
