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
  content: Yup.string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters"),
});

export const jobOpeningSchema = Yup.object().shape({
  title: Yup.string()
    .required("Job title is required")
    .min(3, "Job title must be at least 3 characters"),
  department: Yup.string()
    .required("Department is required")
    .min(3, "Department name must be at least 3 characters"),
  location: Yup.string()
    .required("Location is required")
    .oneOf(["Remote", "Onsite"], "Location must be either Remote or Onsite"),
  type: Yup.string()
    .required("Job type is required")
    .oneOf(
      ["Full-time", "Part-time", "Contract"],
      "Job type must be one of: Full-time, Part-time, Contract"
    ),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
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
  githubLink: Yup.string().required("Link is required").url("Invalid URL format"),
  linkedInLink: Yup.string().required("Link is required").url("Invalid URL format"),
  twitterLink: Yup.string().required("Link is required").url("Invalid URL format"),
  
});
