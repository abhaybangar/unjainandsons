"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/data/products";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const user = session?.user || null;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) => {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.karat.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          );
        }
      ).slice(0, 5)
    : [];

  /* Close the search dropdown when the user clicks outside it. */
  useEffect(() => {
    const handleClick = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const navLinks = [
    { label: "Collections", href: "#catalog-section" },
    { label: "Earrings", href: "#catalog-section" },
    { label: "Necklaces", href: "#catalog-section" },
    { label: "Rings", href: "#catalog-section" },
    { label: "Occasions", href: "#catalog-section" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-[#0C1B33] text-center py-2 px-4">
        <p className="text-[10px] tracking-[0.18em] font-medium text-[#C5A059] uppercase truncate">
          ✨ Gold &amp; Silver Ornaments &nbsp;·&nbsp; Antique Articles &nbsp;·&nbsp; BIS Hallmarked &nbsp;·&nbsp; 4.7★ Rated &nbsp;·&nbsp; Closes 9 PM
        </p>
      </div>

      {/* Main Header */}
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#C5A059]/15"
            : "bg-[#FAF6EE] border-b border-[#C5A059]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Hamburger — mobile only */}
            <button
              id="mobile-menu-toggle"
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-[#0C1B33]/5 transition-colors cursor-pointer border-none bg-transparent shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-5 bg-[#0C1B33] transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0C1B33] my-1 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0C1B33] transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>

            {/* Logo */}
            <Link href="/" id="header-logo" className="flex flex-col items-center lg:items-start group">
              <span className="font-serif text-base sm:text-xl lg:text-2xl tracking-[0.12em] font-bold text-[#0C1B33] group-hover:text-[#C5A059] transition-colors duration-500 leading-none">
                UTTAMCHAND NEMICHAND
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.32em] font-semibold text-[#C5A059] uppercase leading-none mt-1">
                JAIN &amp; SONS • JEWELLERS
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[11px] font-semibold tracking-[0.15em] text-[#0C1B33]/80 uppercase hover:text-[#C5A059] transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C5A059] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-0.5 sm:space-x-1">

              {/* Search */}
              <button
                id="header-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-[#0C1B33]/5 transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Search"
              >
                {searchOpen ? (
                  <svg className="h-5 w-5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-[#0C1B33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>

              {/* Wishlist */}
              <button
                id="header-wishlist-btn"
                onClick={() => router.push("/wishlist")}
                className="relative p-2 rounded-full hover:bg-[#0C1B33]/5 transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Wishlist"
              >
                <svg className="h-5 w-5 text-[#0C1B33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                id="header-cart-btn"
                onClick={() => router.push("/cart")}
                className="relative p-2 rounded-full hover:bg-[#0C1B33]/5 transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Cart"
              >
                <svg className="h-5 w-5 text-[#0C1B33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#C5A059] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* Account */}
              {user ? (
                <div className="relative group">
                  <button
                    id="header-account-btn"
                    className="flex items-center space-x-1.5 pl-2 pr-3 py-1.5 rounded-full border border-[#C5A059]/30 hover:border-[#C5A059] hover:bg-[#0C1B33]/5 transition-all duration-200 cursor-pointer bg-transparent"
                    aria-label="Account"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#0C1B33] flex items-center justify-center text-[#C5A059] text-[10px] font-bold uppercase">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <span className="hidden sm:block text-[10px] font-semibold text-[#0C1B33] tracking-wider max-w-[80px] truncate">
                      {user.name?.split(" ")[0]}
                    </span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#C5A059]/20 rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <p className="px-4 py-2 text-[10px] text-[#0C1B33]/50 font-semibold tracking-wider uppercase border-b border-gray-100 truncate">
                      {user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 font-semibold transition-colors cursor-pointer border-none bg-transparent"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  id="header-login-btn"
                  onClick={() => router.push("/login")}
                  className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[#0C1B33] hover:bg-[#C5A059] text-white text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-sm cursor-pointer border-none ml-1"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-32 border-t border-[#C5A059]/15" : "max-h-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" ref={searchContainerRef}>
            <div className="relative max-w-2xl mx-auto">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C5A059]"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                id="header-search-input"
                type="text"
                placeholder="Search necklaces, rings, earrings, gold purity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#C5A059]/25 focus:border-[#C5A059] rounded-full py-2.5 pl-11 pr-10 text-sm text-[#0C1B33] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C5A059] transition-colors cursor-pointer border-none bg-transparent p-0"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Search Dropdown Results */}
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#C5A059]/20 rounded-2xl shadow-2xl overflow-hidden z-[100]">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        router.push(`/product/${product.id}`);
                        handleSearchClose();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#FAF6EE] transition-colors text-left cursor-pointer border-none bg-transparent border-b border-gray-50 last:border-0"
                    >
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-[#FAF2EA]">
                        <Image src={product.image} alt={product.name} fill className="object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#0C1B33] truncate">{product.name}</p>
                        <p className="text-[10px] text-[#C5A059] font-medium">{product.karat} · ₹{product.price.toLocaleString("en-IN")}</p>
                      </div>
                      <svg className="h-3.5 w-3.5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                  {/* View all */}
                  <button
                    onClick={() => {
                      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
                      handleSearchClose();
                    }}
                    className="flex items-center justify-center w-full px-4 py-3 bg-[#FAF6EE] text-[11px] font-semibold text-[#C5A059] tracking-wider uppercase hover:bg-[#0C1B33] hover:text-white transition-colors cursor-pointer border-none"
                  >
                    View all results for &ldquo;{searchQuery}&rdquo;
                  </button>
                </div>
              )}

              {/* No results */}
              {searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#C5A059]/20 rounded-2xl shadow-xl overflow-hidden z-[100]">
                  <div className="px-5 py-4 text-center">
                    <p className="text-sm font-semibold text-[#0C1B33] mb-0.5">No results found</p>
                    <p className="text-xs text-gray-400">Try searching for &ldquo;ring&rdquo;, &ldquo;gold&rdquo;, or &ldquo;necklace&rdquo;</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <nav
            className="absolute top-0 left-0 h-full w-72 bg-[#FAF6EE] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C5A059]/15">
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-[0.1em] font-bold text-[#0C1B33]">UTTAMCHAND NEMICHAND</span>
                <span className="text-[8px] tracking-[0.25em] font-semibold text-[#C5A059] uppercase mt-0.5">JAIN &amp; SONS • JEWELLERS</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#0C1B33]/5 transition-colors cursor-pointer border-none bg-transparent"
              >
                <svg className="h-5 w-5 text-[#0C1B33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-[#0C1B33] uppercase hover:text-[#C5A059] hover:bg-[#0C1B33]/5 rounded-lg transition-all duration-200"
                >
                  {link.label}
                  <svg className="h-3.5 w-3.5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}

              {/* Mobile quick links */}
              <div className="mt-4 pt-4 border-t border-[#C5A059]/10 space-y-1">
                <button
                  onClick={() => { router.push("/wishlist"); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-[11px] font-semibold tracking-[0.15em] text-[#0C1B33] uppercase hover:text-[#C5A059] hover:bg-[#0C1B33]/5 rounded-lg transition-all"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </button>
                <button
                  onClick={() => { router.push("/cart"); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-[11px] font-semibold tracking-[0.15em] text-[#0C1B33] uppercase hover:text-[#C5A059] hover:bg-[#0C1B33]/5 rounded-lg transition-all"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart {cartCount > 0 && `(${cartCount})`}
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="px-6 py-6 border-t border-[#C5A059]/15">
              {user ? (
                <div>
                  <p className="text-xs text-[#0C1B33]/60 mb-3 truncate">{user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-xs font-bold tracking-widest uppercase text-red-500 border border-red-200 rounded-full py-2.5 hover:bg-red-50 transition-colors cursor-pointer bg-transparent"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); router.push("/login"); }}
                  className="w-full bg-[#0C1B33] hover:bg-[#C5A059] text-white text-xs font-bold tracking-widest uppercase rounded-full py-3 transition-all duration-300 cursor-pointer border-none shadow-md"
                >
                  Sign In / Create Account
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
