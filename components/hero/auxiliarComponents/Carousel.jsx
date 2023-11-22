import React, { useEffect, useState } from "react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
  },

  {
    url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
  },
];

const Carousel = ({slides = images, autoSlide = false, autoSlideInterval = 3000, title = 'Herramientas para construcción', subtitle= 'Soluciones creativas, resultados creativos.'}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stopAutoSlide, setStopAutoSlide ] = useState(false)

  const prevSlide = () => 
  setCurrentIndex((curr) => curr === 0 ? slides.length - 1 : curr - 1)

  const nextSlide = () => 
    setCurrentIndex((curr) => curr === slides.length -1 ? 0 : curr + 1)

  useEffect(() => {
    if(!autoSlide) return
    if(stopAutoSlide) return
    const slideInterval = setInterval(nextSlide, autoSlideInterval)
    return () => clearInterval(slideInterval)
  },[stopAutoSlide])

  return (
    <div className={`h-[350px] sm:h-[500px] md:h-[650px] bg-cover bg-no-repeat bg-center bg-origin-border`}>
      <div className={`h-[350px] sm:h-[500px] md:h-[650px] w-full m-auto relative group`}>
        <div
          className="relative w-full h-full bg-center bg-cover bg-origin-border duration-500"
        >
          <img onMouseDown={() => setStopAutoSlide(true)} onMouseUp={() => setStopAutoSlide(false)} src={slides[currentIndex]?.url} alt="" className="absolute hover:cursor-pointer w-full h-full object- object-center duration-500" />
          <div className={`absolute h-[350px] sm:h-[500px] md:h-[650px] w-full flex flex-col justify-center items-center`}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white py-2 text-center">
              {title}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-white py-2 text-center">
              {subtitle}
            </h2>
          </div>
        </div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={prevSlide}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={nextSlide}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
