// import React, { useEffect, useState } from "react";
// import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
// import axios from "axios";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../assets/lottie/loadanimate.json";
// import founder from "../../assets/teamsImages/founder.jpg";
// import cofounder from "../../assets/teamsImages/cofounder.jpg";
// import director from "../../assets/teamsImages/director.jpg";

// // Default team members in case API fails
// const defaultTeamMembers = [
//   {
//     name: "Dr Allaudin Khan",
//     role: "Founder",
//     image: founder,
//     linkedin: "https://www.linkedin.com/in/allauddin-khan-826aa7289/",
//     github: "https://github.com/",
//     twitter: "https://twitter.com/",
//   },
//   {
//     name: "Dr Ghanimullah",
//     role: "Co-Founder",
//     image: cofounder,
//     linkedin: "https://www.linkedin.com/in/ghanim-ullah-58728530/",
//     github: "https://github.com",
//     twitter: "https://twitter.com",
//   },
//   {
//     name: "Muhammad Asfandyar",
//     role: "Director",
//     image: director,
//     linkedin: "https://www.linkedin.com",
//     github: "https://github.com",
//     twitter: "https://twitter.com",
//   },
// ];

// const Teams = () => {
//   const [loading, setLoading] = useState(true);
//   const [teamsMemberData, setTeamsMemberData] = useState([]);

//   const userUrl = import.meta.env.VITE_USER_URL;
//   const apiToken = import.meta.env.VITE_API_TOKEN;

//   const fetchTeamData = async () => {
//     try {
//       const response = await axios.get(`${userUrl}/get/team`, {
//         headers: {
//           api_token: apiToken,
//         },
//       });
//       if (response?.data?.succes) {
//         setTeamsMemberData(response.data.Teams);
//       } else {
//         setTeamsMemberData(defaultTeamMembers);
//       }
//     } catch (error) {
//       console.error("Error fetching team data:", error);
//       setTeamsMemberData(defaultTeamMembers);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeamData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Lottie animationData={loaderAnimation} loop />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-6 py-24">
//       <div className="my-4">
//         <div className="max-w-5xl mx-auto text-center">
//           <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
//             <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
//             <span className="text-purple-600 dark:text-white text-sm font-medium">
//               Our Teams
//             </span>
//           </div>
//           <p className="font-light text-[20px] md:text-[26px] leading-[50px] mt-4">
//             Great teams are built on shared goals and a sense of purpose. When
//             everyone is aligned with a clear mission, their combined efforts
//             become more impactful.
//           </p>
//         </div>
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:justify-center my-20 px-4">
//           {teamsMemberData.length > 0 ? (
//             teamsMemberData.map((member, index) => (
//               <div
//                 key={index}
//                 className="p-4 bg-[#FFFFFF] dark:bg-black rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300"
//               >
//                 <img
//                   src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${member.image}`}
//                   alt={`${member.name}'s profile`}
//                   className="w-36 h-36 rounded-full mx-auto"
//                 />
//                 <h4 className="text-gray-800 dark:text-white text-lg font-bold mt-4 text-center">
//                   {member.name}
//                 </h4>
//                 <p className="text-gray-600 text-sm text-center dark:text-white">
//                   {member.role}
//                 </p>
//                 <div className="flex justify-center space-x-4 mt-4">
//                   {member.linkedin && (
//                     <a
//                       href={member.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" />
//                     </a>
//                   )}
//                   {member.github && (
//                     <a
//                       href={member.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaGithub className="w-6 h-6 text-gray-700 dark:text-white hover:text-gray-900" />
//                     </a>
//                   )}
//                   {member.twitter && (
//                     <a
//                       href={member.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaTwitter className="w-6 h-6 text-blue-400 hover:text-blue-600" />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center col-span-full">
//               <p>No team members available to display.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Teams;
import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import axios from "axios";

const Teams = () => {
  const [loading, setLoading] = useState(true);
  const [teamsMemberData, setTeamsMemberData] = useState([]);

  const userUrl = import.meta.env.VITE_USER_URL;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  // Default team members in case API fails
  const defaultTeamMembers = [
    {
      name: "Dr Allaudin Khan",
      role: "Founder",
      image: "/api/placeholder/200/200",
      linkedin: "https://www.linkedin.com/in/allauddin-khan-826aa7289/",
      github: "https://github.com/",
      twitter: "https://twitter.com/",
    },
    {
      name: "Dr Ghanimullah",
      role: "Co-Founder",
      image: "/api/placeholder/200/200",
      linkedin: "https://www.linkedin.com/in/ghanim-ullah-58728530/",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
    {
      name: "Muhammad Asfandyar",
      role: "Director",
      image: "/api/placeholder/200/200",
      linkedin: "https://www.linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  ];

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`${userUrl}/get/team`, {
        headers: {
          api_token: apiToken,
        },
      });
      if (response?.data?.succes) {
        setTeamsMemberData(response.data.Teams);
      } else {
        setTeamsMemberData(defaultTeamMembers);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      setTeamsMemberData(defaultTeamMembers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[95vh]  bg-white dark:bg-black py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
              Meet Our Team
            </span>
          </div>

          {/* <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            The Minds Behind Our Vision
          </h2> */}

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Great teams are built on shared goals and a sense of purpose. When
            everyone is aligned with a clear mission, their combined efforts
            become more impactful.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 px-4">
          {teamsMemberData.map((member, index) => (
            <div key={index} className="group relative">
              <div
                className="relative bg-white dark:bg-black rounded-2xl p-8 transition-all duration-300 
                             hover:-translate-y-2 overflow-hidden
                              border-2  hover:shadow-lg hover:shadow-slate-500  
                            "
              >
                {/* Decorative Background Elements */}
                <div
                  className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-purple-100 to-blue-100 
                              dark:from-purple-900/30 dark:to-blue-900/30 opacity-50"
                ></div>

                {/* Profile Section */}
                <div className="relative">
                  <div className="w-48 h-48 mx-auto mb-8">
                    <div className="w-full h-full rounded-full p-1 bg-gradient-to-r from-purple-500 to-blue-500">
                      <div className="w-full h-full rounded-full p-2 bg-white dark:bg-gray-800">
                        <img
                          src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${member.image}`}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                      {member.name}
                    </h3>
                    <p
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r 
                                from-purple-500 to-blue-500 text-white mb-6"
                    >
                      {member.role}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon-link"
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full 
                                      bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 
                                      dark:group-hover:bg-blue-900/50 transition-colors"
                          >
                            <FaLinkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon-link"
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full 
                                      bg-gray-50 dark:bg-gray-700 group-hover:bg-gray-100 
                                      dark:group-hover:bg-gray-600 transition-colors"
                          >
                            <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                          </div>
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon-link"
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full 
                                      bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 
                                      dark:group-hover:bg-blue-900/50 transition-colors"
                          >
                            <FaTwitter className="w-6 h-6 text-blue-400" />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
