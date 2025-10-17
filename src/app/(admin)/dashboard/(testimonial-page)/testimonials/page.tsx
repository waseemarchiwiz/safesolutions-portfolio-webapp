import MainTestimonials from "./(client)/main";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { TestimonialTypes } from "./columns";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllTestimonialsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;

  const result = await prisma.testimonial.findMany({
    skip,
    take: limit,
  });

  const totalTestimonials = await prisma.testimonial.count();

  const testimonials = serializePrisma(result);

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Testimonials</h1>
            <Breadcrumbs page="add Testimonial" />
          </div>
          {/* All Testimonials */}
          <MainTestimonials
            data={(testimonials as TestimonialTypes[]) || []}
            page={page}
            limit={limit}
            total={totalTestimonials}
            linkInfo={{ text: "Add Testimonial", link: "add-testimonial" }}
          />
        </div>
      </div>
    </div>
  );
}
