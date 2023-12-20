import React from 'react'

const ProductOrderCard = ({ product }) => {
  return (
    <div className='border border-[#e26928] p-1 px-2 rounded-lg'>
      <div className='grid grid-cols-5'>
        <span className='col-span-3 text-[#e26928] text-sm'>Producto: {product.title}</span>
        <span className='text-[#e26928] text-sm'>Cantidad: {product.ProductsOrder.quantity}</span>
        <span className='text-[#e26928] text-sm'>Precio: ${product.price}</span>
      </div>
    </div>
  )
}

export default ProductOrderCard