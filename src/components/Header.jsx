import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import CustomButton from "../globals/CustomButton";
import { IoMoon, IoSunny } from "react-icons/io5";

const Header = () => {
  const [dark, setDark] = useState(false);

  // Initialize dark mode state on component mount
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

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
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12 items-center">
            <Link to="/home">
              <img className="h-24 w-24" src={logo} alt="safesolution" />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
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
                    to="/careers"
                  >
                    Careers
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
                <CustomButton styleType="base" label="Get Started" href="/start" />
              </ul>
            </nav>
          </div>

          {/* Dark mode toggle button */}
          <button onClick={darkModeHandler} aria-label="Toggle Dark Mode">
            {dark ? <IoSunny color="yellow" size={24} /> : <IoMoon color="black" size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
