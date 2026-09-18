import React from "react";

export default function Input({
  label,
  error,
  className = "",
  id,
  type = "text",
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold text-[#0C1B33] uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-4 py-2.5 bg-white border border-[#C5A059]/30 rounded-xl text-sm text-[#0C1B33] placeholder:text-gray-400 focus:outline-none focus:border-[#0C1B33] focus:ring-1 focus:ring-[#0C1B33] transition-all ${
          error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
    </div>
  );
}
