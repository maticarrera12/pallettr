import React from "react";
import WishlistButton from "../ui/WishlistButton";

const WhyUs = () => {
  return (
    <div className="w-full max-w-full overflow-hidden py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:items-stretch">
          {/* First Column - Header + First Two Features */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Top Section - Header */}
            <div>
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-secondary mb-3 break-words leading-tight">
                Design With Purpose
              </h3>
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 break-words leading-tight tracking-tight">
                Imagine Colors <br /> Chosen Just For You
              </h2>
              <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 max-w-2xl break-words leading-relaxed font-medium">
                Focus on Your Vision, We&apos;ll Perfect the Palette.
              </p>

              <div className="flex flex-row gap-3 sm:gap-4 mb-8 flex-wrap relative z-10">
                <WishlistButton size="sm" />
                <button className="text-primary px-4 py-2 rounded-md cursor-pointer transition-colors text-base sm:text-lg font-semibold hover:text-primary-hover">
                  Talk to me
                </button>
              </div>
            </div>

            {/* Bottom Section - First Two Features */}
            <div>
              <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
                Powerful
              </h4>
              <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 break-words leading-relaxed font-normal">
                With AI-driven algorithms, users can explore endless
                possibilities and create professional-grade color palettes
                efficiently.
              </p>

              <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
                Creative
              </h4>
              <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-0 break-words leading-relaxed font-normal">
                The app helps users generate unique and imaginative color
                palettes, sparking creativity in their design projects.
              </p>
            </div>
          </div>

          {/* Second Column - Remaining Features */}
          <div className="flex-1">
            <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
              Intuitive
            </h4>
            <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 break-words leading-relaxed font-normal">
              The interface is user-friendly and straightforward, making palette
              creation seamless and enjoyable.
            </p>

            <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
              Inspiring
            </h4>
            <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 break-words leading-relaxed font-normal">
              It provides color combinations that motivate designers and spark
              new ideas for their work.
            </p>

            <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
              Modern
            </h4>
            <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 break-words leading-relaxed font-normal">
              The design and technology behind the app reflect current trends in
              UX/UI and AI-driven design tools.
            </p>

            <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
              Dynamic
            </h4>
            <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 break-words leading-relaxed font-normal">
              Palettes are generated in real-time, adapting to user prompts and
              preferences for a personalized experience.
            </p>

            <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
              Vibrant
            </h4>
            <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 break-words leading-relaxed font-normal">
              The app emphasizes bold and lively colors that make any design
              stand out.
            </p>

            <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 break-words leading-tight">
              Elegant
            </h4>
            <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-0 break-words leading-relaxed font-normal">
              The resulting palettes and the UI itself maintain a sense of
              sophistication and style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
