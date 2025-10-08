import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ScanText } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  Gemini,
  Replit,
  MagicUI,
  VSCodium,
  MediaWiki,
  GooglePaLM,
} from "@/components/logos";

export default function Services() {
  return (
    <section>
      <div className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Title */}
          <div className="mb-3 flex items-center text-sm text-sky-600">
            <ScanText size={15} className=" text-sky-600 mr-2" aria-hidden />
            <span className="font-semibold">Services</span>
          </div>
          <h2 className="text-balance text-4xl font-semibold">
            What we offer at{" "}
            <span className=" py-3 text-sky-600">Safe Solutions</span>
          </h2>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="Google Gemini"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <Gemini />
            </IntegrationCard>

            <IntegrationCard
              title="Replit"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <Replit />
            </IntegrationCard>

            <IntegrationCard
              title="Magic UI"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <MagicUI />
            </IntegrationCard>

            <IntegrationCard
              title="VSCodium"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <VSCodium />
            </IntegrationCard>

            <IntegrationCard
              title="MediaWiki"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <MediaWiki />
            </IntegrationCard>

            <IntegrationCard
              title="Google PaLM"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <GooglePaLM />
            </IntegrationCard>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  children,
  link = "https://github.com/meschacirung/cnblocks",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}) => {
  return (
    <Card className="p-6">
      <div className="relative">
        <div className="*:size-10">{children}</div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="gap-1 pr-2 shadow-none"
          >
            <Link href={link}>
              Learn More
              <ChevronRight className="ml-0 !size-3.5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
