import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto py-5 space-y-8">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="bg-zinc-50 h-52"></Card>
        ))}
      </div>
    </div>
  );
}
