import React, { useContext, useEffect, useState } from "react";
import OrderDropDown from "./auxiliarComponents/OrderDropDown";
import { getAllOrders } from "@/context/actions";
import { Context } from "@/context/GlobalContext";
import Loader from "@/components/loader/Loader";

const Orders = ({ orders }) => {
  const { state, dispatch } = useContext(Context);

  const [auto, setAuto] = useState(false);
  const [intervalID, setIntervalID] = useState();
  

  useEffect(() => {
    const autoRefresh = async () => {
      if (auto) {
        setIntervalID(setInterval(() => {
          getAllOrders(dispatch)
        }, 60000, intervalID));
      } else {
        clearInterval(intervalID)
      }
    }
    autoRefresh()
  }, [auto]);

  useEffect(() => {}, [state.orders])
  

  return (
    <div className="flex flex-col items-center w-full h-screen px-10 py-10 relative">
      <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
        Ordenes Realizadas
      </span>
      <div
        className="absolute right-[52px] top-[70px] border border-[#e26928] p-2 px-4 rounded-lg text-[#e26928] font-semibold cursor-pointer"
        onClick={() => setAuto(!auto)}
      >
        <p>
          {auto ? (
            <span className="flex flex-row justify-center items-center gap-4">
              Stop
              <Loader w={16} h={16} />
            </span>
          ) : (
            "AutoRefresh"
          )}
        </p>
      </div>
      <div
        className={`w-full flex flex-col gap-2 max-h-screen overflow-y-scroll scrollbar-thin pr-1`}
      >
        {orders.map((o) => {
          return (
            o.status !== "Shopping" && <OrderDropDown key={o.id} order={o} />
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
