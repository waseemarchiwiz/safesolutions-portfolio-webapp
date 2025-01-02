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
    route: "/erpdetails",
    img: erpimage,
    version: "2.0.1",
    lastupdated: "2024-12-23",
    tabs:{
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
          features: ["Payroll Processing", "Time & Attendance", "Employee Records"],
          icon: Users,
        },
        {
          title: "Inventory Management",
          description: "Real-time inventory tracking and optimization",
          features: ["Stock Control", "Purchase Orders", "Warehouse Management"],
          icon: Package,
        },
        {
          title: "Customer Relations",
          description: "Integrated CRM with customer support features",
          features: ["Contact Management", "Support Tickets", "Customer Portal"],
          icon: Phone,
        },
      ],
      projectDetails:[
        {
          name: "Enterprise ERP Solution",
          version: "2.0.1",
          lastUpdated: "2024-12-23",
          deploymentType: "Cloud-based",
          supportHours: "24/7",
        }
      ],
      support:[
        {
          title: "Technical Support",
          description: "24/7 technical support and assistance",
          icon: Chat,
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
          description: "Access to industry-specific training and certifications",
          icon: BookOpen,
        },
      ]
    }
  },
  {
    name: "Archiwiz Portal",
    description:
      "Efficient data extraction solutions using technologies like Beautiful Soup, Scrapy, and Selenium.",
    route: "/portaldetails",
    img: archiwiz,
    version: "1.0.1",
    lastupdated: "2024-12-23",
  },
  {
    name: "Precision Health",
    description:
      "Medical Precision gives information about medical health and how to maintain it.",
    link: "https://orange-ocean-0cfaffb1e.5.azurestaticapps.net/",
    img: precision,
  },
  {
    name: "Medical Nate",
    description:
      "Medical Precision gives information about medical health and how to maintain it.",
    link: "https://medicalkp-hcffechccfexazfb.eastus-01.azurewebsites.net/",
    img: nate,
  },
  {
    name: "Lumsden Trading",
    description: "Trading platform with innovative solutions.",
    link: "https://lumsdentrading.com/",
    img: lumsden,
  },
  {
    name: "Archiwiz",
    description: "Creative design and innovation solutions.",
    link: "https://archiwiz.com/",
    img: archiwizfront,
  },
  {
    name: "Digital Twin",
    description: "Creative design and innovation solutions.",
    link: "https://archiwiz.com/",
    img: archiwizfront,
  },
  {
    name: "AR/VR",
    description: "Creative design and innovation solutions.",
    link: "https://archiwiz.com/",
    img: archiwizfront,
  },
];
