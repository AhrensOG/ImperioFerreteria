import React from "react";

const Card = ({
  id,
  title = "Tuerca",
  url = "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
  description = "Tuerca de excelente calidad Tuerca de excelente calidad Tuerca de excelente calidad Tuerca de excelente calidad",
}) => {
  return (
    <div className="grid grid-cols-1 justify-items-stretch content-between max-w-[300px] w-[300px] h-[500px] divide-y divide-slate-400 border border-[#e26928] hover:-translate-y-2 duration-500 hover:shadow-lg hover:shadow-black/60">
      <img src={url} alt="img" className="w-[300px] h-[250px]" />
      <div className="flex flex-col w-full h-[250px] items-center justify-end px-4 py-6 gap-4">
        <span className="text-xl">{title}</span>
        <span>{ description.length > 95 ? description.substring(0, 95) + `...` : description }</span>
        <button className="w-full bg-black text-white py-2 hover:text-[#e26928] duration-200">
          Ver Producto
        </button>
      </div>
    </div>
  );
};

export default Card;
