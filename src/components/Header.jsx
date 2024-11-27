import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import CustomButton from "../globals/CustomButton";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full h-24 fixed z-[999] transition-all duration-300 bg-white dark:bg-gray-900"
      // className={`${
      //   scrolled ? "sticky" : "bg-white dark:bg-gray-900"

      // } "w-full fixed z-[999] transition-all duration-300`"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          <div className="md:flex md:items-center  md:gap-12 items-center">
            <Link to="/">
              <img className="h-24 w-24" src={logo} alt="safesolution" />
              
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-[16px]">
                <li>
                  <Link
                    className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/services"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/careers"
                  >
                    Careers
                  </Link>
                </li>

                <CustomButton
                  styleType="base"
                  label="Contact us"
                  href="/start"
                />

                <button onClick={toggleTheme} aria-label="Toggle Dark Mode">
                  {dark ? (
                    <IoSunny color="yellow" size={24} />
                  ) : (
                    <IoMoon color="black" size={24} />
                  )}
                </button>
              </ul>
            </nav>
          </div>

          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="fixed top-0 left-0 h-full w-3/4 bg-white dark:bg-gray-800 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                      to="/services"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                      to="/careers"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 text-black dark:text-white"
                    >
                      {dark ? (
                        <>
                          <IoSunny size={18} /> Light Mode
                        </>
                      ) : (
                        <>
                          <IoMoon size={18} /> Dark Mode
                        </>
                      )}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import CustomButton from "../globals/CustomButton";
// import { IoMoon, IoSunny } from "react-icons/io5";
// import { useTheme } from "../context/ThemeContext";

// const Header = () => {
//   const { dark, toggleTheme } = useTheme();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-gradient-to-r from-indigo-600 via-blue-500 to-green-400 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-600 w-full fixed z-[999] shadow-lg transition-all duration-300">
//       <div className="container mx-auto px-4">
//         <div className="flex h-24 items-center justify-between">
//           {/* Logo Section */}
//           <div className="md:flex md:items-center md:gap-12 items-center">
//             <Link to="/">
//               <img className="h-24 w-24 rounded-full shadow-md transition-transform transform hover:scale-110" src={logo} alt="safesolution" />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <nav aria-label="Global">
//               <ul className="flex items-center gap-8 text-lg font-medium">
//                 <li>
//                   <Link
//                     className="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300 transition duration-300 ease-in-out"
//                     to="/"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300 transition duration-300 ease-in-out"
//                     to="/about"
//                   >
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300 transition duration-300 ease-in-out"
//                     to="/services"
//                   >
//                     Services
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300 transition duration-300 ease-in-out"
//                     to="/careers"
//                   >
//                     Careers
//                   </Link>
//                 </li>
//                 <CustomButton
//                   styleType="base"
//                   label="Contact us"
//                   href="/start"
//                 />
//                 <button onClick={toggleTheme} aria-label="Toggle Dark Mode">
//                   {dark ? (
//                     <IoSunny color="yellow" size={24} className="transition-all duration-300" />
//                   ) : (
//                     <IoMoon color="black" size={24} className="transition-all duration-300" />
//                   )}
//                 </button>
//               </ul>
//             </nav>
//           </div>

//           {/* Mobile Navigation */}
//           <div className="block md:hidden">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="rounded bg-gray-100 p-2 text-gray-600 transition-transform transform hover:scale-110 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Overlay */}
//         {menuOpen && (
//           <div
//             className="fixed inset-0 z-50 bg-black bg-opacity-50"
//             onClick={() => setMenuOpen(false)}
//           >
//             <div
//               className="fixed top-0 left-0 h-full w-3/4 bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-all"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <nav className="p-6">
//                 <ul className="space-y-4 text-xl font-semibold">
//                   <li>
//                     <Link
//                       className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition duration-300"
//                       to="/"
//                     >
//                       Home
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition duration-300"
//                       to="/about"
//                     >
//                       About
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition duration-300"
//                       to="/services"
//                     >
//                       Services
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition duration-300"
//                       to="/careers"
//                     >
//                       Careers
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       onClick={toggleTheme}
//                       className="flex items-center gap-2 text-black dark:text-white transition duration-300"
//                     >
//                       {dark ? (
//                         <><IoSunny size={18} /> Light Mode</>
//                       ) : (
//                         <><IoMoon size={18} /> Dark Mode</>
//                       )}
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

