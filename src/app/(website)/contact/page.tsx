import { apiClient } from "@/lib/api-config/client";
import Main from "./(client)/main";
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";

export interface EmailTypes {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

interface CompaniesResponse {
  success: boolean;
  data: CompanyTypes[];
}

export default async function ContactPage() {
  // api client

  const emailsResult: CompaniesResponse = await apiClient.get(
    "/user/get/emails"
  );

  // emails
  const emails = emailsResult?.data || [];

  console.log("emails: ", emails);

  // teams
  return <Main emails={emails || []} />;
}
