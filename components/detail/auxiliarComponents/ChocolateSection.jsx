import React, { useEffect, useState } from "react";
import ImageSection from "./ImageSection";

const ChocolateSection = ({ img }) => {
    const [firstImage, setFirstImage] = useState(img[0]);

    const setImage = (e) => {
        console.log(e.target.name);
        setFirstImage(e.target.name);
    };

    return (
        <div className="hidden md:flex md:space-x-2 md:justify-between md:px-7 lg:mx-[10%] xl:mx-[15%] 2xl:mx-[20%] ">
            <div className="grid grid-cols-2 place-content-betweens gap-x-8">
                {img.map((e) => {
                    return (
                        <div
                            className="h-28 w-28"
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
                    );
                })}
            </div>
            <ImageSection image={firstImage} />
        </div>
    );
};

export default ChocolateSection;
