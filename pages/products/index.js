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
    <div>
      <Header/>
      <HomeNavbar/>
      <ProductsPage/>
      <Footer/>
    </div>
  )
}

export default Products