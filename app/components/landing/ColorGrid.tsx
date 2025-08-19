"use client";

import React from "react";

const ColorGrid = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full max-w-full overflow-hidden">
      {/* GRID */}
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
          
        "
        style={{
          background: `linear-gradient(to right, var(--color-background-light) 50%, var(--color-background-dark) 50%)`,
        }}
      >
        {/* 1: quarter circle primary */}
        <div className="w-full h-full bg-primary rounded-br-full"></div>

        {/* 2: diamond tertiary */}
        <div className="w-full h-full bg-tertiary "></div>

        {/* 3: right semicircle card-light (spans 2 rows) */}
        <div className="w-full h-full bg-card-light rounded-l-full row-span-2"></div>

        {/* 4: square outline card-dark */}
        <div className="w-full h-full border-8 md:border-[16px] border-card-dark bg-transparent"></div>

        {/* 5: full circle primary */}
        <div className="w-full h-full bg-primary rounded-full"></div>

        {/* 7: quarter circle text-black bottom left */}
        <div className="w-full h-full rounded-tr-full" style={{backgroundColor: 'var(--color-text-black)'}}></div>

        {/* 8: triangle text-black filled */}
        <div className="w-full h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,0 100,100 0,100" 
                     fill="var(--color-secondary)" />
          </svg>
        </div>

        {/* 9: quarter circle tertiary bottom right */}
        <div className="w-full h-full bg-tertiary rounded-tl-full"></div>
      </div>

      <div className="
        flex flex-col lg:flex-row mt-8 gap-2 items-center px-2 mb-8
        w-[320px] sm:w-[350px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]
        mx-auto
      ">
        <input
          type="text"
          placeholder="Write here your prompt"
          className="text-primary px-4 py-2 outline-none text-md font-medium w-full lg:w-2/3 border border-primary rounded-xl focus:border-primary transition-colors"
        />
        <button className="bg-primary text-white font-semibold hover:bg-primary-hover transition-colors rounded-xl px-4 py-2 w-full lg:flex-1">
          Try It
        </button>
      </div>
    </div>
  );
};

export default ColorGrid;
