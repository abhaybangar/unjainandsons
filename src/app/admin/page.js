import { connectDB } from "@/lib/mongodb.js";
import Product from "@/models/Product.js";
import Category from "@/models/Category.js";
import Order from "@/models/Order.js";
import User from "@/models/User.js";
import Link from "next/link";
import Image from "next/image";

export default async function AdminDashboardPage() {
  await connectDB();

  const [productCount, categoryCount, userCount, orders, lowStockProducts] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    User.countDocuments(),
    Order.find({}).sort({ createdAt: -1 }).limit(8).lean(),
    Product.find({ stock: { $lte: 6 } }).limit(5).lean(),
  ]);

  const allOrders = await Order.find({}).select("total orderStatus").lean();
  const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = allOrders.length;

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      subtitle: `${totalOrders} orders processed`,
      icon: (
        <svg className="w-6 h-6 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Active Products",
      value: productCount,
      subtitle: `Across ${categoryCount} categories`,
      icon: (
        <svg className="w-6 h-6 text-[#0C1B33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Total Orders",
      value: totalOrders,
      subtitle: "Lifetime customer orders",
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: "Registered Customers",
      value: userCount,
      subtitle: "Verified boutique members",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
            EXECUTIVE OVERVIEW
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
            Store Performance Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="bg-[#0C1B33] hover:bg-[#C5A059] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            + New Design
          </Link>
          <Link
            href="/admin/orders"
            className="border border-[#C5A059] text-[#0C1B33] hover:bg-[#FAF6EE] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-2xl border border-[#C5A059]/15 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/20">
                {card.icon}
              </div>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
                {card.value}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 font-medium">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Section: Low Stock + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#0C1B33]">Recent Orders</h2>
              <p className="text-xs text-gray-400">Latest customer transactions</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#C5A059] hover:text-[#0C1B33] uppercase tracking-wider"
            >
              View All →
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              No orders placed yet. Orders will appear here in real time.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Order #</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {orders.map((o) => (
                    <tr key={o._id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                      <td className="py-3 font-bold text-[#0C1B33]">{o.orderNumber || "ZIV-1001"}</td>
                      <td className="py-3 text-gray-600">{o.shippingAddress?.fullName || o.guestEmail || "Customer"}</td>
                      <td className="py-3 font-serif font-bold text-[#0C1B33]">₹{o.total?.toLocaleString("en-IN")}</td>
                      <td className="py-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                          {o.orderStatus || "PLACED"}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 1 Col: Low Stock Alerts */}
        <div className="bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#0C1B33]">Inventory Alerts</h2>
                <p className="text-xs text-rose-500 font-medium">Items with low stock (≤ 6)</p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-bold text-[#C5A059] hover:text-[#0C1B33] uppercase tracking-wider"
              >
                Manage
              </Link>
            </div>

            {lowStockProducts.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-xs">
                All designs have healthy inventory levels.
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/15"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white shrink-0 border border-gray-200">
                        <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0C1B33] truncate">{p.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{p.karat} · ₹{p.price?.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <span className="shrink-0 bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                      {p.stock} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              href="/admin/products"
              className="block w-full text-center py-2.5 bg-[#FAF6EE] hover:bg-[#0C1B33] text-[#0C1B33] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              View Full Product Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
