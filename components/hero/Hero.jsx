import React, { useContext } from "react";
import Carousel from "./auxiliarComponents/Carousel";
import { Context } from "@/context/GlobalContext";

const Hero = () => {
  const { state } = useContext(Context);
  return (
    <div>
      {state?.organization?.BusinessImages?.length ? (
        <Carousel
          slides={state.organization.BusinessImages}
          autoSlide={true}
          autoSlideInterval={5000}
        />
      ) : (
        <Carousel autoSlide={true} autoSlideInterval={5000} />
      )}
    </div>
  );
};

export default Hero;
