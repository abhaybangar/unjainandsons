"use client";

export default function GoogleReviews() {
  const reviews = [
    {
      author: "Verified Customer",
      initial: "R",
      rating: 5,
      date: "Google Review",
      comment: "Fabulous collection of silver and gold ornaments.",
      highlight: "Gold & Silver Ornaments",
    },
    {
      author: "Satisfied Buyer",
      initial: "S",
      rating: 5,
      date: "Google Review",
      comment: "Nice, got my silver chain and it's good.",
      highlight: "Pure Silver Chain",
    },
    {
      author: "Local Shopper",
      initial: "A",
      rating: 5,
      date: "Google Review",
      comment: "Lots of variety for choice. One stop shop for silver ornaments and antique articles. Must visit!",
      highlight: "One Stop Shop",
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-[#FAF6EE] border-b border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Rating Header Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-6 sm:p-8 rounded-2xl border border-[#C5A059]/20 shadow-sm">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#0C1B33] flex flex-col items-center justify-center text-white shrink-0 shadow-md">
              <span className="text-2xl font-serif font-bold text-[#C5A059] leading-none">4.7</span>
              <span className="text-[10px] text-amber-300 font-sans mt-0.5">★★★★★</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#0C1B33]">
                  Uttamchand Nemichand Jain &amp; Sons
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified Store
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 font-light">
                Based on <strong className="text-gray-800 font-semibold">40+ Google Reviews</strong> &amp; 50+ Justdial Ratings in Sambhajinagar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.google.com/search?q=Uttamchand+Nemichand+Jain+%26+Sons+Chhatrapati+Sambhajinagar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0C1B33] hover:bg-[#C5A059] text-white py-2.5 px-5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
            >
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
              </svg>
              <span>View All Google Reviews</span>
            </a>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-10">
          <span className="text-[#C5A059] font-sans tracking-[0.3em] text-xs font-semibold uppercase mb-2 block">
            CUSTOMER PRAISE &amp; TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1B33]">
            What Our Valued Patrons Say
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-[#C5A059]/15 shadow-sm hover:shadow-gold hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col justify-between relative"
            >
              <div className="absolute top-5 right-5 text-3xl font-serif text-[#C5A059]/25 select-none">
                “
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-500 text-sm mb-3">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="text-sm font-serif italic text-gray-800 leading-relaxed mb-6 font-medium">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#C5A059]/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0C1B33] text-[#C5A059] font-bold text-xs flex items-center justify-center">
                    {rev.initial}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0C1B33]">{rev.author}</h4>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#C5A059] bg-[#FAF6EE] px-2.5 py-1 rounded-full border border-[#C5A059]/20">
                  {rev.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
