import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Uttamchand Nemichand Jain & Sons | Gold & Silver Ornaments, Antique Articles – Chh. Sambhajinagar",
  description:
    "Explore Uttamchand Nemichand Jain & Sons' fabulous collection of BIS Hallmarked gold, pure silver ornaments, silver chains & antique articles. Rated 4.7★ in Chhatrapati Sambhajinagar. Ahinsa Nagar, Akashwani Chowk.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Uttamchand Nemichand Jain & Sons | Gold, Silver & Antique Jewellery",
    description:
      "One-stop shop for gold ornaments, silver ornaments, silver chains & antique articles. Ahinsa Nagar Akashwani Chowk, Chhatrapati Sambhajinagar.",
    type: "website",
    locale: "en_IN",
  },
};

import AuthProvider from "@/components/providers/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf6ee] text-[#171717] font-sans selection:bg-[#c5a059] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
