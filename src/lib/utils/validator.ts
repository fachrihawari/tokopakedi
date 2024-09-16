import { ZodError } from "zod";

export const formatErrors = (error: ZodError) => {
  return error.issues.map((issue) => issue.message);
};