import React, { useContext } from "react";
import { searchProductsByCategory } from "../../../../context/actions";
import { Context } from "@/context/GlobalContext";

const CategoryCard = ({ category, showCategories }) => {
  const { state, dispatch } = useContext(Context)
  const handleSearchByCategory = (category, dispatch) => {
    searchProductsByCategory(category, dispatch)
    showCategories(false)
  }
  return (
    <button className="p-1 rounded-lg font-semibold text-start bg-[#e26928] text-white sm:text-[#e26928] sm:bg-white sm:hover:bg-[#e26928] sm:hover:text-white  duration-300" onClick={() => handleSearchByCategory(category.name, dispatch)}>
      {category.name}
    </button>
  );
};

export default CategoryCard;
