"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { createCategoryAction, deleteCategoryAction } from "@/actions/admin.js";

export default function CategoriesClient({ initialCategories = [] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/earings.jpeg");
  const [error, setError] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setError("");
    startTransition(async () => {
      const res = await createCategoryAction({ name, description, image });
      if (res.success) {
        setCategories((prev) => [...prev, res.category]);
        setIsCreating(false);
        setName("");
        setDescription("");
      } else {
        setError(res.error || "Failed to create category");
      }
    });
  };

  const handleDelete = (id, catName) => {
    if (confirm(`Delete category "${catName}"?`)) {
      startTransition(async () => {
        const res = await deleteCategoryAction(id);
        if (res.success) {
          setCategories((prev) => prev.filter((c) => c._id !== id));
        } else {
          alert(`Failed to delete: ${res.error}`);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Trigger */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-[#0C1B33] hover:bg-[#C5A059] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none shadow-sm"
        >
          {isCreating ? "Cancel" : "+ Add Category"}
        </button>
      </div>

      {/* Creation Modal Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-md space-y-4 max-w-xl">
          <h3 className="font-serif text-lg font-bold text-[#0C1B33]">New Category</h3>
          {error && <p className="text-xs text-rose-500">{error}</p>}

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Category Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mangalsutras"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Description</label>
            <input
              type="text"
              placeholder="Brief description of the category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#C5A059] hover:bg-[#0C1B33] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border-none"
          >
            {isPending ? "Creating..." : "Save Category"}
          </button>
        </form>
      )}

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm overflow-hidden flex flex-col justify-between p-5"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-xl bg-[#FAF2EA] overflow-hidden border border-gray-200 shrink-0">
                <Image src={cat.image || "/earings.jpeg"} alt={cat.name} fill className="object-contain p-2" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif text-lg font-bold text-[#0C1B33] capitalize">{cat.name}</h4>
                <p className="text-[10px] text-[#C5A059] font-mono font-semibold uppercase">slug: {cat.slug}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description || "No description provided."}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-medium">Active in Store</span>
              <button
                onClick={() => handleDelete(cat._id, cat.name)}
                disabled={isPending}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider cursor-pointer border-none bg-transparent"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
