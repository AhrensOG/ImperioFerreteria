import React, { useState } from "react";
import ImageSection from "./ImageSection";

const ChocolateSection = ({ img }) => {
    const [firstImage, setFirstImage] = useState(img[0]);
    const imageArray = [
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
        "https://www.bloginstrumentacion.com/files/2021/01/metal-nuts_shutterstock_138477023.jpg",
    ];

    const setImage = (e) => {
        setFirstImage(e.target.name);
    };

    return (
        <div className="hidden md:flex h-[700px]">
            <div className="grid grid-cols-1 place-content-start gap-3 h-[450px] pr-10 snap-y  snap-mandatory overflow-y-scroll">
                {img.map((e) => (
                    <div
                        key={e}
                        className="h-[100px] w-[100px] border-2 p-4 snap-center"
                        id={e}
                        onClick={(e) => setImage(e)}
                    >
                        <img
                            src={e}
                            alt={e}
                            className="h-full w-full"
                            name={e}
                        />
                    </div>
                ))}
            </div>
            <div className="w-full self-center justify-self-center">
                <ImageSection image={firstImage} />
            </div>
        </div>
    );
};

export default ChocolateSection;
