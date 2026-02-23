import Main from "./(client)";
import { GetAboutPageData } from "./(actions)/actions";

export interface TeamTypes {
  id: number;
  name: string;
  role: string;
  url: string;
  publicId: string;
  github: string;
  linkedin: string;
  twitter: string;
  createdAt: string;
  updatedAt: string;
}

export default async function AboutPage() {
  // fetch teams + projects
  const {
    data: { teams, projects, blogs, companies },
  } = await GetAboutPageData();
  // return the component
  return (
    <Main
      teams={teams}
      projects={projects}
      blogs={blogs}
      partners={companies}
    />
  );
}
