"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import fs from "fs";

// Server-side validation for FormData
// export async function UpdateCategoryAction(
//   formData: Category
// ): Promise<PayloadReturn> {
//   try {
//     const data = {
//       id: formData.id,
//       title: formData.title,
//       description: formData.desc,
//       slug: formData.slug,
//       image: formData.img,
//     };

//     // Validate FormData
//     const validation = categoryEditSchema.safeParse(data);
//     // if false
//     if (!validation.success) {
//       return { success: false, message: validation.error.message };
//     }

//     // Check for category existence
//     const existingCategory = await prisma.category.findUnique({
//       where: { id: data.id as string },
//     });

//     if (!existingCategory) {
//       return { success: false, message: "Category doesn't exists" };
//     }

//     const imageUrl = {
//       img: "",
//       imgPublicId: "",
//     };

//     // image assets exists
//     const isImageAssetExists = await imageAssetExists(
//       existingCategory.imgPublicId
//     );

//     if (isImageAssetExists) {
//       // if image exists do not upload
//       imageUrl.img = existingCategory.img;
//       imageUrl.imgPublicId = existingCategory.imgPublicId;
//     }
//     // check if it is
//     if (data.image instanceof File) {
//       // if not exists convert to base 64 and call upload action
//       const base64ImageUri = await convertToBase64(data.image as File);
//       // upload file
//       const imageUpload = await uploadFile(base64ImageUri as string);

//       if (!imageUpload) {
//         return { success: false, message: "failed to update image" };
//       }
//       // update the image obj
//       imageUrl.img = imageUpload.data?.secure_url as string;
//       imageUrl.imgPublicId = imageUpload.data?.public_id as string;
//     }

//     // update category in the database
//     const updateCategory = await prisma.category.update({
//       where: { id: existingCategory.id },
//       data: {
//         title: data.title as string,
//         desc: data.description as string,
//         slug: data.slug as string,
//         img: imageUrl.img,
//         imgPublicId: imageUrl.imgPublicId,
//       },
//     });

//     if (!updateCategory) {
//       // delete the uploaded file from the cloudinary
//       const response = await deleteFile(existingCategory.imgPublicId);
//       if (!response.success) {
//         return { success: false, message: "Failed to delete image" };
//       }
//       return { success: false, message: "Failed to update record" };
//     }

//     revalidatePath("/dashboard/categories");

//     return {
//       success: true,
//       message: "Category updated successfully",
//       data: updateCategory,
//     };
//   } catch (error) {
//     console.error("update category error:", error);
//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Failed to update category",
//     };
//   }
// }

// Server-side validation for FormData
export async function DeleteBlogAction(id: number): Promise<ReturnPayload> {
  try {
    // Validate FormData
    if (!id) {
      return {
        success: false,
        message: "please provide id",
      };
    }

    // delete blog in the database
    const blog = await prisma.blog.findMany({ where: { id } });

    if (!blog) {
      return { success: false, message: "Blog record not found" };
    }

    let image = await prisma.blogImage.findMany({
      where: { blogId: id },
    });

    if (image) {
      image.forEach(async (img) => {
        fs.unlink(img.image, (err) => {
          if (err) {
            console.log(`Field to delete image : ${err.message}`);
          }
        });
        await prisma.blogImage.delete({ where: { id: img.id } });
      });
    }

    // Delete
    await prisma.blog.delete({ where: { id } });

    revalidatePath("/dashboard/blogs");

    return {
      success: true,
      message: `Blog record deleted successfully`,
    };
  } catch (error) {
    console.error("Add category error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
