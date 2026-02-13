import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { jsonOk, jsonError } from "@/lib/api/response";
import { validate, parseJson } from "@/lib/api/validate";
import { rateLimitOrThrow } from "@/lib/api/ratelimit";

const ReviewPostSchema = z.object({
  name: z.string().min(2),
  city: z.string().min(2).optional(),
  rating: z.number().int().min(1).max(5),
  message: z.string().min(10),
});

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 24,
    });

    return jsonOk({ reviews });
  } catch (err) {
    return jsonError(err);
  }
}

export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV === "production") {
      rateLimitOrThrow(request);
    }

    const body = await parseJson(request);
    const data = validate(ReviewPostSchema, body);

    const review = await prisma.review.create({
      data: {
        name: data.name,
        city: data.city,
        rating: data.rating,
        message: data.message,
      },
    });

    return jsonOk({ review }, { status: 201 });
  } catch (err) {
    return jsonError(err);
  }
}
