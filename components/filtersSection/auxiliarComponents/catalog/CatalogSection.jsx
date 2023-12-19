import React from "react";
import Card from "./Card";

const CatalogSection = ({ listCatalog, setListCatalog, state }) => {
  return (
    <div
      onMouseLeave={() => setListCatalog(!listCatalog)}
      className={`hidden absolute z-10 px-4 sm:px-12 py-4 w-full h-auto bg-white sm:flex sm:flex-row sm:flex-wrap`}
    >
      {
        state?.categories?.map((c) => {
          return <Card key={c.name} title={c.name} url=""/>
        })
      }
    </div>
  );
};

export default CatalogSection;
