import SoftwareDetails from "../(client)/main";
import { softwareData } from "../../services/data";

type ParamsProps = {
  params: Promise<{ id: number }>;
};

export default async function SoftwareDetailsPage({ params }: ParamsProps) {
  // id
  const { id } = await params;
  // if not id return

  console.log("id: ", id);

  if (!id) {
    <div className="text-center py-12">No service found</div>;
  }
  const softwareService = softwareData.filter(
    (software) => Number(software.id) === Number(id)
  );

  console.log("software service: ", softwareService);

  // if (index !== -1) {
  //   return <div className="text-center py-12">No service found</div>;
  // }

  // const softwareService = softwareData[index];

  //  return if no services found
  if (!softwareService) {
    return <div className="text-center py-12">No service found</div>;
  }

  return <SoftwareDetails serviceData={softwareService?.[0]} />;
}
