import Link from "next/link";

export const metadata = {
  title: "Store Settings | Uttamchand Nemichand Jain & Sons Admin",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
          CONFIGURATIONS
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
          Showroom &amp; Store Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Boutique Location */}
        <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#FAF6EE] rounded-xl text-[#C5A059]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <h3 className="font-serif text-lg font-bold text-[#0C1B33]">Physical Showroom</h3>
          </div>
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            <strong>Uttamchand Nemichand Jain &amp; Sons</strong><br />
            Plot no 58, Ahinsa Nagar Akashwani Chowk, beside Atul Suzuki &amp; Natural icecream<br />
            Mahesh Nagar, Mondha, Chhatrapati Sambhajinagar, Maharashtra – 431001
          </p>
          <div className="pt-2 text-xs text-gray-500">
            <span className="font-bold text-[#0C1B33]">Opening Hours:</span> 10:30 AM – 9:00 PM (All 7 Days · Closes 9 PM)
          </div>
        </div>

        {/* Customer Support */}
        <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#FAF6EE] rounded-xl text-[#C5A059]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <h3 className="font-serif text-lg font-bold text-[#0C1B33]">Store Contact &amp; Desk</h3>
          </div>
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            <span className="font-bold text-[#0C1B33]">Phone:</span> 082750 80681 / +91 82750 80681<br />
            <span className="font-bold text-[#0C1B33]">WhatsApp:</span> +91 82750 80681<br />
            <span className="font-bold text-[#0C1B33]">Rating:</span> 4.7★ (40+ Google Reviews · 50+ Justdial)
          </p>
        </div>

        {/* GST & Making Charges */}
        <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#0C1B33]">Tax & Pricing Policy</h3>
          <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
            <li>GST on Gold Jewellery: 3% (included in display price)</li>
            <li>Making charges: Approximate & calculated per gram</li>
            <li>Free insured shipping across all pin codes in India</li>
          </ul>
        </div>

        {/* Security & Database Status */}
        <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0C1B33]">System & Security</h3>
            <p className="text-xs text-gray-600 mt-1">
              Authentication powered by NextAuth.js session tokens. Database backed by MongoDB Atlas cluster.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              System Operational
            </span>
            <Link href="/admin" className="text-[#C5A059] font-bold uppercase text-[10px]">
              Back to Overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
