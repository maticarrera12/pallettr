"use client";

import React, { useEffect } from "react";
import ColorGrid from "./ColorGrid";
import WishlistButton from "../ui/WishlistButton";
import { gsap } from "gsap";

const Hero = () => {
  useEffect(() => {
    // Animación simple y suave para los divs principales
    gsap.fromTo(
      ".hero-section",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.6,
      }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-dvh w-full max-w-full overflow-hidden relative lg:flex-row">
      <div className="hero-section flex-1 flex flex-col justify-between items-start sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold break-words leading-[1.1] tracking-tight mb-8">
            Turn Ideas <br /> Into Art <br /> With Stunning <br />
            <span className="text-tertiary">Pallete Designs</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-theme mb-12 max-w-3xl break-words leading-relaxed font-medium opacity-90">
            Bring your ideas to life with AI-powered color palettes, ready to
            use in your code and designed for perfect accessibility.
          </p>

          <div className="flex flex-row gap-4 sm:gap-6 flex-wrap items-center">
            <WishlistButton size="lg" />
            <p className="text-lg sm:text-xl font-semibold text-primary cursor-pointer hover:text-primary-hover transition-colors">
              Talk to me
            </p>
          </div>
        </div>
      </div>

      <div className="hero-section flex-1 flex flex-col justify-between items-start sm:px-6 lg:px-8 relative z-10">
        <ColorGrid />
      </div>
    </div>
  );
};

export default Hero;
