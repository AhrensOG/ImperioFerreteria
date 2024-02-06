import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/GlobalContext";
import { getAllCategories, getAllProducts } from "@/context/actions";
import ProductsSection from "./auxiliarComponents/products/ProductsSection";
import CatalogSection from "./auxiliarComponents/catalog/CatalogSection";
import Link from "next/link";

const Filters = () => {
  const { state, dispatch } = useContext(Context);
  const [listProducts, setListProducts] = useState(false);
  const [listCatalog, setListCatalog] = useState(false);

  useEffect(() => {
    getAllProducts(dispatch);
    getAllCategories(dispatch);
  }, []);

  const displayList = (list, setList) => {
    setListProducts(false);
    setListCatalog(false);

    return setList(!list);
  };

  return (
    <div className="w-full py-4 relative bg-[#F1D98F]">
      <div className="flex flex-row sm:px-12 px-4 sm:gap-8 gap-4 items-center justify-center xs:justify-start w-full">
        <Link href={"/products"}>
          <span
            onMouseEnter={() => displayList(listProducts, setListProducts)}
            className="text-sm sm:text-lg cursor-pointer"
          >
            Productos
          </span>
        </Link>
        <Link href={"/products"}>
          <span
            onMouseEnter={() => displayList(listCatalog, setListCatalog)}
            className="text-sm sm:text-lg cursor-pointer"
          >
            Catálogo
          </span>
        </Link>
        <Link
          href={"https://wa.me/3704671438"}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span
            id="contact"
            className="text-sm sm:text-lg cursor-pointer text-[#e26928]"
          >
            Contáctanos
          </span>
        </Link>
      </div>
      {listProducts ? (
        <ProductsSection
          listProducts={listProducts}
          setListProducts={setListProducts}
          state={state}
        />
      ) : (
        <div className="hidden"></div>
      )}
      {listCatalog ? (
        <CatalogSection
          listCatalog={listCatalog}
          setListCatalog={setListCatalog}
          state={state}
        />
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default Filters;
