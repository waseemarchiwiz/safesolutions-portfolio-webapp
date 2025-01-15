import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import founder from "../../assets/teamsImages/founder.jpg";
import cofounder from "../../assets/teamsImages/cofounder.jpg";
import projmanage from "../../assets/teamsImages/projmanage.png";

const defaultTeamMembers = [
  {
    name: "Dr Allaudin Khan",
    role: "Founder",
    image: founder,
    linkedin: "https://www.linkedin.com/in/allauddin-khan-826aa7289/",
    github: "https://github.com/",
    twitter: "https://twitter.com/",
  },
  {
    name: "Dr Ghanimullah",
    role: "Co-Founder",
    image: cofounder,
    linkedin: "https://www.linkedin.com/in/ghanim-ullah-58728530/",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Hassan Mustafa",
    role: "Technical Lead/Project Management Archiwiz",
    image: projmanage,
    linkedin: "https://www.linkedin.com/in/hassan-mustafa-04b1b31b/",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
];

const Teams = () => {
  const [loading, setLoading] = useState(true);
  const [teamsMemberData, setTeamsMemberData] = useState([]);

  const userUrl = import.meta.env.VITE_USER_URL;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`${userUrl}/get/team`, {
        headers: {
          api_token: apiToken,
        },
      });
      if (response?.data?.success) {
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
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="my-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-600 dark:text-white text-sm font-medium">
              Our Teams
            </span>
          </div>
          <p className="font-light text-[20px] md:text-[26px] leading-[50px] mt-4">
            Great teams are built on shared goals and a sense of purpose. When
            everyone is aligned with a clear mission, their combined efforts
            become more impactful.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:justify-center my-20 px-4 ">
          {teamsMemberData.map((member, index) => (
            <div
              key={index}
              // className="  bg-gray-50 p-4 shadow-md rounded-lg hover:scale-105 transition-transform duration-300"
              className=" p-4 bg-[#FFFFFF] dark:bg-black rounded-lg hover:scale-105     hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300"
            >
              <img
                src={member.image || projmanage} // Fallback to a default image
                alt={`${member.name}'s profile`}
                className="w-36 h-36 rounded-full mx-auto"
              />
              <h4 className="text-gray-800 dark:text-white text-lg font-bold mt-4 text-center">
                {member.name}
              </h4>
              <p className="text-gray-600 text-sm text-center dark:text-white">
                {member.role}
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="w-6 h-6 text-gray-700 dark:text-white hover:text-gray-900" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
