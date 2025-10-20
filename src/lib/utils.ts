import { config } from "@/components/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GroupBy<T, K extends keyof T> = Record<string, T[]>;

export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): GroupBy<T, K> {
  return array.reduce((acc, item) => {
    const keyValue = String(item[key]);
    if (!acc[keyValue]) {
      acc[keyValue] = [];
    }
    acc[keyValue].push(item);
    return acc;
  }, {} as GroupBy<T, K>);
}

export function absoluteUrl(path: string) {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:3000${path}`
    : `https://${config.appUrl}${path}`;
}
