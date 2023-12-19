import React, { useState } from "react";
import ImageSection from "./ImageSection";

const ChocolateSection = ({ img }) => {
    const [firstImage, setFirstImage] = useState(img[0]);

    const setImage = (e) => {
        setFirstImage(e.target.name);
    };

    return (
        <div className="hidden lg:flex h-full">
            <div className="flex flex-col gap-2 p-1 overflow-y-scroll scrollbar-none max-h-[400px]">
                {img.map((e) => (
                    <img
                        src={e}
                        alt={e}
                        className="h-20 w-20 rounded-xl"
                        name={e}
                        key={e}
                        onClick={(e) => setImage(e)}
                    />
                ))}
            </div>
            <div className="w-full h-full justify-self-center">
                <ImageSection image={firstImage} />
            </div>
        </div>
    );
};

export default ChocolateSection;
