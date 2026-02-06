import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";
import { jsonOk, jsonError } from "@/lib/api/response";
import { validate, parseJson } from "@/lib/api/validate";
import { rateLimitOrThrow } from "@/lib/api/ratelimit";
import { getAdminFromRequest } from "@/lib/auth/admin";

export const runtime = "nodejs"; // مهم مع pg/prisma adapter

const BookingPostSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
  serviceType: z.string().optional(),
  preferredDate: z.string().datetime().optional(),
});

const pageQuerySchema = z.object({
  page: z.string().regex(/^[0-9]+$/).default("1"),
  limit: z.string().regex(/^[0-9]+$/).default("20"),
});

export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === "production") {
      rateLimitOrThrow(request);
    }

    const body = await parseJson(request);
    const data = validate(BookingPostSchema, body);

    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        message: data.message,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : undefined,
      },
    });

    return jsonOk({ id: booking.id }, { status: 201 });
  } catch (err) {
    return jsonError(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    getAdminFromRequest(request);

    const { searchParams } = new URL(request.url);
    const query = validate(pageQuerySchema, {
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 20, 100));
    const skip = (page - 1) * limit;

    const [total, bookings] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    return new Response(
      JSON.stringify({ success: { data: { total, page, limit, bookings } } }),
      { status: 200, headers: { "Cache-Control": "no-store", "Content-Type": "application/json" } }
    );
  } catch (err) {
    return jsonError(err);
  }
}
