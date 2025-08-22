import React from "react";

interface TalkToMeButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TalkToMeButton: React.FC<TalkToMeButtonProps> = ({ 
  size = "md", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "text-sm gap-1 px-3 py-1.5",
    md: "text-base gap-1 px-4 py-2", 
    lg: "text-lg gap-2 px-6 py-3"
  };

  const arrowSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div
      className={`group flex items-center transform  ${sizeClasses[size]} rounded-md cursor-pointer transition-all duration-300 hover:translate-x-2.5 ${className}`}
    >
      <span className="text-primary font-semibold transform  group-hover:text-primary-hover group-hover:translate-x-1 transition-colors cursor-pointer">
        Talk to me
      </span>
      <svg
        className={`${arrowSizes[size]} text-primary transition-all duration-300 group-hover:text-primary-hover group-hover:translate-x-1`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </div>
  );
};

export default TalkToMeButton;
