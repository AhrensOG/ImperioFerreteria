import Loader from "@/components/loader/Loader";
import { Context } from "@/context/GlobalContext";
import {
  createOrder,
  createOrderWithDelivery,
  deleteCart,
  deleteInit_Point,
} from "@/context/actions";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const PaymentSection = () => {
  const { state, dispatch } = useContext(Context);
  const initialValues = {
    orderReceiver: "",
    receiverPhone: "",
  };

  const [loader, setLoader] = useState(false);

  const deleteInitPoint = () => {
    deleteInit_Point(dispatch);
  };

  const handlePayInSite = async () => {
    setLoader(true)
    await createOrder(state?.user, state?.productsCart, state?.cartTotalPrice); 
    deleteInit_Point(dispatch);
    deleteCart(dispatch);
    toast.success("Tu pedido se registro con exito!", {
      duration: 20000,
      className: "bg-[#e26928] text-lg",
      description:
        "Puedes retirarlo cuando quieras. Y te recordamos que puedes ver el estado de tu orden en tu perfil.",
    });
    setLoader(false)
  };

  console.log(state)

  const onSubmit = async (values) => {
    setLoader(true)
    const deliveryData = {
      delivery: true,
      orderReceiver: values.orderReceiver,
      receiverPhone: values.receiverPhone,
      totalPrice: state?.cartTotalPrice,
    };
    await createOrderWithDelivery(
      state?.user,
      state?.productsCart,
      deliveryData
    );
    deleteInit_Point(dispatch);
    deleteCart(dispatch);
    toast.success("Solicitud enviada con exito!", {
      duration: 20000,
      className: "bg-[#e26928] text-lg",
      description:
        "Un administrador se comunicara contigo a la brevedad. Puedes ver el estado de tu orden en tu perfil.",
    });
    setLoader(false)
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const buttonStyle =
    formik.values.orderReceiver === "" || formik.values.orderReceiver === ""
      ? true
      : false;

  return (
    <div className="fixed w-full h-full bg-black/95 z-10 flex items-center justify-center">
      <div className="bg-white h-[85%] w-[85%] sm:w-[70%] md:w-[50%] flex flex-col items-center justify-center px-2 gap-4 rounded-lg relative">
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

        <Image
          src={"/LogoMobile.png"}
          width={150}
          height={150}
          alt="Logo"
          className=""
        />
        <div className="flex flex-col justify-center items-center w-full gap-6">
          <div className="flex flex-col w-full gap-2">
            <span className="w-full text-center rounded-lg text-xl font-semibold underline underline-offset-4 text-[#e26928]">
              Retirar en sucursal
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-[#e26928]  text-sm pl-1">
                Direccion: Av. Napoleón Uriburu 600
              </span>
              <span className="font-semibold text-[#e26928]  text-xs pl-1">
                Recorda llevar el comprobante
              </span>
            </div>
            <Link href={state?.init_point} target="_blank">
              <button
                onClick={() => deleteInitPoint()}
                className="border border-[#e26928] w-full rounded-lg text-xl p-1 font-semibold text-[#e26928]"
              >
                Pagar ahora
              </button>
            </Link>
            <button
              onClick={() => handlePayInSite()}
              className="border border-[#e26928] w-full rounded-lg text-xl p-1 font-semibold text-[#e26928] flex flex-row items-center justify-center"
            >
              {loader ? <Loader w={28} h={28} /> : "Pagar en sucursal"}
            </button>
          </div>
          <div className="text-center w-full flex flex-col gap-2">
            <span className="w-full rounded-lg text-xl font-semibold underline underline-offset-4 text-[#e26928]">
              Envío a domicilio
            </span>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-2"
            >
              <input
                id="receiverPhone"
                name="receiverPhone"
                type="number"
                className="border border-[#e26928] p-1 px-3 text-xl rounded-lg focus:outline-none focus:ring focus:ring-[#e26928] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Teléfono de contacto"
                onChange={formik.handleChange}
                value={formik.values.receiverPhone}
              />
              <input
                id="orderReceiver"
                name="orderReceiver"
                type="text"
                className="border border-[#e26928] p-1 px-3 text-xl rounded-lg focus:outline-none focus:ring focus:ring-[#e26928]"
                placeholder="¿Quién recibe el pedido?"
                onChange={formik.handleChange}
                value={formik.values.orderReceiver}
              />
              <button
                disabled={buttonStyle}
                type="submit"
                title="button"
                className={`border w-full rounded-lg p-1 text-xl font-semibold flex flex-row items-center justify-center ${
                  buttonStyle
                    ? "text-gray-400 border-gray-400"
                    : "text-[#e26928] border-[#e26928]"
                }`}
              >
                {loader ? <Loader w={28} h={28} /> : "Solicitar Envío"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
