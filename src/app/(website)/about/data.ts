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
    logo: "/projectlogos/archiwizbuild.jpg",
    link: "https://archiwizbuild.com/",
  },
];

export type PartnerType = {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  link: string;
};

export const partnersData: PartnerType[] = [
  {
    id: 1,
    name: "Backtelemed",
    slug: "backtelemed",
    logo: "/archiwizbuild.png",
    description:
      "Pioneering telehealth solutions for modern healthcare providers and patients.",
    link: "/partners/backtelemed",
  },
  {
    id: 3,
    name: "Archiwiz Construction",
    slug: "archiwiz-construction",
    logo: "/archiwizfrontpage.png",
    description:
      "Bringing architectural visions to life with precision engineering and quality craftsmanship.",
    link: "/partners/archiwiz-construction",
  },
  {
    id: 4,
    name: "Alpha Build",
    slug: "alpha-build",
    logo: "/alpha-build.png",
    description:
      "End-to-end construction management software for efficient and scalable project delivery.",
    link: "/partners/alpha-build",
  },
  {
    id: 5,
    name: "Agro Futures",
    slug: "agro-futures",
    logo: "/hero.jpg",
    description:
      "Sustainable agriculture technology to optimize yield and promote environmental stewardship.",
    link: "/partners/agro-futures",
  },
  {
    id: 6,
    name: "Lumsden Trading",
    slug: "lumsden-trading",
    logo: "/lumsden.png",
    description:
      "Your primary partner for custom software development and IT consultancy.",
    link: "/services",
  },
];

export const members = [
  {
    name: "Liam Brown",
    role: "Founder - CEO",
    avatar: "https://alt.tailus.io/images/team/member-one.webp",
    link: "#",
  },
  {
    name: "Elijah Jones",
    role: "Co-Founder - CTO",
    avatar: "https://alt.tailus.io/images/team/member-two.webp",
    link: "#",
  },
  {
    name: "Isabella Garcia",
    role: "Sales Manager",
    avatar: "https://alt.tailus.io/images/team/member-three.webp",
    link: "#",
  },
];
