import React, { useState } from "react";
import CardTablet from "./CardTablet";
import ImageSection from "./ImageSection";

const SliderTablet = ({ slides }) => {
  const [firstImage, setFirstImage] = useState(slides[0]);

  const setImage = (e) => {
    setFirstImage(e.target.alt);
  };

  return (
    <div className="hidden md:flex md:flex-col lg:hidden max-w-[750px]">
      <ImageSection image={firstImage} />
      <div
        id="content"
        className="carousel flex flex-row gap-4 items-center  overflow-x-auto  scroll-smooth scrollbar-thin scrollbar-thumb-[#e26928] scrollbar-track-[#e26928]/30"
      >
        {slides?.length ? (
          slides.map((e) => (
            <div
              onClick={(e) => setImage(e)}
              id={e}
              key={e}
              name={e}
              className="h-[25%] w-[25%] py-1"
            >
              <CardTablet img={e} />
            </div>
          ))
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
};

export default SliderTablet;
