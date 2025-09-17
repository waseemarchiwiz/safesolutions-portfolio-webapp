interface AchievementsTypes {
  number: number;
  label: string;
  icon: string;
}

export interface MemberTypes {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
  twitter: string;
}

interface PartnersTypes {
  name: string;
  logo: string;
  link: string;
}

// Achievements data with icons and labels
export const achievements: AchievementsTypes[] = [
  {
    number: 5,
    label: "Years Experience",
    icon: "Building",
  },
  {
    number: 100,
    label: "Projects Completed",
    icon: "Gitlab",
  },
  {
    number: 10,
    label: "Happy Clients",
    icon: "Users",
  },
];

// Features list to highlight company strengths
export const features = [
  "Dedicated team with proven expertise",
  "Cutting-edge technology integration",
  "Round-the-clock customer assistance",
  "Solutions designed to meet your unique needs",
];

// Default team members in case API fails
export const defaultTeamMembers: MemberTypes[] = [
  {
    name: "Dr Allaudin Khan",
    role: "Founder",
    image: "/api/placeholder/200/200",
    linkedin: "https://www.linkedin.com/in/allauddin-khan-826aa7289/",
    github: "https://github.com/",
    twitter: "https://twitter.com/",
  },
  {
    name: "Dr Ghanimullah",
    role: "Co-Founder",
    image: "/api/placeholder/200/200",
    linkedin: "https://www.linkedin.com/in/ghanim-ullah-58728530/",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Muhammad Asfandyar",
    role: "Director",
    image: "/api/placeholder/200/200",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
];

// partners
export const Partners: PartnersTypes[] = [
  {
    name: "Archiwiz",
    logo: "/projectlogos/archiwizdark.png",
    link: "https://archiwiz.com/",
  },
  {
    name: "Alphabuilt",
    logo: "/projectlogos/alphabuilt.png",
    link: "#",
  },
  {
    name: "Lumsden Trading",
    logo: "/projectlogos/lumsdenlogo.webp",
    link: "https://lumsdentrading.com/",
  },
  {
    name: "Archiwiz Build",
    logo: "/projectlogos/ArchiWizBuild_jpg.jpg",
    link: "https://archiwizbuild.com/",
  },
];
