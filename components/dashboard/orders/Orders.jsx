import React from "react";
import OrderDropDown from "./auxiliarComponents/OrderDropDown";

const Orders = ({ orders }) => {
  return (
    <div className="flex flex-col items-center w-full h-screen px-10 py-10">
      <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
        Ordenes Realizadas
      </span>
      <div className={`w-full flex flex-col gap-2 max-h-screen overflow-y-scroll scrollbar-thin pr-1`}>
        {
          orders.map((o)=> {
            return o.status !== 'Shopping' && <OrderDropDown key={o.id} order={o}/>
          })
        }
      </div>
    </div>
  );
};

export default Orders;
