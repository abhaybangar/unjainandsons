import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogCatalog from "@/components/CatalogCatalog";
import { getProducts } from "@/lib/product";

export const metadata = {
  title: "Shop All Jewellery | Uttamchand Nemichand Jain & Sons",
  description: "Browse Uttamchand Nemichand Jain & Sons' complete catalog of BIS hallmarked gold, pure silver ornaments & antique articles.",
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const initialCategory = params?.category || "All";
  const initialKarat = params?.karat || "All";
  const searchInput = params?.q || "";

  const initialProducts = await getProducts({
    category: initialCategory,
    karat: initialKarat,
    search: searchInput,
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EE] text-[#0C1B33]">
      <Header />
      <main className="flex-grow pt-6">
        <div className="max-w-7xl mx-auto px-4 pt-6 text-center">
          <span className="text-[#C5A059] tracking-[0.3em] text-xs font-bold uppercase mb-2 block">
            UTTAMCHAND NEMICHAND JAIN &amp; SONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0C1B33]">
            Our Complete Collection
          </h1>
          <p className="text-gray-600 text-sm mt-2 max-w-xl mx-auto font-light">
            Discover BIS hallmarked gold ornaments, pure silver chains, payal, and rare antique articles in Chhatrapati Sambhajinagar.
          </p>
        </div>
        <CatalogCatalog
          selectedCategory={initialCategory}
          setSelectedCategory={() => {}}
          selectedKarat={initialKarat}
          setSelectedKarat={() => {}}
          selectedOccasion="All"
          setSelectedOccasion={() => {}}
          searchInput={searchInput}
          initialProducts={initialProducts}
        />
      </main>
      <Footer />
    </div>
  );
}
