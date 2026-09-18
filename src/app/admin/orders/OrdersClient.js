"use client";

import { useState, useTransition } from "react";
import { updateOrderStatusAction } from "@/actions/admin.js";

const STATUS_OPTIONS = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrdersClient({ initialOrders = [] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  const filtered = orders.filter((o) => {
    if (selectedStatus !== "ALL" && o.orderStatus !== selectedStatus) return false;
    return true;
  });

  const handleStatusChange = (orderId, newStatus) => {
    startTransition(async () => {
      const res = await updateOrderStatusAction(orderId, newStatus);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      } else {
        alert(`Failed to update status: ${res.error}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["ALL", ...STATUS_OPTIONS].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
              selectedStatus === st
                ? "bg-[#0C1B33] text-white border-[#0C1B33]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#C5A059]"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders List Table */}
      <div className="bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No orders found matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#FAF6EE] border-b border-[#C5A059]/15 text-[#0C1B33] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Order Details</th>
                  <th className="py-3.5 px-4">Customer & Address</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Status & Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-[#FAF6EE]/30 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#0C1B33] text-xs">
                        {order.orderNumber || "ZIV-1001"}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <span className="inline-block mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Payment: {order.paymentStatus || "PAID"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <p className="font-bold text-[#0C1B33]">
                        {order.shippingAddress?.fullName || order.guestEmail || "Direct Customer"}
                      </p>
                      <p className="text-[11px] text-gray-500">{order.shippingAddress?.phone}</p>
                      <p className="text-[10px] text-gray-400 truncate max-w-xs">
                        {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.pincode}
                      </p>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1 max-w-xs">
                        {order.items?.map((item, idx) => (
                          <p key={idx} className="text-[11px] text-[#0C1B33] truncate">
                            {item.quantity}x <span className="font-semibold">{item.name}</span>
                          </p>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-serif font-bold text-sm text-[#0C1B33]">
                      ₹{order.total?.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={order.orderStatus || "PLACED"}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={isPending}
                        className="px-3 py-1.5 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-xl text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-[#0C1B33]"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
