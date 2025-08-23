"use client";

import React, { useEffect } from "react";
import ColorGrid from "./ColorGrid";
import WishlistButton from "../ui/WishlistButton";
import TalkToMeButton from "../ui/TalkToMeButton";
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
    <div
      id="home"
      className="flex flex-col min-h-dvh w-full max-w-full overflow-hidden relative lg:flex-row px-4 sm:px-6 lg:px-8 pt-8"
    >
      <div className="hero-section flex-1 flex flex-col  items-start sm:px-4 lg:px-8 relative z-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold break-words leading-[1.1] tracking-tight mb-4">
            Turn Ideas <br /> Into Art <br /> With Stunning <br />
            <span className="text-tertiary">Pallete Designs</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-theme mb-4 max-w-3xl break-words leading-relaxed font-medium opacity-90">
            Bring your ideas to life with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI-powered color palettes
            </span>
            , ready to use in your code and{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              designed for perfect accessibility
            </span>
            .
          </p>

          <div className="flex flex-row gap-4 sm:gap-6 flex-wrap items-center">
            <WishlistButton size="lg" />
            <TalkToMeButton size="lg" />
          </div>
        </div>
      </div>

      <div className="hero-section flex-1 flex flex-col justify-center items-center sm:px-6 lg:px-8 relative z-10">
        <ColorGrid />
      </div>
    </div>
  );
};

export default Hero;
