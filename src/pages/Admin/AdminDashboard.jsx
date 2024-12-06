import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "@/globals/CustomButton";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup
    .string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters"),
  category: yup.string().required("Category is required"),
});

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Blog Data:", data);
    alert("Blog submitted successfully!");
  };

  return (
    <div className="p-10">
      <h1 className="text-[30px]">Create a Blog</h1>
      <div className=" bg-gray-100   mt-20">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              {...register("content")}
              rows="5"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              {...register("category")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit */}
         <CustomButton 
          label="Submit"
          type="submit"

          />
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
