"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createProductAction, updateProductAction } from "@/actions/admin.js";

const CATEGORIES = ["earrings", "rings", "bangles", "chains", "pendants", "necklaces"];
const KARATS = ["14KT", "18KT", "22KT", "24KT"];
const OCCASIONS = ["Daily Wear", "Festive Glow", "Bridal Wear", "Elevated Essentials"];
const GENDERS = ["Women", "Men", "Unisex"];
const METALS = ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"];

export default function ProductFormClient({ initialData = null, isEdit = false }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "necklaces",
    collectionSlug: initialData?.collectionSlug || "bridal-heritage",
    price: initialData?.price || "",
    stock: initialData?.stock || 10,
    image: initialData?.image || "/oshinika_neckwear.png",
    description: initialData?.description || "",
    karat: initialData?.karat || "22KT",
    occasion: initialData?.occasion || "Bridal Wear",
    gender: initialData?.gender || "Women",
    weight: initialData?.weight || "25.0g",
    metal: initialData?.metal || "Yellow Gold",
    stones: initialData?.stones || "None",
    isNew: initialData?.isNew || false,
    isFeatured: initialData?.isFeatured || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image || !formData.description) {
      setError("Please fill in all required fields (Name, Price, Image URL, Description).");
      return;
    }

    setError("");
    setIsSubmitting(true);

    let res;
    if (isEdit) {
      res = await updateProductAction(initialData.id || initialData._id, formData);
    } else {
      res = await createProductAction(formData);
    }

    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1200);
    } else {
      setError(res.error || "Operation failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold">
          ✓ {isEdit ? "Product successfully updated!" : "Product created successfully! Redirecting..."}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0C1B33]">Basic Details</h3>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                Design Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Royal Nizam Emerald Choker"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 focus:border-[#C5A059] rounded-xl text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                Description *
              </label>
              <textarea
                name="description"
                rows={4}
                required
                placeholder="Detailed craft description and stone settings..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 focus:border-[#C5A059] rounded-xl text-sm focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                  Price (₹ INR) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  placeholder="e.g. 185000"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 focus:border-[#C5A059] rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                  Stock Units Available *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  placeholder="10"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 focus:border-[#C5A059] rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Specifications Box */}
          <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0C1B33]">Specifications & Materials</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                  Gold Purity
                </label>
                <select
                  name="karat"
                  value={formData.karat}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  {KARATS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                  Metal Type
                </label>
                <select
                  name="metal"
                  value={formData.metal}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  {METALS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                  Gross Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  placeholder="e.g. 18.5g"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                  Occasion
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  {OCCASIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                  Target Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                Gemstones & Diamonds
              </label>
              <input
                type="text"
                name="stones"
                placeholder="e.g. Natural Pave Diamonds (0.45ct), Zambian Emeralds"
                value={formData.stones}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Image & Categorization */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0C1B33]">Category & Campaign</h3>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-semibold uppercase focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                Collection Theme
              </label>
              <select
                name="collectionSlug"
                value={formData.collectionSlug}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="bridal-heritage">Bridal Heritage</option>
                <option value="royal-solitaire">Royal Solitaire</option>
                <option value="daily-elegance">Daily Elegance</option>
                <option value="festive-glow">Festive Glow</option>
              </select>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0C1B33]">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded text-[#C5A059] focus:ring-[#C5A059]"
                />
                Show on Featured Homepage
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0C1B33]">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="rounded text-[#C5A059] focus:ring-[#C5A059]"
                />
                Mark as &apos;New Arrival&apos;
              </label>
            </div>
          </div>

          {/* Image URL & Preview */}
          <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0C1B33]">Image Asset</h3>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0C1B33] block mb-1.5">
                Image URL or Public Path *
              </label>
              <input
                type="text"
                name="image"
                required
                placeholder="/oshinika_neckwear.png or https://..."
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none"
              />
            </div>

            {/* Live Preview */}
            <div className="relative aspect-square w-full bg-[#FAF2EA] rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
              {formData.image ? (
                <Image src={formData.image} alt="Preview" fill className="object-contain p-4" />
              ) : (
                <span className="text-xs text-gray-400">No Image Preview</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0C1B33] hover:bg-[#C5A059] text-white py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer border-none flex items-center justify-center"
          >
            {isSubmitting
              ? "Saving to Database..."
              : isEdit
              ? "Update Product"
              : "Publish Product to Catalog"}
          </button>
        </div>
      </div>
    </form>
  );
}
