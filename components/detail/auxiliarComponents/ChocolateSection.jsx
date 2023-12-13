import React, { useState } from "react";
import ImageSection from "./ImageSection";

const ChocolateSection = ({ img }) => {
    const [firstImage, setFirstImage] = useState(img[0]);

    const setImage = (e) => {
        setFirstImage(e.target.name);
    };

    return (
        <div className="hidden lg:flex h-[500px]">
            <div className="grid grid-cols-1 place-content-start gap-3 h-[400px]  snap-y  snap-mandatory overflow-y-scroll">
                {img.map((e) => (
                    <div
                        key={e}
                        className="h-[70px] w-[60px] mr-4 snap-center justify-self-center"
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
            <div className="w-full justify-self-center">
                <ImageSection image={firstImage} />
            </div>
        </div>
    );
};

export default ChocolateSection;
