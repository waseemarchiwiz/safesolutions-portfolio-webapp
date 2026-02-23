import Main from "./(client)";
import { GetAllCareers } from "./(actions)/action";
// Careers Page
export default async function CareersPage() {
  // careers + companies
  const {
    data: { careers, companies },
  } = await GetAllCareers();
  // return the component
  return <Main careers={careers} companies={companies} />;
}
