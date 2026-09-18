import React from "react";

export default function Container({ children, className = "", size = "default", ...props }) {
  const sizes = {
    small: "max-w-4xl",
    default: "max-w-7xl",
    large: "max-w-[1400px]",
    full: "w-full",
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
