import React from "react";
import archiwizlight from "../../assets/projectlogos/archiwizlight.webp";
import archiwizdark from "../../assets/projectlogos/archiwizdark.png";
import lumsdenlogo from "../../assets/projectlogos/lumsdenlogo.webp";
import alphalogo from "../../assets/projectlogos/alphabuilt.png";
import { useTheme } from "../../context/ThemeContext";

const ProjComp = () => {
  const { dark } = useTheme();
  const theme = localStorage.getItem("theme");

  console.log(theme, "hsgd");

  return (
    <div className="mt-10 p-10">
      <div className=" flex justify-center items-center    px-10    ">
        <div className="grid lg:grid-cols-6  gap-3    ">
          <div className="lg:border-r-[0.5px] lg:border-r-[#111827]       p-20">
            {
              dark ? (
                <img src={archiwizdark} alt="archiwiz" />
              ) : theme === "light" ? (
                <img src={archiwizlight} alt="archiwiz" />
              ) : null // Handle other cases if needed
            }
          </div>

          <div className="lg:border-r-[0.5px] lg:border-r-[#111827]   p-20">
            {
              dark ? (
                <img
                  src={lumsdenlogo}
                  alt="archiwiz"
                  className="dark:invert-0"
                />
              ) : theme === "light" ? (
                <img src={lumsdenlogo} alt="archiwiz" />
              ) : null // Handle other cases if needed
            }
          </div>
          <div className="lg:border-r-[0.5px] lg:border-r-[#111827]   p-20">
            {
              dark ? (
                <img src={alphalogo} alt="archiwiz" />
              ) : theme === "light" ? (
                <img src={alphalogo} alt="archiwiz" />
              ) : null // Handle other cases if needed
            }
          </div>
          <div className="lg:border-r-[0.5px] lg:border-r-[#111827]    p-20">
            {
              dark ? (
                <img src={archiwizdark} alt="archiwiz" />
              ) : theme === "light" ? (
                <img src={archiwizlight} alt="archiwiz" />
              ) : null // Handle other cases if needed
            }
          </div>
          <div className="lg:border-r-[0.5px] lg:border-r-[#111827]    p-20">
            {
              dark ? (
                <img src={archiwizdark} alt="archiwiz" />
              ) : theme === "light" ? (
                <img src={archiwizlight} alt="archiwiz" />
              ) : null // Handle other cases if needed
            }
          </div>
          <div className="   p-20">
            {
              dark ? (
                <img src={alphalogo} alt="archiwiz" />
              ) : theme === "light" ? (
                <img src={alphalogo} alt="archiwiz" />
              ) : null // Handle other cases if needed
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjComp;
