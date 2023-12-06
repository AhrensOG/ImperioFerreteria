import React from "react";

const Card = ({
  id,
  title = "Tuerca",
  url = "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
  description = "Tuerca de excelente calidad Tuerca de excelente calidad Tuerca de excelente calidad Tuerca de excelente calidad",
}) => {
  return (
    <div className="flex flex-col items-center text-start max-w-[300px] w-full divide-y divide-slate-400 border border-[#e26928] hover:-translate-y-2 duration-500 hover:shadow-lg hover:shadow-black/60">
      <img src={url} alt="img" className="w-full h-full" />
      <div className="flex flex-col w-full h-full items-center justify-center p-4 gap-4">
        <span className="text-2xl">{title}</span>
        <span>{description}</span>
        <button className="w-[80%] bg-black text-white py-2 hover:text-[#e26928] duration-200">
          Ver Producto
        </button>
      </div>
    </div>
  );
};

export default Card;
