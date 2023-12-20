import { Context } from "@/context/GlobalContext";
import React, { useContext, useEffect, useState } from "react";
import ProfileSection from "./auxiliarComponents/ProfileSection";
import ProfileDataSection from "./auxiliarComponents/ProfileDataSection";
import LogOut from "./auxiliarComponents/LogOut";
import CartSection from "./auxiliarComponents/cartSection/CartSection";
import Loader from "../loader/Loader";

const Profile = () => {
  const { state } = useContext(Context);
  const [profileButton, setProfileButton] = useState(true);
  const [profileDataButton, setProfileDataButton] = useState(false);
  const [cartButton, setCartButton] = useState(false);

  const handleProfileButton = (e) => {
    setProfileButton(true);
    setProfileDataButton(false);
    setCartButton(false);
  };
  const handleProfileDataButton = (e) => {
    setProfileDataButton(true);
    setCartButton(false);
    setProfileButton(false);
  };
  const handleCartButton = (e) => {
    setCartButton(true);
    setProfileButton(false);
    setProfileDataButton(false);
  };

  useEffect(() => {
    if (state?.openCart) {
      handleCartButton()
    }
  }, [state.openCart])
  console.log(state)

  return (
    <div className="w-full h-full flex flex-col pt-8 max-w-screen-lg">
      <div className="flex flex-row w-full h-full justify-evenly items-center">
        <button
          onClick={handleProfileButton}
          className={`w-full h-full p-2 border border-[#e26928]/60 text-[#e26928] text-md sm:text-lg md:text-xl font-semibold  ${
            profileButton ? "bg-[#e26928] text-white" : ""
          } duration-500`}
        >
          Mi Perfil
        </button>
        <button
          onClick={handleProfileDataButton}
          className={`w-full h-full p-2 border border-[#e26928]/60 text-[#e26928] text-md sm:text-lg md:text-xl font-semibold  ${
            profileDataButton ? "bg-[#e26928] text-white" : ""
          } duration-500`}
        >
          Mis Datos
        </button>
        <button
          onClick={handleCartButton}
          className={`w-full h-full p-2 border border-[#e26928]/60 text-[#e26928] text-md sm:text-lg md:text-xl font-semibold  ${
            cartButton ? "bg-[#e26928] text-white" : ""
          } duration-500`}
        >
          Mi Carrito
        </button>
      </div>
      <div>
        {profileButton && state?.user?.id 
          && <div className="flex flex-col gap-10 py-12 px-4 md:px-0">
            <ProfileSection state={state}/>
            <div className="text-center">
              <LogOut/>
            </div>
          </div>
        }
        {
          profileDataButton && state?.user?.id
          && <div className="flex flex-row justify-center">
              <ProfileDataSection state={state} handleProfileButton={handleProfileButton} />
          </div> 
        }
        {
          cartButton && state?.user?.id
          && <div className="flex flex-row justify-center">
            <CartSection state={state} />
          </div> 
        }
        {
          !state?.user?.id 
          && <div className="my-[40%] sm:my-[15%] md:my-[10%] flex flex-col items-center justify-center">
            <Loader/>
          </div>
        }
      </div>
    </div>
  );
};

export default Profile;
