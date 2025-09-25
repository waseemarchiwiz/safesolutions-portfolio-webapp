import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddServiceForm from "./(client)/main";
import { cookies } from "next/headers";
import { axiosServer } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";
import { ServiceTypes } from "../services/columns";

interface AddServicePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AddServicePage({
  searchParams,
}: AddServicePageProps) {
  const data = await searchParams;
  const Id = data?.id;
  console.log("id from query:", Id);

  let service: ServiceTypes | null = null;

  if (Id) {
    // cookies
    const cookieStore = await cookies();
    // Build Cookie header manually
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const api = await axiosServer(cookieHeader);

    const result: ReturnPayload = await api.get(`/admin/service/${Id}`);
    console.log("result----: ", result.data);
    service = result.data?.service;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">
              {Id ? "Edit Service" : "Add Service"}
            </h1>
            <Breadcrumbs page={Id ? "Update service" : "add service"} />
          </div>
          <AddServiceForm service={service || undefined} />
        </div>
      </div>
    </div>
  );
}
