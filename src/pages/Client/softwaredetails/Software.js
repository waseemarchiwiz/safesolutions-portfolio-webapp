import {
  Rocket,
  CodeIcon,
  PaletteIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  ServerIcon,
} from "lucide-react";

export const Software = [
  {
    id: "1",
    icon: CodeIcon, // Reference to the icon component
    title: "Web Development",
    description:
      "Custom web solutions tailored to your business needs, using modern technologies and responsive design.",
    features: [
      "Full-stack Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO-friendly Websites",
      "E-commerce Platforms",
    ],
    details: {
      overview:
        "We specialize in building modern, scalable, and user-friendly websites that help your business grow. Whether it's a simple landing page or a complex web application, we ensure top-notch quality.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "GraphQL"],
      industriesServed: ["E-commerce", "Healthcare", "Education", "Startups"],
    },
  },
  {
    id: "2",
    icon: PaletteIcon,
    title: "Artificial Intelligence",
    description:
      "Harness the power of AI to automate processes, gain insights, and drive innovation in your business.",
    features: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Predictive Analytics",
      "Computer Vision",
      "Custom AI Solutions",
    ],
    details: {
      overview:
        "We develop AI-driven solutions that empower your business to make data-driven decisions, automate repetitive tasks, and create personalized user experiences.",
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "AWS SageMaker"],
      useCases: [
        "Chatbots and Virtual Assistants",
        "Fraud Detection",
        "Customer Segmentation",
        "Image Recognition",
      ],
    },
  },
  {
    id: "3",
    icon: Rocket,
    title: "Game Development",
    description:
      "End-to-end game development services to create immersive and engaging gaming experiences.",
    features: [
      "2D/3D Game Design",
      "Cross-platform Development",
      "Multiplayer Integration",
      "UI/UX for Games",
      "AR/VR Game Experiences",
    ],
    details: {
      overview:
        "From concept to deployment, we bring your game ideas to life with state-of-the-art technology and stunning visuals, ensuring an engaging experience for your audience.",
      technologies: ["Unity", "Unreal Engine", "Blender"],
      useCases: ["Action", "Adventure", "Simulation", "Educational Gamess"],
    },
  },
  {
    id: "4",
    icon: ShieldCheckIcon,
    title: "App Development",
    description:
      "Build secure, scalable, and feature-rich mobile applications tailored to your needs.",
    features: [
      "iOS and Android Development",
      "Cross-platform Apps",
      "UI/UX for Mobile Apps",
      "App Security Features",
      "Push Notifications",
    ],
    details: {
      overview:
        "Our app development services include native and cross-platform solutions that deliver seamless performance and intuitive interfaces.",
      technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
      industriesServed: ["Healthcare", "Finance", "Logistics", "Retail"],
    },
  },
  {
    id: "5",
    icon: DatabaseIcon,
    title: "Cloud Solutions",
    description:
      "Scalable and secure cloud infrastructure to streamline your business operations.",
    features: [
      "Cloud Migration",
      "Serverless Computing",
      "Data Backups",
      "Disaster Recovery",
      "Cloud Security",
    ],
    details: {
      overview:
        "Leverage the power of the cloud to reduce costs, enhance scalability, and improve business continuity.",
      technologies: ["AWS", "Google Cloud", "Azure", "DigitalOcean"],
      industriesServed: [
        "Cloud Architecture Design",
        "Hybrid Cloud Solutions",
        "Database Management",
        "DevOps in the Cloud",
      ],
    },
  },
  {
    id: "6",
    icon: ServerIcon,
    title: "DevOps Services",
    description:
      "Accelerate your software development lifecycle with continuous integration and delivery solutions.",
    features: [
      "CI/CD Pipeline Setup",
      "Infrastructure Automation",
      "Monitoring and Logging",
      "Configuration Management",
      "Containerization (Docker/Kubernetes)",
    ],
    details: {
      overview:
        "Our DevOps services ensure smooth collaboration between development and operations, enabling faster and more reliable software delivery.",
      technologies: [
        "Jenkins",
        "GitHub Actions",
        "Terraform",
        "Ansible",
        "Kubernetes",
        "Docker",
      ],
      industriesServed: [
        "Reduced Time to Market",
        "Improved Code Quality",
        "Streamlined Deployment",
        "Enhanced Scalability",
      ],
    },
  },
];
