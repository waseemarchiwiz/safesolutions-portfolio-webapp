import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddCompanyForm from "./(client)/main";
import { cookies } from "next/headers";
import { axiosServer } from "@/lib/api-config/client";

export default async function AddCompanyPage() {
  // cookies
  const cookieStore = await cookies();
  // Build Cookie header manually
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const api = await axiosServer(cookieHeader);

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">Add Company</h1>
            <Breadcrumbs page={"add Company"} />
          </div>
          <AddCompanyForm />
        </div>
      </div>
    </div>
  );
}
