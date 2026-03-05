// 5. Create API route handler at /app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
// export the get and post handlers
export const { POST, GET } = toNextJsHandler(auth);
