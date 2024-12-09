import * as Yup from "yup";
export const blogValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    name: Yup.string().required("Name is required"),
    date: Yup.date()
      .required("Date is required")
      .typeError("Invalid date format"),
    technology: Yup.string().required("Technology is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "File size is too large",
        (value) => value && value[0]?.size <= 5000000 // 5MB limit
      )
      .test(
        "fileType",
        "Unsupported file type",
        (value) => value && ["image/jpeg", "image/png"].includes(value[0]?.type)
      ),
    content: Yup.string()
      .required("Content is required")
      .min(50, "Content must be at least 50 characters"),
  });