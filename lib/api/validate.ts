import { BadRequestError } from "./errors";
import { ZodSchema } from "zod";

export async function parseJson<T>(request: Request): Promise<T> {
  try {
    return await request.json();
  } catch {
    throw new BadRequestError("Invalid JSON body");
  }
}

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new BadRequestError("Validation error", result.error.issues);
  }
  return result.data;
}
