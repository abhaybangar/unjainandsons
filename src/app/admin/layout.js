import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth.js";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Dashboard | Uttamchand Nemichand Jain & Sons",
  description: "Administrative control center for Uttamchand Nemichand Jain & Sons.",
};

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-2xl border border-rose-200 shadow-xl">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#0C1B33] mb-2">Access Restricted</h1>
          <p className="text-xs text-gray-600 mb-6">
            Your account ({user.email}) does not have administrative privileges. Please log in with an administrator account to access this area.
          </p>
          <a
            href="/"
            className="inline-block bg-[#0C1B33] hover:bg-[#C5A059] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full transition-all"
          >
            Return to Boutique
          </a>
        </div>
      </div>
    );
  }

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}
