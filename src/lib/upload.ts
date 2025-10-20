import { BlobServiceClient } from "@azure/storage-blob";
import { ReturnPayload } from "./types";

// Initialize Azure Blob Storage client
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!connectionString) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined");
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(
  containerName as string
);

// Ensure container exists
async function ensureContainerExists(): Promise<void> {
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create({ access: "blob" });
  }
}

export interface AzureBlobUploadResult {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format: string;
  resource_type: string;
  etag: string;
  size: number;
}

interface UploadFileTypes extends ReturnPayload {
  data?: AzureBlobUploadResult;
}

// Upload file
export async function uploadFile(
  file: string | Buffer,
  folder: string = "blogs"
): Promise<UploadFileTypes> {
  try {
    await ensureContainerExists();

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension =
      typeof file === "string" && file.startsWith("data:")
        ? file.split(";")[0].split("/")[1]
        : "bin";
    const fileName = `${folder}/${timestamp}-${randomString}.${extension}`;

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Convert base64 to buffer if needed
    let fileBuffer: Buffer;
    let contentType = "application/octet-stream";

    if (typeof file === "string") {
      if (file.startsWith("data:")) {
        // Handle base64 data URL
        const matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          contentType = matches[1];
          fileBuffer = Buffer.from(matches[2], "base64");
        } else {
          throw new Error("Invalid base64 data URL");
        }
      } else if (file.startsWith("http://") || file.startsWith("https://")) {
        // Handle URL - fetch the file
        const response = await fetch(file);
        fileBuffer = Buffer.from(await response.arrayBuffer());
        contentType = response.headers.get("content-type") || contentType;
      } else {
        // Assume it's a base64 string without the data URL prefix
        fileBuffer = Buffer.from(file, "base64");
      }
    } else {
      fileBuffer = file;
    }

    // Upload to Azure Blob Storage
    const uploadResponse = await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    });

    if (!uploadResponse) {
      return { success: false, message: "Failed to upload file" };
    }

    // Get blob properties
    const properties = await blockBlobClient.getProperties();
    const blobUrl = blockBlobClient.url;

    const result: AzureBlobUploadResult = {
      public_id: fileName,
      secure_url: blobUrl,
      format: extension,
      resource_type: contentType.startsWith("image/")
        ? "image"
        : contentType.startsWith("video/")
        ? "video"
        : "raw",
      etag: uploadResponse.etag || "",
      size: properties.contentLength || 0,
    };

    return { success: true, message: "File uploaded", data: result };
  } catch (error) {
    console.error("Azure Blob Storage upload error: ", error);
    throw new Error("Failed to upload file to Azure Blob Storage.");
  }
}

// Check if asset exists
export async function imageAssetExists(publicId: string): Promise<boolean> {
  try {
    await ensureContainerExists();
    const blockBlobClient = containerClient.getBlockBlobClient(publicId);
    return await blockBlobClient.exists();
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
}

// Delete file
export async function deleteFile(public_id: string): Promise<ReturnPayload> {
  try {
    await ensureContainerExists();
    const blockBlobClient = containerClient.getBlockBlobClient(public_id);

    const deleteResponse = await blockBlobClient.deleteIfExists();

    if (!deleteResponse.succeeded) {
      return {
        success: false,
        message: "Failed to delete file or file does not exist",
      };
    }

    return { success: true, message: "File deleted", data: { deleted: true } };
  } catch (error) {
    console.error("Azure Blob Storage delete error: ", error);
    throw new Error("Failed to delete file from Azure Blob Storage.");
  }
}

// Optional: Get signed URL with SAS token for temporary access
export async function getSignedUrl(
  publicId: string,
  expiryMinutes: number = 60
): Promise<string> {
  const {
    BlobSASPermissions,
    generateBlobSASQueryParameters,
    StorageSharedKeyCredential,
  } = await import("@azure/storage-blob");

  const blockBlobClient = containerClient.getBlockBlobClient(publicId);

  // Extract account name and key from connection string
  const accountName = connectionString?.match(/AccountName=([^;]+)/)?.[1];
  const accountKey = connectionString?.match(/AccountKey=([^;]+)/)?.[1];

  if (!accountName || !accountKey) {
    throw new Error("Could not extract account credentials");
  }

  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );

  const sasOptions = {
    containerName,
    blobName: publicId,
    permissions: BlobSASPermissions.parse("r"), // Read permission
    startsOn: new Date(),
    expiresOn: new Date(Date.now() + expiryMinutes * 60 * 1000),
  };

  const sasToken = generateBlobSASQueryParameters(
    sasOptions as any,
    sharedKeyCredential
  ).toString();

  return `${blockBlobClient.url}?${sasToken}`;
}
