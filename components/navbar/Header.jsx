import { Context } from "@/context/GlobalContext";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { state } = useContext(Context);

  return (
    <div className="bg-black py-1 sm:px-11 px-2 w-full h-12 xs:h-14 flex flex-row justify-end items-center">
      <div className="w-full text-center flex flex-row justify-center items-center sm:gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 xs:h-6 xs:w-6 sm:h-7 sm:w-7 fill-[#e26928]"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-[#e26928] text-xs font-semibold xs:text-base sm:text-lg xs:tracking-wide sm:tracking-wider">
          Av. Napoleón Uriburu 600, Formosa
        </span>
      </div>
      <div className="flex flex-row justify-center items-center gap-2 xs:gap-3">
        <Link
          href={state?.organization?.whatsAppLink || ""}
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            id="whatsapp"
            xmlns="http://www.w3.org/2000/svg"
            fill="#e26928"
            viewBox="0 0 16 16"
            className="h-4 w-4 xs:h-6 xs:w-6 sm:h-7 sm:w-7"
          >
            <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z" />
            <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z" />
          </svg>
        </Link>
        <Link
          href={state?.organization?.instagramLink || ""}
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            id="instagram"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-4 w-4 xs:h-6 xs:w-6 sm:h-7 sm:w-7"
          >
            <path
              fill="#e26928"
              fillRule="evenodd"
              d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              clipRule="evenodd"
            />
            <path fill="#e26928" d="M18 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
            <path
              fill="#e26928"
              fillRule="evenodd"
              d="M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 0 0 2.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 0 0 2.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 0 0-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 0 0-2.622 2.622ZM13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 0 0-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 0 0 1.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 0 0 1.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 0 0-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link
          href={state?.organization?.facebookLink || ""}
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            id="facebook"
            xmlns="http://www.w3.org/2000/svg"
            fill="#e26928"
            viewBox="0 0 24 24"
            className="h-4 w-4 xs:h-6 xs:w-6 sm:h-7 sm:w-7"
          >
            <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Header;
