import { apiClient } from "@/lib/api-client";
import Main from "./(client)";
import { TeamTypes } from "../about/page";

interface PayloadReturn {
  Teams: TeamTypes[];
  sucess: boolean;
}

export default async function ServicesPage() {
  // fetch the data and pass to the client
  // api client
  const result = await apiClient.get<PayloadReturn>("user/get/team");
  console.log("result: ", result);
  // teams

  return <Main />;
}
