import { connectDB } from "@/lib/mongodb.js";
import Category from "@/models/Category.js";
import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "Categories | UNJ Admin",
};

export default async function AdminCategoriesPage() {
  let formatted = [];
  try {
    const conn = await connectDB();
    if (conn) {
      const categories = await Category.find({}).sort({ name: 1 }).lean();
      formatted = categories.map((c) => ({
        ...c,
        _id: c._id.toString(),
      }));
    }
  } catch (err) {
    console.warn("Categories page DB fallback:", err.message);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
          CATALOG STRUCTURE
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
          Jewellery Categories ({formatted.length})
        </h1>
      </div>

      <CategoriesClient initialCategories={formatted} />
    </div>
  );
}
