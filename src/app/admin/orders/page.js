import { connectDB } from "@/lib/mongodb.js";
import Order from "@/models/Order.js";
import OrdersClient from "./OrdersClient";

export const metadata = {
  title: "Orders Management | UNJ Admin",
};

export default async function AdminOrdersPage() {
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

  const formatted = orders.map((o) => ({
    ...o,
    _id: o._id.toString(),
    createdAt: o.createdAt?.toISOString(),
    updatedAt: o.updatedAt?.toISOString(),
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
          FULFILLMENT & PROCESSING
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
          Customer Orders ({formatted.length})
        </h1>
      </div>

      <OrdersClient initialOrders={formatted} />
    </div>
  );
}
