import { ReturnPayload } from "@/lib/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.Cloudinary_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

interface UploadFileTypes extends ReturnPayload {
  data?: CloudinaryUploadResult;
}

// Upload file
export async function uploadFile(
  file: string,
  folder: string = "categories"
): Promise<UploadFileTypes> {
  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      invalidate: true,
      resource_type: "auto",
      folder,
    });

    if (!uploadResult) {
      return { success: false, message: "Failed to upload image" };
    }

    return { success: true, message: "Image uploaded", data: uploadResult };
  } catch (error) {
    console.error("Cloudinary upload error: ", error);
    throw new Error("Failed to upload image to Cloudinary.");
  }
}

// isAsset exists
export async function imageAssetExists(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.api.resource(publicId);
    return !!result;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
}

// Delete file
export async function deleteFile(
  public_id: string,
  folder: string = "categories"
): Promise<PayloadReturn> {
  try {
    const uploadResult = await cloudinary.uploader.destroy(public_id);

    if (!uploadResult) {
      return { success: false, message: "Failed to delete image" };
    }

    return { success: true, message: "Image deleted", data: uploadResult };
  } catch (error) {
    console.error("Cloudinary delete error: ", error);
    throw new Error("Failed to delete image to Cloudinary.");
  }
}
