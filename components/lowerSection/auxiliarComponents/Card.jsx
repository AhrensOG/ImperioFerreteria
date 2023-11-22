import Link from 'next/link'
import React from 'react'

const Card = ({ title = 'Catálogo', description = 'Descarga nuestro catalogo', subDescription = 'Puede consultarnos directamente en linea', button = 'Descargar', link = '/'}) => {
  return (
    <div className='flex flex-col max-w-[230px] md:max-w-[308px] h-full py-4 text-start gap-10'>
      <span className='text-[2.6rem] md:text-[3.5rem] font-semibold tracking-wider uppercase'>{title}</span>
      <div className={`flex flex-col h-10 justify-center`}>
        <span className='text-[0.8rem] md:text-base tracking-tighter leading-none'>{description}</span>
        <span className='text-[0.8rem] md:text-base tracking-tighter'>{subDescription}</span>
      </div>
      <Link href={link}>
        <button className='border border-black bg-black text-[#e26928] py-4 w-full uppercase tracking-wider cursor-pointer'>{button}</button>
      </Link>
    </div>
  )
}

export default Card