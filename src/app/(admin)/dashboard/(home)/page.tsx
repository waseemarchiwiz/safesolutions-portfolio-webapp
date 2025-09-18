import Home from "./(client)";

/**
 * Cookies doesn;t work here
 * Fetch fails in server components
 */
export default async function Page() {
  // success
  return <Home stats={[]} />;
}
