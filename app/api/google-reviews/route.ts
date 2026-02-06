import { NextResponse } from "next/server";

export const revalidate = 3600; // cache 1 hour

type GoogleTextSearchResponse = {
  results?: Array<{ place_id: string }>;
  status: string;
  error_message?: string;
};

type GooglePlaceDetailsResponse = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: Array<{
      author_name: string;
      rating: number;
      relative_time_description?: string;
      text?: string;
      profile_photo_url?: string;
    }>;
  };
  status: string;
  error_message?: string;
};

export async function GET() {
  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  // 1) Find place_id
  const query = encodeURIComponent("ZA Plomberie Thouaré-sur-Loire");
  const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&language=fr&key=${key}`;

  const textRes = await fetch(textSearchUrl, { next: { revalidate } });
  const textData = (await textRes.json()) as GoogleTextSearchResponse;

  if (textData.status !== "OK" || !textData.results?.length) {
    return NextResponse.json(
      { error: "Text search failed", status: textData.status, message: textData.error_message },
      { status: 500 }
    );
  }

  const placeId = textData.results[0].place_id;

  // 2) Get place details + reviews
  const detailsUrl =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}` +
    `&fields=name,rating,user_ratings_total,url,reviews` +
    `&language=fr&reviews_sort=most_relevant` +
    `&key=${key}`;

  const detRes = await fetch(detailsUrl, { next: { revalidate } });
  const detData = (await detRes.json()) as GooglePlaceDetailsResponse;

  if (detData.status !== "OK" || !detData.result) {
    return NextResponse.json(
      { error: "Place details failed", status: detData.status, message: detData.error_message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    place: {
      name: detData.result.name ?? "ZA Plomberie",
      rating: detData.result.rating ?? null,
      total: detData.result.user_ratings_total ?? null,
      url: detData.result.url ?? null,
    },
    reviews: detData.result.reviews ?? [],
  });
}
