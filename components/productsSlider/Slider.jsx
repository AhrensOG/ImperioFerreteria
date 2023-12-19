import React, { useContext } from "react";
import Card from "./auxiliarComponents/Card";
import { Context } from "@/context/GlobalContext";
import Loader from "../loader/Loader";

const Slider = () => {
  const { state } = useContext(Context);

  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 305;
  };

  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 305;
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={scrollLeft}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={scrollRight}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      {state?.products?.length ? (
        <div
          id="content"
          className="px-12 py-14 carousel flex flex-row gap-24 items-center justify-start overflow-x-auto w-full scroll-smooth scrollbar-thin scrollbar-thumb-[#e26928] scrollbar-track-[#e26928]/30"
        >
          {state.products.map((p) => {
            return <Card key={p.id} product={p} />;
          })}
        </div>
      ) : (
        <div className="px-12 py-60 carousel flex flex-row items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Slider;
