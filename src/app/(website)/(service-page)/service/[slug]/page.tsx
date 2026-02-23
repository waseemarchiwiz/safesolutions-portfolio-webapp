import ServiceDetails from "../(client)/service-details";
import { GetServiceBySlug } from "../(actions)/actions";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailsPage({ params }: ParamsProps) {
  // slug
  const { slug } = await params;
  // Service data
  const { data: service } = await GetServiceBySlug(slug);
  // if no Service found return this page
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
  // return the component
  return (
    <div className="dark:bg-[#18181b]">
      <ServiceDetails data={service || {}} />
    </div>
  );
}
