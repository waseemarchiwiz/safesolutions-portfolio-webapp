import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScanText, Settings2, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="bg-zinc-100 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center text-sm text-sky-600">
            <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
            <span className="font-semibold">Choose</span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">
            Why choose <span className="text-sky-600">Safe Solutions?</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Discover why businesses trust Safe Solutions for cutting-edge
            software development — delivering innovative solutions with
            precision, reliability, and exceptional results.
          </p>
        </div>

        <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Scalable Solutions</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Build software that grows with your business. Our solutions are
                designed to scale seamlessly from startup to enterprise.
              </p>
            </CardContent>
          </div>

          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Settings2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Expert Development Team</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Work with experienced developers who bring technical excellence
                and industry best practices to every project.
              </p>
            </CardContent>
          </div>

          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">AI-Powered Innovation</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Leverage cutting-edge artificial intelligence and machine
                learning to create smarter, more efficient software solutions.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
