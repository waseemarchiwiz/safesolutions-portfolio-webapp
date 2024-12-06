import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SideBar = () => {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
  };

  const toggleSettingsCollapse = () => {
    setIsSettingsCollapsed(!isSettingsCollapsed);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "block p-2 rounded-md bg-gray-700 text-white transition-colors duration-300"
      : "block p-2 rounded-md hover:bg-gray-700 transition-colors duration-300";
  };

  const sidebarVariants = {
    open: {
      width: isDesktopSidebarCollapsed ? "80px" : "250px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      width: "80px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileSidebar}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isDesktopSidebarCollapsed ? "closed" : "open"}
        className={`
          hidden lg:block 
          bg-gray-800 text-white 
          h-screen 
          fixed top-0 left-0 
          z-50 shadow-lg 
          overflow-hidden
          transition-all
        `}
      >
        <div className="p-4">
          {/* Sidebar Toggle for Desktop */}
          <button
            onClick={toggleDesktopSidebar}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            {isDesktopSidebarCollapsed ? <FaBars /> : <FaTimes />}
          </button>

          {/* Logo/Title */}
          {!isDesktopSidebarCollapsed && (
            <h2 className="text-2xl font-semibold text-center mb-6">
              Dashboard
            </h2>
          )}

          {/* Profile Section
          <div className="flex items-center mb-6">
            <FaUserCircle className="text-4xl text-gray-400" />
            {!isDesktopSidebarCollapsed && (
              <div className="ml-4">
                <p className="font-semibold">Admin</p>
                <p className="text-sm text-gray-400">admin@example.com</p>
              </div>
            )}
          </div> */}

          {/* Sidebar Links */}
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin/dashboard"
                className={getLinkClass("/admin/dashboard")}
              >
                <FaHome className="inline mr-2" />
                {!isDesktopSidebarCollapsed && "Dashboard"}
              </Link>
            </li>

            {/* Settings Section */}
            <li>
              <button
                onClick={toggleSettingsCollapse}
                className="w-full text-left flex items-center p-2 rounded-md hover:bg-gray-700"
              >
                <FaCog className="inline mr-2" />
                {!isDesktopSidebarCollapsed && (
                  <>
                    Settings
                    {isSettingsCollapsed ? (
                      <FaChevronDown className="ml-auto" />
                    ) : (
                      <FaChevronUp className="ml-auto" />
                    )}
                  </>
                )}
              </button>
              {!isDesktopSidebarCollapsed && !isSettingsCollapsed && (
                <ul className="pl-6 space-y-2 mt-2">
                  <li>
                    <Link
                      to="/admin/settings/profile"
                      className={getLinkClass("/admin/settings/profile")}
                    >
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/settings/account"
                      className={getLinkClass("/admin/settings/account")}
                    >
                      Account Settings
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Reports */}
            {/* <li>
              <Link
                to="/admin/reports"
                className={getLinkClass("/admin/reports")}
              >
                <FaCog className="inline mr-2" />
                {!isDesktopSidebarCollapsed && "Reports"}
              </Link>
            </li> */}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default SideBar;

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaHome, FaCog, FaUserCircle, FaBars } from "react-icons/fa"; // Icons

// const SideBar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false); // For collapsible section

//   const handleCollapseToggle = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const getLinkClass = (path) => {
//     return location.pathname === path
//       ? "block p-2 rounded-md bg-gray-700 text-white"
//       : "block p-2 rounded-md hover:bg-gray-700 transition-colors duration-300";
//   };

//   return (
//     <>
//       {/* Overlay for when sidebar is open */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           // className="fixed inset-0 bg-black opacity-50 z-40"
//         />
//       )}

//       <div
//         className={bg-gray-800 text-white w-64 h-screen p-6 transition-transform duration-500 ease-in-out fixed top-0 left-0 z-50 shadow-lg   ${
//           isOpen ? "translate-x-0" : "-translate-x-80"
//         }}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-center">Dashboard</h2>
//           <button
//             className="text-2xl lg:hidden"
//             onClick={toggleSidebar}
//           >
//             <FaBars />
//           </button>
//         </div>

//         {/* Profile Section */}
//         <div className="flex items-center mb-6">
//           <FaUserCircle className="text-4xl text-gray-400" />
//           <div className="ml-4">
//             <p className="font-semibold">Admin</p>
//             <p className="text-sm text-gray-400">admin@example.com</p>
//           </div>
//         </div>

//         {/* Sidebar Links */}
//         <ul className="space-y-4">
//           <li>
//             <Link to="/admin/dashboard" className={getLinkClass("/admin/dashboard")}>
//               <FaHome className="inline mr-2" /> Dashboard
//             </Link>
//           </li>

//           {/* Collapsible Section */}
//           <li>
//             <button
//               onClick={handleCollapseToggle}
//               className="w-full text-left flex items-center p-2 rounded-md hover:bg-gray-700"
//             >
//               <FaCog className="inline mr-2" /> Settings
//             </button>
//             {!isCollapsed && (
//               <ul className="pl-6 space-y-2">
//                 <li>
//                   <Link className={getLinkClass("/admin/settings/profile")}>
//                     Profile Settings
//                   </Link>
//                 </li>
//                 <li>
//                   <Link  className={getLinkClass("/admin/settings/account")}>
//                     Account Settings
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Additional Links */}
//           <li>
//             <Link  className={getLinkClass("/admin/reports")}>
//               <FaCog className="inline mr-2" /> Reports
//             </Link>
//           </li>

//           {/* More Links */}

//         </ul>
//       </div>
//     </>
//   );
// };

// export default SideBar;
// make it responsive and animated
