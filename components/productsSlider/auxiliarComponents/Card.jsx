import React from "react";

const Card = ({ product }) => {
  return (
    <div className="flex flex-col border-2 border-[#e26928] divide-y divide-gray-300 justify-center items-center">
      <img
        src={product.firstImage}
        alt="img"
        className="max-w-[240px] max-h-[280px] h-64 w-56"
      />
      <div className="flex flex-col w-full h-full basis-1/2 px-4 py-8 gap-2">
        <span className="text-4xl font-semibold">${product.price}</span>
        <span className="text-xs text-gray-500 ">{product.title.length > 20 ? `${product.title.slice(0, 20)}...` : product.title}</span>
      </div>
    </div>
  );
};

export default Card;
