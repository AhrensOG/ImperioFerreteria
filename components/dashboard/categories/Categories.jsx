import React from 'react'
import Card from './auxiliarComponents/Card'

const Categories = ({ categories }) => {
  return (
    <div className='flex flex-col items-center h-screen p-10'>
      <span className='text-4xl font-semibold text-[#e26928] pb-10 w-full text-center'>Categorias</span>
      <div className='overflow-y-scroll flex flex-col gap-6 scrollbar-thumb-[#e26928] scrollbar-thin px-1'>
        {
          categories?.map( c => {
            return <Card key={c.id} category={c}/>
          })
        }
      </div>
    </div>
  )
}

export default Categories