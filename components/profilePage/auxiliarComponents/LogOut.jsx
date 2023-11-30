import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'

const LogOut = () => {
  const router = useRouter()

  const handleLogOut = async () => {
    await signOut(auth)
    router.push('/')
  }

  return (
    <button onClick={handleLogOut} className='text-center text-[#e26928] text-lg font-semibold border border-[#e26928] max-w-[200px] w-full py-2 hover:text-white hover:bg-[#e26928] duration-500'>Cerrar Sesion</button>
  )
}

export default LogOut