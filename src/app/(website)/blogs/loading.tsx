import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <LoaderCircle size={60} className="text-sky-600 animate-spin" />
    </div>
  );
}
