import { ApiError } from "./errors";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return Response.json({ success: { data } }, init);
}

export function jsonError(err: unknown) {
  if (err instanceof ApiError) {
    return Response.json({ error: { code: err.status, message: err.message, details: err.details } }, { status: err.status });
  }
  return Response.json({ error: { code: 500, message: "Internal server error" } }, { status: 500 });
}
