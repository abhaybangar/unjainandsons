"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminHeader({ onToggleMobileSidebar, user: initialUser }) {
  const { data: session } = useSession();
  const user = session?.user || initialUser;

  return (
    <header className="h-16 bg-white border-b border-[#C5A059]/15 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm w-full">
      {/* Left: Mobile Hamburger Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu Toggle (Mobile only) */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[#0C1B33] hover:bg-[#FAF6EE] border border-[#C5A059]/20 cursor-pointer bg-transparent"
          aria-label="Open sidebar menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="hidden sm:inline text-gray-500 font-medium">Store Operations</span>
          <span className="hidden sm:inline text-gray-300">/</span>
          <span className="font-bold text-[#0C1B33] uppercase tracking-wider text-[11px] sm:text-xs">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Right: Quick Action & User Status */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick action button */}
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1 bg-[#0C1B33] hover:bg-[#C5A059] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden xs:inline">Add</span> Design
        </Link>

        {/* User profile & sign out */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-[#0C1B33] leading-none truncate max-w-[120px]">
              {user?.name || "Admin"}
            </span>
            <span className="text-[8px] font-bold text-[#C5A059] uppercase tracking-widest mt-0.5">
              {user?.role || "ADMIN"}
            </span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Sign out"
            className="p-1.5 sm:p-2 rounded-full hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer border-none bg-transparent"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
