-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('NEW', 'CONFIRMED', 'DONE', 'CANCELED', 'SPAM', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "message" TEXT,
    "serviceType" TEXT,
    "preferredDate" TIMESTAMP(3),
    "status" "BookingStatus" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
