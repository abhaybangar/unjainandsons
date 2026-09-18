import { connectDB } from "@/lib/mongodb.js";
import Coupon from "@/models/Coupon.js";
import CouponsClient from "./CouponsClient";

export const metadata = {
  title: "Promo Coupons | UNJ Admin",
};

export default async function AdminCouponsPage() {
  let formatted = [];
  try {
    const conn = await connectDB();
    if (conn) {
      const coupons = await Coupon.find({}).sort({ createdAt: -1 }).lean();
      formatted = coupons.map((c) => ({
        ...c,
        _id: c._id.toString(),
        expiresAt: c.expiresAt?.toISOString(),
      }));
    }
  } catch (err) {
    console.warn("Coupons page DB fallback:", err.message);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
          PROMOTIONS & DISCOUNTS
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
          Store Discount Codes ({formatted.length})
        </h1>
      </div>

      <CouponsClient initialCoupons={formatted} />
    </div>
  );
}
