import {
  BarChart3,
  Users,
  Package,
  Phone,
  HelpCircle,
  Briefcase,
  BookOpen,
  Building,
  Calculator,
  Archive,
  MessageCircle,
  Settings,
  Cloud,
  Gamepad,
  Eye,
  ToolCase,
  RectangleGoggles,
  Box,
  Rocket,
  CodeIcon,
  PaletteIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  ServerIcon,
} from "lucide-react";

// icons maps
export const iconsMap = {
  BarChart3,
  Users,
  Package,
  Phone,
  HelpCircle,
  Briefcase,
  BookOpen,
  Building,
  Calculator,
  Archive,
  MessageCircle,
  Settings,
  Cloud,
  Gamepad,
  Eye,
  ToolCase,
  RectangleGoggles,
  Box,
  Rocket,
  CodeIcon,
  PaletteIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  ServerIcon,
};

type ServiceTypes = {
  title: string;
  description: string;
  features: string[];
  icon: keyof typeof iconsMap;
}[];

type ProjectDetailsTypes = {
  name: string;
  version: string;
  lastUpdated: string;
  deploymentType: string;
  supportHours: string;
}[];

type SupportTypes = {
  title: string;
  description: string;
  icon: keyof typeof iconsMap;
}[];

export interface ProjectTypes {
  name: string;
  description: string;
  slug: string;
  img: string;
  version: string;
  lastupdated: string;
  type: string;
  link?: string;
  services: ServiceTypes;
  projectDetails: ProjectDetailsTypes;
  supports: SupportTypes;
}

