import { connectDB } from "@/lib/mongodb.js";
import Review from "@/models/Review.js";
import ReviewsClient from "./ReviewsClient";

export const metadata = {
  title: "Review Moderation | UNJ Admin",
};

export default async function AdminReviewsPage() {
  let formatted = [];
  try {
    const conn = await connectDB();
    if (conn) {
      const reviews = await Review.find({})
        .populate("product", "name")
        .sort({ createdAt: -1 })
        .lean();

      formatted = reviews.map((r) => ({
        ...r,
        _id: r._id.toString(),
        createdAt: r.createdAt?.toISOString(),
      }));
    }
  } catch (error) {
    console.warn("Reviews fetch fallback:", error.message);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
          COMMUNITY & FEEDBACK
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
          Customer Reviews ({formatted.length})
        </h1>
      </div>

      <ReviewsClient initialReviews={formatted} />
    </div>
  );
}
