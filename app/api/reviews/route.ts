import { z } from "zod";
import { jsonOk, jsonError } from "@/lib/api/response";
import { validate, parseJson } from "@/lib/api/validate";
import { rateLimitOrThrow } from "@/lib/api/ratelimit";
import { ApiError } from "@/lib/api/errors";

const ReviewPostSchema = z.object({
  name: z.string().min(2),
  city: z.string().min(2).optional(),
  rating: z.number().int().min(1).max(5),
  message: z.string().min(10),
});

type StrapiReview = {
  id: number;
  attributes: {
    name: string;
    city: string | null;
    rating: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  };
};

function getStrapiBaseUrl() {
  return process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
}

function mapReview(item: StrapiReview) {
  return {
    id: String(item.id),
    name: item.attributes.name,
    city: item.attributes.city || undefined,
    rating: item.attributes.rating,
    message: item.attributes.message,
    createdAt: item.attributes.createdAt,
  };
}

export async function GET() {
  try {
    const baseUrl = getStrapiBaseUrl();
    if (!baseUrl) {
      throw new ApiError(500, "STRAPI_URL is missing");
    }

    const res = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/reviews?sort=createdAt:desc`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      throw new ApiError(500, "Failed to fetch reviews from Strapi");
    }

    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    const reviews = data.map(mapReview);

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

    const baseUrl = getStrapiBaseUrl();
    const token = process.env.STRAPI_TOKEN;

    if (!baseUrl) {
      throw new ApiError(500, "STRAPI_URL is missing");
    }
    if (!token) {
      throw new ApiError(500, "STRAPI_TOKEN is missing");
    }

    const body = await parseJson(request);
    const data = validate(ReviewPostSchema, body);

    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          name: data.name,
          city: data.city,
          rating: data.rating,
          message: data.message,
        },
      }),
    });

    if (!res.ok) {
      throw new ApiError(500, "Failed to create review in Strapi");
    }

    const json = await res.json();
    const created = json?.data ? mapReview(json.data) : null;

    if (!created) {
      throw new ApiError(500, "Invalid Strapi response");
    }

    return jsonOk({ review: created }, { status: 201 });
  } catch (err) {
    return jsonError(err);
  }
}
