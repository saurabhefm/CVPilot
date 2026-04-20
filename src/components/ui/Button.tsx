"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-mint text-white hover:bg-[#0ea572] shadow-[0_0_15px_rgba(16,185,129,0.3)]",
      secondary: "bg-brand-charcoal text-white hover:bg-slate-800",
      outline: "border-2 border-brand-mint text-brand-mint hover:bg-brand-mint hover:text-white",
      ghost: "hover:bg-slate-100 text-slate-700",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm font-medium",
      md: "px-6 py-2.5 text-base font-semibold",
      lg: "px-8 py-3.5 text-lg font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
