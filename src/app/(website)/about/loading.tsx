import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-dvh">
      <LoaderCircle size={60} className="text-sky-600" />;
    </div>
  );
}
