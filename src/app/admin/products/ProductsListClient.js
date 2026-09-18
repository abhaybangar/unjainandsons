"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProductAction } from "@/actions/admin.js";

export default function ProductsListClient({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPending, startTransition] = useTransition();

  const categories = ["All", ...new Set(initialProducts.map((p) => p.category))];

  const filtered = products.filter((p) => {
    if (selectedCategory !== "All" && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.karat.toLowerCase().includes(q) ||
        String(p.id).includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalog?`)) {
      startTransition(async () => {
        const res = await deleteProductAction(id);
        if (res.success) {
          setProducts((prev) => prev.filter((item) => item.id !== id && item._id !== id));
        } else {
          alert(`Failed to delete: ${res.error}`);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#C5A059]/15 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, karat, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6EE]/50 border border-gray-200 focus:border-[#C5A059] rounded-xl py-2 pl-10 pr-4 text-xs text-[#0C1B33] focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-[#0C1B33] text-white border-[#0C1B33]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#C5A059]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6EE] border-b border-[#C5A059]/15 text-[#0C1B33] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Design</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Purity / Metal</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No products matched your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id || product._id} className="hover:bg-[#FAF6EE]/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-[#FAF2EA] overflow-hidden border border-gray-200 shrink-0">
                          <Image src={product.image || "/oshinika_neckwear.png"} alt={product.name} fill className="object-contain p-1" />
                        </div>
                        <div>
                          <p className="font-bold text-[#0C1B33] text-xs">{product.name}</p>
                          <span className="text-[10px] text-gray-400 uppercase font-mono">ID: {product.id} · {product.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize text-gray-700">{product.category}</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#0C1B33] text-[#C5A059] px-2 py-0.5 rounded text-[10px] font-bold uppercase mr-1">
                        {product.karat}
                      </span>
                      <span className="text-gray-500 text-[11px]">{product.metal}</span>
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-sm text-[#0C1B33]">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          product.stock <= 5
                            ? "bg-rose-100 text-rose-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id || product._id}`}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF6EE] text-[#0C1B33] hover:bg-[#C5A059] hover:text-white font-bold uppercase text-[10px] tracking-wider transition-all"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id || product._id, product.name)}
                          disabled={isPending}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer border-none"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
