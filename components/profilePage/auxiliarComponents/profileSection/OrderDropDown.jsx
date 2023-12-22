import { cancelOrder } from "@/context/actions";
import React, { useContext, useEffect, useState } from "react";
import ProductOrderCard from "./ProductOrderCard";
import { Context } from "@/context/GlobalContext";
import { isUserLogged } from "@/context/actions/isUserLogged";

const OrderDropDown = ({ order }) => {
  const { dispatch, state } = useContext(Context);
  const dateObj = new Date(order.updatedAt);
  const date = dateObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [open, setOpen] = useState(false);

  const handleOpenOrder = () => {
    setOpen(!open);
  };

  const handleCacelOrder = () => {
    cancelOrder(order.id, dispatch);
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={handleOpenOrder}
        className="flex flex-row w-full cursor-pointer justify-between items-center bg-white border border-[#e26928] p-2 rounded-sm"
      >
        <span className="text-[#e26928] text-sm sm:text-base font-semibold">
          Orden:{" "}
          {order.status === "Paid"
            ? order.orderId
            : order.status === "Pending"
            ? "Pendiente"
            : "Cancelado"}
        </span>
        <span className="text-[#e26928] font-semibold flex flex-row gap-1 text-sm sm:text-base">
          {date}
          {open ? (
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
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
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </span>
      </div>
      {open ? (
        <div className="flex flex-col p-2 gap-2">
          <div className="flex flex-row justify-evenly">
            <p className="text-[#e26928] font-semibold text-base">
              Estado:
              <span
                className={`${
                  order.status === "Paid"
                    ? "text-green-700"
                    : order.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-600"
                } font-semibold pl-1`}
              >
                {order.status === "Paid"
                  ? "Pagado"
                  : order.status === "Pending"
                  ? "Pendiente"
                  : "Cancelado"}
              </span>
            </p>
            <span className="text-[#e26928] font-semibold text-base">
              Total: {order.totalPrice}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {order.Products.length ? (
              order.Products?.map((op) => {
                return (
                  <ProductOrderCard key={op.title} productOrder={op} />
                );
              })
            ) : (
              <div className="hidden"></div>
            )}
          </div>
          {order?.status === "Pending" ? (
            <button
              onClick={() => handleCacelOrder()}
              className="underline underline-offset-4 text-red-600"
            >
              Cancelar Pedido
            </button>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default OrderDropDown;
