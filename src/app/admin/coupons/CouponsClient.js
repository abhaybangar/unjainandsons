"use client";

import { useState, useTransition } from "react";
import { createCouponAction, deleteCouponAction } from "@/actions/admin.js";

export default function CouponsClient({ initialCoupons = [] }) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrderAmount, setMinOrderAmount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [error, setError] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setError("");
    startTransition(async () => {
      const res = await createCouponAction({
        code,
        discountType,
        discountValue,
        minOrderAmount,
        expiresAt,
      });

      if (res.success) {
        setCoupons((prev) => [...prev, res.coupon]);
        setIsCreating(false);
        setCode("");
      } else {
        setError(res.error || "Failed to create coupon.");
      }
    });
  };

  const handleDelete = (id, couponCode) => {
    if (confirm(`Delete coupon "${couponCode}"?`)) {
      startTransition(async () => {
        const res = await deleteCouponAction(id);
        if (res.success) {
          setCoupons((prev) => prev.filter((c) => c._id !== id));
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
          {isCreating ? "Cancel" : "+ Create Coupon Code"}
        </button>
      </div>

      {/* Creation Modal Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-md space-y-4 max-w-xl">
          <h3 className="font-serif text-lg font-bold text-[#0C1B33]">New Promo Code</h3>
          {error && <p className="text-xs text-rose-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. FESTIVE2026"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-mono font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Flat Amount (₹)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">
                Discount Value ({discountType === "PERCENTAGE" ? "%" : "₹"}) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Min Order Amount (₹)</label>
              <input
                type="number"
                min="0"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-[#0C1B33] block mb-1">Expiry Date *</label>
            <input
              type="date"
              required
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE]/50 border border-gray-200 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#C5A059] hover:bg-[#0C1B33] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border-none"
          >
            {isPending ? "Creating..." : "Save & Activate Coupon"}
          </button>
        </form>
      )}

      {/* Grid of Coupons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.length === 0 ? (
          <div className="col-span-3 bg-white p-12 rounded-2xl border border-gray-200 text-center text-xs text-gray-400">
            No active coupon codes found. Click &quot;+ Create Coupon Code&quot; to generate promotional offers.
          </div>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white rounded-2xl border border-[#C5A059]/20 shadow-sm p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#0C1B33] text-[#C5A059] px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-widest uppercase">
                    {coupon.code}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <p className="font-serif text-2xl font-bold text-[#0C1B33]">
                  {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT OFF`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Min Order: ₹{coupon.minOrderAmount?.toLocaleString("en-IN") || "0"}
                </p>
                <p className="text-[10px] text-gray-400 mt-2">
                  Expires: {new Date(coupon.expiresAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => handleDelete(coupon._id, coupon.code)}
                  disabled={isPending}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider cursor-pointer border-none bg-transparent"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
