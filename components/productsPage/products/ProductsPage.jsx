import React, { useContext } from "react";
import Card from "./auxiliarComponents/Card";
import { Context } from "@/context/GlobalContext";
import { deleteSearchByNameFilter } from "@/context/actions";

const ProductsPage = () => {
  const { state, dispatch } = useContext(Context);

  const handleDeleteFilters = () => {
    deleteSearchByNameFilter(dispatch)
  }

  return (
    <div className="p-4 sm:px-12 flex flex-col gap-8">
      {state?.searchedProducts?.length > 0 && state?.searchedTitle ? (
        <div className="flex flex-row justify-start items-center gap-4 py-4 sm:py-8 ">
          <div>
            <span className="text-xl sm:text-2xl md:text-3xl  text-[#e26928]">Busqueda: </span>
            <span className="text-xl sm:text-2xl md:text-3xl text-black/70">'{state.searchedTitle}'</span>
          </div>
          <button className="text-sm border rounded-md py-1 px-2 bg-[#e26928] text-white hover:text-[#e26928] hover:bg-white hover:border-[#e26928] duration-300" onClick={handleDeleteFilters}>Quitar Filtro</button>
        </div>
      ) : (
        <span className="hidden"></span>
      )}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-evenly gap-8 items-center">
        {state?.searchedProducts?.length > 0
          ? state.searchedProducts.map((p) => {
              return (
                <Card
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  url={p.firstImage}
                  description={p.description}
                />
              );
            })
          : state?.products?.map((p) => {
              return (
                <Card
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  url={p.firstImage}
                  description={p.description}
                />
              );
            })}
      </div>
    </div>
  );
};

export default ProductsPage;
