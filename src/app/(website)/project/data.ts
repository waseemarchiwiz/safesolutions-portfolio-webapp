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
  DatabaseIcon,
  ShieldCheckIcon,
  ServerIcon,
  GlobeIcon,
  Construction,
  Toilet,
  BrickWall,
  HandPlatter,
  SquareSquare,
  Trees,
  CookingPot,
  Truck,
  ClipboardCheck,
  Boxes,
  TruckElectricIcon,
  Headphones,
  Map, // FaMapMarkedAlt
  Waves, // FaWater
  Leaf, // FaLeaf
  LineChart, // FaChartLine
  Tractor, // FaTractor
  Plane, // FaHelicopter (no helicopter, closest is Plane)
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
  GlobeIcon,
  Construction,
  Toilet,
  BrickWall,
  HandPlatter,
  SquareSquare,
  Trees,
  CookingPot,
  Truck,
  ClipboardCheck,
  Boxes,
  TruckElectricIcon,
  Headphones,
  Map,
  Waves,
  Leaf,
  LineChart,
  Tractor,
  Plane,
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
