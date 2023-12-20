import { Context } from "@/context/GlobalContext";
import { createOrderWithDelivery, deleteCart, deleteInit_Point } from "@/context/actions";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "sonner";

const PaymentSection = () => {
  const { state, dispatch } = useContext(Context);
  const initialValues = {
    orderReceiver: "",
    receiverPhone: "",
  };

  const deleteInitPoint = () => {
    deleteInit_Point(dispatch);
  };

  const onSubmit = async (values, { resetForm }) => {
    const deliveryData = {
      delivery: true,
      orderReceiver: values.orderReceiver,
      receiverPhone: values.receiverPhone,
      totalPrice: state?.cartTotalPrice
    }
    await createOrderWithDelivery(state?.user, state?.productsCart, deliveryData)
    deleteInit_Point(dispatch);
    deleteCart(dispatch);
    toast.success('Solicitud enviada con exito!',{
      duration: 20000,
      className: 'bg-[#e26928]',
      description: 'Un administrador se comunicara contigo a la brevedad. Puedes ver el estado de tu orden en tu perfil.'
    })
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const buttonStyle = formik.values.orderReceiver === '' || formik.values.orderReceiver === '' ? true : false 

  return (
    <div className="fixed w-full h-full bg-black/95 z-10 flex items-center justify-center">
      <div className="bg-white h-[80%] w-[85%] sm:w-[70%] md:w-[50%] flex flex-col items-center justify-center px-2 gap-6 rounded-lg relative">
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
          className="w-auto h-auto"
        />
        <div className="flex flex-col justify-center items-center w-full gap-6">
          <div className="flex flex-col w-full">
            <span className="font-semibold text-[#e26928]  text-sm pl-1">
              Direccion: Av. Napoleón Uriburu 600
            </span>
            <span className="font-semibold text-[#e26928]  text-xs pl-1">
              Recorda llevar el comprobante
            </span>
            <Link href={state?.init_point} target="_blank">
              <button
                onClick={() => deleteInitPoint()}
                className="border border-[#e26928] p-1 w-full rounded-lg text-xl font-semibold text-[#e26928]"
              >
                Retirar en sucursal
              </button>
            </Link>
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
                disabled= {buttonStyle}
                type="submit"
                title="button"
                className={`border p-1 w-full rounded-lg text-xl font-semibold ${buttonStyle ? 'text-gray-400 border-gray-400' : 'text-[#e26928] border-[#e26928]' }`}
              >
                Solicitar Envío
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
