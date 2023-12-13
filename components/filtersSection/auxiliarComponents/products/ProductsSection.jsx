import React from "react";
import Card from "./Card";

const ProductsSection = ({ listProducts, setListProducts, state }) => {
  return (
    <div
      onMouseLeave={() => setListProducts(!listProducts)}
      className={`hidden absolute z-10 px-4 sm:px-12 py-4 w-full h-auto bg-white sm:flex sm:flex-row sm:flex-wrap`}
    >
      {state?.products?.map((p) => {
        return <Card key={p.id} title={p.title} url={p.firstImage} id={p.id} />;
      })}
    </div>
  );
};

export default ProductsSection;
