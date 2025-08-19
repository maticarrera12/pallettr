"use client";

import React from "react";

const ColorGrid = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full max-w-full overflow-hidden">
      {/* GRID */}
      <div
        className="
          grid grid-cols-3 grid-rows-3 gap-2 
          w-[250px] h-[250px] 
          sm:w-[280px] sm:h-[280px] 
          md:w-[350px] md:h-[350px] 
          lg:w-[500px] lg:h-[500px] 
          xl:w-[600px] xl:h-[600px] 
          2xl:w-[700px] 2xl:h-[700px]
          p-2 rounded-lg
          mx-auto
        "
        style={{
          background: `linear-gradient(to right, var(--color-background-light) 50%, var(--color-background-dark) 50%)`,
        }}
      >
        {/* 1: semicirculo negro izq */}
        <div className="w-full h-full bg-text-black rounded-l-full"></div>

        {/* 2: diamante naranja */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2/3 h-2/3 bg-tertiary rotate-45 transform origin-center"></div>
        </div>

        {/* 3 + 6: semicirculo blanco (ocupa 2 filas) */}
        <div className="w-full h-full bg-card-light rounded-r-full row-span-2"></div>

        {/* 4: cuadrado azul con borde */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-[16px] border-secondary"></div>
        </div>

        {/* 5: círculo verde */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-primary rounded-full"></div>
        </div>

        {/* 7: cuarto de círculo verde */}
        <div className="w-full h-full bg-primary rounded-tl-full"></div>

        {/* 8: triángulo con bordes */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-[16px] border-card-dark"></div>
        </div>

        {/* 9: semicírculo naranja */}
        <div className="w-full h-full bg-tertiary rounded-tr-full"></div>
      </div>

      {/* INPUT + BOTÓN */}
      <div className="flex mt-8 gap-4 items-center w-full max-w-[250px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] px-2 mb-8">
        <input
          type="text"
          placeholder="write here your prompt"
          className="text-primary px-4 py-2 outline-none text-md font-medium flex-[2] border border-primary rounded-xl focus:border-primary transition-colors"
        />
        <button className="bg-primary px-4 py-2 text-white font-semibold hover:bg-primary-hover transition-colors rounded-xl flex-1">
          Try
        </button>
      </div>
    </div>
  );
};

export default ColorGrid;
