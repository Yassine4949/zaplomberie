import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// الأفضل: حط og.png داخل public/
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "ZA Plomberie — Plombier & Chauffagiste à Thouaré-sur-Loire",
    template: "%s — ZA Plomberie",
  },
  description:
    "Dépannage plomberie & chauffage à Thouaré-sur-Loire et alentours. Intervention rapide, tarif annoncé, travail propre. Urgence 7j/7 selon disponibilité.",

  applicationName: "ZA Plomberie",

  alternates: { canonical: "/" },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ZA Plomberie",
    locale: "fr_FR",
    title: "ZA Plomberie — Plombier & Chauffagiste à Thouaré-sur-Loire",
    description:
      "Dépannage plomberie & chauffage à Thouaré-sur-Loire et alentours. Intervention rapide, tarif annoncé, travail propre.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "ZA Plomberie — Plomberie & Chauffage" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "ZA Plomberie — Plombier & Chauffagiste à Thouaré-sur-Loire",
    description:
      "Dépannage plomberie & chauffage à Thouaré-sur-Loire et alentours. Intervention rapide, tarif annoncé, travail propre.",
    images: [OG_IMAGE],
  },

  keywords: [
    "plombier",
    "chauffagiste",
    "dépannage plomberie",
    "urgence plomberie",
    "Thouaré-sur-Loire",
    "Sainte-Luce-sur-Loire",
    "Carquefou",
    "Nantes",
    "fuite d'eau",
    "débouchage",
    "chaudière",
    "chauffe-eau",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
