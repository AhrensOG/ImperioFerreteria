import Footer from '@/components/footer/Footer'
import Header from '@/components/navbar/Header'
import HomeNavbar from '@/components/navbar/HomeNavbar'
import SecondaryHomeNavbar from '@/components/navbar/SecondaryHomeNavbar'
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
    <div className='h-full flex flex-col justify-between'>
      <div>
        {
          state?.init_point 
          ? <PaymentSection/>
          : <div className='hidden'></div>
        }
        <SecondaryHomeNavbar />
        <Header />
        <div className='flex flex-row justify-center'>
          <Profile />
        </div>
      </div>
      <div>
        <Footer marginTop={0} />
      </div>
    </div>
  )
}

export default ProfilePage