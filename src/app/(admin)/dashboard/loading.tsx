import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto py-5 space-y-8">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="bg-zinc-50 h-52" />
        ))}
      </div>
      {/* Recent messages */}
      <div className="animate-pulse gap-4">
        <Card className="bg-zinc-50 h-80" />
      </div>
    </div>
  );
}
