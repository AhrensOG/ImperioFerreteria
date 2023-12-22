import React, { useContext, useEffect, useState } from 'react'
import Card from './auxiliarComponents/products/Card'
import { Context } from '@/context/GlobalContext'
import { getAllCategories, getAllProducts } from '@/context/actions'
import ProductsSection from './auxiliarComponents/products/ProductsSection'
import CatalogSection from './auxiliarComponents/catalog/CatalogSection'
import Link from 'next/link'
import ContactSection from './auxiliarComponents/contact/ContactSection'

const Filters = () => {
  const { state, dispatch } = useContext(Context)
  const [listProducts, setListProducts] = useState(false)
  const [listCatalog, setListCatalog] = useState(false)
  const [listContact, setListContact] = useState(false)


  useEffect(() => {
    getAllProducts(dispatch)
    getAllCategories(dispatch)
  }, [])

  const displayList = (list, setList) => {
    setListProducts(false)
    setListCatalog(false)
    setListContact(false)

    return setList(!list)
  }
  
  
  return (
    <div className='w-full h-full py-4 relative'>
      <div className='flex flex-row sm:px-12 px-4 sm:gap-8 gap-4 items-center w-full h-full'>
        <Link href={'/products'}>
          <span onMouseEnter={() => displayList(listProducts, setListProducts)} className='text-sm sm:text-lg cursor-pointer'>Productos</span>
        </Link>
        <Link href={'/products'}>
          <span onMouseEnter={() => displayList(listCatalog, setListCatalog)}  className='text-sm sm:text-lg cursor-pointer'>Catálogo</span>
        </Link>
        <span id='contact' onMouseEnter={() => displayList(listContact, setListContact)} className='text-sm hidden sm:block sm:text-lg cursor-pointer text-[#e26928]'>Contáctanos</span>
      </div>
      {
        listProducts ? 
        <ProductsSection listProducts={listProducts} setListProducts={setListProducts} state={state}/>
        : <div className='hidden'></div>
      }
      {
        listCatalog ? 
        <CatalogSection listCatalog={listCatalog} setListCatalog={setListCatalog} state={state} />
        : <div className='hidden'></div>
      }
      {
        listContact ? 
        <ContactSection listContact={listContact} setListContact={setListContact} />
        : <div className='hidden'></div>
      }
    </div>
  )
}

export default Filters