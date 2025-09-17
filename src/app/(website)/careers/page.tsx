import { apiClient } from "@/lib/api.config";
import Main from "./(client)";

export interface CareerTypes {
  id: number;
  title: string;
  job_description: string;
  short_description: string;
  link: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTypes {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export default async function CareersPage() {
  // api client

  const [careersResult, emailsResult] = await Promise.all([
    await apiClient.get("user/get/careers"),
    await apiClient.get("user/get/emails"),
  ]);

  // careers
  const careers = careersResult?.careers || [];
  // emails
  const emails = emailsResult?.emails || [];

  console.log("careers: ", careers);
  console.log("emails: ", emails);

  // teams
  return <Main careers={careers} emails={emails} />;
}
