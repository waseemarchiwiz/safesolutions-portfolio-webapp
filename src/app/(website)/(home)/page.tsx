import Main from "./(client)";
import { GetHomePageData } from "./(actions)/actions";

export default async function HomePage() {
  // get faqs + projects + testimonials + services
  const {
    data: { faqs, projects, testimonials, services },
  } = await GetHomePageData();

  // fetch the data and pass to the client
  return (
    <Main
      faqs={faqs}
      projects={projects}
      testimonials={testimonials}
      services={services}
    />
  );
}
