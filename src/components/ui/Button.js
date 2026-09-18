"use client";

import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-[11px]",
    md: "px-6 py-2.5 text-xs",
    lg: "px-8 py-3 text-sm",
  };

  const variantStyles = {
    primary:
      "bg-[#0C1B33] hover:bg-[#C5A059] text-white shadow-md hover:shadow-lg active:scale-[0.98]",
    gold: "bg-[#C5A059] hover:bg-[#0C1B33] text-white shadow-md hover:shadow-lg active:scale-[0.98]",
    outline:
      "border border-[#C5A059] text-[#0C1B33] hover:bg-[#C5A059] hover:text-white bg-transparent",
    ghost:
      "bg-transparent text-[#0C1B33] hover:bg-[#FAF6EE] hover:text-[#C5A059]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
