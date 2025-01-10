import React, { useEffect, useState } from "react";
import { ImGithub } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json";
import hilalpic from "../../assets/teamsImages/hilal.jpg";
import kaleempic from "../../assets/teamsImages/kaleem.jpg";
import asadpic from "../../assets/teamsImages/asadullah.jpg";
import adnanPic from "../../assets/teamsImages/adnan.jpeg";
import junaidPic from "../../assets/teamsImages/junaid.jpeg";

import { FaLinkedin, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Lorem",
    role: "Founder",
    image: "https://placehold.co/600",
    linkedin: "https://www.linkedin.com/in/hilal-ahmad-13a06b246/",
    github: "https://github.com/hilalahmad",
    twitter: "https://twitter.com/hilalahmad",
  },
  {
    name: "Lorem",
    role: "Co-Founder",
    image: "https://placehold.co/600",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Lorem",
    role: "Archiwiz Stakeholder",
    image: "https://placehold.co/600",

    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
];

const Teams = () => {
  const [loading, setLoading] = useState(true);
  const [teamsMemberData, setTeamsMemberData] = useState([]);

  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;

  const fetchCareers = async () => {
    try {
      const response = await axios.get(`${userUrl}/get/team`, {
        headers: {
          api_token: api_token,
        },
      });
      console.log(response, "Teams Member Data response");

      if (response?.data?.succes) {
        setTeamsMemberData(response?.data?.Teams, "teams member data");
      } else {
        setCareersData(teamMembers); // Fallback to a default set of job openings
      }
    } catch (error) {
      setTeamsMemberData(teamMembers); // Fallback if API call fails
    } finally {
      setLoading(false); // Stop the loader once the data is fetched (or fallback is used)
    }
  };
  console.log(teamsMemberData);

  // Fetch careers when the component mounts
  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <div>
      <div className="my-4 mt-28">
        <div className="max-w-5xl max-lg:max-w-2xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                Our Team
              </span>
            </div>
            <p className="text-gray-600 dark:text-white text-[16px] mt-4 leading-relaxed">
              Great teams are built on shared goals and a sense of purpose. When
              everyone is aligned with a clear mission, their combined efforts
              become more impactful
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:justify-center mt-12">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="border rounded-md overflow-hidden max-md:max-w-[300px]"
              >
                <img
                  src={member.image}
                  className="w-full h-60 object-contain object-top bg-gray-200"
                  alt={member.name}
                />
                <div className="p-4">
                  <h4 className="text-gray-800 dark:text-white text-base font-bold">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 dark:text-white text-xs mt-1">
                    {member.role}
                  </p>
                  <div className="space-x-4 mt-4">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#333] hover:bg-gray-700"
                      >
                        <ImGithub color="#fff" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#1DA1F2] hover:bg-blue-600"
                      >
                        <FaTwitter color="#fff" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#0055b5]"
                      >
                        <FaLinkedin color="#fff" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
