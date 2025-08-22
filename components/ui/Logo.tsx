"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = memo(({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <Link
      href="/"
      className={`flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 ${className}`}
      aria-label="Pallettr home"
    >
      <Image
        src="/images/pallettr_base.png"
        alt="Pallettr Logo"
        width={60}
        height={60}
        className={`${sizeClasses[size]} object-contain`}
        priority
      />
      <span
        className={`font-bold text-primary leading-tight tracking-tight ${textSizes[size]}`}
      >
        Pallettr
      </span>
    </Link>
  );
});

Logo.displayName = "Logo";

export default Logo;
