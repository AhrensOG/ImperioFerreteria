import Link from "next/link";
import React from "react";

const Card = ({
  title = "Tuerca",
  url = "https://newmaq.com.ar/wp-content/uploads/2021/09/TAD10.png",
}) => {
  return (
    <div className="w-auto h-full flex flex-row items-center justify-start gap-4 cursor-pointer hover:bg-slate-200 duration-500 p-2">
      <Link href={'/'}>
        <img src={url} alt="img" className="w-16 h-16 sm:w-20 sm:h-20" />
      </Link>
      <Link href={'/'}>
        <span className="w-full h-full sm:text-lg flex flex-row items-center">
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
};

export default Card;
