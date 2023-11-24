import React, { useContext } from 'react'
import Card from './auxiliarComponents/Card'
import { Context } from '@/context/GlobalContext'

const ProductsPage = () => {
  const {state} = useContext(Context)
  console.log(state)
  return (
    <div className='flex flex-col sm:flex-row sm:flex-wrap justify-evenly gap-8 items-center p-4 sm:px-12'>
      {
        state?.products?.map((p) => {
          return <Card key={p.id} id={p.id} title={p.title} url={p.firstImage} description={p.description} />
        })
      }
    </div>
  )
}

export default ProductsPage