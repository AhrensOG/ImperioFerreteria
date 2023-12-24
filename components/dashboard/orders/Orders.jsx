import React, { useContext, useEffect, useState } from "react";
import OrderDropDown from "./auxiliarComponents/OrderDropDown";
import { getAllOrders } from "@/context/actions";
import { Context } from "@/context/GlobalContext";
import Loader from "@/components/loader/Loader";
import { toast } from "sonner";

const Orders = ({ orders }) => {
  const { state, dispatch } = useContext(Context);

  const [auto, setAuto] = useState(false);

  useEffect(() => {
    let intervalID;
    const autoRefresh = async () => {
      if (auto) {
        intervalID = setInterval(() => {
          getAllOrders(dispatch);
        }, 120000);
      } else {
        clearInterval(intervalID);
      }
    };
    autoRefresh();
    return () => clearInterval(intervalID);
  }, [auto]);

  useEffect(() => {}, [state.orders]);

  return (
    <div className="flex flex-col items-center w-full h-screen px-10 py-10 relative">
      <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
        Ordenes Realizadas
      </span>
      <div>
        <div
          className="absolute right-[52px] top-[70px] border border-[#e26928] p-2 px-4 rounded-lg text-[#e26928] font-semibold cursor-pointer"
          onClick={() => {
            getAllOrders(dispatch);
            toast.success("Actualizado!", {
              duration: 3000,
              position: "top-center",
            });
          }}
        >
          Refresh
        </div>
        <div
          className="absolute right-[150px] top-[70px] border border-[#e26928] p-2 px-4 rounded-lg text-[#e26928] font-semibold cursor-pointer"
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
      </div>
      <div
        className={`w-full flex flex-col gap-2 max-h-screen overflow-y-scroll scrollbar-thin pr-1`}
      >
        {orders?.map((o) => {
          return (
            o.status !== "Shopping" && <OrderDropDown key={o.id} order={o} />
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
