import React, { useEffect, useState } from "react";

const CarouselDetail = ({
    slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stopAutoSlide, setStopAutoSlide] = useState(false);

    const prevSlide = () =>
        setCurrentIndex((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

    const nextSlide = () =>
        setCurrentIndex((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        if (!autoSlide) return;
        if (stopAutoSlide) return;
        const slideInterval = setInterval(nextSlide, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [stopAutoSlide]);

    return (
        <div
            className={`h-[350px] sm:h-[500px] md:h-[650px] bg-cover bg-no-repeat bg-center bg-origin-border md:hidden`}
        >
            <div
                className={`h-[300px] sm:h-[500px] md:h-[650px] w-full m-auto relative group`}
            >
                <div className="relative w-[70%] h-[70%] bg-center bg-cover bg-origin-border duration-500 pl-[15%] pt-[15%] ">
                    <img
                        onMouseDown={() => setStopAutoSlide(true)}
                        onMouseUp={() => setStopAutoSlide(false)}
                        src={slides[currentIndex]}
                        alt=""
                        className="absolute hover:cursor-pointer w-full h-full object-center ease-in duration-500"
                    />
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

export default CarouselDetail;
