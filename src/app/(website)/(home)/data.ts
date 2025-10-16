// Card Types

interface CardTypes {
  title: string;
  description: string;
  image: string;
}

// card data
export const cardData: CardTypes[] = [
  {
    title: "Innovative Solutions",
    description:
      "Explore cutting-edge technology designed to optimize your business processes.",
    image: "/whychoose/innovative.gif",
  },
  {
    title: "Seamless Operations",
    description:
      "Ensure smooth business workflows with our expert back-office support.",
    image: "/whychoose/scalable.gif",
  },
  {
    title: "Scalable Growth",
    description:
      "Empower your enterprise with scalable and sustainable solutions.",
    image: "whychoose/seamless.gif",
  },
];

interface CompanyTypes {
  name: string;
  light: string;
  dark: string;
}

// Centralized project logos
export const companiesData: CompanyTypes[] = [
  {
    name: "Archiwiz",
    light: "/projectlogos/archiwizdark.png",
    dark: "/projectlogos/archiwizlight.webp",
  },
  {
    name: "Lumsden",
    light: "/projectlogos/lumsdenlogo.webp",
    dark: "/projectlogos/lumsdenlogo.webp", // same logo in both themes
  },
  {
    name: "AlphaBuilt",
    light: "/projectlogos/alphabuilt.png",
    dark: "/projectlogos/alphabuilt.png", // same logo in both themes
  },
  {
    name: "Another Archiwiz",
    light: "/projectlogos/archiwizdark.png",
    dark: "/projectlogos/archiwizlight.webp",
  },
  {
    name: "Archiwiz Dark Import",
    light: "/projectlogos/archiwizlight.webp",
    dark: "/projectlogos/archiwizdark.png",
  },
  {
    name: "AlphaBuilt Copy",
    light: "/projectlogos/alphabuilt.png",
    dark: "/projectlogos/alphabuilt.png",
  },
];

interface OurProjectTypes {
  title: string;
  description: string;
  link?: string;
}

// Projects data remains the same
export const ourProjectsData: OurProjectTypes[] = [
  {
    title: "Artificial Intelligence",
    description:
      "Leverage cutting-edge AI technologies to automate processes, gain insights, and create intelligent solutions that drive business growth.",
    // link: "https://stripe.com",
  },
  {
    title: "Archetecture and Design",
    description:
      "Create stunning, responsive, and high-performance web applications using modern frameworks and best practices in development.",
    // link: "https://netflix.com",
  },
  {
    title: "ERP Management",
    description:
      "Streamline your business operations with comprehensive ERP solutions that integrate all aspects of your enterprise.",
    // link: "https://google.com",
  },
  {
    title: "DevOps",
    description:
      "Implement efficient CI/CD pipelines and automation tools to accelerate development and ensure reliable deployments.",
    // link: "https://meta.com",
  },
  {
    title: "IoT App Development",
    description:
      "Build connected solutions that bridge the physical and digital worlds, enabling smart automation and data-driven decisions.",
    // link: "https://amazon.com",
  },
  {
    title: "Backoffice support",
    description:
      "Create immersive experiences and virtual environments that revolutionize training, entertainment, and customer engagement.",
    // link: "https://microsoft.com",
  },
];

// testimonials
export interface testimonialsTypes {
  id: number;
  name: string;
  designation: string;
  description: string;
  rating: number;
  company: string;
  image?: string;
  bgColor?: string;
}

export const testimonialsData: testimonialsTypes[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Marketing Director",
    description:
      "Working with this team has transformed our business. Their attention to detail and innovative solutions have helped us achieve remarkable results.",
    rating: 5,
    company: "TechCorp Inc.",
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Product Manager",
    description:
      "The level of professionalism and expertise is outstanding. They consistently deliver beyond expectations and have become an invaluable partner.",
    rating: 5,
    company: "Innovation Labs",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    designation: "CEO",
    description:
      "I'm incredibly impressed with their dedication and ability to understand our unique needs. They've helped us stay ahead in a competitive market.",
    rating: 5,
    company: "StartUp Vision",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    designation: "CEO",
    description:
      "I'm incredibly impressed with their dedication and ability to understand our unique needs. They've helped us stay ahead in a competitive market.",
    rating: 5,
    company: "StartUp Vision",
  },
];

// testimonials
export interface faqTypes {
  id: number;
  question: string;
  answer: string;
}

// FAQ data
export const faqsData: faqTypes[] = [
  {
    id: 1,
    question: "What industries does your software company specialize in?",
    answer:
      "We specialize in industries such as finance, healthcare, e-commerce, logistics, and education, offering tailored software solutions for each sector.",
  },
  {
    id: 2,
    question: "Do you provide custom software development services?",
    answer:
      "Yes, we offer custom software development services designed to meet your unique business needs and objectives.",
  },
  {
    id: 3,
    question: "What technologies do you use for software development?",
    answer:
      "Our team is skilled in modern technologies including React, Node.js, Python, Java, PHP, and cloud platforms like AWS and Azure.",
  },
  {
    id: 4,
    question: "What is your approach to data security in software projects?",
    answer:
      "We implement industry-standard security measures, including encryption, secure authentication, and compliance with data protection regulations like GDPR and HIPAA.",
  },
  {
    id: 4,
    question: "Do you offer post-launch support for software projects?",
    answer:
      "Yes, we provide comprehensive post-launch support, including maintenance, updates, and bug fixes to ensure your software continues to perform optimally.",
  },
];
