import React from "react";

export default function Heading({
  children,
  level = 2,
  subtitle,
  align = "center",
  className = "",
  goldBar = true,
}) {
  const Tag = `h${level}`;

  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align] || "text-center items-center";

  const sizeClasses = {
    1: "font-serif text-3xl sm:text-5xl font-bold text-[#0C1B33]",
    2: "font-serif text-2xl sm:text-4xl font-bold text-[#0C1B33]",
    3: "font-serif text-xl sm:text-2xl font-bold text-[#0C1B33]",
    4: "font-sans text-lg font-semibold text-[#0C1B33]",
  }[level] || "font-serif text-2xl sm:text-4xl font-bold text-[#0C1B33]";

  return (
    <div className={`flex flex-col mb-8 ${alignment} ${className}`}>
      {subtitle && (
        <span className="text-[#C5A059] font-sans tracking-[0.25em] text-xs font-bold uppercase mb-2">
          {subtitle}
        </span>
      )}
      <Tag className={sizeClasses}>{children}</Tag>
      {goldBar && <div className="h-0.5 w-16 bg-[#C5A059] mt-3" />}
    </div>
  );
}
