import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddTestimonialForm from "./(client)/main";

export default async function AddTestimonialPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">Add Testimonial</h1>
            <Breadcrumbs page={"add Testimonial"} />
          </div>
          <AddTestimonialForm />
        </div>
      </div>
    </div>
  );
}
