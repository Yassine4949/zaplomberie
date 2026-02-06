Deployment trigger

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Backend API

Production-ready Bookings backend using Prisma, Zod, and Bearer token admin auth.

## Endpoints

### Public — Create Booking
POST `/api/bookings`

Request body:
```json
{
  "name": "John Doe",
  "phone": "+123456789",
  "email": "john@example.com",
  "address": "123 Main St",
  "message": "I'd like to book a service.",
  "serviceType": "Plumbing",
  "preferredDate": "2025-12-31T09:00:00.000Z"
}
```

Success response (201):
```json
{
  "success": {
    "data": {
      "id": "clsm3xyj30001w7ottl8l7abd",
      "status": "NEW"
    }
  }
}
```

If rate-limited (429):
```json
{
  "error": {
    "code": 429,
    "message": "Rate limit exceeded. Please try again later."
  }
}
```

### Admin — Get All Bookings (paginated)
GET `/api/bookings?page=1&limit=20`  
Header: `Authorization: Bearer <ADMIN_API_KEY>`

Success response (200):
```json
{
  "success": {
    "data": {
      "total": 42,
      "page": 1,
      "limit": 20,
      "bookings": [
        { "id": "...", "name": "...", "status": "...", "createdAt": "..." }
        // ...
      ]
    }
  }
}
```

### Admin — Get One Booking
GET `/api/bookings/{id}`  
Header: `Authorization: Bearer <ADMIN_API_KEY>`

Success response (200):
```json
{
  "success": {
    "data": {
      "id": "...", "name": "...", "status": "..."
      // ...all fields
    }
  }
}
```

Not found (404):
```json
{
  "error": { "code": 404, "message": "Booking not found" }
}
```

### Admin — Update Booking Status
PATCH `/api/bookings/{id}`  
Header: `Authorization: Bearer <ADMIN_API_KEY>`

Request body:
```json
{ "status": "CONFIRMED" }
```

Success response (200):
```json
{
  "success": { "data": { "id": "...", "status": "CONFIRMED" } }
}
```


## Example cURL Requests

### Public booking
```sh
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe", "phone":"+123456789", "email":"john@example.com"
  }'
```

### Admin list bookings
```sh
curl -X GET http://localhost:3000/api/bookings \
  -H "Authorization: Bearer $ADMIN_API_KEY"
```

### Admin get booking by id
```sh
curl -X GET http://localhost:3000/api/bookings/clsm3xyj30001w7ottl8l7abd \
  -H "Authorization: Bearer $ADMIN_API_KEY"
```

### Admin update status
```sh
curl -X PATCH http://localhost:3000/api/bookings/clsm3xyj30001w7ottl8l7abd \
  -H "Authorization: Bearer $ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status":"DONE"}'
```
