import { apiClient } from "@/lib/api-config/client";
import Main from "./(client)";
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";

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

interface CareersResponse {
  success: boolean;
  careers: CareerTypes[];
}

interface CompaniesResponse {
  success: boolean;
  data: CompanyTypes[];
}

export default async function CareersPage() {
  try {
    // Since response interceptor already returns response.data,
    // the type here is directly CareersResponse and CompaniesResponse
    const [careersResult, companiesResult] = await Promise.all([
      apiClient.get<CareersResponse>("user/get/careers"),
      apiClient.get<CompaniesResponse>("user/get/emails"),
    ]);

    // ✅ No `.data` needed, it's already the final payload
    const careers = careersResult?.careers || [];
    const companies = companiesResult?.data || [];

    console.log("careers: ", careers);
    console.log("companies: ", companies);

    return <Main careers={careers} companies={companies} />;
  } catch (error) {
    console.error("Error fetching careers/emails:", error);
    return <div>Failed to load careers or emails</div>;
  }
}
