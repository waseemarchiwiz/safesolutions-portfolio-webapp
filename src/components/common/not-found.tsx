import PageHeroSection from "@/app/(website)/(shared)/hero-section";
/**
 * We've used catch all route to handle 404 error page
 **/

export default function NotFound() {
  return (
    <PageHeroSection
      tag="404"
      title="Page not found"
      description="Sorry, we couldn’t find the page you’re looking for. Check the URL or return home to start over."
      isNotFound={true}
    />
  );
}
