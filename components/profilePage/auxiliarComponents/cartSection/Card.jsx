import { Context } from '@/context/GlobalContext'
import { deleteProductToCart } from '@/context/actions'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const Card = ({ product }) => {
  const router = useRouter()
  const { dispatch } = useContext(Context)

  const handleUpdate = () => {
    router.push(`/products/${product.id}`)
  }

  const handleDelete = () => {
    deleteProductToCart(product, dispatch)
  }

  return (
    <div className='grid grid-cols-1 content-between gap-2 sm:gap-0 border-2 border-[#e26928] max-w-[285px] sm:w-[285px] sm:h-[450px]'>
      <img src={product.firstImage} alt="img" className='w-full h-[250px]'/>
      <div className='grid grid-cols-1 content-between sm:flex-col gap-3'>
        <div className='flex flex-col items-start px-2'>
          <span className='text-xl font-semibold tracking-tight w-full h-full flex items-center'>{product.title}</span>
          <span className='text-lg font-semibold tracking-tight w-full h-full flex items-center'>Cantidad: {product.items}</span>
          <span className='text-lg font-semibold tracking-tight w-full h-full flex items-center'>Precio: ${product.price}</span>
        </div>
        <div className='flex flex-row justify-center items-center w-full divide-x-2 h-10'>
          <button onClick={handleUpdate} className='w-full h-full p-2 px-4 bg-white text-[#e26928] border-t border-[#e26928] font-bold text-lg'>Actualizar</button>
          <button onClick={handleDelete} className='w-full h-full p-2 px-4 bg-white text-red-500 border-t border-[#e26928] font-bold text-lg'>Borrar</button>
        </div>
      </div>
    </div>
  )
}

export default Card