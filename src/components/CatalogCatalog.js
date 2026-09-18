"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchProductsAction } from "@/actions/products";
import { useWishlist } from "@/context/WishlistContext";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low–High", value: "price_asc" },
  { label: "Price: High–Low", value: "price_desc" },
];

const CATEGORIES = ["All", "necklaces", "silver", "chains", "antique", "bangles", "rings", "earrings", "pendants"];
const KARATS = ["All", "14KT", "18KT", "22KT", "24KT", "925 Silver"];
const OCCASIONS = ["All", "Daily Wear", "Festive Glow", "Bridal Wear", "Elevated Essentials", "Pooja & Heritage"];

export default function CatalogCatalog({
  selectedKarat,
  setSelectedKarat,
  selectedOccasion,
  setSelectedOccasion,
  selectedCategory,
  setSelectedCategory,
  searchInput,
  initialProducts = [],
}) {
  const router = useRouter();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedGender, setSelectedGender] = useState("All");
  const [priceRange, setPriceRange] = useState(600000);
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch products via Server Action on filter change
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchProductsAction({
      category: selectedCategory,
      karat: selectedKarat,
      occasion: selectedOccasion,
      gender: selectedGender,
      maxPrice: priceRange,
      search: searchInput,
      sort: sortBy,
    })
      .then((data) => {
        if (isMounted) {
          setProducts(data || []);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load catalog products:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, selectedKarat, selectedOccasion, selectedGender, priceRange, searchInput, sortBy]);

  const filteredProducts = products;

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedKarat("All");
    setSelectedOccasion("All");
    setSelectedGender("All");
    setPriceRange(600000);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedKarat !== "All" ||
    selectedOccasion !== "All" ||
    selectedGender !== "All" ||
    priceRange < 600000;

  // This helper only groups the filter controls and has no local state.
  const FilterSidebar = () => (
    <div className="space-y-0">
      {/* Header row */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C5A059]/10">
        <h3 className="font-serif text-lg font-bold text-[#0C1B33] flex items-center gap-2">
          <svg className="h-4 w-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#C5A059] hover:underline font-medium cursor-pointer bg-transparent border-none p-0"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold tracking-wider text-[#0C1B33] uppercase mb-3">
          Category
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer capitalize border ${
                selectedCategory === cat
                  ? "bg-[#0C1B33] text-white border-[#0C1B33] shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#C5A059] hover:text-[#0C1B33]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Karat filter */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold tracking-wider text-[#0C1B33] uppercase mb-3">
          Purity / Karat
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {KARATS.map((k) => (
            <button
              key={k}
              onClick={() => setSelectedKarat(k)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                selectedKarat === k
                  ? "bg-[#C5A059] text-white border-[#C5A059] shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#C5A059] hover:text-[#0C1B33]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion filter */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold tracking-wider text-[#0C1B33] uppercase mb-3">
          Occasion
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              onClick={() => setSelectedOccasion(occ)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                selectedOccasion === occ
                  ? "bg-[#0C1B33] text-white border-[#0C1B33] shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#C5A059] hover:text-[#0C1B33]"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* Gender filter */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold tracking-wider text-[#0C1B33] uppercase mb-3">
          Gender
        </h4>
        <div className="flex gap-2">
          {["All", "Women", "Men", "Unisex"].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer border text-center ${
                selectedGender === g
                  ? "bg-[#0C1B33] text-white border-[#0C1B33]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#C5A059]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-semibold tracking-wider text-[#0C1B33] uppercase">
            Max Price
          </h4>
          <span className="text-xs font-bold text-[#C5A059]">
            ₹{priceRange.toLocaleString("en-IN")}
          </span>
        </div>
        <input
          type="range"
          min="10000"
          max="600000"
          step="15000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full cursor-pointer accent-[#C5A059]"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹10K</span>
          <span>₹6L+</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="catalog-section" className="w-full py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[#C5A059] font-sans tracking-[0.3em] text-xs font-semibold uppercase mb-2 block">
            OUR JEWELLERY CATALOG
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1B33]">
            Gold, Silver &amp; Antique Collections
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#C5A059]/30 rounded-full text-xs font-semibold text-[#0C1B33] tracking-wider uppercase hover:bg-[#FAF6EE] transition-colors cursor-pointer bg-white"
          >
            <svg className="h-4 w-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {hasActiveFilters && <span className="w-2 h-2 bg-[#C5A059] rounded-full inline-block" />}
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50" onClick={() => setMobileFiltersOpen(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
              className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-xl font-bold text-[#0C1B33]">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full cursor-pointer border-none bg-transparent"
                >
                  <svg className="h-5 w-5 text-[#0C1B33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {FilterSidebar()}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full bg-[#0C1B33] text-white py-3.5 rounded-full text-xs font-bold tracking-widest uppercase cursor-pointer border-none hover:bg-[#C5A059] transition-colors"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 bg-[#FAF6EE] border border-[#C5A059]/20 rounded-2xl p-5 self-start shadow-sm sticky top-24">
            {FilterSidebar()}
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            
            {/* Toolbar: count + sort */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-xs text-gray-500 font-medium">
                Showing <span className="font-bold text-[#0C1B33]">{filteredProducts.length}</span> designs
                {searchInput && <span className="text-[#C5A059]"> for &ldquo;{searchInput}&rdquo;</span>}
              </p>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium hidden sm:block">Sort</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide cursor-pointer transition-all border ${
                        sortBy === opt.value
                          ? "bg-[#0C1B33] text-white border-[#0C1B33]"
                          : "bg-white text-gray-500 border-gray-200 hover:border-[#C5A059] hover:text-[#C5A059]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-[#EFE9E2] rounded-2xl mb-3" />
                    <div className="h-3 bg-[#EFE9E2] rounded w-3/4 mb-2" />
                    <div className="h-3 bg-[#EFE9E2] rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-16 h-16 bg-[#FAF2EA] rounded-full flex items-center justify-center mb-4 border border-[#C5A059]/15">
                  <svg className="h-7 w-7 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0C1B33] mb-2">No Designs Found</h3>
                <p className="text-sm text-gray-400 font-light mb-5">
                  Try adjusting your filters or clearing the search to explore more pieces.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#0C1B33] hover:bg-[#C5A059] text-white rounded-full text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer border-none"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => {
                  const wishlisted = isWishlisted(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/product/${product.id}`)}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square w-full bg-[#FAF2EA] rounded-2xl overflow-hidden border border-[#C5A059]/10 group-hover:border-[#C5A059]/30 group-hover:shadow-lg transition-all duration-300">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {/* Wishlist button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                            wishlisted
                              ? "bg-white border-rose-200 text-rose-500 shadow-md"
                              : "bg-white/70 border-white/40 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-rose-500 hover:border-rose-200 hover:bg-white"
                          }`}
                          aria-label="Toggle wishlist"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={wishlisted ? 0 : 1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>

                        {/* Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          {product.isNew && (
                            <span className="bg-[#0C1B33] text-white text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-full uppercase">
                              New
                            </span>
                          )}
                        </div>

                        {/* Karat tag */}
                        <span className="absolute bottom-2 left-2 bg-[#0C1B33]/80 backdrop-blur-sm text-white text-[9px] tracking-widest font-semibold px-1.5 py-0.5 rounded">
                          {product.karat}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="pt-3 px-0.5">
                        <h4 className="font-sans text-xs sm:text-sm font-semibold text-[#0C1B33] group-hover:text-[#C5A059] transition-colors leading-tight line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-[#0C1B33] font-bold mt-1">
                          ₹{product.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                          <span className="text-gray-400 font-normal text-[10px] ml-1">(Approx)</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
