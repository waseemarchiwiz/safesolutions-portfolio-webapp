import React from "react";

const CustomButton = ({ styleType = "base", label = "Download", href = "#" }) => {
  // Define styles for the two button types
  const baseStyle = `
    group relative inline-block text-lg font-medium text-white focus:outline-none focus:ring
  `;
  const baseInnerStyle = `
    block border border-red-600 bg-red-600 px-[26px] py-2 transition-transform 
    active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1
  `;
  
  const borderStyle = `
    group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500
  `;
  const borderInnerStyle = `
    block border border-current bg-white px-12 py-3 transition-transform 
    group-hover:-translate-x-1 group-hover:-translate-y-1
  `;

  return (
    <a
      className={styleType === "base" ? baseStyle : borderStyle}
      href={href}
    >
      <span className="absolute inset-0 border border-current"></span>
      <span className={styleType === "base" ? baseInnerStyle : borderInnerStyle}>
        {label}
      </span>
    </a>
  );
};

export default CustomButton;
