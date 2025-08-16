"use client";

import React from "react";

const ColorGrid = () => {
  return (
    <div className="flex flex-col items-center p-4">
      {/* GRID */}
      <div
        className="grid grid-cols-3 grid-rows-3 gap-2 w-[350px] h-[350px] p-2 rounded-lg"
        style={{
          background: `linear-gradient(to right, var(--color-background-light) 50%, var(--color-background-dark) 50%)`
        }}
      >
        {/* 1: semicirculo negro izq */}
        <div className="bg-text-black rounded-l-full"></div>

        {/* 2: diamante naranja */}
        <div className="w-20 h-20 bg-tertiary rotate-45 mx-auto my-auto"></div>

        {/* 3 + 6: semicirculo blanco (ocupa 2 filas) */}
        <div className="bg-card-light rounded-r-full row-span-2"></div>

        {/* 4: cuadrado azul */}
        <div className="w-25 h-25 border-[10px] border-secondary mx-auto my-auto"></div>

        {/* 5: círculo verde */}
        <div className="w-25 h-25 bg-primary rounded-full mx-auto my-auto"></div>

        {/* 7: cuarto de círculo verde */}
        <div className="w-25 h-25 bg-primary rounded-tl-full"></div>

        {/* 8: triángulo azul oscuro */}
        <div className="w-25 h-25 border-[10px] border-card-dark mx-auto my-auto"></div>
  

        {/* 9: semicírculo naranja */}
        <div className="bg-tertiary rounded-tr-full"></div>
      </div>

      {/* INPUT + BOTÓN */}
      <div className="flex mt-4 gap-4 items-center w-full max-w-md">
        <input
          type="text"
          placeholder="write here your prompt"
          className="text-primary px-4 py-2 outline-none text-md font-medium flex-[2] border border-gray-300 rounded-xl focus:border-primary transition-colors"
        />
        <button className="bg-primary px-4 py-2 text-white font-semibold hover:bg-primary-hover transition-colors rounded-xl flex-1">
          Try
        </button>
      </div>
    </div>
  );
};

export default ColorGrid;
