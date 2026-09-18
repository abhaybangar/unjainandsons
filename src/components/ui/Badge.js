import React from "react";

export default function Badge({
  children,
  variant = "navy",
  className = "",
  size = "md",
}) {
  const variants = {
    navy: "bg-[#0C1B33] text-white border-transparent",
    gold: "bg-[#C5A059] text-white border-transparent",
    outline: "bg-transparent text-[#C5A059] border-[#C5A059]",
    light: "bg-[#FAF2EA] text-[#0C1B33] border-[#C5A059]/20",
    success: "bg-emerald-800 text-white border-transparent",
  };

  const sizes = {
    sm: "text-[9px] px-1.5 py-0.5",
    md: "text-[10px] px-2 py-0.5",
    lg: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={`inline-flex items-center uppercase font-bold tracking-wider rounded-md border ${
        variants[variant] || variants.navy
      } ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </span>
  );
}
