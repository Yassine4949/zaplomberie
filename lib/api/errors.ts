export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request", details?: unknown) {
    super(400, message, details);
  }
}
export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(401, message, details);
  }
}
export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", details?: unknown) {
    super(403, message, details);
  }
}
export class NotFoundError extends ApiError {
  constructor(message = "Not found", details?: unknown) {
    super(404, message, details);
  }
}
export class RateLimitError extends ApiError {
  constructor(message = "Rate limit exceeded", details?: unknown) {
    super(429, message, details);
  }
}
