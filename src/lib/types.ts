// lib/types.ts
export interface ReturnPayload<T = any> {
  success: boolean;
  message: string;
  data?: T;
  total?: number;
}