// Projects
export const projects: ProjectTypes[] = [
  {
    name: "ERP System",
    description:
      "Comprehensive ERP and CRM implementation and customization to streamline business processes and improve customer management.",
    slug: "enterprise-erp",
    img: "/erp.webp",
    version: "2.0.1",
    lastupdated: "2024-12-23",
    type: "detailed", // Flag for detailed project view
    tabs: {
      services: [
        {
          title: "Financial Management",
          description:
            "Complete accounting, budgeting, and financial reporting solutions",
          features: [
            "General Ledger",
            "Accounts Payable/Receivable",
            "Asset Management",
          ],
          icon: "BarChart3",
        },
        {
          title: "Human Resources",
          description:
            "Comprehensive HR management and employee self-service portal",
          features: [
            "Payroll Processing",
            "Time & Attendance",
            "Employee Records",
          ],
          icon: "Users",
        },
        {
          title: "Inventory Management",
          description: "Real-time inventory tracking and optimization",
          features: [
            "Stock Control",
            "Purchase Orders",
            "Warehouse Management",
          ],
          icon: "Package",
        },
        {
          title: "Customer Relations",
          description: "Integrated CRM with customer support features",
          features: [
            "Contact Management",
            "Support Tickets",
            "Customer Portal",
          ],
          icon: "Phone",
        },
      ],
      projectDetails: [
        {
          name: "Enterprise ERP Solution",
          version: "2.0.1",
          lastUpdated: "2024-12-23",
          deploymentType: "Cloud-based",
          supportHours: "24/7",
        },
      ],
      support: [
        {
          title: "Technical Support",
          description: "24/7 technical support and assistance",
          icon: "HelpCircle",
        },
        {
          title: "Customer Support",
          description: "High-quality customer support and resolutions",
          icon: "HelpCircle",
        },
        {
          title: "Maintenance & Updates",
          description: "Regular software updates and maintenance",
          icon: "Briefcase",
        },
        {
          title: "Training & Certification",
          description:
            "Access to industry-specific training and certifications",
          icon: "BookOpen",
        },
      ],
    },
  },
  {
    name: "Archiwiz Portal",
    description:
      "Archiwiz Portal offers cutting-edge solutions for architectural project management, cost estimation, and digital asset organization. With advanced tools for 3D modeling, 360° visualizations, and efficient communication, Archiwiz simplifies complex workflows while providing seamless data integration and project collaboration",
    slug: "portal",
    img: "/portal.png",
    version: "1.0.1",
    lastupdated: "2024-12-23",
    type: "detailed",
    tabs: {
      services: [
        {
          title: "Architecture Services Management",
          description: "Comprehensive management of architectural projects.",
          features: [
            "3D Modeling and Visualization",
            "360° Views and Walkthroughs",
            "Point Cloud Data Integration",
          ],
          icon: "Building",
        },
        {
          title: "RS Management",
          description:
            "Cost estimation and resource planning for architecture projects.",
          features: [
            "Accurate Cost Estimation",
            "Project Resource Allocation",
            "Budget Management Tools",
          ],
          icon: "Calculator",
        },
        {
          title: "Digital Assets Management",
          description: "Streamlined organization and access to digital assets.",
          features: [
            "Asset Categorization",
            "Secure Storage Solutions",
            "Search and Retrieval Optimization",
          ],
          icon: "Archive",
        },
        {
          title: "Internal Communication",
          description: "Efficient communication solutions for teams.",
          features: [
            "Centralized Messaging",
            "Project Collaboration Tools",
            "Notification and Updates",
          ],
          icon: "MessageCircle",
        },
      ],
      projectDetails: [
        {
          name: "Archiwiz Data Portal",
          version: "1.0.1",
          lastUpdated: "2024-12-23",
          deploymentType: "Hybrid",
          supportHours: "24/5",
        },
      ],
      support: [
        {
          title: "Technical Support",
          description: "Expert technical assistance.",
          icon: "BookOpen",
        },
        {
          title: "Documentation",
          description: "Comprehensive API and usage documentation.",
          icon: "BookOpen",
        },
      ],
    },
  },
  {
    name: "Medical Nate",
    description:
      "Doctor portal for hospital management to view patient information, add notes, and prescriptions",
    slug: "medical-nate",
    img: "/nate.png",
    version: "2.0.1",
    lastupdated: "2024-12-23",
    type: "detailed", // Flag for detailed project view
    tabs: {
      services: [
        {
          title: "Patient Information",
          description: "Access and manage detailed patient information",
          features: [
            "Patient Profile",
            "Medical History",
            "Lab Results",
            "MRI/EEG Scans",
            "Prescription Records",
          ],
          icon: "BarChart3",
        },
        {
          title: "Patient Notes & Prescriptions",
          description:
            "Add and manage notes, prescriptions, and medical recommendations",
          features: [
            "Add Notes",
            "Add Prescription",
            "View Medical History",
            "Patient Recommendations",
          ],
          icon: "Users",
        },
        {
          title: "Appointments Management",
          description: "Schedule and manage patient appointments",
          features: [
            "Appointment Scheduling",
            "Follow-up Reminders",
            "Appointment History",
          ],
          icon: "Package",
        },
        {
          title: "Reports & Analytics",
          description: "Access patient health reports and analytics",
          features: ["Medical Reports", "Lab Analysis", "Health Trends"],
          icon: "Phone",
        },
      ],
      projectDetails: [
        {
          name: "Nate Doctor Portal",
          version: "1.0.0",
          lastUpdated: "2025-01-09",
          deploymentType: "Cloud-based",
          supportHours: "24/7",
        },
      ],
      support: [
        {
          title: "Technical Support",
          description: "24/7 technical support and assistance",
          icon: "HelpCircle",
        },
        {
          title: "Customer Support",
          description: "High-quality customer support and resolutions",
          icon: "HelpCircle",
        },
        {
          title: "Maintenance & Updates",
          description: "Regular software updates and maintenance",
          icon: "Briefcase",
        },
        {
          title: "Training & Certification",
          description:
            "Access to industry-specific training and certifications",
          icon: "BookOpen",
        },
      ],
    },
  },
  {
    name: "Lumsden Trading",
    description: "Trading platform with innovative solutions.",
    link: "https://lumsdentrading.com/",
    img: "/lumsden.png",
    type: "external",
    slug: "lumsden-trading",
    version: "2.0.1",
    lastupdated: "2024-12-23",
    tabs: {
      services: [],
      projectDetails: [],
      support: [],
    },
  },
  {
    name: "Archiwiz",
    description: "Creative design and innovation solutions.",
    link: "https://archiwiz.com/",
    img: "/archiwizfrontpage.png",
    type: "external",
    slug: "archiwiz",
    version: "2.0.1",
    lastupdated: "2024-12-23",
    tabs: {
      services: [],
      projectDetails: [],
      support: [],
    },
  },
  {
    name: "Digital Twin",
    description:
      "Innovative digital solutions for creating virtual replicas of physical assets to enhance efficiency and decision-making.",
    slug: "digital-twin",
    img: "/digitaltwin.webp",
    type: "detailed",
    lastupdated: "Yesterday",
    version: "2.0.1",
    tabs: {
      services: [
        {
          title: "Virtual Asset Modeling",
          description:
            "Accurate 3D modeling and replication of physical assets",
          features: [
            "High-Precision 3D Models",
            "Real-Time Synchronization",
            "Lifecycle Monitoring",
          ],
          icon: "BarChart3",
        },
        {
          title: "Operational Optimization",
          description: "Streamline operations with data-driven insights",
          features: [
            "Predictive Maintenance",
            "Process Automation",
            "Performance Analytics",
          ],
          icon: "Settings",
        },
        {
          title: "Data Integration",
          description: "Seamless integration with IoT devices and platforms",
          features: [
            "Sensor Data Integration",
            "Cloud Connectivity",
            "Advanced Analytics",
          ],
          icon: "Cloud",
        },
        {
          title: "Collaboration Tools",
          description:
            "Enhanced team collaboration through shared virtual spaces",
          features: [
            "Real-Time Team Collaboration",
            "Shared Virtual Environments",
            "Interactive Workflows",
          ],
          icon: "Users",
        },
      ],
      projectDetails: [
        {
          name: "Digital Twin Platform",
          version: "1.5.3",
          lastUpdated: "2024-12-23",
          deploymentType: "Hybrid",
          supportHours: "24/7",
        },
      ],
      support: [
        {
          title: "Technical Support",
          description: "Round-the-clock technical assistance",
          icon: "HelpCircle",
        },
        {
          title: "Training & Onboarding",
          description: "Comprehensive training for optimal platform use",
          icon: "BookOpen",
        },
        {
          title: "Custom Development",
          description: "Tailored solutions to meet specific requirements",
          icon: "Briefcase",
        },
        {
          title: "Platform Maintenance",
          description: "Regular updates and performance improvements",
          icon: "ToolCase",
        },
      ],
    },
  },
  {
    name: "AR/VR Solutions",
    description:
      "Innovative augmented and virtual reality solutions for immersive experiences across diverse industries.",
    slug: "ar-vr",
    img: "/Ar-vr.jpg",
    type: "detailed",
    version: "",
    lastupdated: "",
    tabs: {
      services: [
        {
          title: "Augmented Reality",
          description: "Enhance real-world experiences with digital overlays",
          features: [
            "Real-Time Interactions",
            "Custom AR Applications",
            "Device Compatibility",
          ],
          icon: "Eye",
        },
        {
          title: "Virtual Reality",
          description:
            "Create immersive virtual environments for diverse use cases",
          features: [
            "Simulated Environments",
            "Collaborative Virtual Spaces",
            "Interactive Experiences",
          ],
          icon: "RectangleGoggles",
        },
        {
          title: "3D Asset Creation",
          description: "Develop detailed 3D models for AR/VR integration",
          features: [
            "High-Quality 3D Models",
            "Performance Optimization",
            "Custom Designs",
          ],
          icon: "Box",
        },
        {
          title: "Interactive Solutions",
          description: "Engage users with tailored AR/VR applications",
          features: [
            "Gamification Features",
            "Personalized User Experiences",
            "Interactive Workflows",
          ],
          icon: "Gamepad",
        },
      ],
      projectDetails: [
        {
          name: "AR/VR Platform",
          version: "1.2.0",
          lastUpdated: "2024-12-23",
          deploymentType: "Cloud-Based",
          supportHours: "24/7",
        },
      ],
      support: [
        {
          title: "Technical Support",
          description: "24/7 expert assistance for AR/VR solutions",
          icon: "HelpCircle",
        },
        {
          title: "Training & Implementation",
          description: "Comprehensive training for AR/VR tools and platforms",
          icon: "BookOpen",
        },
        {
          title: "Custom Development",
          description: "Personalized AR/VR solutions to meet unique needs",
          icon: "Briefcase",
        },
        {
          title: "Platform Maintenance",
          description: "Regular updates and performance enhancements",
          icon: "ToolCase",
        },
      ],
    },
  },
  {
    name: "Archiwiz Build",
    description: "We bring your ideal home to life from concept tp completion.",
    link: "https://archiwizbuild.com",
    img: "/archiwizbuild.png",
    type: "external",
    slug: "archiwiz-build",
    version: "2.0.1",
    lastupdated: "2024-12-23",
    tabs: {
      services: [],
      projectDetails: [],
      support: [],
    },
  },
];

// Utility functions
export const GetProjectDetailsBySlug = (slug: string) => {
  return projects.filter((project) => project.slug === slug);
};

export const getDetailedProjects = () => {
  return projects.filter((project) => project.type === "detailed");
};

export const getExternalProjects = () => {
  return projects.filter((project) => project.type === "external");
};
