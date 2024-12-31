import * as Yup from "yup";
export const blogValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.array()
    .of(Yup.string().required("Tag cannot be empty"))
    .min(1, "At least one tag is required")
    .required("Tags are required"), // For multiple tags input
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => value && value.size <= 5000000 // 5MB limit
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
  description: Yup.string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters"),
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
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Only image files are allowed (jpg, png)",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
  githubLink: Yup.string()
    .required("Link is required")
    .url("Invalid URL format"),
  linkedInLink: Yup.string()
    .required("Link is required")
    .url("Invalid URL format"),
  twitterLink: Yup.string()
    .required("Link is required")
    .url("Invalid URL format"),
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
  fullName: Yup.string().required("Full Name is required"),
  subject: Yup.string().required("Subject is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string()
    .required("message is required")
    .min(30, "Message must be at least 30 characters"),
});
