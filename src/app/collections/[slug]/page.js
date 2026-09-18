import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogCatalog from "@/components/CatalogCatalog";
import { getCollections, getProducts } from "@/lib/product";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collections = await getCollections();
  const found = collections.find((c) => c.slug === slug);
  return {
    title: `${found ? found.title : "Collection"} | Uttamchand Nemichand Jain & Sons`,
    description: found ? found.description : "Explore Uttamchand Nemichand Jain & Sons' curated jewellery collections.",
  };
}

export default async function CollectionDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const searchInput = sParams?.q || "";

  const collections = await getCollections();
  const currentCollection = collections.find((c) => c.slug === slug);

  if (!currentCollection && slug !== "all") {
    // If invalid slug, fallback to showing all
  }

  const title = currentCollection ? currentCollection.title : "Curated Collection";
  const subtitle = currentCollection ? currentCollection.subtitle : "Special Showcase";

  // Map collection slug to occasion or query
  let occasionFilter = "All";
  if (slug === "bridal-heritage") occasionFilter = "Bridal Wear";
  else if (slug === "royal-solitaire") occasionFilter = "Elevated Essentials";
  else if (slug === "daily-elegance") occasionFilter = "Daily Wear";
  else if (slug === "festive-glow") occasionFilter = "Festive Glow";

  const initialProducts = await getProducts({
    occasion: occasionFilter,
    search: searchInput,
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EE] text-[#0C1B33]">
      <Header />
      <main className="flex-grow pt-6">
        <div className="max-w-7xl mx-auto px-4 pt-6 text-center">
          <span className="text-[#C5A059] tracking-[0.3em] text-xs font-bold uppercase mb-2 block">
            {subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0C1B33]">
            {title}
          </h1>
          <p className="text-gray-600 text-sm mt-3 max-w-xl mx-auto font-light">
            {currentCollection?.description || "Bespoke designs selected for elegance and timeless craftsmanship."}
          </p>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mt-4" />
        </div>

        <CatalogCatalog
          selectedCategory="All"
          setSelectedCategory={() => {}}
          selectedKarat="All"
          setSelectedKarat={() => {}}
          selectedOccasion={occasionFilter}
          setSelectedOccasion={() => {}}
          searchInput={searchInput}
          initialProducts={initialProducts}
        />
      </main>
      <Footer />
    </div>
  );
}
