"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("unj_wishlist");
        if (stored) {
          setWishlist(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("unj_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.includes(id),
    [wishlist]
  );

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((x) => x !== id));
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist, wishlistCount: wishlist.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
