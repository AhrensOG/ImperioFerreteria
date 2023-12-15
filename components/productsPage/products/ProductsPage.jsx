import React, { useContext, useState } from "react";
import Card from "./auxiliarComponents/Card";
import { Context } from "@/context/GlobalContext";
import Link from "next/link";
import {
  deleteSearchByCategoryFilter,
  deleteSearchByNameFilter,
} from "@/context/actions";
import CategoryCard from "./auxiliarComponents/CategoryCard";

const ProductsPage = () => {
  const { state, dispatch } = useContext(Context);

  const [showCategories, setShowCategories] = useState(false);

  const handleDeleteFilters = () => {
    deleteSearchByNameFilter(dispatch);
  };
  const handleDeleteFilterByCategory = () => {
    deleteSearchByCategoryFilter(dispatch);
  };

  return (
    <div className="p-4 sm:px-12 flex flex-col gap-8">
      {state?.searchedProducts?.length > 0 && state?.searchedTitle ? (
        <div className="flex flex-row justify-start items-center gap-4 py-4 sm:py-8 ">
          <div>
            <span className="text-xl sm:text-2xl md:text-3xl  text-[#e26928]">
              Busqueda:{" "}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl text-black/70">
              '{state.searchedTitle}'
            </span>
          </div>
          <button
            className="text-sm border rounded-md py-1 px-2 bg-[#e26928] text-white hover:text-[#e26928] hover:bg-white hover:border-[#e26928] duration-300"
            onClick={handleDeleteFilters}
          >
            Quitar Filtro
          </button>
        </div>
      ) : (
        <div className=" py-4 sm:py-12 sm:px-12 flex flex-col gap-4">
          <div className="flex flex-row justify-start items-center gap-4">
            <div className="relative">
              <button
                className="text-2xl sm:text-3xl md:text-4xl text-[#e26928] border-b border-b-[#e26928] flex flex-row items-center gap-2"
                onClick={() => setShowCategories(!showCategories)}
              >
                Categorias
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {showCategories ? (
                <div className="flex flex-col w-full gap-2 absolute py-2">
                  {state?.categories?.map((c) => {
                    return (
                      <CategoryCard
                        key={c.id}
                        category={c}
                        showCategories={setShowCategories}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
            <button
              className="text-sm border rounded-md mt-1 py-1 px-2 bg-[#e26928] text-white hover:text-[#e26928] hover:bg-white hover:border-[#e26928] duration-300"
              onClick={handleDeleteFilterByCategory}
            >
              Quitar Filtro
            </button>
          </div>
          {state?.filteredCategory ? (
            <div className="flex flex-col gap-2">
              {!state?.productsByCategory ? (
                <p className="font-semibold text-[#e26928]">
                  Sin productos en:
                  <span className="pl-2 text-black font-normal">
                    '{state?.filteredCategory}'
                  </span>
                </p>
              ) : (
                <div className="flex flex-row gap-2">
                  <span className="font-semibold text-[#e26928]">
                    Filtrar por:
                  </span>
                  <span>'{state?.filteredCategory}'</span>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-evenly gap-8 items-center p-4 sm:px-12">
        {state?.searchedProducts?.length > 0
          ? state.searchedProducts.map((p) => {
              return (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <Card
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    url={p.firstImage}
                    description={p.description}
                  />
                </Link>
              );
            })
          : state?.productsByCategory
          ? state.productsByCategory.map((p) => {
              return (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <Card
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    url={p.firstImage}
                    description={p.description}
                  />
                </Link>
              );
            })
          : state?.products?.map((p) => {
              return (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <Card
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    url={p.firstImage}
                    description={p.description}
                  />
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default ProductsPage;
