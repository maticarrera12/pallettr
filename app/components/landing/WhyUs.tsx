import React from "react";
import WishlistButton from "../ui/WishlistButton";
import TalkToMeButton from "../ui/TalkToMeButton";

const WhyUs = () => {
  return (
    <div
      id="whyus"
      className="relative w-full max-w-full overflow-hidden py-16 border-t border-border"
    >
      {/* --- Fondo Blur --- */}
      <div className="absolute inset-0 -z-10">
        {/* Mancha grande difuminada - starts from top, half circle visible */}
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/20 rounded-full blur-3xl opacity-90 dark:opacity-40"></div>

        {/* Extra para darle realismo */}
        <div className="absolute bottom-[-100px] right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-secondary/20 via-tertiary/30 to-primary/20 rounded-full blur-2xl opacity-50 dark:opacity-30"></div>
      </div>

      {/* --- Contenido --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:items-stretch">
          {/* First Column */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-secondary mb-3 leading-tight">
                Design With Purpose
              </h3>
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-tight">
                Imagine Colors <br /> Chosen Just For You
              </h2>
              <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed font-medium">
                Focus on Your Vision, We&apos;ll Perfect the Palette.
              </p>

              <div className="flex flex-row gap-3 sm:gap-4 mb-8 flex-wrap relative z-10">
                <WishlistButton size="sm" />
                <TalkToMeButton size="md" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 leading-tight">
                Powerful
              </h4>
              <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-8 leading-relaxed">
                With AI-driven algorithms, users can explore endless
                possibilities and create professional-grade color palettes
                efficiently.
              </p>

              <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 leading-tight">
                Creative
              </h4>
              <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 mb-0 leading-relaxed">
                The app helps users generate unique and imaginative color
                palettes, sparking creativity in their design projects.
              </p>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex-1">
            {[
              {
                title: "Intuitive",
                text: "The interface is user-friendly and straightforward, making palette creation seamless and enjoyable.",
              },
              {
                title: "Inspiring",
                text: "It provides color combinations that motivate designers and spark new ideas for their work.",
              },
              {
                title: "Modern",
                text: "The design and technology behind the app reflect current trends in UX/UI and AI-driven design tools.",
              },
              {
                title: "Dynamic",
                text: "Palettes are generated in real-time, adapting to user prompts and preferences for a personalized experience.",
              },
              {
                title: "Vibrant",
                text: "The app emphasizes bold and lively colors that make any design stand out.",
              },
              {
                title: "Elegant",
                text: "The resulting palettes and the UI itself maintain a sense of sophistication and style.",
              },
            ].map(({ title, text }, i) => (
              <div key={i} className="mb-8 last:mb-0">
                <h4 className="font-bold text-xl sm:text-2xl md:text-3xl text-theme mb-4 leading-tight">
                  {title}
                </h4>
                <p className="text-base sm:text-lg text-dark-900 dark:text-gray-300 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
