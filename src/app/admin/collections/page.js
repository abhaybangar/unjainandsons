import { connectDB } from "@/lib/mongodb.js";
import Collection from "@/models/Collection.js";
import CollectionsClient from "./CollectionsClient";

export const metadata = {
  title: "Collections | UNJ Admin",
};

export default async function AdminCollectionsPage() {
  await connectDB();
  const collections = await Collection.find({}).sort({ createdAt: -1 }).lean();

  const formatted = collections.map((c) => ({
    ...c,
    _id: c._id.toString(),
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
          CAMPAIGNS & THEMES
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
          Curated Brand Collections ({formatted.length})
        </h1>
      </div>

      <CollectionsClient initialCollections={formatted} />
    </div>
  );
}
