"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Pure Gold & Heritage Ornaments",
      subtitle:
        "Handcrafted 22KT & 24KT BIS Hallmarked jewellery blending timeless Indian legacy with master artistry.",
      tagline: "UTTAMCHAND NEMICHAND JAIN & SONS",
      image: "/hero_necklace.png",
      primaryCta: { label: "View Catalog", href: "#catalog-section" },
      secondaryCta: {
        label: "WhatsApp Inquiries",
        href: "https://wa.me/918275080681?text=Hi%20Uttamchand%20Nemichand%20Jain%20%26%20Sons%2C%20I%20would%20like%20to%20view%20your%20gold%20and%20bridal%20jewellery%20collection.",
        external: true,
      },
    },
    {
      title: "Pure Silver Ornaments & Chains",
      subtitle:
        "Chhatrapati Sambhajinagar's one-stop destination for finest 925 pure silver chains, payal, pooja articles & gifts.",
      tagline: "EXQUISITE SILVER COLLECTION",
      image: "/hero_diamonds.png",
      primaryCta: { label: "Explore Silver", href: "#catalog-section" },
      secondaryCta: {
        label: "WhatsApp Consult",
        href: "https://wa.me/918275080681?text=Hi%20Uttamchand%20Nemichand%20Jain%20%26%20Sons%2C%20I%20am%20interested%20in%20your%20silver%20ornaments%20and%20chains.",
        external: true,
      },
    },
    {
      title: "Rare Antique Articles & Heirlooms",
      subtitle:
        "Fabulous collection of vintage antique masterpieces, traditional temple ornaments & bespoke creations.",
      tagline: "ANTIQUE & BRIDAL HEIRLOOMS",
      image: "/hero_woman.png",
      primaryCta: { label: "Discover Antiques", href: "#catalog-section" },
      secondaryCta: {
        label: "Visit Showroom",
        href: "https://maps.google.com/?q=Uttamchand+Nemichand+Jain+%26+Sons+Ahinsa+Nagar+Akashwani+Chowk+Chhatrapati+Sambhajinagar+Maharashtra+431001",
        external: true,
      },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrimary = (e, href) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] md:h-[640px] overflow-hidden bg-[#0C1B33]">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center"
              style={{
                transform: idx === currentSlide ? "scale(1.04)" : "scale(1.0)",
                transition: "transform 6000ms ease-out",
              }}
            />
            {/* Gradient overlay: strong left fade for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C1B33]/90 via-[#0C1B33]/55 to-[#0C1B33]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B33]/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
              <div className="max-w-lg md:max-w-xl text-left">
                {/* Tagline */}
                <span className="inline-flex items-center gap-2 text-[#C5A059] font-sans tracking-[0.3em] text-[10px] font-semibold uppercase mb-3">
                  <span className="h-px w-6 bg-[#C5A059] inline-block" />
                  {slide.tagline}
                </span>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-white leading-[1.15] mb-3 tracking-wide">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-gray-200 text-sm sm:text-base font-light tracking-wide mb-7 leading-relaxed max-w-md">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary CTA */}
                  <a
                    href={slide.primaryCta.href}
                    onClick={(e) => handlePrimary(e, slide.primaryCta.href)}
                    id={`hero-cta-shop-${idx}`}
                    className="inline-flex justify-center items-center bg-[#C5A059] hover:bg-[#D4AF37] text-white py-3.5 px-8 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg shadow-[#C5A059]/30 hover:shadow-[#C5A059]/50 hover:-translate-y-0.5"
                  >
                    Shop Collection
                    <svg className="ml-2 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  {/* Secondary CTA */}
                  <a
                    href={slide.secondaryCta.href}
                    target={slide.secondaryCta.external ? "_blank" : undefined}
                    rel={slide.secondaryCta.external ? "noopener noreferrer" : undefined}
                    id={`hero-cta-appt-${idx}`}
                    className="inline-flex justify-center items-center border border-white/50 hover:border-white text-white py-3.5 px-8 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 bg-white/5 hover:bg-white/15"
                  >
                    {slide.secondaryCta.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow controls — hidden on smallest screens */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 bg-black/25 hover:bg-black/50 text-white rounded-full p-2.5 border border-white/10 hover:scale-110 transition-all duration-300 cursor-pointer hidden sm:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 bg-black/25 hover:bg-black/50 text-white rounded-full p-2.5 border border-white/10 hover:scale-110 transition-all duration-300 cursor-pointer hidden sm:flex items-center justify-center"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentSlide ? "w-7 h-2 bg-[#C5A059]" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
