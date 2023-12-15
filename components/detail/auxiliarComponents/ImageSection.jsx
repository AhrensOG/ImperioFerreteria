import React from "react";

const ImageSection = ({ image }) => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <img
                src={image}
                alt={image}
                className="h-[400px] md:w-full lg:w-[450px]"
            />
        </div>
    );
};

export default ImageSection;
