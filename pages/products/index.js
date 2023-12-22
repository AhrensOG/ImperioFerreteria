import Footer from '@/components/footer/Footer'
import Header from '@/components/navbar/Header'
import HomeNavbar from '@/components/navbar/HomeNavbar'
import ProductsPage from '@/components/productsPage/products/ProductsPage'
import { Context } from '@/context/GlobalContext'
import { getAllCategories, getAllProducts } from '@/context/actions'
import React, { useContext, useEffect } from 'react'

const Products = () => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    getAllProducts(dispatch)
    getAllCategories(dispatch)
  }, [])
  

  return (
    <div className='h-full flex flex-col justify-between'>
      <div>
        <Header/>
        <HomeNavbar/>
        <ProductsPage/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Products