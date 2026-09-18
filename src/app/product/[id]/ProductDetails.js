"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductDetails({ product, related = [] }) {
  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [addedToCart, setAddedToCart] = useState(false);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">✦</div>
            <h1 className="font-serif text-2xl font-bold text-[#0C1B33] mb-2">Product Not Found</h1>
            <p className="text-sm text-gray-500 mb-6">This piece may have been moved or is no longer available.</p>
            <Link
              href="/#catalog-section"
              className="inline-flex items-center gap-2 bg-[#0C1B33] text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#C5A059] transition-colors"
            >
              Browse All Collections
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart");
  };

  // Related products (same category, excluding current) passed as prop

  const waMessage = `Hi Uttamchand Nemichand Jain & Sons, I'm interested in the *${product.name}* (${product.karat}, ₹${product.price.toLocaleString("en-IN")}). Could you share more details and availability?`;
  const waUrl = `https://wa.me/918275080681?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-[11px] text-gray-400 font-medium tracking-wide">
            <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/#catalog-section" className="hover:text-[#C5A059] transition-colors">Collections</Link>
            <span>›</span>
            <Link href={`/#catalog-section`} className="hover:text-[#C5A059] transition-colors capitalize">{product.category}</Link>
            <span>›</span>
            <span className="text-[#0C1B33] font-semibold truncate max-w-[140px]">{product.name}</span>
          </nav>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT — Image */}
            <div className="sticky top-24">
              <div className="relative aspect-square w-full bg-[#FAF2EA] rounded-2xl overflow-hidden border border-[#C5A059]/10 shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-[#0C1B33] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                      New Arrival
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-[#C5A059] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                {/* Wishlist on image */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${wishlisted
                      ? "bg-white border-rose-200 text-rose-500 shadow-md"
                      : "bg-white/80 border-white/50 text-gray-400 hover:text-rose-500 hover:border-rose-200"
                    }`}
                  aria-label="Add to wishlist"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={wishlisted ? 0 : 1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Certification Bar below image */}
              <div className="flex items-center justify-center gap-4 mt-4 py-3 bg-white rounded-xl border border-[#C5A059]/15 shadow-sm">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#C5A059] uppercase tracking-wide">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  BIS Hallmarked
                </span>
                <span className="h-4 w-px bg-[#C5A059]/20" />
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#C5A059] uppercase tracking-wide">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  IGI Certified
                </span>
                <span className="h-4 w-px bg-[#C5A059]/20" />
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#C5A059] uppercase tracking-wide">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
                  </svg>
                  Lifetime Exchange
                </span>
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="pt-2">
              {/* Karat + Category badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#0C1B33] text-[#C5A059] text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                  {product.karat}
                </span>
                <span className="text-[#C5A059] text-[9px] font-semibold tracking-[0.15em] uppercase">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#0C1B33] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-4">
                <span className="font-serif text-3xl font-bold text-[#0C1B33]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-400 ml-2 font-light">(Approx. incl. making charges)</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 font-light leading-relaxed mb-6 border-l-2 border-[#C5A059] pl-4">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="bg-white rounded-2xl border border-[#C5A059]/15 overflow-hidden mb-6 shadow-sm">
                <div className="px-5 py-3 bg-[#FAF6EE] border-b border-[#C5A059]/10">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0C1B33]">Product Specifications</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Metal", value: product.metal },
                    { label: "Gold Purity", value: product.karat },
                    { label: "Gross Weight", value: product.weight },
                    { label: "Gemstones", value: product.stones },
                    { label: "Occasion", value: product.occasion },
                    { label: "Gender", value: product.gender },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center px-5 py-3">
                      <span className="text-xs text-gray-400 font-medium">{label}</span>
                      <span className="text-xs text-[#0C1B33] font-semibold text-right max-w-[55%]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery estimate */}
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-6">
                <svg className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <span className="text-xs font-semibold text-green-700 block">Free Delivery — 5 to 7 business days</span>
                  <span className="text-[10px] text-green-600 font-light">Or visit our Jalna Road store for same-day pick-up</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold text-[#0C1B33] tracking-wide uppercase">Qty</span>
                <div className="flex items-center border border-[#C5A059]/30 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-[#0C1B33] hover:bg-[#FAF6EE] transition-colors text-sm font-bold cursor-pointer border-none bg-transparent"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-[#0C1B33] border-x border-[#C5A059]/20 min-w-[40px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-[#0C1B33] hover:bg-[#FAF6EE] transition-colors text-sm font-bold cursor-pointer border-none bg-transparent"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  id="product-add-to-cart"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex justify-center items-center gap-2 py-4 px-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer border-none ${addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-[#C5A059] hover:bg-[#D4AF37] text-white shadow-[#C5A059]/30"
                    }`}
                >
                  {addedToCart ? (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  id="product-buy-now"
                  onClick={handleBuyNow}
                  className="flex-1 inline-flex justify-center items-center gap-2 py-4 px-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-[#0C1B33] hover:bg-[#1a2f50] text-white transition-all duration-300 shadow-md cursor-pointer border-none"
                >
                  Buy Now
                </button>
              </div>

              {/* WhatsApp Enquiry */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="product-whatsapp-enquiry"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.73.001-2.597-1.002-5.038-2.825-6.863-1.822-1.824-4.248-2.829-6.853-2.83-5.437 0-9.863 4.37-9.866 9.731-.001 1.713.456 3.385 1.32 4.872L1.879 21.65l6.768-1.772l-.001-.001-.001-.001z" />
                </svg>
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-10">
                <span className="text-[#C5A059] text-xs font-semibold tracking-[0.3em] uppercase block mb-2">
                  You May Also Like
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
                  From the Same Collection
                </h2>
                <div className="h-0.5 w-12 bg-[#C5A059] mx-auto mt-3" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#C5A059]/10 shadow-sm hover:shadow-lg hover:border-[#C5A059]/30 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-[#FAF2EA]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xs font-semibold text-[#0C1B33] group-hover:text-[#C5A059] transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs font-bold text-[#C5A059] mt-1">
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
