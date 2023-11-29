import { Context } from "@/context/GlobalContext";
import { isUserLogged } from "@/context/actions/isUserLogged";
import { logInWithGoogle } from "@/firebase/logInWithGoogle";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const LogIn = () => {

  const router = useRouter()
  const { state, dispatch } = useContext(Context)
  const userIsLogged = state.userIsLogged
  useEffect(() => {
    if (state?.userIsLogged) {
      router.push('/')
    }
  }, [userIsLogged])
  

  const handleLogin = async () => {
    logInWithGoogle()
    isUserLogged(dispatch)
  }  

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-4 sm:px-12">
      <div className="border border-[#e26928] max-w-xs w-full h-full flex flex-col items-center justify-start p-4 py-10 gap-12">
        <span className="text-3xl text-[#e26928] font-bold uppercase">
          Bienvenido
        </span>
          <span className="text-xl font-semibold text-black/80">
            Iniciar Sesion
          </span>
          <button onClick={handleLogin} className="p-2 rounded-xl border border-blue-700 w-[80%] flex justify-center items-center">
            <Image src={'/icons/google.svg'} width={30} height={30} alt="googleLogo" />
          </button>
      </div>
    </div>
  );
};

export default LogIn;
