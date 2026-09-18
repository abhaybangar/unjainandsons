import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.js";

export const metadata = {
  title: "Customers | UNJ Admin",
};

export default async function AdminCustomersPage() {
  await connectDB();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
          USER BASE
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1B33]">
          Registered Customers & Staff ({users.length})
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#C5A059]/15 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6EE] border-b border-[#C5A059]/15 text-[#0C1B33] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {users.map((user) => (
                <tr key={user._id.toString()} className="hover:bg-[#FAF6EE]/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0C1B33] text-[#C5A059] flex items-center justify-center font-bold text-[10px]">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <span className="font-bold text-[#0C1B33]">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3.5 px-4 text-gray-500">{user.phone || "—"}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
