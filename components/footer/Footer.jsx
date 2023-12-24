import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Footer = ({ marginTop = 10 }) => {
  const router = useRouter()

  return (
    <div className={`w-full h-full bg-black py-4 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:px-10 sm:py-6 md:py-8 lg:py-10 ${marginTop ? 'mt-10' : '' }`}>
      <div className='flex flex-row w-full h-full items-center justify-evenly sm:justify-start sm:gap-10'>
        <Link href={'/'}>
          <Image src={'/LogoMobile.png'} width={1000} height={1000} alt='Logo' className='w-[60px] h-[28px] sm:w-[100px] sm:h-[48px] md:w-[140px] md:h-[68px] lg:w-[180px] lg:h-[88px] cursor-pointer'/>
        </Link>
        <Link href={'/products'}>
          <span className='text-[0.60rem] text-white/70 sm:text-sm md:text-base lg:text-lg uppercase cursor-pointer'>Productos</span>
        </Link>
        <Link href={'/products'}>
          <span className='text-[0.60rem] text-white/70 sm:text-sm md:text-base lg:text-lg uppercase cursor-pointer'>Catalogo</span>
        </Link>
        <Link href={router.asPath === '/' ? '#contact' : '/'}>
          <span className='text-[0.60rem] text-white/70 sm:text-sm md:text-base lg:text-lg uppercase cursor-pointer'>Contáctanos</span>
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:justify-start'>
        <Link
          href={"https://wa.me/3704671438"}
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            id="whatsapp"
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            fill="#e26928"
            viewBox="0 0 16 16"
            className="h-6 w-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          >
            <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z" />
            <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z" />
          </svg>
        </Link>
        <Link
          href={
            "https://instagram.com/ferreteriaelimperio?igshid=YzAwZjE1ZTI0Zg=="
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            id="instagram"
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
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
          href={"https://www.facebook.com/mitre1589?mibextid=ZbWKwL"}
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            id="facebook"
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            fill="#e26928"
            viewBox="0 0 24 24"
            className="h-6 w-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          >
            <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Footer