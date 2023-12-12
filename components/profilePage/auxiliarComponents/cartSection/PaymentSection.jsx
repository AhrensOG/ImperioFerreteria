import { Context } from "@/context/GlobalContext";
import { deleteInit_Point } from "@/context/actions";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const PaymentSection = () => {
  const { state, dispatch } = useContext(Context)

  const deleteInitPoint = () => {
    deleteInit_Point(dispatch)
  }

  return (
    <div className="fixed w-full h-full bg-black/95 z-10 flex items-center justify-center">
      <div className="bg-white h-[60%] w-[85%] sm:w-[70%] md:w-[50%] flex flex-col items-center justify-center px-2 gap-10 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#e26928"
          className="w-7 h-7 absolute top-2 right-2"
          onClick={() => deleteInitPoint()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <Image src={"/LogoMobile.png"} width={200} height={200} alt="Logo" className="w-auto h-auto"/>
        <div className="flex flex-col justify-center items-center w-full gap-6">
          <div className="flex flex-col w-full">
            <span className="font-semibold text-[#e26928]  text-sm pl-1">
              Direccion: Av. Napoleón Uriburu 600
            </span>
            <span className="font-semibold text-[#e26928]  text-xs pl-1">Recorda llevar el comprobante</span>
            <Link href={state?.init_point} target="_blank">
              <button className="border border-[#e26928] py-3 w-full rounded-lg text-xl font-semibold text-[#e26928]">
                Retirar en sucursal
              </button>
            </Link>
          </div>
          <button className="border border-[#e26928] py-3 w-full rounded-lg text-xl font-semibold text-[#e26928]">
            Envio a domicilio
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
