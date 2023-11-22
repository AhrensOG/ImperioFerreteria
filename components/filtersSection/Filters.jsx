import React from 'react'

const Filters = () => {
  return (
    <div className='sm:px-12 px-4 py-4 flex flex-row sm:gap-8 gap-4 w-full h-full items-center'>
      <span className='text-sm sm:text-lg cursor-pointer'>Productos</span>
      <span className='text-sm sm:text-lg cursor-pointer'>Catalogo</span>
      <span className='text-sm sm:text-lg cursor-pointer'>Categorias</span>
      <span className='text-sm sm:text-lg cursor-pointer'>Noticias</span>
    </div>
  )
}

export default Filters