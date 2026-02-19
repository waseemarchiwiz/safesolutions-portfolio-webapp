import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { FaqTypes } from "./columns";
import { GetAllfaqs } from "./(actions)/actions";
import MainFaq from "./(client)/main";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllFaqsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;

  // get all faqs
  const { data: faqs, total: totalFAQs } = await GetAllfaqs({ skip, limit });
  // return
  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Faq</h1>
            <Breadcrumbs page="add Faq" />
          </div>
          {/* All Faqs */}
          <MainFaq
            data={(faqs as FaqTypes[]) || []}
            page={page}
            limit={limit}
            total={totalFAQs}
            linkInfo={{ text: "Add Faq", link: "add-faq" }}
          />
        </div>
      </div>
    </div>
  );
}
