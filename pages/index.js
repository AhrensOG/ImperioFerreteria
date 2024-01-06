import Filters from "@/components/filtersSection/Filters";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Loader from "@/components/loader/Loader";
import Location from "@/components/location/Location";
import LowerSection from "@/components/lowerSection/LowerSection";
import Header from "@/components/navbar/Header";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import Slider from "@/components/productsSlider/Slider";
import { Context } from "@/context/GlobalContext";
import { getOrganization } from "@/context/actions";
import { isUserLogged } from "@/context/actions/isUserLogged";
import { useContext, useEffect } from "react";

export default function Home() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const userStatusAndOrganization = async () => {
      await isUserLogged(dispatch);
      await getOrganization(dispatch);
    };
    userStatusAndOrganization();
  }, []);
  console.log(state)
  return (
    <div className="2xl:flex 2xl:flex-col 2xl:items-center h-full">
      <Header />
      <HomeNavbar />
      <div className="">
        {!state?.organization?.id ? (
          <div className="flex flex-row items-center justify-center h-screen">
            <Loader w={100} h={100} />
          </div>
        ) : (
          <div className="2xl:flex 2xl:flex-col 2xl:max-w-screen-xl">
            <Filters />
            <Hero />
            <Slider />
            <Location />
            <LowerSection />
          </div>
        )}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
