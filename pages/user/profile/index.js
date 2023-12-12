import Footer from '@/components/footer/Footer'
import Header from '@/components/navbar/Header'
import HomeNavbar from '@/components/navbar/HomeNavbar'
import Profile from '@/components/profilePage/Profile'
import PaymentSection from '@/components/profilePage/auxiliarComponents/cartSection/PaymentSection'
import { Context } from '@/context/GlobalContext'
import { deleteInit_Point } from '@/context/actions'
import React, { useContext, useEffect } from 'react'

const ProfilePage = () => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {  
    return () => {
      deleteInit_Point(dispatch)
    }
  }, [])
  
  return (
    <div>
      {
        state?.init_point 
        ? <PaymentSection/>
        : <div className='hidden'></div>
      }
      <Header />
      <HomeNavbar />
      <div className='flex flex-row justify-center'>
        <Profile />
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage