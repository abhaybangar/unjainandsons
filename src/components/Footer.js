"use client";

export default function Footer() {
  const shopLinks = [
    { name: "Gold Necklaces & Mangalsutras", href: "#catalog-section" },
    { name: "Pure Silver Ornaments", href: "#catalog-section" },
    { name: "Silver Chains & Payal", href: "#catalog-section" },
    { name: "Antique Articles & Heirlooms", href: "#catalog-section" },
    { name: "Gold Bangles & Kadas", href: "#catalog-section" },
    { name: "Bridal Jewellery Sets", href: "#catalog-section" }
  ];

  const highlights = [
    "BIS 916 Hallmarked Gold",
    "Pure Silver Articles & Pooja Items",
    "Exquisite Antique Ornaments",
    "Certified Diamond Jewellery",
    "Custom Bridal Jewellery Making",
    "Karatmeter Gold Testing",
    "Ahinsa Nagar, Sambhajinagar"
  ];

  return (
    <footer className="w-full bg-[#0C1B33] text-white pt-16 pb-8 px-4 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.12em] font-bold text-white">
                UTTAMCHAND NEMICHAND
              </span>
              <span className="text-[9px] tracking-[0.28em] font-medium text-accent-gold uppercase mt-0.5">
                JAIN &amp; SONS • JEWELLERS
              </span>
            </div>
            <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
              Your trusted family jewellery destination in Chhatrapati Sambhajinagar. Offering a fabulous collection of BIS Hallmarked gold ornaments, pure silver ornaments, silver chains, and antique articles.
            </p>
            <div className="space-y-2 text-xs font-light text-gray-300">
              <p className="flex items-start">
                <span className="text-accent-gold mr-2 shrink-0 mt-0.5">📍</span>
                <span>Plot no 58, Ahinsa Nagar Akashwani Chowk, beside Atul Suzuki &amp; Natural Ice Cream, Mahesh Nagar, Mondha, Chhatrapati Sambhajinagar - 431001</span>
              </p>
              <p className="flex items-center">
                <span className="text-accent-gold mr-2">📞</span>
                <a href="tel:+918275080681" className="hover:text-accent-gold">082750 80681 / +91 82750 80681</a>
              </p>
              <p className="flex items-center">
                <span className="text-accent-gold mr-2">⭐</span>
                <span>4.7 Rating (40+ Google Reviews · 50+ Justdial)</span>
              </p>
              <p className="flex items-center">
                <span className="text-accent-gold mr-2">🕒</span>
                <span>Daily: 10:30 AM – 9:00 PM (Closes 9 PM)</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Shop Links */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-accent-gold mb-4 uppercase">
              Our Collections
            </h4>
            <ul className="space-y-2 text-xs font-light text-gray-300">
              {shopLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-accent-gold transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trust & Specialties */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-accent-gold mb-4 uppercase">
              Store Highlights
            </h4>
            <ul className="space-y-2 text-xs font-light text-gray-300">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-accent-gold mr-1.5">•</span>
                  <span className="text-gray-300 text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Connect & Visit */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-accent-gold mb-4 uppercase">
              Visit Our Showroom
            </h4>
            <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
              Visit us at Akashwani Chowk, Ahinsa Nagar for personal consultation and viewing our complete silver and gold collection.
            </p>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Uttamchand+Nemichand+Jain+%26+Sons+Ahinsa+Nagar+Akashwani+Chowk+Chhatrapati+Sambhajinagar+Maharashtra+431001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1B33] py-2.5 px-4 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md text-center"
              >
                <span>🗺️ Get Directions on Maps</span>
              </a>
              <a
                href="https://wa.me/918275080681?text=Hi%20Uttamchand%20Nemichand%20Jain%20%26%20Sons%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-4 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md text-center"
              >
                <span>💬 WhatsApp Inquiries</span>
              </a>
            </div>
          </div>

        </div>

        {/* Sub-footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-light text-gray-400">
          <p>© 2026 Uttamchand Nemichand Jain &amp; Sons. All Rights Reserved. Chhatrapati Sambhajinagar, Maharashtra.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#store-info" className="hover:text-accent-gold transition-colors duration-200">Store Directions</a>
            <a href="tel:+918275080681" className="hover:text-accent-gold transition-colors duration-200">Contact Us</a>
            <a href="#catalog-section" className="hover:text-accent-gold transition-colors duration-200">Browse Catalog</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
