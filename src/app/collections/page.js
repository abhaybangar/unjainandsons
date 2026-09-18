import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/product";

export const metadata = {
  title: "Curated Collections | Uttamchand Nemichand Jain & Sons",
  description: "Explore Uttamchand Nemichand Jain & Sons' signature collections including Gold Heritage, Pure Silver Ornaments, and Antique Heirlooms.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EE] text-[#0C1B33]">
      <Header />
      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-[#C5A059] tracking-[0.3em] text-xs font-bold uppercase mb-2 block">
            OUR HERITAGE & VISION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0C1B33]">
            Signature Collections
          </h1>
          <p className="text-gray-600 text-sm mt-3 max-w-lg mx-auto font-light">
            Thoughtfully curated design themes crafted for life&apos;s most meaningful celebrations.
          </p>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#C5A059]/20 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full bg-[#FAF2EA] overflow-hidden">
                <Image
                  src={col.bannerImage || "/oshinika_neckwear.png"}
                  alt={col.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B33]/80 via-[#0C1B33]/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                    {col.subtitle}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                    {col.title}
                  </h2>
                </div>
              </div>
              <div className="p-6 flex justify-between items-center bg-white">
                <p className="text-xs text-gray-600 font-light line-clamp-2 max-w-md">
                  {col.description}
                </p>
                <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#C5A059] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
