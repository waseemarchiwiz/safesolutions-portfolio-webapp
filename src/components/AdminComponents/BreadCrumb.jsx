import React from "react";

const BreadCrumb = ({ page }) => {
  return (
    <div>
      <h1  >
        <span className="text-gray-500 ">Dashboard /     </span>

        <span className="  font-bold tracking-wide text-[#2170b7]"> {page}</span>
      </h1>
    </div>
  );
};

export default BreadCrumb;
