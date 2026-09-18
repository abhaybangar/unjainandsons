import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogCatalog from "@/components/CatalogCatalog";
import { getProducts } from "@/lib/product";

export const metadata = {
  title: "Search Catalog | Uttamchand Nemichand Jain & Sons",
  description: "Search gold ornaments, pure silver chains, pooja articles, and antique collections at Uttamchand Nemichand Jain & Sons.",
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  const initialProducts = await getProducts({ search: query });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EE] text-[#0C1B33]">
      <Header />
      <main className="flex-grow pt-6">
        <div className="max-w-7xl mx-auto px-4 pt-6 text-center">
          <span className="text-[#C5A059] tracking-[0.3em] text-xs font-bold uppercase mb-2 block">
            SEARCH RESULTS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1B33]">
            {query ? `Results for "${query}"` : "Search Our Catalog"}
          </h1>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mt-3" />
        </div>

        <CatalogCatalog
          selectedCategory="All"
          setSelectedCategory={() => {}}
          selectedKarat="All"
          setSelectedKarat={() => {}}
          selectedOccasion="All"
          setSelectedOccasion={() => {}}
          searchInput={query}
          initialProducts={initialProducts}
        />
      </main>
      <Footer />
    </div>
  );
}
