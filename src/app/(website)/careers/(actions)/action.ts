import { apiClient } from "@/lib/api-config/client";
import { applicationSchema } from "../(validation)/schema";

export const SubmitApplyAction = async (
  formData: FormData
): Promise<{ success: boolean; data?: unknown; message: string }> => {
  try {
    // Convert FormData to plain object for validation
    // const plainObject: Record<string, any> = {};
    // formData.forEach((value, key) => {
    //   plainObject[key] = value;
    // });

    // Validate
    // const validation = applicationSchema.safeParse(plainObject);
    // if (!validation.success) {
    //   return {
    //     success: false,
    //     message: validation.error?.errors?.[0]?.message,
    //   };
    // }

    // Submit original FormData (not plain object)
    const response = await apiClient.post(`/user/easy/apply`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      success: Boolean(response?.data?.success) || true,
      data: response?.data?.data ?? [],
      message: response?.data?.message ?? "Application submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to submit application",
    };
  }
};
