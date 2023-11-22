import Filters from '@/components/filtersSection/Filters'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Location from '@/components/location/Location'
import LowerSection from '@/components/lowerSection/LowerSection'
import Header from '@/components/navbar/Header'
import HomeNavbar from '@/components/navbar/HomeNavbar'
import Slider from '@/components/productsSlider/Slider'

export default function Home() {

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
