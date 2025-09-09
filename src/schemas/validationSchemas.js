import * as Yup from "yup";
// export const blogValidationSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   category: Yup.string().required("Category is required"),
//   tags: Yup.array()
//     .of(Yup.string().required("Tag cannot be empty"))
//     .min(1, "At least one tag is required")
//     .required("Tags are required"), // For multiple tags input
//   image: Yup.mixed()
//     .required("Image is required")
//     .test(
//       "fileSize",
//       "File size is too large",
//       (value) => value && value.size <= 5000000 // 5MB limit
//     )
//     .test(
//       "fileType",
//       "Unsupported file type",
//       (value) => value && ["image/jpeg", "image/png"].includes(value.type)
//     ),
//   description: Yup.string()
//     .required("Description is required")
//     .min(50, "Description must be at least 50 characters"),
// });

export const blogValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  shortDescription: Yup.string()
    .required("Short description is required")
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description must not exceed 200 characters"),

  description: Yup.string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters"),

  images: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileSize",
          "File size is too large",
          (value) => value && value.size <= 10000000 // 5MB limit
        )
        .test(
          "fileType",
          "Unsupported file type",
          (value) => value && ["image/jpeg", "image/png"].includes(value.type)
        )
    )
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed")
    .required("At least one image is required"),
});
export const jobOpeningSchema = Yup.object().shape({
  title: Yup.string()
    .required("Job title is required")
    .min(3, "Job title must be at least 3 characters"),
  job_description: Yup.string()
    .required("Job Description is required")
    .min(10, "Job Description  must be at least 20 characters"),
  location: Yup.string().required("Location is required"),
  short_description: Yup.string().required("short description is required"),
  link: Yup.string().required("link is required").url("Invalid URL format"),
});

export const projectValidationSchema = Yup.object().shape({
  projectName: Yup.string()
    .required("Project name is required")
    .min(3, "Project name must be at least 3 characters"),
  projectDescription: Yup.string()
    .required("Project description is required")
    .min(10, "Description must be at least 10 characters"),
  projectUrl: Yup.string()
    .url("Enter a valid URL")
    .required("Project URL is required"),
  projectImage: Yup.mixed()
    .required("Project image is required")
    .test("fileType", "Only image files are allowed", (value) =>
      value ? ["image/jpeg", "image/png"].includes(value.type) : false
    ),
});

export const teamMemberValidationSchema = Yup.object().shape({
   name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  role: Yup.string()
    .required("Role is required")
    .min(3, "Role must be at least 3 characters"),
  image: Yup.mixed().test(
    "fileType",
    "Only image files are allowed (jpg, png)",
    (value) => {
      if (!value) return true; // ✅ allow empty (optional)
      return ["image/jpeg", "image/png"].includes(value.type);
    }
  ),
  githubLink: Yup.string()
    .url("Invalid URL format")
    .nullable(), // ✅ optional
  linkedInLink: Yup.string()
    .url("Invalid URL format")
    .nullable(), // ✅ optional
  twitterLink: Yup.string()
    .url("Invalid URL format")
    .nullable(), // ✅ optional
});

//testemonial schemea

export const testimonialSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  image: Yup.mixed().required("Image is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  designation: Yup.string().required("Designation is required"),
});

export const faqSchema = Yup.object().shape({
  question: Yup.string()
    .required("Question is required")
    .min(5, "Question must be at least 5 characters"),
  answer: Yup.string()
    .required("Answer is required")
    .min(10, "Answer must be at least 10 characters"),
});

export const servicesValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  // category: Yup.string().required("Category is required"),
  keypoints: Yup.array()
    .of(Yup.string().required("Keypoint cannot be empty"))
    .min(1, "At least one tag is required")
    .required("Tags are required"), // For multiple tags input
  // image: Yup.mixed()
  //   .required("Image is required")
  //   .test(
  //     "fileSize",
  //     "File size is too large",
  //     (value) => value && value.size <= 5000000 // 5MB limit
  //   )
  //   .test(
  //     "fileType",
  //     "Unsupported file type",
  //     (value) => value && ["image/jpeg", "image/png"].includes(value.type)
  //   ),
  description: Yup.string()
    .required("description is required")
    .min(30, "Content must be at least 30 characters"),
});

export const contactValidationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  subject: Yup.string().required("Subject is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string()
    .required("message is required")
    .min(30, "Message must be at least 30 characters"),
});

export const EasyApplyValidationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be a 10-digit number")
    .required("Phone is required"),
  resume: Yup.mixed().required("Resume is required"),
  experience: Yup.string().required("Experience Level is required"),
  message: Yup.string().required("Message is required"),
  portfolioType: Yup.string().required("Please select portfolio type"),
  portfolioUrl: Yup.string().when("portfolioType", {
    is: "url",
    then: () =>
      Yup.string()
        .url("Please enter a valid URL")
        .required("Portfolio URL is required"),
    otherwise: () => Yup.string().notRequired(),
  }),
  portfolioFile: Yup.mixed().when("portfolioType", {
    is: "file",
    then: () => Yup.mixed().required("Portfolio file is required"),
    otherwise: () => Yup.mixed().notRequired(),
  }),
});
export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  name: Yup.string()
    .required("Company Name is required")
    .min(2, "Company Name must be at least 2 characters")
    .max(50, "Company Name must not exceed 50 characters"),
});

export const editBlogValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  shortDescription: Yup.string()
    .required("Short description is required")
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description must not exceed 200 characters"),
  description: Yup.string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters"),
  images: Yup.array(),
});
