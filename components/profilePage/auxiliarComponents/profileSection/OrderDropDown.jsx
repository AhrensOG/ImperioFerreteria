import { getOrderProducts } from "@/context/actions";
import React, { useEffect, useState } from "react";
import ProductOrderCard from "./ProductOrderCard";

const OrderDropDown = ({ order }) => {
  const dateObj = new Date(order.updatedAt);
  const date = dateObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [open, setOpen] = useState(false);
  const [orderProducts, setOrderProducts] = useState();

  const handleOpenOrder = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getOrderProducts(order.id);
      setOrderProducts(data);
    };
    getData();
  }, []);

  return (
    <div onClick={handleOpenOrder} className="flex flex-col">
      <div className="flex flex-row w-full cursor-pointer justify-between items-center bg-white border border-[#e26928] p-2 rounded-sm">
        <span className="text-[#e26928] font-semibold">
          Orden: {order.orderId}
        </span>
        <span className="text-[#e26928] font-semibold flex flex-row gap-1">
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
      {
        open
        ? <div className="flex flex-col p-2 gap-2">
            <div className="flex flex-row justify-evenly">
              <p className="text-[#e26928] font-semibold text-lg">
                Estado:
                <span className="text-green-700 font-semibold pl-1">{order.status === "Paid" ? "Pagado" : "Pendiente"}</span>
              </p>
              <span className="text-[#e26928] font-semibold text-lg">Total: {order.totalPrice}</span>
            </div>
            <div className="flex flex-col gap-1">
              {orderProducts ? (
                orderProducts?.map((op) => {
                  return <ProductOrderCard key={op.productName} productOrder={op} />;
                })
              ) : (
                <div className="hidden"></div>
              )}
            </div>
          </div>
        : <div className="hidden"></div>
      }
    </div>
  );
};

export default OrderDropDown;
