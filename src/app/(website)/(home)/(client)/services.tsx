import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ScanText } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ServicesTypes } from "../../services/(client)";
// Replace these logos with ones appropriate to your services

const WebAppLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Web Application</title>
      <defs>
        <linearGradient id="grad-webapp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="url(#grad-webapp)"
        strokeWidth="2"
        fill="transparent"
      />
      <path
        d="M3 9h18M8 15h8"
        stroke="url(#grad-webapp)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const MobileAppLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Mobile Application</title>
      <defs>
        <linearGradient id="grad-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect
        x="7"
        y="2"
        width="10"
        height="20"
        rx="2"
        stroke="url(#grad-mobile)"
        strokeWidth="2"
        fill="transparent"
      />
      <circle cx="12" cy="18" r="1" fill="url(#grad-mobile)" />
    </svg>
  );
};

const CloudInfraLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Cloud Infrastructure</title>
      <defs>
        <linearGradient id="grad-cloud" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
      <path
        d="M6 16a4 4 0 010-8 5 5 0 019 0 4 4 0 014 4h-1.5"
        stroke="url(#grad-cloud)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="transparent"
      />
    </svg>
  );
};

const APIIntegrationLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>API & Integration</title>
      <defs>
        <linearGradient id="grad-api" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="url(#grad-api)"
        strokeWidth="2"
        fill="transparent"
      />
      <path
        d="M4 12h4m8 0h4M12 4v4m0 8v4"
        stroke="url(#grad-api)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const DevOpsLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>DevOps & Automation</title>
      <defs>
        <linearGradient id="grad-devops" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path
        d="M4 12h16M12 4v16"
        stroke="url(#grad-devops)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="url(#grad-devops)" />
    </svg>
  );
};

const MaintenanceLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Maintenance & Support</title>
      <defs>
        <linearGradient id="grad-maint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M4 15v4h4M20 9v-4h-4"
        stroke="url(#grad-maint)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="url(#grad-maint)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export const Services = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center text-sm text-sky-600">
            <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
            <span className="font-semibold">Our Services</span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">
            What We Do at <span className="text-sky-600">Safe Solutions</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            We help businesses bring ideas to life with end-to-end software
            development. From planning to deployment and beyond, we deliver
            scalable, secure, and high-performing solutions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            title="Web Application Development"
            description="Building robust, responsive web applications tailored to your business needs — using React, Next.js, Node.js and more."
            link="#web"
          >
            <WebAppLogo className="w-10 h-10" />
          </ServiceCard>

          <ServiceCard
            title="Mobile Application Development"
            description="Native & cross-platform mobile apps for iOS and Android. UI/UX focused, high performance, and enterprise ready."
            link="#mobile"
          >
            <MobileAppLogo className="w-10 h-10" />
          </ServiceCard>

          <ServiceCard
            title="Cloud & Infrastructure"
            description="Designing and maintaining scalable cloud architecture on AWS, Azure, or GCP — with security, monitoring & auto-scaling."
            link="#cloud"
          >
            <CloudInfraLogo className="w-10 h-10" />
          </ServiceCard>

          <ServiceCard
            title="API & System Integration"
            description="Connecting systems, implementing REST / GraphQL APIs, and ensuring smooth data flows between platforms and services."
            link="#api"
          >
            <APIIntegrationLogo className="w-10 h-10" />
          </ServiceCard>

          <ServiceCard
            title="DevOps & Automation"
            description="CI/CD pipelines, infrastructure as code, containerization, and monitoring — for faster releases and reliable operations."
            link="#devops"
          >
            <DevOpsLogo className="w-10 h-10" />
          </ServiceCard>

          <ServiceCard
            title="Maintenance & Support"
            description="Ongoing support, performance optimization, error fixing, updates, and enhancements to keep your software running smoothly."
            link="#support"
          >
            <MaintenanceLogo className="w-10 h-10" />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}
const ServiceCard = ({
  title,
  description,
  children,
  link = "#",
}: ServiceCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-10 w-10">{children}</div>

        <div className="space-y-3 py-6">
          <h3 className="text-lg font-medium text-slate-900">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {description}
          </p>
        </div>

        <div className="flex items-center border-t border-dashed pt-4">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="flex items-center gap-1 pr-2 shadow-none"
          >
            <Link href={link}>
              <span>Learn More</span>
              <ChevronRight className="ml-1 size-3 opacity-70" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
