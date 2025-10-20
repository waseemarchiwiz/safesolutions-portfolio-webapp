import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddFaqForm from "./(client)/main";

export default async function AddFaqPage() {
  // cookies
  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">Add Faq</h1>
            <Breadcrumbs page={"add Faq"} />
          </div>
          <AddFaqForm />
        </div>
      </div>
    </div>
  );
}
