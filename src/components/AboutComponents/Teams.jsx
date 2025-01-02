import React, { useEffect, useState } from "react";
import { ImGithub } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json";

const teamMembers = [
  {
    name: "John Doe",
    role: "Software Engineer",
    image: "https://readymadeui.com/team-1.webp",
  },
  {
    name: "Mark Adair",
    role: "Software Engineer",
    image: "https://readymadeui.com/team-2.webp",
  },
  {
    name: "Simon Konecki",
    role: "Web Designer",
    image: "https://readymadeui.com/team-3.webp",
  },
  {
    name: "Sophia",
    role: "Software Developer",
    image: "https://readymadeui.com/team-4.webp",
  },
  {
    name: "Alen",
    role: "Software Engineer",
    image: "https://readymadeui.com/team-5.webp",
  },
  {
    name: "Eleanor",
    role: "Web Designer",
    image: "https://readymadeui.com/team-6.webp",
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
            <h2 className="text-gray-800 dark:text-white text-4xl font-extrabold">
              Meet our team
            </h2>
            <p className="text-gray-600 dark:text-white text-[16px] mt-4 leading-relaxed">
              Veniam proident aute magna anim excepteur et ex consectetur velit
              ullamco veniam minim aute sit. Ullamco nisi enim ipsum irure
              laboris ad ut. Esse cupidatat deserunt magna aute.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:justify-center mt-12">
            {teamMembers?.map((member) => (
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
                  <div className="mt-4">
                    <p className="text-gray-600 dark:text-white text-sm leading-relaxed">
                      Eiusmod commodo aliquip laboris qui anim non voluptate
                      consectetur.
                    </p>
                  </div>
                  <div className="space-x-4 mt-4">
                    <button
                      type="button"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#03a9f4] hover:bg-blue-700 active:bg-blue-600"
                    >
                      <ImGithub />
                    </button>
                    <button
                      type="button"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4] active:bg-[#03a9f4]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        fill="#fff"
                        viewBox="0 0 512 512"
                      >
                        <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5] active:bg-[#0077b5]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        fill="#fff"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" />
                      </svg>
                    </button>
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
