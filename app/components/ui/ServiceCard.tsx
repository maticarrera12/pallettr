import React from "react";

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
  return (
    <div
      className={`bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="flex items-center space-x-4">
        {/* Icon container with background-light */}
        <div className="bg-background-light dark:bg-background-dark w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="text-primary text-xl">{icon}</div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-theme font-bold text-lg sm:text-xl md:text-2xl mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-theme text-sm sm:text-base md:text-lg leading-relaxed opacity-80 font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
