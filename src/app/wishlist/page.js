"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHydrated(true);
      const stored = localStorage.getItem("unj_user");
      if (stored) {
        try { setUser(JSON.parse(stored)); } catch (_) {}
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (!hydrated) return null;

  // Logged-out state
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-[#FAF2EA] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C5A059]/20">
              <svg className="h-9 w-9 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#0C1B33] mb-2">Save Your Favourites</h1>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
              Sign in to save your favourite jewellery pieces and access them anytime, across any device.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-2 bg-[#0C1B33] hover:bg-[#C5A059] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer border-none"
            >
              Sign In to View Wishlist
            </button>
            <p className="text-xs text-gray-400 mt-4 font-light">
              Already browsing?{" "}
              <Link href="/#catalog-section" className="text-[#C5A059] hover:underline font-medium">
                Browse Collections
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Empty wishlist (logged in)
  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-[#FAF2EA] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C5A059]/20">
              <svg className="h-9 w-9 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#0C1B33] mb-2">Your wishlist is empty</h1>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
              Tap the ♡ on any jewellery piece to save it here for later.
            </p>
            <Link
              href="/#catalog-section"
              className="inline-flex items-center gap-2 bg-[#0C1B33] hover:bg-[#C5A059] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
            >
              Discover Jewellery
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Page Title */}
          <div className="mb-8">
            <span className="text-[#C5A059] text-xs font-semibold tracking-[0.3em] uppercase block mb-1">
              {user.name?.split(" ")[0]}&apos;s Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1B33]">
              My Wishlist
            </h1>
            <div className="h-0.5 w-10 bg-[#C5A059] mt-2" />
            <p className="text-sm text-gray-400 mt-2 font-light">{wishlistProducts.length} saved piece{wishlistProducts.length !== 1 ? "s" : ""}</p>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm hover:shadow-lg hover:border-[#C5A059]/30 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <Link href={`/product/${product.id}`} className="relative aspect-square bg-[#FAF2EA] block">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  {/* Remove from wishlist */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full border border-gray-100 shadow-sm text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer border-none"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <span className="absolute bottom-2 left-2 bg-[#0C1B33]/80 text-white text-[8px] font-bold tracking-widest px-1.5 py-0.5 rounded">
                    {product.karat}
                  </span>
                </Link>

                {/* Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-xs font-semibold text-[#0C1B33] group-hover:text-[#C5A059] transition-colors line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-sans text-xs font-bold text-[#0C1B33] mt-1">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full bg-[#0C1B33] hover:bg-[#C5A059] text-white py-2 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer border-none"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
