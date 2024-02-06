import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./auxiliarComponents/SearchBar";
import Link from "next/link";
import { isUserLogged } from "@/context/actions/isUserLogged";
import { Context } from "@/context/GlobalContext";
import { openCart } from "@/context/actions";

const ADMIN = process.env.NEXT_PUBLIC_ADMIN;

const SecondaryHomeNavbar = () => {
  const { state, dispatch } = useContext(Context);
  const [showSearchbar, setShowSearchbar] = useState(false);

  useEffect(() => {
    const userStatus = async () => {
      await isUserLogged(dispatch);
    };
    userStatus();
  }, []);

  const href = state?.userIsLogged ? "/user/profile" : "/user/signIn";

  return (
    <div className="w-full flex sm:flex-row flex-col gap-8 items-center p-4 sm:px-12 bg-[#F1D98F]">
      <div className="flex flex-row justify-between sm:justify-start sm:w-auto items-center w-full">
        {state?.user?.profileImage ? (
          <Link href={href}>
            <img
              src={state.user.profileImage}
              alt=""
              className="w-10 h-10 xs:w-12 xs:h-12  cursor-pointer rounded-full sm:hidden"
              onClick={() => openCart(false, dispatch)}
            />
          </Link>
        ) : (
          <Link href={href}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.8}
              stroke="currentColor"
              className="w-10 h-10 xs:w-12 xs:h-12  cursor-pointer sm:hidden"
              onClick={() => openCart(false, dispatch)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        )}
        <Link href={"/"}>
          <Image
            src={"/LogoMobile.png"}
            width={1000}
            height={1000}
            alt="Logo"
            className="h-auto w-32 xs:w-36 sm:w-48 md:w-64"
            priority
          />
        </Link>
        <div className="flex flex-row justify-center items-center sm:hidden gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.8}
            stroke="currentColor"
            className="w-5 h-5 xs:w-7 xs:h-7 cursor cursor-pointer"
            onClick={(e) => setShowSearchbar(!showSearchbar)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <Link href={href}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.8}
              stroke="currentColor"
              className="w-6 h-6 xs:w-8 xs:h-8 cursor-pointer"
              onClick={() => openCart(true, dispatch)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
      {showSearchbar && (
        <div className="flex flex-row justify-center w-full sm:hidden">
          <SearchBar />
        </div>
      )}
      <div className="hidden sm:flex flex-row justify-end items-center gap-4 w-full h-full">
        <SearchBar />
        {state?.user?.profileImage ? (
          <Link href={href}>
            <img
              src={state.user.profileImage}
              alt=""
              className="w-12 h-12 cursor-pointer rounded-full"
              onClick={() => openCart(false, dispatch)}
            />
          </Link>
        ) : (
          <Link href={href}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.8}
              stroke="currentColor"
              className="w-12 h-12 cursor-pointer"
              onClick={() => openCart(false, dispatch)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        )}
        <Link href={href}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.8}
            stroke="currentColor"
            className="w-12 h-12 cursor-pointer"
            onClick={() => openCart(true, dispatch)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Link>
        {state?.user?.id === ADMIN ? (
          <Link href={"/admin/dashboard"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.8}
              stroke="currentColor"
              className="w-12 h-12 cursor-pointer hidden sm:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
};

export default SecondaryHomeNavbar;
