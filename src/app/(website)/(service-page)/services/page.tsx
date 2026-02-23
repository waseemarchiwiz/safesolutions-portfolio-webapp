import { Services } from "./(client)";
import { GetAllServices } from "@/app/(admin)/dashboard/(service-page)/services/(actions)/actions";

export default async function ServicesPage() {
  // result
  const { data: services } = await GetAllServices(0, 10000); // get all services
  // main
  return <Services view={false} services={services} />;
}
