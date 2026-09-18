"use client";

export default function CategoryGrid({ onSelectCategory }) {
  const categories = [
    {
      name: "Gold Ornaments & Necklaces",
      tagline: "22KT BIS Hallmarked timeless elegance",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
      slug: "necklaces"
    },
    {
      name: "Pure Silver Ornaments",
      tagline: "Fine 925 silver payal, gifts & pooja articles",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
      slug: "silver"
    },
    {
      name: "Silver Chains",
      tagline: "Durable & shining chains for men & women",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop",
      slug: "chains"
    },
    {
      name: "Antique Articles & Heirlooms",
      tagline: "One stop shop for authentic antique masterpieces",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop",
      slug: "antique"
    },
    {
      name: "Bangles & Kadas",
      tagline: "Adorning your graceful wrist with tradition",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
      slug: "bangles"
    },
    {
      name: "Rings & Earrings",
      tagline: "Everyday brilliance and bridal glamour",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
      slug: "rings"
    }
  ];

  return (
    <section className="w-full py-16 px-4 bg-white border-b border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-[#C5A059] font-sans tracking-[0.3em] text-xs font-semibold uppercase mb-2 block">
          DISCOVER COLLECTIONS
        </span>
        <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-primary mb-3">
          How would you like to Sparkle?
        </h2>
        <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mb-10" />

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.slug)}
              className="group cursor-pointer bg-[#FAF6EE] border border-[#C5A059]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-gold transition-all duration-500 flex flex-col justify-between"
            >
              {/* Category Image container */}
              <div className="relative h-[240px] w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Descriptor */}
              <div className="p-6 text-center border-t border-[#C5A059]/10 bg-[#FAF6EE] group-hover:bg-[#0C1B33] transition-colors duration-500">
                <h3 className="font-serif text-xl font-bold text-primary group-hover:text-white transition-colors duration-500 mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-charcoal/70 group-hover:text-gray-300 font-light italic transition-colors duration-500">
                  &quot;{cat.tagline}&quot;
                </p>
                <div className="mt-4 inline-flex items-center text-xs font-semibold tracking-wider text-accent-gold uppercase group-hover:text-[#FAF6EE] transition-colors duration-500">
                  <span>Browse Designs</span>
                  <svg className="ml-1.5 h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
