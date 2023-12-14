import React from "react";

const ProfileSection = ({ state }) => {
  console.log(state)
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
      <div>
        <span className="uppercase text-xl font-semibold tracking-tight">Tus compras</span>
      </div>
    </div>
  );
};

export default ProfileSection
