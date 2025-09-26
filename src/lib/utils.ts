import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

// src/lib/serializePrisma.ts
export function serializePrisma<T>(data: T): any {
  if (data === null || data === undefined) return data;

  // ✅ Handle Decimal
  if (
    typeof data === "object" &&
    data !== null &&
    "toNumber" in (data as any) &&
    typeof (data as any).toNumber === "function"
  ) {
    return (data as any).toNumber();
  }

  // ✅ Handle Date
  if (data instanceof Date) {
    return data.toISOString();
  }

  if (Array.isArray(data)) {
    return data.map((item) => serializePrisma(item));
  }

  if (typeof data === "object") {
    const obj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      obj[key] = serializePrisma(value);
    }
    return obj;
  }

  return data;
}
