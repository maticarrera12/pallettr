"use client";

import React, { useState } from "react";
import { usePaletteGenerator } from "../../app/hooks/usePaletteGenerator";

const ColorGrid = () => {
  const [prompt, setPrompt] = useState("");
  const { isLoading, error, currentPalette, generatePalette, resetPalette } =
    usePaletteGenerator();

  const handleGeneratePalette = async () => {
    if (!prompt.trim()) return;
    await generatePalette(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGeneratePalette();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-full overflow-hidden">
      {/* Color Grid - This will update dynamically with the new palette */}
      <div
        className="
          grid grid-cols-3 grid-rows-3 gap-0 
          w-[320px] h-[320px] 
          sm:w-[350px] sm:h-[350px] 
          md:w-[400px] md:h-[400px] 
          lg:w-[500px] lg:h-[500px] 
          xl:w-[600px] xl:h-[600px] 
          2xl:w-[700px] 2xl:h-[700px] 
          rounded-lg overflow-hidden
          mx-auto
          transition-all duration-500 ease-in-out
        "
        style={{
          background: `linear-gradient(to right, var(--color-background-light) 50%, var(--color-background-dark) 50%)`,
        }}
      >
        {/* 1: quarter circle primary */}
        <div className="w-full h-full bg-primary rounded-br-full transition-colors duration-500"></div>

        {/* 2: diamond tertiary */}
        <div className="w-full h-full bg-tertiary transition-colors duration-500"></div>

        {/* 3: right semicircle card-light (spans 2 rows) */}
        <div className="w-full h-full bg-card-light-fixed rounded-l-full row-span-2 transition-colors duration-500"></div>

        {/* 4: square outline card-dark */}
        <div className="w-full h-full border-8 md:border-[16px] border-card-dark bg-transparent transition-colors duration-500"></div>

        {/* 5: full circle primary */}
        <div className="w-full h-full bg-primary rounded-full transition-colors duration-500"></div>

        {/* 7: quarter circle text-black bottom left */}
        <div
          className="w-full h-full rounded-tr-full transition-colors duration-500"
          style={{ backgroundColor: "var(--color-text-black)" }}
        ></div>

        {/* 8: triangle text-black filled */}
        <div className="w-full h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,0 100,100 0,100"
              fill="var(--color-secondary)"
              className="transition-colors duration-500"
            />
          </svg>
        </div>

        {/* 9: quarter circle tertiary bottom right */}
        <div className="w-full h-full bg-tertiary rounded-tl-full transition-colors duration-500"></div>
      </div>

      {/* Input and Button Section */}
      <div
        className="
        flex flex-col lg:flex-row mt-8 gap-2 items-center px-2 mb-8
        w-[320px] sm:w-[350px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]
        mx-auto
      "
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your ideal color palette..."
          className="text-primary px-4 py-2 outline-none text-md font-medium w-full lg:w-2/3 border border-primary rounded-xl focus:border-primary transition-colors"
          disabled={isLoading}
        />
        <button
          onClick={handleGeneratePalette}
          disabled={isLoading || !prompt.trim()}
          className="bg-primary text-white font-semibold hover:bg-primary-hover active:bg-primary-active disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xl px-4 py-2 w-full lg:flex-1"
        >
          {isLoading ? "Generating..." : "Try It"}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ColorGrid;
