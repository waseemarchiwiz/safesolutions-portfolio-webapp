import { GetAllCompanies } from "@/app/(admin)/dashboard/(company-page)/companies/(actions)/actions";
import Main from "./(client)/main";

export default async function ContactPage() {
  // get companies
  const { data: companies } = await GetAllCompanies({ skip: 0, limit: 10000 });
  // return the component
  return <Main companies={companies || []} />;
}
