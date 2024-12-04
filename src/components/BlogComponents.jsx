import React from "react";
import { Link } from "react-router-dom";

const BlogComponents = () => {
  const blogData = [
    {
      id: 1,
      date: "10 FEB 2023",
      author: "JOHN DOE",
      title: "Igniting Your Imaginations",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kkcAq-0sL1bC7JDz0tHeW1YF8nHOrFvE6xJ4xwqz8uJPxHGu6-ZTvLzg-N1iPQwXuec&usqp=CAU",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
    },
    {
      id: 2,
      date: "7 JUN 2023",
      author: "MARK ADAIR",
      title: "Hacks to Supercharge Your Day",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kkcAq-0sL1bC7JDz0tHeW1YF8nHOrFvE6xJ4xwqz8uJPxHGu6-ZTvLzg-N1iPQwXuec&usqp=CAU",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
    },
    {
      id: 3,
      date: "5 OCT 2023",
      author: "SIMON KONECKI",
      title: "Trends and Predictions",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfy716tBTYbT7Bv5_shAB8W6Qu7m6FpJMCrLtB3cJnhNhnt6yqShdri1tXfV5rUcVODNE&usqp=CAU",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
    },
    {
      id: 4,
      date: "5 OCT 2023",
      author: "SIMON KONECKI",
      title: "Trends and Predictions",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKimrjFWdSL-1d7EGY0excHnxtFU0AN29WNw&s",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
    },
    {
      id: 5,
      date: "5 OCT 2023",
      author: "SIMON KONECKI",
      title: "Trends and Predictions",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKimrjFWdSL-1d7EGY0excHnxtFU0AN29WNw&s",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
    },
    {
      id: 6,
      date: "5 OCT 2023",
      author: "SIMON KONECKI",
      title: "Trends and Predictions",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKimrjFWdSL-1d7EGY0excHnxtFU0AN29WNw&s",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
    },
  ];

  return (
    <div>
      <div className="bg-white dark:bg-[#18181B] ">
        <div className="max-w-6xl mt-10   mx-auto p-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto  after:rounded-lg-full">
              LATEST BLOGS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
            {blogData.map((post) => (
              <div
                key={post.id}
                className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 absolute bottom-0 left-0 right-0 bg-black opacity-90">
                  <span className="text-sm block text-white mb-2">
                    {post.date} | BY {post.author}
                  </span>
                  <h3 className="text-xl font-bold text-white">{post.title}</h3>
                  <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                    <p className="text-white text-sm">
                      {post.content}
                      <Link to={`/blog/${post.id}`} className="text-blue-400">
                        {" "}
                        Read More
                      </Link>
                    </p>
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

export default BlogComponents;
