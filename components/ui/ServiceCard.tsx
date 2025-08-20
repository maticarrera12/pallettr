"use client";
import React, { useRef, useState } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // Posición dentro del card
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-xl p-[3px] transition-all duration-300 flex h-full ${className}`} // <-- agregamos flex y h-full
      style={{
        background: isHovered
          ? `radial-gradient(
          250px circle at var(--x, 50%) var(--y, 50%),
        var(--color-primary),
          transparent 80%
        )`
          : "transparent",
      }}
    >
      <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex-1 flex flex-col">
        {/* Inner content */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="bg-background-light dark:bg-background-dark w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            <div className="text-primary text-xl">{icon}</div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="text-theme font-bold text-lg sm:text-xl md:text-2xl mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-theme text-sm sm:text-base md:text-lg leading-relaxed opacity-80 font-normal">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
