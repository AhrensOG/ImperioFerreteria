import React, { useContext, useEffect } from "react";
import OrderDropDown from "./profileSection/OrderDropDown";
import { Context } from "@/context/GlobalContext";
import { isUserLogged } from "@/context/actions/isUserLogged";

const ProfileSection = ({ state }) => {
  const { dispatch } = useContext(Context)
  useEffect(() => {
    const userStatus = async () => {
      await isUserLogged(dispatch)
    }
    userStatus()
  }, [])
  return (
    <div className="flex flex-col gap-6">
      <span className="uppercase text-xl font-semibold tracking-tight">
        Informacion de la cuenta
      </span>
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-tight">
          Informacion del contacto
        </span>
        <span>Nombre: {state.user.name}</span>
        <span>Email: {state.user.email}</span>
        <span>Telefono: {state.user.phone ? state.user.phone : "-"}</span>
        <span>Direccion: {state.user.address ? state.user.address : "-"}</span>
      </div>
      <div className="flex flex-col gap-4">
        <span className="uppercase text-xl font-semibold tracking-tight">Tus compras</span>
        <div className={`flex flex-col gap-4 pr-1 scrollbar-thin ${ state?.user?.Orders?.length > 5 ? 'overflow-y-scroll max-h-72' : '' }`}>
          {
            state?.user?.Orders?.length
            ? state.user.Orders.map((o) => {
                return o.orderId && <OrderDropDown key={o.id} order={o} />
              })
            : <div className="hidden"></div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileSection
