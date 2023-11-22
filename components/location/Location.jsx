import Image from "next/image";
import Link from "next/link";
import React from "react";

const Location = () => {
  return (
    <div className="py-10">
      <div className="relative">
        <Image
          src="/location.jpg"
          width={1000}
          height={1000}
          alt="img"
          className="w-full h-64 sm:h-80 md:h-full z-0"
        />
        <div className="absolute top-0 left-0 pt-14 flex flex-col gap-6 sm:gap-10 md:gap-14 lg:gap-20 justify-center items-center bg-black/30 w-full h-full">
          <div className="flex flex-col justify-end items-center w-full h-full gap-6">
            <span className="text-white text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase">
              Donde Comprar
            </span>
            <span className="text-white text-xs sm:text-base md:text-lg lg:text-xl tracking-widest">
              Encuentra tu proveedor mas cercano
            </span>
          </div>
          <div className="w-full h-full flex justify-center items-start">
            <Link
              href={"https://maps.app.goo.gl/wzzymfYtV2njSNLAA"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <button className="bg-white py-2 px-6 text-[#e26928]">
                Ver distribuidores
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
