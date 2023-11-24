import React, { useContext, useEffect, useState } from 'react'
import Card from './auxiliarComponents/products/Card'
import { Context } from '@/context/GlobalContext'
import { getAllProducts } from '@/context/actions'
import ProductsSection from './auxiliarComponents/products/ProductsSection'
import CatalogSection from './auxiliarComponents/catalog/CatalogSection'
import Link from 'next/link'

const Filters = () => {
  const { state, dispatch } = useContext(Context)
  const [listProducts, setListProducts] = useState(false)
  const [listCatalog, setListCatalog] = useState(false)


  useEffect(() => {
    getAllProducts(dispatch)
  }, [])

  const displayList = (list, setList) => {
    setListProducts(false)
    setListCatalog(false)

    return setList(!list)
  }
  
  
  return (
    <div className='w-full h-full py-4 relative'>
      <div className='flex flex-row sm:px-12 px-4 sm:gap-8 gap-4 items-center w-full h-full'>
        <Link href={'/products'}>
          <span onMouseEnter={() => displayList(listProducts, setListProducts)} className='text-sm sm:text-lg cursor-pointer'>Productos</span>
        </Link>
        <Link href={'/'}>
          <span onMouseEnter={() => displayList(listCatalog, setListCatalog)}  className='text-sm sm:text-lg cursor-pointer'>Catalogo</span>
        </Link>
        <span className='text-sm sm:text-lg cursor-pointer'>Categorias</span>
        <span className='text-sm sm:text-lg cursor-pointer'>Noticias</span>
      </div>
      {
        listProducts ? 
        <ProductsSection listProducts={listProducts} setListProducts={setListProducts} state={state}/>
        : <div className='hidden'></div>
      }
      {
        listCatalog ? 
        <CatalogSection listCatalog={listCatalog} setListCatalog={setListCatalog} />
        : <div className='hidden'></div>
      }
    </div>
  )
}

export default Filters