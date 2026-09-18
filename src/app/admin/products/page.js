import { connectDB } from "@/lib/mongodb.js";
import Product from "@/models/Product.js";
import Link from "next/link";
import ProductsListClient from "./ProductsListClient";

import { PRODUCTS } from "@/data/products.js";

export const metadata = {
  title: "Manage Products | UNJ Admin",
};

export default async function AdminProductsPage() {
  let formatted = PRODUCTS.map((p) => ({
    ...p,
    _id: String(p.id),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  try {
    const conn = await connectDB();
    if (conn) {
      const products = await Product.find({}).sort({ createdAt: -1 }).lean();
      if (products && products.length > 0) {
        formatted = products.map((p) => ({
          ...p,
          _id: p._id.toString(),
          createdAt: p.createdAt?.toISOString(),
          updatedAt: p.updatedAt?.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("AdminProductsPage DB fallback:", err.message);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
            Jewellery Designs ({formatted.length})
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#0C1B33] hover:bg-[#C5A059] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </Link>
      </div>

      {/* Interactive Products Table Client */}
      <ProductsListClient initialProducts={formatted} />
    </div>
  );
}
