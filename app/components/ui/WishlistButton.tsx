import React from "react";

interface WishlistButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  className = "",
  size = "md",
  variant = "primary",
}) => {
  const baseClasses =
    "font-semibold transition-colors cursor-pointer rounded-lg";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm leading-tight",
    md: "px-4 py-2 text-base leading-tight",
    lg: "px-6 py-3 text-lg leading-tight",
  };

  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-hover active:bg-primary-active text-white",
    secondary:
      "bg-secondary hover:bg-secondary-hover active:bg-secondary-active text-white",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return <button type="button" className={classes}>Wishlist</button>;
};

export default WishlistButton;
