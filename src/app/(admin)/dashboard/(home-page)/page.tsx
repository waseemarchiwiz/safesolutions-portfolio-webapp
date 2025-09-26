import Home from "./(client)";
import { cookies } from "next/headers";
import { ReturnPayload } from "@/lib/types";
import { axiosServer } from "@/lib/api-config/client";

export default async function HomePage() {
  // cookies
  const cookieStore = await cookies();
  // Build Cookie header manually
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const api = await axiosServer(cookieHeader);

  const result: ReturnPayload = await api.get("/admin/dashboard");
  console.log("result: ", result);

  return <Home counts={result?.data || {}} />;
}
