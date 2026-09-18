import React from "react";

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-[#EFE9E2] rounded-xl ${className}`}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
