"use client";

export default function BrandPromise() {
  const promises = [
    {
      title: "100% BIS Hallmarked & Certified",
      desc: "Every piece of gold and silver comes with BIS Hallmark documentation and purity certification — your assurance of genuine quality.",
      icon: (
        <svg className="h-8 w-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Silver & Antique Speciality",
      desc: "Renowned as Chhatrapati Sambhajinagar's one-stop destination for silver ornaments, silver chains, and authentic antique articles.",
      icon: (
        <svg className="h-8 w-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Transparent & Honest Rates",
      desc: "Live daily gold & silver rates with complete itemized billing — gross weight, net weight, making charges, and taxes with absolute clarity.",
      icon: (
        <svg className="h-8 w-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Lifetime In-Store Service",
      desc: "Free purity verification on our Karatmeter, complimentary jewellery cleaning, and reliable gold & silver exchange options at our showroom.",
      icon: (
        <svg className="h-8 w-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-white border-b border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto">

        {/* Heritage Narrative */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-[#C5A059] font-sans tracking-[0.3em] text-xs font-semibold uppercase mb-2 block">
              OUR HERITAGE &amp; TRUST
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1B33] mb-4 leading-tight">
              A Legacy of Purity, Craftsmanship &amp; Trust
            </h2>
            <p className="text-sm text-gray-600 font-light leading-relaxed mb-4 max-w-xl">
              <span className="font-semibold text-[#0C1B33]">Uttamchand Nemichand Jain &amp; Sons</span> has been a cherished name in Chhatrapati Sambhajinagar, celebrated for uncompromised quality in gold and silver jewellery.
            </p>
            <p className="text-sm text-gray-600 font-light leading-relaxed max-w-xl">
              From exquisite bridal gold ornaments to intricate silver chains and antique heirloom articles, we take pride in offering an unmatched variety with warm, personalized service.
            </p>
          </div>

          {/* Heritage visual */}
          <div className="flex-1 w-full max-w-md relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#C5A059]/20">
            <div
              className="absolute inset-0 bg-cover bg-center flex items-center justify-center group cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop')",
              }}
            >
              <div className="absolute inset-0 bg-[#0C1B33]/30 transition-all duration-300 group-hover:bg-[#0C1B33]/45" />
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg className="h-5 w-5 fill-current text-[#C5A059] ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Promises */}
        <div className="border-t border-[#C5A059]/10 pt-14">
          <div className="text-center mb-10">
            <span className="text-[#C5A059] font-sans tracking-[0.3em] text-xs font-semibold uppercase mb-2 block">
              UTTAMCHAND NEMICHAND JAIN &amp; SONS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
              The Pillars of Our Trust
            </h3>
            <div className="h-0.5 w-12 bg-[#C5A059] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promises.map((p, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-[#FAF6EE]/50 border border-[#C5A059]/10 rounded-2xl hover:bg-white hover:shadow-lg hover:border-[#C5A059]/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#FAF6EE] mx-auto mb-4 flex items-center justify-center border border-[#C5A059]/15">
                  {p.icon}
                </div>
                <h4 className="font-serif text-base font-bold text-[#0C1B33] mb-2">{p.title}</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
