import React from "react";

const Card = () => {
  return (
    <div className="flex flex-col border-2 border-[#e26928] divide-y divide-gray-300 justify-center items-center">
      <img
        src={"https://newmaq.com.ar/wp-content/uploads/2021/09/TAD10.png"}
        alt="img"
        className="max-w-[240px] max-h-[280px] h-64 w-56"
      />
      <div className="flex flex-col w-full h-full basis-1/2 px-4 py-8 gap-2">
        <span className="text-4xl font-semibold">$10.000</span>
        <span className="text-xs text-gray-500 ">Tijera Herramienta</span>
      </div>
    </div>
  );
};

export default Card;
