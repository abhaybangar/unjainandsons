"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { createCollectionAction, deleteCollectionAction } from "@/actions/admin.js";

export default function CollectionsClient({ initialCollections = [] }) {
  const [collections, setCollections] = useState(initialCollections);
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("/oshinika_neckwear.png");
  const [isFeatured, setIsFeatured] = useState(true);
  const [error, setError] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError("");
    startTransition(async () => {
      const res = await createCollectionAction({
        title,
        subtitle,
        description,
        bannerImage,
        isFeatured,
      });

      if (res.success) {
        setCollections((prev) => [...prev, res.collection]);
        setIsCreating(false);
        setTitle("");
        setSubtitle("");
        setDescription("");
      } else {
        setError(res.error || "Failed to create collection");
      }
    });
  };

  const handleDelete = (id, colTitle) => {
    if (confirm(`Delete collection "${colTitle}"?`)) {
      startTransition(async () => {
        const res = await deleteCollectionAction(id);
        if (res.success) {
          setCollections((prev) => prev.filter((c) => c._id !== id));
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
          {isCreating ? "Cancel" : "+ Add Collection"}
        </button>
      </div>

      {/* Creation Modal Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-md space-y-4 max-w-xl">
          <h3 className="font-serif text-lg font-bold text-[#0C1B33]">New Curated Collection</h3>
          {error && <p className="text-xs text-rose-500">{error}</p>}

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Collection Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Solitaire"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Subtitle / Campaign Tag</label>
            <input
              type="text"
              placeholder="e.g. IGI Certified Diamond Solitaires"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Story behind the collection..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Banner Image URL</label>
            <input
              type="text"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none font-mono"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-[#0C1B33] cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded text-[#C5A059]"
            />
            Show on Featured Collections Page
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#C5A059] hover:bg-[#0C1B33] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border-none"
          >
            {isPending ? "Creating..." : "Save Collection"}
          </button>
        </form>
      )}

      {/* Grid of Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <div
            key={col._id}
            className="bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[16/8] w-full bg-[#FAF2EA] overflow-hidden">
              <Image src={col.bannerImage || "/oshinika_neckwear.png"} alt={col.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B33]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">{col.subtitle}</span>
                <h4 className="font-serif text-xl font-bold">{col.title}</h4>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-gray-600 font-light mb-4">{col.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[10px] font-mono text-gray-400">/{col.slug}</span>
                <button
                  onClick={() => handleDelete(col._id, col.title)}
                  disabled={isPending}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider cursor-pointer border-none bg-transparent"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
