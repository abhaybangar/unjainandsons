"use client";

export default function StoreBanner() {
  return (
    <div id="store-info" className="w-full bg-[#FAF6EE] py-10 px-4 border-b border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#C5A059]/30 rounded-2xl overflow-hidden shadow-gold flex flex-col lg:flex-row items-stretch">
          
          {/* Left Details Panel */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-[#0C1B33] text-[#C5A059] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                  AUTHENTIC JEWELLERY STORE
                </span>
                <div className="flex items-center text-amber-500 text-sm font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  <span>★ 4.7</span>
                  <span className="text-[#222222] font-medium ml-1.5 text-xs text-gray-700">
                    (40+ Google Reviews · 50+ Justdial)
                  </span>
                </div>
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ● Open · Closes 9:00 PM
                </span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-primary mb-2">
                Uttamchand Nemichand Jain &amp; Sons
              </h2>
              
              <p className="text-sm text-gray-600 font-normal leading-relaxed mb-6">
                Plot no 58, Ahinsa Nagar Akashwani Chowk, beside Atul Suzuki &amp; Natural Ice Cream, Mahesh Nagar, Mondha, Chhatrapati Sambhajinagar, Maharashtra 431001.
              </p>

              {/* Hours, Services, and Contact grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-light text-charcoal/90 mb-8">
                <div className="flex items-start space-x-2">
                  <svg className="h-5 w-5 text-accent-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-semibold block text-primary">Store Timings</span>
                    <span>Daily: 10:30 AM – 9:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <svg className="h-5 w-5 text-accent-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <span className="font-semibold block text-primary">Phone Numbers</span>
                    <span>082750 80681 / +91 82750 80681</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:col-span-2">
                  <svg className="h-5 w-5 text-accent-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <span className="font-semibold block text-primary">Specialties &amp; In-Store Services</span>
                    <span>Gold &amp; Silver Ornaments • Pure Silver Chains • Antique Articles • BIS Hallmarked Purity • Custom Bridal Jewellery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Interactive Call-to-actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Uttamchand+Nemichand+Jain+%26+Sons+Ahinsa+Nagar+Akashwani+Chowk+Chhatrapati+Sambhajinagar+Maharashtra+431001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center space-x-2 bg-[#0C1B33] hover:bg-[#C5A059] text-white py-3.5 px-6 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Get Directions</span>
              </a>
              
              <a
                href="tel:+918275080681"
                className="flex-1 inline-flex justify-center items-center space-x-2 border border-primary text-primary hover:bg-[#FAF6EE] py-3.5 px-6 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call: 082750 80681</span>
              </a>

              <a
                href="https://wa.me/918275080681?text=Hi%20Uttamchand%20Nemichand%20Jain%20%26%20Sons%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md shadow-green-500/10"
              >
                {/* Whatsapp Icon */}
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.73.001-2.597-1.002-5.038-2.825-6.863-1.822-1.824-4.248-2.829-6.853-2.83-5.437 0-9.863 4.37-9.866 9.731-.001 1.713.456 3.385 1.32 4.872L1.879 21.65l6.768-1.772l-.001-.001-.001-.001z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right Store Image Showcase */}
          <div className="w-full lg:w-[420px] bg-[#FAF6EE] relative min-h-[250px] lg:min-h-full">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] tracking-widest uppercase font-bold text-accent-gold">Visit Our Showroom</span>
              <p className="text-sm font-medium">Ahinsa Nagar Akashwani Chowk, Sambhajinagar</p>
              <p className="text-xs text-gray-200 font-light mt-1">One stop shop for gold, silver ornaments &amp; antique articles</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
