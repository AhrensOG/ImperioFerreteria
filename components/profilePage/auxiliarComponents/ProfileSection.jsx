import React from "react";

const ProfileSection = ({ state }) => {
  return (
    <div className="flex flex-col pt-14 gap-5 px-4">
      <span className="uppercase text-xl font-semibold tracking-tight">
        Informacion de la cuenta
      </span>
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-tight">
          Informacion del contacto
        </span>
        <span>Nombre: {state.user.name}</span>
        <span>Email: {state.user.email}</span>
        <span>Telefono: {state.user.tel ? state.user.tel : "-"}</span>
        <span>Direccion: {state.user.address ? state.user.address : "-"}</span>
      </div>
    </div>
  );
};

export default ProfileSection
