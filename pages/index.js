import Filters from '@/components/filtersSection/Filters'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Location from '@/components/location/Location'
import LowerSection from '@/components/lowerSection/LowerSection'
import Header from '@/components/navbar/Header'
import HomeNavbar from '@/components/navbar/HomeNavbar'
import Slider from '@/components/productsSlider/Slider'
import { Context } from '@/context/GlobalContext'
import { isUserLogged } from '@/context/actions/isUserLogged'
import { useContext, useEffect } from 'react'

export default function Home() {

  const { dispatch } = useContext(Context)

  useEffect(() => {
    const userStatus = async () => {
      await isUserLogged(dispatch)
    }
    userStatus()
  }, [])
  return (
    <main>
      <Header/>
      <HomeNavbar/>
      <Filters/>
      <Hero/>
      <Slider/>
      <Location/>
      <LowerSection/>
      <Footer/>
    </main>
  )
}
