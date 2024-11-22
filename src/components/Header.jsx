// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import CustomButton from "../globals/CustomButton";
// import { IoMoon, IoSunny } from "react-icons/io5";

// const Header = () => {
//   const [dark, setDark] = useState(false);

//   // Initialize dark mode state on component mount
//   useEffect(() => {
//     const storedPreference = localStorage.getItem("theme");
//     const systemPreference = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (storedPreference) {
//       setDark(storedPreference === "dark");
//       document.body.classList.toggle("dark", storedPreference === "dark");
//     } else {
//       setDark(systemPreference);
//       document.body.classList.toggle("dark", systemPreference);
//     }
//   }, []);

//   const darkModeHandler = () => {
//     const newDarkState = !dark;
//     setDark(newDarkState);
//     document.body.classList.toggle("dark", newDarkState);

//     // Save the preference
//     localStorage.setItem("theme", newDarkState ? "dark" : "light");
//   };

//   return (
//     <header className="bg-white dark:bg-gray-900">
//       <div className=" container mx-auto  px-4">
//         <div className="flex h-24 items-center justify-between">
//           <div className="md:flex md:items-center md:gap-12 items-center">
//             <Link to="/home">
//               <img className="h-24 w-24" src={logo} alt="safesolution" />
//             </Link>
//           </div>

//           <div className="hidden md:block">
//             <nav aria-label="Global">
//               <ul className="flex items-center gap-6 text-[16px]">
//                 <li>
//                   <Link
//                     className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                     to="/home"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                     to="/about"
//                   >
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
//                     to="/services"
//                   >
//                     Services
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
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

//                 <button onClick={darkModeHandler} aria-label="Toggle Dark Mode">
//                   {dark ? (
//                     <IoSunny color="yellow" size={24} />
//                   ) : (
//                     <IoMoon color="black" size={24} />
//                   )}
//                 </button>
//               </ul>
//             </nav>
//           </div>

//           {/* Dark mode toggle button */}
//           <div className="block md:hidden">
//           <button
//             className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="size-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import CustomButton from "../globals/CustomButton";
import { IoMoon, IoSunny } from "react-icons/io5";

const Header = () => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  

  // Initialize dark mode state on component mount
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedPreference) {
      setDark(storedPreference === "dark");
      document.body.classList.toggle("dark", storedPreference === "dark");
    } else {
      setDark(systemPreference);
      document.body.classList.toggle("dark", systemPreference);
    }
  }, []);

  const darkModeHandler = () => {
    const newDarkState = !dark;
    setDark(newDarkState);
    document.body.classList.toggle("dark", newDarkState);

    // Save the preference
    localStorage.setItem("theme", newDarkState ? "dark" : "light");
  };

  return (
    <header className="bg-white dark:bg-gray-900 w-full fixed z-[999] ">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12 items-center">
            <Link to="/home" >
              <img className="h-24 w-24 " src={logo} alt="safesolution"  />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-[16px]">
                <li>
                  <Link
                    className="text-black transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/home"
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

                <button onClick={darkModeHandler} aria-label="Toggle Dark Mode">
                  {dark ? (
                    <IoSunny color="yellow" size={24} />
                  ) : (
                    <IoMoon color="black" size={24} />
                  )}
                </button>
              </ul>
            </nav>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Side Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}>
            <div
              className="fixed top-0 left-0 h-full w-3/4 bg-white dark:bg-gray-800 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      className="block text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                      to="/home"
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
                      onClick={darkModeHandler}
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
