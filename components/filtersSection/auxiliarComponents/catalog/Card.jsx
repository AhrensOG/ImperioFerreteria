import { Context } from '@/context/GlobalContext'
import { searchProductsByCategory } from '@/context/actions'
import Link from 'next/link'
import React, { useContext } from 'react'

const Card = ({ title = 'Catálogos', url = 'https://media.bahco.com/media/catalog/category/img-catalogo2-bahco2.png' }) => {
  const { dispatch } = useContext(Context)
  return (
    <Link href={'/products'}>
      <div onClick={() => searchProductsByCategory(title, dispatch)} className='flex flex-row justify-start items-center cursor-pointer hover:bg-slate-200 duration-500 py-2 px-4'>
        <span className='flex flex-row items-center text-lg'>
          {title}
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
        </span>
      </div>
    </Link>
  )
}

export default Card