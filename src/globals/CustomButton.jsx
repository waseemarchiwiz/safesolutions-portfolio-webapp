import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({
  label = "Contact Us",
  to = "",
  styleType = "default",
  className = "",
  handleClick,
  target = "",
}) => {
  const defaultStyle = `
    group relative h-[40px]  inline-block overflow-hidden border rounded-lg text-white bg-black border-[#2170B7] px-6 md:px-8 py-[6px] focus:outline-none focus:ring
  `;
  const defaultInnerStyle = `
    absolute inset-y-0 left-0 w-[2px]  bg-[#2170B7] transition-all group-hover:w-full group-active:bg-[#2170B7]
  `;
  const textStyle = `
    relative text-sm font-medium text-white transition-colors
  `;

  return (
    <div className="mx-auto">
      <Link
        className={`${defaultStyle} ${className}`}
        to={to}
        onClick={handleClick}
        
        target={target}
      >
        <span className={defaultInnerStyle}></span>
        <span className={textStyle}>{label}</span>
      </Link>
    </div>
  );
};

export default CustomButton;
