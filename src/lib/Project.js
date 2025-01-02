import {
  BarChart3,
  Users,
  Package,
  Phone,
  HelpCircle,
  Briefcase,
  BookOpen,
  Database,
  Code,
  Globe,
  Search,
  Layout,
  Cpu,
  Glasses,
  Box,
} from "lucide-react";

// Import images
import erpimage from "../assets/erp.webp";
import precision from "../assets/precision.png";
import nate from "../assets/nate.png";
import archiwiz from "../assets/portal.png";
import lumsden from "../assets/lumsden.png";
import archiwizfront from "../assets/archiwizfrontpage.png";

export const projects = [
  {
    name: "ERP System",
    description:
      "Comprehensive ERP and CRM implementation and customization to streamline business processes and improve customer management.",
    route: "/enterprise-erp",
    img: erpimage,
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
          icon: BarChart3,
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
          icon: Users,
        },
        {
          title: "Inventory Management",
          description: "Real-time inventory tracking and optimization",
          features: [
            "Stock Control",
            "Purchase Orders",
            "Warehouse Management",
          ],
          icon: Package,
        },
        {
          title: "Customer Relations",
          description: "Integrated CRM with customer support features",
          features: [
            "Contact Management",
            "Support Tickets",
            "Customer Portal",
          ],
          icon: Phone,
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
          icon: HelpCircle,
        },
        {
          title: "Customer Support",
          description: "High-quality customer support and resolutions",
          icon: HelpCircle,
        },
        {
          title: "Maintenance & Updates",
          description: "Regular software updates and maintenance",
          icon: Briefcase,
        },
        {
          title: "Training & Certification",
          description:
            "Access to industry-specific training and certifications",
          icon: BookOpen,
        },
      ],
    },
  },
  {
    name: "Archiwiz Portal",
    description:
      "Efficient data extraction solutions using technologies like Beautiful Soup, Scrapy, and Selenium.",
    route: "/portaldetails",
    img: archiwiz,
    version: "1.0.1",
    lastupdated: "2024-12-23",
    type: "detailed",
    tabs: {
      services: [
        {
          title: "Data Extraction",
          description: "Advanced web scraping and data collection solutions",
          features: [
            "Automated Data Collection",
            "Custom Scraping Scripts",
            "Real-time Data Updates",
          ],
          icon: Database,
        },
        {
          title: "Data Processing",
          description: "Efficient data processing and transformation",
          features: ["Data Cleaning", "Format Conversion", "Data Validation"],
          icon: Code,
        },
        {
          title: "Web Integration",
          description: "Seamless integration with web platforms",
          features: [
            "API Development",
            "Database Integration",
            "Custom Workflows",
          ],
          icon: Globe,
        },
        {
          title: "Analytics",
          description: "Comprehensive data analysis and reporting",
          features: ["Custom Reports", "Data Visualization", "Trend Analysis"],
          icon: Search,
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
          description: "Expert technical assistance",
          icon: BookOpen,
        },
        {
          title: "Documentation",
          description: "Comprehensive API and usage documentation",
          icon: BookOpen,
        },
      ],
    },
  },
  {
    name: "Precision Health",
    description:
      "Medical Precision gives information about medical health and how to maintain it.",
    link: "https://orange-ocean-0cfaffb1e.5.azurestaticapps.net/",
    img: precision,
    type: "external", // Flag for external link projects
  },
  {
    name: "Medical Nate",
    description:
      "Medical Precision gives information about medical health and how to maintain it.",
    link: "https://medicalkp-hcffechccfexazfb.eastus-01.azurewebsites.net/",
    img: nate,
    type: "external",
  },
  {
    name: "Lumsden Trading",
    description: "Trading platform with innovative solutions.",
    link: "https://lumsdentrading.com/",
    img: lumsden,
    type: "external",
  },
  {
    name: "Archiwiz",
    description: "Creative design and innovation solutions.",
    link: "https://archiwiz.com/",
    img: archiwizfront,
    type: "external",
  },
  {
    name: "Digital Twin",
    description: "Creative design and innovation solutions.",
    link: "https://archiwiz.com/",
    img: archiwizfront,
    type: "external",
  },
  {
    name: "AR/VR",
    description: "Creative design and innovation solutions.",
    link: "https://archiwiz.com/",
    img: archiwizfront,
    type: "external",
  },
];

// Utility functions
export const getProjectByRoute = (route) => {
  return projects.find((project) => project.route === route);
};

export const getDetailedProjects = () => {
  return projects.filter((project) => project.type === "detailed");
};

export const getExternalProjects = () => {
  return projects.filter((project) => project.type === "external");
};
