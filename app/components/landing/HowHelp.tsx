import React from "react";
import ServiceCard from "../ui/ServiceCard";

const HowHelp = () => {
  return (
    <div id="features" className="relative w-full max-w-full overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* --- Continuation of tertiary blur from WhyUs --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-[300px] right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-secondary/20 via-tertiary/30 to-primary/20 rounded-full blur-2xl opacity-50 dark:opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-theme mb-6 leading-tight tracking-tight">
            How Can We Help You?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-theme opacity-80 max-w-4xl mx-auto leading-relaxed font-medium">
          We turn your ideas into beautiful color combinations effortlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {/* Example Service Card */}
          <ServiceCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
            title="Smart Palette Generation"
            description="Our AI analyzes your prompts and creates harmonious color combinations that work perfectly together for any design project."
          />
          <ServiceCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
            title="Smart Palette Generation"
            description="Our AI analyzes your prompts and creates harmonious color combinations that work perfectly together for any design project."
          />
          <ServiceCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
            title="Smart Palette Generation"
            description="Our AI analyzes your prompts and creates harmonious color combinations that work perfectly together for any design project."
          />
          <ServiceCard
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
            title="Smart Palette Generation"
            description="Our AI analyzes your prompts and creates harmonious color combinations that work perfectly together for any design project."
          />
        </div>
      </div>
    </div>
  );
};

export default HowHelp;
