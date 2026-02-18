import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <Image
        src={"/updated-logo.png"}
        width={100}
        height={100}
        alt="Logo"
        className="animate-pulse"
      />
      {/* <LoaderCircle size={60} className="text-sky-600 animate-spin" /> */}
    </div>
  );
};

export const LoaderCircle = ({
  size = 60,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div className={`${className} flex justify-center items-center`}>
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );
};
