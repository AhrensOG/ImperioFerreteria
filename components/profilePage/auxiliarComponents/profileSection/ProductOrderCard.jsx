import React from 'react'

const ProductOrderCard = ({ productOrder }) => {
  return (
    <div className='flex flex-col sm:flex-row sm:justify-evenly text-sm'>
      <p className='font-medium'>
        Producto: 
        <span className='text-[#e26928] font-medium pl-2'>{productOrder.title}</span>
      </p>
      <p className='font-medium'>
        Cantidad:
        <span className='text-[#e26928] font-medium pl-2'>{productOrder.ProductsOrder.quantity}</span>
      </p>
    </div>
  )
}

export default ProductOrderCard