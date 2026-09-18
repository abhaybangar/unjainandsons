"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import StoreBanner from "@/components/StoreBanner";
import CategoryGrid from "@/components/CategoryGrid";
import KaratOccasionGrid from "@/components/KaratOccasionGrid";
import CatalogCatalog from "@/components/CatalogCatalog";
import BrandPromise from "@/components/BrandPromise";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";

function HomeContent({ initialProducts = [] }) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedKarat, setSelectedKarat] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const searchInput = searchParams.get("q") || "";

  // Read search query from URL (from header "view all results" link)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const timeout = setTimeout(() => {
        const el = document.getElementById("catalog-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  const scrollToCatalog = () => {
    setTimeout(() => {
      const el = document.getElementById("catalog-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    scrollToCatalog();
  };

  const handleSelectKarat = (karat) => {
    setSelectedKarat(karat);
    scrollToCatalog();
  };

  const handleSelectOccasion = (occ) => {
    setSelectedOccasion(occ);
    scrollToCatalog();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EE] font-sans antialiased text-charcoal">
      <Header />
      <main className="flex-grow">
        <HeroCarousel />
        <StoreBanner />
        <CategoryGrid onSelectCategory={handleSelectCategory} />
        <KaratOccasionGrid
          onSelectKarat={handleSelectKarat}
          onSelectOccasion={handleSelectOccasion}
        />
        <CatalogCatalog
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedKarat={selectedKarat}
          setSelectedKarat={setSelectedKarat}
          selectedOccasion={selectedOccasion}
          setSelectedOccasion={setSelectedOccasion}
          searchInput={searchInput}
          initialProducts={initialProducts}
        />
        <GoogleReviews />
        <BrandPromise />
      </main>
      <Footer />
    </div>
  );
}

export default function Home({ products = [] }) {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-[#FAF6EE]">
        <div className="h-16 bg-[#0C1B33]" />
        <div className="h-[420px] bg-[#0C1B33] animate-pulse" />
      </div>
    }>
      <HomeContent initialProducts={products} />
    </Suspense>
  );
}
