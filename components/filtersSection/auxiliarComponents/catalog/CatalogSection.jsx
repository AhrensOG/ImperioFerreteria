import React from "react";
import Card from "./Card";

const CatalogSection = ({ listCatalog, setListCatalog }) => {
  return (
    <div
      onMouseLeave={() => setListCatalog(!listCatalog)}
      className={`absolute z-10 px-4 sm:px-12 py-4 w-full h-auto bg-white flex flex-col sm:flex-row sm:flex-wrap`}
    >
      <Card />
      <Card url="https://media.bahco.com/media/catalog/category/img-catalogo2-bahco_promos.png" title="Campaña"/>
    </div>
  );
};

export default CatalogSection;
