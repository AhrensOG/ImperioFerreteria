import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { createAndPayOrder } from "@/context/actions";
import { Context } from "@/context/GlobalContext";

const CartSection = ({ state }) => {
  const [style] =
    state.productsCart?.length < 4 || state.productsCart === undefined
      ? useState(true)
      : useState(false);

  const [processPay, setProcess] = useState(false)

  const { dispatch } = useContext(Context)

  const handlePayCart = async () => {
    try {
      setProcess(true)
      createAndPayOrder(state?.user, state?.productsCart, dispatch)

    } catch (error) {
      console.log(error)
    }
  }  
  
  useEffect(() => {
    if (processPay) {
      setProcess(false)
    }
  }, [state, state?.init_point]);

  return (
    <div className="w-full">
      {state.productsCart?.length ? (
        <div className="flex flex-col w-full">
          <div className="text-center bg-white border-2 border-x-[#e26928] border-b-[#e26928] p-3">
            <span className="text-xl font-semibold text-[#e26928]">
              Compra Total: ${state.cartTotalPrice}
            </span>
          </div>
        </div>
        ) : <div className="hidden"></div>
      }
      <div
        className={`px-1 lg:px-0 py-16 flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-evenly ${
          style ? "lg:justify-evenly" : "lg:justify-start"
        } gap-5 overflow-y-scroll max-h-96 sm:max-h-[28rem] scrollbar-thin`}
      >
        {state?.productsCart?.length > 0 ? (
          state.productsCart.map((p) => {
            return <Card key={p.id} product={p} />;
          })
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-xl font-semibold text-black/50">
              El carrito esta vacio
            </span>
            <svg
              stroke="currentColor"
              fill="gray"
              strokeWidth="0"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              className="w-40 h-40 sm:w-48 sm:h-48"
            >
              <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"></path>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
          </div>
        )}
      </div>
      {
        state?.productsCart?.length
        ? <button
            className={`bg-[#e26928] text-xl font-semibold text-white w-full p-3 flex gap-2 justify-center items-center`}
            onClick={handlePayCart}
          >
            {
              processPay ? 'Procesando...' : 'Comprar'
            }
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0.5"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
          </button>
        : <div className="hidden"></div>
      }
    </div>
  );
};

export default CartSection;
