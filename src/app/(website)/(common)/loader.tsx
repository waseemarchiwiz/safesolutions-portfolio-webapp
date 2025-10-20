import Image from "next/image";
import React from "react";

const Loader = () => {
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

export default Loader;
