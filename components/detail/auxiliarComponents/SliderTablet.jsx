import React, { useState } from "react";
import CardTablet from "./CardTablet";
import ImageSection from "./ImageSection";

const SliderTablet = ({ slides }) => {
    const [firstImage, setFirstImage] = useState(slides[0]);

    const setImage = (e) => {
        setFirstImage(e.target.alt);
    };

    const slides2 = [
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
        "https://www.bmbulmetal.com.ar/database/Articulos/fotos/62/TUERCA-HEXAGONAL-GRADO2-HIERRO-UNC-UNF-WTW-CALIDAD8.8-METRICO-PULGADA-MA-MB-MC.jpg",
    ];

    return (
        <div className="hidden md:flex md:flex-col lg:hidden ">
            <div>
                <ImageSection image={firstImage} />
            </div>
            <div
                id="content"
                className="carousel flex flex-row gap-4 items-center  overflow-x-auto  scroll-smooth scrollbar-thin scrollbar-thumb-[#e26928] scrollbar-track-[#e26928]/30 max-w-[700px] "
            >
                {slides2?.map((e) => (
                    <div
                        onClick={(e) => setImage(e)}
                        id={e}
                        key={e}
                        name={e}
                        className="h-[25%] w-[25%]"
                    >
                        <CardTablet img={e} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SliderTablet;
