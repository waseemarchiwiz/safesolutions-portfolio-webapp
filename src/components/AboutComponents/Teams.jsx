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
    name: "Hilal Ahmad",
    role: "Full Stack Developer",
    image: hilalpic,
    linkedin: "https://www.linkedin.com/in/hilal-ahmad-13a06b246/",
    github: "https://github.com/hilalahmad",
    twitter: "https://twitter.com/hilalahmad",
  },
  {
    name: "Kaleem ullah Khan",
    role: "MERN Stack Developer",
    image: kaleempic,
    linkedin: "https://www.linkedin.com/in/kaleemullahkhanreactjs/",
    github: "https://github.com/kaleemullahkhan",
    twitter: "https://twitter.com/kaleemullahkhan",
  },
  {
    name: "Adnan Khan",
    role: "Junior Full Stack Developer",
    image: adnanPic,
    linkedin: "https://linkedin.com/in/adnankhan",
    github: "https://github.com/adnankhan",
    twitter: "https://twitter.com/adnankhan",
  },

  {
    name: "Asad ullah",
    role: "Junior Full Stack Developer",
    image: asadpic,
    linkedin: "https://www.linkedin.com/in/asad-ullah-97521b260/",
    github: "https://github.com/AsadUllah077",
    twitter: "https://twitter.com/asadullah",
  },
  {
    name: "Muhammad Junaid",
    role: "Junior Python  Developer",
    image: junaidPic, // Updated for image consistency
    linkedin: "https://linkedin.com/in/waseemkhan-backend",
    github: "https://github.com/waseemkhan-backend",
    twitter: "https://twitter.com/waseemkhan-backend",
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
              Veniam proident aute magna anim excepteur et ex consectetur velit
              ullamco veniam minim aute sit. Ullamco nisi enim ipsum irure
              laboris ad ut. Esse cupidatat deserunt magna aute.
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
