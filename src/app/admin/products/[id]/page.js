import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProductBySlug } from "@/lib/product.js";
import ProductFormClient from "@/components/admin/ProductFormClient";

export const metadata = {
  title: "Edit Product | UNJ Admin",
};

export default async function EditProductPage({ params }) {
  const { id } = await params;

  let product = await getProductById(id);
  if (!product) {
    product = await getProductBySlug(id);
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Link href="/admin/products" className="hover:text-[#C5A059]">Products</Link>
            <span>›</span>
            <span className="truncate max-w-xs">{product.name}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
            Edit Jewellery Piece
          </h1>
        </div>
        <Link
          href="/admin/products"
          className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#0C1B33]"
        >
          Back to List
        </Link>
      </div>

      <ProductFormClient initialData={product} isEdit={true} />
    </div>
  );
}
