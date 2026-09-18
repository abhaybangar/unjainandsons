"use client";

import { useState } from "react";

export default function KaratOccasionGrid({ onSelectKarat, onSelectOccasion }) {
  const [activeTab, setActiveTab] = useState("karat");

  const karats = [
    {
      title: "14KT Purity",
      desc: "Optimal strength and affordability. Ideal for minimalist active wear, rings, and sleek ear studs.",
      label: "Browse 14KT",
      value: "14KT",
      color: "from-amber-700/10 to-amber-700/5",
      accent: "text-amber-800 border-amber-800/30"
    },
    {
      title: "18KT Purity",
      desc: "Perfect balance of rich color and durability. Recommended for exquisite diamond-studded luxury designs.",
      label: "Browse 18KT",
      value: "18KT",
      color: "from-yellow-700/10 to-yellow-700/5",
      accent: "text-yellow-800 border-yellow-800/30"
    },
    {
      title: "22KT Purity",
      desc: "Intense, traditional golden glow. Essential for heritage heavy bridal pieces, jhumkas, and temple designs.",
      label: "Browse 22KT",
      value: "22KT",
      color: "from-yellow-600/20 to-yellow-600/5",
      accent: "text-amber-600 border-amber-600/30"
    },
    {
      title: "24KT Purity",
      desc: "99.9% pure gold coins and bars. Excellent for long-term investments, auspicious gifting, and bridal wealth reserve.",
      label: "Browse 24KT",
      value: "24KT",
      color: "from-yellow-500/20 to-yellow-500/5",
      accent: "text-yellow-600 border-yellow-600/30"
    }
  ];

  const occasions = [
    {
      title: "Daily Wear",
      desc: "Subtle elegance for everyday work, casual meetups, and lightweight style comfort.",
      label: "View Casuals",
      value: "Daily Wear",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=300&auto=format&fit=crop"
    },
    {
      title: "Festive Glow",
      desc: "Statement pieces crafted for family celebrations, pujas, and light traditional get-togethers.",
      label: "View Festive",
      value: "Festive Glow",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=300&auto=format&fit=crop"
    },
    {
      title: "Bridal Masterpieces",
      desc: "Exquisite, heavy heritage chokers, bangles, and sets handcrafted to make your wedding day legendary.",
      label: "View Bridal",
      value: "Bridal Wear",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop"
    },
    {
      title: "Elevated Essentials",
      desc: "Timeless contemporary classics that add instant grace to any formal dinner or special corporate event.",
      label: "View Essentials",
      value: "Elevated Essentials",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full py-16 px-4 bg-[#FAF6EE] border-b border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <span className="text-[#C5A059] font-sans tracking-[0.3em] text-xs font-semibold uppercase mb-2 block">
            SEGMENTED DESIGNS
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-primary mb-3">
            Explore Curated Categories
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mb-8" />

          {/* Toggle Tabs */}
          <div className="inline-flex border border-[#C5A059]/30 rounded-full p-1 bg-white shadow-sm">
            <button
              onClick={() => setActiveTab("karat")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "karat"
                  ? "bg-[#0C1B33] text-white"
                  : "text-[#0C1B33] hover:text-[#C5A059]"
              }`}
            >
              Shop By Karat
            </button>
            <button
              onClick={() => setActiveTab("occasion")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "occasion"
                  ? "bg-[#0C1B33] text-white"
                  : "text-[#0C1B33] hover:text-[#C5A059]"
              }`}
            >
              Shop By Occasion
            </button>
          </div>
        </div>

        {/* Karats Grid */}
        {activeTab === "karat" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {karats.map((k, idx) => (
              <div
                key={idx}
                className={`bg-white border border-[#C5A059]/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 bg-gradient-to-br ${k.color}`}
              >
                <div>
                  <div className={`inline-block border rounded-full px-3 py-0.5 text-xs font-semibold tracking-wider uppercase mb-4 ${k.accent}`}>
                    {k.title.split(" ")[0]}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">
                    {k.title}
                  </h3>
                  <p className="text-xs text-charcoal/80 font-light leading-relaxed mb-6">
                    {k.desc}
                  </p>
                </div>
                
                <button
                  onClick={() => onSelectKarat(k.value)}
                  className="w-full text-center inline-block bg-[#0C1B33] hover:bg-[#C5A059] text-white py-2 px-4 rounded-xl text-xs font-semibold tracking-widest uppercase transition-colors duration-300 cursor-pointer"
                >
                  {k.label}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Occasions Grid */}
        {activeTab === "occasion" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {occasions.map((o, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#C5A059]/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${o.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-bold text-primary mb-1.5">
                      {o.title}
                    </h3>
                    <p className="text-xs text-charcoal/80 font-light leading-relaxed">
                      {o.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectOccasion(o.value)}
                    className="w-full text-center inline-block border border-primary text-primary hover:bg-[#FAF6EE] py-2 px-4 rounded-xl text-xs font-semibold tracking-widest uppercase transition-colors duration-300 cursor-pointer"
                  >
                    {o.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
