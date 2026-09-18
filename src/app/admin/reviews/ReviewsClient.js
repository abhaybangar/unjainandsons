"use client";

import { useState, useTransition } from "react";
import { approveReviewAction, deleteReviewAction } from "@/actions/admin.js";

export default function ReviewsClient({ initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isPending, startTransition] = useTransition();

  const handleToggleApproval = (id, currentStatus) => {
    startTransition(async () => {
      const res = await approveReviewAction(id, !currentStatus);
      if (res.success) {
        setReviews((prev) =>
          prev.map((r) => (r._id === id ? { ...r, isApproved: !currentStatus } : r))
        );
      }
    });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this customer review?")) {
      startTransition(async () => {
        const res = await deleteReviewAction(id);
        if (res.success) {
          setReviews((prev) => prev.filter((r) => r._id !== id));
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm overflow-hidden">
        {reviews.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No customer reviews currently pending moderation.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reviews.map((rev) => (
              <div key={rev._id} className="p-6 flex flex-col sm:flex-row justify-between items-start gap-4 hover:bg-[#FAF6EE]/30 transition-colors">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0C1B33]">{rev.userName}</span>
                    <span className="text-[#C5A059] text-xs">
                      {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        rev.isApproved
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {rev.isApproved ? "Approved" : "Pending Review"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-light italic leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Product: {rev.product?.name || "Jewellery Piece"}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleApproval(rev._id, rev.isApproved)}
                    disabled={isPending}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none ${
                      rev.isApproved
                        ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    {rev.isApproved ? "Unapprove" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleDelete(rev._id)}
                    disabled={isPending}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
