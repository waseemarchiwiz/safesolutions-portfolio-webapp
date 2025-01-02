export const blogPosts = [
  {
    id: 1,
    title: "Best Treehouse Plans",
    date: "2024-12-01",
    category: "Architecture",
    description:
      "Integrate and build sustainable homes with our new plans. Explore modern techniques for eco-friendly and innovative structures, Integrate and build sustainable homes with our new plans. Explore modern techniques for eco-friendly and innovative structures.",
    image:
      "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg",
  },
  {
    id: 2,
    title: "The Future of Buildings",
    date: "2024-12-05",
    category: "Construction",
    description:
      "A look into the innovations shaping the future of construction and sustainable development for buildings.",
    image:
      "https://cdn.pixabay.com/photo/2014/12/15/14/05/home-office-569153_640.jpg",
  },
  {
    id: 3,
    title: "Construction Safety Tips",
    date: "2024-12-03",
    category: "Safety",
    description:
      "Learn essential safety tips to ensure a secure working environment for construction projects.",
    image:
      "https://cdn.pixabay.com/photo/2016/11/23/14/49/controls-1853330_640.jpg",
  },
  {
    id: 4,
    title: "Modern Office Designs",
    date: "2024-12-02",
    category: "Architecture",
    description:
      "Explore modern office designs that boost productivity and promote sustainability in the workplace.",
    image: "https://via.placeholder.com/600x400",
  },
  {
    id: 5,
    title: "The Future of Software Development",
    date: "2024-12-10",
    category: "Technology",
    description:
      "Dive into the evolving world of software development. Discover trends such as AI integration, microservices architecture, and the growing importance of DevOps in building scalable, efficient applications.",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/06/17/code-1869236_640.jpg",
  },
];

export const getProjectByBlog = (id) => {
  return blogPosts.find((blog) => blog.id === id);
};

// export const getDetailedProjects = () => {
//   return blogPosts.filter((project) => project.type === "detailed");
// };

// export const getExternalProjects = () => {
//   return blogPosts.filter((project) => project.type === "external");
// };
