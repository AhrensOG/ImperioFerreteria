import { Context } from "@/context/GlobalContext";
import { searchProductsByName } from "@/context/actions";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const SearchBar = () => {

  const { dispatch } = useContext(Context)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      searchedTitle: ''
    },
    onSubmit: values => {
      searchProductsByName(values.searchedTitle, dispatch)
      document.getElementById('form').reset();
      router.asPath === '/' ? router.push('/products') : null
    }
  })

  return (
    <div className="relative w-[50%]">
      <form id="form" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="searchedTitle"
          className="bg-white border border-[#e26928] focus:outline-none text-sm ps-4 p-2.5 w-full"
          placeholder="Buscar"
          required
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
