import React from "react";
import Logo from "./Logo";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const SideBar = ({ setShowProducts, showProducts, setShowCategories, showCategories, setShowUsers, showUsers }) => {

  const handleShow = (show, setShow) => {
    setShowProducts(false)
    setShowCategories(false)
    setShowUsers(false)

    return setShow(!show)
  }

  return (
    <div className="relative">
      <div className="flex flex-col h-screen w-[200px] shadow-2xl px-6 gap-4">
        <Logo />
        <div className="flex flex-col items-start gap-6">
          <button onClick={() => handleShow(showProducts, setShowProducts)} className="text-2xl">Productos</button>
          <button onClick={() => handleShow(showCategories, setShowCategories)} className="text-2xl">Categorías</button>
          <button onClick={() => handleShow(showUsers, setShowUsers)} className="text-2xl">Usuarios</button>
        </div>
        <div className="flex justify-center h-full items-end">
          <button className="pb-16 text-2xl text-[#e26928] font-bold" onClick={() => signOut(auth)}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
