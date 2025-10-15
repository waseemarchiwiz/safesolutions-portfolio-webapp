export const servicesData = [
  {
    id: 1,
    title: "Web Application Development",
    description:
      "We craft fast, secure, and scalable web applications tailored to your business — using React, Next.js, and Node.js.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",

    overview: {
      summary:
        "Our web development services deliver robust, scalable, and high-performing solutions customized to meet your unique business needs.",
      goals: [
        "Create responsive, SEO-friendly, and high-performance websites.",
        "Build scalable architectures using modern frameworks.",
        "Ensure optimal security and long-term maintainability.",
      ],
    },

    features: [
      "Custom full-stack development",
      "API integration and backend systems",
      "Performance optimization and analytics setup",
      "Responsive UI and accessibility compliance",
    ],

    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],

    details: {
      type: "Full-stack web development",
      deployment: "Azure / Vercel",
      framework: "Next.js (App Router)",
      database: "PostgreSQL",
      versionControl: "Git & GitHub Actions",
    },

    support: {
      plan: "6 months free maintenance",
      description:
        "Includes bug fixes, minor feature updates, and security patching after project delivery.",
      contact: "support@safesolutions.com",
    },
  },

  {
    id: 2,
    title: "Mobile App Development",
    description:
      "Beautiful, high-performance apps for iOS and Android. Focused on UX, reliability, and speed.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",

    overview: {
      summary:
        "We design and build powerful cross-platform and native mobile apps that combine aesthetics with functionality.",
      goals: [
        "Deliver seamless cross-platform mobile experiences.",
        "Optimize performance for low-latency user interactions.",
        "Integrate analytics and push notifications.",
      ],
    },

    features: [
      "React Native & Expo-based apps",
      "Offline storage & synchronization",
      "Real-time API integration",
      "Custom animations and micro-interactions",
    ],

    technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],

    details: {
      type: "Cross-platform mobile app",
      deployment: "App Store & Google Play",
      framework: "React Native",
      apiIntegration: "REST / GraphQL",
    },

    support: {
      plan: "App monitoring & version updates",
      description:
        "Includes SDK upgrades, bug fixes, and periodic performance improvements.",
      contact: "support@safesolutions.com",
    },
  },

  {
    id: 3,
    title: "Cloud & Infrastructure",
    description:
      "We design secure, scalable, and automated cloud solutions on Azure, AWS, and GCP.",
    image:
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80",

    overview: {
      summary:
        "Our cloud solutions are designed for scalability, reliability, and security — ensuring optimal uptime and performance.",
      goals: [
        "Enable automated scaling for high-demand environments.",
        "Ensure infrastructure security and compliance.",
        "Leverage cost-optimized cloud deployments.",
      ],
    },

    features: [
      "Azure / AWS / GCP setup & migration",
      "Container orchestration with Kubernetes",
      "Load balancing & CDN configuration",
      "Cloud monitoring and security audits",
    ],

    technologies: ["Azure", "AWS", "Docker", "Kubernetes", "Terraform"],

    details: {
      type: "Cloud architecture & DevOps",
      deployment: "CI/CD pipelines",
      monitoring: "Grafana, Prometheus",
      storage: "Azure Blob, S3 Buckets",
    },

    support: {
      plan: "24/7 monitoring",
      description:
        "Continuous health checks and cost optimization recommendations.",
      contact: "cloud@safesolutions.com",
    },
  },

  {
    id: 4,
    title: "API & Integration",
    description:
      "Seamlessly connect your systems and automate workflows using REST, GraphQL, and microservices.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",

    overview: {
      summary:
        "We specialize in creating and integrating APIs that power complex systems and automate business operations.",
      goals: [
        "Unify disparate systems via custom APIs.",
        "Ensure data consistency and transactional reliability.",
        "Build scalable microservice architectures.",
      ],
    },

    features: [
      "RESTful & GraphQL API design",
      "OAuth2 / JWT authentication",
      "Third-party service integration",
      "Webhooks and background jobs",
    ],

    technologies: [
      "Node.js",
      "Express",
      "GraphQL",
      "Postman",
      "Azure Functions",
    ],

    details: {
      type: "API development & integration",
      deployment: "Azure App Services",
      security: "JWT / OAuth2.0",
      documentation: "OpenAPI / Swagger",
    },

    support: {
      plan: "API monitoring & logging",
      description:
        "Includes API usage reports, uptime tracking, and log-based alerts.",
      contact: "api@safesolutions.com",
    },
  },

  {
    id: 5,
    title: "DevOps & Automation",
    description:
      "We build CI/CD pipelines and containerized environments to automate deployments and scaling.",
    image:
      "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=1200&q=80",

    overview: {
      summary:
        "Our DevOps services streamline development, automate testing, and accelerate releases with zero downtime.",
      goals: [
        "Implement automated CI/CD pipelines.",
        "Ensure continuous testing & deployment.",
        "Enable infrastructure as code.",
      ],
    },

    features: [
      "Jenkins, GitHub Actions & Azure Pipelines",
      "Dockerized environments",
      "Infrastructure as Code (Terraform)",
      "Centralized logging and monitoring",
    ],

    technologies: ["Docker", "Terraform", "Kubernetes", "Azure DevOps"],

    details: {
      type: "DevOps implementation",
      pipeline: "GitHub Actions / Jenkins",
      monitoring: "Azure Monitor",
    },

    support: {
      plan: "Proactive monitoring",
      description:
        "Includes log management, security scans, and auto-healing scripts.",
      contact: "devops@safesolutions.com",
    },
  },

  {
    id: 6,
    title: "Maintenance & Support",
    description:
      "Continuous monitoring, updates, and performance tuning to keep your systems stable and efficient.",
    image:
      "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=1200&q=80",
    overview: {
      summary:
        "We ensure your software runs smoothly post-deployment through continuous monitoring and iterative improvements.",
      goals: [
        "Reduce downtime through preventive maintenance.",
        "Ensure security compliance and data protection.",
        "Enhance performance with regular optimizations.",
      ],
    },

    features: [
      "Error tracking and patch management",
      "Performance audits and optimization",
      "Security updates and penetration testing",
      "User support and training sessions",
    ],

    technologies: ["Sentry", "New Relic", "Azure Monitor", "Postman"],

    details: {
      type: "Ongoing maintenance",
      reporting: "Monthly performance reports",
      updates: "Quarterly version updates",
    },

    support: {
      plan: "Dedicated 24/7 support",
      description:
        "Includes ticket-based issue tracking, SLA adherence, and proactive health checks.",
      contact: "support@safesolutions.com",
    },
  },
];
