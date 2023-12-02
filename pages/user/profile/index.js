import Footer from '@/components/footer/Footer'
import Header from '@/components/navbar/Header'
import HomeNavbar from '@/components/navbar/HomeNavbar'
import Profile from '@/components/profilePage/Profile'
import React from 'react'

const ProfilePage = () => {
  return (
    <div>
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