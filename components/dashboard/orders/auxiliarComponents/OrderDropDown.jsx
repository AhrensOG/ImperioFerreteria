import React, { useContext, useEffect, useState } from "react";
import ProductOrderCard from "./ProductOrderCard";
import { Context } from "@/context/GlobalContext";
import ArrowIcon from "./ArrowIcon";
import {
  cancelOrder,
  deliveredOrder,
  getAllOrders,
  payOrder,
  payOrderWithDelivery,
} from "@/context/actions";
import { toast } from "sonner";
import ToggleSwitch from "./ToggleSwitch";

const OrderDropDown = ({ order }) => {
  const { state, dispatch } = useContext(Context);
  const dateObj = new Date(order.createdAt);
  const date = dateObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [paymentLink, setPaymentLink] = useState();
  const [deliveryCost, setDeliveryCost] = useState(null);

  const handleDelivered = async () => {
    await deliveredOrder(order?.id, !order?.delivered, dispatch);
    await getAllOrders(dispatch);
  };

  const handleDeliveryCost = (e) => {
    e.preventDefault();
    setDeliveryCost(e.target.value);
  };

  const handleGeneratePaymentLink = async () => {
    const orderProducts = JSON.parse(JSON.stringify(order.Products));
    if (deliveryCost) {
      const itemDeliveryCost = {
        id: order.id,
        description: "Costo de envio",
        title: "Envio",
        ProductsOrder: {
          quantity: 1,
        },
        price: parseFloat(deliveryCost),
      };
      orderProducts.push(itemDeliveryCost);
    }

    const initPoint = await payOrderWithDelivery(
      state.user,
      orderProducts,
      order.id
    );
    setPaymentLink(initPoint);
    setDeliveryCost(null);
  };

  const handleCopyLink = async () => {
    try {
      navigator.clipboard.writeText(document.getElementById("inputLink").value);
      toast.success("Copiado!", {
        duration: 3000,
        className: "bg-[#e26928]",
        position: "top-center",
      });
      setPaymentLink("");
    } catch (error) {
      toast.error("Ups! Intenta mas tarde", {
        duration: 3000,
        className: "bg-[#e26928]",
        position: "top-center",
        description: "Si la falla persiste contacta a un administrador",
      });
    }
  };

  const handleCancelOrderAlert = async () => {
    await cancelOrder(order.id);
    await getAllOrders(dispatch);
  };

  const handlePayOrderAlert = async () => {
    await payOrder(order.id);
    await getAllOrders(dispatch);
  };

  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <div className="">
      <div
        className={`w-full bg-white border border-[#e26928] p-3 ${
          openDropDown ? "rounded-t-lg" : "rounded-lg"
        } flex flex-row cursor-pointer`}
        onClick={() => setOpenDropDown(!openDropDown)}
      >
        <div className="grid grid-cols-9 relative basis-[97%]">
          <p className="col-span-2 font-semibold text-[#e26928]">
            Orden: {order.orderId ? order.orderId : "-"}
          </p>
          <p className="col-span-2 font-semibold text-[#e26928]">
            Estado:
            <span
              className={`${
                order.status === "Paid"
                  ? "text-green-800"
                  : order.status === "Pending"
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {" "}
              {order.status === "Paid"
                ? "Pagado"
                : order.status === "Pending"
                ? "Pendiente"
                : "Cancelado"}{" "}
            </span>
          </p>
          <p className="col-span-3 font-semibold text-[#e26928]">
            Usuario: {order.User.email}
          </p>
          <p className="col-span-1 font-semibold text-[#e26928]">
            Delivery: {order.delivery ? "SI" : "NO"}
          </p>
          <p className="col-span-1 font-semibold text-[#e26928]">{date}</p>
        </div>
        <div className="basis-[3%] text-[#e26928]">
          {openDropDown ? <ArrowIcon up={true} /> : <ArrowIcon />}
        </div>
      </div>
      {openDropDown ? (
        <div className="grid grid-cols-3 gap-2 w-full p-3 border-b border-x rounded-b-lg border-[#e26928]">
          <div className="flex flex-col col-span-1">
            <span className="font-bold text-[#e26928]">Datos del Cliente</span>
            <span className="indent-2 text-[#e26928]">
              Nombre: {order.User.name}
            </span>
            <span className="indent-2 text-[#e26928]">
              Teléfono: : {order.User.phone}
            </span>
            <span className="indent-2 text-[#e26928]">
              Dirección: {order.User.address}
            </span>
            {order.delivery ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="font-bold text-[#e26928]">
                    Datos de envío
                  </span>
                  <span className="indent-2 text-[#e26928]">
                    Receptor del pedido: {order.orderReceiver}
                  </span>
                  <span className="indent-2 text-[#e26928]">
                    Teléfono: {order.receiverPhone}
                  </span>
                </div>
                {order.status === "Pending" ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row w-full justify-center items-center">
                      <div className="bg-[#e26928] border-r-0 rounded-lg rounded-r-none w-16 h-full flex flex-row justify-center items-center">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 stroke-white"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                          <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                          <path d="M3 9l4 0"></path>
                        </svg>
                      </div>
                      <span className="font-semibold text-lg text-[#e26928] border-y border-[#e26928] h-full flex flex-row items-center pl-2 pr-1">
                        $
                      </span>
                      <input
                        className="border border-[#e26928] border-l-0 rounded-lg rounded-l-none pl-0 p-2 outline-none w-full text-[#e26928] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        name="deliveryCost"
                        value={deliveryCost ?? ""}
                        onChange={handleDeliveryCost}
                      />
                    </div>
                    <button
                      className="border border-[#e26928] p-2 rounded-lg text-[#e26928] font-semibold hover:text-white hover:bg-[#e26928] duration-300"
                      onClick={() => handleGeneratePaymentLink()}
                    >
                      Generar Link De Pago
                    </button>
                    <div className="flex flex-row w-full justify-center items-center">
                      <input
                        className="border border-[#e26928] rounded-lg rounded-r-none p-2 outline-none w-full text-[#e26928]"
                        type="text"
                        id="inputLink"
                        value={paymentLink ?? ""}
                        readOnly={true}
                      />
                      <div className="bg-[#e26928] border-l-0 rounded-lg rounded-l-none w-16 h-full flex flex-row justify-center items-center">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 fill-white cursor-pointer"
                          onClick={() => handleCopyLink()}
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hidden"></div>
                )}
              </div>
            ) : (
              <div className="hidden"></div>
            )}
            {order.status === "Pending" ? (
              <div className="flex flex-row items-center justify-around gap-1 my-1">
                <button
                  className="text-red-700 w-full font-semibold border border-red-700 rounded-lg p-2"
                  onClick={() =>
                    toast.warning("Cuidado! Estas por cancelar la orden!", {
                      action: {
                        label: "Confirmar",
                        onClick: handleCancelOrderAlert,
                      },
                    })
                  }
                >
                  Cancelar Pedido
                </button>
                <button
                  className="text-green-700 w-full font-semibold border border-green-700 rounded-lg p-2"
                  onClick={() =>
                    toast.warning("Marcaras como pagada la orden!", {
                      action: {
                        label: "Confirmar",
                        onClick: handlePayOrderAlert,
                      },
                    })
                  }
                >
                  Pagado
                </button>
              </div>
            ) : (
              <div className="hidden"></div>
            )}
          </div>
          <div className="col-span-2 flex flex-col gap-1 items-center relative">
            {order.status !== "Cancel" ? (
              <ToggleSwitch
                delivered={order?.delivered}
                setDelivered={handleDelivered}
              />
            ) : (
              <div className="hideen"></div>
            )}
            <span className="font-bold text-[#e26928]">
              Productos / Total: {order.totalPrice}
            </span>
            <div
              className={`flex flex-col gap-2 w-full ${
                order.delivery && order.status === "Pending"
                  ? "max-h-[327px]"
                  : order.delivery && order.status !== "Pending"
                  ? "max-h-[147px]"
                  : "max-h-[85px]"
              } overflow-y-scroll scrollbar-thin border border-[#e26928] p-2 rounded-lg rounded-r-none`}
            >
              {order.Products.map((p) => {
                return <ProductOrderCard key={p.id} product={p} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default OrderDropDown;
