import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert to Base 64
export async function convertToBase64(file: File) {
  if (file) {
    const base64File = Buffer.from(await file.arrayBuffer()).toString("base64");
    const fileUri = "data:" + file.type + ";" + "base64" + "," + base64File;
    return fileUri;
  }
}

export function shortText(text: string, limit: number) {
  if (text.length > 0) {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }
}
