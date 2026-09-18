import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogCatalog from "@/components/CatalogCatalog";
import { getProducts } from "@/lib/product";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const capitalized = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Jewellery";
  return {
    title: `${capitalized} Collection | Uttamchand Nemichand Jain & Sons`,
    description: `Explore Uttamchand Nemichand Jain & Sons' ${category} designs crafted with master workmanship in Chhatrapati Sambhajinagar.`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const sParams = await searchParams;
  const searchInput = sParams?.q || "";

  if (!category) return notFound();

  const formattedCategory = category.toLowerCase();
  const initialProducts = await getProducts({
    category: formattedCategory,
    search: searchInput,
  });

  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EE] text-[#0C1B33]">
      <Header />
      <main className="flex-grow pt-6">
        <div className="max-w-7xl mx-auto px-4 pt-6 text-center">
          <span className="text-[#C5A059] tracking-[0.3em] text-xs font-bold uppercase mb-2 block">
            CATEGORY SHOWCASE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0C1B33]">
            {title} Collection
          </h1>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mt-3" />
        </div>
        <CatalogCatalog
          selectedCategory={formattedCategory}
          setSelectedCategory={() => {}}
          selectedKarat="All"
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
