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
    <div className='flex flex-col border-2 border-[#e26928]'>
      <div className='flex flex-row sm:flex-col gap-3 py-4'>
        <div className='flex justify-center items-center w-full h-full sm:border-b sm:border-b-[#e26928] basis-[30%]'>
          <img src={product.firstImage} alt="img" className='w-full h-full'/>
        </div>
        <div className='flex flex-col basis-[70%] items-start sm:px-2'>
          <span className='text-xl font-semibold tracking-tight w-full h-full flex items-center'>{product.title}</span>
          <span className='text-lg font-semibold tracking-tight w-full h-full flex items-center'>Cantidad: {product.items}</span>
          <span className='text-lg font-semibold tracking-tight w-full h-full flex items-center'>Precio: ${product.price}</span>
        </div>
      </div>
      <div className='flex flex-row justify-center items-center w-full h-full divide-x-2'>
        <button onClick={handleUpdate} className='w-full h-full p-2 px-4 bg-white text-[#e26928] border-t border-[#e26928] font-bold text-lg'>Actualizar</button>
        <button onClick={handleDelete} className='w-full h-full p-2 px-4 bg-white text-red-500 border-t border-[#e26928] font-bold text-lg'>Borrar</button>
      </div>
    </div>
  )
}

export default Card