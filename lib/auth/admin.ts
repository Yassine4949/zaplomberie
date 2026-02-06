import { UnauthorizedError, ForbiddenError } from "@/lib/api/errors";

export function getAdminFromRequest(request: Request): boolean {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("bearer ")) {
    throw new UnauthorizedError("Missing or invalid authorization token");
  }
  const token = header.slice(7).trim();
  if (!process.env.ADMIN_API_KEY) throw new ForbiddenError("Admin API key not configured");
  if (token !== process.env.ADMIN_API_KEY) throw new ForbiddenError("Invalid admin token");
  return true;
}
