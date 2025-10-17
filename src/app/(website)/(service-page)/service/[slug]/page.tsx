import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";
import ServiceDetails from "../(client)/service-details";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailsPage({ params }: ParamsProps) {
  // slug
  const { slug } = await params;

  // Service data
  const result = await prisma.service.findUnique({
    where: { slug },
  });
  const service = serializePrisma(result);

  console.log("Service Data: ", service);

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Service Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The requested Service could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#18181b]">
      <ServiceDetails data={service || {}} />
    </div>
  );
}
