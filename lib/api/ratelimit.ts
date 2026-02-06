import { RateLimitError } from "./errors";

const windowMs = 10 * 60 * 1000; // 10 minutes
const maxRequests = 5;
const memoryStore: Record<string, { count: number; expires: number }> = {};

function getKey(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return xff || "unknown";
}

export function rateLimitOrThrow(req: Request) {
  const key = getKey(req);
  const now = Date.now();
  let entry = memoryStore[key];
  if (!entry || entry.expires < now) {
    entry = { count: 1, expires: now + windowMs };
  } else {
    entry.count += 1;
    if (entry.count > maxRequests) {
      throw new RateLimitError("Rate limit exceeded. Please try again later.");
    }
  }
  memoryStore[key] = entry;
}
